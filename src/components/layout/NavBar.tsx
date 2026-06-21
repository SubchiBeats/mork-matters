import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppStore } from '@/store/appStore';

const LINKS = [
  { to: '/play', label: 'Play' },
  { to: '/daily', label: 'Daily' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/profile', label: 'Profile' },
];

export function NavBar() {
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const profile = useAppStore((s) => s.profile);
  const cloudEnabled = useAppStore((s) => s.cloudEnabled);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-900/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="group flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-nebula-500 to-magenta-500 text-lg shadow-glow">
            🧠
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Mork<span className="text-gradient">Matters</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-300 hover:bg-white/5"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <NavLink
            to="/settings"
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-300 hover:bg-white/5"
            aria-label="Settings"
            title="Settings"
          >
            ⚙️
          </NavLink>

          {cloudEnabled && profile.isGuest ? (
            <Link to="/auth" className="hidden btn-outline px-3 py-1.5 text-sm sm:inline-flex">
              Sign in
            </Link>
          ) : (
            <Link
              to="/profile"
              className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm sm:flex"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-nebula-500/30 text-xs">
                {profile.username.slice(0, 1).toUpperCase()}
              </span>
              <span className="max-w-[8rem] truncate">{profile.username}</span>
            </Link>
          )}

          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-300 hover:bg-white/5 md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 py-2 md:hidden">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive ? 'bg-white/10 text-white' : 'text-slate-300'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          {cloudEnabled && profile.isGuest && (
            <NavLink to="/auth" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-nebula-300">
              Sign in / Create account
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
}
