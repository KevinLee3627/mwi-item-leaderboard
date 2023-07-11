import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
import { GetPlayerItemsRes } from 'server';
import { Table } from 'components/Table';
import { getRankIcon } from 'util/getRankIcon';
import { hridToDisplayName } from 'util/hridToDisplayName';

function getTotalNumber(arr: GetPlayerItemsRes): number {
  const total = arr.reduce((acc, val) => {
    if (val.itemHrid === '/items/coin') return acc;
    else return acc + val.num;
  }, 0);
  return total;
}

export function PlayerItems() {
  const data = useLoaderData() as GetPlayerItemsRes;

  return (
    <div>
      <div className='flex md:w-3/12 mx-auto'>
        <div className='stat mx-auto w-fit'>
          <div className='stat-title'># Unique Items</div>
          <div className='stat-value'>{data.length.toLocaleString()}</div>
          <div className='stat-desc invisible'>lol centering</div>
        </div>
        <div className='stat mx-auto w-fit'>
          <div className='stat-title'>Total # of Items</div>
          <div className='stat-value'>
            {getTotalNumber(data).toLocaleString()}
          </div>
          <div className='stat-desc'>not including coins</div>
        </div>
      </div>
      <div className='overflow-x-auto'>
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
      </div>
    </div>
  );
}
