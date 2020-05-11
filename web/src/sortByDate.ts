import { Post } from './Interfaces';

export function sortByDate(
  a: Pick<Post, 'publishedAt'>,
  b: Pick<Post, 'publishedAt'>
) {
  if (a.publishedAt.getTime() > b.publishedAt.getTime()) {
    return -1;
  }
  if (a.publishedAt.getTime() < b.publishedAt.getTime()) {
    return 1;
  }

  return 0;
}
