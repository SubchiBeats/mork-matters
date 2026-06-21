import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { GameModeId, LeaderboardEntry } from '@/types';
import { fetchLeaderboard, fetchUserRank, type LeaderboardScope } from '@/lib/leaderboard';
import { GAME_MODES, getCategory } from '@/data/categories';
import { SectionTitle } from '@/components/ui/Bits';
import { useAppStore } from '@/store/appStore';

const SCOPES: { id: LeaderboardScope; label: string }[] = [
  { id: 'all-time', label: 'All-time' },
  { id: 'weekly', label: 'This week' },
  { id: 'daily', label: 'Today' },
];

export function LeaderboardPage() {
  const profile = useAppStore((s) => s.profile);
  const cloudEnabled = useAppStore((s) => s.cloudEnabled);
  const [scope, setScope] = useState<LeaderboardScope>('all-time');
  const [mode, setMode] = useState<GameModeId | 'all'>('all');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [rank, setRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const [board, userRank] = await Promise.all([
          fetchLeaderboard({ scope, mode, limit: 25 }),
          fetchUserRank(profile.id, { scope, mode }),
        ]);
        if (!cancelled) {
          setEntries(board);
          setRank(userRank);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [scope, mode, profile.id]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <SectionTitle
        kicker="Compete"
        title="Leaderboard"
        sub={
          cloudEnabled
            ? 'Live global rankings powered by Supabase.'
            : 'Local + demo rankings. Connect Supabase to compete globally.'
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {SCOPES.map((s) => (
          <button
            key={s.id}
            onClick={() => setScope(s.id)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              scope === s.id ? 'bg-gradient-to-r from-nebula-500 to-magenta-500 text-white' : 'border border-white/10 bg-white/5 text-slate-300'
            }`}
          >
            {s.label}
          </button>
        ))}
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as GameModeId | 'all')}
          className="ml-auto rounded-lg border border-white/10 bg-ink-800 px-3 py-1.5 text-sm text-slate-200"
        >
          <option value="all">All modes</option>
          {GAME_MODES.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {rank !== null && (
        <div className="mb-4 rounded-xl border border-nebula-400/30 bg-nebula-500/10 p-3 text-sm text-nebula-100">
          Your rank in this view: <strong>#{rank}</strong>
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-slate-400">Loading rankings…</div>
      ) : entries.length === 0 ? (
        <div className="py-16 text-center text-slate-400">No scores yet — be the first!</div>
      ) : (
        <div className="space-y-2">
          {entries.map((e, i) => {
            const isMe = e.userId === profile.id;
            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null;
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.025 }}
                className={`flex items-center gap-3 rounded-xl border p-3 ${
                  isMe ? 'border-nebula-400/60 bg-nebula-500/15' : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <div className="w-8 text-center text-lg font-bold text-slate-400">{medal ?? i + 1}</div>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sm font-semibold">
                  {e.username.slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-slate-100">
                    {e.username} {isMe && <span className="text-xs text-nebula-300">(you)</span>}
                  </div>
                  <div className="text-xs text-slate-500">
                    {e.mode}
                    {e.category ? ` · ${getCategory(e.category)?.name}` : ''} · {e.correctCount}/{e.totalQuestions} · 🔥{e.maxStreak}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gradient">{e.score.toLocaleString()}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
