import info from './clientInfo.json';

// Get # of Equipment Collected
function countCategory(categoryHrid: ItemCategoryHrid): number {
  return Object.entries(info.itemDetailMap).filter((entry) => {
    const item = entry[1];
    return item.categoryHrid === categoryHrid;
  }).length;
}

export type GameInfo = typeof info;

export type ItemCategoryHrid = keyof GameInfo['itemCategoryDetailMap'];

export const itemCategoryHrids = Object.keys(
  info.itemCategoryDetailMap
) as ItemCategoryHrid[];

export const itemCategoryCounts = Object.fromEntries(
  itemCategoryHrids.map((categoryHrid) => {
    return [categoryHrid, countCategory(categoryHrid)];
  })
) as { [k in ItemCategoryHrid]: number };

export const itemCategoryDetailMap = info.itemCategoryDetailMap;

export type ItemCategoryDetailMap = Record<
  ItemCategoryHrid,
  ItemCategoryDetail
>;

export interface ItemCategoryDetail {
  hrid: ItemCategoryHrid;
  name: string;
  pluralName: string;
  sortIndex: number;
}

export type ItemHrid = keyof GameInfo['itemDetailMap'];
