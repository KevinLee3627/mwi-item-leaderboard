import { itemCategoryCounts, itemCategoryDetailMap } from 'src/clientInfoClean';
import { prisma } from 'src/db';
import type { GetPlayerCollectionRes, GetPlayerStatsRes } from 'src/types';

interface GetPlayerCollectionParams {
  playerId: number;
}

export async function getPlayerCollection({
  playerId,
}: GetPlayerCollectionParams): Promise<GetPlayerCollectionRes> {
  const distinctItemsRes = await prisma.$queryRaw`
    SELECT 
      r.ts, r.num, r.itemHrid, r.itemEnhancementLevel, i.categoryHrid
    FROM Record r
    JOIN Player p
      ON p.id = r.playerId
    JOIN Item i
      ON r.itemHrid = i.hrid
    WHERE p.id=${playerId} 
    GROUP BY itemHrid;
  `;

  let distinctItems: GetPlayerStatsRes['distinctItems'];
  if (Array.isArray(distinctItemsRes)) {
    distinctItems = distinctItemsRes;
  } else {
    throw new Error(`Could not get top ranks for player ${playerId}`);
  }

  return {
    distinctItems,
    itemCategoryCounts,
    itemCategoryDetailMap,
  };
}
