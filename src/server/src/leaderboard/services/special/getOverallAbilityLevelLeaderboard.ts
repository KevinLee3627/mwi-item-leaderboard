import { prisma } from 'src/db';
import { type GetOverallAbilityLevelLeaderboardRes } from 'src/types';

interface RawResult {
  displayName: string;
  id: number;
  totalLevel: bigint;
}

export async function getOverallAbilityLevelLeaderboard(): Promise<GetOverallAbilityLevelLeaderboardRes> {
  const results: RawResult[] =
    await prisma.$queryRaw`SELECT p.displayName, p.id, SUM(a.abilityLevel) AS totalLevel
    FROM Player p 
    JOIN AbilityRecord a 
      ON p.id = a.playerId 
    GROUP BY p.displayName
    LIMIT 100`;
  const processedResults = results.map((result) => ({
    displayName: result.displayName,
    id: result.id,
    totalLevel: Number(result.totalLevel),
  }));
  return { leaderboard: processedResults, title: 'Overall Ability Level' };
}
