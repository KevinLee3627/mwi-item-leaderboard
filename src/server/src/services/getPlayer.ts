import { type Player } from '@prisma/client';
import { prisma } from '../index';

interface GetPlayerParams {
  playerId: number;
}

export async function getPlayer({
  playerId,
}: GetPlayerParams): Promise<Player> {
  const result = await prisma.player.findUnique({
    where: {
      id: playerId,
    },
  });

  if (result == null) throw new Error(`Player ${playerId} not found.`);

  return result;
}
