export const splitStorySentences = (text: string): string[] => {
  const normalized = text.trim();

  if (!normalized) {
    return [];
  }

  return normalized
    .split(/\.+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => `${part}.`);
};
