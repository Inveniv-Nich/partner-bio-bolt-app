/*
  # Add onboarding fields to users table

  1. New Columns
    - `role` (text) - User's professional role from onboarding
    - `organization` (text) - User's organization from onboarding

  2. Changes
    - Add role and organization columns to existing users table
    - Both fields are nullable to support existing users
    - No default values to allow proper data collection during onboarding

  3. Security
    - Existing RLS policies will apply to new columns
    - No additional security changes needed
*/

-- Add role and organization columns to users table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'role'
  ) THEN
    ALTER TABLE users ADD COLUMN role TEXT;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'organization'
  ) THEN
    ALTER TABLE users ADD COLUMN organization TEXT;
  END IF;
END $$;