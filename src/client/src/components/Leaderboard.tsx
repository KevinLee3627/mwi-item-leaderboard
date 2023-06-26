import { GetItemLeaderboardReturn } from 'server';

interface LeaderboardProps {
  data: GetItemLeaderboardReturn[];
}

export function Leaderboard(props: LeaderboardProps) {
  const rows = props.data.map((entry) => {
    return (
      <tr key={entry.playerId} className='hover text-left'>
        <td className='p-2'>{entry.player.displayName}</td>
        <td className='p-2'>{entry.num}</td>
        <td className='p-2'>{entry.itemEnhancementLevel}</td>
        <td className='p-2'>{entry.ts}</td>
      </tr>
    );
  });
  return (
    <table className='table table-zebra mx-auto w-6/12'>
      <thead className='border-b-2 border-black'>
        <tr className='text-left p-4'>
          <td className='p-2'>Player</td>
          <td className='p-2'>#</td>
          <td className='p-2'>Enhancement Level</td>
          <td className='p-2'>Last Updated</td>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
