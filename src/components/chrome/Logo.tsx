import { useId } from "react";

/** The site mark: crescent, orbit and star. Inlined so it follows the text colour in both themes. */
export function Logo({ className = "size-8" }: { className?: string }) {
  const id = useId();
  const cut = `${id}-cut`;
  const gap = `${id}-gap`;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <mask id={cut}>
          <rect width="64" height="64" fill="#fff" />
          <circle cx="39.5" cy="26.5" r="16.5" fill="#000" />
        </mask>
        <mask id={gap}>
          <rect width="64" height="64" fill="#fff" />
          <circle cx="30" cy="33" r="21.6" fill="#000" mask={`url(#${cut})`} />
        </mask>
      </defs>
      <g fill="none" stroke="currentColor" strokeWidth="1.6" mask={`url(#${gap})`} opacity=".85">
        <ellipse cx="32" cy="33" rx="29" ry="9.5" transform="rotate(-18 32 33)" />
      </g>
      <circle cx="30" cy="33" r="20" fill="var(--gold)" mask={`url(#${cut})`} />
      <path d="M44 20.5l1.35 3.65L49 25.5l-3.65 1.35L44 30.5l-1.35-3.65L39 25.5l3.65-1.35z" fill="currentColor" />
      <circle cx="57.6" cy="23.9" r="2.2" fill="currentColor" />
    </svg>
  );
}
