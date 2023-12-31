import { prisma } from 'src/db';
import type { GetPlayerItemsRes } from 'src/types';

interface GetPlayerItemsParams {
  playerId: number;
}

export async function getPlayerItems({
  playerId,
}: GetPlayerItemsParams): Promise<GetPlayerItemsRes> {
  const results = await prisma.$queryRaw`
    SELECT *
    FROM (
      SELECT 
        p.displayName as playerDisplayName, p.id as playerId,
        r.num, r.itemHrid, r.itemEnhancementLevel, r.ts,
        RANK() OVER (PARTITION BY itemHrid, itemEnhancementLevel ORDER BY num DESC) as 'rank'
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
