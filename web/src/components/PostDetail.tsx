import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { getPost } from '../PostService';
import { Loading } from './Loading';
import { Error } from './Error';
import { useObservable } from '../hooks/useObservable';

interface PostDetailProps {
  postId: string;
  onClose: () => void;
}

export function PostDetail({ postId, onClose }: PostDetailProps) {
  const [loading, error, post] = useObservable(
    () => getPost(postId),
    undefined
  );

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

  return loading ? (
    <Loading />
  ) : error ? (
    <Error message={error} />
  ) : post ? (
    <div className="post-detail">
      <h1 className="post-detail__title">{post.title}</h1>
      <div className="post-detail__body">
        <ReactMarkdown source={post.body} />
      </div>
      <button className="post-detail__close" onClick={onClose}>
        Close
      </button>
    </div>
  ) : null;
}
