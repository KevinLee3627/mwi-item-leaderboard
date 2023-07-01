import { Link, useLoaderData } from 'react-router-dom';
import { GetOverallAbilityLevelLeaderboardRes } from 'server';
import { Table } from 'components/Table';
import { getRankIcon } from 'util/getRankIcon';
import { Header } from './Header';

export function SpecialLeaderboard() {
  const { leaderboard, title } =
    useLoaderData() as GetOverallAbilityLevelLeaderboardRes;
  return (
    <>
      <Header />
      <h1 className='my-4 text-center text-4xl font-extrabold'>{title}</h1>
      <Table
        data={leaderboard.map((entry, i) => ({
          rank: i + 1,
          abilityLevel: entry.totalLevel,
          playerName: entry.displayName,
          playerId: entry.id,
        }))}
        headers={[
          { key: 'rank', label: 'Rank' },
          { key: 'playerName', label: 'Player' },
          { key: 'abilityLevel', label: 'Level' },
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
              <td className='p-2'>{entry.abilityLevel}</td>
            </tr>
          );
        }}
      />
    </>
  );
}
