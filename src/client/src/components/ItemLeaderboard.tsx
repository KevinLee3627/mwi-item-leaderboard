import { Link, useLoaderData } from 'react-router-dom';
import {
  GetAllItemMetadataRes,
  GetItemLeaderboardRes,
  GetItemMetadataRes,
} from 'server';
import { EnhanceLevelPicker } from 'components/EnhanceLevelPicker';
import { ItemSearchBox } from 'components/ItemSearchBox';
import { Table } from 'components/Table';
import { getRankIcon } from 'util/getRankIcon';

export interface ItemLeaderboardLoaderData {
  leaderboard: GetItemLeaderboardRes;
  itemMetadata: GetAllItemMetadataRes;
  enhancementLevelData: GetItemMetadataRes;
}

export function ItemLeaderboard() {
  const { leaderboard, itemMetadata } =
    useLoaderData() as ItemLeaderboardLoaderData;

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
          options={itemMetadata
            ?.map((item) => {
              return {
                value: item,
                label: `${item.displayName}`,
              };
            })
            .sort((a, b) => a.label.localeCompare(b.label))}
        />
        <EnhanceLevelPicker />
      </div>
      <Table
        data={leaderboard.map((entry, i) => ({
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
