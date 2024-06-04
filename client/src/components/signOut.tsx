"use client"
import React from 'react';
import { PiPower } from 'react-icons/pi';
import { signOut } from 'next-auth/react';
import { useRouter,useSearchParams } from 'next/navigation';

const SignOut = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSignOut = async () => {
    const callbackUrl = searchParams.get('callbackUrl') || '/login'; 
    await signOut({ redirect: false });
    router.push(callbackUrl);
  };

  return (
    <div>
      <button 
        onClick={handleSignOut} 
        className="flex h-[48px] md:h-[70px] md:w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-500 hover:text-white md:flex md:flex-col md:mt-[200px] md:p-3"
      >
        <PiPower className="w-6 h-10" />
        <div className="hidden md:block">Sign Out</div>
      </button>
    </div>
  );
};

export default SignOut;
