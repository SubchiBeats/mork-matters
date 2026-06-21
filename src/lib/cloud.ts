import type { AnsweredRecord, PlayerStats, Profile } from '@/types';
import { supabase, isSupabaseEnabled } from './supabase';
import { emptyStats } from './stats';

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export async function signUp(email: string, password: string, username: string) {
  if (!supabase) throw new Error('Cloud accounts are not configured.');
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  if (data.user) {
    await supabase.from('profiles').upsert({
      id: data.user.id,
      username,
      updated_at: new Date().toISOString(),
    });
  }
  return data;
}

export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error('Cloud accounts are not configured.');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function sendMagicLink(email: string) {
  if (!supabase) throw new Error('Cloud accounts are not configured.');
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) throw error;
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getCurrentProfile(): Promise<Profile | null> {
  if (!isSupabaseEnabled || !supabase) return null;
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;
  if (!user) return null;

  const { data: prof } = await supabase
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', user.id)
    .maybeSingle();

  return {
    id: user.id,
    username: prof?.username ?? user.email?.split('@')[0] ?? 'Player',
    avatarUrl: prof?.avatar_url ?? null,
    isGuest: false,
  };
}

// ---------------------------------------------------------------------------
// Stats + answered questions
// ---------------------------------------------------------------------------

export async function loadCloudStats(userId: string): Promise<PlayerStats> {
  if (!supabase) return emptyStats();
  const { data } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  const base = emptyStats();
  if (!data) return base;

  base.totalScore = data.total_score ?? 0;
  base.totalCorrect = data.total_correct ?? 0;
  base.totalAnswered = data.total_answered ?? 0;
  base.bestStreak = data.best_streak ?? 0;
  base.favoriteCategory = data.favorite_category ?? null;
  if (data.detail) {
    // `detail` is a jsonb column holding the richer breakdowns.
    Object.assign(base, {
      categoryStats: data.detail.categoryStats ?? base.categoryStats,
      difficultyStats: data.detail.difficultyStats ?? base.difficultyStats,
      dailyHistory: data.detail.dailyHistory ?? base.dailyHistory,
      achievements: data.detail.achievements ?? base.achievements,
      recent: data.detail.recent ?? base.recent,
    });
  }
  return base;
}

export async function saveCloudStats(userId: string, stats: PlayerStats): Promise<void> {
  if (!supabase) return;
  await supabase.from('user_stats').upsert({
    user_id: userId,
    total_score: stats.totalScore,
    total_correct: stats.totalCorrect,
    total_answered: stats.totalAnswered,
    best_streak: stats.bestStreak,
    favorite_category: stats.favoriteCategory,
    detail: {
      categoryStats: stats.categoryStats,
      difficultyStats: stats.difficultyStats,
      dailyHistory: stats.dailyHistory,
      achievements: stats.achievements,
      recent: stats.recent,
    },
    updated_at: new Date().toISOString(),
  });
}

export async function loadCloudAnsweredIds(userId: string): Promise<Set<string>> {
  if (!supabase) return new Set();
  const { data } = await supabase
    .from('answered_questions')
    .select('question_id')
    .eq('user_id', userId);
  return new Set((data ?? []).map((r) => r.question_id as string));
}

export async function saveCloudAnswered(
  userId: string,
  answers: AnsweredRecord[],
): Promise<void> {
  if (!supabase || answers.length === 0) return;
  await supabase.from('answered_questions').upsert(
    answers.map((a) => ({
      user_id: userId,
      question_id: a.questionId,
      answered_correctly: a.answeredCorrectly,
      category: a.category,
      difficulty: a.difficulty,
      answered_at: new Date(a.answeredAt).toISOString(),
    })),
    { onConflict: 'user_id,question_id' },
  );
}
