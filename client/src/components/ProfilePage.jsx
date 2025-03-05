import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa';

const ProfilePage = () => {
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');

  const [address, setAddress] = useState({
    country: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pin: '',
    mobile: '',
  });

  useEffect(() => {
    if (email) {
      axios
        .get(
          ` https://nooksandplacesbackend.onrender.com/api/users?email=${email}`
        )
        .then((response) => {
          const { _id, firstName, lastName, addresses } = response.data;
          setUserId(_id);
          setFirstName(firstName || '');
          setLastName(lastName || '');
          setAddresses(addresses || []);
        })
        .catch((error) => console.error('Error fetching profile:', error));
    }
  }, [email]);

  const handleSaveName = () => {
    axios
      .post(' https://nooksandplacesbackend.onrender.com/api/register', {
        email,
        firstName,
        lastName,
      })
      .then((response) => {
        console.log('User registered:', response.data);
        setIsNameModalOpen(false);
      })
      .catch((error) => console.error('Error registering user:', error));
  };

  const handleSaveAddress = () => {
    axios
      .post(
        ` https://nooksandplacesbackend.onrender.com/api/user/${userId}/address`,
        address
      )
      .then((response) => {
        setAddresses(response.data.addresses);
        setIsAddressModalOpen(false);
        setAddress({
          country: '',
          address1: '',
          address2: '',
          city: '',
          state: '',
          pin: '',
          mobile: '',
        });
      })
      .catch((error) => console.error('Error saving address:', error));
  };

  const handleDeleteAddress = (addressId) => {
    axios
      .delete(
        ` https://nooksandplacesbackend.onrender.com/api/user/${userId}/address/${addressId}`
      )
      .then((response) => {
        setAddresses(response.data.addresses);
      })
      .catch((error) => console.error('Error deleting address:', error));
  };

  return (
    <div className="h-[450px] bg-gray-100 px-32 py-5">
      <h1 className="text-lg font-semibold mb-5">Profile</h1>
      <div className="w-full mb-10">
        <div className="pb-4 bg-white">
          <div className="flex items-center px-4 py-3 pt-5">
            <h2 className="text-sm font-semibold text-gray-700">Name</h2>
            <button
              onClick={() => setIsNameModalOpen(true)}
              className="text-blue-600 hover:text-blue-800 ml-6"
            >
              <FaPencilAlt />
            </button>
          </div>
          <div className="px-4 pt-2">
            <h2 className="text-sm font-semibold text-gray-700">Email</h2>
            <p>{email}</p>
          </div>
        </div>

        <div className="mt-6 pb-4 bg-white">
          <div className="flex items-center px-4 py-3 pt-5">
            <h2 className="text-lg font-semibold text-gray-700">Address</h2>
            <button
              onClick={() => setIsAddressModalOpen(true)}
              className="text-blue-600 flex items-center gap-2 ml-6 hover:text-blue-800"
            >
              <FaPlus /> Add
            </button>
          </div>
          {addresses.length === 0 ? (
            <p className="flex items-center px-4 text-gray-400 pt-2">
              No addresses added
            </p>
          ) : (
            addresses.map((addr) => (
              <div key={addr._id} className="flex justify-between px-4 py-2">
                <p className="text-gray-600">
                  {addr.address1}, {addr.city}, {addr.state} - {addr.pin}
                </p>
                <button
                  onClick={() => handleDeleteAddress(addr._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {isAddressModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add Address
            </h2>
            <div className="space-y-3">
              {Object.keys(address).map((key) => (
                <input
                  key={key}
                  type="text"
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={address[key]}
                  onChange={(e) =>
                    setAddress({ ...address, [key]: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="mr-3 px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
