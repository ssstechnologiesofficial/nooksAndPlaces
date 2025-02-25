import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../components/Home';
import Shop from '../components/Shop';
import ContactPage from '../components/ContactPage';
import PrivacyPolicy from '../components/PrivacyPolicy';
import OrderPage from '../components/OrderPage';
import ProfilePage from '../components/ProfilePage';
import Settings from '../components/Settings';



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
      {
        path: 'privacy-policy',
        element: <PrivacyPolicy/>
      },
      {
        path: 'orders',
        element: <OrderPage/>
      },
      {
        path: 'profile',
        element: <ProfilePage/>
      },
      {
        path: 'settings',
        element: <Settings/>
      },
    ],
  },
]);
