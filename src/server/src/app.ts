import express, { type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

export const app = express();

app.use(helmet());
app.use(express.json());

app.get('/test', async (req, res, next) => {
  console.log('test received');
  res.json({ message: 'test received!' });
});

const corsOptions = {
  origin: ['https://test.milkywayidle.com', 'https://milkywayidle.com'],
};

app.use(cors(corsOptions));

app.post('/test', async (req, res, next) => {
  console.log('got it!');
  console.log(req.body);
  const prisma = new PrismaClient();
  await prisma.player.upsert({
    where: {
      id: req.body.player.id,
    },
    update: {
      id: req.body.player.id,
      displayName: req.body.player.name,
    },
    create: {
      id: req.body.player.id,
      displayName: req.body.player.name,
    },
  });

  return res.json({ message: 'message received' });
});

app.use((err: unknown, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ message: 'Error!' });
});
