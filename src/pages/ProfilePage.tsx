import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { CATEGORIES, getCategory } from '@/data/categories';
import { QUESTION_COUNTS, getQuestionById } from '@/data/questions';
import { accuracy, categoryInsights, difficultyBreakdown } from '@/lib/stats';
import { ACHIEVEMENTS } from '@/utils/achievements';
import { CategoryBadge, ProgressBar, SectionTitle, StatTile } from '@/components/ui/Bits';

export function ProfilePage() {
  const profile = useAppStore((s) => s.profile);
  const stats = useAppStore((s) => s.stats);
  const setUsername = useAppStore((s) => s.setUsername);
  const logout = useAppStore((s) => s.logout);
  const cloudEnabled = useAppStore((s) => s.cloudEnabled);

  const [name, setName] = useState(profile.username);
  const insights = categoryInsights(stats);
  const diffs = difficultyBreakdown(stats);
  const earned = new Set(stats.achievements);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="card-surface mb-6 flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-nebula-500 to-magenta-500 text-2xl font-bold">
          {profile.username.slice(0, 1).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => name.trim() && setUsername(name.trim())}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-lg font-semibold text-slate-100 focus:border-nebula-400 focus:outline-none"
              maxLength={20}
              aria-label="Username"
            />
            {profile.isGuest ? (
              <span className="chip text-amber-300">Guest</span>
            ) : (
              <span className="chip text-emerald-300">Cloud synced</span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-400">
            {profile.isGuest
              ? 'Progress saved on this device.'
              : 'Progress synced across all your devices.'}
          </p>
        </div>
        <div>
          {profile.isGuest && cloudEnabled ? (
            <Link to="/auth" className="btn-outline">
              Create cloud account
            </Link>
          ) : !profile.isGuest ? (
            <button onClick={() => logout()} className="btn-ghost">
              Sign out
            </button>
          ) : null}
        </div>
      </div>

      {/* Top stats */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Lifetime score" value={stats.totalScore.toLocaleString()} />
        <StatTile label="Answered" value={stats.totalAnswered} />
        <StatTile label="Accuracy" value={`${accuracy(stats.totalCorrect, stats.totalAnswered)}%`} />
        <StatTile label="Best streak" value={`${stats.bestStreak} 🔥`} />
      </div>

      {/* Strong / weak */}
      {(insights.strongest || insights.weakest) && (
        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          {insights.strongest && (
            <div className="card-surface flex items-center gap-3 p-4">
              <CategoryBadge id={insights.strongest.category} />
              <div>
                <div className="text-xs uppercase tracking-wider text-emerald-400">Strongest</div>
                <div className="font-semibold">{getCategory(insights.strongest.category)?.name}</div>
                <div className="text-sm text-slate-400">{insights.strongest.accuracy}% accuracy</div>
              </div>
            </div>
          )}
          {insights.weakest && (
            <div className="card-surface flex items-center gap-3 p-4">
              <CategoryBadge id={insights.weakest.category} />
              <div>
                <div className="text-xs uppercase tracking-wider text-rose-400">Needs work</div>
                <div className="font-semibold">{getCategory(insights.weakest.category)?.name}</div>
                <div className="text-sm text-slate-400">{insights.weakest.accuracy}% accuracy</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Category mastery */}
      <SectionTitle kicker="Progress" title="Category mastery" />
      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        {CATEGORIES.map((c) => {
          const cs = stats.categoryStats[c.id];
          const answered = cs?.answered ?? 0;
          const total = QUESTION_COUNTS[c.id] ?? 0;
          return (
            <div key={c.id} className="card-surface p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CategoryBadge id={c.id} size="sm" />
                  <span className="text-sm font-medium">{c.name}</span>
                </div>
                <span className="text-xs text-slate-400">
                  {answered}/{total} explored
                </span>
              </div>
              <ProgressBar value={answered} max={total} accent={c.accent} />
              {cs && cs.answered > 0 && (
                <div className="mt-1 text-xs text-slate-500">{accuracy(cs.correct, cs.answered)}% accuracy</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Difficulty breakdown */}
      <SectionTitle kicker="Skill" title="Difficulty breakdown" />
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {diffs.map((d) => (
          <div key={d.difficulty} className="card-surface p-4">
            <div className="text-xs uppercase tracking-wider text-slate-400 capitalize">{d.difficulty}</div>
            <div className="mt-1 text-xl font-bold text-gradient">{d.accuracy}%</div>
            <div className="text-xs text-slate-500">{d.correct}/{d.answered} correct</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <SectionTitle kicker="Trophies" title={`Badges (${earned.size}/${ACHIEVEMENTS.length})`} />
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {ACHIEVEMENTS.map((a) => {
          const has = earned.has(a.id);
          return (
            <div
              key={a.id}
              className={`card-surface flex items-center gap-3 p-3 ${has ? '' : 'opacity-40 grayscale'}`}
              title={a.description}
            >
              <span className="text-2xl">{a.glyph}</span>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{a.name}</div>
                <div className="truncate text-[11px] text-slate-500">{a.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent */}
      {stats.recent.length > 0 && (
        <>
          <SectionTitle kicker="History" title="Recently answered" />
          <div className="space-y-2">
            {stats.recent.slice(0, 12).map((r, i) => {
              const q = getQuestionById(r.questionId);
              return (
                <div key={r.questionId + i} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <span className={r.answeredCorrectly ? 'text-emerald-400' : 'text-rose-400'}>
                    {r.answeredCorrectly ? '✓' : '✕'}
                  </span>
                  <CategoryBadge id={r.category} size="sm" />
                  <span className="min-w-0 flex-1 truncate text-sm text-slate-300">{q?.prompt ?? r.questionId}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
