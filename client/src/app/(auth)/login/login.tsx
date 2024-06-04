'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter,useSearchParams } from 'next/navigation';
import Loginform from '@/components/login/loginform';
import { signIn, useSession } from 'next-auth/react';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loginMessage, setLoginMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    setFormData({ email, password });

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false, 
    });

    if (res?.error) {
      setLoginMessage('Login failed. Please check your credentials and try again.');
    } else {

      // console.log(callbackUrl)
      router.push(callbackUrl);
      // if (session && session.user.roleName === 'admin') {
      //   router.push('/admin');
      // } else {
      //   router.push('/dashboard');
      // }
    }
  };
  useEffect(()=>{
    if(session){
      router.push(callbackUrl)
    }
  }, [session, callbackUrl, router])
  return (
    <div className="flex items-center justify-center h-screen">
      <main className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-5xl font-bold mb-4 text-center">Log in</h2>
        <p className="text-center">Enter your credentials to access your account</p>
        {loginMessage && (
          <p className="text-red-500 text-center mt-4">{loginMessage}</p>
        )}
        <Loginform onsubmit={handleSubmit} />
        <div className="mt-4 text-center">
          <p>Don&apos;t have an account? <Link href="/register" className="text-blue-500"> Sign Up Now.</Link></p>
        </div>
      </main>
    </div>
  );
};

export default Login;
