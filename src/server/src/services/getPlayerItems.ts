import { PrismaClient, type Record } from '@prisma/client';

interface GetPlayerItemsParams {
  playerId: number;
}

export async function getPlayerItems({
  playerId,
}: GetPlayerItemsParams): Promise<Record[]> {
  const prisma = new PrismaClient();

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
