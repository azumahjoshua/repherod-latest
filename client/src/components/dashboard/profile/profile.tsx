"use client"
import { BiEdit,BiAddToQueue, BiMinusBack, BiEditAlt} from 'react-icons/bi'
import React from 'react'

const Profile = () => {
  return (
    <div className='md:ml-[20px] md:flex md:flex-row'>
    <div className='flex flex-col  justify-center items-center' >
        {/* <Image className='rounded-full'src="/image/V1.jpeg" width={300} height={10}  alt='profileImage'/> */}
        <h1>Yaa Ama</h1>
        <p className='font-thin'>contact@gmail.com</p>
    </div>
  <div className='md:ml-[20px] md:flex md:flex-col'>
    <div className='flex flex-col py-5 px-5 md:pt-5 md:ml-10 md:w-[800px] mb-[30px]  shadow-md h-[280px] w-full'>
      <div>
        <div className='flex justify-between'>
          <h1>Personal Inforamation</h1>
          <button className='flex flex-row w-20 h-10 justify-center items-center space-x-1 border-2 rounded px-1'>
            <BiEditAlt className='h-3 w-3'/> 
              <span>Edit</span>
          </button>
        </div>
        <div className='flex flex-row mt-4 mb-4 gap-10'>
          <div>
            <h1 className='font-thin'>First Name</h1>
            <p >KATH Adum</p>
          </div>
          <div>
            <h1 className='font-thin'>Last Name</h1>
            <p >KATH Adum</p>
          </div>
        </div>
        <div>
          <h1 className='font-thin'>Email</h1>
          <p>contact@gmail.com</p>
        </div> 
      </div>
    </div>
    <div className='flex flex-col px-5 md:ml-10 md:w-[800px] mb-[20px] shadow-md h-full py-5 w-full'>
      <div>
        <div className='flex justify-between'>
          <h1>Hospital Information</h1>
          <button className='flex flex-row w-20 h-10 justify-center items-center space-x-1 border-2 rounded px-1'>
            <BiEditAlt  className='h-3 w-3'/> 
              <span>Edit</span>
          </button>
        </div>
        <div>
          <h1 className='font-thin'>Current Hopsital</h1>
          <p>KATH,Adum</p>
        </div>
        <div>
          <h1 className='font-thin'>Departmens</h1>
          <p>Children Ward</p>
        </div>
        <div>
          <h1 className='font-thin'>Speciality</h1>
          <p>Neurologist</p>
        </div>
      </div>
    </div>
    <div className='flex flex-col px-2 md:ml-10 md:w-[800px] mb-[20px] shadow-md h-full py-5 w-full'>
      <div>
          <h1>Password</h1>
          <button className='flex flex-row w-40 h-10 justify-center items-center space-x-1 border-2 rounded px-1'>
            <BiMinusBack  className='h-3 w-3'/> 
              <span>Change Password</span>
          </button>
      </div>
    </div>
    
  </div>
</div>
  )
}

export default Profile