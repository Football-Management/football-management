import { SignInData } from "@/app/(auth)/sign-in/page";
import { api } from "@/data/api"

export const signIn = async ({email, password}: SignInData) => {
  const response = await api('sessions', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  
    const data = await response.json();
    
    return data; 
}
