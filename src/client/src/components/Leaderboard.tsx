import { Link } from 'react-router-dom';
import { GetItemLeaderboardReturn } from 'server';

interface LeaderboardProps {
  data: GetItemLeaderboardReturn[];
}

export function Leaderboard(props: LeaderboardProps) {
  const rows = props.data.map((entry) => {
    return (
      <tr key={entry.playerId} className='hover text-left'>
        <td className='p-2 underline'>
          <Link to={`/mwi-item-leaderboard/player/${entry.player.id}`}>
            {entry.player.displayName}
          </Link>
        </td>
        <td className='p-2'>{entry.num.toLocaleString()}</td>
        <td className='p-2'>{entry.itemEnhancementLevel}</td>
        <td className='p-2'>{new Date(entry.ts).toLocaleString()}</td>
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
