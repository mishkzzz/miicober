/*
# Create intake_requests table (single-tenant, no auth)

## Purpose
Stores client intake submissions from the Miicober OS landing page.
When a visitor clicks a service card, a modal opens; on submit, the form
writes a row here so the studio can follow up within 24-48 hours.

## New Tables
- `intake_requests`
  - `id` (uuid, primary key)
  - `name` (text, not null) — submitter's full name
  - `business` (text) — idea / business name (optional)
  - `problem` (text, not null) — what they want solved
  - `budget_range` (text) — selected budget band
  - `contact_method` (text, not null) — email or whatsapp
  - `service` (text) — which service card was clicked
  - `status` (text, default 'new') — workflow state (new / contacted / won / lost)
  - `created_at` (timestamptz, default now())

## Security
- RLS enabled on `intake_requests`.
- This is a no-auth public landing page; the anon-key client must be able
  to INSERT new requests. Reads/updates/deletes are intentionally open
  to anon + authenticated as well because there is no sign-in flow and
  the data is intentionally shared (studio intake queue).
- `USING (true)` / `WITH CHECK (true)` is documented as intentional for
  this single-tenant, no-auth app.

## Notes
1. No `user_id` column — there is no sign-in flow.
2. No `auth.uid()` references in policies.
3. Policies are split into 4 separate CRUD policies (no `FOR ALL`).
4. Idempotent: uses `IF NOT EXISTS` and drops policies before recreating.
*/

CREATE TABLE IF NOT EXISTS intake_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  business text,
  problem text NOT NULL,
  budget_range text,
  contact_method text NOT NULL,
  service text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE intake_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_intake_requests" ON intake_requests;
CREATE POLICY "anon_select_intake_requests"
ON intake_requests FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_intake_requests" ON intake_requests;
CREATE POLICY "anon_insert_intake_requests"
ON intake_requests FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_intake_requests" ON intake_requests;
CREATE POLICY "anon_update_intake_requests"
ON intake_requests FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_intake_requests" ON intake_requests;
CREATE POLICY "anon_delete_intake_requests"
ON intake_requests FOR DELETE
TO anon, authenticated USING (true);
