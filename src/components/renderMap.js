import React, { useRef, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import locIcon from "../images/icon-location.svg";

let DefaultIcon = L.icon({
  iconUrl: locIcon,
  iconSize: [38, 47],
  iconAnchor: [19, 47],
  popupAnchor: [0, -47],
  tooltipAnchor: [0, 0],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function SimpleMap({ mapLocation }) {

  const mapRef = useRef(null);
  const latitude = mapLocation ? mapLocation.lat : 0;
  const longitude = mapLocation ? mapLocation.lng : 0;

  const MapFly = () => {
    const map = useMap();
    const flyTo = useCallback((location) => {
      map.flyTo(location, 15)
    }, [map]);
    //Earth
    // const flyToCenter = useCallback((location) => {
    //   map.flyTo(location, 15)
    // }, [map]);
    useEffect(() => {
      flyTo([latitude, longitude]);
  }, [flyTo])
    
  return null;
  }

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      ref={mapRef}
      className="h-screen w-full z-0"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://mapbox.com/">Mapbox</a> contributors'
        url={`https://api.mapbox.com/styles/v1/splmdny/clpeebszl00dr01pkcr5lecad/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_TOKEN}`}
      />
      <MapFly />
      <ZoomControl position="bottomleft" />
      { mapLocation && (
      <Marker position={[latitude, longitude]}>
        <Popup className="font-rubik font-normal">
          Your desired IP address location
        </Popup>
      </Marker> )}
    </MapContainer>
  );
}
