import { Router, Request, Response } from 'express';
import { posts as postsData } from '../data/posts';
import shuffle from 'knuth-shuffle-seeded';

export const posts = Router();

posts.get('/', async (_: Request, res: Response) => {
  res.header('Content-Type', 'application/json');
  res.header('Cache-Control', 'no-store');

  if (Math.random() < 0.5) {
    res.status(400);
    res.send(JSON.stringify({ message: 'A wild error appeared.' }));
  } else {
    shuffle(postsData);
    setTimeout(() => {
      res.status(200);
      res.send(JSON.stringify(postsData));
    }, Math.floor(Math.random() * 5000 + 1000));
  }
});
