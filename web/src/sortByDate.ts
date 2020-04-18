import { PostInterface } from './PostInterface';

export function sortByDate(a: PostInterface, b: PostInterface) {
  if (a.publishedAt.getTime() > b.publishedAt.getTime()) {
    return -1;
  }
  if (a.publishedAt.getTime() < b.publishedAt.getTime()) {
    return 1;
  }

  return 0;
}
