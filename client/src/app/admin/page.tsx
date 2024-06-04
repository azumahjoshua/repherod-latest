import React from "react";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import HospitalCard from "@/components/admin/hospital/hospitalCard";

const page = () => {
  
  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-light mb-6">Hospital Page</h2>
      <div className="flex items-center mb-4 space-x-1 w-full">
        <select
          name="queryBy"
          className="block w-[40%] bg-white border rounded-l-md border-gray-300 py-2 pl-2"
          id="queryBy"
          defaultValue=""
        >
          <option value="" disabled hidden>
            Query By
          </option>
          <option value="location">Location</option>
          <option value="name">Name</option>
        </select>
        <div className="pointer-events-none bg-gray-500 py-3 px-3 flex items-center justify-center ">
          <IoSearch />
        </div>
        {/* <Link href={"/admin/addhospital/"}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 font-light">
            Add Hospital
          </button>
        </Link> */}
      </div>
      <div className="mt-10">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <HospitalCard/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
