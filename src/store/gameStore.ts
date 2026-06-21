import { create } from 'zustand';
import type {
  AnsweredRecord,
  CategoryId,
  Difficulty,
  GameModeId,
  Question,
  RoundResult,
} from '@/types';
import { GAME_MODE_MAP, CATEGORIES } from '@/data/categories';
import { getNextQuestions, getOnePerCategory } from '@/utils/questionEngine';
import { getDailyChallenge } from '@/utils/dailyChallenge';
import { scoreAnswer, perfectRoundBonus } from '@/utils/scoring';
import { shuffle } from '@/utils/random';
import { useAppStore } from './appStore';

export const QUESTION_SECONDS = 20;

interface ActiveQuestion extends Question {
  /** Choices shuffled for display so position never leaks the answer. */
  displayChoices: string[];
}

export interface StartConfig {
  mode: GameModeId;
  category?: CategoryId | null;
  difficulty?: Difficulty | null;
}

interface GameState {
  status: 'idle' | 'playing' | 'finished';
  mode: GameModeId | null;
  category: CategoryId | null;
  difficulty: Difficulty | null;

  questions: ActiveQuestion[];
  index: number;

  selected: string | null;
  revealed: boolean;
  lastCorrect: boolean | null;
  lastBreakdown: number;

  score: number;
  streak: number;
  maxStreak: number;
  correctCount: number;
  lives: number | null;

  startedAt: number;
  questionStartedAt: number;
  /** Epoch ms when a timed-rush round must end (null for untimed modes). */
  roundEndsAt: number | null;

  answers: AnsweredRecord[];
  usedReview: boolean;
  lowBankWarning: boolean;

  result: RoundResult | null;

  start: (config: StartConfig) => { ok: boolean; reason?: string };
  answer: (choice: string | null) => void;
  next: () => void;
  finish: () => void;
  reset: () => void;
}

const ALL_CATEGORY_IDS = CATEGORIES.map((c) => c.id);

function toActive(q: Question): ActiveQuestion {
  return { ...q, displayChoices: shuffle(q.choices) };
}

export const useGameStore = create<GameState>((set, get) => ({
  status: 'idle',
  mode: null,
  category: null,
  difficulty: null,
  questions: [],
  index: 0,
  selected: null,
  revealed: false,
  lastCorrect: null,
  lastBreakdown: 0,
  score: 0,
  streak: 0,
  maxStreak: 0,
  correctCount: 0,
  lives: null,
  startedAt: 0,
  questionStartedAt: 0,
  roundEndsAt: null,
  answers: [],
  usedReview: false,
  lowBankWarning: false,
  result: null,

  start: (config) => {
    const modeDef = GAME_MODE_MAP[config.mode];
    if (!modeDef) return { ok: false, reason: 'Unknown mode' };

    const answeredIds = useAppStore.getState().answeredIds;

    // For open-ended modes (survival, timed-rush, streak) we still need a
    // sizeable buffer of questions; pull a generous batch up front.
    const bufferCount = 40;

    let questions: Question[] = [];
    let usedReview = false;

    if (config.mode === 'daily') {
      questions = getDailyChallenge();
    } else if (config.mode === 'category-clash') {
      const res = getOnePerCategory(ALL_CATEGORY_IDS, answeredIds);
      questions = res.questions;
      usedReview = res.usedReview;
    } else if (config.mode === 'flag-frenzy') {
      const res = getNextQuestions({
        category: 'flags',
        type: 'flag-identification',
        count: modeDef.questionCount || 12,
        answeredIds,
      });
      questions = res.questions;
      usedReview = res.usedReview;
    } else if (config.mode === 'final-boss') {
      const res = getNextQuestions({
        difficulty: 'expert',
        count: modeDef.questionCount || 5,
        answeredIds,
      });
      questions = res.questions;
      usedReview = res.usedReview;
    } else {
      const count =
        modeDef.questionCount > 0 ? modeDef.questionCount : bufferCount;
      const res = getNextQuestions({
        category: modeDef.requiresCategory ? config.category ?? null : null,
        difficulty: config.difficulty ?? null,
        count,
        answeredIds,
      });
      questions = res.questions;
      usedReview = res.usedReview;
    }

    if (questions.length === 0) {
      return { ok: false, reason: 'No questions available for this selection.' };
    }

    const now = Date.now();
    set({
      status: 'playing',
      mode: config.mode,
      category: modeDef.requiresCategory ? config.category ?? null : null,
      difficulty: config.difficulty ?? null,
      questions: questions.map(toActive),
      index: 0,
      selected: null,
      revealed: false,
      lastCorrect: null,
      lastBreakdown: 0,
      score: 0,
      streak: 0,
      maxStreak: 0,
      correctCount: 0,
      lives: modeDef.lives ?? null,
      startedAt: now,
      questionStartedAt: now,
      roundEndsAt: modeDef.timeLimitSeconds ? now + modeDef.timeLimitSeconds * 1000 : null,
      answers: [],
      usedReview,
      lowBankWarning: usedReview,
      result: null,
    });
    return { ok: true };
  },

  answer: (choice) => {
    const s = get();
    if (s.status !== 'playing' || s.revealed) return;
    const q = s.questions[s.index];
    if (!q) return;

    const correct = choice !== null && choice === q.correctAnswer;
    const elapsed = (Date.now() - s.questionStartedAt) / 1000;
    // Speed bonus is driven by the per-question soft timer in every mode.
    const timeRemainingFraction = Math.max(0, (QUESTION_SECONDS - elapsed) / QUESTION_SECONDS);

    const breakdown = scoreAnswer({
      difficulty: q.difficulty,
      correct,
      timeRemainingFraction,
      currentStreak: s.streak,
    });

    const newStreak = correct ? s.streak + 1 : 0;
    const record: AnsweredRecord = {
      questionId: q.id,
      answeredCorrectly: correct,
      category: q.category,
      difficulty: q.difficulty,
      answeredAt: Date.now(),
    };

    const newLives = s.lives === null ? null : correct ? s.lives : s.lives - 1;

    set({
      selected: choice,
      revealed: true,
      lastCorrect: correct,
      lastBreakdown: breakdown.total,
      score: s.score + breakdown.total,
      streak: newStreak,
      maxStreak: Math.max(s.maxStreak, newStreak),
      correctCount: s.correctCount + (correct ? 1 : 0),
      lives: newLives,
      answers: [...s.answers, record],
    });
  },

  next: () => {
    const s = get();
    if (s.status !== 'playing') return;

    // Out of lives -> finish.
    if (s.lives !== null && s.lives <= 0) {
      get().finish();
      return;
    }
    // Time expired (timed-rush) -> finish.
    if (s.roundEndsAt !== null && Date.now() >= s.roundEndsAt) {
      get().finish();
      return;
    }

    const nextIndex = s.index + 1;

    // Need more questions for open-ended modes? Pull another batch.
    const isOpenEnded =
      s.roundEndsAt !== null || s.lives !== null;
    if (nextIndex >= s.questions.length) {
      if (isOpenEnded) {
        const answeredIds = new Set([
          ...useAppStore.getState().answeredIds,
          ...s.answers.map((a) => a.questionId),
        ]);
        const sessionExclude = new Set(s.questions.map((q) => q.id));
        const res = getNextQuestions({
          category: s.category,
          count: 20,
          answeredIds,
          sessionExcludeIds: sessionExclude,
        });
        if (res.questions.length === 0) {
          get().finish();
          return;
        }
        set({
          questions: [...s.questions, ...res.questions.map(toActive)],
          index: nextIndex,
          selected: null,
          revealed: false,
          lastCorrect: null,
          questionStartedAt: Date.now(),
        });
        return;
      }
      get().finish();
      return;
    }

    set({
      index: nextIndex,
      selected: null,
      revealed: false,
      lastCorrect: null,
      questionStartedAt: Date.now(),
    });
  },

  finish: () => {
    const s = get();
    if (s.status === 'finished') return;
    const totalQuestions = s.answers.length;
    const perfect = totalQuestions > 0 && s.correctCount === totalQuestions;
    let finalScore = s.score;
    if (perfect && totalQuestions >= 5) finalScore += perfectRoundBonus(totalQuestions);

    const result: RoundResult = {
      mode: s.mode!,
      category: s.category,
      score: finalScore,
      correctCount: s.correctCount,
      totalQuestions,
      maxStreak: s.maxStreak,
      durationSeconds: Math.round((Date.now() - s.startedAt) / 1000),
      perfect,
      answers: s.answers,
      playedAt: Date.now(),
    };

    set({ status: 'finished', score: finalScore, result });

    // Persist via the app store (stats, achievements, leaderboard).
    void useAppStore.getState().commitRound(result);
  },

  reset: () =>
    set({
      status: 'idle',
      mode: null,
      category: null,
      difficulty: null,
      questions: [],
      index: 0,
      selected: null,
      revealed: false,
      lastCorrect: null,
      lastBreakdown: 0,
      score: 0,
      streak: 0,
      maxStreak: 0,
      correctCount: 0,
      lives: null,
      startedAt: 0,
      questionStartedAt: 0,
      roundEndsAt: null,
      answers: [],
      usedReview: false,
      lowBankWarning: false,
      result: null,
    }),
}));
