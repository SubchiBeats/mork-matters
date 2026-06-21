# 🧠 Mork Matters

**Trivia, leveled up.** A 3D, category-based trivia universe with an anti-repeat
question engine, cloud saves, daily challenges and a live leaderboard.

Built as a portfolio-grade single-page app: React + TypeScript + Vite, a
React-Three-Fiber knowledge hub, Framer Motion UI, Tailwind styling, and an
optional Supabase backend. **Playable instantly as a guest — no account
required.**

> Live demo: `https://SubchiBeats.github.io/mork-matters/`
> (enabled automatically by the GitHub Pages workflow after the first push)

---

## ✨ Features

- **500+ original questions** across 14 categories (Science, History, Geography,
  Sports, Entertainment, Flags, Music, Movies & TV, Video Games, Literature,
  Technology, Food & Culture, World Records, General Knowledge).
- **Real anti-repeat engine** — every question has a stable id; answered ids are
  tracked per player (localStorage for guests, Supabase for accounts) and
  filtered out of future rounds. Runs out of fresh questions? You get a clear
  "review mode" warning instead of silent repeats.
- **9 game modes** — Classic Run, Category Clash, Survival, Timed Rush, Streak
  Challenge, Daily Challenge, Flag Frenzy, Mixed Madness, and a brutal Final Boss.
- **Interactive 3D hub** — a floating "knowledge planet" with orbiting category
  orbs that react to your pointer, plus a graceful CSS fallback for devices
  without WebGL.
- **Flag identification mode** — real public-domain flag artwork, plausible
  same-continent decoys, and optional continent/capital hints.
- **Scoring with depth** — difficulty base points, speed bonus, streak bonus,
  difficulty multiplier and a perfect-round finisher.
- **Live leaderboard** — global / weekly / daily scopes, mode filters, your
  personal rank, and animated rank cards (seeded demo data in guest mode).
- **Profile & stats** — accuracy, strongest/weakest categories, per-category
  mastery bars, difficulty breakdown, recent history and **13 achievements**.
- **Daily challenge** — the same 7 questions for everyone each day, generated
  deterministically from the date (no server needed).
- **Polish** — dark/night mode (reshapes the 3D scene), system-preference aware,
  reduced-motion and high-contrast accessibility settings, synthesized sound
  effects, keyboard controls (1–4 / A–D to answer, Enter for next), and a fully
  responsive layout.

## 🖼️ Screenshots

| Home / 3D hub | In-game | Flag Frenzy |
| --- | --- | --- |
| _add `docs/home.png`_ | _add `docs/game.png`_ | _add `docs/flags.png`_ |

> Drop screenshots into a `docs/` folder and update the links above.

## 🧰 Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 |
| 3D | Three.js via @react-three/fiber + drei |
| Animation | Framer Motion |
| State | Zustand |
| Routing | React Router (HashRouter for static hosting) |
| Backend (optional) | Supabase (auth, Postgres, RLS) |
| Tests | Vitest |

## 🚀 Local setup

```bash
git clone https://github.com/SubchiBeats/mork-matters.git
cd mork-matters
npm install
npm run dev          # http://localhost:5173
```

Other scripts:

```bash
npm run build        # type-check + production build to dist/
npm run preview      # preview the production build
npm test             # run the Vitest suite
npm run typecheck    # type-check only
```

## ☁️ Supabase setup (optional)

The app runs fully in **guest mode** without any backend. To enable accounts,
cross-device cloud saves and the global leaderboard:

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run [`supabase/schema.sql`](supabase/schema.sql).
   It creates the `profiles`, `user_stats`, `answered_questions`,
   `leaderboard_scores` and `daily_challenges` tables **with row-level security
   policies**.
3. Copy your project URL and anon/publishable key from **Settings → API**.
4. Create a `.env` file (see `.env.example`):

   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-publishable-anon-key
   ```

5. Restart `npm run dev`. The nav will now show **Sign in**, and finished rounds
   sync to the cloud and the global leaderboard.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | No | Supabase project URL. Omit for guest-only mode. |
| `VITE_SUPABASE_ANON_KEY` | No | Supabase publishable/anon key. |
| `VITE_BASE` | No | Base path for hosting under a subpath (Pages sets `/mork-matters/`). |

## 🗃️ Database schema

See [`supabase/schema.sql`](supabase/schema.sql) for the full DDL + RLS policies.
Summary:

- **profiles** — `id`, `username`, `avatar_url`, timestamps.
- **user_stats** — lifetime aggregates + a `detail` jsonb for category/difficulty
  breakdowns, achievements and recent history.
- **answered_questions** — `(user_id, question_id)` primary key; powers anti-repeat.
- **leaderboard_scores** — one row per finished round.
- **daily_challenges** — optional server-side record of each day's set.

## 🌱 How questions are seeded

Questions live in [`src/data/questions/`](src/data/questions), one file per
category, authored with a compact `build()` / `tf()` helper that produces fully
typed `Question` objects with stable ids, explanations and tags. The flag bank is
generated from a country dataset (name, ISO code, continent, capital) with
deterministic same-continent decoys. `bank.test.ts` enforces uniqueness,
correct-answer presence, no duplicate choices, and the 500+ minimum.

To add questions, append entries to the relevant category file — ids are
auto-prefixed (`science-046`, …) so they stay globally unique.

## 🔁 How anti-repeat works

`src/utils/questionEngine.ts` → `getNextQuestions()`:

1. Filter the bank by category / difficulty / type.
2. Remove anything used **this session** (hard rule — never repeat in a run).
3. Prefer questions the player has **never** answered.
4. If there aren't enough fresh ones, top up with previously-seen questions and
   set `usedReview` so the UI warns the player.
5. Always shuffle, so order is unpredictable.

Answered ids come from `localStorage` for guests and from the
`answered_questions` table for signed-in users (the two are unioned after login).

## 📦 Deployment

### GitHub Pages (default)

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs type-check +
tests, builds with `VITE_BASE=/mork-matters/`, and deploys to Pages on every push
to `main`. Enable it once:

1. Push the repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. (Optional) add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under
   **Settings → Secrets and variables → Actions** to ship with cloud features.

### Netlify / Vercel

Build command `npm run build`, publish directory `dist`. Leave `VITE_BASE` unset
(defaults to `/`). Add the Supabase env vars in the dashboard if desired.

## 🗺️ Roadmap

- Server-validated scores + anti-cheat for the global board.
- Friends / private leagues and head-to-head live matches.
- Question authoring UI + community submissions with moderation.
- More flags and an SVG-based flag renderer for offline play.
- Spaced-repetition "review mode" that resurfaces missed questions.
- i18n and localized question banks.

## 📄 License

MIT © Sahib Singh. Flag artwork via [flagcdn.com](https://flagcdn.com) (public
domain). Mork Matters is an original project and is not affiliated with any
existing trivia brand.
