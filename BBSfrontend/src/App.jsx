import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import ResetPassword from "./pages/ResetPassword";

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
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import Loader from "./components/Loader";

function AppRoutes() {
  const { loading } = useLoading();

  return (
    <>
      {loading && <Loader />}

      <Routes>
        {/* Login oldalak */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/reset-password" element={<ResetPassword />} />

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
    </>
  );
}

function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
