import React, { useEffect, useState } from 'react';
import { PostIndex, Author } from '../Interfaces';
import { sortByDate } from '../sortByDate';
import { PostDetail } from './PostDetail';
import { getPosts } from '../PostService';
import { PostList } from './PostList';
import { AuthorList } from './AuthorList';
import { Loading } from './Loading';
import { Error } from './Error';
import { useObservable } from '../hooks/useObservable';

const posts$ = getPosts();

export function App() {
  const [posts, setPosts] = useState<PostIndex[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [activeAuthorId, setActiveAuthorId] = useState<string | null>(null);
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const [loading, error, rawPosts] = useObservable(() => posts$, []);

  useEffect(() => {
    if (error) {
      setPosts([]);
    } else {
      const loadedPosts: PostIndex[] = rawPosts.map((post) => ({
        ...post,
        publishedAt: new Date(post.publishedAt),
      }));

      loadedPosts.sort(sortByDate);

      setPosts(loadedPosts);
    }
  }, [error, rawPosts]);

  useEffect(() => {
    if (error) {
      setAuthors([]);
    } else {
      const authorsById = rawPosts.reduce<{
        [key: string]: Author;
      }>((current, post) => {
        current[post.author.id] = post.author;
        return current;
      }, {});

      const loadedAuthors = Object.values(authorsById);

      setAuthors(loadedAuthors);
    }
  }, [error, rawPosts]);

  const activePosts = activeAuthorId
    ? posts.filter((post) => post.author.id === activeAuthorId)
    : posts;

  return (
    <div className="app">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message={error} />
      ) : activePostId ? (
        <PostDetail
          postId={activePostId}
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
