import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../components/style/UserHome.css";
import { useLoading } from "../../context/LoadingContext";

function UserHome() {
  const [lastTreatment, setLastTreatment] = useState(null);
  const [stats, setStats] = useState(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);

    Promise.all([
      api.get("/treatments/me/last"),
      api.get("/treatments/me/stats"),
    ])
      .then(([lastRes, statsRes]) => {
        setLastTreatment(lastRes.data);
        setStats(statsRes.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatDate = (date) => {
    if (!date) return "-";
    return date.split("T")[0].replaceAll("-", ". ") + ".";
  };

  return (
    <div className="dashboard-container">
      <div className="welcome-card">
        <h1 className="welcome-title">Üdvözlünk, {stats?.username}!</h1>
        <h2 className="welcome-subtitle">Örülünk, hogy újra itt vagy!</h2>
      </div>

      <div className="content-sections">
        <div className="card last-treatment">
          <h2>Utolsó kezelés</h2>
          {console.log(lastTreatment)}
          {lastTreatment ? (
            <>
              <p>
                <strong>Dátum:</strong> {formatDate(lastTreatment.created_at)}
              </p>
              <ul>
                <li>{lastTreatment.description}</li>
              </ul>
              <button className="view-button">Megtekintés</button>
            </>
          ) : (
            <p>Még nincs rögzített kezelésed.</p>
          )}
        </div>

        <div className="card info-section">
          <h2>Információk</h2>
          <p>
            <strong>Következő ajánlott időpont:</strong> {stats?.next_visit}
          </p>
          <p>
            <strong>Eddigi kezelések száma:</strong> {stats?.total_treatments}
          </p>
          <p>
            <strong>Vendég mióta jár hozzánk:</strong>{" "}
            {formatDate(stats?.member_since)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
