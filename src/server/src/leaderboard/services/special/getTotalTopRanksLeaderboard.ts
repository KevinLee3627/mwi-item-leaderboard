import { prisma } from 'src/db';
import { type GetTotalTopRanksLeaderboardRes } from 'src/types';

interface RawResult {
  playerDisplayName: string;
  playerId: number;
  totalTopRanks: bigint;
  rank: bigint;
}

export async function getTotalTopRanksLeaderboard(): Promise<GetTotalTopRanksLeaderboardRes> {
  const results: RawResult[] = await prisma.$queryRaw`
    SELECT 
      playerId, playerDisplayName, COUNT(*) as totalTopRanks, RANK() OVER (ORDER BY COUNT(*) DESC) as 'rank'
    FROM (
      SELECT
        p.id as playerId, p.displayName as playerDisplayName,
      RANK() OVER (PARTITION BY a.abilityHrid ORDER BY a.abilityXp DESC) AS '_rank'
      FROM AbilityRecord a
      JOIN Player p
        ON p.id = a.playerId
      UNION ALL
      SELECT 
        p.id as playerId, p.displayName as playerDisplayName,
        RANK() OVER (PARTITION BY itemHrid ORDER BY num DESC) as '_rank'
      FROM Record r
      JOIN Player p
        ON p.id = r.playerId
    )
    WHERE _rank=1
    GROUP BY playerId
    ORDER BY totalTopRanks DESC
    `;
  const processedResults = results.map((result) => ({
    displayName: result.playerDisplayName,
    id: result.playerId,
    totalTopRanks: Number(result.totalTopRanks),
    rank: parseInt(result.rank.toString()),
  }));
  return { leaderboard: processedResults, title: 'Total Top Ranks' };
}
