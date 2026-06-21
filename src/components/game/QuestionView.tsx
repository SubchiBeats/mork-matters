import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { Question } from '@/types';
import { getCategory } from '@/data/categories';
import { CategoryBadge } from '../ui/Bits';
import { FlagImage } from './FlagImage';

interface Props {
  question: Question & { displayChoices: string[] };
  selected: string | null;
  revealed: boolean;
  lastBreakdown: number;
  onSelect: (choice: string) => void;
}

const DIFF_LABEL: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  expert: 'Expert',
};

export function QuestionView({ question, selected, revealed, lastBreakdown, onSelect }: Props) {
  const [showHint, setShowHint] = useState(false);
  const cat = getCategory(question.category);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="card-surface mx-auto w-full max-w-3xl p-5 sm:p-7"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CategoryBadge id={question.category} size="sm" />
          <span className="text-sm font-medium text-slate-300">{cat?.name}</span>
        </div>
        <span
          className="chip"
          style={{ borderColor: `${cat?.accent}55`, color: cat?.accent }}
        >
          {DIFF_LABEL[question.difficulty]}
        </span>
      </div>

      {question.type === 'flag-identification' && question.flagCode && (
        <div className="mb-5">
          <FlagImage code={question.flagCode} label={revealed ? question.correctAnswer : undefined} />
          {question.hint && (
            <div className="mt-3 text-center">
              {showHint ? (
                <span className="text-sm text-aurora-400">{question.hint}</span>
              ) : (
                <button onClick={() => setShowHint(true)} className="text-sm text-slate-400 underline hover:text-slate-200">
                  Need a hint?
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <h2 className="mb-5 text-balance text-xl font-semibold leading-snug text-slate-100 sm:text-2xl">
        {question.prompt}
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {question.displayChoices.map((choice, i) => {
          const isCorrect = choice === question.correctAnswer;
          const isSelected = choice === selected;
          let state = 'idle';
          if (revealed) {
            if (isCorrect) state = 'correct';
            else if (isSelected) state = 'wrong';
            else state = 'dim';
          }
          return (
            <button
              key={choice}
              disabled={revealed}
              onClick={() => onSelect(choice)}
              className={[
                'group relative flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition',
                state === 'idle' && 'border-white/10 bg-white/5 hover:border-nebula-400/60 hover:bg-white/10',
                state === 'correct' && 'border-emerald-400/70 bg-emerald-500/15 text-emerald-100',
                state === 'wrong' && 'border-rose-400/70 bg-rose-500/15 text-rose-100',
                state === 'dim' && 'border-white/5 bg-white/[0.02] text-slate-400 opacity-70',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-xs font-bold">
                {state === 'correct' ? '✓' : state === 'wrong' ? '✕' : String.fromCharCode(65 + i)}
              </span>
              <span className="font-medium">{choice}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 overflow-hidden"
          >
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-1 flex items-center justify-between">
                <span className={`text-sm font-bold ${selected === question.correctAnswer ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {selected === question.correctAnswer ? `Correct! +${lastBreakdown.toLocaleString()}` : selected === null ? 'Time’s up!' : 'Not quite.'}
                </span>
                {selected !== question.correctAnswer && (
                  <span className="text-sm text-slate-300">
                    Answer: <strong className="text-emerald-300">{question.correctAnswer}</strong>
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-slate-300">{question.explanation}</p>
              {question.sourceNote && <p className="mt-2 text-xs text-slate-500">{question.sourceNote}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
