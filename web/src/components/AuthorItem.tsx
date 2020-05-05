import React from 'react';
import { Author } from '../Interfaces';

interface AuthorItemProps {
  author: Author;
  onClick: () => void;
}

export function AuthorItem({ author, onClick }: AuthorItemProps) {
  return (
    <button className="author-item" type="button" onClick={onClick}>
      {author.name}
    </button>
  );
}
