import { Routes, Route } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import AdminHome from "../pages/admin/AdminHome";
// import Treatments from "../pages/admin/Treatments.jsx";
// import Customers from "../pages/admin/Customers.jsx";
// import Services from "../pages/admin/Services.jsx";
// import Stats from "../pages/admin/Stats.jsx";

function AdminLayout() {
  return (
    <div className="layout">
      <AdminSidebar />
      <main>
        <Routes>
          <Route path="/" element={<AdminHome />} />
          {/* <Route path="/treatments" element={<Treatments />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/services" element={<Services />} />
          <Route path="/stats" element={<Stats />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default AdminLayout;
