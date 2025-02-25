import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogoutEverywhere = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");  
    window.location.reload(); // Refresh the page to apply logout
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Log Out Everywhere</h2>
        <p className="text-gray-600 mt-2">
          If you've lost a device or have security concerns, log out everywhere to ensure the security of your account.
        </p>
        <button
          onClick={handleLogoutEverywhere}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Log Out Everywhere
        </button>
      </div>
    </div>
  );
};

export default Settings;
