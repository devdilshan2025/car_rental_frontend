import React from 'react';
import { Car } from 'lucide-react'; 
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center fw-bold fs-3" href="/">
          
          <Car color="#0d6efd" size={35} className="me-2" /> 
          QuickTrip<span className="text-primary">Cars</span>
        </a>
        
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><a className="nav-link px-3" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link px-3" href="/about">About</a></li>
            <li className="nav-item"><a className="nav-link px-3" href="/admin">Admin</a></li>
            <li className="nav-item"><button className="nav-link px-3 btn border-0 bg-transparent text-light fw-semibold"  data-bs-toggle="modal"  data-bs-target="#loginModal" > Log In</button></li>
            <li className="nav-item"><button className="btn btn-outline-danger btn-sm ms-lg-2 px-3">Log Out</button></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;