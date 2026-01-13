import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../components/style/Treatments.css";
import { Search } from "react-bootstrap-icons";

function Treatments() {
  const [treatments, setTreatments] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/treatments/me")
      .then(res => setTreatments(res.data))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (date) => {
    return date.split("T")[0].replaceAll("-", ". ") + ".";
  };

  const formatServices = (services) => {
    if (!services || services.length === 0) return "-";

    return services
      .map(s => (s.piece > 1 ? `${s.name} (${s.piece}x)` : s.name))
      .join(", ");
  };

   if (loading) {
    return (
      <div className="treatments-page">
        <p>Betöltés...</p>
      </div>
    );
  }

  return (
    <div className="treatments-page">
      <h1 className="page-title">Kezeléseim</h1>

      <div className="treatments-table">
        <div className="table-header">
          <span>Dátum</span>
          <span>Szolgáltatások</span>
          <span>Részletek</span>
          <span></span>
        </div>

        {treatments.map(treatment => (
          <div className="table-row" key={treatment.id}>
            <span className="date">
              {formatDate(treatment.created_at)}
            </span>

            <span className="services ellipsis">
              {formatServices(treatment.services)}
            </span>

            <span className="details ellipsis">
              {treatment.description}
            </span>

            <button
              className="icon-btn"
              title="Részletek"
              onClick={() => console.log("Treatment ID:", treatment.id)}
            >
              <Search size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Treatments;
