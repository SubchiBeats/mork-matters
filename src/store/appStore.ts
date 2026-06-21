import { create } from 'zustand';
import type { CategoryId, PlayerStats, Profile, RoundResult } from '@/types';
import { emptyStats, applyRound } from '@/lib/stats';
import {
  getGuestId,
  getGuestUsername,
  setGuestUsername,
  getLocalStats,
  setLocalStats,
  getAnsweredIdSet,
  recordAnswered,
  getSettings,
  setSettings,
  type AppSettings,
} from '@/lib/localStore';
import { isSupabaseEnabled } from '@/lib/supabase';
import {
  getCurrentProfile,
  loadCloudStats,
  saveCloudStats,
  loadCloudAnsweredIds,
  saveCloudAnswered,
  signIn,
  signUp,
  signOut,
  sendMagicLink,
} from '@/lib/cloud';
import { evaluateAchievements } from '@/utils/achievements';
import { payloadFromRound, submitScore } from '@/lib/leaderboard';
import { getInitialTheme, applyTheme, type ThemeMode } from '@/lib/theme';

interface AppState {
  ready: boolean;
  cloudEnabled: boolean;
  profile: Profile;
  stats: PlayerStats;
  answeredIds: Set<string>;
  settings: AppSettings;
  theme: ThemeMode;
  /** Achievements earned in the most recent round, for celebratory UI. */
  newlyEarned: string[];

  init: () => Promise<void>;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  updateSettings: (partial: Partial<AppSettings>) => void;
  setUsername: (name: string) => Promise<void>;

  commitRound: (round: RoundResult) => Promise<void>;
  clearNewlyEarned: () => void;

  // auth
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  magicLink: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

function guestProfile(): Profile {
  const username = getGuestUsername() || `Player-${getGuestId().slice(-4)}`;
  return { id: getGuestId(), username, avatarUrl: null, isGuest: true };
}

export const useAppStore = create<AppState>((set, get) => ({
  ready: false,
  cloudEnabled: isSupabaseEnabled,
  profile: guestProfile(),
  stats: emptyStats(),
  answeredIds: new Set(),
  settings: { sound: true, reducedMotion: false, highContrast: false },
  theme: 'dark',
  newlyEarned: [],

  init: async () => {
    const theme = getInitialTheme();
    applyTheme(theme);
    const settings = getSettings();
    applyAccessibilityFlags(settings);

    // Start from local data immediately so the app is usable offline.
    let profile = guestProfile();
    let stats = getLocalStats();
    let answeredIds = getAnsweredIdSet();

    // If cloud is configured and a session exists, hydrate from the cloud.
    if (isSupabaseEnabled) {
      try {
        const cloudProfile = await getCurrentProfile();
        if (cloudProfile) {
          profile = cloudProfile;
          const [cloudStats, cloudAnswered] = await Promise.all([
            loadCloudStats(cloudProfile.id),
            loadCloudAnsweredIds(cloudProfile.id),
          ]);
          stats = cloudStats;
          // Union local + cloud answered so guests don't see repeats after login.
          answeredIds = new Set([...answeredIds, ...cloudAnswered]);
        }
      } catch (err) {
        console.warn('Cloud hydrate failed, continuing in guest mode:', err);
      }
    }

    set({ ready: true, profile, stats, answeredIds, settings, theme });
  },

  setTheme: (mode) => {
    applyTheme(mode);
    set({ theme: mode });
  },
  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    set({ theme: next });
  },

  updateSettings: (partial) => {
    const settings = { ...get().settings, ...partial };
    setSettings(settings);
    applyAccessibilityFlags(settings);
    set({ settings });
  },

  setUsername: async (name) => {
    const profile = { ...get().profile, username: name };
    if (profile.isGuest) {
      setGuestUsername(name);
    }
    set({ profile });
  },

  commitRound: async (round) => {
    const prevStats = get().stats;
    let stats = applyRound(prevStats, round);
    const newly = evaluateAchievements(stats, round);
    if (newly.length) {
      stats = { ...stats, achievements: [...stats.achievements, ...newly] };
    }

    // Update answered set in memory + storage.
    const answeredIds = new Set(get().answeredIds);
    for (const a of round.answers) answeredIds.add(a.questionId);

    set({ stats, answeredIds, newlyEarned: newly });

    const profile = get().profile;

    // Persist locally always (works for guests + as offline cache).
    setLocalStats(stats);
    recordAnswered(round.answers.map((a) => a.questionId));

    // Persist to cloud when logged in.
    if (!profile.isGuest && isSupabaseEnabled) {
      try {
        await Promise.all([
          saveCloudStats(profile.id, stats),
          saveCloudAnswered(profile.id, round.answers),
        ]);
      } catch (err) {
        console.warn('Cloud save failed (kept locally):', err);
      }
    }

    // Submit to leaderboard (local or cloud handled inside).
    try {
      await submitScore(payloadFromRound(round, profile.id, profile.username));
    } catch (err) {
      console.warn('Leaderboard submit failed:', err);
    }
  },

  clearNewlyEarned: () => set({ newlyEarned: [] }),

  login: async (email, password) => {
    await signIn(email, password);
    await get().refreshProfile();
  },
  register: async (email, password, username) => {
    await signUp(email, password, username);
    await get().refreshProfile();
  },
  magicLink: async (email) => {
    await sendMagicLink(email);
  },
  logout: async () => {
    await signOut();
    set({
      profile: guestProfile(),
      stats: getLocalStats(),
      answeredIds: getAnsweredIdSet(),
    });
  },
  refreshProfile: async () => {
    if (!isSupabaseEnabled) return;
    const cloudProfile = await getCurrentProfile();
    if (cloudProfile) {
      const [stats, answered] = await Promise.all([
        loadCloudStats(cloudProfile.id),
        loadCloudAnsweredIds(cloudProfile.id),
      ]);
      set({
        profile: cloudProfile,
        stats,
        answeredIds: new Set([...get().answeredIds, ...answered]),
      });
    }
  },
}));

function applyAccessibilityFlags(settings: AppSettings) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('reduce-motion', settings.reducedMotion);
  document.documentElement.classList.toggle('high-contrast', settings.highContrast);
}

export type { CategoryId };
