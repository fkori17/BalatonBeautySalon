import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./style/TreatmentModal.css";

function TreatmentModal({ show, onHide }) {
  const [formData, setFormData] = useState({
    customer_id: "",
    description: "",
    realprice: "",
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log("Elküldött kezelés adatok:", formData);
      onHide();
      setFormData({
        customer_id: "",
        description: "",
        realprice: "",
      });
      setValidated(false);
    }

    setValidated(true);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop={false}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Új kezelés hozzáadása</Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body className="treatment-modal">

          <Form.Group className="uniform-field">
            <Form.Label>Ügyfél ID</Form.Label>
            <Form.Control
              type="number"
              name="customer_id"
              placeholder="Add meg az ügyfél ID-t"
              value={formData.customer_id}
              onChange={handleChange}
              required
              min={1}
            />
          </Form.Group>

          <Form.Group className="uniform-field">
            <Form.Label>Leírás</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Leírás (nem kötelező)"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="uniform-field">
            <Form.Label>Ár (Ft)</Form.Label>
            <Form.Control
              type="number"
              name="realprice"
              placeholder="Add meg az árat"
              value={formData.realprice}
              onChange={handleChange}
              required
              min={0}
            />
          </Form.Group>

        </Modal.Body>

        <Modal.Footer className="modal-footer-uniform">
          <Button variant="secondary" className="uniform-btn" onClick={onHide}>
            Mégse
          </Button>
          <Button type="submit" className="uniform-btn">
            Mentés
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default TreatmentModal;
