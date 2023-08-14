import { prisma } from 'src/db';
import { type ScraperStatus } from 'src/types';

export async function getScraperStatus(): Promise<ScraperStatus> {
  const res = await prisma.serviceStatus.findUnique({
    where: { name: 'scraper' },
  });

  if (res == null) {
    throw new Error('Could not find scraper status');
  }

  const ONE_MINUTE = 1000 * 60;
  const dateDifference = new Date().getTime() - res.lastUpdate.getTime();
  if (Math.abs(dateDifference) > ONE_MINUTE) {
    await prisma.serviceStatus.update({
      where: { name: 'scraper' },
      data: { status: 'down' },
    });
    return 'down';
  } else {
    return res.status as ScraperStatus;
  }
}
