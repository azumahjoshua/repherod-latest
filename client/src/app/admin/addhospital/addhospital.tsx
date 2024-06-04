import AddHospitalForm from '@/components/admin/hospital/addhospitalform'
import React from 'react'

const Addhospital=()=> {
  return (
    <div className=''>
      <AddHospitalForm latlong={{ coordinates: [5.614818, -0.205874] }} />
    </div>
  )
}

export default Addhospital