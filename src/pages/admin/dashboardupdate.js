import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Dashboardupdate() {
    const navigate = useNavigate()
    const [name, setname] = useState('');
    const [email, setemail] = useState();
    const [password, setpassword] = useState('');
    const [person, setperson] = useState('');
    const search = window.location.pathname.split('/').slice(-1)[0];
    useEffect(() => {
     
            fetch(`http://localhost:9000/author/${search}`)
           .then(res => res.json() )
           .then(data => {
                setname(data.name);
                setemail(data.email);
                setpassword(data.password);
                setperson(data.person);
                  
            })
           .catch(error => {
                console.error('Error fetching :', error);
            });
        
    }, [search]);

     const addData = (e) => {
        e.preventDefault();
           fetch(`http://localhost:9000/author/${search}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                   email,
                    password,
                    person
                    }),
            })
            .then(res => res.json())
            .then(data => {
                setname('');
                setemail('');
                setpassword('');
                navigate("/dashboard");
            })
           .catch(error => {
            console.error('Error updating :', error);
            });
           
        }

  

    return (
        <div>
             <Link to="/dashboard" ><button >showuser</button></Link>
            <form onSubmit={addData}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    placeholder="userName"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="useremail"
                />
                <button type="submit">update user</button>
            </form>
        </div>
    );
}