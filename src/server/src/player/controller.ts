import { getPlayerItems as getPlayerItemsService } from 'src/player/services/getPlayerItems';
import { getPlayerAbilities as getPlayerAbilitiesService } from 'src/player/services/getPlayerAbilities';
import { getPlayerStats as getPlayerStatsService } from 'src/player/services/getPlayerStats';
import { getPlayerCollection as getPlayerCollectionService } from 'src/player/services/getPlayerCollection';
import { getPlayer as getPlayerService } from 'src/player/services/getPlayer';
import { searchPlayer as searchPlayerService } from 'src/player/services/searchPlayer';
import { ignorePlayer as ignorePlayerService } from './services/ignorePlayer';
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

const getPlayerStats = asyncHandler(async (req, res, next) => {
  const playerId = positiveNumberSchema.parse(req.params.playerId);

  const results = await getPlayerStatsService({ playerId });

  res.json(results);
});

const getPlayerCollection = asyncHandler(async (req, res, next) => {
  const playerId = positiveNumberSchema.parse(req.params.playerId);

  const results = await getPlayerCollectionService({ playerId });

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

const ignorePlayer = asyncHandler(async (req, res, next) => {
  const playerId = positiveNumberSchema.parse(req.params.playerId);
  await ignorePlayerService({ playerId });

  res.json({ message: `Player ${playerId} is now ignored` });
});

export const controller = {
  getPlayer,
  getPlayerItems,
  getPlayerAbilities,
  getPlayerStats,
  getPlayerCollection,
  searchPlayer,
  ignorePlayer,
};
