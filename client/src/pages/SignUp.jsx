// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../store/userSlice";
// import axios from "axios";
// import { FaUser, FaLock, FaEnvelope, FaBuilding, FaPhone, FaGlobe, FaKey } from "react-icons/fa";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     name: "",
//     contactNo: "",
//     whatsappNo: "",
//     gst: "",
//     companyId: "",
//     companyWebsite: "",
//     email: "",
//     password: "",
//     role: 3, // Default role: Client
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5000/api/register", formData, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });

//       if (response.status === 201) {
//         dispatch(loginSuccess({ token: response.data.token, user: response.data.user }));
//         setMessage("Registration successful! Redirecting...");
//         setTimeout(() => navigate("/"), 2000);
//       } else {
//         setMessage(response.data.message || "Something went wrong.");
//       }
//     } catch (error) {
//       console.error("Error occurred during registration:", error);
//       setMessage(error.response?.data?.message || "An error occurred. Please try again.");
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#39237D] to-[#6A4AA1]">
//       <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-8 border border-white/20">
//         <h2 className="text-3xl font-bold text-center text-white mb-6">Create an Account</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Row 1: Name & Contact No */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
//               <FaUser className="text-white mx-2" />
//               <input type="text" id="name" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
//             </div>

//             <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
//               <FaPhone className="text-white mx-2" />
//               <input type="tel" id="contactNo" name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleChange} required pattern="[0-9]*" className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
//             </div>
//           </div>

//           {/* Row 2: WhatsApp No & GST */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
//               <FaPhone className="text-white mx-2" />
//               <input type="tel" id="whatsappNo" name="whatsappNo" placeholder="WhatsApp No" value={formData.whatsappNo} onChange={handleChange} required pattern="[0-9]*" className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
//             </div>

//             <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
//               <FaKey className="text-white mx-2" />
//               <input type="text" id="gst" name="gst" placeholder="GST Number" value={formData.gst} onChange={handleChange} required pattern="[0-9]*" className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
//             </div>
//           </div>

//           {/* Row 3: Company ID & Company Website */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
//               <FaBuilding className="text-white mx-2" />
//               <input type="text" id="companyId" name="companyId" placeholder="Company ID" value={formData.companyId} onChange={handleChange} required className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
//             </div>

//             <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
//               <FaGlobe className="text-white mx-2" />
//               <input type="url" id="companyWebsite" name="companyWebsite" placeholder="Company Website" value={formData.companyWebsite} onChange={handleChange} required className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
//             </div>
//           </div>

//           {/* Row 4: Email & Password */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
//               <FaEnvelope className="text-white mx-2" />
//               <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
//             </div>

//             <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
//               <FaLock className="text-white mx-2" />
//               <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none" />
//             </div>
//           </div>

//           {/* Remember Me Checkbox */}
//           <div className="flex items-center text-white">
//             <input type="checkbox" id="rememberMe" className="mr-2" />
//             <label htmlFor="rememberMe">Remember Me</label>
//           </div>

//           {/* Signup Button */}
//           <button type="submit" className="w-full py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-300">
//             Register
//           </button>
//         </form>

//         {/* Error Message */}
//         {message && <p className="mt-4 text-center text-red-500">{message}</p>}

//         {/* Already Have an Account? */}
//         <p className="text-center text-white mt-4">
//           Already have an account?{" "}
//           <button onClick={() => navigate("/")} className="text-teal-300 hover:underline">
//             Login
//           </button>
//         </p>
//       </div>
//     </section>
//   );
// };

// export default SignUp;  
import React from 'react'

const SignUp = () => {
  return (
    <div>SignUp</div>
  )
}

export default SignUp
