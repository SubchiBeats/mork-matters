// ---------------------------------------------------------------------------
// Core domain types for Mork Matters
// ---------------------------------------------------------------------------

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type QuestionType =
  | 'multiple-choice'
  | 'true-false'
  | 'flag-identification'
  | 'image-choice';

export type CategoryId =
  | 'science'
  | 'history'
  | 'geography'
  | 'sports'
  | 'entertainment'
  | 'flags'
  | 'music'
  | 'movies-tv'
  | 'video-games'
  | 'literature'
  | 'technology'
  | 'food-culture'
  | 'world-records'
  | 'general';

export interface Question {
  id: string;
  category: CategoryId;
  difficulty: Difficulty;
  type: QuestionType;
  prompt: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
  tags: string[];
  region?: string;
  era?: string;
  /** For flag-identification: ISO 3166-1 alpha-2 code used to render the flag. */
  flagCode?: string;
  /** Optional hint surfaced in flag / image modes. */
  hint?: string;
  sourceNote?: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  /** Lucide-ish glyph rendered as emoji fallback + used by 3D objects. */
  glyph: string;
  /** Two hex colors forming the category gradient / 3D material. */
  color: [string, string];
  /** Accent used for the 3D object & glows. */
  accent: string;
}

export type GameModeId =
  | 'classic'
  | 'category-clash'
  | 'survival'
  | 'timed-rush'
  | 'daily'
  | 'flag-frenzy'
  | 'mixed-madness'
  | 'streak'
  | 'final-boss';

export interface GameMode {
  id: GameModeId;
  name: string;
  blurb: string;
  glyph: string;
  /** Whether the mode requires the player to pick a single category first. */
  requiresCategory: boolean;
  /** Default number of questions (0 = open ended / time or life bound). */
  questionCount: number;
  /** Seconds for timed modes, otherwise undefined. */
  timeLimitSeconds?: number;
  /** Lives for survival, otherwise undefined. */
  lives?: number;
}

export interface AnsweredRecord {
  questionId: string;
  answeredCorrectly: boolean;
  category: CategoryId;
  difficulty: Difficulty;
  answeredAt: number; // epoch ms
}

export interface RoundResult {
  mode: GameModeId;
  category: CategoryId | null;
  score: number;
  correctCount: number;
  totalQuestions: number;
  maxStreak: number;
  durationSeconds: number;
  perfect: boolean;
  answers: AnsweredRecord[];
  playedAt: number;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  username: string;
  mode: GameModeId | 'all';
  category: CategoryId | null;
  score: number;
  correctCount: number;
  totalQuestions: number;
  maxStreak: number;
  durationSeconds: number;
  createdAt: number;
}

export interface PlayerStats {
  totalScore: number;
  totalCorrect: number;
  totalAnswered: number;
  bestStreak: number;
  favoriteCategory: CategoryId | null;
  // Per-category aggregates for mastery + strong/weak analysis.
  categoryStats: Record<string, { correct: number; answered: number; score: number }>;
  difficultyStats: Record<Difficulty, { correct: number; answered: number }>;
  dailyHistory: { date: string; score: number; correct: number; total: number }[];
  achievements: string[]; // achievement ids
  recent: AnsweredRecord[];
  updatedAt: number;
}

export interface Profile {
  id: string;
  username: string;
  avatarUrl: string | null;
  isGuest: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  glyph: string;
  /** Evaluated against stats + the most recent round. */
  check: (stats: PlayerStats, round?: RoundResult) => boolean;
}
