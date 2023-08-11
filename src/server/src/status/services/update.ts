import { prisma } from 'src/db';

export async function updateScraperStatus(): Promise<void> {
  // Ping received
  await prisma.serviceStatus.upsert({
    where: {
      name: 'scraper',
    },
    update: {
      lastUpdate: new Date(),
    },
    create: {
      name: 'scraper',
      lastUpdate: new Date(),
      status: 'running',
    },
  });
}
