import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAppStore } from '@/store/appStore';
import { ACHIEVEMENT_MAP } from '@/utils/achievements';
import { useSound } from '@/hooks/useSound';

export function AchievementToaster() {
  const newly = useAppStore((s) => s.newlyEarned);
  const clear = useAppStore((s) => s.clearNewlyEarned);
  const play = useSound();

  useEffect(() => {
    if (newly.length) {
      play('win');
      const t = setTimeout(clear, 5000);
      return () => clearTimeout(t);
    }
  }, [newly, clear, play]);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {newly.map((id) => {
          const a = ACHIEVEMENT_MAP[id];
          if (!a) return null;
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60 }}
              className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-nebula-400/40 bg-ink-800/90 px-4 py-3 shadow-glow backdrop-blur-xl"
            >
              <span className="text-2xl">{a.glyph}</span>
              <div>
                <div className="text-xs uppercase tracking-wider text-nebula-300">Achievement unlocked</div>
                <div className="font-semibold text-white">{a.name}</div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
