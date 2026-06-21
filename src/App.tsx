import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/appStore';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { PlayPage } from './pages/PlayPage';
import { GamePage } from './pages/GamePage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { DailyPage } from './pages/DailyPage';
import { AuthPage } from './pages/AuthPage';

export default function App() {
  const init = useAppStore((s) => s.init);
  const ready = useAppStore((s) => s.ready);

  useEffect(() => {
    void init();
  }, [init]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-900">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-nebula-500 border-t-transparent" />
          <p className="text-sm text-slate-400">Spinning up the knowledge universe…</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/daily" element={<DailyPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
