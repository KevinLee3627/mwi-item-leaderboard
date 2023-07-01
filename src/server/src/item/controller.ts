import { getAllItemMetadata as getAllItemMetadataService } from 'src/item/services/getAllItemMetadata';
import { getItemMetadata as getItemMetadataService } from 'src/item/services/getItemMetadata';
import { existingStringSchema } from 'src/validators';
import { asyncHandler } from 'src/asyncHandler';

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

export const controller = {
  getItemMetadata,
};
