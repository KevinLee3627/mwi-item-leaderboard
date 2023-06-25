import { Router } from 'express';
import { controller } from './controller';

export const router = Router();

router.post('/upload', controller.upload);
router.get('/item', controller.getItemLeaderboard);
