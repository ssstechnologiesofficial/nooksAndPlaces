import React, { useState } from "react";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      const response = await axios.post("http://localhost:5000/api/createContact", formData);
      setMessage("Thank you! Your message has been sent.");
      setFormData({ name: "", phone: "", email: "", comment: "" });
    } catch (error) {
      setMessage("Error sending message. Please try again later.");
    }
    
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between p-4 max-w-6xl mx-auto gap-8">
      {/* Left Section */}
      <div className="md:w-1/2 p-4">
        <nav className="text-sm text-gray-500 mb-4">
          <span>Home &gt; Contact</span>
        </nav>
        <h2 className="text-2xl font-bold mb-10 text-gray-800">CONTACT</h2>
        <p className="mt-2 text-sm text-gray-700">
          Have a question or comment? Use the form below to send us a message or
          contact us by mail at:
        </p>
        <form onSubmit={handleSubmit} className="mt-4 text-sm text-gray-800 space-y-4">
          <label className="block">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <label className="block">Phone number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <label className="block">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <label className="block">Comment *</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded h-24"
            required
          ></textarea>
          <button
            type="submit"
            className="w-1/2 p-2 border border-gray-300 text-white bg-gray-800 hover:bg-gray-900"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Contact"}
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
      </div>
      
      {/* Right Section */}
      <div className="md:w-1/2 p-4 mt-24 text-gray-700">
        <h2 className="text-md font-bold text-gray-800">Get In Touch!</h2>
        <p className="my-5 text-sm">
          We'd love to hear from you - please use the form to send us your message or ideas.
        </p>
        <p className="mt-6 text-sm">TEXT: +91 9811058378</p>
        <p className="mt-1 text-sm mb-8">dimple@fsix.in | imaan@fsix.in</p>
        <p className="mt-2 text-sm">Opening Hours:</p>
        <p className="mt-1 text-sm">MON to SAT: 10 am - 6 pm</p>
      </div>
    </div>
  );
};

export default ContactPage;
