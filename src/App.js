import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Nav from "./pages/nav/nav";
import Home from "./pages/Home/home";
import Userdashboard from "./pages/user/userdashboard";
import Userdashboardupdate from "./pages/user/userdashboardupdate";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MyContext } from './pages/auth/context';
import Dashboard from "./pages/admin/dashboard";
import Dashboardupdate from "./pages/admin/dashboardupdate";
import Protect from "./pages/auth/protect";
import Error  from "./Erorr";
import Packages from "./pages/tourlist.js/packages";



function App() {
  const { value } = useContext(MyContext);
  const navigate = useNavigate();
  window.addEventListener('beforeunload', function () {
    localStorage.removeItem("sign")
});

  return (
    <>
    <Nav /> 
    
    
      <Routes>
       
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="*" element={<Error />} />  


      <Route  element={<Protect/>}>
      { value?.person === "admin" ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/dashboardupdate/:id" element={<Dashboardupdate />} />
        </>
      ) : (
        null)
      }
          <Route path="/userdashboard" element={<Userdashboard />} />
          <Route path="/userdashboard/userdashboardupdate/:id" element={<Userdashboardupdate />} />
         </Route> 
        </Routes>
    </>
  );
}

export default App;
