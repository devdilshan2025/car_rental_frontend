import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('cars');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Form States
    const [selectedCar, setSelectedCar] = useState({ 
        brand: '', model: '', dailyRate: '', isAvailable: true 
    });
    

    const [newCar, setNewCar] = useState({
        brand: '', 
        model: '', 
        dailyRate: '', 
        carType: '', 
        seatingCapacity: '', 
        transmission: '', 
        fuelType: '', 
        isAvailable: true 
    });

    useEffect(() => {
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(b => b.remove());
        
        document.body.classList.remove('modal-open');
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0px';

        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axiosInstance.get('/car/get-all');
            setCars(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cars:", error);
            setLoading(false);
        }
    };

    // Delete Function
    const handleDelete = async (carId) => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            try {
                await axiosInstance.delete(`/car/delete/${carId}`);
                alert("Car Deleted Successfully!");
                fetchCars();
            } catch (error) {
                alert("Error deleting car. It might be linked to a booking.");
            }
        }
    };

    // Add Car Function
    const handleAddCar = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/car/add', newCar);
            alert("New Car Added!");
            
            setNewCar({ 
                brand: '', model: '', dailyRate: '', carType: '', 
                seatingCapacity: '', transmission: '', fuelType: '', isAvailable: true 
            });
            fetchCars();
        } catch (error) {
            alert("Failed to add car.");
        }
    };

    // Update Car Function
    const handleUpdateCar = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put('/car/update', selectedCar);
            alert("Car Updated Successfully!");
            fetchCars();
        } catch (error) {
            alert("Update Failed!");
        }
    };

    return (
        <div className="container py-5 mt-4">
            <h2 className="fw-bold mb-4 text-center">Admin Dashboard</h2>
            
            <div className="d-flex justify-content-center gap-3 mb-5">
                <button onClick={() => setActiveTab('cars')} className={`btn rounded-pill px-5 fw-bold ${activeTab === 'cars' ? 'btn-primary shadow' : 'btn-outline-primary'}`}>Cars</button>
                <button onClick={() => setActiveTab('bookings')} className={`btn rounded-pill px-5 fw-bold ${activeTab === 'bookings' ? 'btn-primary shadow' : 'btn-outline-primary'}`}>Bookings</button>
            </div>

            {activeTab === 'cars' ? (
                <div className="card border-0 shadow-sm p-4 rounded-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-bold m-0">Manage Cars</h4>
                        <button className="btn btn-success rounded-pill px-4 fw-bold" data-bs-toggle="modal" data-bs-target="#addCarModal">+ Add Car</button>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Daily Rate (LKR)</th>
                                    <th>Status</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" className="text-center py-4">Loading fleet...</td></tr>
                                ) : cars.map(car => (
                                    <tr key={car.carId}>
                                        <td className="fw-semibold">{car.brand}</td>
                                        <td>{car.model}</td>
                                        <td>{car.dailyRate?.toLocaleString()}</td>
                                        <td>
                                            <span className={`badge rounded-pill ${car.isAvailable ? 'bg-success' : 'bg-danger'}`}>
                                                {car.isAvailable ? 'Available' : 'Rented'}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button 
                                                className="btn btn-sm btn-info text-white me-2 rounded-pill px-3"
                                                onClick={() => setSelectedCar(car)}
                                                data-bs-toggle="modal" data-bs-target="#editCarModal"
                                            >Edit</button>
                                            <button onClick={() => handleDelete(car.carId)} className="btn btn-sm btn-danger rounded-pill px-3">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <BookingManagement />
            )}

            
            <div className="modal fade" id="addCarModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content rounded-4 border-0 shadow">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title fw-bold">Add New Car to Fleet</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleAddCar}>
                            <div className="modal-body pt-4">
                                <div className="row">
                                    <div className="col-md-6 mb-3 text-start">
                                        <label className="form-label small fw-bold">Brand</label>
                                        <input type="text" className="form-control rounded-pill" placeholder="e.g. Toyota" 
                                            value={newCar.brand} onChange={(e) => setNewCar({...newCar, brand: e.target.value})} required />
                                    </div>
                                    <div className="col-md-6 mb-3 text-start">
                                        <label className="form-label small fw-bold">Model</label>
                                        <input type="text" className="form-control rounded-pill" placeholder="e.g. Vitz" 
                                            value={newCar.model} onChange={(e) => setNewCar({...newCar, model: e.target.value})} required />
                                    </div>
                                    <div className="col-md-6 mb-3 text-start">
                                        <label className="form-label small fw-bold">Car Type</label>
                                        <input type="text" className="form-control rounded-pill" placeholder="e.g. Hatchback / SUV" 
                                            value={newCar.carType} onChange={(e) => setNewCar({...newCar, carType: e.target.value})} required />
                                    </div>
                                    <div className="col-md-6 mb-3 text-start">
                                        <label className="form-label small fw-bold">Seating Capacity</label>
                                        <input type="number" className="form-control rounded-pill" placeholder="e.g. 5" 
                                            value={newCar.seatingCapacity} onChange={(e) => setNewCar({...newCar, seatingCapacity: e.target.value})} required />
                                    </div>
                                    <div className="col-md-6 mb-3 text-start">
                                        <label className="form-label small fw-bold">Daily Rate (LKR)</label>
                                        <input type="number" className="form-control rounded-pill" placeholder="7500" 
                                            value={newCar.dailyRate} onChange={(e) => setNewCar({...newCar, dailyRate: e.target.value})} required />
                                    </div>
                                    <div className="col-md-6 mb-3 text-start">
                                        <label className="form-label small fw-bold">Transmission</label>
                                        <select className="form-select rounded-pill" value={newCar.transmission} onChange={(e) => setNewCar({...newCar, transmission: e.target.value})} required>
                                            <option value="">Select Transmission</option>
                                            <option value="Auto">Auto</option>
                                            <option value="Manual">Manual</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3 text-start">
                                        <label className="form-label small fw-bold">Fuel Type</label>
                                        <select className="form-select rounded-pill" value={newCar.fuelType} onChange={(e) => setNewCar({...newCar, fuelType: e.target.value})} required>
                                            <option value="">Select Fuel Type</option>
                                            <option value="Petrol">Petrol</option>
                                            <option value="Diesel">Diesel</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="Electric">Electric</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3 text-start">
                                        <label className="form-label small fw-bold">Initial Status</label>
                                        <select className="form-select rounded-pill" value={newCar.isAvailable} onChange={(e) => setNewCar({...newCar, isAvailable: e.target.value === 'true'})}>
                                            <option value="true">Available</option>
                                            <option value="false">Not Available</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button type="submit" className="btn btn-success w-100 rounded-pill fw-bold py-2 shadow-sm" data-bs-dismiss="modal">Save Car</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        
            <div className="modal fade" id="editCarModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content rounded-4 border-0 shadow">
                        <div className="modal-header border-0">
                            <h5 className="modal-title fw-bold">Edit Car Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleUpdateCar}>
                            <div className="modal-body">
                                <div className="mb-2 text-start"><label className="small fw-bold">Brand</label></div>
                                <input type="text" className="form-control mb-3 rounded-pill" value={selectedCar.brand} onChange={(e) => setSelectedCar({...selectedCar, brand: e.target.value})} />
                                <div className="mb-2 text-start"><label className="small fw-bold">Model</label></div>
                                <input type="text" className="form-control mb-3 rounded-pill" value={selectedCar.model} onChange={(e) => setSelectedCar({...selectedCar, model: e.target.value})} />
                                <div className="mb-2 text-start"><label className="small fw-bold">Daily Rate</label></div>
                                <input type="number" className="form-control mb-3 rounded-pill" value={selectedCar.dailyRate} onChange={(e) => setSelectedCar({...selectedCar, dailyRate: e.target.value})} />
                                <div className="mb-2 text-start"><label className="small fw-bold">Status</label></div>
                                <select className="form-select rounded-pill" value={selectedCar.isAvailable} onChange={(e) => setSelectedCar({...selectedCar, isAvailable: e.target.value === 'true'})}>
                                    <option value="true">Available</option>
                                    <option value="false">Rented</option>
                                </select>
                            </div>
                            <div className="modal-footer border-0">
                                <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold py-2 shadow-sm" data-bs-dismiss="modal">Update Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const response = await axiosInstance.get('/booking/get-all');
            setBookings(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleReturn = async (bookingId) => {
        if (window.confirm("Is the car returned and ready for the next customer?")) {
            try {
                const response = await axiosInstance.put(`/booking/return/${bookingId}`);
                if (response.status === 200) {
                    alert("Car returned successfully and is now available!");
                    await fetchBookings(); 
                }
            } catch (error) {
                console.error("Return error:", error);
                alert("Failed to process return. Please check backend logs.");
            }
        }
    };

    return (
        <div className="card border-0 shadow-sm p-4 rounded-4">
            <h4 className="fw-bold mb-4">Customer Bookings</h4>
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Booking ID</th>
                            <th>Customer ID</th>
                            <th>Car ID</th>
                            <th>Total Price (LKR)</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" className="text-center py-4">Loading bookings...</td></tr>
                        ) : bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr key={booking.bookingId}>
                                    <td className="fw-bold">{booking.bookingId}</td>
                                    <td>{booking.userId}</td>
                                    <td>{booking.carId}</td>
                                    <td>{booking.totalPrice?.toLocaleString()}</td>
                                    <td className="text-center">
                                        <button 
                                            className="btn btn-sm btn-success rounded-pill px-4 shadow-sm fw-bold"
                                            onClick={() => handleReturn(booking.bookingId)}
                                        >
                                            Mark as Returned
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" className="text-center py-4 text-muted">No active bookings found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;