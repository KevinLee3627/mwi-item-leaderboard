import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { useLoaderData } from 'react-router';
import { GetPlayerStatsRes } from 'server';

export function PlayerStats() {
  const { topRanks, distinctItems, itemCategoryCounts } =
    useLoaderData() as GetPlayerStatsRes;

  const numTotalGameItems = Object.values(itemCategoryCounts).reduce(
    (acc, val) => acc + val,
    0
  );

  return (
    <>
      <div className='p-2 m-4 secondary rounded mx-auto md:w-6/12'>
        <h1 className='text-2xl font-bold'>Collection</h1>
        <div className='flex w-full'>
          <div className='stats w-full bg-primary text-primary-content'>
            <div className='stat w-fit bg-secondary'>
              <div className='stat-title text-white'>
                Items Collection
                <div
                  className='tooltip'
                  data-tip='Does not include items of different enhancement levels.'
                >
                  <QuestionMarkCircleIcon className='h-4 inline pl-2 tooltip'></QuestionMarkCircleIcon>
                </div>
              </div>
              <span className='stat-value'>
                {distinctItems.length}/{numTotalGameItems}
              </span>
            </div>
            <div className='stat w-fit bg-secondary'>
              <div className='stat-title text-white'>
                Food/Drink
                <div
                  className='tooltip'
                  data-tip='Does not include items of different enhancement levels.'
                >
                  <QuestionMarkCircleIcon className='h-4 inline pl-2 tooltip'></QuestionMarkCircleIcon>
                </div>
              </div>
              <span className='stat-value'>
                {distinctItems.length}/{numTotalGameItems}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex'>
        <div className='stat'>
          <div className='stat-title'># Top Ranks</div>
          <div className='stat-value'>{topRanks.toLocaleString()}</div>
          <div className='stat-desc invisible'>lol centering</div>
        </div>
      </div>
    </>
  );
}
