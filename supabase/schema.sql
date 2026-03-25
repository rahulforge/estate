create extension if not exists pgcrypto;

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  price bigint not null,
  location text not null,
  property_type text not null check (property_type in ('flat', 'plot', 'commercial')),
  area_sqft integer not null,
  bedrooms integer default 0,
  bathrooms integer default 0,
  description text not null,
  amenities jsonb default '[]'::jsonb,
  images jsonb default '[]'::jsonb,
  hero_image text,
  latitude numeric,
  longitude numeric,
  featured boolean default false,
  only_few_left boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text not null,
  property_name text,
  created_at timestamptz default now()
);

alter table public.properties enable row level security;
alter table public.leads enable row level security;

create policy "Public can read properties"
on public.properties for select
using (true);

create policy "Public can insert leads"
on public.leads for insert
with check (true);

create policy "Authenticated admins manage properties"
on public.properties for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Authenticated admins read leads"
on public.leads for select
using (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

create policy "Public can view property images"
on storage.objects for select
using (bucket_id = 'property-images');

create policy "Authenticated users can upload property images"
on storage.objects for insert
with check (bucket_id = 'property-images' and auth.role() = 'authenticated');

create policy "Authenticated users can update property images"
on storage.objects for update
using (bucket_id = 'property-images' and auth.role() = 'authenticated')
with check (bucket_id = 'property-images' and auth.role() = 'authenticated');

create policy "Authenticated users can delete property images"
on storage.objects for delete
using (bucket_id = 'property-images' and auth.role() = 'authenticated');

-- Optional demo data
-- Run `supabase/seed-demo-properties.sql` after this schema if you want 24 ready-made properties.
