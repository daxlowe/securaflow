import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/features/dashboard"
import MenuBar from "@/components/menuBar/menuBar";
import Login from "@/features/login"
import Signup from "@/features/signup";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function App() {
    const { user } = useAuthContext();

    return (
        <div className="flex">
            <MenuBar />
            <div className="flex-grow">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </div>
        <div>
            <Routes>
                <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            </Routes>
        </div>
    );
}
