import { useEffect, useMemo, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import api from "../api/axios";
import "./style/TreatmentModal.css";

function TreatmentModal({ show, onHide, onSuccess }) {
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [serviceSearch, setServiceSearch] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const [realprice, setRealprice] = useState(0);
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!show) return;

    setLoading(true);

    Promise.all([api.get("/admin/customers"), api.get("/admin/services")])
      .then(([customersRes, servicesRes]) => {
        setCustomers(customersRes.data);
        setServices(servicesRes.data);
      })
      .finally(() => setLoading(false));
  }, [show]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) =>
      `${c.name} ${c.email}`
        .toLowerCase()
        .includes(customerSearch.toLowerCase()),
    );
  }, [customers, customerSearch]);

  const filteredServices = useMemo(() => {
    return services.filter((s) =>
      s.name.toLowerCase().includes(serviceSearch.toLowerCase()),
    );
  }, [services, serviceSearch]);

  useEffect(() => {
    const sum = selectedServices.reduce((acc, s) => acc + s.price * s.piece, 0);
    setRealprice(sum);
  }, [selectedServices]);

  const addService = (service) => {
    if (selectedServices.find((s) => s.id === service.id)) return;
    setSelectedServices((prev) => [...prev, { ...service, piece: 1 }]);
    setServiceSearch("");
  };

  const updatePiece = (id, piece) => {
    setSelectedServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, piece: Math.max(1, piece) } : s)),
    );
  };

  const removeService = (id) => {
    setSelectedServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCustomer || selectedServices.length === 0) {
      setValidated(true);
      return;
    }

    await api.post("/admin/treatments", {
      customer_id: selectedCustomer.id,
      description,
      realprice,
      services: selectedServices.map((s) => ({
        service_id: s.id,
        piece: s.piece,
      })),
    });

    reset();
    onHide();
    onSuccess?.();
  };

  const reset = () => {
    setCustomerSearch("");
    setSelectedCustomer(null);
    setServiceSearch("");
    setSelectedServices([]);
    setRealprice(0);
    setDescription("");
    setValidated(false);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton className="treatment-modal-header">
        <Modal.Title>Új kezelés hozzáadása</Modal.Title>
      </Modal.Header>

      <Modal.Body className="treatment-modal">
        {loading ? (
          <div className="modal-loading">
            <Spinner animation="border" />
          </div>
        ) : (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Ügyfél</Form.Label>
              <Form.Control
                placeholder="Keresés név vagy email alapján..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
              />

              <div className="dropdown-list">
                {filteredCustomers.slice(0, 6).map((c) => (
                  <div
                    key={c.id}
                    className={`dropdown-item ${
                      selectedCustomer?.id === c.id ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedCustomer(c);
                      setCustomerSearch(`${c.name} (${c.email})`);
                    }}
                  >
                    {c.name} – {c.email}
                  </div>
                ))}
              </div>

              {!selectedCustomer && validated && (
                <div className="invalid-feedback d-block">
                  Ügyfél kiválasztása kötelező.
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Szolgáltatás hozzáadása</Form.Label>
              <Form.Control
                placeholder="Szolgáltatás keresése..."
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
              />

              <div className="dropdown-list">
                {filteredServices.slice(0, 6).map((s) => (
                  <div
                    key={s.id}
                    className="dropdown-item"
                    onClick={() => addService(s)}
                  >
                    {s.name} · {s.price} Ft
                  </div>
                ))}
              </div>
            </Form.Group>

            {selectedServices.map((s) => (
              <div key={s.id} className="selected-service">
                <span>{s.name}</span>

                <input
                  type="number"
                  min={1}
                  value={s.piece}
                  onChange={(e) => updatePiece(s.id, Number(e.target.value))}
                />

                <span>{s.price * s.piece} Ft</span>

                <button type="button" onClick={() => removeService(s.id)}>
                  ✕
                </button>
              </div>
            ))}

            <Form.Group className="mb-3">
              <Form.Label>Megjegyzés</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Végösszeg (Ft)</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={realprice}
                onChange={(e) => setRealprice(Number(e.target.value))}
                required
              />
            </Form.Group>

            <Modal.Footer className="modal-footer-uniform">
              <Button variant="secondary" onClick={onHide}>
                Mégse
              </Button>
              <Button type="submit">Mentés</Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default TreatmentModal;
