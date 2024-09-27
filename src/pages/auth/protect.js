import { Navigate, Outlet } from "react-router-dom";

export default function Protect() {
    return (
    window.localStorage.getItem("user") ? <Outlet /> : <Navigate to="/login" />
    );
}
