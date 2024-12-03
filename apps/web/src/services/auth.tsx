import { SignInData } from '@/app/(auth)/sign-in/page'
import { api } from '@/data/api'
import { signOut } from 'next-auth/react'

export const signIn = async ({ email, password }: SignInData) => {
  const response = await api('sessions', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  return data
}

export const SignOut = async () => {
  try {
    await signOut({ redirect: true, callbackUrl: '/' })
  } catch (error) {
    console.error('Erro ao deslogar:', error)
  }
}
