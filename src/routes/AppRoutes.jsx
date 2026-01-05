import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Contacts from "../pages/Contacts.jsx";
import ProtectedRoute from "./PrivateRoute.jsx";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/contacts"
        element={
          <ProtectedRoute>
            <Contacts />
          </ProtectedRoute>
        }
      />
      {/* <Route
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
      /> */}
    </Routes>
  );
}

export default AppRoutes;
