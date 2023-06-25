import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { Payload } from 'extension';
import { upload as uploadService } from './services/upload';
import { getItemLeaderboard as getItemLeaderboardService } from './services/getItemLeaderboard';

export function asyncHandler(
  asyncFn: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    asyncFn(req, res, next).catch(next);
  };
}

const upload = asyncHandler(async (req, res, next) => {
  const data: Payload = req.body;
  // TODO: Add Zod validation
  await uploadService(data);

  res.json({ message: 'Record(s) inserted' });
});

const getItemLeaderboard = asyncHandler(async (req, res, next) => {
  const { itemHrid, limit } = req.query;

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

  const results = await getItemLeaderboardService({
    itemHrid,
    limit: parseInt(limit, 10),
  });
  res.json({ message: 'Items retrieved.', results });
});

export const controller = {
  upload,
  getItemLeaderboard,
};
