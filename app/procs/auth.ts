'use server'

import { redirect } from "next/navigation"
import { cookies } from "next/headers";

export async function doLogin(prevState: any, formLogin:FormData) {
    const usremail = formLogin.get('usremail') as string;
    const usrpassw = formLogin.get('usrpassword') as string;

    if (!usremail || !usrpassw) {
        throw new Error('Email atau password tidak boleh kosong');
    }

    if (usremail==='yohanes.papang@gmail.com' && usrpassw==='Papang123') {
        
        (await cookies()).set('session_token', 'mock_jwt', { httpOnly: true, secure: true })

        const token = 'nsc-client-generate-token'

        const cookiest = await cookies()
        cookiest.set('session_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV==='production',
            sameSite: 'lax', 
            maxAge: 60*60*3,
            path: '/',
        }) 

        redirect('/')
    } else {
        throw new Error('Email Anda tidak terdaftar atau Password salah')
    }

    // redirect('/login')

}

export async function doLogout() {
  (await cookies()).delete('session_token')
  redirect('/')
}