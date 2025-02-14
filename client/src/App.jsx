import React from 'react';
import { Outlet } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./store/userSlice";  
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedToken && storedUser) {
      dispatch(loginSuccess({ user: storedUser, token: storedToken }));
    }
  }, [dispatch]);

  return (
    <main className="">
      <Navbar/>
      <Outlet />
      <Footer/>
    </main>
  );
};

export default App;
