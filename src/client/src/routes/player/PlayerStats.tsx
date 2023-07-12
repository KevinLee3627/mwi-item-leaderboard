import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { useLoaderData } from 'react-router';
import { GetPlayerStatsRes } from 'server';
import {
  ItemCategoryHrid,
  itemCategoryHrids,
} from 'server/src/clientInfoClean';
import { CountUp } from 'use-count-up';

function getNumByCategory(data: GetPlayerStatsRes['distinctItems']) {
  const mapping = {} as Record<ItemCategoryHrid, number>;
  for (let i = 0; i < itemCategoryHrids.length; i++) {
    const hrid = itemCategoryHrids[i];
    mapping[hrid] = 0;
  }
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (mapping[item.categoryHrid] == null) mapping[item.categoryHrid] = 0;
    mapping[item.categoryHrid]++;
  }
  return mapping;
}

export function PlayerStats() {
  const { distinctItems, itemCategoryCounts } =
    useLoaderData() as GetPlayerStatsRes;

  const numTotalGameItems = Object.values(itemCategoryCounts).reduce(
    (acc, val) => acc + val,
    0
  );

  const numByCategory = getNumByCategory(distinctItems);
  console.log(numByCategory);

  return (
    <>
      <div className='p-2 m-4 secondary rounded mx-auto md:w-6/12'>
        <div className='w-full'>
          <div className='flex flex-col flex-wrap md:flex-row w-fit bg-secondary text-primary-content'>
            <div className='stat w-full bg-secondary'>
              <div className='stat-title text-white'>
                Total Item Collection
                <div
                  className='tooltip'
                  data-tip='Does not include items of different enhancement levels.'
                >
                  <QuestionMarkCircleIcon className='h-4 inline pl-2 tooltip'></QuestionMarkCircleIcon>
                </div>
              </div>
              <span className='stat-value'>
                <CountUp isCounting end={distinctItems.length} duration={0.5} />
                /{numTotalGameItems}
              </span>
            </div>
            <div className='stat w-fit bg-secondary'>
              <div className='stat-title text-white'>
                Equipment
                <div
                  className='tooltip'
                  data-tip='Does not include items of different enhancement levels.'
                >
                  <QuestionMarkCircleIcon className='h-4 inline pl-2 tooltip'></QuestionMarkCircleIcon>
                </div>
              </div>
              <span className='stat-value'>
                <CountUp
                  isCounting
                  end={numByCategory['/item_categories/equipment']}
                  duration={0.5}
                />
                /{itemCategoryCounts['/item_categories/equipment']}
              </span>
            </div>
            <div className='stat w-fit bg-secondary'>
              <div className='stat-title text-white'>Resources</div>
              <span className='stat-value'>
                <CountUp
                  isCounting
                  end={numByCategory['/item_categories/resource']}
                  duration={0.5}
                />
                /{itemCategoryCounts['/item_categories/resource']}
              </span>
            </div>
            <div className='stat w-fit bg-secondary'>
              <div className='stat-title text-white'>Loot</div>
              <span className='stat-value'>
                <CountUp
                  isCounting
                  end={numByCategory['/item_categories/loot']}
                  duration={0.5}
                />
                /{itemCategoryCounts['/item_categories/loot']}
              </span>
            </div>
            <div className='stat w-fit bg-secondary'>
              <div className='stat-title text-white'>Ability Books</div>
              <span className='stat-value'>
                <CountUp
                  isCounting
                  end={numByCategory['/item_categories/ability_book']}
                  duration={0.5}
                />
                /{itemCategoryCounts['/item_categories/ability_book']}
              </span>
            </div>
            <div className='stat w-fit bg-secondary'>
              <div className='stat-title text-white'>Food/Drink</div>
              <span className='stat-value'>
                <CountUp
                  isCounting
                  end={
                    numByCategory['/item_categories/food'] +
                    numByCategory['/item_categories/drink']
                  }
                  duration={0.5}
                />
                /
                {itemCategoryCounts['/item_categories/food'] +
                  itemCategoryCounts['/item_categories/drink']}
              </span>
            </div>
            <div className='stat w-fit bg-secondary'>
              <div className='stat-title text-white'>Currency</div>
              <span className='stat-value'>
                {numByCategory['/item_categories/currency']}/
                {itemCategoryCounts['/item_categories/currency'] - 1}
                {/* NOTE: We subtract one b/c cowbells should not be counted. */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
