import { Link } from "react-router-dom";

const Error = () => {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to="/">Go to Homepage</Link>
      </div>
    );
  };
  
  export default Error;
  