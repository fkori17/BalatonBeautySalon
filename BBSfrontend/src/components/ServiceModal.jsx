import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./style/ServiceModal.css";

function ServiceModal({ show, onHide }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
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
      console.log("Elküldött szolgáltatás adatok:", formData);
      onHide();
      setFormData({
        name: "",
        price: "",
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
      backdrop={true}
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Új szolgáltatás hozzáadása</Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body className="service-modal">

          <Form.Group className="uniform-field">
            <Form.Label>Szolgáltatás neve</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Add meg a szolgáltatás nevét"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="uniform-field">
            <Form.Label>Ár (Ft)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Add meg az árat"
              value={formData.price}
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

export default ServiceModal;
