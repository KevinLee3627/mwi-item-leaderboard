import { Router } from 'express';
import { controller } from 'src/leaderboard/controller';

export const router = Router();

router.get('/leaderboard/item', controller.getItemLeaderboard);
router.get('/leaderboard/ability', controller.getAbilityLeaderboard);
router.get(
  '/leaderboard/special/:leaderboardId',
  controller.getSpecialLeaderboard
);
