import "../components/style/AdminLoginCss.css";
import { useNavigate } from "react-router-dom";


function AdminLogin() {
  const handleSubmit = (e) => {

    e.preventDefault();
    // Post
    const response = {
      token: "admin-token",
    };

    localStorage.setItem("token", response.token);
    localStorage.setItem("authType", "admin");
    navigate("/admin");

  };

  return (
    <div className="login-page">
      <div className="login-card">
        <form className="login-left" onSubmit={handleSubmit}>
          <h1>Balaton Beauty<br /> Salon</h1>

          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Jelszó" required />

          <button type="submit">Bejelentkezés</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
