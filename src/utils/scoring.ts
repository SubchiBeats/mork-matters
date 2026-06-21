import type { Difficulty } from '@/types';

export const BASE_POINTS: Record<Difficulty, number> = {
  easy: 100,
  medium: 200,
  hard: 350,
  expert: 500,
};

export const DIFFICULTY_MULTIPLIER: Record<Difficulty, number> = {
  easy: 1,
  medium: 1.1,
  hard: 1.25,
  expert: 1.5,
};

export interface ScoreInput {
  difficulty: Difficulty;
  correct: boolean;
  /** Fraction of the per-question timer remaining, 0..1 (0 if untimed). */
  timeRemainingFraction: number;
  /** Current streak count BEFORE this answer is applied. */
  currentStreak: number;
}

export interface ScoreBreakdown {
  base: number;
  speedBonus: number;
  difficultyMultiplier: number;
  streakBonus: number;
  total: number;
}

/**
 * Score a single answer.
 *  - base points by difficulty
 *  - speed bonus: up to 50% of base, scaled by remaining time
 *  - difficulty multiplier applied to (base + speed)
 *  - streak bonus: +50 for every 3 consecutive correct answers
 */
export function scoreAnswer(input: ScoreInput): ScoreBreakdown {
  if (!input.correct) {
    return { base: 0, speedBonus: 0, difficultyMultiplier: 0, streakBonus: 0, total: 0 };
  }

  const base = BASE_POINTS[input.difficulty];
  const speedBonus = Math.round(base * 0.5 * clamp01(input.timeRemainingFraction));
  const multiplier = DIFFICULTY_MULTIPLIER[input.difficulty];

  // Streak after this correct answer.
  const newStreak = input.currentStreak + 1;
  const streakBonus = newStreak > 0 && newStreak % 3 === 0 ? 50 : 0;

  const total = Math.round((base + speedBonus) * multiplier) + streakBonus;

  return {
    base,
    speedBonus,
    difficultyMultiplier: multiplier,
    streakBonus,
    total,
  };
}

/** Perfect round bonus — flat reward for a flawless run. */
export function perfectRoundBonus(totalQuestions: number): number {
  return totalQuestions >= 5 ? 500 : 200;
}

function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}
