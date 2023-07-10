import { prisma } from 'src/db';
import { type GetOverallAbilityXpLeaderboardRes } from 'src/types';

interface RawResult {
  displayName: string;
  id: number;
  totalXp: bigint;
  rank: bigint;
}

export async function getOverallAbilityXpLeaderboard(): Promise<GetOverallAbilityXpLeaderboardRes> {
  const results: RawResult[] = await prisma.$queryRaw`
    SELECT 
      p.displayName, p.id, 
      SUM(a.abilityXp) AS totalXp,
      RANK() OVER (ORDER BY SUM(a.abilityXp) DESC) as 'rank'
    FROM Player p 
    JOIN AbilityRecord a 
      ON p.id = a.playerId 
    GROUP BY p.displayName
    ORDER BY totalXp DESC
    LIMIT 100`;
  const processedResults = results.map((result) => ({
    displayName: result.displayName,
    id: result.id,
    totalXp: Number(result.totalXp),
    rank: parseInt(result.rank.toString()),
  }));
  return { leaderboard: processedResults, title: 'Overall Ability XP' };
}
