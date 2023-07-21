import { prisma } from 'src/db';
import { type GetSingleAbilityLevelLeaderboardRes } from 'src/types';

interface RawResult {
  displayName: string;
  id: number;
  abilityLevel: bigint;
  abilityXp: bigint;
  abilityHrid: string;
  rank: bigint;
}

export async function getSingleAbilityLevelLeaderboard(): Promise<GetSingleAbilityLevelLeaderboardRes> {
  const results: RawResult[] = await prisma.$queryRaw`
    SELECT 
      p.displayName, p.id, 
      a.abilityHrid, a.abilityXp, a.abilityLevel,
      RANK() OVER (ORDER BY a.abilityXp DESC) as 'rank'
    FROM Player p 
    JOIN AbilityRecord a 
      ON p.id = a.playerId 
    ORDER BY a.abilityXp DESC
    LIMIT 100`;
  const processedResults = results.map((result) => ({
    displayName: result.displayName,
    id: result.id,
    abilityLevel: Number(result.abilityLevel),
    abilityXp: Number(result.abilityXp),
    abilityHrid: result.abilityHrid,
    rank: parseInt(result.rank.toString()),
  }));
  return { leaderboard: processedResults, title: 'Single Ability Level' };
}
