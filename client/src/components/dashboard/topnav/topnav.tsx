"use client";
import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";
const Topnav = () => {
  const [activeTab, setActiveTab] = useState("referrals");
  const [isOpen, setIsOpen] = useState(false);
  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };
  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items center mb-4">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0">Referrals</h2>
        <div className="hidden md:flex space-x-4">
        <Link href="/dashboard/referrals">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "referrals"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleTabChange("referrals")}
          >
            Referrals
          </button>
        </Link>
        <Link href='/dashboard/referred'>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "referred"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("referred")}
        >
          Referred
        </button>
        
        </Link>
      </div>
        <Link href={"/dashboard/addreferral"}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Referral
          </button>
        </Link>
      </div>
      <div className="relative mb-6">
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full text-left"
          >
            {activeTab == "referrals" ? "Referrals" : "Referred"}
            <IoMdArrowDropdown className="w-5 h-5 ml-2" />
          </button>
        </div>
        {isOpen && (
          <div className="absolute mt-2 w-full bg-white border rounded shadow-md z-10">
            {/* <Link>
              </Link> */}
            <button
              className={`block w-full px-4 py-2 text-left ${
                activeTab === "referrals"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              }`}
              onClick={() => handleTabChange("referrals")}
            >
              Referrals
            </button>
            <button
              className={`block w-full px-4 py-2 text-left ${
                activeTab === "referrals"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              }`}
              onClick={() => handleTabChange("referred")}
            >
              Referred
            </button>
          </div>
        )}
      </div>
     
    </div>
  );
};

export default Topnav;
