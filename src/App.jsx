import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Slider එකට අනිවාර්යයි
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
     
      <Navbar />
      
     
      <Home />

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p className="mb-0">© 2026 QuickTrip Cars | Dilshan Bandara</p>
        <p>dilshan@gmail.com</p>
      </footer>
    </div>
  );
}

export default App;