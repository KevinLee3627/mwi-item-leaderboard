import { prisma } from 'src/db';
import { type ScraperStatus } from 'src/types';

export async function getScraperStatus(): Promise<ScraperStatus> {
  const res = await prisma.serviceStatus.findUnique({
    where: { name: 'scraper' },
  });
  if (res == null) {
    throw new Error('Could not find scraper status');
  }

  return res.status as ScraperStatus;
}
