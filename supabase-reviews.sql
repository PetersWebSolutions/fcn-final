-- FCN Medical Reviews — Supabase table
-- Run this in Supabase SQL Editor

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  stars int not null check (stars >= 1 and stars <= 5),
  review_text text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.reviews enable row level security;

-- Allow anyone to insert (for Add Review popup) — pending only
create policy "Allow insert pending reviews"
on public.reviews for insert
to anon, authenticated
with check (status = 'pending');

-- Allow anyone to read approved reviews (for auto-add to carousel)
create policy "Allow read approved reviews"
on public.reviews for select
to anon, authenticated
using (status = 'approved');

-- Allow service_role to do all (for admin approval)
-- No extra policy needed for service_role (bypasses RLS)

-- Optional: index for faster fetch
create index if not exists reviews_status_created_at_idx on public.reviews (status, created_at desc);

-- Optional: Enable email notification via Supabase Webhook or Edge Function
-- You can create a Database Webhook on INSERT to call your Vercel /api/notify-review function
-- Webhook URL: https://your-vercel-url.vercel.app/api/notify-review
-- It will send email to peterswebsolutions@gmail.com
