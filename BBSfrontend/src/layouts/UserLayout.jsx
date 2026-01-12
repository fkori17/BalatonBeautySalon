import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";

function UserLayout() {
  return (
    <UserSidebar>
      <Outlet />
    </UserSidebar>
  );
}

export default UserLayout;
