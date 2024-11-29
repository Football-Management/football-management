import { env } from '@/env';

export function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL;
  const url = new URL(path, baseUrl);

  const token = localStorage.getItem('@token');

  const headers = {
    ...init?.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  return fetch(url, {
    ...init,
    headers,
  });
}
