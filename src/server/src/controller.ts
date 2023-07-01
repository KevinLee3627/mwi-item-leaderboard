import type { AbilityPayload, Payload } from 'extension';
import { uploadAbility as uploadAbilityService } from 'src/services/uploadAbility';
import { uploadItem as uploadItemService } from 'src/services/uploadItem';
import { getItemLeaderboard as getItemLeaderboardService } from 'src/services/getItemLeaderboard';
import { getAllItemMetadata as getAllItemMetadataService } from 'src/services/getAllItemMetadata';
import { getItemMetadata as getItemMetadataService } from 'src/services/getItemMetadata';
import { searchPlayer as searchPlayerService } from 'src/services/searchPlayer';
import { getAllAbilityMetadata as getAllAbilityMetadataService } from 'src/services/getAllAbilityMetadata';
import { getAbilityLeaderboard as getAbilityLeaderboardService } from 'src/services/getAbilityLeaderboard';
import {
  existingStringSchema,
  integerSchema,
  positiveNumberSchema,
} from './validators';
import { asyncHandler } from './asyncHandler';

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

  const enhancementLevel = integerSchema.parse(req.query.enhancementLevel);

  const results = await getItemLeaderboardService({
    itemHrid,
    limit,
    enhancementLevel,
  });
  res.json(results);
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
  getAllItemMetadata,
  getItemMetadata,
  searchPlayer,
  getAllAbilityMetadata,
  getAbilityLeaderboard,
};
