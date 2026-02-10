import { useState } from "react";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";
import api from "../api/axios";
import "./style/CustomerModal.css";

function CustomerModal({ show, onHide, onSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    loyal: false,
  });

  const [validated, setValidated] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      await api.post("/admin/customers", formData);

      showToast("Ügyfél sikeresen létrehozva!", "success");
      onSuccess(); // lista frissítése
      setTimeout(onHide, 800); // modal zárása

      setFormData({
        email: "",
        password: "",
        name: "",
        phone: "",
        loyal: false,
      });
      setValidated(false);
    } catch (err) {
      showToast(
        err.response?.data?.message || "Hiba történt mentés közben!",
        "danger",
      );
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Új ügyfél hozzáadása</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body className="new-client-modal">
            <Form.Group>
              <Form.Label>Email *</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Érvényes email kötelező.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Jelszó *</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                minLength={8}
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Teljes név *</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Telefonszám *</Form.Label>
              <Form.Control
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="Visszatérő vendég"
              name="loyal"
              checked={formData.loyal}
              onChange={handleChange}
            />
          </Modal.Body>

          <Modal.Footer className="modal-footer-uniform">
            <Button variant="secondary" onClick={onHide}>
              Mégse
            </Button>
            <Button type="submit">Mentés</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Toast */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg={toast.variant}
          show={toast.show}
          autohide
          delay={3000}
          onClose={() => setToast((t) => ({ ...t, show: false }))}
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default CustomerModal;
