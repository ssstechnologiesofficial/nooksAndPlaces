// import React, { useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { fetchUserDetails } from '../../../client/src/store/userSlice'
// import { FiEdit, FiTrash, FiDownload } from 'react-icons/fi'
// import * as XLSX from 'xlsx'

// const MemberTable = () => {
//   const dispatch = useDispatch()
//   const { details, loading, error } = useSelector((state) => state.user)

//   const [editUserId, setEditUserId] = useState(null)
//   const [updatedUser, setUpdatedUser] = useState({})

//   useEffect(() => {
//     dispatch(fetchUserDetails())
//   }, [dispatch])

//   // Export to Excel
//   const handleExportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(details)
//     const workbook = XLSX.utils.book_new()
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Users')
//     XLSX.writeFile(workbook, 'UserDetails.xlsx')
//   }

//   // Handle Update
//   const handleUpdate = (userId) => {
//     const user = details.find((u) => u._id === userId)
//     setEditUserId(userId)
//     setUpdatedUser({ ...user })
//   }

//   // Save Updated User
//   const saveUpdatedUser = async () => {
//     try {
//       // Call an API to update the user data
//       // Example: await api.updateUser(updatedUser);

//       // If successful, reset the edit state
//       setEditUserId(null)
//     } catch (error) {
//       console.error('Error updating user:', error)
//     }
//   }

//   // Handle Delete
//   const handleDelete = async (userId) => {
//     const confirmDelete = window.confirm(
//       'Are you sure you want to delete this user?'
//     )
//     if (confirmDelete) {
//       try {
//         // Call an API to delete the user
//         // Example: await api.deleteUser(userId);

//         // If successful, remove user from the table
//         dispatch(fetchUserDetails())
//       } catch (error) {
//         console.error('Error deleting user:', error)
//       }
//     }
//   }

//   if (loading) return <p>Loading...</p>
//   if (error) return <p className="text-red-500">Error: {error}</p>

//   return (
//     <div className="container p-4  bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 text-white rounded-lg shadow-lg">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-3xl font-bold text-gray-800">Registered Users</h2>
//         <button
//           onClick={handleExportToExcel}
//           className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           <FiDownload className="mr-2 text-xl" />
//           Download Excel
//         </button>
//       </div>

//       <table className="min-w-full border border-gray-300 text-sm text-white">
//         <thead>
//           <tr className="bg-gray-700">
//             <th className="border border-gray-300 px-4 py-2 text-center">
//               S.No
//             </th>
//             <th className="border border-gray-300 px-2 py-2">Name</th>
//             <th className="border border-gray-300 px-2 py-2">Email</th>
//             <th className="border border-gray-300 px-2 py-2">Contact No</th>
//             <th className="border border-gray-300 px-2 py-2">WhatsApp No</th>
//             <th className="border border-gray-300 px-2 py-2">Company ID</th>
//             <th className="border border-gray-300 px-2 py-2">GST</th>
//             <th className="border border-gray-300 px-2 py-2">
//               Company Website
//             </th>
//             <th className="border border-gray-300 px-4 py-2 text-center">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {details.map((user, index) => (
//             <tr key={user._id} className="hover:bg-gray-50 hover:text-black">
//               <td className="border border-gray-300 px-2 py-2 text-center">
//                 {index + 1}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {editUserId === user._id ? (
//                   <input
//                     type="text"
//                     value={updatedUser.name || ''}
//                     onChange={(e) =>
//                       setUpdatedUser({ ...updatedUser, name: e.target.value })
//                     }
//                     className="border border-gray-300 px-2 py-1 rounded w-full"
//                   />
//                 ) : (
//                   user.name
//                 )}
//               </td>
//               <td className="border border-gray-300 px-2 py-2">{user.email}</td>
//               <td className="border border-gray-300 px-2 py-2">
//                 {user.contactNo}
//               </td>
//               <td className="border border-gray-300 px-2 py-2">
//                 {user.whatsappNo}
//               </td>
//               <td className="border border-gray-300 px-2 py-2">
//                 {user.companyId}
//               </td>
//               <td className="border border-gray-300 px-2 py-2">{user.gst}</td>
//               <td className="border border-gray-300 px-2 py-2">
//                 {user.companyWebsite}
//               </td>
//               <td className="border border-gray-300 px-2 py-2 flex justify-center gap-3">
//                 {editUserId === user._id ? (
//                   <>
//                     <button
//                       onClick={saveUpdatedUser}
//                       className="text-green-500 text-lg"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setEditUserId(null)}
//                       className="text-gray-500 text-lg"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <FiEdit
//                       onClick={() => handleUpdate(user._id)}
//                       className="text-blue-500 cursor-pointer text-lg"
//                     />
//                     <FiTrash
//                       onClick={() => handleDelete(user._id)}
//                       className="text-red-500 cursor-pointer text-lg"
//                     />
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default MemberTable
import React from 'react'

const MemberTable = () => {
  return (
    <div>MemberTable</div>
  )
}

export default MemberTable