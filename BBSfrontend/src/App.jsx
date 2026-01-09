// import LoginComponent from "./pages/Login.jsx";
import "./App.css";
// import StatCard from "./components/StatCard.jsx";
// import IconStatCard from "./components/IconStatCard.jsx";
// import { Row, Col } from "react-bootstrap";
// import { PeopleFill, PersonCheckFill, CashStack, CalendarCheck, PersonHearts, PersonFillUp  } from "react-bootstrap-icons";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login oldalak */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* USER dashboard */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute allowedType="user">
              <UserLayout />
            </ProtectedRoute>
          }
        />

        {/* ADMIN dashboard */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedType="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        {/* Alapértelmezett átirányítás */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
