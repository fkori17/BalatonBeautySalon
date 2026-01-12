import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../components/style/UserHome.css";

function UserHome() {
  const [lastTreatment, setLastTreatment] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/treatments/me/last").then(res => setLastTreatment(res.data));
    api.get("/treatments/me/stats").then(res => setStats(res.data));
  }, []);

  if (!stats) return <p>Betöltés...</p>;

  return (
    <div className="dashboard-container">
        <div className="welcome-card">
            <h1 className="welcome-title">Üdvözlünk, {stats.username}!</h1>
            <h2 className="welcome-subtitle">Örülünk, hogy újra itt vagy!</h2>
        </div>

        <div className="content-sections">

            {/* Utolsó kezelés */}
            <div className="card last-treatment">
            <h2>Utolsó kezelés</h2>

            {lastTreatment ? (
                <>
                <p><strong>Dátum:</strong> {lastTreatment.created_at.split("T")[0]}</p>
                <ul>
                    <li>{lastTreatment.description}</li>
                </ul>
                <button className="view-button">Megtekintés</button>
                </>
            ) : (
                <p>Még nincs rögzített kezelésed.</p>
            )}
            </div>

            {/* Információk */}
            <div className="card info-section">
            <h2>Információk</h2>
            <p><strong>Következő ajánlott időpont:</strong> {stats.next_visit}</p>
            <p><strong>Eddigi kezelések száma:</strong> {stats.total_treatments}</p>
            <p><strong>Vendég mióta jár hozzánk:</strong> {stats.member_since}</p>
            </div>

        </div>
    </div>
  );
}

export default UserHome;