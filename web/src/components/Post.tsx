import React from 'react';
import { PostInterface } from '../PostInterface';

interface PostProps {
  post: PostInterface;
  onClick: () => void;
}

export function Post({ post, onClick }: PostProps) {
  return (
    <div className="post">
      <div className="post__title">
        <button className="post__button" type="button" onClick={onClick}>
          {post.title}
        </button>
      </div>
      <div className="post__author">{post.author.name}</div>
      <div className="post__date">{post.publishedAt.toLocaleDateString()}</div>
    </div>
  );
}
