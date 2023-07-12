import { asyncHandler } from 'src/asyncHandler';
import { getGameItemDetailMap as getGameItemDetailMapService } from 'src/game/services/getGameItemDetailMap';
const getGameItemDetailMap = asyncHandler(async (req, res, next) => {
  const data = getGameItemDetailMapService();
  res.json(data);
});

export const controller = {
  getGameItemDetailMap,
};
