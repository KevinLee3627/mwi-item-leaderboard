import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { Payload } from 'extension';
import { upload as uploadService } from './services/upload';

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

export const controller = {
  upload,
};
