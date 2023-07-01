import { Router } from 'express';
import { controller } from 'src/item/controller';
import { auth } from 'src/middleware/auth';

export const router = Router();

router.get('/item', controller.getItemMetadata);
router.post('/item', auth, controller.uploadItems);
