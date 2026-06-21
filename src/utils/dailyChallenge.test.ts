import { describe, it, expect } from 'vitest';
import { getDailyChallenge, getDailyChallengeIds, todayKey } from './dailyChallenge';

describe('daily challenge generator', () => {
  it('is deterministic for a given date', () => {
    const a = getDailyChallengeIds('2026-01-15');
    const b = getDailyChallengeIds('2026-01-15');
    expect(a).toEqual(b);
  });

  it('differs across dates', () => {
    const a = getDailyChallengeIds('2026-01-15');
    const b = getDailyChallengeIds('2026-01-16');
    expect(a).not.toEqual(b);
  });

  it('returns the requested number of unique questions', () => {
    const qs = getDailyChallenge('2026-03-01', 7);
    expect(qs).toHaveLength(7);
    expect(new Set(qs.map((q) => q.id)).size).toBe(7);
  });

  it('prefers a diverse category spread', () => {
    const qs = getDailyChallenge('2026-05-20', 7);
    const cats = new Set(qs.map((q) => q.category));
    // With 14 categories and 7 picks, the diversity pass should give all unique.
    expect(cats.size).toBeGreaterThanOrEqual(6);
  });

  it('todayKey returns an ISO-like YYYY-MM-DD string', () => {
    expect(todayKey(new Date('2026-06-20T10:00:00'))).toBe('2026-06-20');
  });
});
