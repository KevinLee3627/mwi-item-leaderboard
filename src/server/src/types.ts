import {
  type Ability,
  type AbilityRecord,
  type Player,
  type PlayerPayload,
  type Record,
  type RecordPayload,
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

export type GetPlayerRes = PlayerPayload['scalars'];
export type GetPlayerItemsRes = Array<
  RecordPayload['scalars'] & RecordPayload['objects']['player']
>;
