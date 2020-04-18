import React, { useEffect, useState } from 'react';
import { PostInterface, AuthorInterface } from '../PostInterface';
import { sortByDate } from '../sortByDate';
import { Post } from './Post';
import { AuthorButton } from './AuthorButton';
import { PostDetail } from './PostDetail';

const API = `${process.env.REACT_APP_API_SERVER}/posts`;

export function App() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [activeAuthorId, setActiveAuthorId] = useState<string | null>(null);
  const [activePostId, setActivePostId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API);
      const data = await response.json();

      const posts: PostInterface[] = data.map((post: any) => ({
        ...post,
        publishedAt: new Date(post.publishedAt),
      }));

      setPosts(posts);
    };

    fetchData();
  }, [setPosts]);

  posts.sort(sortByDate);

  const activePosts = activeAuthorId
    ? posts.filter((post) => post.author.id === activeAuthorId)
    : posts;

  const authorsById = posts.reduce<{ [key: string]: AuthorInterface }>(
    (current, post) => {
      current[post.author.id] = post.author;
      return current;
    },
    {}
  );

  const activePost = activePostId
    ? posts.filter((post) => post.id === activePostId)[0]
    : null;

  const authors = Object.values(authorsById);

  return (
    <div className="app">
      {activePost ? (
        <PostDetail
          post={activePost}
          onClose={() => {
            setActivePostId(null);
          }}
        />
      ) : (
        <>
          <ul className="authors-list">
            {authors.map((author) => (
              <li className="authors-list__author" key={author.id}>
                <AuthorButton
                  author={author}
                  onClick={() => {
                    setActiveAuthorId(author.id);
                  }}
                />
              </li>
            ))}
            {activeAuthorId && (
              <li className="authors-list__author">
                <button
                  className="author-list__clear"
                  onClick={() => {
                    setActiveAuthorId(null);
                  }}
                >
                  Clear
                </button>
              </li>
            )}
          </ul>
          <ul className="posts-list">
            {activePosts.map((post) => (
              <li className="posts-list__post" key={post.id}>
                <Post
                  post={post}
                  onClick={() => {
                    setActivePostId(post.id);
                  }}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
