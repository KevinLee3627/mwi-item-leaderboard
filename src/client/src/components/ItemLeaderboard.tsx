import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import {
  GetAllItemMetadataRes,
  GetItemLeaderboardRes,
  GetItemMetadataRes,
} from 'server';
import { Table } from 'components/Table';
import { getRankIcon } from 'util/getRankIcon';
import { hridToDisplayName } from 'util/hridToDisplayName';
import { customTheme } from 'util/reactSelectCustomTheme';
import { type Header } from './TableHeader';

export interface ItemLeaderboardLoaderData {
  leaderboard: GetItemLeaderboardRes;
  allItemMetadata: GetAllItemMetadataRes;
  enhancementLevelData: GetItemMetadataRes;
}

type Unpack<T> = T extends (infer U)[] ? U : T;

export function ItemLeaderboard() {
  const { leaderboard, allItemMetadata, enhancementLevelData } =
    useLoaderData() as ItemLeaderboardLoaderData;

  console.log(allItemMetadata);

  const showEnhancementLevel =
    enhancementLevelData.at(0)?.categoryHrid === '/item_categories/equipment';

  const data = leaderboard.map((entry) => ({
    rank: entry.rank,
    playerName: entry.player.displayName,
    playerId: entry.player.id,
    amount: entry.num,
    enhancementLevel: entry.itemEnhancementLevel,
    lastUpdated: entry.ts,
  }));

  const headers: Header<Unpack<typeof data>>[] = [
    { key: 'rank', label: 'Rank' },
    { key: 'playerName', label: 'Player' },
    { key: 'amount', label: '#' },
    { key: 'enhancementLevel', label: 'Enhancement Level' },
    { key: 'lastUpdated', label: 'Last Updated' },
  ].filter(
    (val): val is Header<Unpack<typeof data>> =>
      !(!showEnhancementLevel && val.key === 'enhancementLevel')
  );

  const row = (entry: Unpack<typeof data>, i: number) => {
    return (
      <tr key={i} className='hover text-left'>
        <td className='p-2 bold'>
          {entry.rank} {getRankIcon(entry.rank)}
        </td>
        <td className='p-2 underline'>
          <Link to={`/player/${entry.playerId}/items`}>{entry.playerName}</Link>
        </td>
        <td className='p-2'>{entry.amount.toLocaleString()}</td>
        {showEnhancementLevel && (
          <td className='p-2'>{entry.enhancementLevel}</td>
        )}
        <td className='p-2'>{new Date(entry.lastUpdated).toLocaleString()}</td>
      </tr>
    );
  };

  return (
    <>
      <div className='flex mx-auto md:w-6/12'>
        <ItemSearchBox
          options={allItemMetadata
            ?.map((item) => ({
              value: item,
              label: `${item.displayName}`,
            }))
            .sort((a, b) => a.label.localeCompare(b.label))}
        />
        <EnhanceLevelPicker />
      </div>
      <div className='overflow-x-auto'>
        <Table data={data} headers={headers} defaultColumn='rank' row={row} />
      </div>
    </>
  );
}

interface SearchBoxOption<T> {
  label: string;
  value: T;
}

interface ItemMetadata {
  hrid: string;
  displayName: string;
  enhancementLevel: number;
}

interface SearchBoxProps {
  options?: SearchBoxOption<ItemMetadata>[];
  loading?: boolean;
}

function ItemSearchBox(props: SearchBoxProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { current: itemHrid } = useRef(searchParams.get('itemHrid'));

  return (
    <div className='mx-auto flex-1'>
      <Select
        isSearchable
        options={props?.options}
        defaultValue={{
          label: hridToDisplayName(itemHrid ?? ''),
          value: {
            hrid: itemHrid,
            displayName: hridToDisplayName(itemHrid ?? ''),
            enhancementLevel: parseInt(
              searchParams.get('enhancementLevel') ?? '0'
            ),
          },
        }}
        placeholder={props.loading ? 'Loading options...' : 'Search items'}
        onChange={(newValue) => {
          searchParams.set('itemHrid', String(newValue?.value.hrid));
          const enhancementLevel = searchParams.get('enhancementLevel') ?? -1;
          const nextUrl = `/leaderboard/item?itemHrid=${newValue?.value.hrid}&enhancementLevel=${enhancementLevel}&limit=100`;
          navigate(nextUrl);
        }}
        theme={customTheme}
      />
    </div>
  );
}

interface EnhanceOption {
  label: string;
  value: number;
}

const allOption: EnhanceOption = { label: 'all', value: -1 };

export function EnhanceLevelPicker() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { enhancementLevelData } = useLoaderData() as ItemLeaderboardLoaderData;

  const { current: defaultLevel } = useRef<number>(
    parseInt(searchParams.get('enhancementLevel') ?? '-1')
  );
  const [options, setOptions] = useState<EnhanceOption[]>([allOption]);

  useEffect(() => {
    const availableLevels = enhancementLevelData.map(({ enhancementLevel }) => {
      return {
        label: `+${enhancementLevel.toString()}`,
        value: enhancementLevel,
      };
    });
    setOptions([allOption, ...availableLevels]);
  }, [enhancementLevelData]);

  return (
    <div>
      <Select
        isSearchable
        options={options}
        defaultValue={{
          label: defaultLevel === -1 ? allOption.label : `+${defaultLevel}`,
          value: defaultLevel,
        }}
        placeholder={''}
        onChange={(newValue) => {
          // Take the current search params, replace the enhancementLevel
          searchParams.set('enhancementLevel', String(newValue?.value));
          navigate(`/leaderboard/item?${searchParams.toString()}`);
        }}
        theme={customTheme}
      />
    </div>
  );
}
