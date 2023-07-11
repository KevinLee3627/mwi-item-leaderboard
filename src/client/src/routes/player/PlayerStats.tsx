import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { useLoaderData } from 'react-router';
import { GetPlayerStatsRes } from 'server';
import {
  ItemCategoryHrid,
  itemCategoryHrids,
} from 'server/src/clientInfoClean';

function getNumByCategory(data: GetPlayerStatsRes['distinctItems']) {
  const mapping = {} as Record<ItemCategoryHrid, number>;
  for (let i = 0; i < itemCategoryHrids.length; i++) {
    const hrid = itemCategoryHrids[i];
    mapping[hrid] = 0;
  }
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    console.log(item);
    if (mapping[item.categoryHrid] == null) mapping[item.categoryHrid] = 0;
    mapping[item.categoryHrid]++;
  }
  return mapping;
}

export function PlayerStats() {
  const { topRanks, distinctItems, itemCategoryCounts } =
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
        <h1 className='text-2xl font-bold'>Collection</h1>
        <div className='w-full'>
          <div className='flex flex-col w-full bg-primary text-primary-content'>
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
                {distinctItems.length}/{numTotalGameItems}
              </span>
            </div>
            <div className='stat w-full bg-secondary'>
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
                {numByCategory['/item_categories/equipment']}/
                {itemCategoryCounts['/item_categories/equipment']}
              </span>
            </div>
            <div className='stat w-full bg-secondary'>
              <div className='stat-title text-white'>Resources</div>
              <span className='stat-value'>
                {numByCategory['/item_categories/resource']}/
                {itemCategoryCounts['/item_categories/resource']}
              </span>
            </div>
            <div className='stat w-full bg-secondary'>
              <div className='stat-title text-white'>Loot</div>
              <span className='stat-value'>
                {numByCategory['/item_categories/loot']}/
                {itemCategoryCounts['/item_categories/loot']}
              </span>
            </div>
            <div className='stat w-full bg-secondary'>
              <div className='stat-title text-white'>Ability Books</div>
              <span className='stat-value'>
                {numByCategory['/item_categories/ability_book']}/
                {itemCategoryCounts['/item_categories/ability_book']}
              </span>
            </div>
            <div className='stat w-full bg-secondary'>
              <div className='stat-title text-white'>Food/Drink</div>
              <span className='stat-value'>
                {numByCategory['/item_categories/food'] +
                  numByCategory['/item_categories/drink']}
                /
                {itemCategoryCounts['/item_categories/food'] +
                  itemCategoryCounts['/item_categories/drink']}
              </span>
            </div>
            <div className='stat w-full bg-secondary'>
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
