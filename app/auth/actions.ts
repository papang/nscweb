'use server';

import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/app/lib/session';
import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib/session'

export async function login(formData: FormData) {
  const email = formData.get('usremail') as string;
  const password = formData.get('usrpassword') as string;

  // Replace this placeholder check with your actual database query
  if (email === 'user@example.com' && password === 'password123') {
    // Generate a temporary mock user ID string
    const mockUserId = 'usr_98231'; 
    
    await createSession(mockUserId);
    redirect('/');
  } else {
    redirect('/login?error=Invalid credentials');
  }
}

export async function isLoggedIn() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session')?.value;
    const session = await decrypt(sessionToken);
  
    if (!session?.userId) {
      return false;
    }

  return true;
} 

export async function logout() {
  await deleteSession();
  redirect('/login');
}