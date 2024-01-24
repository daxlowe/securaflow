import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/features/dashboard";
import Login from "@/features/login";
import Signup from "@/features/signup";
import AccountSettings from "@/features/account-settings";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function App() {
  const { user } = useAuthContext();

  return (
    <>
      <div className="flex-grow">
        <Routes>
          <Route path="/home" element={<Navigate to="/" />} />
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route path="/settings/profile" element={<AccountSettings />} />
          <Route path="/settings/account" element={<AccountSettings />} />
          <Route path="/settings/appearance" element={<AccountSettings />} />
          <Route path="/settings/notifications" element={<AccountSettings />} />
          <Route path="/settings/display" element={<AccountSettings />} />
        </Routes>
      </div>
    </>
  );
}
