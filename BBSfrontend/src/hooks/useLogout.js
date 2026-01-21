import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function useLogout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {
      // 
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("authType");
      navigate("/login");
    }
  };

  return logout;
}
