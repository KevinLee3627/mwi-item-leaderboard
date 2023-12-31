import { prisma } from 'src/db';
import { type GetTotalItemsLeaderboardRes } from 'src/types';

interface RawResult {
  displayName: string;
  id: number;
  totalItems: bigint;
  rank: bigint;
}

export async function getTotalItemsLeaderboard(): Promise<GetTotalItemsLeaderboardRes> {
  const results: RawResult[] = await prisma.$queryRaw`
    SELECT 
      p.displayName, p.id, 
      SUM(i.num) AS totalItems,
      RANK() OVER (ORDER BY SUM(i.num) DESC) AS 'rank'
    FROM Player p 
    JOIN Record i 
      ON p.id = i.playerId
    WHERE i.itemHrid <> '/items/coin' 
    GROUP BY p.displayName
    ORDER BY totalItems DESC
    LIMIT 100`;
  const processedResults = results.map((result) => ({
    displayName: result.displayName,
    id: result.id,
    totalItems: Number(result.totalItems),
    rank: parseInt(result.rank.toString()),
  }));
  return { leaderboard: processedResults, title: 'Total Item Count' };
}
