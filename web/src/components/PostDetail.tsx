import React, { useEffect } from 'react';
import { Post } from '../Interfaces';
import ReactMarkdown from 'react-markdown';

interface PostDetailProps {
  post: Post;
  onClose: () => void;
}

export function PostDetail({ post, onClose }: PostDetailProps) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  return (
    <div className="post-detail">
      <h1 className="post-detail__title">{post.title}</h1>
      <div className="post-detail__body">
        <ReactMarkdown source={post.body} />
      </div>
      <button className="post-detail__close" onClick={onClose}>
        Close
      </button>
    </div>
  );
}
