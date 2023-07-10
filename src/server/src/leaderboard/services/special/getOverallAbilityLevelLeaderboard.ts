import { prisma } from 'src/db';
import { type GetOverallAbilityLevelLeaderboardRes } from 'src/types';

interface RawResult {
  displayName: string;
  id: number;
  totalLevel: bigint;
  rank: bigint;
}

export async function getOverallAbilityLevelLeaderboard(): Promise<GetOverallAbilityLevelLeaderboardRes> {
  const results: RawResult[] = await prisma.$queryRaw`
    SELECT 
      p.displayName, p.id, 
      SUM(a.abilityLevel) AS totalLevel,
      RANK() OVER (ORDER BY SUM(a.abilityLevel) DESC) as 'rank'
    FROM Player p 
    JOIN AbilityRecord a 
      ON p.id = a.playerId 
    GROUP BY p.displayName
    ORDER BY totalLevel DESC
    LIMIT 100`;
  const processedResults = results.map((result) => ({
    displayName: result.displayName,
    id: result.id,
    totalLevel: Number(result.totalLevel),
    rank: parseInt(result.rank.toString()),
  }));
  return { leaderboard: processedResults, title: 'Overall Ability Level' };
}
