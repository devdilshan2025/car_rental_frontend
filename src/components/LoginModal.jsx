import React, { useState } from 'react';
import axios from 'axios';

const LoginModal = () => {
    // UI එක Login සහ Signup අතර මාරු කිරීමට
    const [isLoginView, setIsLoginView] = useState(true);
    
    // Form Inputs සඳහා States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Backend Endpoints
        const loginUrl = 'http://localhost:8080/api/v1/auth/login';
        const registerUrl = 'http://localhost:8080/api/v1/auth/register';

        try {
            if (isLoginView) {
                // --- LOGIN LOGIC ---
                const response = await axios.post(loginUrl, { email, password });
                
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token);
                    alert("Login Successfully!");
                    window.location.reload(); 
                }
            } else {
                // --- REGISTER LOGIC ---
                const newUser = {
                    name: name,
                    email: email,
                    password: password,
                    role: "CUSTOMER" // Postman එකේ වැඩ කළේ මේක නිසා මේකම පාවිච්චි කරමු
                };

                console.log("Sending Register Data:", newUser);

                const response = await axios.post(registerUrl, newUser);
                
                // Postman එකේ 200 ආපු නිසා අපි මෙතන check කරන්නේ 200 හෝ 201
                if (response.status === 200 || response.status === 201) {
                    alert("Registration Successful!");
                    setIsLoginView(true); // සාර්ථක වුණාම ලොගින් එකට මාරු කරනවා
                    // Fields ටික clear කරමු
                    setName('');
                }
            }
        } catch (error) {
            console.error("Auth Error:", error.response?.data || error.message);
            if (isLoginView) {
                alert("Login Invalid! Please check your credentials.");
            } else {
                alert("Registration Failed! Email might already exist or server error.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true" style={{ backdropFilter: 'blur(10px)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 rounded-4 shadow-lg" style={{ backgroundColor: '#eef2ff' }}>
                    
                    <div className="modal-header border-0 pe-4 pt-4">
                        <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-primary">
                                {isLoginView ? 'Welcome Back!' : 'Create Account'}
                            </h2>
                            <p className="text-muted small">
                                {isLoginView ? 'Login to continue your rental' : 'Join with DriveSelect today'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {!isLoginView && (
                                <div className="mb-3 text-start">
                                    <label className="form-label fw-semibold small ms-2 text-dark">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control rounded-pill px-3 py-2 border-0 shadow-sm" 
                                        placeholder="Dilshan Bandara"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required 
                                    />
                                </div>
                            )}
                            
                            <div className="mb-3 text-start">
                                <label className="form-label fw-semibold small ms-2 text-dark">Email Address</label>
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
                                <label className="form-label fw-semibold small ms-2 text-dark">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control rounded-pill px-3 py-2 border-0 shadow-sm" 
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary w-100 rounded-pill fw-bold py-2 shadow-sm"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                ) : (isLoginView ? 'Log In' : 'Sign Up')}
                            </button>
                        </form>

                        <div className="text-center mt-4">
                            <p className="small text-muted mb-0">
                                {isLoginView ? "Don't have an account?" : "Already have an account?"} 
                                <button 
                                    className="btn btn-link text-primary fw-bold text-decoration-none p-0 ms-1 shadow-none"
                                    onClick={() => setIsLoginView(!isLoginView)}
                                    type="button"
                                >
                                    {isLoginView ? 'Sign Up' : 'Log In'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;