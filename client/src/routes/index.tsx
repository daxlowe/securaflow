import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/features/dashboard";
import Login from "@/features/login";
import Signup from "@/features/signup";
import Organization from "@/features/organization";
import AccountSettings from "@/features/account-settings";
import { useAuthContext } from "@/hooks/useAuthContext";
import Loading from "@/components/Loading";

export default function App() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }

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
            path="/manage"
            element={user ? <Organization /> : <Navigate to="/login" />}
          />
          <Route
            path="/manage/users"
            element={user ? <Organization /> : <Navigate to="/login" />}
          />
          <Route
            path="/manage/teams"
            element={user ? <Organization /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings/profile"
            element={user ? <AccountSettings /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings/appearance"
            element={user ? <AccountSettings /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings/teams"
            element={user ? <AccountSettings /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </>
  );
}
