import { useLoaderData } from 'react-router';
import { GetItemLeaderboardReturn } from 'server';
import { Header } from '../components/Header';
import { PlayerItemsTable } from '../components/PlayerItemsTable';

function getTotalNumber(arr: GetItemLeaderboardReturn[]): number {
  const total = arr.reduce((acc, val) => {
    if (val.itemHrid === '/items/coin') return acc;
    else return acc + val.num;
  }, 0);
  return total;
}

export function Player() {
  const data = useLoaderData() as GetItemLeaderboardReturn[];

  return (
    <>
      <Header />
      <div className='w-8/12 h-full mx-auto flex flex-col items-center'>
        <h1 className='font-bold text-5xl'>{data[0].player.displayName}</h1>
        <div className='flex'>
          <div className='stat'>
            <div className='stat-title'># Unique Items</div>
            <div className='stat-value'>{data.length.toLocaleString()}</div>
            <div className='stat-desc invisible'>lol centering</div>
          </div>
          <div className='stat'>
            <div className='stat-title'>Total # of Items</div>
            <div className='stat-value'>
              {getTotalNumber(data).toLocaleString()}
            </div>
            <div className='stat-desc'>not including coins</div>
          </div>
        </div>
        <PlayerItemsTable
          data={data.sort((a, b) => a.itemHrid.localeCompare(b.itemHrid))}
        />
      </div>
    </>
  );
}
