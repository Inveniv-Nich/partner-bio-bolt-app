/*
  # Add onboarding fields to users table

  1. New Columns
    - `role` (text, nullable) - User's professional role from onboarding
    - `organization` (text, nullable) - User's organization from onboarding

  2. Changes
    - Adds role column to store user's professional role
    - Adds organization column to store user's workplace/company
    - Both fields are nullable to support existing users
    - Uses conditional logic to prevent errors if columns already exist

  3. Notes
    - Safe to run multiple times (idempotent)
    - Existing user data will not be affected
    - New signups will populate these fields from metadata
*/

-- Add role column to users table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'role'
  ) THEN
    ALTER TABLE users ADD COLUMN role TEXT;
  END IF;
END $$;

-- Add organization column to users table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'organization'
  ) THEN
    ALTER TABLE users ADD COLUMN organization TEXT;
  END IF;
END $$;