import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { useLoaderData } from 'react-router';
import { GetPlayerStatsRes } from 'server';

export function PlayerStats() {
  const data = useLoaderData() as GetPlayerStatsRes;
  const numTotalGameItems = Object.values(data.itemCategoryCounts).reduce(
    (acc, val) => {
      return acc + val;
    },
    0
  );
  return (
    <>
      <h1 className='text-2xl'>Collection</h1>
      <div className='flex w-full'>
        <div className='stats w-full'>
          <div className='stat'>
            <div className='stat-title'>
              Items Collection
              <div
                className='tooltip'
                data-tip='Does not include items of different enhancement levels.'
              >
                <QuestionMarkCircleIcon className='h-4 inline pl-2 tooltip'></QuestionMarkCircleIcon>
              </div>
            </div>
            <div className='stat-value'>
              {data.numDistinctItems}/{numTotalGameItems}
            </div>
            <div className='stat-desc invisible'>lol centering</div>
          </div>
        </div>
      </div>

      <div className='flex'>
        <div className='stat'>
          <div className='stat-title'># Top Ranks</div>
          <div className='stat-value'>{data.topRanks.toLocaleString()}</div>
          <div className='stat-desc invisible'>lol centering</div>
        </div>
      </div>
    </>
  );
}
