import { useEffect, useState } from "react";
import api from "../../api/axios";
import ServiceModal from "../../components/ServiceModal";
import "../../components/style/Services.css";

function Services() {
  const [services, setServices] = useState([]);
  const [showService, setShowService] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/services");
      setServices(res.data);
    } catch {
      alert("Hiba történt a szolgáltatások betöltése során!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowService(true);
  };

  const handleAddNew = () => {
    setSelectedService(null);
    setShowService(true);
  };

  const toggleStatus = async (id) => {
    setServices(prev => 
      prev.map(s => 
        s.id === id 
          ? { ...s, status: s.status === "inactive" ? "active" : "inactive" } 
          : s
      )
    );

    try {
      await api.delete(`/admin/services/${id}`);
      fetchServices();
    } catch {
      alert("Hiba történt!");
      fetchServices();
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("hu-HU").format(value);
  };

  const activeServices = services.filter(s => s.status !== "inactive");
  const inactiveServices = services.filter(s => s.status === "inactive");

  return (
    <div className="services-page">
      <div className="page-header">
        <h1 className="page-title">Szolgáltatások</h1>
        <button className="add-btn" onClick={handleAddNew}>+ Új szolgáltatás</button>
      </div>

      <div className="tables-container">
        <div className="table-section">
          <h3 className="section-title">Aktív szolgáltatások</h3>
          <div className="services-table-wrapper">
            <table className="services-table">
              <thead>
                <tr>
                  <th>Név</th>
                  <th>Ár</th>
                  <th className="col-actions">Műveletek</th>
                </tr>
              </thead>
              <tbody>
                {!loading && activeServices.map((service) => (
                  <tr key={service.id}>
                    <td>{service.name}</td>
                    <td>{formatCurrency(service.price)} Ft</td>
                    <td className="col-actions">
                      <div className="action-buttons-container">
                        <button className="edit-btn" onClick={() => handleEdit(service)}>✏️</button>
                        <button className="delete-btn" onClick={() => toggleStatus(service.id)}>❌</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="table-section inactive-section">
          <h3 className="section-title">Deaktivált szolgáltatások</h3>
          <div className="services-table-wrapper">
            <table className="services-table">
              <thead>
                <tr>
                  <th>Név</th>
                  <th>Ár</th>
                  <th className="col-actions">Visszaállítás</th>
                </tr>
              </thead>
              <tbody>
                {!loading && inactiveServices.map((service) => (
                  <tr key={service.id}>
                    <td>{service.name}</td>
                    <td>{formatCurrency(service.price)} Ft</td>
                    <td className="col-actions">
                      <div className="action-buttons-container">
                        <button className="restore-btn" onClick={() => toggleStatus(service.id)}>🔄</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ServiceModal 
        show={showService} 
        onHide={() => setShowService(false)} 
        onSuccess={fetchServices}
        serviceData={selectedService}
      />
    </div>
  );
}

export default Services;