import React from 'react';
import { PostItem } from './PostItem';
import { PostIndex } from '../Interfaces';

interface PostListProps {
  posts: PostIndex[];
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
