import { describe, it, expect } from 'vitest';
import { QUESTIONS } from './index';

describe('question bank integrity', () => {
  it('has a substantial number of questions', () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(500);
  });

  it('has globally unique ids', () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('always includes the correct answer among the choices', () => {
    for (const q of QUESTIONS) {
      expect(q.choices).toContain(q.correctAnswer);
    }
  });

  it('has at least two choices per question', () => {
    for (const q of QUESTIONS) {
      expect(q.choices.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('has no duplicate choices within a question', () => {
    for (const q of QUESTIONS) {
      expect(new Set(q.choices).size).toBe(q.choices.length);
    }
  });

  it('always provides an explanation', () => {
    for (const q of QUESTIONS) {
      expect(q.explanation.trim().length).toBeGreaterThan(0);
    }
  });

  it('gives every flag question a flag code', () => {
    for (const q of QUESTIONS.filter((x) => x.type === 'flag-identification')) {
      expect(q.flagCode).toBeTruthy();
    }
  });
});
