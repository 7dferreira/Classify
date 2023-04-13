import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";

import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import ChatApi from "../pages/ChatApi";
import PrivateRoute from "../services/PrivateRoute";
import RegisterCat from "../pages/RegisterCategory";

import RegisterSub from "../pages/RegisterSub";

import RegisterVhicle from "../pages/RegisterVhicle";
import Register from "../components/Header/Register";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<ChatApi />} />
      <Route path="cars/registerCategory" element={
        <PrivateRoute redirectTo="register">
          <RegisterCat/> 
        </PrivateRoute>
    }/>
          <Route path="cars/registerCategory/registerSub" element={
        <PrivateRoute redirectTo="register">
          <RegisterSub/> 
        </PrivateRoute>
    }/>
     <Route path="cars/registerCategory/registerSub/registerVhicle" element={
        <PrivateRoute redirectTo="register">
          <RegisterVhicle/> 
        </PrivateRoute>
    }/>
    </Routes>
  );
};

export default Routers;
