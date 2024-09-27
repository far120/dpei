import { Navigate, Outlet } from "react-router-dom";

export default function Protect() {
    return (
    window.localStorage.getItem("sign") ? <Outlet /> : <Navigate to="/login" />
    );
}
