'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export default function BtnLogout() {
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/sign-in' })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <LogOut
        onClick={handleSignOut}
        className="cursor-pointer text-black dark:text-white"
        size={22}
      />
    </>
  )
}
