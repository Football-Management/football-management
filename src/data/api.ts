import { env } from '@/env'

export function api(path: string, init?: RequestInit) {
  const baseUrl = env.APP_LOCAL_URL
  // const apiPrefix = '/api'
  const url = new URL(path, baseUrl)

  return fetch(url, init)
}
