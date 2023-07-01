import { Router } from 'express';
import { controller } from 'src/controller';

export const router = Router();

router.get('/status', (req, res, next) => {
  res.json({ message: 'OK' });
});

router.get('/player/:playerId/items', controller.getPlayerItems);
router.get('/player/:playerId/abilities', controller.getPlayerAbilities);
router.get('/player/:playerId', controller.getPlayer);
router.get('/item', controller.getItemMetadata);

router.get('/ability', controller.getAllAbilityMetadata);

router.get('/leaderboard/item', controller.getItemLeaderboard);
router.get('/leaderboard/ability', controller.getAbilityLeaderboard);

router.get('/search/player', controller.searchPlayer);

router.post('/upload/item', controller.auth, controller.uploadItem);
router.post('/upload/ability', controller.auth, controller.uploadAbility);
