import React from 'react';
import { ShieldCheck, Clock, BadgeCheck, CarFront } from 'lucide-react'; 

const About = () => {
    return (
        <div className="about-container">
            {/* --- Hero Section --- */}
            <div className="bg-primary text-white py-5 mb-5 shadow-sm" style={{ background: 'linear-gradient(45deg, #090909, #50545a)' }}>
                <div className="container text-center py-4">
                    <h1 className="display-4 fw-bold">About QuickTrip Cars</h1>
                    <p className="lead">Your Trusted Partner in Every Journey Since 2024.</p>
                </div>
            </div>

            <div className="container">
                {/* --- Our Story Section --- */}
                <div className="row align-items-center mb-5 pb-4">
                    <div className="col-md-6">
                        <h2 className="text-primary fw-bold mb-4">Our Story</h2>
                        <p className="text-muted fs-5 lh-base">
                            QuickTrip Cars started with a simple vision: to revolutionize the car rental experience in Sri Lanka. 
                            We realized that finding a reliable, high-quality vehicle at an affordable price was often a hassle. 
                            That's why we built QuickTrip.
                        </p>
                        <p className="text-muted fs-5 lh-base">
                            From our humble beginnings with just a few vehicles, we have grown into a trusted name, 
                            known for our diverse fleet, commitment to safety, and unparalleled customer service. 
                            Whether it's a quick trip across town or a long island-wide tour, we are here to drive you forward.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <img 
                            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800" 
                            alt="QuickTrip Cars Story" 
                            className="img-fluid rounded-4 shadow-lg"
                        />
                    </div>
                </div>

                {/* --- Mission & Commitment Section --- */}
                <div className="row rounded-4 p-5 mb-5 shadow-sm" style={{ backgroundColor: '#cfc1c1' }}>
                <div className="col-md-6 border-end">
                 <h3 className="fw-bold mb-3 text-dark">Our Mission</h3>
                 <p className="text-muted">
                  To provide reliable, affordable, and seamless transportation solutions that cater to the unique needs of every traveler. 
                 We strive to make every journey stress-free by offering the perfect car for every occasion.
        </p>
    </div>
    <div className="col-md-6 ps-md-5">
        <h3 className="fw-bold mb-3 text-dark">Our Commitment</h3>
        <p className="text-muted">
            At QuickTrip Cars, we are more than just a rental company; we are your travel partner. 
            Our team works tirelessly to ensure that our customers receive the best possible service and 
            a well-maintained fleet for total peace of mind.
        </p>
    </div>
</div>
                {/* --- Why Choose Us Section --- */}
                <h2 className="text-center fw-bold mb-5">Why Choose Us?</h2>
                <div className="row g-4 mb-5">
                    <div className="col-md-3 text-center">
                        <div className="p-4 rounded-4 bg-white shadow-sm h-100 border-top border-primary border-4">
                            <CarFront size={40} className="text-primary mb-3" />
                            <h5 className="fw-bold">Wide Range</h5>
                            <p className="small text-muted">From compact city cars to luxury SUVs, we have it all.</p>
                        </div>
                    </div>
                    <div className="col-md-3 text-center">
                        <div className="p-4 rounded-4 bg-white shadow-sm h-100 border-top border-primary border-4">
                            <BadgeCheck size={40} className="text-primary mb-3" />
                            <h5 className="fw-bold">Quality & Safety</h5>
                            <p className="small text-muted">Every vehicle undergoes a rigorous multi-point inspection.</p>
                        </div>
                    </div>
                    <div className="col-md-3 text-center">
                        <div className="p-4 rounded-4 bg-white shadow-sm h-100 border-top border-primary border-4">
                            <Clock size={40} className="text-primary mb-3" />
                            <h5 className="fw-bold">24/7 Support</h5>
                            <p className="small text-muted">Our dedicated team is always ready to assist you anytime.</p>
                        </div>
                    </div>
                    <div className="col-md-3 text-center">
                        <div className="p-4 rounded-4 bg-white shadow-sm h-100 border-top border-primary border-4">
                            <ShieldCheck size={40} className="text-primary mb-3" />
                            <h5 className="fw-bold">Transparent Pricing</h5>
                            <p className="small text-muted">No hidden fees. What you see is exactly what you pay.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Call to Action --- */}
            <div className="mt-5 shadow-lg position-relative" style={{ height: '300px' }}>
    {/* Background Image Carousel */}
    <div id="footerActionCarousel" className="carousel slide carousel-fade h-100" data-bs-ride="carousel">
        <div className="carousel-inner h-100">
            {/* Slide 1 */}
            <div className="carousel-item active h-100" data-bs-interval="3000">
                <img 
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1920" 
                    className="d-block w-100 h-100" 
                    alt="QuickTrip Luxury" 
                    style={{ objectFit: 'cover' }}
                />
            </div>

            {/* Slide 2 */}
            <div className="carousel-item h-100" data-bs-interval="3000">
                <img 
                    src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1920" 
                    className="d-block w-100 h-100" 
                    alt="QuickTrip SUVs" 
                    style={{ objectFit: 'cover' }}
                />
            </div>
            
            {/* Slide 3 */}
            <div className="carousel-item h-100" data-bs-interval="3000">
                <img 
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920" 
                    className="d-block w-100 h-100" 
                    alt="QuickTrip Performance" 
                    style={{ objectFit: 'cover' }}
                />
            </div>
        </div>

        
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-white text-center" 
             style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 2 }}>
            <h3 className="fw-bold display-6">Ready to start your journey?</h3>
            <p className="fs-5">Book your perfect car with **QuickTrip Cars** today.</p>
            <a href="/" className="btn btn-primary rounded-pill px-5 fw-bold mt-2 shadow-lg py-2">
                View All Cars
            </a>
        </div>
    </div>
</div>
        </div>
    );
};

export default About;