import { getOverallAbilityLevelLeaderboard } from './special/getOverallAbilityLevelLeaderboard';
import { getOverallAbilityXpLeaderboard } from './special/getOverallAbilityXpLeaderboard';
import { getSingleAbilityLevelLeaderboard } from './special/getSingleAbilityLevelLeaderboard';
import { getTotalGemsLeaderboard } from './special/getTotalGemsLeaderboard';
import { getTotalItemsLeaderboard } from './special/getTotalItemsLeaderboard';
import { getTotalTopRanksLeaderboard } from './special/getTotalTopRanksLeaderboard';
import { getTotalUniqueItemsLeaderboard } from './special/getTotalUniqueItemsLeaderboard';

interface GetSpecialLeaderboardParams {
  id: number;
}

interface LeaderboardDefinition {
  id: number;
  leaderboardFunction: () => Promise<unknown>;
}

const leaderboards: LeaderboardDefinition[] = [
  { id: 1, leaderboardFunction: getOverallAbilityLevelLeaderboard },
  { id: 2, leaderboardFunction: getOverallAbilityXpLeaderboard },
  { id: 3, leaderboardFunction: getTotalItemsLeaderboard },
  { id: 4, leaderboardFunction: getTotalUniqueItemsLeaderboard },
  { id: 5, leaderboardFunction: getTotalTopRanksLeaderboard },
  { id: 6, leaderboardFunction: getTotalGemsLeaderboard },
  { id: 7, leaderboardFunction: getSingleAbilityLevelLeaderboard },
];

export async function getSpecialLeaderboard({
  id,
}: GetSpecialLeaderboardParams): Promise<unknown> {
  const leaderboard = leaderboards.find((lb) => lb.id === id);
  if (leaderboard == null)
    throw new Error(`Could not find leaderboard with id ${id}`);
  return await leaderboard.leaderboardFunction();
}
