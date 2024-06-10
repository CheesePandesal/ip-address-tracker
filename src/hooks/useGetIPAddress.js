import { useEffect, useState } from "react";

export const useGetIPAddress = () => {
  const [ipAddress, setIPAddress] = useState("");
  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        setIPAddress(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIPAddress();
  }, []);
  return { ipAddress };
};
