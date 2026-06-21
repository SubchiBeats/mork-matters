import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useGameStore, QUESTION_SECONDS } from '@/store/gameStore';
import { QuestionView } from '@/components/game/QuestionView';
import { HUD } from '@/components/game/HUD';
import { ResultsScreen } from '@/components/game/ResultsScreen';
import { GAME_MODE_MAP } from '@/data/categories';
import { useSound } from '@/hooks/useSound';

export function GamePage() {
  const status = useGameStore((s) => s.status);
  const navigate = useNavigate();

  if (status === 'idle') return <Navigate to="/play" replace />;
  if (status === 'finished') return <ResultsScreen onExit={() => navigate('/play')} />;

  return <ActiveGame />;
}

function ActiveGame() {
  const {
    questions, index, selected, revealed, lastBreakdown, score, streak, lives,
    mode, roundEndsAt, questionStartedAt, answer, next,
  } = useGameStore();
  const play = useSound();
  const [now, setNow] = useState(() => Date.now());
  const lastRevealRef = useRef(false);

  const modeDef = mode ? GAME_MODE_MAP[mode] : null;
  const totalQuestions = modeDef && modeDef.questionCount > 0 ? modeDef.questionCount : null;
  const timeMode = roundEndsAt !== null;
  const q = questions[index];

  // Sound feedback on each reveal.
  useEffect(() => {
    if (revealed && !lastRevealRef.current) {
      play(useGameStore.getState().lastCorrect ? 'correct' : 'wrong');
    }
    lastRevealRef.current = revealed;
  }, [revealed, play]);

  // Master ticking loop (100ms) for both per-question and global timers.
  useEffect(() => {
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      const s = useGameStore.getState();
      if (s.status !== 'playing') return;
      // Global time over (timed-rush).
      if (s.roundEndsAt !== null && t >= s.roundEndsAt) {
        s.finish();
        return;
      }
      // Per-question soft timer expired -> auto-mark as missed.
      if (!s.revealed) {
        const perLeft = QUESTION_SECONDS - (t - s.questionStartedAt) / 1000;
        if (perLeft <= 0) s.answer(null);
      }
    }, 100);
    return () => clearInterval(id);
  }, []);

  // Keyboard controls.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const s = useGameStore.getState();
      const cur = s.questions[s.index];
      if (!cur) return;
      if (s.revealed) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          s.next();
        }
        return;
      }
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= cur.displayChoices.length) {
        s.answer(cur.displayChoices[num - 1]);
      } else {
        const letter = e.key.toLowerCase().charCodeAt(0) - 97;
        if (letter >= 0 && letter < cur.displayChoices.length) s.answer(cur.displayChoices[letter]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!q) return null;

  const perQuestionLeft = Math.max(0, QUESTION_SECONDS - (now - questionStartedAt) / 1000);
  const globalLeft = roundEndsAt !== null ? Math.max(0, (roundEndsAt - now) / 1000) : null;
  const secondsLeft = timeMode ? (globalLeft ?? 0) : perQuestionLeft;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <div className="mb-5">
        <HUD
          score={score}
          streak={streak}
          lives={lives}
          questionNumber={index + 1}
          totalQuestions={totalQuestions}
          secondsLeft={secondsLeft}
          timeMode={timeMode}
        />
      </div>

      <AnimatePresence mode="wait">
        <QuestionView
          key={q.id}
          question={q}
          selected={selected}
          revealed={revealed}
          lastBreakdown={lastBreakdown}
          onSelect={(c) => answer(c)}
        />
      </AnimatePresence>

      <div className="mt-5 flex justify-end">
        {revealed && (
          <button onClick={() => next()} className="btn-primary">
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
