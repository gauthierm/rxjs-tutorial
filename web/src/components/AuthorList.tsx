import React from 'react';
import { AuthorItem } from './AuthorItem';
import { Author } from '../Interfaces';

interface AuthorListProps {
  activeAuthorId: string | null;
  authors: Author[];
  onSelectAuthor: (authorId: string | null) => void;
}
export function AuthorList({
  activeAuthorId,
  authors,
  onSelectAuthor,
}: AuthorListProps) {
  return (
    <ul className="author-list">
      {authors.map((author) => (
        <li className="author-list__author" key={author.id}>
          <AuthorItem
            author={author}
            onClick={() => {
              onSelectAuthor(author.id);
            }}
          />
        </li>
      ))}
      {activeAuthorId && (
        <li className="author-list__author">
          <button
            className="autho-list__clear"
            onClick={() => {
              onSelectAuthor(null);
            }}
          >
            Clear
          </button>
        </li>
      )}
    </ul>
  );
}
