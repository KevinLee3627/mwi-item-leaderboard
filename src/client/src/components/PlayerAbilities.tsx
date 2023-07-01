import { Link, useLoaderData } from 'react-router-dom';
import { hridToDisplayName } from 'util/hridToDisplayName';
import { Table } from 'components/Table';
import { GetAbilityLeaderboardRes } from 'server';

function getTotalLevels(abilities: GetAbilityLeaderboardRes) {
  return abilities.reduce((acc, val) => {
    return acc + val.abilityLevel;
  }, 0);
}
function getTotalXp(abilities: GetAbilityLeaderboardRes) {
  return abilities.reduce((acc, val) => {
    return acc + val.abilityXp;
  }, 0);
}

export function PlayerAbilities() {
  const res = useLoaderData() as GetAbilityLeaderboardRes;
  console.log(res);
  return (
    <>
      <div className='flex'>
        <div className='stat'>
          <div className='stat-title'>Total Ability Level</div>
          <div className='stat-value'>{getTotalLevels(res)} </div>
        </div>
        <div className='stat'>
          <div className='stat-title'>Total Ability XP</div>
          <div className='stat-value'>{getTotalXp(res).toFixed(1)}</div>
        </div>
      </div>
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
