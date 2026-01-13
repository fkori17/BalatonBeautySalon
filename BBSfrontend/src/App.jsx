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

import UserHome from "./pages/user/UserHome";
import UserTreatments from "./pages/user/Treatments";
import UserProfile from "./pages/user/Profile";
import UserContact from "./pages/user/Contact";

import AdminHome from "./pages/admin/AdminHome";
import AdminTreatments from "./pages/admin/Treatments";
import AdminCustomers from "./pages/admin/Customers";
import AdminServices from "./pages/admin/Services";
import AdminStats from "./pages/admin/Stats";

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
          path="/user"
          element={
            <ProtectedRoute allowedType="user">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserHome />} />
          <Route path="treatments" element={<UserTreatments />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="contact" element={<UserContact />} />
        </Route>

        {/* ADMIN dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedType="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="treatments" element={<AdminTreatments />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="stats" element={<AdminStats />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
