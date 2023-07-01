import { Router } from 'express';
import { controller } from 'src/ability/controller';

export const router = Router();

router.get('/ability', controller.getAllAbilityMetadata);
