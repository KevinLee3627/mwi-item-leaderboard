import { type Item } from '@prisma/client';
import { prisma } from 'src/db';

export async function getAllItemMetadata(): Promise<Item[]> {
  const results: Item[] = await prisma.item.findMany({
    select: {
      hrid: true,
      displayName: true,
      enhancementLevel: true,
      categoryHrid: true,
    },
    distinct: ['hrid'],
  });

  return results;
}
