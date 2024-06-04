"use client";
import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import Link from "next/link";
const Topnav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="md:px-10 md:flex md:flex-row items-center justify-between">
    <div className="flex flex-row items-center justify-between">
      <h1 className="text-3xl font-light">Referrals</h1>
      <div className="md:hidden">
        {isOpen ? (
          <IoCloseSharp onClick={toggleMenu} className="text-3xl cursor-pointer" />
        ) : (
          <FaBarsStaggered onClick={toggleMenu} className="text-3xl cursor-pointer" />
        )}
      </div>
    </div>
    <div className={`flex flex-col md:flex-row md:space-y-0 md:space-x-4 ${isOpen ? 'block mt-10' : 'hidden md:flex md:items-center md:justify-center'}`}>
      <Link href="/dashboard/addreferral">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-300">
          Add Referral
        </button>
      </Link>
      <button className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400 hover:text-white transition duration-300">
        Referral
      </button>
      <button className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400 hover:text-white transition duration-300">
        Referred
      </button>
    </div>
  </div>
  );
};

export default Topnav;
