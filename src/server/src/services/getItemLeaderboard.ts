import { PrismaClient, type Record } from '@prisma/client';

export async function getItemLeaderboard(itemHrid: string): Promise<Record[]> {
  const prisma = new PrismaClient();

  const results: Record[] = await prisma.record.findMany({
    where: {
      itemHrid,
    },
    orderBy: {
      num: 'desc',
    },
  });

  console.log(results);

  return results;
}
