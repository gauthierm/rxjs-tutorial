import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import { posts } from './routes/posts';
import { AppError } from './typings/AppError';

// CORS header configuration
const corsOptions = {
  methods: 'GET',
  allowedHeaders: 'Content-Type,Authorization',
};

export const app = express();

// Routes
app.use('/posts', cors(corsOptions), posts);

// error handling middleware should be loaded after the loading the routes
app.use('/', (err: AppError, _: Request, res: Response, __: NextFunction) => {
  const status = err.status || 500;
  const formattedError = {
    message: err.message,
  };

  res.status(status);
  res.header('Cache-Control', 'no-store');
  res.json(formattedError);
});
