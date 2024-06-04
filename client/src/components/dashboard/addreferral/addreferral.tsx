"use client";
import React, { ChangeEvent, useState } from "react";
import { useSession } from "next-auth/react";

interface ReferralData {
  referralReason: string;
  referralDiagnosis: string;
  refType: string;
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  oxygenSaturation: string;
}

interface PatientData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  contactInfo: string;
  gender: string;
  nhis: string;
}

const ReferralForm: React.FC = () => {
  const { data: session } = useSession();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/referral/addreferral`;
  const [message, setMessage] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [referralData, setReferralData] = useState<ReferralData>({
    referralReason: "",
    referralDiagnosis: "",
    refType: "",
    temperature: "",
    bloodPressure: "",
    heartRate: "",
    oxygenSaturation: "",
  });
  const [patientData, setPatientData] = useState<PatientData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    contactInfo: "",
    gender: "",
    nhis: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    type: "referral" | "patient"
  ) => {
    const { name, value } = event.target;
    if (type === "referral") {
      setReferralData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setPatientData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("referralData", JSON.stringify(referralData));
    formData.append("patientData", JSON.stringify(patientData));
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        setMessage("Error creating referral.");
        console.error("Error creating referral:", await response.text());
        return;
      }

      const data = await response.json();
      setMessage("Referral created successfully.");
      console.log("Referral created successfully:", data);
    } catch (error) {
      setMessage("Error creating referral.");
      console.error("Error creating referral:", error);
    }
  };

  return (
    <div className="md:w-3/4 lg:w-full">
      <h2 className="text-xl font-light mb-4">
        Fill information below to provide patient information
      </h2>
      {message && (
        <div className={`mb-4 p-4 rounded ${message.startsWith("Error") ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
          {message}
        </div>
      )}
      <form className="shadow p-6 rounded-lg" onSubmit={handleSubmit}>
        {/* Patient Information Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-light mb-4">Patient Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="input-field"
                value={patientData.firstName}
                onChange={(e) => handleChange(e, "patient")}
                placeholder="Enter First Name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="input-field"
                value={patientData.lastName}
                onChange={(e) => handleChange(e, "patient")}
                placeholder="Enter Last Name"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="input-field"
                value={patientData.dateOfBirth}
                onChange={(e) => handleChange(e, "patient")}
              />
            </div>
            <div>
              <label htmlFor="contactInfo" className="block text-gray-700">
                Contact Info
              </label>
              <input
                type="tel"
                id="contactInfo"
                name="contactInfo"
                className="input-field"
                value={patientData.contactInfo}
                onChange={(e) => handleChange(e, "patient")}
                placeholder="(+233) 50123456"
              />
            </div>
            <div>
              <label htmlFor="nhis" className="block text-gray-700">
                NHIS
              </label>
              <input
                type="text"
                id="nhis"
                name="nhis"
                className="input-field"
                value={patientData.nhis}
                onChange={(e) => handleChange(e, "patient")}
                placeholder="Enter NHIS Number"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="input-field"
                value={patientData.gender}
                onChange={(e) => handleChange(e, "patient")}
              >
                <option value="" disabled hidden>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Referral Information Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-light mb-4">Referral Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="referralReason" className="block text-gray-700">
                Referral Reason
              </label>
              <textarea
                id="referralReason"
                name="referralReason"
                className="input-field"
                value={referralData.referralReason}
                onChange={(e) => handleChange(e, "referral")}
                rows={4}
                placeholder="Enter Referral Reason"
              />
            </div>
            <div>
              <label htmlFor="referralDiagnosis" className="block text-gray-700">
                Referral Diagnosis
              </label>
              <textarea
                id="referralDiagnosis"
                name="referralDiagnosis"
                className="input-field"
                value={referralData.referralDiagnosis}
                onChange={(e) => handleChange(e, "referral")}
                rows={4}
                placeholder="Enter Referral Diagnosis"
              />
            </div>
            <div>
              <label htmlFor="refType" className="block text-gray-700">
                Referral Type
              </label>
              <select
                id="refType"
                name="refType"
                className="input-field"
                value={referralData.refType}
                onChange={(e) => handleChange(e, "referral")}
              >
                <option value="" disabled hidden>
                  Select Referral Type
                </option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </div>
            <div>
              <label htmlFor="temperature" className="block text-gray-700">
                Temperature (°C)
              </label>
              <input
                type="number"
                id="temperature"
                name="temperature"
                className="input-field"
                value={referralData.temperature}
                onChange={(e) => handleChange(e, "referral")}
                placeholder="Enter Temperature"
              />
            </div>
            <div>
              <label htmlFor="bloodPressure" className="block text-gray-700">
                Blood Pressure (mmHg)
              </label>
              <input
                type="text"
                id="bloodPressure"
                name="bloodPressure"
                className="input-field"
                value={referralData.bloodPressure}
                onChange={(e) => handleChange(e, "referral")}
                placeholder="Enter Blood Pressure"
              />
            </div>
            <div>
              <label htmlFor="heartRate" className="block text-gray-700">
                Heart Rate (bpm)
              </label>
              <input
                type="number"
                id="heartRate"
                name="heartRate"
                className="input-field"
                value={referralData.heartRate}
                onChange={(e) => handleChange(e, "referral")}
                placeholder="Enter Heart Rate"
              />
            </div>
            <div>
              <label htmlFor="oxygenSaturation" className="block text-gray-700">
                Oxygen Saturation (%)
              </label>
              <input
                type="number"
                id="oxygenSaturation"
                name="oxygenSaturation"
                className="input-field"
                value={referralData.oxygenSaturation}
                onChange={(e) => handleChange(e, "referral")}
                placeholder="Enter Oxygen Saturation"
              />
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-light mb-4">File Upload</h2>
          <div>
            <label htmlFor="refDocs" className="block text-gray-700">
              Upload Referral Document
            </label>
            <input
              type="file"
              id="refDocs"
              name="refDocs"
              className="input-field"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-8"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReferralForm;
