import { type AbilityRecord } from '@prisma/client';
import { prisma } from 'src/db';

interface GetPlayerItemsParams {
  playerId: number;
}

export async function getPlayerAbilities({
  playerId,
}: GetPlayerItemsParams): Promise<AbilityRecord[]> {
  const _results = await prisma.$queryRaw`
  SELECT * 
  FROM (
    SELECT
      a.ts, a.abilityHrid, a.abilityXp, a.abilityLevel,
      p.id as playerId, p.displayName as playerDisplayName,
      RANK() OVER (PARTITION BY a.abilityHrid ORDER BY a.abilityXp DESC) AS 'rank'
    FROM AbilityRecord a
    JOIN Player p
      ON p.id = a.playerId
    ) val
  WHERE playerId=${playerId}`;

  if (Array.isArray(_results)) {
    const results = _results.map((result) => {
      return {
        ...result,
        rank: parseInt(result.rank.toString(), 10),
        player: { id: result.playerId, displayName: result.playerDisplayName },
      };
    });
    return results;
  } else return [];
}
