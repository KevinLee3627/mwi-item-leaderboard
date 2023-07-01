import { Link, useLoaderData } from 'react-router-dom';
import { GetAbilityLeaderboardReturn, GetAllAbilitiesReturn } from 'server';
import { hridToDisplayName } from '../util/hridToDisplayName';
import { AbilitySearchBox } from './AbilitySearchBox';
import { Table } from './Table';

function getRankIcon(rank: number) {
  if (rank < 1 || rank > 3) {
    return '';
  }

  if (rank === 1) return '🥇';
  else if (rank === 2) return '🥈';
  else return '🥉';
}

export interface AbilityLeaderboardLoaderData {
  abilities: GetAllAbilitiesReturn[];
  leaderboard: GetAbilityLeaderboardReturn[];
}

export function AbilityLeaderboard() {
  const res = useLoaderData() as AbilityLeaderboardLoaderData;
  console.log(res);
  return (
    <>
      <p className='text-center'>
        <strong>
          To add your items here, whisper Granttank2 in game with your items
          linked in chat!
        </strong>
      </p>
      <AbilitySearchBox
        options={res.abilities.map((ability) => ({
          label: ability.displayName,
          value: ability,
        }))}
        loading={false}
      />
      <Table
        data={res.leaderboard.map((entry, i) => ({
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
          { key: 'rank', label: 'Rank' },
          { key: 'playerName', label: 'Player' },
          { key: 'abilityName', label: 'Ability' },
          { key: 'abilityLevel', label: 'Level' },
          { key: 'abilityXp', label: 'XP' },
          { key: 'lastUpdated', label: 'Last Updated' },
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
              <td className='p-2'>{entry.abilityName}</td>
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
