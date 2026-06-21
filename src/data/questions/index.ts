import type { CategoryId, Difficulty, Question } from '@/types';
import { science } from './science';
import { history } from './history';
import { geography } from './geography';
import { sports } from './sports';
import { entertainment } from './entertainment';
import { music } from './music';
import { moviesTv } from './moviesTv';
import { videoGames } from './videoGames';
import { literature } from './literature';
import { technology } from './technology';
import { foodCulture } from './foodCulture';
import { worldRecords } from './worldRecords';
import { general } from './general';
import { flags } from './flags';
import { supplement } from './supplement';

export const QUESTIONS: Question[] = [
  ...science,
  ...history,
  ...geography,
  ...sports,
  ...entertainment,
  ...music,
  ...moviesTv,
  ...videoGames,
  ...literature,
  ...technology,
  ...foodCulture,
  ...worldRecords,
  ...general,
  ...flags,
  ...supplement,
];

/** Fast id -> question lookup. */
export const QUESTION_MAP: Map<string, Question> = new Map(
  QUESTIONS.map((q) => [q.id, q]),
);

export function getQuestionById(id: string): Question | undefined {
  return QUESTION_MAP.get(id);
}

/** Count of questions per category — used to warn when a bank runs low. */
export const QUESTION_COUNTS: Record<string, number> = QUESTIONS.reduce(
  (acc, q) => {
    acc[q.category] = (acc[q.category] ?? 0) + 1;
    return acc;
  },
  {} as Record<string, number>,
);

export function questionsFor(opts: {
  category?: CategoryId | null;
  difficulty?: Difficulty | null;
  type?: Question['type'] | null;
}): Question[] {
  return QUESTIONS.filter((q) => {
    if (opts.category && q.category !== opts.category) return false;
    if (opts.difficulty && q.difficulty !== opts.difficulty) return false;
    if (opts.type && q.type !== opts.type) return false;
    return true;
  });
}

export const TOTAL_QUESTIONS = QUESTIONS.length;
