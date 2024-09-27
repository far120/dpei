import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../auth/context";

import axios from 'axios';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const {value , setvalue} = useContext(MyContext);
  console.log(value);

  useEffect(() => {
    fetch("http://localhost:9000/packages")
      .then((response) => response.json())
      .then((data) => {
        setPackages(data);
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);


  const remove = (userid) => {
    fetch(`http://localhost:9000/packages${userid}`, {
        method: 'DELETE',
        
    })
        .then(response => response.json())
        .then(() => {
            setPackages(packages.filter((u) => u.ID!== userid));
        })
        .catch(error => console.error('Error deleting :', error));
};


  if (!packages) {
    return <div>Loading...</div>; 
  }

  const show = packages.map((item) => {
    return (
      <div key={item.ID} className="col-md-4 mb-4">
        <div className="card" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
          <div className="image-half position-relative">
            <Link to={`/${item.ID}`}>
              <img src={item.src1} className="card-img-top" alt={item.Title} style={{ height: '200px', objectFit: 'cover' }} />
            </Link>
            <i className="fa-regular fa-heart heart-icon position-absolute top-0 end-0 m-2"></i>
            <ul className="badges-list position-absolute top-0 start-0 m-2 ">
        
                <li>
                  <span className="badge bg-dark best-seller-badge">Best Seller</span>
                </li>
                <li>
                <span className="badge bg-dark best-seller-badge">New</span>
                </li>

             
            </ul>
          </div>
          <div className="card-body">
            <h5 className="card-title">{item.Title}</h5>
            <div className="rating mb-2">
              <span className="reviews">({item.Review_Numbers} reviews)</span>
            </div>
            
            
            <p className="card-text">{item.Description}</p>
            <div className="price">
                <i className="fa-solid fa-star">{item.Rating}</i>
              <p className="h3 text-gold">${item.Price}</p>
              <p><small>per person</small></p>
              {  window.localStorage.getItem("user")  && value.person == "admin" ?(
                  <button onClick={() => remove(item.ID)} className="btn btn-danger">Remove</button>
                ):
                (null)}
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
