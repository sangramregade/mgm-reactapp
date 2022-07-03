import React from 'react';

//components imports
import Home from './components/pages/Home';
import AddPatient from './components/patients/AddPatient';
import ViewPaient from './components/patients/ViewPaient';
import EditPaient from './components/patients/EditPaient';
import NotFound from './components/pages/NotFound';
import Navbar from './components/layout/Navbar';

//Router
import { Routes, Route } from "react-router-dom";

function App() {
  return (

    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patients/add" element={<AddPatient />} />
        <Route path="/patients/edit/:id" element={<EditPaient />} />
        <Route path="/patients/:id" element={<ViewPaient />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
