import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Contacts from "../pages/Contacts.jsx";
import ProtectedRoute from "./PrivateRoute.jsx";
import ContactForm from "../pages/ContactForm.jsx";
import { useAuth } from "../auth/AuthContext.jsx";

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={
          loading ? null : 
          isAuthenticated ? (
            <Navigate to="/contacts" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>

      <Route
        path="/contacts"
        element={
          <ProtectedRoute>
            <Contacts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contacts/new"
        element={
          <ProtectedRoute>
            <ContactForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contacts/:id/edit"
        element={
          <ProtectedRoute>
            <ContactForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
