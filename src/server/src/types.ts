import {
  type Ability,
  type AbilityRecord,
  type Player,
  type Record as ItemRecord,
  type Item,
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

export type GetPlayerRes = Player;
export type GetPlayerItemsRes = Array<ItemRecord & { player: Player }>;
export type GetPlayerAbilitiesRes = Array<AbilityRecord & { player: Player }>;

export type GetAllItemMetadataRes = Item[];
export type GetItemMetadataRes = Item[];

export type GetAllAbilityMetadataRes = Ability[];
