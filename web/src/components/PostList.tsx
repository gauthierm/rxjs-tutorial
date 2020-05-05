import React from 'react';
import { PostItem } from './PostItem';
import { Post } from '../Interfaces';

interface PostListProps {
  posts: Post[];
  onSelectPost: (postId: string) => void;
}

export function PostList({ posts, onSelectPost }: PostListProps) {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li className="post-list__post" key={post.id}>
          <PostItem
            post={post}
            onClick={() => {
              onSelectPost(post.id);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
