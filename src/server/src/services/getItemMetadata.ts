import { type Item, PrismaClient } from '@prisma/client';

export async function getItemMetadata(): Promise<Item[]> {
  const prisma = new PrismaClient();

  const results: Item[] = await prisma.item.findMany({
    select: {
      hrid: true,
      displayName: true,
      enhancementLevel: true,
    },
  });

  return results;
}
