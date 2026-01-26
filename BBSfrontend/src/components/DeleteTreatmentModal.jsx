import { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { ExclamationTriangle } from "react-bootstrap-icons";
import api from "../api/axios";

function DeleteTreatmentModal({ show, onHide, onSuccess, treatment }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!treatment) return;
    setLoading(true);
    try {
      await api.delete(`/admin/treatments/${treatment.id}`);
      onSuccess?.("Kezelés sikeresen törölve!");
      onHide();
    } catch (error) {
      console.error("Hiba a törlés során:", error);
      alert("Hiba történt a törléskor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="treatment-modal-header">
        <Modal.Title className="text-danger d-flex align-items-center gap-2">
          <ExclamationTriangle /> Kezelés törlése
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="treatment-modal text-center py-4">
        <p>Biztosan törölni szeretnéd a következő kezelést?</p>
        <div className="fw-bold my-2">
          {treatment?.customer} -{" "}
          {new Date(treatment?.date).toLocaleDateString("hu-HU")}
        </div>
        <p className="small text-danger">Ez a művelet nem vonható vissza!</p>
      </Modal.Body>

      <Modal.Footer className="modal-footer-uniform">
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Mégse
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={loading}
          style={{ backgroundColor: "#dc3545", border: "none" }}
        >
          {loading ? <Spinner size="sm" /> : "Végleges törlés"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteTreatmentModal;
