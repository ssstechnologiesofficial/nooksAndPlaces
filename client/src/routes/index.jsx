import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../components/Home';
import Navbar from '../components/Navbar';
import Shop from '../components/Shop';
import ContactPage from '../components/ContactPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },      {
        path: '/home',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      }, 
      {
        path: 'Shop',
        element: <Shop/>
      },
      {
        path: 'contact',
        element: <ContactPage/>
      },
    ],
  },
]);
