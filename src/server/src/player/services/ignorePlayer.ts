import { prisma } from 'src/db';

interface IgnorePlayerParams {
  playerId: number;
}

export async function ignorePlayer({
  playerId,
}: IgnorePlayerParams): Promise<void> {
  const player = await prisma.player.findUnique({
    where: { id: playerId },
  });
  if (player == null)
    throw new Error(`Player w/ id ${playerId} does not exist`);

  await prisma.player.update({
    data: {
      ignored: true,
    },
    where: {
      id: playerId,
    },
  });

  console.log(`ignored ${playerId}`);
}
