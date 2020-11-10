/**
 * Custom Hooks for Date Utility
 * @author treetips
 */
export const useDate = () => {
  const toLocaleDateString = (date: Date): string =>
    date ? new Date(date).toISOString()?.slice(0, 10) : undefined;
  const toLocaleDateTimeString = (date: Date): string =>
    date ? new Date(date).toLocaleString() : undefined;
  const toDate = (dateStr: string): Date => new Date(dateStr);

  return {
    toLocaleDateString,
    toLocaleDateTimeString,
    toDate,
  } as const;
};
