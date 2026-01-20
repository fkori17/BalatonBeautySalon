import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./style/CustomerModal.css";

function CustomerModal({ show, onHide }) {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
    name: "",
    phone: "",
    loyal: false,
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log("Elküldött adatok:", formData);
      onHide();
      setFormData({
        user: "",
        password: "",
        name: "",
        phone: "",
        loyal: false,
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
        <Modal.Title>Új ügyfél hozzáadása</Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body className="new-client-modal">

          <Form.Group className="uniform-field">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="user"
              placeholder="Írd be az email címet"
              value={formData.user}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="uniform-field">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Írd be a jelszót"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </Form.Group>

          <Form.Group className="uniform-field">
            <Form.Label>Teljes név</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Írd be a teljes nevet"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="uniform-field">
            <Form.Label>Telefonszám</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="Írd be a telefonszámot"
              value={formData.phone}
              onChange={handleChange}
              pattern="^[\\+]?[0-9]+$"
              required
            />
          </Form.Group>

          <Form.Group className="uniform-checkbox">
            <Form.Check
              type="checkbox"
              label="Visszatérő vendég"
              name="loyal"
              checked={formData.loyal}
              onChange={handleChange}
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

export default CustomerModal;
