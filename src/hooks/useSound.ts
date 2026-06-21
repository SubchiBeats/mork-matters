import { useCallback, useRef } from 'react';
import { useAppStore } from '@/store/appStore';

type SoundName = 'correct' | 'wrong' | 'click' | 'win' | 'tick';

/**
 * Lightweight Web Audio sound effects — no asset files needed. Respects the
 * user's sound toggle. Tones are short and synthesized on the fly.
 */
export function useSound() {
  const enabled = useAppStore((s) => s.settings.sound);
  const ctxRef = useRef<AudioContext | null>(null);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      try {
        if (!ctxRef.current) {
          const Ctor =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          ctxRef.current = new Ctor();
        }
        const ctx = ctxRef.current;
        if (ctx.state === 'suspended') void ctx.resume();

        const notes = SOUNDS[name];
        let t = ctx.currentTime;
        for (const [freq, dur] of notes) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = name === 'wrong' ? 'sawtooth' : 'sine';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.exponentialRampToValueAtTime(0.18, t + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
          osc.connect(gain).connect(ctx.destination);
          osc.start(t);
          osc.stop(t + dur);
          t += dur * 0.9;
        }
      } catch {
        /* audio not available — silently ignore */
      }
    },
    [enabled],
  );

  return play;
}

// [frequency Hz, duration s]
const SOUNDS: Record<SoundName, [number, number][]> = {
  correct: [
    [523.25, 0.1],
    [659.25, 0.1],
    [783.99, 0.16],
  ],
  wrong: [
    [196, 0.16],
    [146.83, 0.22],
  ],
  click: [[440, 0.05]],
  tick: [[880, 0.03]],
  win: [
    [523.25, 0.12],
    [659.25, 0.12],
    [783.99, 0.12],
    [1046.5, 0.25],
  ],
};
