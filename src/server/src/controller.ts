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
  // Hrid without the /items/
  const itemHrid = req.query.itemHrid;
  if (typeof itemHrid !== 'string' || itemHrid.length === 0) {
    res.json({ message: 'Item not found.' });
    return;
  }

  const results = await getItemLeaderboardService(itemHrid);
  res.json({ message: 'Items retrieved.', results });
});

export const controller = {
  upload,
  getItemLeaderboard,
};
