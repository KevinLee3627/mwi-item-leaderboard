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
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <td>Player</td>
          <td>#</td>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
