import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './login.css';

export default function SignUp() {
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const [accept, setaccept] = useState(false);
    
    function handleNameChange(e) {
        setname(e.target.value);
    }
    function handleEmailChange(e) {
        setemail(e.target.value);
    }
    function handlePasswordChange(e) {
        setpassword(e.target.value);
    }
    function handleCpasswordChange(e) {
        setcpassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setaccept(true);
        if (name === "" || password.length < 8 || password !== cpassword || email === "") {
            return false;
        }
        const person =  email.toLowerCase().includes("@admin") ? "admin" : "user";
         axios.post("http://localhost:9000/author", {
                name,  
                email,
                password,
                person
            })
            .then(response => {
                console.log(response);
                navigate("/login");
            })
            .catch(error => {
                console.error('Error:', error);
            });
    
    }

    return (
        <div className="back-image">
            <div className="pa">
                <form className="forms" onSubmit={handleSubmit}>
                    <h2>SignUp</h2>

                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        id="name"
                        onChange={handleNameChange}
                    />
                    <br />
                    {accept && name === "" && <p className="error">Name is required</p>}

                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        id="email"
                        onChange={handleEmailChange}
                    />
                    <br />
                    {accept && email === "" && <p className="error">Email is required</p>}

                    <label>Password:</label>
                    <input
                        type="password"
                        value={password} // Bound the value
                        id="pass"
                        onChange={handlePasswordChange}
                    />
                    <br />
                    {accept && password.length < 8 && (
                        <p className="error">Password must be at least 8 characters</p>
                    )}

                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={cpassword} // Bound the value
                        id="confirmPass"
                        onChange={handleCpasswordChange}
                    />
                    <br />
                    {accept && cpassword !== password && (
                        <p className="error">Passwords do not match</p>
                    )}

                    <input type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
}
