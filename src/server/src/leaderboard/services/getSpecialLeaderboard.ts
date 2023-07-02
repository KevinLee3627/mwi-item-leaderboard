import { getOverallAbilityLevelLeaderboard } from './special/getOverallAbilityLevelLeaderboard';
import { getOverallAbilityXpLeaderboard } from './special/getOverallAbilityXpLeaderboard';

interface GetSpecialLeaderboardParams {
  id: number;
}

const leaderboards = [
  { id: 1, leaderboardFunction: getOverallAbilityLevelLeaderboard },
  { id: 2, leaderboardFunction: getOverallAbilityXpLeaderboard },
];

export async function getSpecialLeaderboard({
  id,
}: GetSpecialLeaderboardParams): Promise<unknown> {
  const leaderboard = leaderboards.find((lb) => lb.id === id);
  if (leaderboard == null)
    throw new Error(`Could not find leaderboard with id ${id}`);
  return await leaderboard.leaderboardFunction();
}
