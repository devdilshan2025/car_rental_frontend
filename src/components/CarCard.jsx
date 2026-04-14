import React, { useState } from 'react';
import BookingModal from './BookingModal'; 

const CarCard = ({ car }) => {
    
    const [selectedCar, setSelectedCar] = useState(null);

    const handleRentClick = () => {
        const token = localStorage.getItem('token');
        if (token) {
            
            setSelectedCar(car);
        } else {
            
            setSelectedCar(null);
        }
    };

    return (
        <>
            <div className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden" style={{ backgroundColor: '#eef2ff' }}>
                    
                    
                    <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                        <img 
                            src={`https://loremflickr.com/400/250/car,${car.brand}?random=${car.carId}`}
                            alt={`${car.brand} ${car.model}`}
                            className="w-100 h-100"
                            style={{ objectFit: 'cover' }}
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=400";
                            }}
                        />
                        <div className="position-absolute top-0 start-0 m-2">
                            <span className="badge bg-dark bg-opacity-75 text-white rounded-pill px-3">
                                {car.brand}
                            </span>
                        </div>
                    </div>

                    
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <h5 className="card-title fw-bold mb-0 text-dark">{car.brand} {car.model}</h5>
                                <small className="text-primary fw-semibold">{car.carType} • {car.fuelType}</small>
                            </div>
                            <span className={`badge rounded-pill px-3 py-2 ${car.isAvailable ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                                {car.isAvailable ? 'Available' : 'Booked'}
                            </span>
                        </div>

                        <div className="mt-4 d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-muted small mb-0 fw-bold">Daily Rate</p>
                                <span className="h5 fw-bold text-primary">Rs. {car.dailyRate}</span>
                            </div>
                            
                            
                            <button 
                                className={`btn rounded-pill px-4 fw-bold shadow-sm ${car.isAvailable ? 'btn-primary' : 'btn-secondary disabled'}`}
                                onClick={handleRentClick}
                                
                                data-bs-toggle="modal"
                                data-bs-target={localStorage.getItem('token') ? "#bookingModal" : "#loginModal"}
                                disabled={!car.isAvailable}
                            >
                                {car.isAvailable ? 'Rent Now' : 'Reserved'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            
            
            {selectedCar && <BookingModal car={selectedCar} />}
        </>
    );
};

export default CarCard;