import type { GameModeId, LeaderboardEntry, RoundResult } from '@/types';
import { supabase, isSupabaseEnabled } from './supabase';
import {
  addLocalLeaderboardEntry,
  getLocalLeaderboard,
  getGuestId,
} from './localStore';
import { seededShuffle, hashString } from '@/utils/random';

export interface LeaderboardPayload {
  userId: string;
  username: string;
  mode: GameModeId | 'all';
  category: string | null;
  score: number;
  correctCount: number;
  totalQuestions: number;
  maxStreak: number;
  durationSeconds: number;
}

/** Validates a leaderboard payload before it is persisted. Used in tests too. */
export function validateLeaderboardPayload(p: Partial<LeaderboardPayload>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (!p.userId) errors.push('userId is required');
  if (!p.username || p.username.trim().length === 0) errors.push('username is required');
  if (typeof p.score !== 'number' || p.score < 0) errors.push('score must be a non-negative number');
  if (typeof p.correctCount !== 'number' || p.correctCount < 0)
    errors.push('correctCount must be a non-negative number');
  if (typeof p.totalQuestions !== 'number' || p.totalQuestions < 0)
    errors.push('totalQuestions must be a non-negative number');
  if (
    typeof p.correctCount === 'number' &&
    typeof p.totalQuestions === 'number' &&
    p.totalQuestions > 0 &&
    p.correctCount > p.totalQuestions
  ) {
    errors.push('correctCount cannot exceed totalQuestions');
  }
  if (typeof p.maxStreak !== 'number' || p.maxStreak < 0) errors.push('maxStreak must be a non-negative number');
  if (!p.mode) errors.push('mode is required');
  return { valid: errors.length === 0, errors };
}

export function payloadFromRound(
  round: RoundResult,
  userId: string,
  username: string,
): LeaderboardPayload {
  return {
    userId,
    username,
    mode: round.mode,
    category: round.category,
    score: round.score,
    correctCount: round.correctCount,
    totalQuestions: round.totalQuestions,
    maxStreak: round.maxStreak,
    durationSeconds: round.durationSeconds,
  };
}

export async function submitScore(payload: LeaderboardPayload): Promise<void> {
  const { valid, errors } = validateLeaderboardPayload(payload);
  if (!valid) throw new Error(`Invalid leaderboard payload: ${errors.join(', ')}`);

  if (isSupabaseEnabled && supabase) {
    const { error } = await supabase.from('leaderboard_scores').insert({
      user_id: payload.userId,
      username: payload.username,
      mode: payload.mode,
      category: payload.category,
      score: payload.score,
      correct_count: payload.correctCount,
      total_questions: payload.totalQuestions,
      max_streak: payload.maxStreak,
      duration_seconds: payload.durationSeconds,
    });
    if (error) throw error;
    return;
  }

  // Local fallback.
  const entry: LeaderboardEntry = {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    userId: payload.userId,
    username: payload.username,
    mode: payload.mode,
    category: payload.category as LeaderboardEntry['category'],
    score: payload.score,
    correctCount: payload.correctCount,
    totalQuestions: payload.totalQuestions,
    maxStreak: payload.maxStreak,
    durationSeconds: payload.durationSeconds,
    createdAt: Date.now(),
  };
  addLocalLeaderboardEntry(entry);
}

export type LeaderboardScope = 'all-time' | 'daily' | 'weekly';

export interface LeaderboardQuery {
  scope: LeaderboardScope;
  mode?: GameModeId | 'all';
  category?: string | null;
  limit?: number;
}

function withinScope(createdAt: number, scope: LeaderboardScope): boolean {
  if (scope === 'all-time') return true;
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  if (scope === 'daily') return now - createdAt <= day;
  return now - createdAt <= 7 * day; // weekly
}

export async function fetchLeaderboard(
  q: LeaderboardQuery,
): Promise<LeaderboardEntry[]> {
  const limit = q.limit ?? 25;

  if (isSupabaseEnabled && supabase) {
    let query = supabase
      .from('leaderboard_scores')
      .select('*')
      .order('score', { ascending: false })
      .limit(limit);
    if (q.mode && q.mode !== 'all') query = query.eq('mode', q.mode);
    if (q.category) query = query.eq('category', q.category);
    if (q.scope !== 'all-time') {
      const day = 24 * 60 * 60 * 1000;
      const since = new Date(Date.now() - (q.scope === 'daily' ? day : 7 * day)).toISOString();
      query = query.gte('created_at', since);
    }
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map((r) => ({
      id: r.id,
      userId: r.user_id,
      username: r.username,
      mode: r.mode,
      category: r.category,
      score: r.score,
      correctCount: r.correct_count,
      totalQuestions: r.total_questions,
      maxStreak: r.max_streak,
      durationSeconds: r.duration_seconds,
      createdAt: new Date(r.created_at).getTime(),
    }));
  }

  // Local fallback merged with demo seed data so the board never looks empty.
  const local = getLocalLeaderboard();
  const merged = [...seedLeaderboard(), ...local]
    .filter((e) => withinScope(e.createdAt, q.scope))
    .filter((e) => (q.mode && q.mode !== 'all' ? e.mode === q.mode : true))
    .filter((e) => (q.category ? e.category === q.category : true))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return merged;
}

/** Find a user's rank within a scope (1-indexed), or null if unranked. */
export async function fetchUserRank(
  userId: string,
  q: LeaderboardQuery,
): Promise<number | null> {
  const board = await fetchLeaderboard({ ...q, limit: 1000 });
  const idx = board.findIndex((e) => e.userId === userId);
  return idx === -1 ? null : idx + 1;
}

/** Deterministic demo entries so a fresh guest still sees a lively board. */
let cachedSeed: LeaderboardEntry[] | null = null;
function seedLeaderboard(): LeaderboardEntry[] {
  if (cachedSeed) return cachedSeed;
  const names = [
    'NebulaNomad', 'QuizQuokka', 'TriviaTitan', 'PixelSage', 'AtlasAce',
    'CosmoCricket', 'LexiconLynx', 'ByteBandit', 'OrbitOwl', 'TerraTactician',
    'MetricMongoose', 'EchoElephant',
  ];
  const modes: (GameModeId | 'all')[] = ['classic', 'mixed-madness', 'survival', 'timed-rush', 'flag-frenzy'];
  const rand = (n: number) => Math.floor((seededShuffle([...Array(100).keys()], hashString('mork' + n))[0] ?? 0));
  cachedSeed = names.map((name, i) => {
    const score = 18000 - i * 1100 + (rand(i) % 400);
    const total = 10 + (i % 6);
    const correct = Math.max(1, Math.min(total, total - (i % 3)));
    return {
      id: `seed_${i}`,
      userId: `seed_${i}`,
      username: name,
      mode: modes[i % modes.length],
      category: null,
      score,
      correctCount: correct,
      totalQuestions: total,
      maxStreak: 3 + (i % 9),
      durationSeconds: 40 + (i % 30),
      // spread across the last week so daily/weekly views populate too
      createdAt: Date.now() - i * 9 * 60 * 60 * 1000,
    };
  });
  return cachedSeed;
}

export { getGuestId };
