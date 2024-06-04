"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  contactInfo: string;
  password: string;
  confirmPassword: string;
  roleName: string;
}

const Registerform = () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/user/register/`;
  const hospitalUrl = `${process.env.NEXT_PUBLIC_API_URL}/hospital/`;
  const router = useRouter();
  const [hospitalName,setHopitalName] = useState<string[]>([])

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    contactInfo: "",
    confirmPassword: "",
    password: "",
    roleName: "",
  });
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const allHospital = async()=>{
    try {
      const response = await fetch(hospitalUrl,{
        method:"GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      if(response.ok){
        const data = await response.json();
        const hospitalName = data.map((hospital:any)=>hospital.hospitalName)
        setHopitalName(hospitalName)
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  }
  useEffect(()=>{
    allHospital();
  })
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    setPasswordMatchError(false);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          contactInfo: formData.contactInfo,
          email: formData.email,
          password: formData.password,
          roleName: formData.roleName,
          hospitalName: hospitalName
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        router.push("/login");
      } else {
        console.log("Error during API call:", "Something went wrong");
        router.push("/register");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4 flex space-x-4">
        <div>
          <label htmlFor="firstName" className="block text-gray-700">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={handleChange}
            placeholder="Enter your first name"
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-gray-700">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={handleChange}
            placeholder="Enter your last name"
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Enter your email address"
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contactInfo" className="block text-gray-700">
          Contact Info
        </label>
        <input
          id="contactInfo"
          name="contactInfo"
          type="tel"
          pattern="\+?[0-9]{10,}"
          onChange={handleChange}
          placeholder="(050)1234567"
          title="Enter a valid contact number with 10 digits"
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="roleName" className="block text-gray-700">
          Choose Role
        </label>
        <select
          id="roleName"
          name="roleName"
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          defaultValue=""
          required
        >
          <option value="" disabled hidden>
            Choose Role
          </option>
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="midwife">Mid Wife</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="hospitalName" className="block text-gray-700">
          Choose Hospital
        </label>
        <select name="hospitalName" id="hospialName"
        onChange={handleChange}
        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          defaultValue=""
          required
        >
          <option value="" disabled hidden>Choose Hospital</option>
          {
            hospitalName.map((name)=>(
              <option key={name} value={name}>{name}</option>
            ))
          }
        </select>

      </div>
      {passwordMatchError && (
        <div className="text-red-500 mb-4">Passwords do not match.</div>
      )}
      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Enter your password"
          className="mt-1 p-2 pr-10 w-full border rounded-md"
          required
        />
      </div>
      <div className="mb-4 relative">
        <label htmlFor="confirmPassword" className="block text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={handleChange}
          placeholder="Confirm your password"
          className="mt-1 p-2 pr-10 w-full border rounded-md"
          required
        />
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
        Register
      </button>
    </form>
  );
};

export default Registerform;
