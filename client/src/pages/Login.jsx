// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../store/userSlice";
// import axios from "axios";
// import logo from "../assets/logo.png";
// import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:5000/api/login", formData, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true, // Enable sending cookies for cross-origin requests
//       });

//       if (response.status === 200) {
//         const { token, user } = response.data;
//         dispatch(loginSuccess({ token, user }));
//         console.log('Token received:', response.data.token);
//         // Store login details if "Remember Me" is checked
//         if (formData.rememberMe) {
//           localStorage.setItem("userEmail", formData.email);
//           localStorage.setItem("userPassword", formData.password);
//         } else {
//           localStorage.removeItem("userEmail");
//           localStorage.removeItem("userPassword");
//         }

//         // Redirect based on role
//         if (user.role === 1) navigate("/admin");
//         else if (user.role === 2) navigate("/subadmin");
//         else navigate("/kyc-form");
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "Invalid credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#39237D] to-[#6A4AA1]">
//       <div className="flex flex-wrap md:flex-nowrap max-w-3xl w-full gap-8">
        
//         {/* Left Section with Logo */}
//         <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-white p-10">
//           <img src={logo} alt="Logo" className="rounded-full shadow-lg w-24 h-24 mb-4" />
//           <p className="text-lg text-center">
//             Welcome to <span className="font-bold">39 Solutions!</span> We offer the best-in-class solutions.
//           </p>
//         </div>

//         {/* Right Section - Login Form */}
//         <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 shadow-lg">
//           <h2 className="text-2xl text-white font-semibold mb-6 text-center">Login to 39 Solutions</h2>
          
//           {/* Error Message */}
//           {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

//           <form onSubmit={handleLogin} className="space-y-4">
            
//             {/* Email Input */}
//             <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
//               <FaEnvelope className="text-white mx-2" />
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none"
//               />
//             </div>

//             {/* Password Input */}
//             <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
//               <FaLock className="text-white mx-2" />
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none"
//               />
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between text-white text-sm">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="rememberMe"
//                   checked={formData.rememberMe}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 Remember Me
//               </label>
//               <button
//                 type="button"
//                 onClick={() => navigate("/forgot-password")}
//                 className="text-teal-300 hover:underline"
//               >
//                 Forgot Password?
//               </button>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               className="w-full py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
//             >
//               Login
//             </button>
//           </form>

//           {/* Signup Navigation */}
//           <p className="text-white text-sm text-center mt-4">
//             Don't have an account?{" "}
//             <button onClick={() => navigate("/signup")} className="text-teal-300 hover:underline">
//               Sign Up
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
 import React from 'react'

const Login = () => {
  return (
    <div>Login</div>
  )
}

export default Login

