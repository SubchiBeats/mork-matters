import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// The 3D scene pulls in Three.js — lazy-load it so it never blocks first paint.
const KnowledgeScene = lazy(() =>
  import('@/components/3d/KnowledgeScene').then((m) => ({ default: m.KnowledgeScene })),
);
import { CATEGORIES, GAME_MODES } from '@/data/categories';
import { TOTAL_QUESTIONS, QUESTION_COUNTS } from '@/data/questions';
import { CategoryBadge, SectionTitle, StatTile } from '@/components/ui/Bits';
import { useAppStore } from '@/store/appStore';
import { accuracy } from '@/lib/stats';
import { BASE_POINTS } from '@/utils/scoring';
import { getDailyChallenge } from '@/utils/dailyChallenge';

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HomePage() {
  const stats = useAppStore((s) => s.stats);
  const daily = getDailyChallenge();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* HERO */}
      <section className="relative grid items-center gap-6 py-10 md:grid-cols-2 md:py-16">
        <div className="relative z-10">
          <motion.div initial="hidden" animate="show" variants={fade}>
            <span className="chip mb-4 border-nebula-400/40 text-nebula-300">
              ✨ {TOTAL_QUESTIONS}+ original questions · anti-repeat engine
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
              Trivia, <span className="text-gradient">leveled up.</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-slate-300">
              Travel a 3D universe of knowledge worlds. Answer across {CATEGORIES.length} categories,
              chase streaks, climb live leaderboards — and almost never see the same question twice.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/play" className="btn-primary text-base">
                ▶ Start playing
              </Link>
              <Link to="/daily" className="btn-outline text-base">
                📅 Daily challenge
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="relative h-[320px] sm:h-[420px] md:h-[520px]">
          <Suspense
            fallback={
              <div className="absolute inset-0 grid place-items-center">
                <div className="h-40 w-40 animate-float rounded-full bg-gradient-to-br from-nebula-500 to-magenta-500 opacity-70 blur-sm" />
              </div>
            }
          >
            <KnowledgeScene className="absolute inset-0" />
          </Suspense>
        </div>
      </section>

      {/* CATEGORY GALAXY */}
      <section className="py-12">
        <SectionTitle
          kicker="Category galaxy"
          title="Pick your world"
          sub="Each category is its own pocket of the universe. Master them all."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              variants={fade}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                to={`/play?category=${c.id}`}
                className="group flex h-full flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:border-white/20"
                style={{ boxShadow: `inset 0 0 40px -30px ${c.accent}` }}
              >
                <CategoryBadge id={c.id} size="lg" />
                <div className="mt-1 font-semibold text-slate-100">{c.name}</div>
                <div className="text-xs text-slate-400">{c.blurb}</div>
                <div className="mt-auto pt-2 text-[11px] text-slate-500">{QUESTION_COUNTS[c.id] ?? 0} questions</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GAME MODES */}
      <section className="py-12">
        <SectionTitle kicker="Game modes" title="Nine ways to play" sub="From a calm Classic Run to a brutal Final Boss." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GAME_MODES.map((m, i) => (
            <motion.div
              key={m.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                to={`/play?mode=${m.id}`}
                className="flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-nebula-400/40 hover:bg-white/10"
              >
                <span className="text-2xl">{m.glyph}</span>
                <div>
                  <div className="font-semibold text-slate-100">{m.name}</div>
                  <div className="text-sm text-slate-400">{m.blurb}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* YOUR STATS + LEADERBOARD PREVIEW */}
      <section className="grid gap-6 py-12 lg:grid-cols-2">
        <div>
          <SectionTitle kicker="Your journey" title="Player stats" />
          <div className="grid grid-cols-2 gap-3">
            <StatTile label="Lifetime score" value={stats.totalScore.toLocaleString()} />
            <StatTile label="Questions answered" value={stats.totalAnswered} hint={`${TOTAL_QUESTIONS} in the bank`} />
            <StatTile label="Accuracy" value={`${accuracy(stats.totalCorrect, stats.totalAnswered)}%`} />
            <StatTile label="Best streak" value={`${stats.bestStreak} 🔥`} />
          </div>
          <Link to="/profile" className="mt-4 inline-block text-sm text-nebula-400 hover:underline">
            View full profile →
          </Link>
        </div>

        <div>
          <SectionTitle kicker="Compete" title="Daily challenge" sub="The same 7 questions for everyone, every day." />
          <div className="card-surface p-5">
            <div className="flex flex-wrap gap-2">
              {daily.map((q) => (
                <CategoryBadge key={q.id} id={q.category} size="sm" />
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-400">
              Today’s mix spans {new Set(daily.map((q) => q.category)).size} categories. Beat it once per day to climb the daily board.
            </p>
            <Link to="/daily" className="btn-primary mt-4">
              Play today’s challenge
            </Link>
          </div>
        </div>
      </section>

      {/* SCORING */}
      <section className="py-12">
        <SectionTitle kicker="How scoring works" title="Every point, explained" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(['easy', 'medium', 'hard', 'expert'] as const).map((d) => (
            <div key={d} className="card-surface p-4">
              <div className="text-xs uppercase tracking-wider text-slate-400">{d}</div>
              <div className="mt-1 text-2xl font-bold text-gradient">{BASE_POINTS[d]} pts</div>
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
          <div className="card-surface p-4">⚡ <strong>Speed bonus</strong> — up to +50% for fast answers.</div>
          <div className="card-surface p-4">🔥 <strong>Streak bonus</strong> — +50 every 3 correct in a row.</div>
          <div className="card-surface p-4">💎 <strong>Perfect round</strong> — flawless runs earn a big finisher.</div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-nebula-600/30 via-magenta-600/20 to-aurora-500/20 p-10 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to explore the universe?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Jump in as a guest — no account needed. Your progress is saved on this device, and syncs to the cloud the moment you sign up.
          </p>
          <Link to="/play" className="btn-primary mx-auto mt-6 text-base">
            ▶ Start playing now
          </Link>
        </div>
      </section>
    </div>
  );
}
