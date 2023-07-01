import { prisma } from '../index';

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
  if (enhancementLevel >= 0) {
    const results = await prisma.record.findMany({
      include: {
        player: true,
      },
      where: {
        itemHrid,
        itemEnhancementLevel: enhancementLevel,
      },
      orderBy: {
        num: 'desc',
      },
      take: limit,
    });
    return results;
  } else if (enhancementLevel === -1) {
    // enhancement level = "all"
    const _results = await prisma.$queryRaw`WITH rankCTE AS 
      (SELECT *, ROW_NUMBER() OVER (PARTITION BY itemEnhancementLevel ORDER BY num DESC) as rnk FROM Record WHERE itemHrid=${itemHrid})
      SELECT *, p.id AS playerId, p.displayName as playerName FROM rankCTE
      JOIN Player p
        ON p.id = rankCTE.playerId
      WHERE rnk <= 100`;

    if (Array.isArray(_results)) {
      const results = _results.map((result) => {
        return {
          ...result,
          rnk: result.rnk.toString(),
          player: { id: result.playerId, displayName: result.playerName },
        };
      });
      return results;
    } else return [];
  }
}
