import { Link, useLoaderData } from 'react-router-dom';
import { GetAbilityLeaderboardReturn } from 'server';
import { hridToDisplayName } from '../util/hridToDisplayName';
import { Table } from './Table';

export function PlayerAbilities() {
  const res = useLoaderData() as GetAbilityLeaderboardReturn[];
  console.log(res);
  return (
    <>
      <Table
        data={res.map((entry, i) => ({
          rank: i + 1,
          abilityName: hridToDisplayName(entry.abilityHrid),
          abilityHrid: entry.abilityHrid,
          abilityLevel: entry.abilityLevel,
          abilityXp: entry.abilityXp,
          playerName: entry.player.displayName,
          playerId: entry.playerId,
          lastUpdated: entry.ts,
        }))}
        headers={[
          { key: 'abilityName', label: 'Ability' },
          { key: 'abilityLevel', label: 'Level' },
          { key: 'abilityXp', label: 'XP' },
          { key: 'lastUpdated', label: 'Last Updated' },
        ]}
        defaultColumn='rank'
        row={(entry, i) => {
          return (
            <tr key={i}>
              <td className='p-2 underline'>
                <Link
                  to={`/leaderboard/ability?abilityHrid=${entry.abilityHrid}&limit=100`}
                >
                  {entry.abilityName}
                </Link>
              </td>
              <td className='p-2'>{entry.abilityLevel}</td>
              <td className='p-2'>{entry.abilityXp.toFixed(1)}</td>
              <td className='p-2'>
                {new Date(entry.lastUpdated).toLocaleString()}
              </td>
            </tr>
          );
        }}
      />
    </>
  );
}
