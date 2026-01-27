import { useEffect, useState } from "react";
import api from "../../api/axios";
import ServiceModal from "../../components/ServiceModal";
import { PencilSquare, Trash, ArrowRepeat } from "react-bootstrap-icons";
import { Toast, ToastContainer, Spinner } from "react-bootstrap";
import "../../components/style/Services.css";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });

  const showToast = (message, variant = "success") =>
    setToast({ show: true, message, variant });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/services");
      setServices(res.data);
    } catch {
      showToast("Nem sikerült betölteni a szolgáltatásokat", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEditInitiate = (service) => {
    setEditing(service);
    setModalOpen(true);
  };

  const toggleService = async (service) => {
    try {
      const res = await api.patch(`/admin/services/${service.id}/toggle`);
      // Lokális state frissítése a szerver válasza alapján
      setServices(prev => prev.map(s => 
        s.id === service.id ? { ...s, active: res.data.active } : s
      ));
      showToast(res.data.active ? "Szolgáltatás aktiválva" : "Szolgáltatás deaktiválva");
    } catch {
      showToast("Művelet sikertelen", "danger");
    }
  };

  const active = services.filter(s => s.active);
  const inactive = services.filter(s => !s.active);

  if (loading) return (
    <div className="d-flex justify-content-center mt-5">
      <Spinner animation="border" />
    </div>
  );

  return (
    <div className="services-page">
      <div className="page-header">
        <h1>Szolgáltatások</h1>
        <button className="add-btn" onClick={() => { setEditing(null); setModalOpen(true); }}>
          + Új szolgáltatás
        </button>
      </div>

      <div className="tables-container">
        <ServiceTable
          title="Aktív szolgáltatások"
          services={active}
          onEdit={handleEditInitiate}
          onToggle={toggleService}
          icon={<Trash />}
        />

        <ServiceTable
          title="Inaktív szolgáltatások"
          services={inactive}
          onEdit={handleEditInitiate}
          onToggle={toggleService}
          icon={<ArrowRepeat />}
        />
      </div>

      <ServiceModal
        show={modalOpen}
        onHide={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        service={editing}
        onSuccess={() => {
          fetchServices();
          showToast(editing ? "Sikeres módosítás" : "Sikeres mentés");
        }}
      />

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg={toast.variant}
          show={toast.show}
          autohide
          delay={3000}
          onClose={() => setToast(t => ({ ...t, show: false }))}
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

function ServiceTable({ title, services, onEdit, onToggle, icon }) {
  return (
    <div className="table-section">
      <h3>{title}</h3>
      <table className="services-table">
        <thead>
          <tr>
            <th>Név</th>
            <th>Ár</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{Number(s.price).toLocaleString()} Ft</td>
              <td className="actions">
                <button title="Szerkesztés" onClick={() => onEdit(s)}>
                  <PencilSquare />
                </button>
                <button title={s.active ? "Deaktiválás" : "Aktiválás"} onClick={() => onToggle(s)}>
                  {icon}
                </button>
              </td>
            </tr>
          ))}
          {services.length === 0 && (
            <tr><td colSpan="3" className="text-center">Nincs megjeleníthető adat</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Services;