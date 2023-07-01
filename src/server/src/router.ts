import { Router } from 'express';
import { controller } from 'src/controller';
import { router as playerRouter } from 'src/player/router';

export const router = Router();

router.get('/status', (req, res, next) => {
  res.json({ message: 'OK' });
});

router.use(playerRouter);

router.get('/item', controller.getItemMetadata);

router.get('/ability', controller.getAllAbilityMetadata);

router.get('/leaderboard/item', controller.getItemLeaderboard);
router.get('/leaderboard/ability', controller.getAbilityLeaderboard);

router.get('/search/player', controller.searchPlayer);

router.post('/upload/item', controller.auth, controller.uploadItem);
router.post('/upload/ability', controller.auth, controller.uploadAbility);
