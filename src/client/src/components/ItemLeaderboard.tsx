import { Link, useLoaderData } from 'react-router-dom';
import { GetAllItemMetadataRes, GetItemLeaderboardRes } from 'server';
import { useFetch } from '../hooks/useFetch';
import { EnhanceLevelPicker } from './EnhanceLevelPicker';
import { ItemSearchBox } from './ItemSearchBox';
import { Table } from './Table';
import { getRankIcon } from '../util/getRankIcon';

export function ItemLeaderboard() {
  const res = useLoaderData() as GetItemLeaderboardRes;

  const { data, loading } = useFetch<GetAllItemMetadataRes>({
    url: `${import.meta.env.VITE_API_BASE}/api/v1/item`,
    method: 'GET',
  });

  return (
    <>
      <p className='text-center'>
        <strong>
          To add your items here, whisper Granttank2 in game with your items
          linked in chat!
        </strong>
      </p>
      <div className='flex w-6/12 mx-auto'>
        <ItemSearchBox
          options={data
            ?.map((item) => {
              return {
                value: item,
                label: `${item.displayName}`,
              };
            })
            .sort((a, b) => a.label.localeCompare(b.label))}
          loading={loading}
        />
        <EnhanceLevelPicker />
      </div>
      <Table
        data={res.map((entry, i) => ({
          rank: i + 1,
          playerName: entry.player.displayName,
          playerId: entry.player.id,
          amount: entry.num,
          enhancementLevel: entry.itemEnhancementLevel,
          lastUpdated: entry.ts,
        }))}
        headers={[
          { key: 'rank', label: 'Rank' },
          { key: 'playerName', label: 'Player' },
          { key: 'amount', label: '#' },
          { key: 'enhancementLevel', label: 'Enhancement Level' },
          { key: 'lastUpdated', label: 'Last Updated' },
        ]}
        defaultColumn='rank'
        row={(entry, i) => {
          return (
            <tr key={i} className='hover text-left'>
              <td className='p-2 bold'>
                {entry.rank} {getRankIcon(entry.rank)}
              </td>
              <td className='p-2 underline'>
                <Link to={`/player/${entry.playerId}/items`}>
                  {entry.playerName}
                </Link>
              </td>
              <td className='p-2'>{entry.amount.toLocaleString()}</td>
              <td className='p-2'>{entry.enhancementLevel}</td>
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
