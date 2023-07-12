import { Router } from 'express';
import { controller } from 'src/game/controller';

export const router = Router();

router.get('/game/items', controller.getGameItemDetailMap);
