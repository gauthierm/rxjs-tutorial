export interface Author {
  id: string;
  name: string;
}

export interface PostIndex {
  id: string;
  title: string;
  publishedAt: Date;
  author: Author;
}

export interface Post extends PostIndex {
  body: string;
}
