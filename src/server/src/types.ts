import {
  type Ability,
  type AbilityRecord,
  type Player,
  type Record as ItemRecord,
  type Item,
} from '@prisma/client';

export type GetPlayerRes = Player;
export type GetPlayerItemsRes = Array<ItemRecord & { player: Player }>;
export type GetPlayerAbilitiesRes = Array<AbilityRecord & { player: Player }>;

export type GetAllItemMetadataRes = Item[];
export type GetItemMetadataRes = Item[];

export type GetAllAbilityMetadataRes = Ability[];

export type GetItemLeaderboardRes = Array<ItemRecord & { player: Player }>;
export type GetAbilityLeaderboardRes = Array<
  AbilityRecord & { player: Player }
>;

export type SearchPlayerRes = Player[];

export interface GetOverallAbilityLevelLeaderboardRes {
  leaderboard: Array<
    Pick<Player, 'displayName' | 'id'> & { totalLevel: number }
  >;
  title: string;
}

export interface GetOverallAbilityXpLeaderboardRes {
  leaderboard: Array<Pick<Player, 'displayName' | 'id'> & { totalXp: number }>;
  title: string;
}

export interface GetTotalItemsLeaderboardRes {
  leaderboard: Array<
    Pick<Player, 'displayName' | 'id'> & { totalItems: number }
  >;
  title: string;
}
