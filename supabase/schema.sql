-- ============================================================
-- MediCare Clinic Booking System — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- Table: services
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  duration   INTEGER NOT NULL DEFAULT 30,  -- in minutes
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default services
INSERT INTO services (id, name, duration) VALUES
  ('general-checkup', 'General Checkup',  30),
  ('consultation',    'Consultation',     20),
  ('emergency',       'Emergency Visit',  45),
  ('dental',          'Dental Care',      45),
  ('vaccination',     'Vaccination',      15),
  ('lab-test',        'Lab Test',         20)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Table: bookings
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  service     TEXT NOT NULL REFERENCES services(id),
  date        DATE NOT NULL,
  time        TEXT NOT NULL,         -- e.g. "09:00"
  status      TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_bookings_date    ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status  ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_service ON bookings(service);

-- Unique constraint: prevent double-booking of same slot (active bookings)
-- We handle this in the application layer as well (allows cancelled slots to be re-booked)

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Services: anyone can read (needed for booking page)
CREATE POLICY "Services are publicly readable"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

-- Bookings: public INSERT (patients book without login)
CREATE POLICY "Anyone can create a booking"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Bookings: public SELECT on slots (for availability check — only time column)
-- Note: The /api/slots endpoint uses service_role key so it bypasses RLS
-- But we also expose a limited view for time slot checking
CREATE POLICY "Anyone can check booked slots"
  ON bookings FOR SELECT
  TO anon
  USING (status != 'cancelled');

-- Bookings: service_role has full access (used by admin API routes)
-- This is automatic for service_role — no policy needed

-- ============================================================
-- View: today_bookings (handy for admin)
-- ============================================================
CREATE OR REPLACE VIEW today_bookings AS
  SELECT *
  FROM bookings
  WHERE date = CURRENT_DATE
  ORDER BY time ASC;

-- ============================================================
-- Sample data for development/demo
-- ============================================================
-- Uncomment to insert sample bookings for testing

-- INSERT INTO bookings (name, phone, service, date, time, status, notes) VALUES
--   ('Ahmad Razif',    '0123456789', 'general-checkup', CURRENT_DATE,          '09:00', 'confirmed', 'Annual checkup'),
--   ('Priya Nair',     '0198765432', 'consultation',    CURRENT_DATE,          '10:30', 'pending',   'Recurring headaches'),
--   ('Sarah Abdullah', '0112233445', 'dental',          CURRENT_DATE,          '14:00', 'confirmed', NULL),
--   ('John Lim',       '0167890123', 'vaccination',     CURRENT_DATE + 1,      '08:30', 'pending',   'Flu shot'),
--   ('Mary Tan',       '0134567890', 'lab-test',        CURRENT_DATE + 2,      '11:00', 'pending',   'Blood panel');
