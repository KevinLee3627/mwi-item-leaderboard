import { GetItemLeaderboardReturn } from 'server';

interface LeaderboardProps {
  data: GetItemLeaderboardReturn[];
}

export function Leaderboard(props: LeaderboardProps) {
  const rows = props.data.map((entry) => {
    return (
      <tr key={entry.playerId}>
        <td>{entry.player.displayName}</td>
        <td>{entry.num}</td>
        <td>{entry.itemEnhancementLevel}</td>
        <td>{entry.ts}</td>
      </tr>
    );
  });
  return (
    <table className='table-auto'>
      <thead>
        <tr>
          <td>Player</td>
          <td>#</td>
          <td>Enhancement Level</td>
          <td>Last Updated</td>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
