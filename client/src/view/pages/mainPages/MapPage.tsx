import { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  const searchQuery = 'hadera';

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`https://my-project-server-drab.vercel.app/serpapi-locations?search=${searchQuery}`);
      console.log('Locations:', response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  // Call the fetchLocations function when your component mounts or as needed
  // For example:
  useEffect(() => {
    fetchLocations();
  }, []);
;

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={12}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.latitude, lng: location.longitude }}
              title={location.title}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapContainer;
