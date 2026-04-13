import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import LoginModal from './components/LoginModal';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <LoginModal />
        
        <Routes>
          
          <Route path="/" element={<Home />} />
          
          
          <Route path="/login" element={<Login />} />
        </Routes>

        <footer className="bg-dark text-white text-center py-4 mt-5">
          <p className="mb-0">© 2026 QuickTrip Cars | Dilshan Bandara</p>
          <p>dilshan@gmail.com</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;