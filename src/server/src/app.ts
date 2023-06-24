import express, { type Request, type Response } from 'express';
import helmet from 'helmet';

export const app = express();

app.use(helmet());
app.use(express.json());

app.get('/test', async (req, res, next) => {
  console.log('got it!');
  return res.json({ message: 'message received' });
});

app.use((err: unknown, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ message: 'Error!' });
});
