import { motion } from 'framer-motion';

export function HUD({
  score,
  streak,
  lives,
  questionNumber,
  totalQuestions,
  secondsLeft,
  timeMode,
}: {
  score: number;
  streak: number;
  lives: number | null;
  questionNumber: number;
  totalQuestions: number | null;
  secondsLeft: number;
  timeMode: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="card-surface px-4 py-2">
          <div className="text-[10px] uppercase tracking-wider text-slate-400">Score</div>
          <motion.div key={score} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-xl font-bold text-gradient">
            {score.toLocaleString()}
          </motion.div>
        </div>

        <StreakMeter streak={streak} />
      </div>

      <div className="flex items-center gap-3">
        {lives !== null && (
          <div className="flex items-center gap-1 text-lg" aria-label={`${lives} lives remaining`}>
            {Array.from({ length: Math.max(lives, 0) }).map((_, i) => (
              <span key={i}>❤️</span>
            ))}
            {lives <= 0 && <span className="text-sm text-slate-500">—</span>}
          </div>
        )}

        {totalQuestions ? (
          <div className="chip">
            Q {questionNumber}/{totalQuestions}
          </div>
        ) : (
          <div className="chip">Q {questionNumber}</div>
        )}

        <TimerRing seconds={secondsLeft} max={timeMode ? secondsLeft : 20} timeMode={timeMode} />
      </div>
    </div>
  );
}

export function StreakMeter({ streak }: { streak: number }) {
  const pct = Math.min(100, (streak % 3 === 0 && streak > 0 ? 3 : streak % 3) * 33.34);
  const hot = streak >= 3;
  return (
    <div className="card-surface flex items-center gap-2 px-3 py-2">
      <span className={hot ? 'animate-pulse text-lg' : 'text-lg opacity-60'}>🔥</span>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-slate-400">Streak {streak}</div>
        <div className="mt-1 h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-500 transition-[width]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function TimerRing({ seconds, max, timeMode }: { seconds: number; max: number; timeMode: boolean }) {
  const frac = max > 0 ? Math.max(0, Math.min(1, seconds / max)) : 0;
  const danger = seconds <= (timeMode ? 10 : 5);
  return (
    <div
      className={`grid h-11 w-11 place-items-center rounded-full text-sm font-bold ${
        danger ? 'text-rose-400' : 'text-slate-200'
      }`}
      style={{
        background: `conic-gradient(${danger ? '#fb7185' : '#22d3ee'} ${frac * 360}deg, rgba(255,255,255,0.08) 0deg)`,
      }}
      aria-label={`${seconds} seconds left`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-800">{Math.ceil(seconds)}</span>
    </div>
  );
}
