import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { SectionTitle } from '@/components/ui/Bits';
import { STORAGE_KEYS } from '@/lib/localStore';

function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div>
        <div className="font-medium text-slate-100">{label}</div>
        {hint && <div className="text-sm text-slate-400">{hint}</div>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${checked ? 'bg-nebula-500' : 'bg-white/15'}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${checked ? 'left-6' : 'left-1'}`}
        />
      </button>
    </label>
  );
}

export function SettingsPage() {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const settings = useAppStore((s) => s.settings);
  const updateSettings = useAppStore((s) => s.updateSettings);
  const [confirmReset, setConfirmReset] = useState(false);

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEYS.stats);
    localStorage.removeItem(STORAGE_KEYS.answered);
    localStorage.removeItem(STORAGE_KEYS.leaderboard);
    window.location.reload();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <SectionTitle kicker="Preferences" title="Settings" />

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div>
            <div className="font-medium text-slate-100">Theme</div>
            <div className="text-sm text-slate-400">Night mode reshapes the 3D scene with deeper space &amp; glow.</div>
          </div>
          <div className="flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => setTheme('light')}
              className={`rounded-md px-3 py-1.5 text-sm ${theme === 'light' ? 'bg-white/15 text-white' : 'text-slate-400'}`}
            >
              ☀️ Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`rounded-md px-3 py-1.5 text-sm ${theme === 'dark' ? 'bg-white/15 text-white' : 'text-slate-400'}`}
            >
              🌙 Dark
            </button>
          </div>
        </div>

        <Toggle
          checked={settings.sound}
          onChange={(v) => updateSettings({ sound: v })}
          label="Sound effects"
          hint="Synthesized tones for correct/incorrect answers and wins."
        />
        <Toggle
          checked={settings.reducedMotion}
          onChange={(v) => updateSettings({ reducedMotion: v })}
          label="Reduce motion"
          hint="Pauses 3D orbit/auto-rotation and minimizes animations."
        />
        <Toggle
          checked={settings.highContrast}
          onChange={(v) => updateSettings({ highContrast: v })}
          label="High contrast"
          hint="Stronger borders for improved readability."
        />
      </div>

      <div className="mt-10">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-rose-400">Danger zone</h3>
        <div className="rounded-xl border border-rose-400/30 bg-rose-500/5 p-4">
          <div className="font-medium text-slate-100">Reset local progress</div>
          <div className="text-sm text-slate-400">
            Clears stats, answered-question history and the local leaderboard on this device. Cloud data (if signed in) is unaffected.
          </div>
          {!confirmReset ? (
            <button onClick={() => setConfirmReset(true)} className="btn-outline mt-3 border-rose-400/40 text-rose-200">
              Reset progress…
            </button>
          ) : (
            <div className="mt-3 flex gap-2">
              <button onClick={resetProgress} className="btn bg-rose-500 text-white hover:bg-rose-600">
                Yes, reset everything
              </button>
              <button onClick={() => setConfirmReset(false)} className="btn-ghost">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
