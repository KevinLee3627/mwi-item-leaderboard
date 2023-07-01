import { getItemLeaderboard as getItemLeaderboardService } from 'src/leaderboard/services/getItemLeaderboard';
import { getAbilityLeaderboard as getAbilityLeaderboardService } from 'src/leaderboard/services/getAbilityLeaderboard';
import { getSpecialLeaderboard as getSpecialLeaderboardService } from 'src/leaderboard/services/getSpecialLeaderboard';
import {
  existingStringSchema,
  integerSchema,
  positiveNumberSchema,
} from 'src/validators';
import { asyncHandler } from 'src/asyncHandler';

const getItemLeaderboard = asyncHandler(async (req, res, next) => {
  const limit = positiveNumberSchema.parse(req.query.limit);
  const itemHrid = existingStringSchema.parse(req.query.itemHrid);

  const enhancementLevel = integerSchema.parse(req.query.enhancementLevel);

  const results = await getItemLeaderboardService({
    itemHrid,
    limit,
    enhancementLevel,
  });
  res.json(results);
});

const getAbilityLeaderboard = asyncHandler(async (req, res, next) => {
  const limit = positiveNumberSchema.parse(req.query.limit);
  const abilityHrid = existingStringSchema.parse(req.query.abilityHrid);

  const results = await getAbilityLeaderboardService({ abilityHrid, limit });

  res.json(results);
});

const getSpecialLeaderboard = asyncHandler(async (req, res, next) => {
  const id = positiveNumberSchema.parse(req.params.leaderboardId);

  const results = await getSpecialLeaderboardService({ id });

  res.json(results);
});

export const controller = {
  getItemLeaderboard,
  getAbilityLeaderboard,
  getSpecialLeaderboard,
};
