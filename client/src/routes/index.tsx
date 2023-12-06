import { Routes, Route } from "react-router-dom";
import Home from "@/features/home"
import Dashboard from "@/features/dashboard"
import MenuBar from "@/components/menuBar/menuBar";

export default function App() {
    return (
        <div className="flex">
            <MenuBar />
            <div className="flex-grow">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </div>
        </div>
    );
}
