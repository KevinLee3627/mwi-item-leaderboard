import { getOverallAbilityLevelLeaderboard } from './special/getOverallAbilityLevelLeaderboard';
import { getOverallAbilityXpLeaderboard } from './special/getOverallAbilityXpLeaderboard';
import { getTotalItemsLeaderboard } from './special/getTotalItemsLeaderboard';

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
];

export async function getSpecialLeaderboard({
  id,
}: GetSpecialLeaderboardParams): Promise<unknown> {
  const leaderboard = leaderboards.find((lb) => lb.id === id);
  console.log(leaderboard);
  if (leaderboard == null)
    throw new Error(`Could not find leaderboard with id ${id}`);
  return await leaderboard.leaderboardFunction();
}
