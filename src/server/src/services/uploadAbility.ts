import type { AbilityPayload } from 'extension';
import { prisma } from '../index';

export async function uploadAbility(data: AbilityPayload): Promise<void> {
  await prisma.player.upsert({
    where: {
      id: data.player.id,
    },
    update: {
      id: data.player.id,
      displayName: data.player.name,
    },
    create: {
      id: data.player.id,
      displayName: data.player.name,
    },
  });

  for (let i = 0; i < data.abilities.length; i++) {
    const ability = data.abilities[i];

    await prisma.ability.upsert({
      where: {
        hrid: ability.abilityHrid,
      },
      update: {},
      create: {
        hrid: ability.abilityHrid,
        displayName: ability.abilityHrid
          .replace('/items/', '')
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      },
    });

    await prisma.abilityRecord.upsert({
      where: {
        abilityHrid_playerId: {
          abilityHrid: ability.abilityHrid,
          playerId: data.player.id,
        },
      },
      update: {
        abilityLevel: ability.abilityLevel,
        abilityXp: ability.abilityXp,
      },
      create: {
        abilityHrid: ability.abilityHrid,
        abilityLevel: ability.abilityLevel,
        abilityXp: ability.abilityXp,
        playerId: data.player.id,
        ts: data.ts,
      },
    });
  }
}
