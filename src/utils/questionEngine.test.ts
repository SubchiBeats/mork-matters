import { describe, it, expect } from 'vitest';
import { getNextQuestions } from './questionEngine';
import { QUESTIONS } from '@/data/questions';

describe('question selection engine', () => {
  it('never returns a question already answered when fresh ones exist', () => {
    const answered = new Set(QUESTIONS.slice(0, 5).map((q) => q.id));
    const res = getNextQuestions({ count: 10, answeredIds: answered });
    expect(res.usedReview).toBe(false);
    for (const q of res.questions) {
      expect(answered.has(q.id)).toBe(false);
    }
  });

  it('does not repeat a question within the same selection', () => {
    const res = getNextQuestions({ count: 20, answeredIds: new Set() });
    const ids = res.questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('respects sessionExcludeIds (never repeats within a run)', () => {
    const first = getNextQuestions({ count: 10, answeredIds: new Set() });
    const exclude = new Set(first.questions.map((q) => q.id));
    const second = getNextQuestions({
      count: 10,
      answeredIds: new Set(),
      sessionExcludeIds: exclude,
    });
    for (const q of second.questions) {
      expect(exclude.has(q.id)).toBe(false);
    }
  });

  it('falls back to review questions and flags it when the bank is exhausted', () => {
    // Answer the entire science bank, then request more science questions.
    const science = QUESTIONS.filter((q) => q.category === 'science');
    const answered = new Set(science.map((q) => q.id));
    const res = getNextQuestions({ category: 'science', count: 5, answeredIds: answered });
    expect(res.freshAvailable).toBe(0);
    expect(res.usedReview).toBe(true);
    expect(res.questions.length).toBeGreaterThan(0);
  });

  it('filters by category', () => {
    const res = getNextQuestions({ category: 'geography', count: 8, answeredIds: new Set() });
    for (const q of res.questions) expect(q.category).toBe('geography');
  });
});
