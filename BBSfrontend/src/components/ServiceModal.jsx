import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../api/axios";

function ServiceModal({ show, onHide, service, onSuccess }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Alaphelyzetbe állítás, amikor a Modal kinyílik/bezárul
  useEffect(() => {
    if (service) {
      setName(service.name);
      setPrice(service.price);
    } else {
      setName("");
      setPrice("");
    }
    setValidated(false); // Validáció állapotának törlése minden nyitásnál
  }, [service, show]);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault(); // Megállítjuk az oldal újratöltését

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);
    try {
      const payload = { name, price: Number(price) };
      
      if (service) {
        await api.put(`/admin/services/${service.id}`, payload);
      } else {
        await api.post("/admin/services", payload);
      }
      
      onHide();
      onSuccess();
    } catch (error) {
      console.error("Mentési hiba:", error);
      // Itt érdemes lenne egy hibajelzést mutatni a felhasználónak
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      {/* A Form körbeöleli a tartalamt, a noValidate kikapcsolja a böngésző alapértelmezett buborékait */}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {service ? "Szolgáltatás szerkesztése" : "Új szolgáltatás"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="serviceName">
            <Form.Label>Szolgáltatás neve</Form.Label>
            <Form.Control
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Adj meg egy szolgáltatás nevet!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="servicePrice">
            <Form.Label>Ár (Ft)</Form.Label>
            <Form.Control
              required
              type="number"
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
            />
            <Form.Control.Feedback type="invalid">
              Kérlek adj meg egy érvényes árat (min. 1)!
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Mégse
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Folyamatban..." : "Mentés"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ServiceModal;