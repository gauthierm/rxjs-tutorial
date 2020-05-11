import { from, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, retry, map } from 'rxjs/operators';
import { Author } from './Interfaces';

const API = `${process.env.REACT_APP_API_SERVER}/posts`;
const MAX_RETRIES = 2;

interface RawPostIndex {
  id: string;
  title: string;
  publishedAt: string;
  author: Author;
}

interface RawPost extends RawPostIndex {
  body: string;
}

interface PostError {
  error: true;
  message: string;
}

interface ApiError {
  message: string;
}

function fetchObservable<T>(url: string) {
  return fromFetch(url).pipe(
    switchMap((response) => {
      if (response.ok) {
        return from(response.json() as Promise<T>);
      }
      return from(response.json() as Promise<ApiError>).pipe(
        map((error) => {
          throw new Error(error.message);
        })
      );
    }),
    retry(MAX_RETRIES),
    catchError((err) => {
      // Network or other error, handle appropriately
      console.error(err);
      return of<PostError>({
        error: true,
        message: err.message,
      });
    })
  );
}

export function getPost(id: string) {
  const url = `${API}/${id}`;
  return fetchObservable<RawPost>(url);
}

export function getPosts() {
  return fetchObservable<RawPostIndex[]>(API);
}
