import express, { type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';

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
  return res.json({ message: 'message received' });
});

app.use((err: unknown, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ message: 'Error!' });
});
