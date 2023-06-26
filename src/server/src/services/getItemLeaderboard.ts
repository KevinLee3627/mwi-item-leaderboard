import { prisma } from '../index';

interface GetItemLeaderboardParams {
  itemHrid: string;
  limit: number;
  enhancementLevel: number;
}

export async function getItemLeaderboard({
  itemHrid,
  limit,
  enhancementLevel,
}: GetItemLeaderboardParams): Promise<unknown> {
  console.log(enhancementLevel);
  const results = await prisma.record.findMany({
    include: {
      player: true,
    },
    where: {
      itemHrid,
      itemEnhancementLevel: enhancementLevel,
    },
    orderBy: {
      num: 'desc',
    },
    take: limit,
  });

  return results;
}
