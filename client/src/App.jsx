import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./store/userSlice";  
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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

  // Hide Navbar & Footer only on "/orders" page
  const hideNavbarFooter = location.pathname === "/orders";

  return (
    <main className="">
      {!hideNavbarFooter && <Navbar />}
      <Outlet />
      {!hideNavbarFooter && <Footer />}
    </main>
  );
};

export default App;
