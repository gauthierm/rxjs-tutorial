export interface AuthorInterface {
  id: string;
  name: string;
}

export interface PostInterface {
  id: string;
  title: string;
  body: string;
  publishedAt: Date;
  author: AuthorInterface;
}
