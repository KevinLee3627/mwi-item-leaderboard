import { Link, useLoaderData } from 'react-router-dom';
import { GetTotalItemsLeaderboardRes } from 'server';
import { Table } from 'components/Table';
import { getRankIcon } from 'util/getRankIcon';
import { Header } from 'components/Header';

// TODO: All the special leaderboards are hard-coded :( can we not do that
export function TotalItemsLeaderboard() {
  const { leaderboard, title } = useLoaderData() as GetTotalItemsLeaderboardRes;
  return (
    <>
      <Header />
      <h1 className='my-4 text-center text-4xl font-extrabold'>{title}</h1>
      <Table
        data={leaderboard.map((entry) => ({
          rank: entry.rank,
          totalItems: entry.totalItems,
          playerName: entry.displayName,
          playerId: entry.id,
        }))}
        headers={[
          { key: 'rank', label: 'Rank' },
          { key: 'playerName', label: 'Player' },
          { key: 'totalItems', label: 'Total Items' },
        ]}
        defaultColumn='rank'
        row={(entry, i) => {
          return (
            <tr key={i}>
              <td className='p-2 bold'>
                {entry.rank} {getRankIcon(entry.rank)}
              </td>
              <td className='p-2 underline'>
                <Link to={`/player/${entry.playerId}/items`}>
                  {entry.playerName}
                </Link>
              </td>
              <td className='p-2'>
                {Number(entry.totalItems.toFixed(2)).toLocaleString()}
              </td>
            </tr>
          );
        }}
      />
    </>
  );
}
