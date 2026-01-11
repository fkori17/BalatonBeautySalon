import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../styles/pages/user/Treatments.css";
function Treatments() {
  const [treatments, setTreatments] = useState(null);

  useEffect(() => {
    api.get("/treatments/me").then(res => setTreatments(res.data));
  }, []);

  if (!treatments) return <p>Betöltés...</p>;

  return (
    <div className="treatments-page">
      <h1 className="page-title">Kezeléseim</h1>

      <div className="treatments-table">
        <div className="table-header">
          <span>Dátum</span>
          <span>Megnevezés</span>
          <span>Ár</span>
          <span>Részletek</span>
        </div>

        {treatments.map(t => (
          <div className="table-row" key={t.id}>
            <span>{t.created_at.split("T")[0]}</span>
            <span>{t.description}</span>
            <span>{t.realprice} Ft</span>
            <span className="icon">🔍</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Treatments;