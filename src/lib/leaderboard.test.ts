import { describe, it, expect } from 'vitest';
import { validateLeaderboardPayload } from './leaderboard';

describe('leaderboard payload validation', () => {
  const valid = {
    userId: 'guest_abc',
    username: 'NebulaNomad',
    mode: 'classic' as const,
    category: 'science',
    score: 1200,
    correctCount: 8,
    totalQuestions: 10,
    maxStreak: 5,
    durationSeconds: 60,
  };

  it('accepts a well-formed payload', () => {
    expect(validateLeaderboardPayload(valid).valid).toBe(true);
  });

  it('rejects a missing username', () => {
    const res = validateLeaderboardPayload({ ...valid, username: '' });
    expect(res.valid).toBe(false);
    expect(res.errors.join(' ')).toMatch(/username/);
  });

  it('rejects a negative score', () => {
    expect(validateLeaderboardPayload({ ...valid, score: -5 }).valid).toBe(false);
  });

  it('rejects correctCount greater than totalQuestions', () => {
    const res = validateLeaderboardPayload({ ...valid, correctCount: 11, totalQuestions: 10 });
    expect(res.valid).toBe(false);
    expect(res.errors.join(' ')).toMatch(/cannot exceed/);
  });

  it('requires a mode', () => {
    const res = validateLeaderboardPayload({ ...valid, mode: undefined });
    expect(res.valid).toBe(false);
  });
});
