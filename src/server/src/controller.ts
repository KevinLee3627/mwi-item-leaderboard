import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { AbilityPayload, Payload } from 'extension';
import { uploadAbility as uploadAbilityService } from './services/uploadAbility';
import { uploadItem as uploadItemService } from './services/uploadItem';
import { getItemLeaderboard as getItemLeaderboardService } from './services/getItemLeaderboard';
import { getPlayerItems as getPlayerItemsService } from './services/getPlayerItems';
import { getPlayerAbilities as getPlayerAbilitiesService } from './services/getPlayerAbilities';
import { getPlayer as getPlayerService } from './services/getPlayer';
import { getAllItemMetadata as getAllItemMetadataService } from './services/getAllItemMetadata';
import { getItemMetadata as getItemMetadataService } from './services/getItemMetadata';
import { searchPlayer as searchPlayerService } from './services/searchPlayer';
import { getAllAbilityMetadata as getAllAbilityMetadataService } from './services/getAllAbilityMetadata';
import { getAbilityLeaderboard as getAbilityLeaderboardService } from './services/getAbilityLeaderboard';
import z from 'zod';

export function asyncHandler(
  asyncFn: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    asyncFn(req, res, next).catch(next);
  };
}

const auth = asyncHandler(async (req, res, next) => {
  if (req.headers.token == null) {
    next(new Error('Missing token.'));
    return;
  }
  if (req.headers.token !== (process.env.API_TOKEN as string)) {
    next(new Error('Invalid/missing token.'));
    return;
  }

  next();
});

const positiveNumberSchema = z.coerce
  .number()
  .positive({ message: 'Should be positive.' })
  .int({ message: 'Should be an integer.' });

const existingStringSchema = z.string().nonempty();

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

const uploadItem = asyncHandler(async (req, res, next) => {
  const data: Payload = req.body;
  // TODO: Add Zod validation
  await uploadItemService(data);

  res.json({ message: 'Record(s) inserted' });
});

const uploadAbility = asyncHandler(async (req, res, next) => {
  const data: AbilityPayload = req.body;
  // TODO: Add Zod validation
  await uploadAbilityService(data);

  res.json({ message: 'Record(s) inserted' });
});

const getItemLeaderboard = asyncHandler(async (req, res, next) => {
  const limit = positiveNumberSchema.parse(req.query.limit);
  const itemHrid = existingStringSchema.parse(req.query.itemHrid);

  const enhancementLevel = req.query.enhancementLevel;
  if (
    typeof enhancementLevel === 'undefined' ||
    typeof enhancementLevel !== 'string'
  ) {
    res
      .status(400)
      .json({ message: 'enhancementLevel should be an integer or "all"' });
    return;
  }

  const results = await getItemLeaderboardService({
    itemHrid,
    limit,
    enhancementLevel:
      enhancementLevel === 'all' ? 'all' : parseInt(enhancementLevel, 10),
  });
  res.json(results);
});

const getPlayer = asyncHandler(async (req, res, next) => {
  const playerId = positiveNumberSchema.parse(req.params.playerId);

  const result = await getPlayerService({ playerId });

  res.json(result);
});

const getAllItemMetadata = asyncHandler(async (req, res, next) => {
  const results = await getAllItemMetadataService();

  res.json(results);
});

const getItemMetadata = asyncHandler(async (req, res, next) => {
  if (req.query.itemHrid == null) {
    const results = await getAllItemMetadataService();
    res.json(results);
    return;
  }

  const itemHrid = existingStringSchema.parse(req.query.itemHrid);
  const results = await getItemMetadataService(itemHrid);
  res.json(results);
});

const getAllAbilityMetadata = asyncHandler(async (req, res, next) => {
  const results = await getAllAbilityMetadataService();

  res.json(results);
});

const getAbilityLeaderboard = asyncHandler(async (req, res, next) => {
  const limit = positiveNumberSchema.parse(req.query.limit);
  const abilityHrid = existingStringSchema.parse(req.query.abilityHrid);

  const results = await getAbilityLeaderboardService({ abilityHrid, limit });

  res.json(results);
});

const searchPlayer = asyncHandler(async (req, res, next) => {
  const query = existingStringSchema.parse(req.query.q);
  const results = await searchPlayerService({ query });

  res.json(results);
});

export const controller = {
  auth,
  uploadAbility,
  uploadItem,
  getItemLeaderboard,
  getPlayer,
  getPlayerItems,
  getPlayerAbilities,
  getAllItemMetadata,
  getItemMetadata,
  searchPlayer,
  getAllAbilityMetadata,
  getAbilityLeaderboard,
};
