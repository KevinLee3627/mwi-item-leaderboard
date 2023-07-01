import type { AbilityPayload } from 'extension';
import { getAllAbilityMetadata as getAllAbilityMetadataService } from 'src/ability/services/getAllAbilityMetadata';
import { uploadAbilities as uploadAbilitiesService } from 'src/ability/services/uploadAbilities';
import { asyncHandler } from 'src/asyncHandler';

const getAllAbilityMetadata = asyncHandler(async (req, res, next) => {
  const results = await getAllAbilityMetadataService();

  res.json(results);
});

const uploadAbilities = asyncHandler(async (req, res, next) => {
  const data: AbilityPayload = req.body;
  // TODO: Add Zod validation
  await uploadAbilitiesService(data);

  res.json({ message: 'Record(s) inserted' });
});

export const controller = {
  getAllAbilityMetadata,
  uploadAbilities,
};
