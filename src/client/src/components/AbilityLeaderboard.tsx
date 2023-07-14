import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link, useLoaderData } from 'react-router-dom';
import Select from 'react-select';
import { GetAbilityLeaderboardRes, GetAllAbilityMetadataRes } from 'server';
import { hridToDisplayName } from 'util/hridToDisplayName';
import { Table } from 'components/Table';
import { getRankIcon } from 'util/getRankIcon';
import { customTheme } from 'util/reactSelectCustomTheme';

export interface AbilityLeaderboardLoaderData {
  abilities: GetAllAbilityMetadataRes;
  leaderboard: GetAbilityLeaderboardRes;
}

export function AbilityLeaderboard() {
  const res = useLoaderData() as AbilityLeaderboardLoaderData;
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
      <div className='overflow-x-auto'>
        <Table
          data={res.leaderboard.map((entry) => ({
            rank: entry.rank,
            abilityName: hridToDisplayName(entry.abilityHrid),
            abilityHrid: entry.abilityHrid,
            abilityLevel: entry.abilityLevel,
            abilityXp: entry.abilityXp,
            playerName: entry.player.displayName,
            playerId: entry.player.id,
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
                  <Link to={`/player/${entry.playerId}/abilities`}>
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
      </div>
    </>
  );
}

export interface AbilitySearchOption<T> {
  label: string;
  value: T;
}

interface SearchBoxProps {
  options?: AbilitySearchOption<GetAllAbilityMetadataRes[0]>[];
  loading: boolean;
}

export function AbilitySearchBox(props: SearchBoxProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useRef(new URLSearchParams(location.search.slice(1)));

  return (
    <div className='md:w-6/12 mx-auto flex-1 '>
      <Select
        isSearchable
        options={props?.options}
        defaultValue={{
          label: hridToDisplayName(
            hridToDisplayName(searchParams.current.get('abilityHrid') ?? '')
          ),
          value: {
            hrid: searchParams.current.get('abilityHrid'),
            displayName: hridToDisplayName(
              searchParams.current.get('abilityHrid') ?? ''
            ),
          },
        }}
        placeholder={props.loading ? 'Loading options...' : 'Search items'}
        onChange={(newValue) => {
          const searchParams = new URLSearchParams(location.search.slice(1));
          searchParams.set('abilityHrid', String(newValue?.value.hrid));
          navigate(`/leaderboard/ability?${searchParams.toString()}&limit=100`);
        }}
        theme={customTheme}
      />
    </div>
  );
}
