import { type AbilityRecord } from '@prisma/client';
import { prisma } from 'src/db';

interface GetPlayerItemsParams {
  playerId: number;
}

export async function getPlayerAbilities({
  playerId,
}: GetPlayerItemsParams): Promise<AbilityRecord[]> {
  const results: AbilityRecord[] = await prisma.abilityRecord.findMany({
    include: {
      player: true,
    },
    where: {
      playerId,
    },
    orderBy: {
      abilityHrid: 'asc',
    },
  });

  return results;
}
