"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { LatLong } from "@/types/place";
import { useJsApiLoader } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader";

const libs: Library[] = ["core", "places", "maps", "marker"];
interface FormData {
  // hospitalName: string;
  email: string;
  contactInfo: string;
  // location: string;
}
const AddHospitalForm = ({ latlong }: { latlong: LatLong }) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/hospital/`;
  const [formData, setFormData] = useState<FormData>({
    // hospitalName: "",
    email: "",
    contactInfo: "",
    // location: "",
  });
  const [hospitalName, setHospitalName] = useState<string | null>(null);
  // const [email, setEmail] = useState<string | null>(null);;
  // const [contactInfo, setContactInfo] = useState<string | null>(null);;
  const [location, setLocation] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [lng, setLng] = useState<number | null>(0);
  const [lat, setLat] = useState<number | null>(0);
  // const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries: libs,
  });
  const mapRef = useRef<HTMLDivElement>(null);
  const placeAutoCompleteRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isLoaded) {
      const mapOptions = {
        center: {
          lat: latlong.coordinates[0],
          lng: latlong.coordinates[1],
        },
        zoom: 17,
        mapId: "abb2bfcb30448377",
      };
      const gMap = new google.maps.Map(
        mapRef.current as HTMLDivElement,
        mapOptions
      );
      const mapBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(5.283297, -2.713967), // southwest
        new google.maps.LatLng(11.053254, -0.114788) // northeast
      );
      // setup autocomplete
      const gAutoComplete = new google.maps.places.Autocomplete(
        placeAutoCompleteRef.current as HTMLInputElement,
        {
          bounds: mapBounds,
          fields: ["formatted_address", "geometry", "name"],
          componentRestrictions: {
            country: ["GH"],
          },
        }
      );
      setAutoComplete(gAutoComplete);
      setMap(gMap);
    }
  }, [isLoaded, latlong]);
  useEffect(() => {
    if (autoComplete) {
      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        // setSelectedPlace(place.name as string);
        setLat(place.geometry?.location?.lat() as number);
        setLng(place.geometry?.location?.lng() as number);
        const postion = place.geometry?.location;
        // console.log(selectedPlace)
        setHospitalName(place.name as string);
        setLocation(place.formatted_address as string);
        console.log(`Address: ${place.formatted_address} Name:${place.name}`);
        if (postion) {
          setMarker(postion, place.name!);
        }
      });
    }
  });
  function setMarker(location: google.maps.LatLng, name: string) {
    if (!map) return;
    map.setCenter(location);

    const markerOptions = new google.maps.marker.AdvancedMarkerElement({
      map: map,
      position: location,
      title: "Marker",
    });
    markerOptions.addListener("click", () => {
      const markerPosition = markerOptions.position;
      // console.log(markerPosition?.lat)
      if (markerPosition) {
        const lat = markerPosition?.lat;
        const lng = markerPosition?.lng;
        console.log("Clicked Marker - Lat:", lat, "Lng:", lng);
      }
    });
  }
  const handleSumbit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormData({
      // hospitalName: event.currentTarget.hospitalName.value,
      email: event.currentTarget.email.value,
      contactInfo: event.currentTarget.contactInfo.value,
      // location: event.currentTarget.location.value,
    });
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          hospitalName: hospitalName,
          email: formData.email,
          contactInfo: formData.contactInfo,
          location: location,
          lat: lat,
          lng: lng,
          type: event.currentTarget.type.value,
          ownership: event.currentTarget.ownership.value,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      throw new Error("Failed to authenticate");
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-x-8">
      <div className="md:w-full">
        <h2 className="text-xl font-light mb-4">Add Hospital</h2>
        <form
          onSubmit={handleSumbit}
          className="bg-white shadow p-6 rounded-lg"
        >
          <h2 className="text-xl font-light mb-4">Hospital Information</h2>
          <div className="mb-4">
            <label htmlFor="hospitalName" className="block text-gray-700">
              Hospital Name
            </label>
            <input
              ref={placeAutoCompleteRef}
              type="text"
              name="hospialName"
              // value={location}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter a Hospital Name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter Email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactInfo" className="block text-gray-700">
              Contact Info
            </label>
            <input
              type="tel"
              name="contactInfo"
              value={formData.contactInfo}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter Contact Info"
              onChange={handleChange}
            />
          </div>
          {/* <input type="hidden" name="accountType" value="hospital" /> */}
          {/* <div className="mb-4">
            <label htmlFor="hospitalName" className="block text-gray-700">
              Hospital Name
            </label>
            <input
              ref={placeAutoCompleteRef}
              type="text"
              name="hospialName"
              // value={location}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter a Hospital Name"
              onChange={handleChange}
            />
          </div> */}
          <div className="mb-4">
            <select
              name="type"
              className="block w-full bg-white border rounded border-gray-300 py-2 pl-2"
              id="htype"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Type
              </option>
              <option value="Clinic">Clinic</option>
              <option value="Health Centre">Health Centre</option>
              <option value="Maternity Home">Maternity Home</option>
              <option value="CHPS">CHPS</option>
              <option value="Hospital">Hospital</option>
              <option value="District Hospital">District Hospital</option>
              <option value="Centre">Centre</option>
              <option value="RCH">RCH</option>
              <option value="Training Institution">Training Institution</option>
              <option value="Municipal Health Directorate">
                Municipal Health Directorate
              </option>
              <option value="Teaching Hospital">Teaching Hospital</option>
              <option value="Regional Hospital">Regional Hospital</option>
              <option value="CPHS">CPHS</option>
              <option value="District Health Directorate">
                District Health Directorate
              </option>
              <option value="Regional Health Directorate">
                Regional Health Directorate
              </option>
              <option value="Polyclinic">Polyclinic</option>
              <option value="Municipal Hospital">Municipal Hospital</option>
              <option value="Municipal Health Directorate">
                Municipal Health Directorate
              </option>
              <option value="Metropolitan Hospital">
                Metropolitan Hospital
              </option>
              <option value="Metropolitan Health Directorate">
                Metropolitan Health Directorate
              </option>
              <option value="DHD">DHD</option>
              <option value="Psychiatric Hospital">Psychiatric Hospital</option>
              <option value="Research Institution">Research Institution</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              name="ownership"
              className="block w-full bg-white border rounded border-gray-300 py-2 pl-2"
              id="htype"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Ownership
              </option>
              <option value="CHAG">
                CHAG (Christian Health Association of Ghana)
              </option>
              <option value="Private">Private</option>
              <option value="Government">Government</option>
              <option value="Quasi-Government">Quasi-Government</option>
              <option value="Islamic">Islamic</option>
              <option value="Muslim">Muslim</option>
              <option value="Maternity Home">Maternity Home</option>
              <option value="Clinic">Clinic</option>
              <option value="NGO">NGO</option>
              <option value="Mission">Mission</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
          >
            Add Hospital
          </button>
        </form>
      </div>

      <div className="md:w-full">
        <div
          ref={mapRef}
          className="rounded-lg overflow-hidden shadow h-[500px] md:w-[700px]"
        />
        {isLoaded ? null : (
          <p className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-75">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};
export default AddHospitalForm;
