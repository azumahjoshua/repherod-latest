"use client"
import React, {ChangeEvent, useState,FormEvent} from 'react'
import Link from 'next/link'
interface FormData {
    email:string;
    password:string;
}
interface FormProps{
  onsubmit: (e: FormEvent<HTMLFormElement>) => void;
}
const Loginform: React.FC<FormProps> = ({ onsubmit }) => {
    const [formData,setFormData] = useState<FormData>({
        email:"",
        password:""
    })
    const handleChange = (event:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
          // console.log(formData);
    }
  
  return (
        <form onSubmit={onsubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor='email' className="block text-gray-700">Email</label>
            <input type="email" name='email' value={formData.email} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div className="mb-4 relative">
            <label htmlFor='password' className="block text-gray-700">Password</label>
            <input type='password' name="password" value={formData.password} onChange={handleChange} className="mt-1 p-2 pr-10 w-full border rounded-md" />
            <div className="forgot-password text-right text-blue-500 ">
              <Link className='' href="/forgotpassword">Forgot Password ?</Link>
            </div>
          </div>
          <button type='submit' className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">Log in</button>
        </form>
  )
}

export default Loginform