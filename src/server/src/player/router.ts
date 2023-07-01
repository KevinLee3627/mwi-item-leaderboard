import { Router } from 'express';
import { controller } from 'src/player/controller';

export const router = Router();

router.get('/player/:playerId/items', controller.getPlayerItems);
router.get('/player/:playerId/abilities', controller.getPlayerAbilities);
router.get('/player/:playerId', controller.getPlayer);
