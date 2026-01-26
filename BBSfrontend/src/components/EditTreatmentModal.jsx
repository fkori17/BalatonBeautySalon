import { useEffect, useState, useMemo, useRef } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import api from "../api/axios";
import "./style/TreatmentModal.css";

function EditTreatmentModal({ show, onHide, onSuccess, treatment }) {
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [serviceSearch, setServiceSearch] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [realprice, setRealprice] = useState(0);
  const [description, setDescription] = useState("");

  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (!show) return;

    setLoading(true);
    api
      .get("/admin/services")
      .then((res) => setAllServices(res.data))
      .finally(() => setLoading(false));
  }, [show]);

  useEffect(() => {
    if (!show || !treatment) return;

    setDescription(treatment.description || "");

    setRealprice(Number(treatment.realprice) || 0);

    const mapped = (treatment.services || []).map((s) => ({
      id: s.id,
      name: s.name,
      price: Number(s.price) || 0,
      piece: Number(s.piece) || 1,
    }));

    isInitialLoad.current = true;
    setSelectedServices(mapped);
  }, [show, treatment]);

  const filteredServices = useMemo(() => {
    return allServices.filter((s) =>
      s.name.toLowerCase().includes(serviceSearch.toLowerCase()),
    );
  }, [allServices, serviceSearch]);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    const sum = selectedServices.reduce(
      (acc, s) => acc + Number(s.price) * Number(s.piece),
      0,
    );
    setRealprice(sum);
  }, [selectedServices]);

  const addService = (service) => {
    if (selectedServices.some((s) => s.id === service.id)) return;

    setSelectedServices((prev) => [
      ...prev,
      { id: service.id, name: service.name, price: service.price, piece: 1 },
    ]);
    setServiceSearch("");
  };

  const updatePiece = (id, value) => {
    const piece = Math.max(1, Number(value) || 1);
    setSelectedServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, piece } : s)),
    );
  };

  const removeService = (id) => {
    setSelectedServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      alert("Legalább egy szolgáltatás kötelező.");
      return;
    }

    setLoading(true);
    try {
      await api.put(`/admin/treatments/${treatment.id}`, {
        description,
        realprice,
        services: selectedServices.map((s) => ({
          service_id: s.id,
          piece: s.piece,
        })),
      });

      onSuccess?.("Kezelés sikeresen frissítve");
      onHide();
    } catch (error) {
      console.error("Hiba a mentésnél:", error);
      alert("Szerver hiba történt a mentéskor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Kezelés szerkesztése</Modal.Title>
      </Modal.Header>

      <Modal.Body className="treatment-modal">
        <div className="mb-3 p-3 bg-light rounded">
          <strong>Ügyfél:</strong> {treatment?.customer}
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Szolgáltatás hozzáadása</Form.Label>
            <Form.Control
              placeholder="Szolgáltatás keresése..."
              value={serviceSearch}
              onChange={(e) => setServiceSearch(e.target.value)}
            />

            {serviceSearch && (
              <div className="dropdown-list">
                {filteredServices.slice(0, 5).map((s) => (
                  <div
                    key={`search-${s.id}`}
                    className="dropdown-item"
                    onClick={() => addService(s)}
                  >
                    {s.name} · {(Number(s.price) || 0).toLocaleString()} Ft
                  </div>
                ))}
              </div>
            )}
          </Form.Group>

          {selectedServices.map((s) => (
            <div key={`selected-${s.id}`} className="selected-service">
              <span>{s.name}</span>

              <input
                type="number"
                min={1}
                value={s.piece}
                onChange={(e) => updatePiece(s.id, e.target.value)}
              />

              <span>
                {(Number(s.price) * Number(s.piece)).toLocaleString()} Ft
              </span>

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
              value={realprice}
              onChange={(e) => setRealprice(Number(e.target.value))}
            />
          </Form.Group>

          <Modal.Footer className="modal-footer-uniform mt-4">
            <Button variant="secondary" onClick={onHide}>
              Mégse
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Mentés"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditTreatmentModal;
