import { Router, Request, Response } from 'express';
import { posts as postsData } from '../data/posts';
import shuffle from 'knuth-shuffle-seeded';
import { terrible } from '../middleware/terrible';
import { debug as createDebug } from 'debug';

const debug = createDebug('api');

export const posts = Router();

posts.get('/', terrible(), async (_: Request, res: Response) => {
  debug('Getting posts index.');

  shuffle(postsData);

  const postIndexData = postsData.map((post) => ({
    id: post.id,
    title: post.title,
    author: post.author,
    publishedAt: post.publishedAt,
  }));

  res.header('Cache-Control', 'no-store');
  res.status(200);
  res.json(postIndexData);
});

posts.get('/:id', terrible(), async (req: Request, res: Response) => {
  debug(`Getting post ${req.params.id}.`);

  const post = postsData.filter((post) => post.id === req.params.id)[0];
  if (post === null) {
    res.status(404);
    res.json({ message: 'Not found.' });
  } else {
    res.status(200);
    res.json(post);
  }
});
