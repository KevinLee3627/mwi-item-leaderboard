import { prisma } from 'src/db';
import { type GetTotalUniqueItemsLeaderboardRes } from 'src/types';

interface RawResult {
  displayName: string;
  id: number;
  totalItems: bigint;
  rank: bigint;
}

export async function getTotalUniqueItemsLeaderboard(): Promise<GetTotalUniqueItemsLeaderboardRes> {
  const results: RawResult[] = await prisma.$queryRaw`
    SELECT p.displayName, p.id, 
      COUNT(*) AS totalItems, 
      RANK() OVER (ORDER BY COUNT(*) DESC) AS 'rank'
    FROM Player p 
    JOIN Record i 
      ON p.id=i.playerId 
    GROUP BY i.playerId
    ORDER BY totalItems DESC
    LIMIT 100`;
  const processedResults = results.map((result) => ({
    displayName: result.displayName,
    id: result.id,
    totalItems: Number(result.totalItems),
    rank: parseInt(result.rank.toString()),
  }));
  return { leaderboard: processedResults, title: 'Total Unique Item Count' };
}
