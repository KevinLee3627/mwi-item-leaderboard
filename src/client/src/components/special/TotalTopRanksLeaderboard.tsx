import { Link, useLoaderData } from 'react-router-dom';
import { GetTotalTopRanksLeaderboardRes } from 'server';
import { Table } from 'components/Table';
import { getRankIcon } from 'util/getRankIcon';
import { Header } from 'components/Header';

// TODO: All the special leaderboards are hard-coded :( can we not do that
export function TotalTopSpotsLeaderboard() {
  const { leaderboard, title } =
    useLoaderData() as GetTotalTopRanksLeaderboardRes;
  return (
    <>
      <Header />
      <h1 className='my-4 text-center text-4xl font-extrabold'>{title}</h1>
      <Table
        data={leaderboard.map((entry) => ({
          rank: entry.rank,
          totalTopRanks: entry.totalTopRanks,
          playerName: entry.displayName,
          playerId: entry.id,
        }))}
        headers={[
          { key: 'rank', label: 'Rank' },
          { key: 'playerName', label: 'Player' },
          { key: 'totalTopRanks', label: 'Total Top Ranks' },
        ]}
        defaultColumn='rank'
        row={(entry, i) => {
          return (
            <tr key={i}>
              <td className='p-2 bold'>
                {entry.rank} {getRankIcon(entry.rank)}
              </td>
              <td className='p-2 underline'>
                <Link to={`/player/${entry.playerId}/stats`}>
                  {entry.playerName}
                </Link>
              </td>
              <td className='p-2'>{entry.totalTopRanks.toLocaleString()}</td>
            </tr>
          );
        }}
      />
    </>
  );
}
