import { useEffect, useState } from "react";
import api from "../../api/axios";
import ServiceModal from "../../components/ServiceModal";
import "../../components/style/Services.css";

function Services() {
  const [services, setServices] = useState([]);
  const [showService, setShowService] = useState(false);

  useEffect(() => {
    api.get("/admin/services").then((res) => {
      setServices(res.data);
    });
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("hu-HU").format(value);
  };

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Szolgáltatásaink</h1>
        <button className="add-service-btn" onClick={() => setShowService(true)}>
          + Új szolgáltatás
        </button>
      </div>

      <div className="services-table-wrapper">
        <table className="services-table">
          <thead>
            <tr>
              <th className="col-name">Név</th>
              <th className="col-price">Ár</th>
              <th className="col-actions">Művelet</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td className="col-name">{service.name}</td>
                <td className="col-price">{formatCurrency(service.price)} Ft</td>
                <td className="col-actions">
                  <button className="action-btn">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ServiceModal show={showService} onHide={() => setShowService(false)} />
    </div>
  );
}

export default Services;
