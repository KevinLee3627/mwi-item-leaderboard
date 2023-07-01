import { type Record } from '@prisma/client';
import { prisma } from 'src/db';

interface GetPlayerItemsParams {
  playerId: number;
}

export async function getPlayerItems({
  playerId,
}: GetPlayerItemsParams): Promise<Record[]> {
  const results: Record[] = await prisma.record.findMany({
    include: {
      player: true,
    },
    where: {
      playerId,
    },
    orderBy: {
      itemHrid: 'asc',
    },
  });

  return results;
}
