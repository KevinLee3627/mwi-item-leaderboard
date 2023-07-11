import { Link } from 'react-router-dom';
import { GetPlayerItemsRes } from 'server';
import { hridToDisplayName } from 'util/hridToDisplayName';
import { Table } from 'components/Table';
import { getRankIcon } from 'util/getRankIcon';

interface PlayerItemsTableProps {
  data: GetPlayerItemsRes;
}

export function PlayerItemsTable({ data }: PlayerItemsTableProps) {
  return (
    <Table
      data={data.map((entry) => ({
        rank: entry.rank,
        itemName: hridToDisplayName(entry.itemHrid),
        itemHrid: entry.itemHrid,
        enhancementLevel: entry.itemEnhancementLevel,
        amount: entry.num,
        lastUpdated: entry.ts,
      }))}
      headers={[
        { key: 'rank', label: 'Rank' },
        { key: 'itemName', label: 'Item' },
        { key: 'enhancementLevel', label: 'Enhancement Level' },
        { key: 'amount', label: '#' },
        { key: 'lastUpdated', label: 'Last Updated' },
      ]}
      defaultColumn='itemName'
      row={(entry, i) => {
        return (
          <tr key={i} className='hover text-left'>
            <td className='p-2'>
              {entry.rank} {getRankIcon(entry.rank)}
            </td>
            <td className='p-2 underline'>
              <Link
                to={`/leaderboard/item/?itemHrid=${entry.itemHrid}&enhancementLevel=${entry.enhancementLevel}&limit=100`}
              >
                {hridToDisplayName(entry.itemHrid)}
              </Link>
            </td>
            <td className='p-2'>{entry.enhancementLevel}</td>
            <td className='p-2'>{entry.amount.toLocaleString()}</td>
            <td className='p-2'>
              {new Date(entry.lastUpdated).toLocaleString()}
            </td>
          </tr>
        );
      }}
    />
  );
}
