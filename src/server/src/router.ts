import { Router } from 'express';
import { controller } from './controller';

export const router = Router();

router.get('/status', (req, res, next) => {
  res.json({ message: 'OK' });
});

router.get('/leaderboard', controller.getItemLeaderboard);
router.get('/player', controller.getPlayerItems);
router.get('/items', controller.getAllItemMetadata);
router.get('/item', controller.getItemMetadata);

router.get('/search/player', controller.searchPlayer);

router.post('/upload/item', controller.auth, controller.uploadItem);
router.post('/upload/ability', controller.auth, controller.uploadAbility);
