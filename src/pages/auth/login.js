import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { MyContext } from './context';
export default function Login() {  
    const { value, setValue } = useContext(MyContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState("");
    const [accept, setAccept] = useState(false);

    useEffect(() => {
        if (email && password) {
            fetch("http://localhost:9000/author")
                .then(response => response.json())
                .then((data) => {
                    const user = data.find(element => element.email === email && element.password === password);
                    setShow(user);
                   
                })
                .catch((error) => console.error('Fetch error:', error));
        }
    }, [email, password]);


    function handleSubmit(e) {
        e.preventDefault();
        setAccept(true);

        if (password.length >= 8 && show) {
            window.localStorage.setItem("sign", true);
            window.localStorage.setItem("user", JSON.stringify(show));
      
            setValue(show)

            navigate("/");
        } else {
            alert("Failed to log in. Please check your email or password.");
        }
    }

    return (
        
        <div className="back-image">
            <div className="pa">
                <form className="forms" onSubmit={handleSubmit}>
                    <h2 className='ff'>Login</h2>
                    <label className='ff'>Email:</label>
                    <input 
                        type="email" 
                        className='ff' 
                        id="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                    /><br />
                    <label className='ff'>Password:</label>
                    <input 
                        type="password" 
                        className='ff' 
                        id="pass" 
                        onChange={(e) => setPassword(e.target.value)} 
                    /><br />
                    {password.length < 8 && accept && (
                        <p>Password must be greater than 8 characters</p>
                    )}
                    <input type="submit" value="Submit" />
                </form>
            </div>


        </div>
    );
}
