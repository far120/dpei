import React, { useEffect, useState } from 'react';
import Footer from './footer';
// import CardData from './index.json'; // Renamed for clarity

export default function Home() {
    const [show, setShow] = useState([]); // Use imported JSON data directly
    const [loading, setLoading] = useState(false); // Set loading to false since data is imported

    useEffect(() => {
        fetch("http://localhost:9000/carrsol")
        .then(response => response.json())
        .then(data => {
            setShow(data);
            setLoading(false);
        })
    }, []); 

    if (loading) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    return (
        <div>
            <div className="cont" style={{ width: '100%', objectFit: 'cover', maxHeight: "700px", margin: '10px' }}>
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {show.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : "false"}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {show.map((item, index) => (
                            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                                <img src={item.src} style={{ height: "700px", objectFit: 'cover' }} className="d-block w-100" alt={`Slide ${index + 1}`} />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{item.label}</h5>
                                    <p>{item.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
