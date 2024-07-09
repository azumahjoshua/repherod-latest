import React from 'react'

import { FaRegHospital, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';

const ReferralItem = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white shadow rounded mb-4">
      <div className="flex items-center space-x-4">
        {/* <img src={referral.photo} alt="Patient" className="w-12 h-12 rounded-full" /> */}
        <div>
          <h3 className="text-lg font-semibold">Name Of Paitient</h3>
          <p className="text-gray-500">Ama Mensah</p>
          <div className="flex items-center space-x-2 text-gray-500">
            <FaRegHospital />
            <p>AGA Health Foundation</p>
          </div>
        </div>
      </div>
      <div className="mt-4 md:mt-0 text-right">
        <div className="flex items-center space-x-2 text-gray-500">
          <FaRegClock />
          <p>Referral Status: Pending</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <FaRegCalendarAlt />
          <p>05:05:2009 16:42PM</p>
        </div>
        <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition">
          See Details
        </button>
      </div>
    </div>
  );
};

export default ReferralItem;
