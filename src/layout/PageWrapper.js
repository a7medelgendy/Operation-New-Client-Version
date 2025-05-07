import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../styles/layout/pagewrapper.css';

import ShiftLog from '../pages/ShiftLog';
import Dashboard from '../pages/Dashboard';
import AboutUs from '../pages/AboutUs';
import NoPage from '../pages/NoPage';
export default function PageWrapper() {
  return (
    <div className='container-fluid page-wrapper p-1'>
      <Routes>
        <Route path='shiftlog' element={<ShiftLog />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='about-us' element={<AboutUs />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </div>
  );
}
