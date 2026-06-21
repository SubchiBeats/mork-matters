import type {
  AnsweredRecord,
  CategoryId,
  Difficulty,
  PlayerStats,
  RoundResult,
} from '@/types';

export function emptyStats(): PlayerStats {
  return {
    totalScore: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    bestStreak: 0,
    favoriteCategory: null,
    categoryStats: {},
    difficultyStats: {
      easy: { correct: 0, answered: 0 },
      medium: { correct: 0, answered: 0 },
      hard: { correct: 0, answered: 0 },
      expert: { correct: 0, answered: 0 },
    },
    dailyHistory: [],
    achievements: [],
    recent: [],
    updatedAt: Date.now(),
  };
}

/** Apply a finished round to a stats object, returning a new stats object. */
export function applyRound(prev: PlayerStats, round: RoundResult): PlayerStats {
  const stats: PlayerStats = structuredCloneSafe(prev);

  stats.totalScore += round.score;
  stats.totalCorrect += round.correctCount;
  stats.totalAnswered += round.totalQuestions;
  stats.bestStreak = Math.max(stats.bestStreak, round.maxStreak);

  for (const a of round.answers) {
    // category aggregates
    const c = (stats.categoryStats[a.category] ??= { correct: 0, answered: 0, score: 0 });
    c.answered += 1;
    if (a.answeredCorrectly) c.correct += 1;

    // difficulty aggregates
    const d = stats.difficultyStats[a.difficulty];
    d.answered += 1;
    if (a.answeredCorrectly) d.correct += 1;
  }
  // attribute round score to its category bucket (best-effort)
  if (round.category) {
    const c = (stats.categoryStats[round.category] ??= { correct: 0, answered: 0, score: 0 });
    c.score += round.score;
  }

  // recent (keep last 30)
  stats.recent = [...round.answers, ...stats.recent].slice(0, 30);

  // favorite category = most answered
  stats.favoriteCategory = favoriteCategory(stats);

  if (round.mode === 'daily') {
    const dateKey = new Date(round.playedAt).toISOString().slice(0, 10);
    if (!stats.dailyHistory.some((h) => h.date === dateKey)) {
      stats.dailyHistory = [
        { date: dateKey, score: round.score, correct: round.correctCount, total: round.totalQuestions },
        ...stats.dailyHistory,
      ].slice(0, 60);
    }
  }

  stats.updatedAt = Date.now();
  return stats;
}

export function favoriteCategory(stats: PlayerStats): CategoryId | null {
  let best: { cat: string; answered: number } | null = null;
  for (const [cat, v] of Object.entries(stats.categoryStats)) {
    if (!best || v.answered > best.answered) best = { cat, answered: v.answered };
  }
  return (best?.cat as CategoryId) ?? null;
}

export function accuracy(correct: number, answered: number): number {
  if (answered === 0) return 0;
  return Math.round((correct / answered) * 100);
}

export interface CategoryInsight {
  category: CategoryId;
  accuracy: number;
  answered: number;
}

/** Strongest / weakest categories (need a minimum sample to qualify). */
export function categoryInsights(stats: PlayerStats, minAnswered = 4): {
  strongest: CategoryInsight | null;
  weakest: CategoryInsight | null;
} {
  const entries: CategoryInsight[] = Object.entries(stats.categoryStats)
    .filter(([, v]) => v.answered >= minAnswered)
    .map(([cat, v]) => ({
      category: cat as CategoryId,
      accuracy: accuracy(v.correct, v.answered),
      answered: v.answered,
    }));

  if (entries.length === 0) return { strongest: null, weakest: null };
  const sorted = [...entries].sort((a, b) => b.accuracy - a.accuracy);
  return { strongest: sorted[0], weakest: sorted[sorted.length - 1] };
}

export function difficultyBreakdown(
  stats: PlayerStats,
): { difficulty: Difficulty; correct: number; answered: number; accuracy: number }[] {
  return (['easy', 'medium', 'hard', 'expert'] as Difficulty[]).map((d) => ({
    difficulty: d,
    correct: stats.difficultyStats[d].correct,
    answered: stats.difficultyStats[d].answered,
    accuracy: accuracy(stats.difficultyStats[d].correct, stats.difficultyStats[d].answered),
  }));
}

export function answeredFromRound(round: RoundResult): AnsweredRecord[] {
  return round.answers;
}

function structuredCloneSafe<T>(obj: T): T {
  if (typeof structuredClone === 'function') return structuredClone(obj);
  return JSON.parse(JSON.stringify(obj));
}
