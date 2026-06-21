import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES, GAME_MODES, GAME_MODE_MAP } from '@/data/categories';
import type { CategoryId, Difficulty, GameModeId } from '@/types';
import { CategoryBadge, SectionTitle } from '@/components/ui/Bits';
import { useGameStore } from '@/store/gameStore';
import { useAppStore } from '@/store/appStore';
import { QUESTION_COUNTS } from '@/data/questions';

const DIFFICULTIES: (Difficulty | 'any')[] = ['any', 'easy', 'medium', 'hard', 'expert'];

export function PlayPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const start = useGameStore((s) => s.start);
  const answeredIds = useAppStore((s) => s.answeredIds);

  const [mode, setMode] = useState<GameModeId>((params.get('mode') as GameModeId) || 'classic');
  const [category, setCategory] = useState<CategoryId | null>(
    (params.get('category') as CategoryId) || 'science',
  );
  const [difficulty, setDifficulty] = useState<Difficulty | 'any'>('any');
  const [error, setError] = useState<string | null>(null);

  const modeDef = GAME_MODE_MAP[mode];
  const needsCategory = modeDef?.requiresCategory;

  // Warn if the chosen category bank is mostly exhausted for this player.
  const lowBank = useMemo(() => {
    if (!needsCategory || !category) return false;
    const total = QUESTION_COUNTS[category] ?? 0;
    const fresh = total - countAnsweredIn(category, answeredIds);
    return total > 0 && fresh <= Math.max(3, Math.floor(total * 0.15));
  }, [needsCategory, category, answeredIds]);

  const handleStart = () => {
    const res = start({
      mode,
      category: needsCategory ? category : null,
      difficulty: difficulty === 'any' ? null : difficulty,
    });
    if (!res.ok) {
      setError(res.reason ?? 'Could not start the round.');
      return;
    }
    navigate('/game');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <SectionTitle kicker="Set up your run" title="Choose a mode" />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GAME_MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
              mode === m.id
                ? 'border-nebula-400/70 bg-nebula-500/15 shadow-glow'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            <span className="text-2xl">{m.glyph}</span>
            <div>
              <div className="font-semibold text-slate-100">{m.name}</div>
              <div className="text-sm text-slate-400">{m.blurb}</div>
            </div>
          </button>
        ))}
      </div>

      {needsCategory && (
        <div className="mt-10">
          <SectionTitle kicker="Pick a world" title="Category" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                  category === c.id
                    ? 'border-nebula-400/70 bg-nebula-500/15'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <CategoryBadge id={c.id} size="sm" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-slate-100">{c.name}</div>
                  <div className="text-[11px] text-slate-500">{QUESTION_COUNTS[c.id] ?? 0} Qs</div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div className="mb-2 text-sm font-medium text-slate-300">Difficulty</div>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`rounded-full px-4 py-1.5 text-sm capitalize transition ${
                    difficulty === d
                      ? 'bg-gradient-to-r from-nebula-500 to-magenta-500 text-white'
                      : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {lowBank && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-200"
            >
              ⚠️ You’ve answered most of this category. We’ll mix in some review questions to keep the round going.
            </motion.p>
          )}
        </div>
      )}

      {error && (
        <p className="mt-6 rounded-xl border border-rose-400/30 bg-rose-500/10 p-3 text-sm text-rose-200">{error}</p>
      )}

      <div className="sticky bottom-4 mt-10">
        <button onClick={handleStart} className="btn-primary w-full text-base">
          ▶ Start {modeDef?.name}
        </button>
      </div>
    </div>
  );
}

function countAnsweredIn(category: CategoryId, answeredIds: Set<string>): number {
  // Question ids are prefixed with their category (e.g. "science-001", "flags-fr").
  let n = 0;
  for (const id of answeredIds) if (id.startsWith(`${category}-`)) n++;
  return n;
}
