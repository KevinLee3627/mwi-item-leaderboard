import { getAllItemMetadata as getAllItemMetadataService } from 'src/item/services/getAllItemMetadata';
import { getItemMetadata as getItemMetadataService } from 'src/item/services/getItemMetadata';
import { uploadItems as uploadItemsService } from 'src/item/services/uploadItems';
import { existingStringSchema } from 'src/validators';
import { asyncHandler } from 'src/asyncHandler';
import type { Payload } from 'extension';

const getItemMetadata = asyncHandler(async (req, res, next) => {
  if (req.query.itemHrid == null) {
    const results = await getAllItemMetadataService();
    res.json(results);
    return;
  }

  const itemHrid = existingStringSchema.parse(req.query.itemHrid);
  const results = await getItemMetadataService(itemHrid);
  res.json(results);
});

const uploadItems = asyncHandler(async (req, res, next) => {
  const data: Payload = req.body;
  // TODO: Add Zod validation
  await uploadItemsService(data);

  res.json({ message: 'Record(s) inserted' });
});

export const controller = {
  getItemMetadata,
  uploadItems,
};
