import { Post } from './Interfaces';

export function sortByDate(a: Post, b: Post) {
  if (a.publishedAt.getTime() > b.publishedAt.getTime()) {
    return -1;
  }
  if (a.publishedAt.getTime() < b.publishedAt.getTime()) {
    return 1;
  }

  return 0;
}
