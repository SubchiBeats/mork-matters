import type { CategoryId, Difficulty, Question } from '@/types';
import { QUESTIONS, questionsFor } from '@/data/questions';
import { shuffle } from './random';

export interface SelectionOptions {
  category?: CategoryId | null;
  difficulty?: Difficulty | null;
  type?: Question['type'] | null;
  count: number;
  /** Question ids the player has already answered (from cloud or local). */
  answeredIds: Set<string>;
  /** Ids already used in the current session/round (never repeat in a run). */
  sessionExcludeIds?: Set<string>;
}

export interface SelectionResult {
  questions: Question[];
  /** True if we had to fall back to already-answered ("review") questions. */
  usedReview: boolean;
  /** How many fresh (unseen) questions were available before review fallback. */
  freshAvailable: number;
}

/**
 * Core anti-repeat selection engine.
 *
 * 1. Filter the bank by category / difficulty / type.
 * 2. Remove anything already used this session (hard rule — never repeat).
 * 3. Prefer questions the user has NEVER answered.
 * 4. If there aren't enough fresh ones, top up with previously-answered
 *    questions (least-recently-seen first is approximated by shuffle), and
 *    flag `usedReview` so the UI can warn the player.
 * 5. Order is always shuffled so runs are unpredictable.
 */
export function getNextQuestions(opts: SelectionOptions): SelectionResult {
  const { category, difficulty, type, count, answeredIds } = opts;
  const sessionExclude = opts.sessionExcludeIds ?? new Set<string>();

  const pool = questionsFor({ category, difficulty, type }).filter(
    (q) => !sessionExclude.has(q.id),
  );

  const fresh = pool.filter((q) => !answeredIds.has(q.id));
  const seen = pool.filter((q) => answeredIds.has(q.id));

  const shuffledFresh = shuffle(fresh);
  const selected = shuffledFresh.slice(0, count);

  let usedReview = false;
  if (selected.length < count) {
    usedReview = seen.length > 0;
    const topUp = shuffle(seen).slice(0, count - selected.length);
    selected.push(...topUp);
  }

  return {
    questions: selected,
    usedReview,
    freshAvailable: fresh.length,
  };
}

/**
 * Build a "one question per category" set (Category Clash). Picks one fresh
 * question from each category where possible, falling back to review.
 */
export function getOnePerCategory(
  categories: CategoryId[],
  answeredIds: Set<string>,
): SelectionResult {
  const out: Question[] = [];
  const used = new Set<string>();
  let usedReview = false;
  let freshAvailable = 0;

  for (const cat of categories) {
    const res = getNextQuestions({
      category: cat,
      count: 1,
      answeredIds,
      sessionExcludeIds: used,
    });
    if (res.questions.length) {
      out.push(res.questions[0]);
      used.add(res.questions[0].id);
      if (res.usedReview) usedReview = true;
      freshAvailable += res.freshAvailable;
    }
  }

  return { questions: shuffle(out), usedReview, freshAvailable };
}

/** Total bank size, handy for "X% of the universe explored" stats. */
export const TOTAL_BANK_SIZE = QUESTIONS.length;
