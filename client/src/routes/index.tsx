import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/features/home"
import Dashboard from "@/features/dashboard"
import Login from "@/features/login"
import Signup from "@/features/signup";

import { useAuthContext } from "@/hooks/useAuthContext";

export default function App() {
    const {user} = useAuthContext();
    return (
        <div>
            <Routes>
                <Route path="/" element={user ? <Dashboard /> : <Navigate to="/signup" />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
                <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    );
}
