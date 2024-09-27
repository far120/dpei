import { useEffect, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
export default function Dashboard() {
    const [user, setuser] = useState([]); 
    const navigate = useNavigate()

    function showuser() {
        fetch('http://localhost:9000/author')
        .then(response => response.json())
        .then(data =>{
            setuser(data);
        })
        .catch(error => console.error('Error:', error));
    }
    
    useEffect(() => {
        showuser();  
    }, []);

    const handleDelete = (userid) => {
        fetch(`http://localhost:9000/author/${userid}`, {
            method: 'DELETE',
            
        })
            .then(response => response.json())
            .then(() => {
                showuser(); 
            })
            .catch(error => console.error('Error deleting :', error));
    };

  

const show = user.map((item) => (
    <div key={item.id} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
        <h3>{item.name}</h3>
        <p>Email: {item.email}</p>
        <p>Password: {item.password}</p>
        <p>person: {item.person}</p>
        <Link to={`dashboardupdate/${item.id}`}><button>Update</button></Link>
        <button onClick={() => handleDelete(item.id)}>Delete</button>
    </div>
));


    return (
        <div>
            <h2>ALL User Data</h2>
            {show}
        </div>
    );
}
