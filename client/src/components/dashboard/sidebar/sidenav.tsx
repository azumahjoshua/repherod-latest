"use client";
import Link from "next/link";
import Image from "next/image";
import { PiPower } from "react-icons/pi";
import NavLinks from "../links/links";
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import SignOut from "@/components/signOut";
const SideNav = () => {
  
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 border-r-2 md:h-screen md:w-[180px]">
      <Link href="/" className="text-blue-500 flex items-center space-x-2">
        <Image src="/rephrod.png" alt="Repherod" width={40} height={40} />
        <span className="md:hidden">Repherod</span>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 mt-4 md:flex-col md:mt-[180px] md:space-x-0 md:block ">
        <NavLinks />
       <SignOut/>
      </div>
    </div>
  );
};

export default SideNav;
