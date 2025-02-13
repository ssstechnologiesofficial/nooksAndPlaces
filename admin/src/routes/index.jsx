import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login'
import Dashboard from '../components/Dashboard'
import Sidebar from '../components/Sidebar'
import MemberTable from '../components/MemberTable'
import ForgotPassword from '../pages/ForgotPassword'
import AddCategory from '../components/AddCategory'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: 'forgotpassword',
        element: <ForgotPassword />,
      },
      {
        path: 'dashboard',
        element: <Sidebar />,
        children: [
          {
            path: 'dashboardCards',
            element: <Dashboard />,
          },
          {
            path: 'add-category',
            element: <AddCategory/>,
          },
       
          
        ],
      },
    ],
  },
])
