-- ============================================================
-- Seed data — initial fare overrides for all 16 services
-- Run this AFTER schema.sql to populate the fare_overrides table
-- Values are in NGN. Adjust as rates change.
-- ============================================================

insert into public.fare_overrides (service_id, base_fare, per_km, per_min, min_fare, booking_fee, notes) values
  ('uber',      400, 85, 18, 700, 100, 'UberX Lagos rates — updated June 2025'),
  ('bolt',      300, 75, 15, 600, 100, 'Bolt standard Lagos — updated June 2025'),
  ('indriver',  0,   65, 12, 500, 0,   'Bid-based, these are typical accepted bids'),
  ('yango',     250, 70, 14, 500, 50,  'Yango Economy Lagos'),
  ('lyft',      450, 90, 20, 800, 100, 'Limited coverage in Lagos'),
  ('gokada',    150, 50, 8,  300, 50,  'Bike service, Lagos only'),
  ('rida',      200, 55, 10, 400, 0,   'Budget ride, Lagos & Abuja'),
  ('oride',     100, 45, 7,  250, 0,   'Bike, Lagos & Ibadan'),
  ('max',       200, 55, 9,  350, 50,  'Bike/tricycle, Lagos & Abuja'),
  ('safeboda',  100, 40, 7,  250, 0,   'Bike, Lagos & Ibadan'),
  ('taxify',    300, 75, 15, 600, 100, 'Same as Bolt (rebranded)'),
  ('lagride',   350, 70, 12, 600, 0,   'Government-regulated, Lagos only'),
  ('shuttlers', 500, 25, 5,  800, 0,   'Shared bus, scheduled routes'),
  ('treepz',    800, 20, 4,  1200, 100, 'Intercity shuttle/charter'),
  ('moove',     300, 65, 13, 550, 50,  'Fleet partner rides'),
  ('littlecab', 250, 70, 14, 500, 50,  'Economy, Lagos & Abuja')
on conflict (service_id) do update set
  base_fare   = excluded.base_fare,
  per_km      = excluded.per_km,
  per_min     = excluded.per_min,
  min_fare    = excluded.min_fare,
  booking_fee = excluded.booking_fee,
  notes       = excluded.notes,
  updated_at  = now();
