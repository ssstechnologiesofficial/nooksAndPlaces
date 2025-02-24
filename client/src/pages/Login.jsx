import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    // Send OTP
    const sendOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/generate-otp", { email });
            if (response.data.success) {
                setIsOtpSent(true);
                setMessage("");
            } else {
                setMessage(response.data.message || "Failed to send OTP. Please try again.");
            }
        } catch (error) {
            setMessage("Failed to send OTP. Please try again.");
        }
    };

    // Verify OTP
    const verifyOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/verify-otp", { email, otp });
            if (response.data.success) {
                navigate("/orders"); // Redirect to Order Page after successful OTP
            } else {
                setMessage(response.data.message || "Invalid OTP. Please try again.");
            }
        } catch (error) {
            setMessage("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Nooks & Places</h1>

                {!isOtpSent ? (
                    <>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Log In</h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Enter your email and we'll send you a login code
                        </p>
                        <form onSubmit={sendOTP} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Continue
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Enter Code</h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Sent to <span className="font-semibold">{email}</span>
                        </p>
                        <form onSubmit={verifyOTP} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Enter six-digit code"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="w-full p-3 border rounded focus:ring-2 focus:ring-green-400"
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                            >
                                Submit
                            </button>
                        </form>
                        <p
                            onClick={() => {
                                setIsOtpSent(false);
                                setEmail("");
                                setOtp("");
                                setMessage("");
                            }}
                            className="text-sm text-blue-600 cursor-pointer mt-4 text-center hover:underline"
                        >
                            Log in with a different account
                        </p>
                    </>
                )}

                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
