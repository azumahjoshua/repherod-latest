export interface LatLong {
  coordinates:number[]
  }

  export interface AddhospitalFormProps {
    defaultLatLong?: LatLong;
  }


  export interface Hospital {
    hospitalName: string;
    location: string;
    contactInfo: string;
    email: string;
  }
  