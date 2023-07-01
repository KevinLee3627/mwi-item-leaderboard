import { prisma } from 'src/db';
import type { GetPlayerRes } from 'src/types';

interface GetPlayerParams {
  playerId: number;
}

export async function getPlayer({
  playerId,
}: GetPlayerParams): Promise<GetPlayerRes> {
  const result = await prisma.player.findUnique({
    where: {
      id: playerId,
    },
  });

  if (result == null) throw new Error(`Player ${playerId} not found.`);

  return result;
}
