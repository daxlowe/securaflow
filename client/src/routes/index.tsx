import { Routes, Route } from "react-router-dom";
import Home from "@/features/home"
import Dashboard from "@/features/dashboard"
export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </div>
    );
}
