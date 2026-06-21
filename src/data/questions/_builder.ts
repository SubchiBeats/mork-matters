import type { CategoryId, Difficulty, Question, QuestionType } from '@/types';

/**
 * Compact authoring spec for a multiple-choice / true-false question.
 * Keeps the large seed bank readable while still producing fully-typed
 * `Question` objects with stable ids, explanations and tags.
 */
export interface Spec {
  /** Numeric or short suffix, made unique per-category by the builder. */
  id: string;
  d: Difficulty;
  q: string; // prompt
  a: string; // correct answer (must match one entry in `o` + a)
  o: string[]; // distractors (the correct answer is added automatically)
  e: string; // explanation shown after answering
  t?: string[]; // tags
  type?: QuestionType;
  region?: string;
  era?: string;
  src?: string;
}

export function build(category: CategoryId, specs: Spec[]): Question[] {
  return specs.map((s) => {
    const choices = [s.a, ...s.o];
    return {
      id: `${category}-${s.id}`,
      category,
      difficulty: s.d,
      type: s.type ?? (s.o.length === 1 ? 'true-false' : 'multiple-choice'),
      prompt: s.q,
      choices,
      correctAnswer: s.a,
      explanation: s.e,
      tags: s.t ?? [],
      region: s.region,
      era: s.era,
      sourceNote: s.src,
    };
  });
}

/** Helper for true/false questions. */
export function tf(
  id: string,
  d: Difficulty,
  q: string,
  answerIsTrue: boolean,
  e: string,
  t: string[] = [],
): Spec {
  return {
    id,
    d,
    q,
    a: answerIsTrue ? 'True' : 'False',
    o: [answerIsTrue ? 'False' : 'True'],
    e,
    t,
    type: 'true-false',
  };
}
