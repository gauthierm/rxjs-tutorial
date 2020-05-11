import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

interface ErrorResponse {
  error: true;
  message: string;
}

type ObservableCreator<T> = () => Observable<T | ErrorResponse>;

export function useObservable<T>(
  creator: ObservableCreator<T>,
  defaultData: T
): [boolean, string | undefined, T] {
  const [fixedDefaultData] = useState(defaultData);
  const [observable$] = useState(creator());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<T>(fixedDefaultData);

  useEffect(() => {
    setLoading(true);
    const subscription = observable$.subscribe((result) => {
      if ('error' in result) {
        console.error(result.message);
        setData(fixedDefaultData);
        setError(result.message);
        setLoading(false);
      } else {
        setData(result);
        setError(undefined);
        setLoading(false);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [observable$, fixedDefaultData, setData, setError, setLoading]);

  return [loading, error, data];
}
