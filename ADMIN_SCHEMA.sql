-- ============================================================
-- PoliticaLearn — Admin Panel Schema
-- Run this in Neon Dashboard → SQL Editor
-- ============================================================

-- 1. Add is_admin flag to existing users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE;

-- 2. Set yourself as admin (replace with your actual Clerk user ID)
-- Find your clerk_id by running: SELECT clerk_id, name FROM users;
-- Then run:
-- UPDATE users SET is_admin = TRUE WHERE clerk_id = 'user_YOUR_CLERK_ID_HERE';

-- 3. Lesson slides table (for dynamic content management)
CREATE TABLE IF NOT EXISTS lesson_slides (
  id           UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id    TEXT         NOT NULL,    -- e.g. 'l1-1'
  slide_order  INTEGER      NOT NULL,
  slide_type   TEXT         NOT NULL,    -- overview | explanation | video | mcq | completion
  heading      TEXT,
  body         TEXT,
  image_emoji  TEXT,
  video_url    TEXT,
  video_title  TEXT,
  duration     TEXT,
  source_credit TEXT,
  -- MCQ fields
  question     TEXT,
  is_role_play BOOLEAN      DEFAULT FALSE,
  role_context TEXT,
  mcq_options  JSONB,       -- [{id, text, icon, isCorrect}]
  explanation  TEXT,
  -- Completion fields
  xp_earned    INTEGER,
  badge_id     TEXT,
  badge_name   TEXT,
  badge_icon   TEXT,
  -- Overview fields
  lesson_title TEXT,
  goal         TEXT,
  bullet_points JSONB,      -- ["point1", "point2"]
  -- Meta
  is_published BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Index for fast lesson lookups
CREATE INDEX IF NOT EXISTS idx_lesson_slides_lesson_id
  ON lesson_slides (lesson_id, slide_order);

-- Auto-update trigger
CREATE OR REPLACE FUNCTION update_lesson_slides_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER lesson_slides_updated_at
  BEFORE UPDATE ON lesson_slides
  FOR EACH ROW EXECUTE FUNCTION update_lesson_slides_updated_at();

-- 4. Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  key          TEXT         PRIMARY KEY,
  value        TEXT         NOT NULL,
  description  TEXT,
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Default settings
INSERT INTO site_settings (key, value, description) VALUES
  ('maintenance_mode',   'false',           'Set to true to show maintenance page to students'),
  ('allow_signups',      'true',            'Set to false to pause new sign-ups'),
  ('announcement',       '',                'Optional banner message shown on the dashboard'),
  ('current_version',    '1.0.0',           'Current platform version')
ON CONFLICT (key) DO NOTHING;
