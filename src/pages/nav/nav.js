import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import './nav.css'; 
import { MyContext } from '../auth/context';
import images from "../img/Egyptia_Antiqua_for_tour_guides_logo-removebg-preview.png";

export default function Home() {
  const { value, setValue } = useContext(MyContext);

  if (value === "default value") {
    setValue(JSON.parse(window.localStorage.getItem("user")));
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav id="top" className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <img
          id="top-logo"
          src={images}
          alt="Egyptia Antiqua Logo"
          className="navbar-logo"
        />
        <div className="navbar__links d-flex align-items-center">
          <Link to="/" className="nav-link mx-2">Home</Link>
          {window.localStorage.getItem("user") && 
            value.person === "admin" && (
              <Link to="/dashboard" className="nav-link mx-2">Dashboard</Link>
          )}
          <Link to="/packages" className="nav-link mx-2">Tour List</Link>
          <Link to="/cart" className="nav-link mx-2">
            <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i> Cart
          </Link>
          <Link to="/wishlist" className="nav-link mx-2">
            <i className="fas fa-heart" aria-hidden="true"></i> Wish List
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar__auth d-flex align-items-center justify-content-between">
            <form id="top-search" className="d-flex mx-2" role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Ex: Aswan, New Alamein ..."
                aria-label="Search"
              />
              <button className="btn btn-outline-success" id="search-button" type="submit">
                <i className="fas fa-search" aria-hidden="true"></i>
              </button>
            </form>
            {!window.localStorage.getItem("user") ? (
              <>
                <Link to="/signup">
                  <Button variant="outline-primary" className="auth-button mx-2">Sign Up</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline-primary" className="auth-button mx-2">Sign In</Button>
                </Link>
              </>
            ) : (
              <NavDropdown
                title={
                  <img
                    src={images}
                    width="50px"
                    height="50px"
                    style={{ borderRadius: '50%' }}
                    alt="Dropdown Icon"
                    className="dropdown-icon"
                  />
                }
                id="navbarScrollingDropdown"
                className="text-dark"
              >
                <NavDropdown.Item>
                  <Button onClick={handleLogout} variant="outline-primary" className="w-100 text-center">Logout</Button>
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/userdashboard" className="text-dark">
                  My Profile
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
