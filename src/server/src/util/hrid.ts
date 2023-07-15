export const hridToDisplayName = (hrid: string): string => {
  const splat = hrid.split('/').at(-1);
  if (splat == null) return '';

  return splat
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
