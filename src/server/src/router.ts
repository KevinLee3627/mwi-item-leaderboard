import { Router } from 'express';
import { controller } from './controller';

export const router = Router();

router.get('/status', (req, res, next) => {
  res.json({ message: 'OK' });
});

router.get('/player', controller.getPlayerItems);
router.get('/items', controller.getAllItemMetadata);
router.get('/item', controller.getItemMetadata);

router.get('/abilities', controller.getAllAbility);

router.get('/leaderboard/item', controller.getItemLeaderboard);
router.get('/leaderboard/ability', controller.getAbilityLeaderboard);

router.get('/search/player', controller.searchPlayer);

router.post('/upload/item', controller.auth, controller.uploadItem);
router.post('/upload/ability', controller.auth, controller.uploadAbility);
