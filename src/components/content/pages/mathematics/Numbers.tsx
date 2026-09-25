const isPrime = (n: number) => {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
};

/** Whole numbers the Qur'an mentions, each with one verse where it occurs. Primes are set in gold. */
export function Numbers({ items }: { items: readonly (readonly [number: string, at: string])[] }) {
  return (
    <ol className="flex flex-wrap gap-x-5 gap-y-3 font-mono">
      {items.map(([label, at]) => {
        const prime = isPrime(Number(label.replaceAll(",", "")));
        return (
          <li key={label} className="flex flex-col leading-tight" title={prime ? "Prime" : undefined}>
            <span className={prime ? "text-lg text-gold" : "text-lg text-ink"}>{label}</span> <small className="text-[0.68rem] text-ink-3">{at}</small>
          </li>
        );
      })}
    </ol>
  );
}
