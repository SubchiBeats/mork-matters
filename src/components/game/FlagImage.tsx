import { useState } from 'react';

/**
 * Renders a country flag from flagcdn.com (public-domain artwork). Falls back to
 * an emoji-free placeholder if the image fails so the layout never breaks.
 */
export function FlagImage({ code, label }: { code: string; label?: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="grid aspect-[3/2] w-full place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-400">
        <span className="text-sm">Flag unavailable</span>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-xl border border-white/15 shadow-glow">
      <img
        src={`https://flagcdn.com/w640/${code}.png`}
        srcSet={`https://flagcdn.com/w320/${code}.png 320w, https://flagcdn.com/w640/${code}.png 640w, https://flagcdn.com/w1280/${code}.png 1280w`}
        sizes="(max-width: 640px) 90vw, 28rem"
        alt={label ?? 'Flag to identify'}
        loading="eager"
        onError={() => setErrored(true)}
        className="block aspect-[3/2] w-full object-cover"
      />
    </div>
  );
}
