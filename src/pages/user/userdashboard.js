import { useContext, useEffect, useMemo, useState } from 'react'; // Corrected useState
import { json, Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../auth/context';
export default function UserDashboard() {
    const { value ,setvalue } = useContext(MyContext);  
    const [user, setuser] = useState(); // Corrected useState usage
    const navigate = useNavigate()

  useEffect(() => {
    setuser(value);
    },[]);

if (!user) {
    return <div>Loading user data...</div>;  
  }
    return (
        <div>
            <h2>ALL User Data</h2>
            <div key={user.id} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p>
        <Link to={`userdashboardupdate/${user.id}`}><button>Update</button></Link>
    </div>
        </div>
    );
}
