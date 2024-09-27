import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Updatedata() {
    const navigate = useNavigate();
    const [model, setmodel] = useState('');
    const [price, setprice] = useState();
    const [disprice, setdisprice] = useState();
    const [amount, setamount] = useState();
    const [rating, setrating] = useState();
    const [country, setcountry] = useState('');
    const [description, setdescription] = useState('');
    const [stock, setstock] = useState(0);
    const [company, setcompany] = useState('');
    const [year, setyear] = useState('');
    const [color, setcolor] = useState('');

    const search = window.location.pathname.split('/').slice(-1)[0];
    useEffect(() => {
            fetch(`http://localhost:9000/Cars/${search}`)
           .then(res => res.json() )
           .then(data => {
            setmodel(data.model);
            setprice(data.price);
            setdisprice(data.disprice);
            setamount(data.amount);
            setrating(data.rating);
            setcountry(data.country);
            setdescription(data.description);
            setstock(data.stock);
            setcompany(data.company);
            setyear(data.year);
            setcolor(data.color);    
            })
           .catch(error => {
                console.error('Error fetching :', error);
            });
        
    }, [search]);

    const updateData = (e) => {
        e.preventDefault();
    
        axios.put(`http://localhost:9000/Cars/${search}`, {
    model,
    company,
    year,
    color,
    price,
    disprice,
    rating,
    country,
    description,
    validtion:false,
    stock

        })
        .then(response => {  
           
                alert('Product added successfully!');
                setmodel('');
                setprice('');
                setamount('');
                setrating('');
                setcountry('');
                setdescription('');
                setstock(0);
                setcompany('');
                setyear('');
                setcolor('');
                navigate('/');
            
        })
        .catch(error => {
            console.error('Error adding product:', error);
        });
    
}
  

        return (
            <div className="container">
                <form >
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setmodel(e.target.value)}
                        placeholder="Model"
                    />
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setcompany(e.target.value)}
                        placeholder="Company"
                    />
                    <input
                        type="text"
                        value={year}
                        onChange={(e) => setyear(e.target.value)}
                        placeholder="Year"
                    />
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setcolor(e.target.value)}
                        placeholder="Color"
                    />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                        placeholder="Price"
                    />
                    <input
                        type="number"
                        value={disprice}
                        onChange={(e) => setdisprice(e.target.value)}
                        placeholder="disPrice"
                    />
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setrating(e.target.value)}
                        placeholder="Rating"
                    />
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setcountry(e.target.value)}
                        placeholder="Country"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                        placeholder="Description"
                    />
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setstock(e.target.value)}
                        placeholder="Stock"
                    />
                    <button onClick={updateData} type="submit">Add Product</button>
                </form>
            </div>
        );
        }