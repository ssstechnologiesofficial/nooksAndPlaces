import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  // Send Email with 6-digit code
  const sendEmail = async () => {
    console.log(email)
    try {
      const response = await axios.post("http://localhost:5000/api/send-code", { email });
      if (response.data.success) {
        setShowCodeInput(true);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  // Verify Code
  const verifyCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/verify-code", { email, code });
      if (response.data.success) {
        setVerificationMessage("✅ Verification successful!");
      } else {
        setVerificationMessage("❌ Invalid code. Try again.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 w-[400px] rounded-lg mt-[-50px]">
        <h1 className="text-2xl font-bold text-center text-gray-800">Nook & Places</h1>
        <h2 className="text-lg font-semibold text-gray-700 mt-4">Log in</h2>
        <p className="text-sm text-gray-600 mt-2">
          Enter your email and we'll send you a login code.
        </p>

        {/* Email Input */}
        {!showCodeInput ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-4 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={sendEmail}
              className="bg-blue-600 text-white w-full px-4 py-2 mt-4 rounded-md hover:bg-blue-700"
            >
              Send Code
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              className="mt-4 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={verifyCode}
              className="bg-green-600 text-white w-full px-4 py-2 mt-4 rounded-md hover:bg-green-700"
            >
              Verify Code
            </button>
            <p className="text-sm text-center mt-2">{verificationMessage}</p>
          </>
        )}

        <p className="text-xs text-blue-500 mt-4">
          <a href="#" className="underline">Privacy</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
