import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { env } from '@/env'
import { getServerSession } from 'next-auth'

export async function api(path: string, init?: RequestInit) {
  const session = await getServerSession(nextAuthOptions)
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  const url = new URL(path, baseUrl)

  const token = session.user.access_token

  const headers = {
    ...init?.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  return fetch(url, {
    ...init,
    headers,
  })
}
