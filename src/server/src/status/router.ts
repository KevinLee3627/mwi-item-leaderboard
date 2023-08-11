import { Router } from 'express';
import { auth } from 'src/middleware/auth';
import { controller } from 'src/status/controller';

export const router = Router();

router.get('/status/scraper', controller.getScraperStatus);
router.put('/status/scraper', auth, controller.updateScraperStatus);
