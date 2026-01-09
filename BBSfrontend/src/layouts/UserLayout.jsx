import { Routes, Route } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import UserHome from "../pages/user/UserHome";
// import Treatments from "../pages/user/Treatments";
// import Contact from "../pages/user/Contact";
// import Profile from "../pages/user/Profile";

function UserLayout() {
  return (
    <div className="layout">
      <UserSidebar />
      <main>
        <Routes>
          <Route path="/" element={<UserHome />} />
          {/* <Route path="/treatments" element={<Treatments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default UserLayout;
