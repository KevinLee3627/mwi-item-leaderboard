import { getAllAbilityMetadata as getAllAbilityMetadataService } from 'src/ability/services/getAllAbilityMetadata';
import { asyncHandler } from 'src/asyncHandler';

const getAllAbilityMetadata = asyncHandler(async (req, res, next) => {
  const results = await getAllAbilityMetadataService();

  res.json(results);
});

export const controller = {
  getAllAbilityMetadata,
};
