import { useNavigate } from "react-router-dom";
import { useState } from "react";

import api from "../api/axios.js";
import "../components/style/Login.css";

function AdminLogin() {
  const [user, setUser] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const adminLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post("/admin/login", { 
        user, password
      });


    localStorage.setItem("token", response.data.token);
    localStorage.setItem("authType", "admin");

    navigate("/admin");

    } catch {
      alert("Hibás admin belépési adatok");
    }

  };

  return (
    <div className="login-page">
      <div className="login-card compact">
        <form className="login-left" onSubmit={adminLogin}>
          <h1>Balaton Beauty<br /> Salon</h1>

          <input placeholder="Email" value={user} onChange={(e) => setUser(e.target.value)} />
          <input placeholder="Jelszó" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit">Bejelentkezés</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
