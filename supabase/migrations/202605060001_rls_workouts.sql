alter table public.workouts enable row level security;

-- Authenticated users can read all workouts
create policy "authenticated_read_workouts"
  on public.workouts
  for select
  to authenticated
  using (true);

-- Only service_role (Edge Functions) can insert workouts
create policy "service_role_insert_workouts"
  on public.workouts
  for insert
  to service_role
  with check (true);

-- Only service_role can update workouts
create policy "service_role_update_workouts"
  on public.workouts
  for update
  to service_role
  using (true)
  with check (true);

-- Only service_role can delete workouts
create policy "service_role_delete_workouts"
  on public.workouts
  for delete
  to service_role
  using (true);

-- Admin role for web-based admin access
do $$
begin
  if not exists (select from pg_roles where rolname = 'admin') then
    create role admin;
  end if;
end
$$;

grant usage on schema public to admin;
grant select, insert, update, delete on public.workouts to admin;

create policy "admin_manage_workouts"
  on public.workouts
  for all
  to admin
  using (true)
  with check (true);
