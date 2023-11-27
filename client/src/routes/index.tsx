import { Routes, Route } from "react-router-dom";
import Home from "@/features/home"
export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/home" element={<Home />} />
            </Routes>
        </div>
    );
}
