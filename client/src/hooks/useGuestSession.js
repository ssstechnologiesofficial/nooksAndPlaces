import { useEffect } from "react";
import axios from "axios";

const useGuestSession = () => {
  useEffect(() => {
    const guestToken = localStorage.getItem("guest_token");
    const authToken = localStorage.getItem("token");

    // Only fetch guest session if user is not logged in and no guest token exists
    if (!authToken && !guestToken) {
      axios
        .get("http://localhost:5000/api/create-session", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("guest_token", res.data.token);
            console.log("Guest session token created:", res.data.token);
          }
        })
        .catch((err) => {
          console.error("Failed to create guest session", err);
        });
    } else if (guestToken) {
      console.log("Existing guest session:", guestToken);
    }
  }, []);
};

export default useGuestSession;
