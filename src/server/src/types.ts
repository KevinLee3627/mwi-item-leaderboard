import {
  type AbilityRecordPayload,
  type Ability,
  type AbilityRecord,
  type Player,
  type PlayerPayload,
  type Record as ItemRecord,
  type RecordPayload as ItemRecordPayload,
  type ItemPayload,
} from '@prisma/client';

export interface GetItemLeaderboardReturn extends Omit<ItemRecord, 'ts'> {
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
  ItemRecordPayload['scalars'] & ItemRecordPayload['objects']['player']
>;
export type GetPlayerAbilitiesRes = Array<
  AbilityRecordPayload['scalars'] & AbilityRecordPayload['objects']['player']
>;

export type GetAllItemMetadataRes = Array<ItemPayload['scalars']>;
export type GetItemMetadataRes = Array<ItemPayload['scalars']>;
