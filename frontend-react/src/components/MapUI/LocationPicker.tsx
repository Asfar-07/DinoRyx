import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  type MapRef
} from "@/components/ui/map";
import { MapPin } from "lucide-react";
import { useState, useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";
import "./locationpicker.css";

type Location ={lng:number, lat:number};
type LocationPickerProps = {
  onSelect: (location: Location | null) => void;
  Selected: Location | null;
};

export default function LocationPicker({ onSelect , Selected } :LocationPickerProps) {
  const [marker, setMarker] = useState<Location>({
    lng: -73.98,
    lat: 40.75,
  });
  const [userPoint, setUserPoint] = useState<Location>({ lng: -73.98, lat: 40.75 });
  // const [selectMark, setSelectMark] = useState<Location | null>(null);
  const [loading, setLoading] = useState <boolean>(true);
  const [message, setMessage] = useState<String | null>(null);
  const [locked, setLocked] = useState <boolean>(true);
  const mapRef = useRef<MapRef>(null);

  const handleFlyTo = (lng : any, lat :any) => {
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 12 });
  };
  function getUserLocation() {
    if (!navigator.geolocation) {
      setMessage("Geolocation not supported");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMarker({
          lng: pos.coords.longitude,
          lat: pos.coords.latitude,
        });
        setUserPoint({
          lng: pos.coords.longitude,
          lat: pos.coords.latitude,
        });
        handleFlyTo(pos.coords.longitude,pos.coords.latitude)
        setLoading(false);
      },
      (err) => {
        setMessage(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  }

  return (
    <div>
      <div
        style={{
          height: "250px",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Map ref={mapRef} center={[userPoint.lng, userPoint.lat]} zoom={11}>
          <MapMarker
            draggable={locked}
            latitude={marker.lat}
            longitude={marker.lng}
            onDragEnd={(lngLat) =>
              setMarker({ lng: lngLat.lng, lat: lngLat.lat })
            }
          >
            <MarkerContent>
              <div className="cursor-move">
                <MapPin
                  className="fill-black stroke-white dark:fill-white"
                  size={28}
                />
              </div>
            </MarkerContent>
             <MarkerPopup>
              <div className="space-y-1">
                <p className="font-medium">Selected location</p>
                <p className="text-xs text-muted-foreground">
                  {marker.lat.toFixed(5)}, {marker.lng.toFixed(5)}
                </p>
              </div>
            </MarkerPopup>
          </MapMarker>
          <MapControls />
        </Map>
      </div>
      <div className="MapHelper flex flex-col gap-2 md:flex-row md:items-center md:justify-between px-3 py-2 mt-3">
        <div className="flex items-center gap-2 md:w-[30%]">
          <p className="text-sm whitespace-nowrap">Your Location:</p>
          <button
            className="flex items-center justify-center"
            onClick={getUserLocation}
          >
            <FaLocationDot />
          </button>
        </div>

        <ul className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm w-full md:w-auto">
          {/* <li>Lattitude: {marker.lat}</li>
    <li>Longitude: {marker.lng}</li> */}
          <li>{message}</li>
          <li className="flex gap-2">
            {Selected  != null ? (
              <button
                className="btn"
                onClick={() => {
                  onSelect(null);
                  setLocked(true);
                  setMessage("");
                }}
              >
                Change
              </button>
            ) : (
              <button
                className="btn"
                onClick={() => {
                  onSelect({ lng: marker.lng, lat: marker.lat });
                  setLocked(false);
                  setMessage("Selected Location");
                }}
              >
                Select
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
