import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const nextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'auth-tidi',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Digite o seu e-mail',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Digite a sua senha',
        },
      },
      async authorize(credentials) {
        try {
          const res = await fetch('http://localhost:3333/sessions', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          })

          if (!res.ok) {
            throw new Error('Credenciais inválidas')
          }

          const result = await res.json()

          if (result?.user) {
            return result
          } else {
            throw new Error('Credenciais inválidas')
          }
        } catch (error) {
          console.error('Erro na autenticação:', error)
          return null // Se houver qualquer erro, retornar null para falhar no login
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user
      }
      return session
    },
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
