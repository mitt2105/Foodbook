-- FOODBOOK database schema
create extension if not exists pgcrypto;

create table if not exists public.eateries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'Cơm chay',
  description text not null default '',
  best_sellers text[] not null default '{}',
  price_min integer not null default 0 check (price_min >= 0),
  price_max integer not null default 0 check (price_max >= price_min),
  address text not null,
  ward text not null default '',
  old_district text not null,
  city text not null default 'TP. Hồ Chí Minh',
  maps_url text not null default '',
  cover_image text not null default '',
  gallery text[] not null default '{}',
  note text not null default '',
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep the stored collection scoped to vegetarian categories. NOT VALID keeps
-- existing rows untouched while enforcing the rule for new or changed rows.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'eateries_vegetarian_category_check'
      and conrelid = 'public.eateries'::regclass
  ) then
    alter table public.eateries
      add constraint eateries_vegetarian_category_check
      check (category in (
        'Cơm chay', 'Món Việt chay', 'Lẩu chay', 'Món nước chay',
        'Món Nhật chay', 'Món Hàn chay', 'Ăn vặt chay', 'Cà phê & bánh chay'
      )) not valid;
  end if;
end $$;

create index if not exists eateries_old_district_idx on public.eateries(old_district);
create index if not exists eateries_category_idx on public.eateries(category);
create index if not exists eateries_active_idx on public.eateries(active);

alter table public.eateries enable row level security;

-- Public can view active places only.
create policy "Public can read active eateries"
on public.eateries for select
to anon, authenticated
using (active = true);

-- Only users whose app_metadata.role is explicitly set to 'admin' can write.
-- Set this claim for your own user from Supabase Dashboard / trusted server-side admin tooling.
-- Never let a public client edit app_metadata.
create policy "FOODBOOK admins can insert eateries"
on public.eateries for insert
to authenticated
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "FOODBOOK admins can update eateries"
on public.eateries for update
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "FOODBOOK admins can delete eateries"
on public.eateries for delete
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Storage bucket for restaurant photos. Set bucket to public for public image display.
insert into storage.buckets (id, name, public)
values ('foodbook-images', 'foodbook-images', true)
on conflict (id) do nothing;

create policy "Public can view FOODBOOK images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'foodbook-images');

create policy "FOODBOOK admins can upload images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'foodbook-images'
  and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

create policy "FOODBOOK admins can update images"
on storage.objects for update
to authenticated
using (bucket_id = 'foodbook-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check (bucket_id = 'foodbook-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "FOODBOOK admins can delete images"
on storage.objects for delete
to authenticated
using (bucket_id = 'foodbook-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
