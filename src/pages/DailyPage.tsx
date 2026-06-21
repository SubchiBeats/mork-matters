import { useNavigate } from 'react-router-dom';
import { getDailyChallenge, todayKey } from '@/utils/dailyChallenge';
import { CategoryBadge, SectionTitle, StatTile } from '@/components/ui/Bits';
import { useGameStore } from '@/store/gameStore';
import { useAppStore } from '@/store/appStore';
import { getCategory } from '@/data/categories';

export function DailyPage() {
  const navigate = useNavigate();
  const start = useGameStore((s) => s.start);
  const dailyHistory = useAppStore((s) => s.stats.dailyHistory);

  const today = todayKey();
  const questions = getDailyChallenge();
  const completedToday = dailyHistory.find((h) => h.date === today);

  const handleStart = () => {
    const res = start({ mode: 'daily' });
    if (res.ok) navigate('/game');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <SectionTitle
        kicker={`Daily challenge · ${today}`}
        title="Today’s 7"
        sub="Everyone in the world gets the exact same questions today. Come back tomorrow for a fresh set."
      />

      {completedToday && (
        <div className="mb-6 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-emerald-200">
          ✅ You’ve completed today’s challenge — scored{' '}
          <strong>{completedToday.score.toLocaleString()}</strong> ({completedToday.correct}/{completedToday.total}).
          You can replay it, but only your first result counts toward the daily streak.
        </div>
      )}

      <div className="card-surface p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {questions.map((q) => {
            const cat = getCategory(q.category);
            return (
              <span key={q.id} className="chip" style={{ borderColor: `${cat?.accent}55` }}>
                <CategoryBadge id={q.category} size="sm" />
                <span className="ml-1 capitalize">{q.difficulty}</span>
              </span>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <StatTile label="Questions" value={questions.length} />
          <StatTile label="Categories" value={new Set(questions.map((q) => q.category)).size} />
          <StatTile label="Your streak" value={`${dailyHistory.length} days`} />
        </div>
        <button onClick={handleStart} className="btn-primary mt-5 w-full">
          {completedToday ? '↻ Replay today’s challenge' : '▶ Start daily challenge'}
        </button>
      </div>

      {dailyHistory.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Recent dailies</h2>
          <div className="space-y-2">
            {dailyHistory.slice(0, 10).map((h) => (
              <div key={h.date} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <span className="text-sm text-slate-300">{h.date}</span>
                <span className="text-sm">
                  <span className="text-gradient font-bold">{h.score.toLocaleString()}</span>{' '}
                  <span className="text-slate-500">· {h.correct}/{h.total}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
