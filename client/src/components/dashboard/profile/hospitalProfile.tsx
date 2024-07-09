"use client";
import React, { useState, useEffect } from 'react';
import { BiEditAlt, BiMinusBack } from 'react-icons/bi';

interface Hospital {
  id: string;
  hospitalName: string;
  location: string;
  contactInfo: string;
  email: string;
  specialties: string[];
  bedCapacity: number;
  availableBeds: number;
  emergencyServices: boolean;
  patientReviews: { rating: number; comment: string }[];
  accreditations: string[];
  insurancePartnerships: string[];
  physicianProfiles: { name: string; specialty: string }[];
  facilityAmenities: string[];
  technologicalCapabilities: string[];
  languagesSpoken: string[];
  collaborations: string[];
  outpatientServices: string[];
}

const dummyHospitalData: Hospital = {
  id: "1",
  hospitalName: "Dummy Hospital",
  location: "123 Main St, Springfield",
  contactInfo: "555-1234",
  email: "info@dummyhospital.com",
  specialties: ["Cardiology", "Neurology", "Orthopedics"],
  bedCapacity: 200,
  availableBeds: 50,
  emergencyServices: true,
  patientReviews: [
    { rating: 5, comment: "Excellent care and service." },
    { rating: 4, comment: "Good experience overall." },
  ],
  accreditations: ["Joint Commission", "ISO 9001"],
  insurancePartnerships: ["HealthPlus", "Medicare"],
  physicianProfiles: [
    { name: "Dr. John Doe", specialty: "Cardiology" },
    { name: "Dr. Jane Smith", specialty: "Neurology" },
  ],
  facilityAmenities: ["Cafeteria", "Parking", "Pharmacy"],
  technologicalCapabilities: ["MRI", "CT Scan", "Robotic Surgery"],
  languagesSpoken: ["English", "Spanish", "French"],
  collaborations: ["University Hospital", "City Clinic"],
  outpatientServices: ["Physical Therapy", "Lab Services", "Radiology"],
};

const HospitalProfile = () => {
  const [hospital, setHospital] = useState<Hospital | null>(null);

  useEffect(() => {
    // Simulate fetching hospital data with dummy data
    setHospital(dummyHospitalData);
  }, []);

  if (!hospital) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full md:ml-5 md:flex md:flex-row'>
      <div className='flex flex-col justify-center items-center'>
        <h1>{hospital.hospitalName}</h1>
        <p className='font-thin'>{hospital.email}</p>
      </div>
      <div className='md:ml-5 md:flex md:flex-col'>
        <div className='flex flex-col py-5 px-5 md:pt-5 md:w-[800px] mb-5 shadow-md w-full'>
          <div className='h-full'>
            <div className='flex justify-between'>
              <h1>Hospital Information</h1>
              <button className='flex flex-row w-20 h-10 justify-center items-center space-x-1 border-2 rounded px-1'>
                <BiEditAlt className='h-3 w-3' />
                <span>Edit</span>
              </button>
            </div>
            <div className='flex flex-col mt-4 gap-4'>
              <div>
                <h1 className='font-thin'>Location</h1>
                <p>{hospital.location}</p>
              </div>
              <div>
                <h1 className='font-thin'>Contact Info</h1>
                <p>{hospital.contactInfo}</p>
              </div>
              <div>
                <h1 className='font-thin'>Specialties</h1>
                <p>{hospital.specialties.join(', ')}</p>
              </div>
              <div>
                <h1 className='font-thin'>Bed Capacity</h1>
                <p>{hospital.bedCapacity}</p>
              </div>
              <div>
                <h1 className='font-thin'>Available Beds</h1>
                <p>{hospital.availableBeds}</p>
              </div>
              <div>
                <h1 className='font-thin'>Emergency Services</h1>
                <p>{hospital.emergencyServices ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col px-5 md:w-[800px] mb-5 shadow-md w-full py-5'>
          <div>
            <div className='flex justify-between'>
              <h1>Additional Information</h1>
              <button className='flex flex-row w-20 h-10 justify-center items-center space-x-1 border-2 rounded px-1'>
                <BiEditAlt className='h-3 w-3' />
                <span>Edit</span>
              </button>
            </div>
            <div className='flex flex-col mt-4 gap-4'>
              <div>
                <h1 className='font-thin'>Accreditations</h1>
                <p>{hospital.accreditations.join(', ')}</p>
              </div>
              <div>
                <h1 className='font-thin'>Insurance Partnerships</h1>
                <p>{hospital.insurancePartnerships.join(', ')}</p>
              </div>
              <div>
                <h1 className='font-thin'>Physician Profiles</h1>
                <ul>
                  {hospital.physicianProfiles.map((physician, index) => (
                    <li key={index}>
                      {physician.name} - {physician.specialty}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h1 className='font-thin'>Facility Amenities</h1>
                <p>{hospital.facilityAmenities.join(', ')}</p>
              </div>
              <div>
                <h1 className='font-thin'>Technological Capabilities</h1>
                <p>{hospital.technologicalCapabilities.join(', ')}</p>
              </div>
              <div>
                <h1 className='font-thin'>Languages Spoken</h1>
                <p>{hospital.languagesSpoken.join(', ')}</p>
              </div>
              <div>
                <h1 className='font-thin'>Collaborations</h1>
                <p>{hospital.collaborations.join(', ')}</p>
              </div>
              <div>
                <h1 className='font-thin'>Outpatient Services</h1>
                <p>{hospital.outpatientServices.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalProfile;
