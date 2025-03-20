import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const AppRoutes = () => {
  return (
   <Router>
    <Routes>
        <Route path='/' element={<Dashboard />}></Route> 
    </Routes>
   </Router>
  );
};

export default AppRoutes;