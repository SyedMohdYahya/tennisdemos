type ClassValue = string | number | null | undefined | false | Record<string, boolean | undefined | null>;

export function cn(...inputs: ClassValue[]) {
  return inputs
    .flatMap((input) => {
      if (!input) return [];
      if (typeof input === 'string' || typeof input === 'number') return [String(input)];
      return Object.entries(input)
        .filter(([, value]) => Boolean(value))
        .map(([key]) => key);
    })
    .join(' ');
}
