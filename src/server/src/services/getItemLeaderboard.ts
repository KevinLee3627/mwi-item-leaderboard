import { PrismaClient, type Record } from '@prisma/client';

interface GetItemLeaderboardParams {
  itemHrid: string;
  limit: number;
}

export async function getItemLeaderboard({
  itemHrid,
  limit,
}: GetItemLeaderboardParams): Promise<Record[]> {
  const prisma = new PrismaClient();

  const results: Record[] = await prisma.record.findMany({
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
