import { Router } from 'express';
import { auth } from 'src/middleware/auth';
import { controller } from 'src/player/controller';

export const router = Router();

router.get('/player/:playerId/items', controller.getPlayerItems);
router.get('/player/:playerId/abilities', controller.getPlayerAbilities);
router.get('/player/:playerId/stats', controller.getPlayerStats);
router.get('/player/:playerId/collection', controller.getPlayerCollection);
router.post('/player/:playerId/ignore', auth, controller.ignorePlayer);
router.get('/player/:playerId', controller.getPlayer);
router.get('/player', controller.searchPlayer);
