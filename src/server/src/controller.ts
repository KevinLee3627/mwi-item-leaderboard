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
import { getAllAbility as getAllAbilityService } from './services/getAllAbility';
import { getAbilityLeaderboard as getAbilityLeaderboardService } from './services/getAbilityLeaderboard';

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

const getPlayerItems = asyncHandler(async (req, res, next) => {
  const { playerId } = req.params;
  if (typeof playerId !== 'string') {
    res.status(400).json({ message: 'playerId should be an integer.' });
    return;
  }

  if (isNaN(parseInt(playerId))) {
    res.status(400).json({ message: 'playerId should be an integer.' });
    return;
  }

  const results = await getPlayerItemsService({
    playerId: parseInt(playerId, 10),
  });

  res.json(results);
});

const getPlayerAbilities = asyncHandler(async (req, res, next) => {
  const { playerId } = req.params;
  if (typeof playerId !== 'string') {
    res.status(400).json({ message: 'playerId should be an integer.' });
    return;
  }

  if (isNaN(parseInt(playerId))) {
    res.status(400).json({ message: 'playerId should be an integer.' });
    return;
  }

  const results = await getPlayerAbilitiesService({
    playerId: parseInt(playerId, 10),
  });

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
  const { itemHrid, limit, enhancementLevel } = req.query;

  if (typeof limit !== 'string') {
    res.status(400).json({ message: 'limit should be an integer.' });
    return;
  }

  if (isNaN(parseInt(limit))) {
    res.status(400).json({ message: 'limit should be an integer.' });
    return;
  }

  if (typeof itemHrid !== 'string' || itemHrid.length === 0) {
    res.status(400).json({ message: 'Item not found.' });
    return;
  }

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
    limit: parseInt(limit, 10),
    enhancementLevel:
      enhancementLevel === 'all' ? 'all' : parseInt(enhancementLevel, 10),
  });
  res.json({ message: 'Items retrieved.', results });
});

const getPlayer = asyncHandler(async (req, res, next) => {
  const { playerId } = req.params;
  if (typeof playerId !== 'string') {
    res.status(400).json({ message: 'playerId should be an integer.' });
    return;
  }

  if (isNaN(parseInt(playerId))) {
    res.status(400).json({ message: 'playerId should be an integer.' });
    return;
  }

  const result = await getPlayerService({
    playerId: parseInt(playerId, 10),
  });

  res.json(result);
});

const getAllItemMetadata = asyncHandler(async (req, res, next) => {
  const results = await getAllItemMetadataService();

  res.json({ message: 'Request fulfilled.', results });
});

const getItemMetadata = asyncHandler(async (req, res, next) => {
  const { itemHrid } = req.query;

  if (typeof itemHrid !== 'string' || itemHrid.length === 0) {
    const results = await getAllItemMetadataService();
    res.json(results);
    return;
  }
  const results = await getItemMetadataService(itemHrid);

  res.json(results);
});

const getAllAbility = asyncHandler(async (req, res, next) => {
  const results = await getAllAbilityService();

  res.json({ message: 'Abilities retrieved.', results });
});

const getAbilityLeaderboard = asyncHandler(async (req, res, next) => {
  const { abilityHrid, limit } = req.query;

  if (typeof limit !== 'string') {
    res.status(400).json({ message: 'limit should be an integer.' });
    return;
  }

  if (isNaN(parseInt(limit))) {
    res.status(400).json({ message: 'limit should be an integer.' });
    return;
  }

  if (typeof abilityHrid !== 'string' || abilityHrid.length === 0) {
    res.status(400).json({ message: 'Ability not found.' });
    return;
  }

  const results = await getAbilityLeaderboardService({
    abilityHrid,
    limit: parseInt(limit, 10),
  });

  res.json({
    message: `Ability leaderboard ${abilityHrid} retrieved.`,
    results,
  });
});

const searchPlayer = asyncHandler(async (req, res, next) => {
  const { q } = req.query;
  if (q == null || typeof q !== 'string' || q.length === 0) {
    res.status(400).json({ message: 'Empty query string' });
    return;
  }

  const results = await searchPlayerService({ query: q });

  res.json({ message: 'Players retrieved.', results });
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
  getAllAbility,
  getAbilityLeaderboard,
};
