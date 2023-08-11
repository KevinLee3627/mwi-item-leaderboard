import { asyncHandler } from 'src/asyncHandler';
import { updateScraperStatus as updateScraperStatusService } from 'src/status/services/update';
import { getScraperStatus as getScraperStatusService } from 'src/status/services/getScraperStatus';

const updateScraperStatus = asyncHandler(async (req, res, next) => {
  await updateScraperStatusService();
  res.json({ message: 'Scraper status updated' });
});

const getScraperStatus = asyncHandler(async (req, res) => {
  const status = await getScraperStatusService();
  res.json({ status });
});

export const controller = {
  updateScraperStatus,
  getScraperStatus,
};
