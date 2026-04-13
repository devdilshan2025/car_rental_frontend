import React, { useState } from 'react';

const LoginModal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with:", { email, password });
        
    };

    return (
        <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true" style={{ backdropFilter: 'blur(8px)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 rounded-4 shadow-lg" style={{ backgroundColor: '#eef2ff' }}>
                    <div className="modal-header border-0 pe-4 pt-4">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-5 pt-0">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-primary">Welcome Back!</h2>
                            <p className="text-muted small">Login to your DriveSelect account</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 text-start">
                                <label className="form-label fw-semibold small ms-2">Email Address</label>
                                <input 
                                    type="email" 
                                    className="form-control rounded-pill px-3 py-2 border-0 shadow-sm" 
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4 text-start">
                                <label className="form-label fw-semibold small ms-2">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control rounded-pill px-3 py-2 border-0 shadow-sm" 
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold py-2 shadow-sm">
                                Log In
                            </button>
                        </form>

                        <div className="text-center mt-4">
                            <p className="small text-muted mb-0">Don't have an account? <a href="#" className="text-primary fw-bold text-decoration-none">Sign Up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;