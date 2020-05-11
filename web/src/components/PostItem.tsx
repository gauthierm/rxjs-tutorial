import React from 'react';
import { PostIndex } from '../Interfaces';

interface PostItemProps {
  post: PostIndex;
  onClick: () => void;
}

export function PostItem({ post, onClick }: PostItemProps) {
  return (
    <div className="post-item">
      <div className="post-item__title">
        <button className="post-item__button" type="button" onClick={onClick}>
          {post.title}
        </button>
      </div>
      <div className="post-item__author">{post.author.name}</div>
      <div className="post-item__date">
        {post.publishedAt.toLocaleDateString()}
      </div>
    </div>
  );
}
