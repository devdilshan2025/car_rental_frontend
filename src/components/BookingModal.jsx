import React, { useState, useEffect } from 'react';

import axiosInstance from '../api/axiosInstance'; 

const BookingModal = ({ car }) => {
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (pickupDate && returnDate) {
            const start = new Date(pickupDate);
            const end = new Date(returnDate);
            const diffTime = end - start;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays > 0) {
                setTotalPrice(diffDays * car.dailyRate);
            } else {
                setTotalPrice(0);
            }
        }
    }, [pickupDate, returnDate, car.dailyRate]);

    const handleBooking = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const loggedInUserId = localStorage.getItem('userId'); 

        console.log("Checking before send -> UserID:", loggedInUserId, "CarID:", car.carId);

        if (!loggedInUserId || loggedInUserId === "undefined") {
            alert("Please Login again! User ID not found.");
            setLoading(false);
            return;
        }

       const bookingRequest = {
            
            userId: parseInt(loggedInUserId), 
            carId: car.carId,
            pickupDate: pickupDate,
            returnDate: returnDate,
            totalPrice: totalPrice,
            status: "PENDING"
        };

        try {
            
            
            const response = await axiosInstance.post('/booking/create', bookingRequest);

            if (response.status === 200 || response.status === 201) {
                alert("Booking Successful! 🚗");
                window.location.reload();
            }
        } catch (error) {
            console.error("Backend Error Response:", error.response?.data);
            alert("Booking Failed! " + (error.response?.data?.message || "Internal Server Error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal fade" id="bookingModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 rounded-4 shadow-lg">
                    <div className="modal-header border-0 pt-4 px-4">
                        <h5 className="modal-title fw-bold text-dark">Rent {car.brand} {car.model}</h5>
                        <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-4 pt-0">
                        <form onSubmit={handleBooking}>
                            <div className="mb-3 text-start">
                                <label className="form-label small fw-bold text-muted">Pickup Date</label>
                                <input type="date" className="form-control rounded-pill border-0 shadow-sm px-3 py-2 bg-light" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required />
                            </div>
                            <div className="mb-4 text-start">
                                <label className="form-label small fw-bold text-muted">Return Date</label>
                                <input type="date" className="form-control rounded-pill border-0 shadow-sm px-3 py-2 bg-light" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />
                            </div>
                            <div className="p-3 rounded-4 mb-4 text-center" style={{ backgroundColor: '#eef2ff' }}>
                                <p className="text-muted small mb-1 fw-bold">Total Amount to Pay</p>
                                <span className="h3 fw-bold text-primary">Rs. {totalPrice}</span>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold py-2 shadow-sm" disabled={loading || totalPrice <= 0}>
                                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : "Confirm My Booking"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;