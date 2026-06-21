import type { Achievement, PlayerStats, RoundResult } from '@/types';

const catAccuracy = (stats: PlayerStats, cat: string, min = 10): boolean => {
  const c = stats.categoryStats[cat];
  if (!c || c.answered < min) return false;
  return c.correct / c.answered >= 0.8;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-win',
    name: 'First Steps',
    description: 'Complete your very first round.',
    glyph: '🌱',
    check: (_s, round) => !!round,
  },
  {
    id: 'streak-10',
    name: 'On Fire',
    description: 'Answer 10 correct in a row.',
    glyph: '🔥',
    check: (s) => s.bestStreak >= 10,
  },
  {
    id: 'perfect-round',
    name: 'Flawless',
    description: 'Finish a round with a perfect score.',
    glyph: '💎',
    check: (_s, round) => !!round && round.perfect && round.totalQuestions >= 5,
  },
  {
    id: 'centurion',
    name: 'Centurion',
    description: 'Answer 100 questions total.',
    glyph: '💯',
    check: (s) => s.totalAnswered >= 100,
  },
  {
    id: 'sports-specialist',
    name: 'Sports Specialist',
    description: '80%+ accuracy in Sports (10+ answered).',
    glyph: '🏆',
    check: (s) => catAccuracy(s, 'sports'),
  },
  {
    id: 'history-buff',
    name: 'History Buff',
    description: '80%+ accuracy in History (10+ answered).',
    glyph: '🏛️',
    check: (s) => catAccuracy(s, 'history'),
  },
  {
    id: 'science-mind',
    name: 'Science Mind',
    description: '80%+ accuracy in Science (10+ answered).',
    glyph: '🧪',
    check: (s) => catAccuracy(s, 'science'),
  },
  {
    id: 'globe-walker',
    name: 'Globe Walker',
    description: '80%+ accuracy in Geography (10+ answered).',
    glyph: '🧭',
    check: (s) => catAccuracy(s, 'geography'),
  },
  {
    id: 'flag-master',
    name: 'Flag Master',
    description: '80%+ accuracy in Flags (10+ answered).',
    glyph: '🚩',
    check: (s) => catAccuracy(s, 'flags'),
  },
  {
    id: 'entertainment-expert',
    name: 'Entertainment Expert',
    description: '80%+ accuracy in Entertainment (10+ answered).',
    glyph: '🎬',
    check: (s) => catAccuracy(s, 'entertainment'),
  },
  {
    id: 'daily-grinder',
    name: 'Daily Grinder',
    description: 'Complete 5 daily challenges.',
    glyph: '📅',
    check: (s) => s.dailyHistory.length >= 5,
  },
  {
    id: 'survivalist',
    name: 'Survivalist',
    description: 'Answer 15+ questions in a single Survival run.',
    glyph: '❤️',
    check: (_s, round) =>
      !!round && round.mode === 'survival' && round.totalQuestions >= 15,
  },
  {
    id: 'high-scorer',
    name: 'High Scorer',
    description: 'Reach 25,000 lifetime points.',
    glyph: '⭐',
    check: (s) => s.totalScore >= 25000,
  },
  {
    id: 'polymath',
    name: 'Polymath',
    description: 'Answer at least one question in 10 different categories.',
    glyph: '🧠',
    check: (s) =>
      Object.values(s.categoryStats).filter((c) => c.answered > 0).length >= 10,
  },
];

export const ACHIEVEMENT_MAP: Record<string, Achievement> = Object.fromEntries(
  ACHIEVEMENTS.map((a) => [a.id, a]),
);

/**
 * Returns the list of NEWLY earned achievement ids given the latest stats and
 * the round that just finished. Caller merges these into stats.achievements.
 */
export function evaluateAchievements(
  stats: PlayerStats,
  round?: RoundResult,
): string[] {
  const have = new Set(stats.achievements);
  const newly: string[] = [];
  for (const a of ACHIEVEMENTS) {
    if (have.has(a.id)) continue;
    if (a.check(stats, round)) newly.push(a.id);
  }
  return newly;
}
