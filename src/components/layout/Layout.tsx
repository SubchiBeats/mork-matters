import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';
import { AchievementToaster } from '../ui/AchievementToaster';

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-nebula-600/20 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-magenta-500/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-aurora-500/10 blur-[120px]" />
      </div>

      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-500">
        <p>
          Built with React, Three.js & Supabase ·{' '}
          <a
            href="https://github.com/SubchiBeats/mork-matters"
            className="text-nebula-400 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            View source on GitHub
          </a>
        </p>
        <p className="mt-1 text-xs text-slate-600">Mork Matters — an original trivia universe. Flag art via flagcdn.com.</p>
      </footer>

      <AchievementToaster />
    </div>
  );
}
