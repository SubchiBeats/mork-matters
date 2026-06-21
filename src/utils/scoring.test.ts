import { describe, it, expect } from 'vitest';
import { scoreAnswer, perfectRoundBonus, BASE_POINTS } from './scoring';

describe('scoring engine', () => {
  it('awards zero for wrong answers', () => {
    const s = scoreAnswer({ difficulty: 'hard', correct: false, timeRemainingFraction: 1, currentStreak: 5 });
    expect(s.total).toBe(0);
  });

  it('gives base points with no speed bonus when time is exhausted', () => {
    const s = scoreAnswer({ difficulty: 'easy', correct: true, timeRemainingFraction: 0, currentStreak: 0 });
    // easy base 100, multiplier 1, no speed, no streak bonus
    expect(s.total).toBe(BASE_POINTS.easy);
  });

  it('adds a speed bonus proportional to remaining time', () => {
    const full = scoreAnswer({ difficulty: 'easy', correct: true, timeRemainingFraction: 1, currentStreak: 0 });
    const none = scoreAnswer({ difficulty: 'easy', correct: true, timeRemainingFraction: 0, currentStreak: 0 });
    expect(full.total).toBeGreaterThan(none.total);
    // speed bonus = 50% of base at full time
    expect(full.speedBonus).toBe(50);
  });

  it('applies the difficulty multiplier', () => {
    const expert = scoreAnswer({ difficulty: 'expert', correct: true, timeRemainingFraction: 0, currentStreak: 0 });
    // expert base 500 * 1.5 = 750
    expect(expert.total).toBe(750);
  });

  it('adds a streak bonus every 3rd consecutive correct answer', () => {
    // currentStreak 2 -> this answer makes it 3 -> bonus
    const onStreak = scoreAnswer({ difficulty: 'easy', correct: true, timeRemainingFraction: 0, currentStreak: 2 });
    expect(onStreak.streakBonus).toBe(50);
    const offStreak = scoreAnswer({ difficulty: 'easy', correct: true, timeRemainingFraction: 0, currentStreak: 1 });
    expect(offStreak.streakBonus).toBe(0);
  });

  it('gives a larger perfect-round bonus for longer rounds', () => {
    expect(perfectRoundBonus(10)).toBeGreaterThanOrEqual(perfectRoundBonus(3));
  });
});
