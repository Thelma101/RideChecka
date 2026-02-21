-- ============================================================
-- RideChecka — Supabase database schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Profiles — synced with Supabase Auth users
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text not null default '',
  phone      text default '',
  avatar_url text default '',
  language   text default 'en',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Users can read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.phone, ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- 2. Searches — every price comparison that happens
create table if not exists public.searches (
  id               bigint generated always as identity primary key,
  user_id          uuid references auth.users(id) on delete set null,
  pickup_address   text not null,
  pickup_lat       double precision not null,
  pickup_lng       double precision not null,
  dest_address     text not null,
  dest_lat         double precision not null,
  dest_lng         double precision not null,
  distance_km      double precision,
  cheapest_service text,
  cheapest_price   integer,
  created_at       timestamptz default now()
);

alter table public.searches enable row level security;

-- Anyone can insert (anonymous searches for non-logged-in users)
create policy "Anyone can insert searches"
  on public.searches for insert
  with check (true);

-- Users can read their own searches
create policy "Users can view own searches"
  on public.searches for select
  using (auth.uid() = user_id);


-- 3. Favorites — user-saved routes
create table if not exists public.favorites (
  id            bigint generated always as identity primary key,
  user_id       uuid not null references auth.users(id) on delete cascade,
  name          text default '',
  pickup_address text not null,
  pickup_lat    double precision not null,
  pickup_lng    double precision not null,
  dest_address  text not null,
  dest_lat      double precision not null,
  dest_lng      double precision not null,
  created_at    timestamptz default now()
);

alter table public.favorites enable row level security;

create policy "Users can manage own favorites"
  on public.favorites for all
  using (auth.uid() = user_id);


-- 4. Fare overrides — admin-editable rate adjustments per service
--    The frontend reads these and merges them over the built-in fare models.
create table if not exists public.fare_overrides (
  id          bigint generated always as identity primary key,
  service_id  text not null unique,
  base_fare   integer,
  per_km      integer,
  per_min     integer,
  min_fare    integer,
  booking_fee integer,
  notes       text default '',
  updated_at  timestamptz default now()
);

alter table public.fare_overrides enable row level security;

-- Anyone can read fare overrides (public data)
create policy "Public read fare overrides"
  on public.fare_overrides for select
  using (true);

-- Only service_role / admin can modify
create policy "Admin can modify fare overrides"
  on public.fare_overrides for all
  using (auth.role() = 'service_role');


-- 5. Fare reports — crowdsourced actual fare data for calibration
--    Users report what they actually paid after booking via RideChecka.
create table if not exists public.fare_reports (
  id              bigint generated always as identity primary key,
  user_id         uuid references auth.users(id) on delete set null,
  service_id      text not null,
  pickup_lat      double precision not null,
  pickup_lng      double precision not null,
  dest_lat        double precision not null,
  dest_lng        double precision not null,
  actual_fare     integer not null,
  estimated_fare  integer not null,
  note            text default '',
  created_at      timestamptz default now()
);

alter table public.fare_reports enable row level security;

-- Anyone can insert fare reports (even anonymous)
create policy "Anyone can insert fare reports"
  on public.fare_reports for insert
  with check (true);

-- Users can read their own fare reports
create policy "Users can view own fare reports"
  on public.fare_reports for select
  using (auth.uid() = user_id);

-- Admin can read all fare reports for calibration
create policy "Service role can read all fare reports"
  on public.fare_reports for select
  using (auth.role() = 'service_role');


-- 6. Indexes for common queries
create index if not exists idx_searches_user    on public.searches (user_id, created_at desc);
create index if not exists idx_favorites_user   on public.favorites (user_id, created_at desc);
create index if not exists idx_fare_overrides_service on public.fare_overrides (service_id);
create index if not exists idx_fare_reports_service   on public.fare_reports (service_id, created_at desc);
create index if not exists idx_fare_reports_location  on public.fare_reports (pickup_lat, pickup_lng, dest_lat, dest_lng);


-- ============================================================
-- Done! Now go to Settings → API and copy your project URL +
-- anon key into the .env file of your RideChecka project.
-- ============================================================
