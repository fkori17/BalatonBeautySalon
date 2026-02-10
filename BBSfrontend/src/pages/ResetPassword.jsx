import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Kiolvassuk a URL-ből a tokent és az emailt
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setStatus({ type: "danger", message: "A két jelszó nem egyezik!" });
      return;
    }

    setLoading(true);
    try {
      await api.post("/reset-password", {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setStatus({
        type: "success",
        message:
          "Sikeres jelszóvisszaállítás! Átirányítás a bejelentkezéshez...",
      });
      setTimeout(() => navigate("/login"), 5173);
    } catch (err) {
      setStatus({
        type: "danger",
        message:
          err.response?.data?.message ||
          "Hiba történt. Lehet, hogy a link lejárt.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center pwreset"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px", padding: "20px" }}>
        <h3 className="text-center mb-4">Új jelszó megadása</h3>

        {status.message && (
          <Alert variant={status.type}>{status.message}</Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Új jelszó</Form.Label>
            <Form.Control
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Jelszó megerősítése</Form.Label>
            <Form.Control
              required
              type="password"
              minLength={8}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? "Folyamatban..." : "Jelszó frissítése"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default ResetPassword;
