import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('cars');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Form States
    const [selectedCar, setSelectedCar] = useState({ brand: '', model: '', dailyRate: '', isAvailable: true });
    const [newCar, setNewCar] = useState({ brand: '', model: '', dailyRate: '', isAvailable: true });

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

    useEffect(() => {
        fetchCars();
    }, []);

    // 1. Delete Function
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

    // 2. Add Car Function
    const handleAddCar = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/car/add', newCar);
            alert("New Car Added!");
            setNewCar({ brand: '', model: '', dailyRate: '', isAvailable: true });
            fetchCars();
        } catch (error) {
            alert("Failed to add car.");
        }
    };

    // 3. Update Car Function
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

            {/* --- Add Car Modal --- */}
            <div className="modal fade" id="addCarModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content rounded-4 border-0 shadow">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Add New Car</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleAddCar}>
                            <div className="modal-body">
                                <input type="text" className="form-control mb-3" placeholder="Brand" onChange={(e) => setNewCar({...newCar, brand: e.target.value})} required />
                                <input type="text" className="form-control mb-3" placeholder="Model" onChange={(e) => setNewCar({...newCar, model: e.target.value})} required />
                                <input type="number" className="form-control mb-3" placeholder="Daily Rate" onChange={(e) => setNewCar({...newCar, dailyRate: e.target.value})} required />
                                <select className="form-select" onChange={(e) => setNewCar({...newCar, isAvailable: e.target.value === 'true'})}>
                                    <option value="true">Available</option>
                                    <option value="false">Rented</option>
                                </select>
                            </div>
                            <div className="modal-footer border-0">
                                <button type="submit" className="btn btn-success w-100 rounded-pill" data-bs-dismiss="modal">Save Car</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* --- Edit Car Modal --- */}
            <div className="modal fade" id="editCarModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content rounded-4 border-0 shadow">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Edit Car Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleUpdateCar}>
                            <div className="modal-body">
                                <div className="mb-2"><label className="small fw-bold">Brand</label></div>
                                <input type="text" className="form-control mb-3" value={selectedCar.brand} onChange={(e) => setSelectedCar({...selectedCar, brand: e.target.value})} />
                                
                                <div className="mb-2"><label className="small fw-bold">Model</label></div>
                                <input type="text" className="form-control mb-3" value={selectedCar.model} onChange={(e) => setSelectedCar({...selectedCar, model: e.target.value})} />
                                
                                <div className="mb-2"><label className="small fw-bold">Daily Rate</label></div>
                                <input type="number" className="form-control mb-3" value={selectedCar.dailyRate} onChange={(e) => setSelectedCar({...selectedCar, dailyRate: e.target.value})} />
                                
                                <div className="mb-2"><label className="small fw-bold">Status</label></div>
                                <select className="form-select" value={selectedCar.isAvailable} onChange={(e) => setSelectedCar({...selectedCar, isAvailable: e.target.value === 'true'})}>
                                    <option value="true">Available</option>
                                    <option value="false">Rented</option>
                                </select>
                            </div>
                            <div className="modal-footer border-0">
                                <button type="submit" className="btn btn-primary w-100 rounded-pill" data-bs-dismiss="modal">Update Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BookingManagement = () => {
    return (
        <div className="card border-0 shadow-sm p-4 rounded-4">
            <h4 className="fw-bold mb-4">Customer Bookings</h4>
            <table className="table">
                <thead className="table-dark">
                    <tr><th>ID</th><th>Customer</th><th>Car</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#BK-1001</td>
                        <td>Dilshan Bandara</td>
                        <td>Toyota Allion</td>
                        <td><span className="badge bg-warning text-dark px-3 rounded-pill">Rented</span></td>
                        <td><button className="btn btn-sm btn-primary rounded-pill px-3">Mark Available</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;