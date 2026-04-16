import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
                email: email,
                password: password
            });

            if (response.data) {
                // 1. කලින් තිබුණු දත්ත (old tokens) අයින් කිරීම
                localStorage.clear(); 

                // 2. අලුත් User තොරතුරු සේව් කිරීම
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('role', response.data.role);

                // 3. කළු පාට Backdrop එක (Darkness) අතින් අයින් කිරීම
                // Bootstrap Modal එකක් නිසා එන dark layer එක මෙයින් අයින් කරනවා
                const backdrops = document.getElementsByClassName('modal-backdrop');
                while (backdrops.length > 0) {
                    backdrops[0].parentNode.removeChild(backdrops[0]);
                }
                document.body.classList.remove('modal-open');
                document.body.style.overflow = 'auto';

                alert("Login Successful! Your UserId is: " + response.data.userId); 
                
                // 4. Role එක අනුව අදාළ පේජ් එකට යැවීම (Refresh එකක් සහිතව)
                if (response.data.role === "ADMIN") {
                    window.location.href = "/admin-dashboard";
                } else {
                    window.location.href = "/";
                }
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data);
            alert("Login Failed! Please check your email and password.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow border-0 rounded-4 p-4" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#eef2ff' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">Welcome Back!</h2>
                    <p className="text-muted">Login to your QuickTrip account</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mb-3 text-start">
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
                    <div className="mb-4 text-start">
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
                    <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold py-2 shadow-sm">
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