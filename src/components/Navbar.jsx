import React from 'react';
import { Car } from 'lucide-react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

   const handleAdminLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', { email, password });

            if (response.data && response.data.token) {
                if (response.data.role === "ADMIN") {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('role', response.data.role);
                    
                    alert("Welcome Admin!");

                    // --- ආරක්ෂිතව Modal එක වහන ක්‍රමය ---
                    const modalElement = document.getElementById('adminLoginModal');
                    
                    // 1. Modal එකෙන් 'show' class එක අයින් කරන්න
                    modalElement.classList.remove('show');
                    modalElement.style.display = 'none';
                    modalElement.setAttribute('aria-hidden', 'true');

                    // 2. අර කළු පාට පසුබිම (backdrop) අයින් කරන්න
                    const backdrop = document.querySelector('.modal-backdrop');
                    if (backdrop) {
                        backdrop.remove();
                    }

                    // 3. Body එකේ scroll එක ආයේ හදන්න
                    document.body.classList.remove('modal-open');
                    document.body.style.overflow = 'auto';
                    document.body.style.paddingRight = '0px';

                    // 4. දැන් Navigate කරන්න
                    navigate('/admin-dashboard'); 
                    
                } else {
                    alert("Access Denied! You are not an Admin.");
                }
            }
        } catch (error) {
            console.error("Login Error Details:", error); // Inspect එකේ බලන්න දැන් මොකක්ද එන්නේ කියලා
            alert("Invalid Admin Credentials!");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        alert("Logged Out Successfully!");
        window.location.reload();
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center fw-bold fs-3" to="/">
                        <Car color="#0d6efd" size={35} className="me-2" /> 
                        QuickTrip<span className="text-primary">Cars</span>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item"><Link className="nav-link px-3" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link px-3" to="/about">About</Link></li>
                            <li className="nav-item">
                                <button className="nav-link px-3 btn border-0 bg-transparent text-light fw-semibold shadow-none" data-bs-toggle="modal" data-bs-target="#adminLoginModal">
                                    Admin
                                </button>
                            </li>
                            {isLoggedIn ? (
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger btn-sm ms-lg-2 px-3 fw-bold" onClick={handleLogout}>Log Out</button>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <button className="nav-link px-3 btn border-0 bg-transparent text-light fw-semibold" data-bs-toggle="modal" data-bs-target="#loginModal">Log In</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Admin Login Modal */}
            <div className="modal fade" id="adminLoginModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 rounded-4 shadow">
                        <div className="modal-header border-0 pt-4 px-4">
                            <h5 className="modal-title fw-bold">Admin Login Only</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body p-4 pt-0">
                            <form onSubmit={handleAdminLogin}>
                                <div className="mb-3 text-start">
                                    <label className="form-label small fw-bold">Admin Email</label>
                                    <input type="email" name="email" className="form-control rounded-pill bg-light border-0 px-3 py-2" required />
                                </div>
                                <div className="mb-4 text-start">
                                    <label className="form-label small fw-bold">Password</label>
                                    <input type="password" name="password" className="form-control rounded-pill bg-light border-0 px-3 py-2" required />
                                </div>
                                <button type="submit" className="btn btn-dark w-100 rounded-pill fw-bold py-2">Login as Admin</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;