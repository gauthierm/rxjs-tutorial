import React, { useEffect, useState } from 'react';
import { Post, Author } from '../Interfaces';
import { sortByDate } from '../sortByDate';
import { PostDetail } from './PostDetail';
import { getPosts } from '../PostService';
import { PostList } from './PostList';
import { AuthorList } from './AuthorList';

const posts$ = getPosts();

export function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [activeAuthorId, setActiveAuthorId] = useState<string | null>(null);
  const [activePostId, setActivePostId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const subscription = posts$.subscribe((result) => {
      if ('error' in result) {
        console.error(result.message);
        setPosts([]);
        setAuthors([]);
        setError(result.message);
        setLoading(false);
      } else {
        const loadedPosts: Post[] = result.map((post) => ({
          ...post,
          publishedAt: new Date(post.publishedAt),
        }));

        loadedPosts.sort(sortByDate);

        const authorsById = loadedPosts.reduce<{
          [key: string]: Author;
        }>((current, post) => {
          current[post.author.id] = post.author;
          return current;
        }, {});

        const loadedAuthors = Object.values(authorsById);

        setPosts(loadedPosts);
        setAuthors(loadedAuthors);
        setError(undefined);
        setLoading(false);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [setPosts, setAuthors, setError, setLoading]);

  const activePosts = activeAuthorId
    ? posts.filter((post) => post.author.id === activeAuthorId)
    : posts;

  const activePost = activePostId
    ? posts.filter((post) => post.id === activePostId)[0]
    : null;

  return (
    <div className="app">
      {loading ? (
        <>Loading ...</>
      ) : error ? (
        <>Error {error}</>
      ) : activePost ? (
        <PostDetail
          post={activePost}
          onClose={() => {
            setActivePostId(null);
          }}
        />
      ) : (
        <>
          <AuthorList
            activeAuthorId={activeAuthorId}
            authors={authors}
            onSelectAuthor={setActiveAuthorId}
          />
          <PostList posts={activePosts} onSelectPost={setActivePostId} />
        </>
      )}
    </div>
  );
}
