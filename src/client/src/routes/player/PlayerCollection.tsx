import { Table } from 'components/Table';
import { useLoaderData } from 'react-router';
import { GetPlayerCollectionRes } from 'server';
import { GameInfo } from 'server/src/clientInfoClean';
import { hridToDisplayName } from 'util/hridToDisplayName';

export interface PlayerCollectionLoaderData extends GetPlayerCollectionRes {
  itemDetailMap: GameInfo['itemDetailMap'];
}

export function PlayerCollection() {
  const { distinctItems, itemCategoryCounts, itemDetailMap } =
    useLoaderData() as PlayerCollectionLoaderData;
  // Toggles:
  // Show missing | Show collected
  // Show [categories]
  const playerItemMap = Object.fromEntries(
    distinctItems.map((item) => [item.itemHrid, item])
  );

  return (
    <div className='p-2 m-4 secondary rounded mx-auto md:w-6/12'>
      <input type='radio' name='radio-1' className='radio radio-primary' />
      <Table
        data={Object.values(itemDetailMap).map((itemDetail) => {
          const playerHasItem = playerItemMap[itemDetail.hrid] != null;
          return {
            ...itemDetail,
            playerHasItem,
          };
        })}
        headers={[
          { label: 'Category', key: 'categoryHrid' },
          { label: 'Item', key: 'name' },
          { label: 'Has Item', key: 'playerHasItem' },
        ]}
        defaultColumn='categoryHrid'
        row={(item, i) => {
          return (
            <tr key={i}>
              <td className='p-2'>{hridToDisplayName(item.categoryHrid)}</td>
              <td className='p-2'>{item.name}</td>
              <td className='p-2'>{item.playerHasItem ? 'yes' : 'no'}</td>
            </tr>
          );
        }}
      />
    </div>
  );
}
