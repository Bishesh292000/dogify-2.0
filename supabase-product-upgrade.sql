-- DOGIFY Supabase product/search upgrade
-- Run this whole script once in the Supabase SQL Editor.

alter table if exists public.products
  add column if not exists subcategory text,
  add column if not exists brand text,
  add column if not exists pet_type text,
  add column if not exists tags text[] default '{}';

update public.products
set
  subcategory = coalesce(
    subcategory,
    case
      when category = 'food' then 'Dog Food'
      when category = 'accessories' then 'Accessories'
      when category = 'medicines' then 'Medicines'
      else initcap(category)
    end
  ),
  pet_type = coalesce(
    pet_type,
    case
      when category = 'food' then 'Dog'
      else 'All Pets'
    end
  ),
  tags = coalesce(tags, '{}')
where subcategory is null
   or pet_type is null
   or tags is null;

create index if not exists idx_products_subcategory on public.products(subcategory);
create index if not exists idx_products_brand on public.products(brand);
create index if not exists idx_products_pet_type on public.products(pet_type);
create index if not exists idx_products_tags on public.products using gin(tags);

create extension if not exists pg_trgm;

create index if not exists idx_products_name_trgm
on public.products using gin (name gin_trgm_ops);

create index if not exists idx_products_description_trgm
on public.products using gin (description gin_trgm_ops);

create index if not exists idx_products_brand_trgm
on public.products using gin (brand gin_trgm_ops);

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public view product images" on storage.objects;
create policy "Public view product images"
on storage.objects
for select
using (bucket_id = 'product-images');

drop policy if exists "Admin upload product images" on storage.objects;
create policy "Admin upload product images"
on storage.objects
for insert
with check (bucket_id = 'product-images');

insert into public.categories (name, slug)
values
  ('Food', 'food'),
  ('Accessories', 'accessories'),
  ('Medicines', 'medicines')
on conflict (slug) do nothing;

insert into public.products (
  name,
  category,
  subcategory,
  brand,
  pet_type,
  tags,
  price,
  image_url,
  description,
  stock,
  featured,
  is_active
)
values (
  'Premium Dog Food',
  'food',
  'Dog Food',
  'DOGIFY Select',
  'Dog',
  array['high-protein', 'adult', 'daily nutrition'],
  1299,
  '',
  'High protein dog food for everyday nutrition.',
  50,
  true,
  true
)
on conflict do nothing;
