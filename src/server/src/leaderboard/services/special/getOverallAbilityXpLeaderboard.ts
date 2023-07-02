import { prisma } from 'src/db';
import { type GetOverallAbilityXpLeaderboardRes } from 'src/types';

interface RawResult {
  displayName: string;
  id: number;
  totalXp: bigint;
}

export async function getOverallAbilityXpLeaderboard(): Promise<GetOverallAbilityXpLeaderboardRes> {
  const results: RawResult[] =
    await prisma.$queryRaw`SELECT p.displayName, p.id, SUM(a.abilityXp) AS totalXp
    FROM Player p 
    JOIN AbilityRecord a 
      ON p.id = a.playerId 
    GROUP BY p.displayName
    LIMIT 100`;
  const processedResults = results.map((result) => ({
    displayName: result.displayName,
    id: result.id,
    totalXp: Number(result.totalXp),
  }));
  return { leaderboard: processedResults, title: 'Overall Ability XP' };
}
