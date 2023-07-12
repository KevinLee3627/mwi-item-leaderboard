import { useLoaderData } from 'react-router';
import { GetPlayerCollectionRes } from 'server';
import { GameInfo } from 'server/src/clientInfoClean';

export interface PlayerCollectionLoaderData extends GetPlayerCollectionRes {
  itemDetailMap: GameInfo['itemDetailMap'];
}

export function PlayerCollection() {
  const { distinctItems, itemCategoryCounts, itemDetailMap } =
    useLoaderData() as PlayerCollectionLoaderData;

  return (
    <div className='p-2 m-4 secondary rounded mx-auto md:w-6/12'>
      items: {distinctItems.length}
    </div>
  );
}
