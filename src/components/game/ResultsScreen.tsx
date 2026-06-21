import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { getCategory, GAME_MODE_MAP } from '@/data/categories';
import { getQuestionById } from '@/data/questions';
import { accuracy } from '@/lib/stats';
import { StatTile } from '@/components/ui/Bits';
import { useSound } from '@/hooks/useSound';

export function ResultsScreen({ onExit }: { onExit: () => void }) {
  const result = useGameStore((s) => s.result);
  const reset = useGameStore((s) => s.reset);
  const start = useGameStore((s) => s.start);
  const play = useSound();

  useEffect(() => {
    play('win');
  }, [play]);

  if (!result) return null;
  const acc = accuracy(result.correctCount, result.totalQuestions);
  const modeDef = GAME_MODE_MAP[result.mode];

  const playAgain = () => {
    const cfg = { mode: result.mode, category: result.category, difficulty: null };
    reset();
    const res = start(cfg);
    if (!res.ok) onExit();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-surface overflow-hidden p-6 text-center sm:p-8"
      >
        <div className="text-5xl">{result.perfect ? '💎' : acc >= 70 ? '🎉' : acc >= 40 ? '👍' : '🌱'}</div>
        <h1 className="mt-3 font-display text-3xl font-bold">
          {result.perfect ? 'Perfect run!' : 'Round complete'}
        </h1>
        <p className="mt-1 text-slate-400">
          {modeDef?.name}
          {result.category ? ` · ${getCategory(result.category)?.name}` : ''}
        </p>

        <div className="my-6 text-6xl font-bold text-gradient">{result.score.toLocaleString()}</div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Correct" value={`${result.correctCount}/${result.totalQuestions}`} />
          <StatTile label="Accuracy" value={`${acc}%`} />
          <StatTile label="Best streak" value={`${result.maxStreak} 🔥`} />
          <StatTile label="Time" value={`${result.durationSeconds}s`} />
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button onClick={playAgain} className="btn-primary">
            ↻ Play again
          </button>
          <Link to="/leaderboard" className="btn-outline" onClick={reset}>
            🏆 Leaderboard
          </Link>
          <button onClick={() => { reset(); onExit(); }} className="btn-ghost">
            Change mode
          </button>
        </div>
      </motion.div>

      {/* Per-question recap */}
      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Review</h2>
        <div className="space-y-2">
          {result.answers.map((a, i) => {
            const q = getQuestionById(a.questionId);
            return (
              <div
                key={a.questionId + i}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
              >
                <span className={a.answeredCorrectly ? 'text-emerald-400' : 'text-rose-400'}>
                  {a.answeredCorrectly ? '✓' : '✕'}
                </span>
                <div className="min-w-0">
                  <div className="text-sm text-slate-200">{q?.prompt}</div>
                  {!a.answeredCorrectly && q && (
                    <div className="text-xs text-emerald-300">Answer: {q.correctAnswer}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
