import type { LeaderboardEntry, PlayerStats } from '@/types';
import { emptyStats } from './stats';

const KEYS = {
  guestId: 'mork:guestId',
  username: 'mork:username',
  answered: 'mork:answered', // record of questionId -> timestamp
  stats: 'mork:stats',
  leaderboard: 'mork:leaderboard',
  theme: 'mork:theme',
  settings: 'mork:settings',
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full / disabled — ignore */
  }
}

export function getGuestId(): string {
  let id = read<string>(KEYS.guestId, '');
  if (!id) {
    id = `guest_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
    write(KEYS.guestId, id);
  }
  return id;
}

export function getGuestUsername(): string {
  return read<string>(KEYS.username, '');
}
export function setGuestUsername(name: string): void {
  write(KEYS.username, name);
}

/** Map of answered questionId -> last-answered epoch ms. */
export function getAnsweredMap(): Record<string, number> {
  return read<Record<string, number>>(KEYS.answered, {});
}
export function recordAnswered(ids: string[]): void {
  const map = getAnsweredMap();
  const now = Date.now();
  for (const id of ids) map[id] = now;
  write(KEYS.answered, map);
}
export function getAnsweredIdSet(): Set<string> {
  return new Set(Object.keys(getAnsweredMap()));
}

export function getLocalStats(): PlayerStats {
  return read<PlayerStats>(KEYS.stats, emptyStats());
}
export function setLocalStats(stats: PlayerStats): void {
  write(KEYS.stats, stats);
}

export function getLocalLeaderboard(): LeaderboardEntry[] {
  return read<LeaderboardEntry[]>(KEYS.leaderboard, []);
}
export function addLocalLeaderboardEntry(entry: LeaderboardEntry): void {
  const all = getLocalLeaderboard();
  all.push(entry);
  // keep it from growing unbounded
  write(KEYS.leaderboard, all.slice(-500));
}

export interface AppSettings {
  sound: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
}
export function getSettings(): AppSettings {
  return read<AppSettings>(KEYS.settings, {
    sound: true,
    reducedMotion: false,
    highContrast: false,
  });
}
export function setSettings(s: AppSettings): void {
  write(KEYS.settings, s);
}

export const STORAGE_KEYS = KEYS;
export { read as readStorage, write as writeStorage };
