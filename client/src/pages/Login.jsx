import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [message, setMessage] = useState("");

    // Send OTP
    const sendOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/generate-otp", { email });
            console.log("Send OTP Response:", response.data); // Debugging
    
            if (response.data.success) {  // ✅ Fix: `success` check added
                setIsOtpSent(true);
                setMessage("OTP sent successfully to your email.");
            } else {
                setMessage(response.data.message || "Failed to send OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            setMessage("Failed to send OTP. Please try again.");
        }
    };
    
    const verifyOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/verify-otp", { email, otp });
            console.log("Verify OTP Response:", response.data); // Debugging
    
            if (response.data.success) {  // ✅ Fix: `success` check added
                setMessage("OTP verified successfully!");
            } else {
                setMessage(response.data.message || "Invalid OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            setMessage("Invalid OTP. Please try again.");
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-xl font-bold text-center">Login</h2>

                {!isOtpSent ? ( // ✅ Ye correctly dikhana chahiye
                    <form onSubmit={sendOTP} className="mt-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                        />
                        <button
                            type="submit"
                            className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Send OTP
                        </button>
                    </form>
                ) : ( // ✅ OTP Send hone ke baad ye dikhna chahiye
                    <form onSubmit={verifyOTP} className="mt-4">
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                        />
                        <button
                            type="submit"
                            className="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                        >
                            Verify OTP
                        </button>
                    </form>
                )}

                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
