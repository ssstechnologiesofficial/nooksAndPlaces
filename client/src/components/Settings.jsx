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
    <div className="h-[450px] bg-gray-100 px-32 py-5 flex flex-col">
      <h1 className='text-lg font-semibold mb-4'>Settings</h1>
      <div className="grid grid-cols-2 gap-6 p-6">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Log Out Everywhere</h2>
          <p className="text-gray-600 mt-2">
            If you've lost a device or have security concerns, log out everywhere to ensure the security of your account.
          </p>
        </div>
        
        {/* Right Section */}
        <div className="flex flex-col items-start justify-center bg-white shadow-sm rounded-lg p-5">
          <button
            onClick={handleLogoutEverywhere}
            className="px-6 py-2 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-100 transition"
          >
            Log Out Everywhere
          </button>
          <p className="text-gray-600 mt-2">You will be logged out on this device as well.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;