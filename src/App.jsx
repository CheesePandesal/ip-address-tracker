import ArrowLine from "./components/ArrowLine";

import bg from "./images/pattern-bg-desktop.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import iconLocation from "./images/icon-location.svg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";

// create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: iconLocation,
  iconSize: [38, 50], // size of the icon
});
export default function App() {
  const [ipAddress, setIPAddress] = useState("");
  const [geoLocation, setGeoLocation] = useState();
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let geoLocationResponse = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_aBZL5taTJVMVlyZsX6P0r5nImY0T8&ipAddress=${inputValue}`
      );
      console.log(ipAddress);
      setGeoLocation(geoLocationResponse.data);
      console.log(geoLocation);
    } catch (error) {
      console.error("Error fetching IP address:", error);
    }
  };
  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        setIPAddress(response.data.ip);
        console.log(response);
        let geoLocationResponse = await axios.get(
          `https://geo.ipify.org/api/v2/country,city?apiKey=at_aBZL5taTJVMVlyZsX6P0r5nImY0T8&ipAddress=${ipAddress}`
        );

        console.log(ipAddress);
        setGeoLocation(geoLocationResponse.data);
        console.log(geoLocation);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIPAddress();
  }, []);

  return (
    <>
      {geoLocation ? (
        <div className="relative">
          <div
            className="w-screen min-h-[340px] flex items-center justify-center bg-cover relative"
            style={{
              backgroundImage: `url(${bg})`,
            }}
          >
            <div className="text-center">
              <h1 className="uppercase text-white text-3xl font-bold mb-8">
                IP Address Tracker
              </h1>
              <form className="flex" onSubmit={handleSubmit}>
                <input
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded-tl-2xl rounded-bl-2xl py-4 px-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 font-semmibold"
                  id="exampleFormControlInput"
                  type="text"
                  placeholder="Enter your IP Address..."
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <button
                  className="py-4 bg-black px-6 rounded-tr-2xl rounded-br-2xl"
                  type="submit"
                >
                  <ArrowLine />
                </button>
              </form>
            </div>
            {/* <p>{ipAddress}</p> */}
            <div className="absolute bg-white bottom-[-12rem] lg:bottom-[-5rem] text-center min-w-80 py-4 rounded-3xl flex flex-col gap-2 lg:flex-row items-center lg:px-12 lg:py-8 lg:text-left z-50">
              <div className="lg:pr-12">
                <div className="lg:pb-2">
                  <small className="uppercase text-gray-500 font-black text-xs tracking-widest">
                    IP Address
                  </small>
                </div>
                <h5 className="text-black text-xl font-bold mt-1">
                  {geoLocation.ip}
                </h5>
              </div>

              <span className="hidden lg:block w-[1px] h-16 bg-gray-400 translate-y-[0.90rem]"></span>

              <div className="lg:pr-12 lg:pl-4">
                <div className="lg:pb-2">
                  <small className="uppercase text-gray-500 font-black text-xs tracking-widest">
                    Location
                  </small>
                </div>
                <h5 className="text-black text-xl font-bold mt-1">
                  {geoLocation.location.region}, {geoLocation.location.country}
                  <br />
                </h5>
              </div>

              <span className="hidden lg:block w-[1px] h-16 bg-gray-400 translate-y-[0.90rem]"></span>
              <div className="lg:pr-12 lg:pl-4">
                <div className="lg:pb-2">
                  <small className="uppercase text-gray-500 font-black text-xs tracking-widest">
                    Timezone
                  </small>
                </div>
                <h5 className="text-black text-xl font-bold mt-1">
                  {geoLocation.location.timezone}
                </h5>
              </div>

              <span className="hidden lg:block w-[1px] h-16 bg-gray-400 translate-y-[0.90rem]"></span>
              <div className="lg:pr-12 lg:pl-4">
                <div className="lg:pb-2">
                  <small className="uppercase text-gray-500 font-black text-xs tracking-widest">
                    ISP
                  </small>
                </div>
                <h5 className="text-black text-xl font-bold mt-1">
                  {geoLocation.isp}
                </h5>
              </div>
            </div>
          </div>

          <div className="">
            <MapContainer
              center={[geoLocation.location.lat, geoLocation.location.lng]}
              zoom={40}
              zoomControl={false}
              style={{ height: "65vh", zIndex: 5 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[geoLocation.location.lat, geoLocation.location.lng]}
                icon={customIcon}
              ></Marker>
            </MapContainer>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-screen">
          <div class="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4">
            <div class="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
            <div class="flex flex-col gap-2">
              <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
              <div class="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
              <div class="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
              <div class="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
