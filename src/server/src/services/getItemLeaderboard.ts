import { type Player, PrismaClient, type Record } from '@prisma/client';

interface GetItemLeaderboardParams {
  itemHrid: string;
  limit: number;
}

export interface GetItemLeaderboardReturn extends Record, Player {}

export async function getItemLeaderboard({
  itemHrid,
  limit,
}: GetItemLeaderboardParams): Promise<unknown> {
  const prisma = new PrismaClient();

  const results = await prisma.record.findMany({
    include: {
      player: true,
    },
    where: {
      itemHrid,
    },
    orderBy: {
      num: 'desc',
    },
    take: limit,
  });

  console.log(results);

  return results;
}
