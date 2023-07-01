import { Router } from 'express';
import { controller } from 'src/item/controller';

export const router = Router();

router.get('/item', controller.getItemMetadata);
