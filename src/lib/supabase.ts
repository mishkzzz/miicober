import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anon) {
  console.warn('Supabase env vars missing — intake form will run in offline mode.');
}

export const supabase = createClient(
  url ?? 'https://placeholder.supabase.co',
  anon ?? 'placeholder-anon-key',
);

export type IntakeRequest = {
  id?: string;
  name: string;
  business?: string | null;
  problem: string;
  budget_range?: string | null;
  contact_method: string;
  contact_detail?: string | null;
  service?: string | null;
  status?: string;
  created_at?: string;
};
