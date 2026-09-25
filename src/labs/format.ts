/**
 * Number formatting shared by the labs: grouped thousands, at most `digits` decimals, no forced trailing zeros.
 * The locale is fixed (not the reader's) so prerendered HTML and the hydrated client print the same string.
 */
export const fmt = (n: number, digits = 2) =>
  n.toLocaleString("en-GB", { maximumFractionDigits: digits, minimumFractionDigits: 0 });
