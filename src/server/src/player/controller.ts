import { getPlayerItems as getPlayerItemsService } from 'src/player/services/getPlayerItems';
import { getPlayerAbilities as getPlayerAbilitiesService } from 'src/player/services/getPlayerAbilities';
import { getPlayer as getPlayerService } from 'src/player/services/getPlayer';
import { searchPlayer as searchPlayerService } from 'src/player/services/searchPlayer';
import { existingStringSchema, positiveNumberSchema } from 'src/validators';
import { asyncHandler } from 'src/asyncHandler';

const getPlayerItems = asyncHandler(async (req, res, next) => {
  const playerId = positiveNumberSchema.parse(req.params.playerId);

  const results = await getPlayerItemsService({ playerId });

  res.json(results);
});

const getPlayerAbilities = asyncHandler(async (req, res, next) => {
  const playerId = positiveNumberSchema.parse(req.params.playerId);

  const results = await getPlayerAbilitiesService({ playerId });

  res.json(results);
});

const getPlayer = asyncHandler(async (req, res, next) => {
  const playerId = positiveNumberSchema.parse(req.params.playerId);

  const result = await getPlayerService({ playerId });

  res.json(result);
});

const searchPlayer = asyncHandler(async (req, res, next) => {
  const query = existingStringSchema.parse(req.query.q);
  const results = await searchPlayerService({ query });

  res.json(results);
});

export const controller = {
  getPlayer,
  getPlayerItems,
  getPlayerAbilities,
  searchPlayer,
};
