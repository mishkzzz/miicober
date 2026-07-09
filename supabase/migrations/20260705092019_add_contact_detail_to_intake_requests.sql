/*
# Add contact_detail column to intake_requests

## Purpose
The intake form previously asked for a "contact method" (email or whatsapp)
but never captured the actual email address or phone number. This left the
studio with no way to reach back out to the lead.

## Changes
- Add `contact_detail` (text, nullable) to `intake_requests`.
  Stores the email address or WhatsApp number the lead provided, paired
  with the existing `contact_method` column which records which channel
  they chose.

## Notes
1. Nullable so existing rows (including the one already submitted) remain valid.
2. No RLS policy changes — existing anon CRUD policies already cover the new column.
3. Idempotent: uses a DO block to add the column only if it does not exist.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'intake_requests' AND column_name = 'contact_detail'
  ) THEN
    ALTER TABLE intake_requests ADD COLUMN contact_detail text;
  END IF;
END $$;