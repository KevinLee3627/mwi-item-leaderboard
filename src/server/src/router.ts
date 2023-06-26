import { Router } from 'express';
import { controller } from './controller';

export const router = Router();

router.get('/status', (req, res, next) => {
  res.json({ message: 'OK' });
});

router.get('/item', controller.getItemLeaderboard);
router.get('/player', controller.getPlayerItems);
router.get('/items', controller.getItemMetadata);

router.post(
  '/upload',
  (req, res, next) => {
    if (req.headers.token == null) {
      next(new Error('Missing token.'));
      return;
    }
    if (req.headers.token !== (process.env.API_TOKEN as string)) {
      next(new Error('Invalid/missing token.'));
      return;
    }

    next();
  },
  controller.upload
);
