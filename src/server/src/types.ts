import {
  type Ability,
  type AbilityRecord,
  type Player,
  type Record,
} from '@prisma/client';

export interface GetItemLeaderboardReturn extends Omit<Record, 'ts'> {
  player: Player;
  ts: string;
}

export interface SearchPlayerResult extends Player {}

export interface GetAbilityLeaderboardReturn extends Omit<AbilityRecord, 'ts'> {
  player: Player;
  ts: string;
}

export interface GetAllAbilitiesReturn extends Ability {}
