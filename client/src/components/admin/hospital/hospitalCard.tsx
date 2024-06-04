"use client";
import React, { useState, useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

interface Hospital {
  id:string,
  hospitalName: string;
  location: string;
  contactInfo: string;
  email: string;
}

const HospitalCard = () => {
  const [hospitalData, setHospitalData] = useState<Hospital[]>([]);

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/hospital/`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setHospitalData(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching hospital data:', error);
      }
    };

    fetchHospitalData();
  }, []);

  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            #
          </th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Hospital
          </th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Location
          </th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Contact
          </th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {hospitalData.map((hospital, index) => (
          <tr key={index} >
            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap">{hospital.hospitalName}</td>
            <td className="px-6 py-4 whitespace-nowrap">{hospital.location}</td>
            <td className="px-6 py-4 whitespace-nowrap">{hospital.contactInfo}</td>
            <td className="px-6 py-4 whitespace-nowrap">{hospital.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex space-x-4">
                <CgProfile />
                <FaRegEdit />
                <MdDeleteForever />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HospitalCard;

