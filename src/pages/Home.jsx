import React, { useEffect, useState } from 'react';

import axiosInstance from '../api/axiosInstance'; 
import CarCard from '../components/CarCard';

const Home = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        
        axiosInstance.get('/car/get-all')
            .then(res => {
                setCars(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching cars:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="home-container">
            
            <div id="carHero" className="carousel slide" data-bs-ride="carousel">
                
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carHero" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#carHero" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#carHero" data-bs-slide-to="2"></button>
                </div>
                
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="2000">
                        <img 
                            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920" 
                            className="d-block w-100" 
                            alt="Luxury Car 1" 
                            style={{ height: '550px', objectFit: 'cover' }}
                        />
                        <div className="carousel-caption d-none d-md-block p-4 bg-dark bg-opacity-50 rounded">
                            <h2 className="display-4 fw-bold">Explore Our Premium Fleet</h2>
                            <p className="fs-5">Drive your dream car with QuickTrip Cars Rentals.</p>
                        </div>
                    </div>
                    
                </div>
            
            </div>

            
            <div className="container py-5">
                <h2 className="text-center fw-bold mb-5 mt-4">Available Cars for You</h2>
                
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p className="mt-2">Loading our fleet...</p>
                    </div>
                ) : (
                    <div className="row">
                        
                        {cars && cars.length > 0 ? (
                            cars.map(car => (
                                <CarCard key={car.carId} car={car} />
                            ))
                        ) : (
                            <div className="text-center">
                                <p className="text-muted">No cars available at the moment.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;