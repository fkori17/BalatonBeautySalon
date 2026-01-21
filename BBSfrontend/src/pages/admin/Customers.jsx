import { useEffect, useState } from "react";
import api from "../../api/axios";
import CustomerModal from "../../components/CustomerModal";
import EditCustomerModal from "../../components/EditCustomerModal";
import DeleteCustomerModal from "../../components/DeleteCustomerModal";
import "../../components/style/AdminCustomers.css";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { Toast, ToastContainer } from "react-bootstrap";

function Customers() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCustomers = () => {
    setLoading(true);
    api
      .get("/admin/customers")
      .then((res) => setCustomers(res.data))
      .finally(() => setLoading(false));
  };

  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/customers/${selectedCustomer.id}`);

      setCustomers((prev) => prev.filter((c) => c.id !== selectedCustomer.id));

      showToast("Ügyfél sikeresen törölve");
    } catch {
      showToast("Hiba történt a törlés során", "danger");
    } finally {
      setShowDeleteModal(false);
      setSelectedCustomer(null);
    }
  };

  const formatDate = (date) =>
    date ? date.split("T")[0].replaceAll("-", ". ") + "." : "-";

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="treatments-page">
      <div className="page-header">
        <h1 className="page-title">Ügyfél profilok</h1>

        <div className="page-actions">
          <input
            type="text"
            className="search-input"
            placeholder="Keresés név vagy email alapján…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            Új ügyfél hozzáadása
          </button>
        </div>
      </div>

      <div className="treatments-table">
        <div className="table-header">
          <span>ID</span>
          <span>Név</span>
          <span>Email</span>
          <span>Visszatérő</span>
          <span>Regisztráció</span>
          <span>Telefonszám</span>
          <span>Művelet</span>
        </div>

        {loading && <p>Betöltés...</p>}

        {!loading &&
          filteredCustomers.map((c) => (
            <div className="table-row" key={c.id}>
              <span>{c.id}</span>
              <span className="ellipsis">{c.name}</span>
              <span className="ellipsis">{c.email}</span>

              <span>
                {c.loyal ? (
                  <span className="badge badge-success">Igen</span>
                ) : (
                  <span className="badge badge-muted">Nem</span>
                )}
              </span>

              <span className="ellipsis">{formatDate(c.created_at)}</span>
              <span className="ellipsis">{c.phone}</span>

              <div className="actions">
                <button
                  className="icon-btn edit-btn"
                  onClick={() => {
                    setEditCustomer(c);
                    setShowEditModal(true);
                  }}
                >
                  <PencilSquare size={18} />
                </button>

                <button
                  className="icon-btn delete-btn"
                  onClick={() => {
                    setSelectedCustomer(c);
                    setShowDeleteModal(true);
                  }}
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}
      </div>

      <CustomerModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={fetchCustomers}
      />
      <EditCustomerModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        customer={editCustomer}
        onSuccess={fetchCustomers}
      />
      <DeleteCustomerModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        customer={selectedCustomer}
      />
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg={toast.variant}
          show={toast.show}
          delay={3000}
          autohide
          onClose={() => setToast((t) => ({ ...t, show: false }))}
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Customers;
