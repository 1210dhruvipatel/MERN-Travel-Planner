import React from "react";
import {Routes,Route, Navigate} from "react-router-dom";
import Home from "../pages/Home";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import SearchResultList from "../pages/SearchResultList";
import Thankyou from "../pages/Thankyou";

const Routers = () =>{
    return(
        <Routes>
            <Route path="/" element={<Navigate to='/home'/>}/>
            <Route path="/home" element={<Home/>} />
            <Route path="/tours" element={<Tours/>} />
            <Route path="/tours/:id" element={<TourDetails/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/thank-you" element={<Thankyou/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/tours/search" element={<SearchResultList/>} />
        </Routes>
    )
}

export default Routers;