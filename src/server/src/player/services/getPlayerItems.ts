import { prisma } from 'src/db';
import type { GetPlayerItemsRes } from 'src/types';

interface GetPlayerItemsParams {
  playerId: number;
}

export async function getPlayerItems({
  playerId,
}: GetPlayerItemsParams): Promise<GetPlayerItemsRes> {
  const results = await prisma.$queryRaw`
    SELECT 
      val.rnk AS 'rank', val.itemHrid, val.num, val.itemEnhancementLevel, val.ts,
      val.playerDisplayName, val.playerId
    FROM (
      SELECT 
        p.displayName as playerDisplayName, p.id as playerId,
        r.num, r.itemHrid, r.itemEnhancementLevel, r.ts,
        RANK() OVER (PARTITION BY itemHrid ORDER BY num DESC) as rnk
      FROM Record r
      JOIN Player p
        ON p.id = r.playerId
    ) val
    WHERE val.playerId=${playerId}`;

  if (Array.isArray(results)) {
    const sorted = results.map((result) => {
      return {
        ...result,
        rank: parseInt(result.rank.toString(), 10),
        player: { id: result.playerId, displayName: result.playerDisplayName },
      };
    });
    return sorted;
  } else return [];
}
