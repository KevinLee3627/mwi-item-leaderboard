import express, { type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import type { Payload } from 'extension';

export const app = express();

app.use(helmet());
app.use(express.json());

app.use(cors());

app.post('/test', async (req, res, next) => {
  console.log('got it!');
  console.log(req.body);
  const data: Payload = req.body;
  const prisma = new PrismaClient();
  await prisma.player.upsert({
    where: {
      id: data.player.id,
    },
    update: {
      id: data.player.id,
      displayName: data.player.name,
    },
    create: {
      id: data.player.id,
      displayName: data.player.name,
    },
  });

  for (let i = 0; i < data.items.length; i++) {
    const item = data.items[i];

    await prisma.item.upsert({
      where: {
        hrid_enhancementLevel: {
          hrid: item.itemHrid,
          enhancementLevel: item.enhancementLevel,
        },
      },
      update: {},
      create: {
        hrid: item.itemHrid,
        displayName: item.itemHrid
          .replace('/items/', '')
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        enhancementLevel: item.enhancementLevel,
      },
    });

    await prisma.record.upsert({
      where: {
        itemHrid_itemEnhancementLevel_playerId: {
          playerId: data.player.id,
          itemEnhancementLevel: item.enhancementLevel,
          itemHrid: item.itemHrid,
        },
      },
      update: {
        num: item.count,
        ts: data.ts,
      },
      create: {
        itemHrid: item.itemHrid,
        itemEnhancementLevel: item.enhancementLevel,
        playerId: data.player.id,
        num: item.count,
        ts: data.ts,
      },
    });
  }

  return res.json({ message: 'message received' });
});

app.use((err: unknown, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ message: 'Error!' });
});
