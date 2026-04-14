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
            {/* ස්ලයිඩර් එක ඔටෝ මූව් වෙනවා (data-bs-ride="carousel") */}
            <div id="carHero" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carHero" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#carHero" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#carHero" data-bs-slide-to="2"></button>
                </div>
                
                <div className="carousel-inner">
                    {/* මෙතන interval එක 5000ms කළා */}
                    <div className="carousel-item active" data-bs-interval="5000">
                        <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920" className="d-block w-100" alt="Car 1" style={{ height: '550px', objectFit: 'cover' }} />
                        <div className="carousel-caption d-none d-md-block p-4 bg-dark bg-opacity-50 rounded-4">
                            <h2 className="display-4 fw-bold">Explore Our Premium Fleet</h2>
                            <p className="fs-5">Drive your dream car with QuickTrip Cars Rentals.</p>
                        </div>
                    </div>

                    <div className="carousel-item" data-bs-interval="5000">
                        <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1920" className="d-block w-100" alt="Car 2" style={{ height: '550px', objectFit: 'cover' }} />
                        <div className="carousel-caption d-none d-md-block p-4 bg-dark bg-opacity-50 rounded-4">
                            <h2 className="display-4 fw-bold">Power Meets Performance</h2>
                            <p className="fs-5">Rent the best cars in town for your next journey.</p>
                        </div>
                    </div>

                    <div className="carousel-item" data-bs-interval="5000">
                        <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1920" className="d-block w-100" alt="Car 3" style={{ height: '550px', objectFit: 'cover' }} />
                        <div className="carousel-caption d-none d-md-block p-4 bg-dark bg-opacity-50 rounded-4">
                            <h2 className="display-4 fw-bold">The Ultimate Driving Machine</h2>
                            <p className="fs-5">Reliable cars and premium comfort for every mile.</p>
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carHero" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carHero" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>

            <div className="container py-5">
                <h2 className="text-center fw-bold mb-5 mt-4">Available Cars for You</h2>
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status"></div>
                    </div>
                ) : (
                    <div className="row g-4">
                        {cars.map(car => <CarCard key={car.carId} car={car} />)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;