import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from './pages/Login';
import Register from './pages/Register';

const AppRoutes = () => {
  return (
   <Router>
    <Routes>
        <Route path='/login' element={<Login/>}></Route> 
        <Route path='/register' element={<Register />}></Route> 
        <Route path='/' element={<Dashboard />}></Route> 
    </Routes>
   </Router>
  );
};

export default AppRoutes;