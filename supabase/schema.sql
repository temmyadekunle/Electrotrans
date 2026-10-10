-- Electrotrans client enquiry database schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New query)

-- 1. Enquiries (from the Contact page form)
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text,
  email text not null,
  phone text,
  service text not null,
  message text not null,
  status text not null default 'new'
);

-- 2. Requests (from the client portal: hire, buy, fault report, quote)
create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('hire', 'buy', 'fault', 'quote')),
  ref text,
  equipment text,
  name text,
  phone text,
  email text,
  details text,
  files integer not null default 0,
  status text not null default 'new'
);

-- Row Level Security
alter table public.enquiries enable row level security;
alter table public.requests enable row level security;

-- Anyone may submit (INSERT) a new enquiry / request
create policy "allow public insert enquiries" on public.enquiries
  for insert with check (true);

create policy "allow public insert requests" on public.requests
  for insert with check (true);

-- Only logged-in admins may read or update submissions
create policy "allow authed select enquiries" on public.enquiries
  for select using (auth.role() = 'authenticated');

create policy "allow authed update enquiries" on public.enquiries
  for update using (auth.role() = 'authenticated');

create policy "allow authed select requests" on public.requests
  for select using (auth.role() = 'authenticated');

create policy "allow authed update requests" on public.requests
  for update using (auth.role() = 'authenticated');