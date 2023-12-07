import { Routes, Route } from "react-router-dom";
import Home from "@/features/home"
import Dashboard from "@/features/dashboard";
import MenuBar from "@/components/menuBar/menuBar";
import Login from "@/features/login";
import Signup from "@/features/signup";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function App() {
    return (
        <div className="flex">
            <MenuBar />
            <div className="flex-grow">
                <Routes>
                    <Route path="/home" element={<Navigate to="/" />} />
                    <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                    <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}
