import express, { type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { router } from './router';

export const app = express();

app.use(helmet());
app.use(express.json());

app.use(cors());

app.use(router);

app.use((err: unknown, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ message: 'Error!' });
});
