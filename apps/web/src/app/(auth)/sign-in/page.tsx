'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Stadium from '../../../../public/stadium.jpg'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Input from '@/components/input'
import Button from '@/components/button'
import { signIn } from '@/services/auth'
import { useRouter } from 'next/navigation'

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
    const response = await signIn(data)
    localStorage.setItem('@token', response.access_token);
    router.push('/home')
    console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitSignIn)}>
    <main  
      className="h-screen bg-no-repeat bg-cover bg-center p-8"
      style={{
        backgroundImage: `url(${Stadium.src})`,
      }}
    >
      {/* <div className="absolute inset-0 bg-black opacity-50" /> */}

      <section className="flex h-full overflow-hidden justify-end items-center">
        <div>
          <p className="text-white text-2xl font-bold">
            Enter com as credencias do clube
          </p>
          <p className="text-white text-2xl font-bold">
            abaixo entre com email e senha
          </p>
          <Input control={control} name="email" errors={errors} label="Email" />
          <Input control={control} name="password" errors={errors} label="Senha" />
          <Button>Entrar</Button>
        </div>
      </section>
    </main>
    </form>
  )
}
