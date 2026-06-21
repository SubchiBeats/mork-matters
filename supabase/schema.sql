-- ===========================================================================
-- Mork Matters — Supabase schema
-- Run this in the Supabase SQL editor (or `supabase db push`) to enable
-- cloud accounts, cross-device saves and the global live leaderboard.
-- The app works fully without this (guest mode) — it only needs these tables
-- when VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are configured.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- profiles: one row per authenticated user
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  username    text unique not null,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Profiles are publicly readable (so leaderboards can show usernames),
-- but a user may only insert/update their own row.
drop policy if exists "Profiles are viewable by everyone" on public.profiles;
create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- user_stats: aggregated lifetime stats (one row per user)
-- `detail` jsonb holds the richer breakdowns (category/difficulty/achievements)
-- ---------------------------------------------------------------------------
create table if not exists public.user_stats (
  user_id           uuid primary key references auth.users on delete cascade,
  total_score       integer not null default 0,
  total_correct     integer not null default 0,
  total_answered    integer not null default 0,
  best_streak       integer not null default 0,
  favorite_category text,
  detail            jsonb not null default '{}'::jsonb,
  updated_at        timestamptz not null default now()
);

alter table public.user_stats enable row level security;

drop policy if exists "Stats are viewable by everyone" on public.user_stats;
create policy "Stats are viewable by everyone"
  on public.user_stats for select using (true);

drop policy if exists "Users manage their own stats" on public.user_stats;
create policy "Users manage their own stats"
  on public.user_stats for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- answered_questions: every question a user has answered (drives anti-repeat)
-- ---------------------------------------------------------------------------
create table if not exists public.answered_questions (
  user_id            uuid not null references auth.users on delete cascade,
  question_id        text not null,
  answered_correctly boolean not null,
  category           text not null,
  difficulty         text not null,
  answered_at        timestamptz not null default now(),
  primary key (user_id, question_id)
);

create index if not exists answered_questions_user_idx
  on public.answered_questions (user_id);

alter table public.answered_questions enable row level security;

drop policy if exists "Users read their own answered questions" on public.answered_questions;
create policy "Users read their own answered questions"
  on public.answered_questions for select using (auth.uid() = user_id);

drop policy if exists "Users write their own answered questions" on public.answered_questions;
create policy "Users write their own answered questions"
  on public.answered_questions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- leaderboard_scores: one row per finished round
-- ---------------------------------------------------------------------------
create table if not exists public.leaderboard_scores (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users on delete cascade,
  username        text not null,
  mode            text not null,
  category        text,
  score           integer not null,
  correct_count   integer not null,
  total_questions integer not null,
  max_streak      integer not null,
  duration_seconds integer not null,
  created_at      timestamptz not null default now()
);

create index if not exists leaderboard_score_idx
  on public.leaderboard_scores (score desc);
create index if not exists leaderboard_created_idx
  on public.leaderboard_scores (created_at desc);
create index if not exists leaderboard_mode_idx
  on public.leaderboard_scores (mode);

alter table public.leaderboard_scores enable row level security;

drop policy if exists "Leaderboard is viewable by everyone" on public.leaderboard_scores;
create policy "Leaderboard is viewable by everyone"
  on public.leaderboard_scores for select using (true);

drop policy if exists "Users insert their own scores" on public.leaderboard_scores;
create policy "Users insert their own scores"
  on public.leaderboard_scores for insert with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- daily_challenges: optional server-side record of each day's question set.
-- The client generates the daily set deterministically from the date, so this
-- table is optional — handy if you later want to lock sets server-side.
-- ---------------------------------------------------------------------------
create table if not exists public.daily_challenges (
  challenge_date date primary key,
  question_ids   text[] not null,
  created_at     timestamptz not null default now()
);

alter table public.daily_challenges enable row level security;

drop policy if exists "Daily challenges are viewable by everyone" on public.daily_challenges;
create policy "Daily challenges are viewable by everyone"
  on public.daily_challenges for select using (true);

-- ---------------------------------------------------------------------------
-- Role grants
-- Tables created via the dashboard get these automatically; tables created via
-- raw SQL do not, so we grant them explicitly. Row-level security (enabled
-- above) still governs which rows each role can actually see or modify — these
-- grants only make the tables reachable by the API roles.
-- ---------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;

-- Public, RLS-gated read access (anon can only see rows allowed by policy).
grant select on
  public.profiles,
  public.user_stats,
  public.answered_questions,
  public.leaderboard_scores,
  public.daily_challenges
to anon, authenticated;

-- Signed-in users may write; RLS restricts them to their own rows.
grant insert, update, delete on
  public.profiles,
  public.user_stats,
  public.answered_questions,
  public.leaderboard_scores
to authenticated;
