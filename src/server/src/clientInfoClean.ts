import info from './clientInfo.json';

// Get # of Equipment Collected
function countCategory(categoryHrid: string): number {
  return Object.entries(info.itemDetailMap).filter((entry) => {
    const item = entry[1];
    return item.categoryHrid === categoryHrid;
  }).length;
}

type GameInfo = typeof info;

type ItemCategoryHrid = keyof GameInfo['itemCategoryDetailMap'];

const itemCategoryHrids = Object.keys(
  info.itemCategoryDetailMap
) as ItemCategoryHrid[];

export const itemCategoryCounts = Object.fromEntries(
  itemCategoryHrids.map((categoryHrid) => {
    return [categoryHrid, countCategory(categoryHrid)];
  })
) as { [k in ItemCategoryHrid]: number };
