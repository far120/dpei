import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../auth/context";
import axios from 'axios';
import './packages.css';  // Add custom CSS for more styling options

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [cheack, setcheack] = useState(false);
  const { value, setvalue } = useContext(MyContext);
  console.log(value);

  useEffect(() => {
    fetch("http://localhost:9000/packages")
      .then((response) => response.json())
      .then((data) => {
        setPackages(data);
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }, [cheack]);

  const remove = (userid) => {
    if (window.confirm("Are you sure you want to remove this package?")) {
      // Optimistically update the UI before awaiting response
      const updatedPackages = packages.filter((u) => u.ID !== userid);
      setPackages(updatedPackages);
      
      fetch(`http://localhost:9000/packages/${userid}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete");
          }
          return response.json();
        })
        .then(() => {
          console.log("Package removed successfully");
          setcheack(true);
        })
        .catch((error) => {
          console.error('Error deleting:', error);
          setPackages(packages);
        });
    }
  };
  

  if (!packages) {
    return <div>Loading...</div>;
  }

  const show = packages.map((item) => {
    return (
      <div key={item.ID} className="col-md-4 mb-4">
        <div
          className="card"
          style={{
            minHeight: '600px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <div className="image-half position-relative">
            <Link to={`/${item.ID}`}>
            <img
  src={item.src1 ? item.src1 : `/img/${item.ID}`}
  className="card-img-top"
  alt={item.Title}
  style={{ height: '200px', objectFit: 'cover' }}
/>

            </Link>
            <i className="fa-regular fa-heart heart-icon position-absolute top-0 end-0 m-2"></i>
            <ul className="badges-list position-absolute top-0 start-0 m-2">
              <li>
                <span className="badge bg-dark best-seller-badge">Best Seller</span>
              </li>
              <li>
                <span className="badge bg-dark best-seller-badge">New</span>
              </li>
            </ul>
          </div>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{item.Title}</h5>
            <div className="rating mb-2">
              <span className="reviews">({item.Review_Numbers} reviews)</span>
            </div>
            <p className="card-text">{item.Description}</p>
            <div className="price mb-2">
              <i className="fa-solid fa-star"> {item.Rating}</i>
              { item.disPrice > 0 ? (
                <>
                  <p className="h3 text-gold">
                    $<del>{item.Price}</del> <span>{item.disPrice}</span>
                  </p>
                  <p><small>per person</small></p>
                </>
              ) : (
                <>
                  <p className="h3 text-gold">${item.Price}</p>
                  <p><small>per person</small></p>
                </>
              )}
            </div>
            <div className="mt-auto">
              <Link to={`/${item.ID}`} className="btn btn-primary mb-2 w-100">Show</Link>
              <Link to={`/cart/${item.ID}`} className="btn btn-outline-primary mb-2 w-100">Add to Cart</Link>
              {window.localStorage.getItem("user") && value.person === "admin" && (
                <>
                  <button onClick={() => remove(item.id)} className="btn btn-danger mb-2 w-100">
                    Remove
                  </button>
                  <Link to={`/edit/${item.id}`} className="btn btn-secondary w-100">Edit</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <h1 className="text-center mb-4">Packages</h1>
      <div className="container">
        <div className="row">
          {show}
        </div>
      </div>
    </>
  );
}
