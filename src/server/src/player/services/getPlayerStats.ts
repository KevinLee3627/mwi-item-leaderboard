import {
  type ItemHrid,
  itemCategoryCounts,
  itemDetailMap,
} from 'src/clientInfoClean';
import { prisma } from 'src/db';
import { marketInfo } from 'src/marketInfo';
import type { GetPlayerStatsRes } from 'src/types';
import { hridToDisplayName } from 'src/util/hrid';

interface GetPlayerStatsParams {
  playerId: number;
}

export async function getPlayerStats({
  playerId,
}: GetPlayerStatsParams): Promise<GetPlayerStatsRes> {
  const topRanksRes = await prisma.$queryRaw`
    SELECT 
      playerId, playerDisplayName, COUNT(*) as topRanks
    FROM (
      SELECT
        p.id as playerId, p.displayName as playerDisplayName,
      RANK() OVER (PARTITION BY a.abilityHrid ORDER BY a.abilityXp DESC) AS rnk
      FROM AbilityRecord a
      JOIN Player p
        ON p.id = a.playerId
      UNION ALL
      SELECT 
        p.id as playerId, p.displayName as playerDisplayName,
        RANK() OVER (PARTITION BY itemHrid ORDER BY num DESC) as rnk
      FROM Record r
      JOIN Player p
        ON p.id = r.playerId
    )
    WHERE rnk=1 AND playerId=${playerId}
  `;
  let topRanks: number;

  if (Array.isArray(topRanksRes)) {
    topRanks = parseInt(topRanksRes[0].topRanks, 10);
  } else {
    throw new Error(`Could not get top ranks for player ${playerId}`);
  }

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

  // TODO: Computationally heavy route?
  const allItems = await prisma.record.findMany({ where: { playerId } });

  // Calculate net worth
  let estimatedNetWorth = allItems.reduce((acc, item) => {
    const displayName = hridToDisplayName(item.itemHrid);
    const { bid } = marketInfo.market[displayName];

    // People put dumb sell orders up (selling cheese for 1 billion), so ignore asks
    // People put dumb BOs up (buying jewelry for 10k), but it's better to underestimate
    // than overestimate net worth in my opinion
    // We also don't have enhancement level market data, so...
    let estimatedValue: number;
    if (bid === -1)
      estimatedValue = itemDetailMap[item.itemHrid as ItemHrid].sellPrice;
    else estimatedValue = item.num * bid;

    return acc + estimatedValue;
  }, 0);

  const coinCount = distinctItems.find((val) => val.itemHrid === '/items/coin');
  if (coinCount != null) {
    estimatedNetWorth += coinCount.num;
  }
  return {
    topRanks,
    distinctItems,
    itemCategoryCounts,
    estimatedNetWorth,
  };
}
