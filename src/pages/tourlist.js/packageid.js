"use client";
import React from 'react';
import './tourDetials.css';
import tours from './tours.json';
import { useState, useEffect } from 'react';
export default function TourDetails(tourID_) {
  const [selectedTours, setSelectedtours] = useState([]);
  const [selectedTour, setSelectedtour] = useState(null);
  tourID_ = "1";
  useEffect(() => {
    if (tourID_) {
      const tour = tours.find((t) => t.tourID === tourID_);
      setSelectedtour(tour);
      if (tour) {
        const sameDest = tours.filter((t) => t.destination === tour.destination);
        setSelectedtours(sameDest);
      }
    }
  }, [tourID_]);
  if (!selectedTour) {
    return <div>Loading...</div>;
  }
  function displayRating(rating) {
    const solidStars = Math.floor(rating); // solid stars (filled)
    const totalStars = 5; // out of 5 stars
    const stars = [];
  
    for (let i = 0; i < solidStars; i++) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    for (let i = solidStars; i < totalStars; i++) {
      stars.push(<i key={i + totalStars} className="fa-regular fa-star"></i>);
    }
  
    return (
      <div className="d-flex align-items-center">
        {stars}
        <div className="ms-2">{rating}</div>
      </div>
    );
  }
  return (
    <div>
      <section id="tour-details" className="container mt-5">
      <p className="lead">{selectedTour.category}</p>
      <h3><strong>{selectedTour.tourName}</strong></h3>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center stars" id="rating">
          {displayRating(selectedTour.rating)}
        </div>
        <p>
          <a
            href="#review-link"
            className="flex-start link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-10-hover"
          >
            {" "}
            Reviews{" "}
          </a>
        </p>
        <button
          type="button"
          id="wishlist-button1"
          className="btn btn-outline-danger d-flex align-items-center ms-3"
        >
          <i className="fa-regular fa-heart"></i>{" "}
          <div className="ms-2">Wish List</div>
        </button>
      </div>

      <section id="photo-gallery">
        <div className="row justify-content-between">
          <div className="photo-frame col-4">
            <img
              className="mx-auto d-block"
              src={selectedTour.gallery.photo1}
              alt="Grand Egyptian Museum"
            />
          </div>
          <div className="photo-frame col-3">
            <img
              className="mx-auto d-block"
              src={selectedTour.gallery.photo2}
              alt="Grand Egyptian Museum"
            />
          </div>
          <div id="side-photos" className="col-4">
            <div className="photo-frame row">
              <img
                className="mx-auto d-block"
                src={selectedTour.gallery.photo3}
                alt="Grand Egyptian Museum"
              />
            </div>
            <div className="photo-frame row mt-3">
              <img
                className="mx-auto d-block"
                src={selectedTour.gallery.photo4}
                alt="Grand Egyptian Museum"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="row justify-content-between">
        <div id="more-info" className="col-lg-6 col-12">
          <p>
            {selectedTour.overview}
          </p>
          <div id="About">
            <h2>
              <strong>
                <small>About this activity.</small>
              </strong>
            </h2>
            <div className="row row-cols-1 row-cols-lg-2 ">
              <div className="col-1">
                <i className="fa-regular fa-calendar"></i>
              </div>
              <div className="col-11">
                <h5 className="h4">Free cancellation</h5>{" "}
                <p>
                  <small>
                    This line of text is meant to be treated as fine print.
                  </small>
                </p>
              </div>
              <div className="col-1">
                <i className="fa-regular fa-clock"></i>
              </div>
              <div className="col-11">
                <h5 className="h4">{selectedTour.duration}</h5>{" "}
                <p>
                  <small>
                    Check availability to see starting times.
                  </small>
                </p>
              </div>
              <div className="col-1">
                <i className="fa-regular fa-flag"></i>
              </div>
              <div className="col-11">
                <h5 className="h4">Live tour guide</h5>{" "}
                <p>
                  <small>English</small>
                </p>
              </div>
              <div className="col-1">
                <i className="fa-solid fa-user-group"></i>
              </div>
              <div className="col-11">
                <h5 className="h4">Small group</h5>{" "}
                <p>
                  <small>Limited to 7 participants</small>
                </p>
              </div>
            </div>
          </div>

          <form id="select-form">
            <h4>
              <strong>Select participants and date</strong>
            </h4>
            <div className="btn-group">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-user-group"></i> Adults
              </button>
              <ul className="dropdown-menu">
                <li>
                  <label htmlFor="customRange3" className="form-label">
                    Adults
                  </label>
                  <input
                    type="number"
                    className="form-range"
                    min="0"
                    max="42"
                    step="1"
                    id="customRange3"
                  />
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-user-group"></i> Children
              </button>
              <ul className="dropdown-menu">
                <li>
                  <label htmlFor="customRange3" className="form-label">
                  Children
                  </label>
                  <input
                    type="number"
                    className="form-range"
                    min="0"
                    max="42"
                    step="1"
                    id="customRange3"
                  />
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-regular fa-calendar"></i> Select Date
              </button>
              <ul className="dropdown-menu">
                <li>
                  <input type="date" />
                </li>
              </ul>
            </div>
            <button type="button" className="btn btn-primary mt-1">
              Book this tour
            </button>
          </form>
          <div id="experience">
            <h2>
              <strong>Description</strong>
            </h2>
            <div className="row row-cols-sm-1 row-cols-lg-2">
              <hr />
              <div className="col-lg-8 col-12">
                <p>
                {selectedTour.description}{" "}
                  <a href="#">
                    see more
                  </a>
                </p>
              </div>
              <hr />
            </div>
          </div>
        </div>
    <div className="col-lg-5 col-12 ms-5 mt-3">
      <div id="price" className="row row-cols-2 justify-content-around">
        <div className="col-3">
          <h4>
            From <strong>{selectedTour.price.adult} E£</strong> <small>per adult</small>
          </h4>
        </div>
        <div className="col-5">
          <a className="btn btn-primary" href="#" role="button">
            Book this tour
          </a>
        </div>
      </div>

      <div id="product">
        <h6>
          <strong>Product_id: </strong>{selectedTour.tourID}
        </h6>
        <h6>
          <strong>Provider: </strong>
          <a href="#">a_tour_company</a>
        </h6>
      </div>

      <iframe
        src={selectedTour.meetUpOnMap}
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
      </div>
      <h4>
        <strong>You might also like..</strong>
      </h4>
    </section>
  </div>
  );
}

