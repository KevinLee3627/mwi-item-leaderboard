import { itemCategoryCounts } from 'src/clientInfoClean';
import { prisma } from 'src/db';
import type { GetPlayerStatsRes } from 'src/types';

interface GetPlayerParams {
  playerId: number;
}

export async function getPlayerStats({
  playerId,
}: GetPlayerParams): Promise<GetPlayerStatsRes> {
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
      ts, num, itemHrid, itemEnhancementLevel
    FROM Record r
    JOIN Player p
      ON 	p.id = r.playerId
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
    topRanks,
    distinctItems,
    itemCategoryCounts,
  };
}
