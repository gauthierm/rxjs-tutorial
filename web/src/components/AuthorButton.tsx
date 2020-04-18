import React from 'react';
import { AuthorInterface } from '../PostInterface';

interface AuthorButtonProps {
  author: AuthorInterface;
  onClick: () => void;
}

export function AuthorButton({ author, onClick }: AuthorButtonProps) {
  return (
    <button className="author-button" type="button" onClick={onClick}>
      {author.name}
    </button>
  );
}
