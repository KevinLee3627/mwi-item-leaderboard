import { type Ability } from '@prisma/client';
import { prisma } from '../index';

export async function getAllAbilityMetadata(): Promise<Ability[]> {
  const results: Ability[] = await prisma.ability.findMany({
    distinct: ['hrid'],
  });

  return results;
}
