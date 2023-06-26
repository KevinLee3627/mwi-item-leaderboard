import { prisma } from '../index';

interface GetItemLeaderboardParams {
  itemHrid: string;
  limit: number;
}

export async function getItemLeaderboard({
  itemHrid,
  limit,
}: GetItemLeaderboardParams): Promise<unknown> {
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

  return results;
}
