import { useEffect, useCallback, useMemo, useState } from "react";
import "../../components/style/AdminTreatments.css";
import {
  Search,
  CalendarEvent,
  Trash,
  PencilSquare,
  CheckCircle,
  ExclamationTriangle,
} from "react-bootstrap-icons";
import api from "../../api/axios";
import { Spinner, Toast, ToastContainer } from "react-bootstrap";

import TreatmentModal from "../../components/TreatmentModal";
import EditTreatmentModal from "../../components/EditTreatmentModal";
import DeleteTreatmentModal from "../../components/DeleteTreatmentModal";

function Treatments() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("Összes");
  const [dateFilter, setDateFilter] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [activeTreatment, setActiveTreatment] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });
  };

  const fetchTreatments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/treatments");
      setTreatments(response.data);
    } catch (error) {
      showToast("Hiba a betöltéskor", "danger");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTreatments();
  }, [fetchTreatments]);

  const filteredTreatments = useMemo(() => {
    return treatments.filter((t) => {
      const q = search.toLowerCase();
      const serviceNames = t.services
        .map((s) => s.name.toLowerCase())
        .join(", ");
      const matchesSearch =
        !q || t.customer.toLowerCase().includes(q) || serviceNames.includes(q);
      const matchesService =
        serviceFilter === "Összes" ||
        t.services.some((s) => s.name === serviceFilter);
      const treatmentDate = new Date(t.date).toISOString().split("T")[0];
      const matchesDate = !dateFilter || treatmentDate === dateFilter;
      return matchesSearch && matchesService && matchesDate;
    });
  }, [treatments, search, serviceFilter, dateFilter]);

  const handleSuccess = (msg) => {
    showToast(msg);
    fetchTreatments();
  };

  return (
    <div className="treatments-page">
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={3000}
          autohide
          bg={toast.variant}
        >
          <Toast.Body className="text-white d-flex align-items-center gap-2">
            {toast.variant === "success" ? (
              <CheckCircle />
            ) : (
              <ExclamationTriangle />
            )}
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="page-header">
        <h1 className="page-title">Kezelések</h1>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          Új kezelés rögzítése
        </button>
      </div>

      <div className="filters-row"></div>

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="warning" />
        </div>
      ) : (
        <div className="treatments-table">
          <div className="treatments-header">
            <span>Dátum</span>
            <span>Ügyfél</span>
            <span>Szolgáltatások</span>
            <span>Ár</span>
            <span>Megjegyzés</span>
            <span>Műveletek</span>
          </div>
          {filteredTreatments.map((t) => (
            <div className="treatments-row" key={t.id}>
              <span data-label="Dátum">
                {t.date ? new Date(t.date).toLocaleDateString("hu-HU") : "-"}
              </span>
              <span data-label="Ügyfél">{t.customer}</span>
              <span
                data-label="Szolgáltatások"
                title={t.services?.map((s) => s.name).join(", ")}
              >
                {t.services?.map((s) => `${s.name} (${s.piece}x)`).join(", ") ||
                  "Nincs szolgáltatás"}
              </span>
              <span data-label="Ár">
                {(Number(t.realprice) || 0).toLocaleString()} Ft
              </span>
              <span data-label="Megjegyzés" className="text-muted small">
                {t.description || "-"}
              </span>
              <div className="action-buttons">
                <button
                  className="icon-btn edit-btn"
                  onClick={() => {
                    setActiveTreatment(t);
                    setShowEditModal(true);
                  }}
                >
                  <PencilSquare size={18} />
                </button>
                <button
                  className="icon-btn delete-btn"
                  onClick={() => {
                    setActiveTreatment(t);
                    setShowDeleteModal(true);
                  }}
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <TreatmentModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={() => handleSuccess("Sikeresen hozzáadva!")}
      />

      <EditTreatmentModal
        show={showEditModal}
        treatment={activeTreatment}
        onHide={() => setShowEditModal(false)}
        onSuccess={(msg) => handleSuccess(msg)}
      />

      <DeleteTreatmentModal
        show={showDeleteModal}
        treatment={activeTreatment}
        onHide={() => setShowDeleteModal(false)}
        onSuccess={(msg) => handleSuccess(msg)}
      />
    </div>
  );
}

export default Treatments;
