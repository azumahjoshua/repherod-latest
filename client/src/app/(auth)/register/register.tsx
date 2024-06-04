"use client";
import Registerform from "@/components/register/registerform";
import React from "react";
import Link from 'next/link';
// import Image from "next/image";
const Register = () => {
  return (
    <div className="my-10 flex md:flex-row  md:justify-evenly md:space-y-0 md:space-x-6">
      <div className="max-w-md w-full p-6  bg-white rounded-lg shadow-lg ">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <p className="text-center">Welcome to Repherod</p>
        <div className="container">
          <Registerform />
        </div>
        <div className="mt-4 text-center">
          <p>I already have an account <Link href="/login" className="text-blue-500">Log in.</Link></p>
        </div>
      </div>
      {/* <div className="hidden md:flex flex-col md:items-center md:justify-center md:block">
        <Image src="/rephrod.png" alt="Repherod" width={120} height={60} />
        <p className="text-center text-lg md:text-4xl font-normal">
          Refer Patient
        </p>
        <p className="text-center text-lg md:text-4xl font-normal">
          quick as Lighting ..
        </p>
      </div> */}
    </div>
  );
};

export default Register;
