import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./store/userSlice";  
import Navbar from "./components/Navbar";
import LoggedInNavbar from "./components/LoggedInNavbar"; 
import Footer from "./components/Footer";
import LoggedInFooter from "./components/LoggedInFooter"; // Fixed import

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedToken && storedUser) {
      dispatch(loginSuccess({ user: storedUser, token: storedToken }));
    }
  }, [dispatch]);

  // Pages where LoggedInNavbar and LoggedInFooter should be shown
  const loggedInRoutes = ["/orders", "/profile", "/settings"];
  const isLoggedInPage = loggedInRoutes.includes(location.pathname);

  return (
    <main>
      {isLoggedInPage ? <LoggedInNavbar /> : <Navbar />}
      <Outlet />
      {isLoggedInPage ? <LoggedInFooter /> : <Footer />} {/* Fixed Footer logic */}
    </main>
  );
};

export default App;
