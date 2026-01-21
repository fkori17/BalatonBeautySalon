import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../components/style/Login.css";
import { Toast, ToastContainer, Modal } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "danger",
  });

  const showToast = (message, variant = "danger") => {
    setToast({ show: true, message, variant });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await api.post("/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("authType", "user");
      navigate("/user");
    } catch {
      showToast("Hibás email cím vagy jelszó!", "danger");
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

  const sendResetLink = async () => {
    if (!resetEmail) {
      showToast("Add meg az email címed!", "danger");
      return;
    }

    setResetLoading(true);

    try {
      await api.post("/forgot-password", {
        email: resetEmail,
      });

      showToast("Jelszó-visszaállító email elküldve!", "success");
      setShowForgot(false);
      setResetEmail("");
    } catch {
      showToast("Nincs ilyen email címmel regisztrált felhasználó", "danger");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card wide">
        <Form
          className="login-left"
          onSubmit={handleLogin}
          noValidate
          validated={validated}
        >
          <h1>Balaton Beauty Salon</h1>

          <Form.Group className="mb-3">
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

          <Form.Group className="mb-3">
            <div className="input-wrapper">
              <Form.Control
                required
                type={showPass ? "text" : "password"}
                placeholder="Jelszó"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="custom-input password-input"
              />
              <span
                className="login-icon"
                onClick={() => setShowPass((v) => !v)}
              >
                <EyeIcon active={showPass} />
              </span>
              <Form.Control.Feedback type="invalid">
                Kérlek, add meg a jelszavad!
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <div className="forgot" onClick={() => setShowForgot(true)}>
            Elfelejtett jelszó?
          </div>

          <Button type="submit" className="login-btn">
            Bejelentkezés
          </Button>
        </Form>

        <div className="divider"></div>

        <div className="login-right">
          <img src="/bbs-logo-mocha.svg" alt="BBS Logo" className="logo" />

          <div className="socials">
            <a
              href="https://www.facebook.com/PelsoNailsPedicureBalatonPedikurMukorom"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="bi bi-facebook"></i>
            </a>

            <a
              href="https://www.google.com/maps/place/Balaton+Beauty+Salon/@46.692272,17.3724761,17z/data=!4m8!3m7!1s0x4768ff50bd34212f:0x60aec0da3bc4268!8m2!3d46.692272!4d17.3724761!9m1!1b1!16s%2Fg%2F11frc36v1b?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google"
              className="google"
            >
              <i className="bi bi-google"></i>
            </a>

            <a
              href="https://www.instagram.com/balatonbeautysalon/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <Modal show={showForgot} onHide={() => setShowForgot(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Elfelejtett jelszó</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p style={{ fontSize: "14px", marginBottom: "12px" }}>
            Add meg az email címed, és küldünk egy jelszó-visszaállító linket.
          </p>

          <Form.Control
            type="email"
            placeholder="Email cím"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForgot(false)}>
            Mégse
          </Button>

          <Button
            variant="primary"
            onClick={sendResetLink}
            disabled={resetLoading}
          >
            {resetLoading ? "Küldés..." : "Email küldése"}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg={toast.variant}
          show={toast.show}
          delay={3000}
          autohide
          onClose={() => setToast((t) => ({ ...t, show: false }))}
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Login;
