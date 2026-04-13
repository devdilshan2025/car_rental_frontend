import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login Details:", { email, password });
        
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow border-0 rounded-4 p-4" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#eef2ff' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">Welcome Back!</h2>
                    <p className="text-muted">Login to your DriveSelect account</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email Address</label>
                        <input 
                            type="email" 
                            className="form-control rounded-pill px-3 py-2 border-0 shadow-sm" 
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Password</label>
                        <input 
                            type="password" 
                            className="form-control rounded-pill px-3 py-2 border-0 shadow-sm" 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold py-2 shadow-sm transition-all">
                        Log In
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="small text-muted">Don't have an account? <a href="/register" className="text-primary fw-bold text-decoration-none">Sign Up</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;