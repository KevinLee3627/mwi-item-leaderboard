export const hridToDisplayName = (hrid: string) =>
  hrid
    .replace('/items/', '')
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
