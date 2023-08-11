import {
  type Ability,
  type AbilityRecord,
  type Player,
  type Record as ItemRecord,
  type Item,
} from '@prisma/client';
import type {
  GameInfo,
  ItemCategoryHrid,
  itemCategoryCounts,
  itemCategoryDetailMap,
} from './clientInfoClean';

export type GetPlayerRes = Player;
export type GetPlayerItemsRes = Array<
  Omit<ItemRecord, 'playerId'> & { player: Player; rank: number }
>;
export type GetPlayerAbilitiesRes = Array<
  Omit<AbilityRecord, 'playerId'> & { player: Player; rank: number }
>;
export interface GetPlayerStatsRes {
  topRanks: number;
  distinctItems: Array<
    Omit<ItemRecord, 'playerId'> & { categoryHrid: ItemCategoryHrid }
  >;
  itemCategoryCounts: typeof itemCategoryCounts;
  estimatedNetWorth: number;
}

export interface GetPlayerCollectionRes {
  distinctItems: Array<
    Omit<ItemRecord, 'playerId'> & { categoryHrid: ItemCategoryHrid }
  >;
  itemCategoryCounts: typeof itemCategoryCounts;
  itemCategoryDetailMap: typeof itemCategoryDetailMap;
}

export type GetGameItemDetailMapRes = GameInfo['itemDetailMap'];

export type GetAllItemMetadataRes = Item[];
export type GetItemMetadataRes = Item[];

export type GetAllAbilityMetadataRes = Ability[];

export type GetItemLeaderboardRes = Array<
  Omit<ItemRecord, 'playerId'> & { player: Player; rank: number }
>;
export type GetAbilityLeaderboardRes = Array<
  Omit<AbilityRecord, 'playerId'> & { player: Player; rank: number }
>;

export type SearchPlayerRes = Player[];

export interface GetOverallAbilityLevelLeaderboardRes {
  leaderboard: Array<
    Pick<Player, 'displayName' | 'id'> & { totalLevel: number; rank: number }
  >;
  title: string;
}

export interface GetOverallAbilityXpLeaderboardRes {
  leaderboard: Array<
    Pick<Player, 'displayName' | 'id'> & { totalXp: number; rank: number }
  >;
  title: string;
}

export interface GetTotalItemsLeaderboardRes {
  leaderboard: Array<
    Pick<Player, 'displayName' | 'id'> & { totalItems: number; rank: number }
  >;
  title: string;
}

export interface GetTotalUniqueItemsLeaderboardRes {
  leaderboard: Array<
    Pick<Player, 'displayName' | 'id'> & { totalItems: number; rank: number }
  >;
  title: string;
}

export interface GetTotalTopRanksLeaderboardRes {
  leaderboard: Array<
    Pick<Player, 'displayName' | 'id'> & { totalTopRanks: number; rank: number }
  >;
  title: string;
}

export interface GetTotalGemsLeaderboardRes {
  leaderboard: Array<
    Pick<Player, 'displayName' | 'id'> & { total: number; rank: number }
  >;
  title: string;
}

export interface GetSingleAbilityLevelLeaderboardRes {
  leaderboard: Array<
    Pick<Player, 'displayName' | 'id'> &
      Pick<AbilityRecord, 'abilityHrid' | 'abilityLevel' | 'abilityXp'> & {
        rank: number;
      }
  >;
  title: string;
}

export type ScraperStatus = 'running' | 'down';
