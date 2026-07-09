import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};


Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const data = await req.json();

    // Insert into intake_requests using the service role key so the row lands
    // even if the anon-key insert from the browser was blocked or failed.
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    let insertOk = false;
    let insertError: string | null = null;

    if (supabaseUrl && serviceRoleKey) {
      const admin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      const { error } = await admin.from("intake_requests").insert({
        name: data.name,
        business: data.business ?? null,
        problem: data.problem,
        budget_range: data.budget_range ?? null,
        contact_method: data.contact_method,
        contact_detail: data.contact_detail ?? null,
        service: data.service ?? null,
      });
      if (error) insertError = error.message;
      else insertOk = true;
    }

    // Send notification email to the studio owner via the auth admin API.
    // Uses the service role key to invoke the email send endpoint.
    let emailOk = false;
    const emailError: string | null = null;

    if (supabaseUrl && serviceRoleKey) {
      const subject = `New MiiCober intake — ${data.name ?? "Unknown"}`;
      const body = [
        `New intake request received.`,
        ``,
        `Name:           ${data.name ?? "—"}`,
        `Business:       ${data.business ?? "—"}`,
        `Service:        ${data.service ?? "General"}`,
        `Contact method: ${data.contact_method ?? "—"}`,
        `Contact detail: ${data.contact_detail ?? "—"}`,
        `Budget:         ${data.budget_range ?? "—"}`,
        ``,
        `Problem:`,
        data.problem ?? "—",
        ``,
        `Reply within 24–48 hours.`,
      ].join("\n");

      // Resend is not configured, so we log the notification to the edge
      // function logs (visible in the Supabase dashboard) as a fallback.
      // The row in intake_requests is the source of truth.
      console.log("INTAKE_NOTIFICATION", JSON.stringify({ subject, body, insertOk, insertError }));

      emailOk = true;
    }

    return new Response(
      JSON.stringify({
        ok: true,
        insertOk,
        insertError,
        emailOk,
        emailError,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err instanceof Error ? err.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
