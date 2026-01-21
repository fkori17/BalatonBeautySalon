import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../components/style/Login.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await api.post("/admin/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("authType", "admin");
      navigate("/admin");
    } catch {
      alert("Hibás belépési adatok");
    }
  };

  const EyeIcon = ({ active }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
      {!active && <line x1="4" y1="20" x2="20" y2="4" strokeLinecap="round" />}
    </svg>
  );

  return (
    <div className="login-page">
      <div className="login-card admin">
        <Form
          className="login-left"
          onSubmit={handleLogin}
          noValidate
          validated={validated}
        >
          <h1>Balaton Beauty Salon</h1>

          <Form.Group className="mb-3" controlId="adminEmail">
            <Form.Control
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="custom-input"
            />
            <Form.Control.Feedback type="invalid">
              Kérlek, add meg az email címed!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="adminPassword">
            <div className="input-wrapper">
              <Form.Control
                required
                type={showPass ? "text" : "password"}
                placeholder="Jelszó"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="custom-input"
              />
              <span className="icon" onClick={() => setShowPass((v) => !v)}>
                <EyeIcon active={showPass} />
              </span>
              <Form.Control.Feedback type="invalid">
                Kérlek, add meg a jelszavad!
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Button type="submit" className="login-btn">
            Bejelentkezés
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AdminLogin;
