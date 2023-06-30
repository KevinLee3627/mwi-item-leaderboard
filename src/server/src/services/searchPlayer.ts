import { type Player } from '@prisma/client';
import { prisma } from '../index';

interface SearchPlayerParams {
  query: string;
}

export async function searchPlayer({
  query,
}: SearchPlayerParams): Promise<Player[]> {
  const results: Player[] = await prisma.player.findMany({
    where: {
      displayName: {
        contains: query,
      },
    },
  });

  return results;
}
