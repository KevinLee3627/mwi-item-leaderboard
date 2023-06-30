import { type Item } from '@prisma/client';
import { prisma } from '../index';

export async function getItemMetadata(itemHrid: string): Promise<Item[]> {
  const results: Item[] = await prisma.item.findMany({
    where: {
      hrid: itemHrid,
    },
    select: {
      hrid: true,
      displayName: true,
      enhancementLevel: true,
    },
  });

  return results;
}
