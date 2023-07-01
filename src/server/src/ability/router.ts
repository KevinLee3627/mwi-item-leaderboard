import { Router } from 'express';
import { controller } from 'src/ability/controller';
import { auth } from 'src/middleware/auth';

export const router = Router();

router.get('/ability', controller.getAllAbilityMetadata);
router.post('/ability', auth, controller.uploadAbilities);
