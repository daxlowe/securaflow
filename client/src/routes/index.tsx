import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/features/dashboard";
import Login from "@/features/login";
import Signup from "@/features/signup";
import Organization from "@/features/organization";
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
          <Route
            path="/organization"
            // element={user ? <Organization /> : <Navigate to="/login" />}
            element={<Organization />}
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
