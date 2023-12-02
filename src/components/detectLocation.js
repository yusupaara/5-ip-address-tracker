import React, { useState } from "react";
import axios from "axios";
import arrowicon from "../images/icon-arrow.svg";
import caretdown from "../images/caret-down-solid.svg";

export default function DetectLocation({ setMapLocation }) {
  const [ip, setIp] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [buttonActive, setButtonActive] = useState(false);
  const [ipV4Completed, setIpV4Completed] = useState(false);

  const [savedIp, setSavedIp] = useState("");
  const [location, setLocation] = useState("");
  const [isp, setIsp] = useState("");
  const [ipV4, setIpV4] = useState("");

  const config = {
    headers: {
      'Accept-Encoding': 'gzip, deflate, br'
    }
   };

  const onInputChange = (data) => {
    setIp(data.target.value);
    validateInput(data);
  };

  const validateInput = (e) => {
    const ipV4Regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
    const ipV6Regex = /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/i;
    let { value } = e.target;

    if (value.match(ipV4Regex)) {
      setIsValid(true);
      setButtonActive(true);
      setIpV4(true);
    } else if (value.match(ipV6Regex)) {
      setIsValid(true);
      setButtonActive(true);
      setIpV4(false);
    } else if (value === "") {
      setIsValid(true);
      setButtonActive(false);
    } else {
      setIsValid(false);
      setButtonActive(false);
    }
  };

  const proceedInput = () => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_KEY_APIFY}&ipAddress=${ip}`, config
      )
      .then((response) => {
        setSavedIp(response.data.ip);
        setLocation(response.data.location);
        setMapLocation(response.data.location);
        setIsp(response.data.isp);
        if (ipV4) {
          setIpV4Completed(true);
        } else {
          setIpV4Completed(false);
        }
        console.log(ipV4, ipV4Completed);
      })
      .catch((error) => {
        console.error("Failed to fetch location data:", error);
      });
  };

  return (
    <div className="flex flex-col items-center text-default font-rubik font-normal space-y-6 p-6 bg-dekstop max-h-60 bg-cover bg-repeat animate-linear-background-sm md:animate-linear-background-md lg:animate-linear-background-lg xl:animate-linear-background-xl">
      <div className="pt-3 text-2xl text-white">IP Address Tracker</div>
      <div className="flex w-full max-w-xl font-thin">
        <input
          type="text"
          className="rounded-l-xl w-full h-12 placeholder-primary-dark focus:ring-0 focus:ring-offset-0 focus:outline-none pl-6"
          placeholder="Search for any IP address or domain"
          onChange={onInputChange}
        />
        {!isValid && (
          <div className="absolute h-12 flex items-center translate-y-10 pl-6 text-red-400 text-sm">
            (&#9747;) IP Address format invalid
          </div>
        )}
        <button
          className="default-action"
          disabled={!buttonActive}
          onClick={() => {
            proceedInput();
          }}
        >
          <img src={arrowicon} alt="arrow" className="h-3 w-3" />
        </button>
      </div>

      <div className="flex flex-col bg-white translate-y-7 text-xl rounded-xl shadow-xl w-full xs:w-auto max-w-4xl z-10 leading-none">
        <div className="flex flex-col px-10 pt-10 w-full xs:flex-row divide-y space-y-5 xs:divide-y-0 xs:space-y-0 xs:divide-x xs:space-x-5">
          <div className="flex flex-col md:flex-row divide-y space-y-5 md:divide-y-0 md:space-y-0 md:divide-x md:space-x-5">
            <div className="px-4 space-y-2 break-all">
              <div className="text-xs text-primary-dark ">IP ADDRESS</div>
              <div>
                {savedIp ? (
                  <>
                    {savedIp}
                    {"  "}
                    <span
                      className={`${
                        ipV4Completed
                          ? "text-green-600 border-green-500"
                          : "text-orange-600 border-orange-500"
                      } text-xs font-thin border-2 border-solid px-1 break-normal rounded-md`}
                    >
                      {`${ipV4Completed ? "IPv4" : "IPv6"}`}{" "}
                    </span>
                  </>
                ) : (
                  "-"
                )}
              </div>
            </div>
            <div className="pl-4 pt-4 md:pt-0 space-y-2">
              <div className="text-xs text-primary-dark">LOCATION</div>
              <div>
                {location.region
                  ? `${location.region}, ${location.country} ${location.postalCode}`
                  : "-"}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row divide-y space-y-5 md:divide-y-0 md:space-y-0 md:divide-x md:space-x-5 xs:pl-5 md:pl-0 pt-4 xs:pt-0">
            <div className="pl-4 space-y-2">
              <div className="text-xs text-primary-dark">TIMEZONE</div>
              <div>{location.timezone ? `UTC ${location.timezone}` : "-"}</div>
            </div>
            <div className="px-4 pt-4 md:pt-0 space-y-2">
              <div className="text-xs text-primary-dark">ISP</div>
              <div>{isp ? isp : "-"}</div>
            </div>
          </div>
        </div>
        <div className="flex pt-5 pb-5 justify-center">
          {location && (
          <img src={caretdown} alt="map on below" className="h-5 w-5 animate-bounce" /> )}
        </div>
      </div>
    </div>
  );
}
