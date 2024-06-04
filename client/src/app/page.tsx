import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
const page = ()=>{
  return (
    <div className='h-screen'>
      <nav className="font-poppins text-3xl ml-8 mt-8 italic font-bold leading-42">
          <Link href="/" className="text-blue-500 flex items-center space-x-2">
            <Image src="/rephrod.png" alt="Repherod" width={40} height={40}/>
            <span>
              Repherod
            </span>
          </Link>
        </nav>
        <div className='flex flex-row'>
          <div className='hidden md:block  md:w-[55%]'>
           
          </div>
          <div className='flex grow flex-col items-center justify-center h-screen '>
              <h2 className='text-center mb-5 text-[20px] leading-[1.2] md:text-[32px] md:leading-8 font-bold' >Get Started</h2>
              <Image src="/rephrod.png" alt="Repherod" width={40} height={40}/>
            <div className='flex flex-col md:flex-row md:justify-center md:items-center  gap-y-2 mt-[20px]  md:gap-x-5'>
              <button className="bg-blue-500 text-white py-2 px-20 rounded-md bg-[#3C46FF] text-[#fff] hover:bg-[#0000FF] h-12">
                <Link href="/login">Log in</Link>
              </button>
              <button className="bg-blue-500 text-white py-2 px-20 rounded-md bg-[#3C46FF] text-[#fff] hover:bg-[#0000FF] h-12">
                  <Link href="/register">Sign Up</Link>
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default page;