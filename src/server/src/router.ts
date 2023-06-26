import { Router } from 'express';
import { controller } from './controller';

export const router = Router();

router.get('/status', (req, res, next) => {
  res.json({ message: 'OK' });
});

router.get('/item', controller.getItemLeaderboard);
router.get('/player', controller.getPlayerItems);
router.get('/items', controller.getItemMetadata);

router.post('/upload', controller.auth, controller.upload);
