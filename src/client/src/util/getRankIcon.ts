export function getRankIcon(rank: number) {
  if (rank < 1 || rank > 3) {
    return '';
  }

  if (rank === 1) return '🥇';
  else if (rank === 2) return '🥈';
  else return '🥉';
}
