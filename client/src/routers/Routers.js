import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import RegisterBO from "../components/Header/RegisterBO";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import ChatApi from "../pages/ChatApi";
import PrivateRoute from "../services/PrivateRoute";
import RegisterCat from "../pages/RegisterCategory";
import RegisterInvoice from "../pages/RegisterInvoice"
import RegisterSub from "../pages/RegisterSub";
import Registeradverts from "../pages/Registeradverts";
import RegisterVhicle from "../pages/RegisterVhicle";
import Register from "../components/Header/Register";
import ListInvoice from "../Admin/ListInvoice";
import UserProfile from "../Admin/UserProfile"
import AdminUsers from "../pages/AdminUsers";
import Listagem from "../pages/listagem";
import Fav from "../Admin/Fav";
import AnunciosExternos from "../pages/AnunciosExternos";
import AdminAnuncio from "../pages/adminAnuncio";
import Invoice from "../Admin/Invoice";
import Anuncios from "../pages/Anuncios";
import {useState, useEffect } from 'react';
import api from '../services/api'
import Cookies from "universal-cookie";
import { AuthContext } from '../components/AuthContext'
import EditUser from "../pages/EditUser";
import EditVei from "../pages/EditVei";

const Routers = () => {
  return (
    <Routes>
      <Route path="/AdminUsers" element={<AdminUsers />} />
      <Route path="/anuncios" element={<Anuncios/>} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:id" element={<CarDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<ChatApi />} />
      <Route path="/chat/:channelId" element={<ChatApi />} />
      <Route path="/UserProfile" element={<UserProfile />} /> 
      <Route path="cars/registerCategory" element={<RegisterCat/> } />
   
     <Route path="cars/registerCategory/RegisterSub/:IDCategory" element={<RegisterSub />} />
     <Route path="cars/registerCategory/RegisterSub/registerVhicle/:subcategoryID" element={<RegisterVhicle/> }/>
       <Route path="/Registeradverts/:vehicleID" element={<Registeradverts />} />
       <Route path="/:publishadID/:purchaseID/RegisterInvoice" element={<RegisterInvoice />} />
       <Route path="/Invoice/:ID" element={<Invoice />} />
       <Route path="/ListInvoice" element={<ListInvoice />} />
       <Route path="/edit/:id" element={<EditUser />} />
       <Route path="/listagem/pesquisa" element={<Listagem/>} />
       <Route path="/editV/:vehicleID" element={<EditVei/>} />
       <Route path="/fav" element={<Fav/>} />

       <Route path="/anExternos/anuncioadm" element={<AdminAnuncio/>} />
       <Route path="/anExternos" element={<AnunciosExternos/>} />
       <Route path="/RegisterBO" element={<RegisterBO/>} />
    </Routes>
  );
};

export default Routers;