import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../api/axios"; 
import "./style/ServiceModal.css";

function ServiceModal({ show, onHide, onSuccess, serviceData }) {
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (serviceData) {
      setFormData({
        name: serviceData.name || "",
        price: serviceData.price || "",
      });
    } else {
      setFormData({ name: "", price: "" });
    }
    setValidated(false);
  }, [serviceData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      if (serviceData) {
        await api.put(`/admin/services/${serviceData.id}`, formData);
      } else {
        await api.post("/admin/services", formData);
      }
      onSuccess();
      onHide();
    } catch {
      alert("Hiba történt!");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {serviceData ? "Szolgáltatás módosítása" : "Új szolgáltatás hozzáadása"}
        </Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Szolgáltatás neve</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Ár (Ft)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min={0}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="modal-footer-uniform">
          <Button variant="secondary" onClick={onHide} className="uniform-btn">
            Mégse
          </Button>
          <Button type="submit" className="uniform-btn save-btn-style">
            {serviceData ? "Mentés" : "Létrehozás"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ServiceModal;