import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { SectionTitle } from '@/components/ui/Bits';

export function AuthPage() {
  const navigate = useNavigate();
  const cloudEnabled = useAppStore((s) => s.cloudEnabled);
  const login = useAppStore((s) => s.login);
  const register = useAppStore((s) => s.register);
  const magicLink = useAppStore((s) => s.magicLink);

  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  if (!cloudEnabled) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
        <div className="text-5xl">☁️</div>
        <h1 className="mt-4 font-display text-2xl font-bold">Cloud accounts aren’t configured</h1>
        <p className="mt-2 text-slate-400">
          This deployment is running in guest-only mode. Add your Supabase{' '}
          <code className="text-nebula-300">VITE_SUPABASE_URL</code> and{' '}
          <code className="text-nebula-300">VITE_SUPABASE_ANON_KEY</code> to enable sign-in, cloud
          saves and the global leaderboard. Until then, your progress is saved locally on this device.
        </p>
        <button onClick={() => navigate('/play')} className="btn-primary mt-6">
          Keep playing as a guest
        </button>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      if (tab === 'login') {
        await login(email, password);
        navigate('/profile');
      } else {
        await register(email, password, username || email.split('@')[0]);
        setInfo('Account created! Check your email if confirmation is required, then sign in.');
        setTab('login');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  const sendLink = async () => {
    if (!email) {
      setError('Enter your email first.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await magicLink(email);
      setInfo('Magic link sent — check your inbox.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send magic link.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <SectionTitle kicker="Account" title={tab === 'login' ? 'Welcome back' : 'Create account'} />

      <div className="mb-4 flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
        {(['login', 'register'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium capitalize ${
              tab === t ? 'bg-white/15 text-white' : 'text-slate-400'
            }`}
          >
            {t === 'login' ? 'Sign in' : 'Register'}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="card-surface space-y-3 p-5">
        {tab === 'register' && (
          <Field label="Username" value={username} onChange={setUsername} placeholder="NebulaNomad" />
        )}
        <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
        <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />

        {error && <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 p-2 text-sm text-rose-200">{error}</p>}
        {info && <p className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-2 text-sm text-emerald-200">{info}</p>}

        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? 'Working…' : tab === 'login' ? 'Sign in' : 'Create account'}
        </button>
        <button type="button" onClick={sendLink} disabled={busy} className="btn-ghost w-full text-sm">
          ✉️ Email me a magic link instead
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-slate-500">
        Your local guest progress stays on this device and isn’t automatically merged into a new account.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-slate-300">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-ink-800 px-3 py-2.5 text-slate-100 focus:border-nebula-400 focus:outline-none"
      />
    </label>
  );
}
