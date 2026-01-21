import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../api/axios";
import { Toast, ToastContainer } from "react-bootstrap";
import "./style/CustomerModal.css";

function EditCustomerModal({ show, onHide, customer, onSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
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

  useEffect(() => {
    if (customer) {
      setFormData({
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
        loyal: customer.loyal,
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      await api.put(`/admin/customers/${customer.id}`, formData);
      setToast({ show: true, message: "Ügyfél frissítve", variant: "success" });
      onSuccess();
      onHide();
    } catch (err) {
      setToast({
        show: true,
        message: "Hiba történt a mentés során",
        variant: "danger",
      });
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ügyfél szerkesztése</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body className="new-client-modal">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Név</Form.Label>
              <Form.Control
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Telefonszám</Form.Label>
              <Form.Control
                required
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

export default EditCustomerModal;
