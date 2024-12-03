'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Stadium from '../../../../public/stadium.jpg'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Input from '@/components/input'
import Button from '@/components/button'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const SignInSchema = z.object({
  email: z.string().email('E-mail inválido.').min(1, 'Informe o seu email'),
  password: z
    .string()
    .min(6, 'A senha deve conter no mínimo 6 caracteres.')
    .min(1, 'Informe a sua senha'),
})

const SignInDefaultValues = {
  email: '',
  password: '',
}

export type SignInData = z.infer<typeof SignInSchema>

export default function SignIn() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: SignInDefaultValues,
  })

  async function handleSubmitSignIn(data: SignInData) {
    try {
      const response = await signIn('auth-tidi', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      console.log(response)

      if (response?.error) {
        console.error('Erro no login:', response.error)
        return
      }

      router.push('/home')
    } catch (error) {
      console.error('Erro inesperado:', error)
    }
  }
  return (
    <form onSubmit={handleSubmit(handleSubmitSignIn)}>
      <main className="h-screen flex">
        <div className="relative w-1/2 flex justify-center items-center">
          <h1 className="font-semibold text-lg z-10">Football Management</h1>
          <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-70"
            style={{
              backgroundImage: `url(${Stadium.src})`,
            }}
          ></div>
        </div>

        <section className="w-1/2 flex justify-center items-center bg-[#151a28]">
          <div className="p-6 rounded-lg max-w-md w-full">
            <h1 className="text-white text-lg text-center font-semibold">
              Olá novamente!
            </h1>
            <p className="text-white text-md font-medium">
              Abaixo, entre com seu email e senha para continuar
            </p>
            <div className="space-y-6 p-4">
              <Input
                control={control}
                className="border-white"
                name="email"
                errors={errors}
                label="Email"
              />
              <Input
                control={control}
                className="border-white"
                name="password"
                type="password"
                errors={errors}
                label="Senha"
              />
              <Button title="Entrar" className="w-full" />
            </div>
          </div>
        </section>
      </main>
    </form>
  )
}
