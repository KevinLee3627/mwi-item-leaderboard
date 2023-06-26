import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { Payload } from 'extension';
import { upload as uploadService } from './services/upload';
import { getItemLeaderboard as getItemLeaderboardService } from './services/getItemLeaderboard';
import { getPlayerItems as getPlayerItemsService } from './services/getPlayerItems';
import { getItemMetadata as getItemMetadataService } from './services/getItemMetadata';

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

const upload = asyncHandler(async (req, res, next) => {
  const data: Payload = req.body;
  // TODO: Add Zod validation
  await uploadService(data);

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
    typeof enhancementLevel !== 'string' &&
    typeof enhancementLevel !== 'undefined'
  ) {
    res.status(400).json({ message: 'enhancementLevel should be an integer' });
    return;
  }

  const results = await getItemLeaderboardService({
    itemHrid,
    limit: parseInt(limit, 10),
    enhancementLevel:
      enhancementLevel == null ? 0 : parseInt(enhancementLevel, 10),
  });
  res.json({ message: 'Items retrieved.', results });
});

const getPlayerItems = asyncHandler(async (req, res, next) => {
  const { playerId } = req.query;
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

  res.json({ message: 'Items retrieved.', results });
});

const getItemMetadata = asyncHandler(async (req, res, next) => {
  const results = await getItemMetadataService();

  res.json({ message: 'Request fulfilled.', results });
});

export const controller = {
  auth,
  upload,
  getItemLeaderboard,
  getPlayerItems,
  getItemMetadata,
};
