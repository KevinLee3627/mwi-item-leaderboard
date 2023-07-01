import { type AbilityRecord } from '@prisma/client';
import { prisma } from 'src/db';

interface GetAbilityLeaderboardParams {
  abilityHrid: string;
  limit: number;
}

export async function getAbilityLeaderboard({
  abilityHrid,
  limit,
}: GetAbilityLeaderboardParams): Promise<AbilityRecord[]> {
  const results = await prisma.abilityRecord.findMany({
    include: {
      player: true,
    },
    where: {
      abilityHrid,
    },
    orderBy: {
      abilityXp: 'desc',
    },
    take: limit,
  });
  return results;
}
