import { Link, useLoaderData } from 'react-router-dom';
import { GetSingleAbilityLevelLeaderboardRes } from 'server';
import { Table } from 'components/Table';
import { getRankIcon } from 'util/getRankIcon';
import { Header } from '../Header';
import { hridToDisplayName } from 'util/hridToDisplayName';

// TODO: All the special leaderboards are hard-coded :( can we not do that
export function SingleAbilityLevelLeaderboard() {
  const { leaderboard, title } =
    useLoaderData() as GetSingleAbilityLevelLeaderboardRes;
  return (
    <>
      <Header />
      <h1 className='my-4 text-center text-4xl font-extrabold'>{title}</h1>
      <Table
        data={leaderboard.map((entry) => ({
          rank: entry.rank,
          abilityLevel: entry.abilityLevel,
          abilityHrid: entry.abilityHrid,
          abilityXp: entry.abilityXp,
          playerName: entry.displayName,
          playerId: entry.id,
        }))}
        headers={[
          { key: 'rank', label: 'Rank' },
          { key: 'playerName', label: 'Player' },
          { key: 'abilityHrid', label: 'Ability' },
          { key: 'abilityLevel', label: 'Ability Level' },
          { key: 'abilityXp', label: 'Ability XP' },
        ]}
        defaultColumn='rank'
        row={(entry, i) => {
          return (
            <tr key={i}>
              <td className='p-2 bold'>
                {entry.rank} {getRankIcon(entry.rank)}
              </td>
              <td className='p-2 underline'>
                <Link to={`/player/${entry.playerId}/abilities`}>
                  {entry.playerName}
                </Link>
              </td>
              <td className='p-2'>{hridToDisplayName(entry.abilityHrid)}</td>
              <td className='p-2'>{entry.abilityLevel}</td>
              <td className='p-2'>{entry.abilityXp.toLocaleString()}</td>
            </tr>
          );
        }}
      />
    </>
  );
}
