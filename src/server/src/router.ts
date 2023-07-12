import { Router } from 'express';
import { router as playerRouter } from 'src/player/router';
import { router as leaderboardRouter } from 'src/leaderboard/router';
import { router as itemRouter } from 'src/item/router';
import { router as abilityRouter } from 'src/ability/router';
import { router as gameRouter } from 'src/game/router';

export const router = Router();

router.get('/status', (req, res, next) => {
  res.json({ message: 'OK' });
});

router.use(playerRouter);
router.use(leaderboardRouter);
router.use(itemRouter);
router.use(abilityRouter);
router.use(gameRouter);
