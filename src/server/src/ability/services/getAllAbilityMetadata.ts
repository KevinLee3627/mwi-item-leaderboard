import { type Ability } from '@prisma/client';
import { prisma } from 'src/db';

export async function getAllAbilityMetadata(): Promise<Ability[]> {
  const results: Ability[] = await prisma.ability.findMany({
    distinct: ['hrid'],
  });

  return results;
}
