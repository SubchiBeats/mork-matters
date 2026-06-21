import type { ReactNode } from 'react';
import { getCategory } from '@/data/categories';

export function CategoryBadge({ id, size = 'md' }: { id: string; size?: 'sm' | 'md' | 'lg' }) {
  const cat = getCategory(id);
  if (!cat) return null;
  const dim = size === 'sm' ? 'h-8 w-8 text-base' : size === 'lg' ? 'h-14 w-14 text-3xl' : 'h-10 w-10 text-xl';
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl ${dim}`}
      style={{
        background: `linear-gradient(135deg, ${cat.color[0]}33, ${cat.color[1]}22)`,
        boxShadow: `0 0 24px -10px ${cat.accent}`,
        border: `1px solid ${cat.accent}55`,
      }}
      aria-hidden
    >
      {cat.glyph}
    </span>
  );
}

export function ProgressBar({
  value,
  max,
  accent = '#6366f1',
  className = '',
}: {
  value: number;
  max: number;
  accent?: string;
  className?: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-white/10 ${className}`}>
      <div
        className="h-full rounded-full transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${accent}, ${accent}aa)` }}
      />
    </div>
  );
}

export function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="card-surface p-4">
      <div className="text-xs uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-bold text-gradient">{value}</div>
      {hint && <div className="mt-0.5 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}

export function SectionTitle({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div className="mb-6">
      {kicker && (
        <div className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-nebula-400">{kicker}</div>
      )}
      <h2 className="font-display text-3xl font-bold text-slate-100 sm:text-4xl">{title}</h2>
      {sub && <p className="mt-2 max-w-2xl text-slate-400">{sub}</p>}
    </div>
  );
}
