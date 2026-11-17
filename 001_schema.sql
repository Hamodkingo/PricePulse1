-- PricePulse AI Database Schema
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  telegram_chat_id text,
  plan text default 'free',
  created_at timestamptz default now()
);

create table if not exists public.tracked_products (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  url text not null,
  target_price numeric,
  current_price numeric,
  currency text default 'USD',
  in_stock boolean default true,
  last_checked_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.price_history (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.tracked_products(id) on delete cascade not null,
  price numeric not null,
  in_stock boolean default true,
  recorded_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.tracked_products enable row level security;
alter table public.price_history enable row level security;
