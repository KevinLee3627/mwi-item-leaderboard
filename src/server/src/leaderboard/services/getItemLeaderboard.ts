import { Prisma } from '@prisma/client';
import { prisma } from 'src/db';

interface GetItemLeaderboardParams {
  itemHrid: string;
  limit: number;
  enhancementLevel: number;
}

export async function getItemLeaderboard({
  itemHrid,
  limit,
  enhancementLevel,
}: GetItemLeaderboardParams): Promise<unknown> {
  const _results = await prisma.$queryRaw`WITH rankCTE AS 
      (
        SELECT 
          Record.*, 
          RANK() OVER 
            (PARTITION BY itemEnhancementLevel ORDER BY num DESC) as rnk 
        FROM Record 
        WHERE itemHrid=${itemHrid}
      )
      SELECT 
        rankCTE.ts, rankCTE.num, rankCTE.itemHrid, 
        rankCTE.itemEnhancementLevel, rankCTE.rnk as 'rank', 
        p.id AS playerId, p.displayName as playerName 
      FROM rankCTE 
      JOIN Player p
        ON p.id = rankCTE.playerId
      WHERE rankCTE.rnk <= 100 ${
        enhancementLevel !== -1
          ? Prisma.sql`AND rankCTE.itemEnhancementLevel=${enhancementLevel}`
          : Prisma.empty
      } `;

  if (Array.isArray(_results)) {
    const results = _results.map((result) => {
      return {
        ...result,
        rank: parseInt(result.rank.toString(), 10),
        player: { id: result.playerId, displayName: result.playerName },
      };
    });
    return results;
  } else return [];
}
