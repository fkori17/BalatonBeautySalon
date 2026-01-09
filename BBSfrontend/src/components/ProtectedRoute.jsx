import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedType, children }) {
  const token = localStorage.getItem("token");
  const authType = localStorage.getItem("authType");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedType && authType !== allowedType) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}


export default ProtectedRoute;
