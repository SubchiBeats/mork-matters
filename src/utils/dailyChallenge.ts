import type { Question } from '@/types';
import { QUESTIONS } from '@/data/questions';
import { hashString, seededShuffle } from './random';

/** Local date as YYYY-MM-DD (stable per calendar day in the user's timezone). */
export function todayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Deterministically pick the daily challenge questions for a given date.
 * Everyone who plays on the same day gets the SAME questions because the
 * selection is seeded purely from the date string — no randomness, no storage.
 */
export function getDailyChallenge(dateKey: string = todayKey(), count = 7): Question[] {
  const seed = hashString(`mork-daily-${dateKey}`);
  // Spread difficulty: shuffle the whole bank deterministically and take a
  // balanced slice, ensuring a mix of categories on most days.
  const shuffled = seededShuffle(QUESTIONS, seed);

  const picked: Question[] = [];
  const usedCategories = new Set<string>();

  // First pass: prefer category diversity.
  for (const q of shuffled) {
    if (picked.length >= count) break;
    if (!usedCategories.has(q.category)) {
      picked.push(q);
      usedCategories.add(q.category);
    }
  }
  // Second pass: fill remaining slots from the rest.
  for (const q of shuffled) {
    if (picked.length >= count) break;
    if (!picked.includes(q)) picked.push(q);
  }

  return picked.slice(0, count);
}

export function getDailyChallengeIds(dateKey: string = todayKey(), count = 7): string[] {
  return getDailyChallenge(dateKey, count).map((q) => q.id);
}
