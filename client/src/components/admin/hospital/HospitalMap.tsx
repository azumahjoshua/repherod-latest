"use client"
import React, { useEffect, useRef, useState } from 'react';
import { LatLong } from '@/types/place';
import { useJsApiLoader } from '@react-google-maps/api';
import { Library } from '@googlemaps/js-api-loader';

const libs: Library[] = ['core', 'places', 'maps', 'marker'];

interface HospitalMapProps {
  latlong: LatLong;
}

const HospitalMap: React.FC<HospitalMapProps> = ({ latlong }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries: libs,
  });
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded) {
      const mapOptions = {
        center: {
          lat: latlong.coordinates[0],
          lng: latlong.coordinates[1],
        },
        zoom: 17,
        mapId: 'abb2bfcb30448377',
      };
      const gMap = new google.maps.Map(mapRef.current as HTMLDivElement, mapOptions);
      setMap(gMap);
    }
  }, [isLoaded, latlong]);

  return (
    <div ref={mapRef} className="rounded-lg overflow-hidden shadow h-[500px] md:w-[700px]" />
  );
};

export default HospitalMap;
