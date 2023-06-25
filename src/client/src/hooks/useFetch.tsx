import { useEffect, useState } from 'react';
import axios from 'axios';

interface UseFetchParams {
  url: string;
  method: 'GET' | 'POST';
}

interface FetchState<T> {
  loading: boolean;
  hasError: boolean;
  error?: unknown;
  data?: T;
}

export function useFetch<T>({ url, method }: UseFetchParams) {
  const [state, setState] = useState<FetchState<T>>({
    loading: true,
    hasError: false,
  });

  useEffect(() => {
    setState({ loading: true, hasError: false });

    axios({
      url,
      method,
    })
      .then((res) => {
        console.log(res.data);
        if (res.status >= 400) {
          setState({ loading: false, hasError: true });
        }

        setState({ loading: false, hasError: false, data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url, method]);

  return state;
}
