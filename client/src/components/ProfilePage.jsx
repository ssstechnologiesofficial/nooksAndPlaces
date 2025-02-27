import React, { useState } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';

const ProfilePage = () => {
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [address, setAddress] = useState({
    country: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pin: '',
    mobile: '',
  });

  const email = localStorage.getItem("email");// Pre-filled email

  const handleSaveAddress = () => {
    if (
      address.country &&
      address.address1 &&
      address.city &&
      address.state &&
      address.pin &&
      address.mobile
    ) {
      setAddresses([...addresses, address]);
      setAddress({
        country: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        pin: '',
        mobile: '',
      });
      setIsAddressModalOpen(false);
    }
  };

  return (
    <div className=" h-[450px] bg-gray-100 px-32 py-5">
        <h1 className='text-lg font-semibold mb-5'>Profile</h1>
      <div className=" w-full mb-10">
        {/* Name Section */}
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
          <div className=' px-4 pt-2'>
          <h2 className="text-sm font-semibold text-gray-700">Email</h2>
          <p>{email}</p>
        </div>
        </div>
        {/* Address Section */}
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
            <p className="flex items-center px-4 text-gray-400 pt-2">No addresses added</p>
          ) : (
            addresses.map((addr, index) => (
              <p key={index} className="text-gray-600 mt-2">
                {addr.address1}, {addr.city}, {addr.state} - {addr.pin}
              </p>
            ))
          )}
        </div>
      </div>

      {/* Name Modal */}
      {isNameModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Name
            </h2>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 border rounded mb-3"
              placeholder="First Name"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 border rounded mb-3"
              placeholder="Last Name"
            />
            <div className="mb-3">
              <input
                type="email"
                value={email}
                disabled
                className="w-full p-3 border rounded bg-gray-200"
              />
              <p className="text-sm text-gray-600 mt-1">
                Email used for login can't be changed.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsNameModalOpen(false)}
                className="mr-3 px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add Address
            </h2>

            {/* Default Address Checkbox */}
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={defaultAddress}
                onChange={() => setDefaultAddress(!defaultAddress)}
                className="w-4 h-4 mr-2"
              />
              <label className="text-gray-700">Set as default address</label>
            </div>

            {/* Address Inputs */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Country/Region"
                value={address.country}
                onChange={(e) =>
                  setAddress({ ...address, country: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Address"
                value={address.address1}
                onChange={(e) =>
                  setAddress({ ...address, address1: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Apartment, Suite, etc. (Optional)"
                value={address.address2}
                onChange={(e) =>
                  setAddress({ ...address, address2: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="PIN Code"
                value={address.pin}
                onChange={(e) =>
                  setAddress({ ...address, pin: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={address.mobile}
                onChange={(e) =>
                  setAddress({ ...address, mobile: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Buttons */}
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
