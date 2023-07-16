import { prisma } from 'src/db';
import { type GetTotalGemsLeaderboardRes } from 'src/types';

interface RawResult {
  displayName: string;
  id: number;
  total: bigint;
  rank: bigint;
}

export async function getTotalGemsLeaderboard(): Promise<GetTotalGemsLeaderboardRes> {
  const results: RawResult[] = await prisma.$queryRaw`
    SELECT 
      p.displayName, p.id, 
      SUM(i.num) AS total,
      RANK() OVER (ORDER BY SUM(i.num) DESC) AS 'rank'
    FROM Player p 
    JOIN Record i 
      ON p.id = i.playerId
    WHERE i.itemHrid IN ( 
      '/items/pearl',
      '/items/amber',
      '/items/garnet',
      '/items/jade',
      '/items/amethyst',
      '/items/moonstone'
    ) 
    GROUP BY p.displayName
    ORDER BY total DESC
    LIMIT 100`;
  const processedResults = results.map((result) => ({
    displayName: result.displayName,
    id: result.id,
    total: Number(result.total),
    rank: parseInt(result.rank.toString()),
  }));
  return { leaderboard: processedResults, title: 'Total Gems' };
}
