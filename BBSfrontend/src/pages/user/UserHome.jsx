import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "../../components/style/UserHome.css";
import { useLoading } from "../../context/LoadingContext";

function UserHome() {
  const [lastTreatment, setLastTreatment] = useState(null);
  const [stats, setStats] = useState(null);
  const [serviceStats, setServiceStats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    Promise.all([
      api.get("/treatments/me/last"),
      api.get("/treatments/me/stats"),
      api.get("/treatments/me/service-stats-3months"),
    ])
      .then(([lastRes, statsRes, serviceStatsRes]) => {
        setLastTreatment(lastRes.data);
        setStats(statsRes.data);
        setServiceStats(serviceStatsRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const formatServices = (services) => {
    if (!services || services.length === 0) return "-";

    return services
      .map((s) => `${s.name} [x${s.piece ?? s.pivot?.piece ?? 1}]`)
      .join(", ");
  };

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

          {lastTreatment ? (
            <>
              <p>
                <strong>Dátum:</strong> {formatDate(lastTreatment.created_at)}
              </p>

              <ul className="service-list">
                {lastTreatment.services?.map((service, index) => (
                  <li key={index}>
                    {service.name} [x{service.pivot?.piece ?? 1}]
                  </li>
                ))}
              </ul>

              <button
                className="view-button"
                onClick={() => {
                  setSelectedTreatment(lastTreatment);
                  setShowModal(true);
                }}
              >
                Megtekintés
              </button>
            </>
          ) : (
            <p>Még nincs rögzített kezelésed.</p>
          )}
        </div>

        <div className="card info-section">
          <h2>Elmúlt 3 hónap</h2>

          {serviceStats.length > 0 ? (
            <div className="service-stats-grid">
              {serviceStats.map((s, index) => (
                <div key={index} className="service-stat-item">
                  <span className="service-name">{s.name}</span>
                  <span className="service-count">{s.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">Nincs adat az elmúlt 3 hónapból.</p>
          )}
        </div>
      </div>

      {lastTreatment && (
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Kezelés részletei</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {selectedTreatment && (
              <>
                <p>
                  <strong>Dátum:</strong>{" "}
                  {formatDate(selectedTreatment.created_at)}
                </p>

                <p>
                  <strong>Szolgáltatások:</strong>
                  <br />
                  {formatServices(selectedTreatment.services)}
                </p>

                {selectedTreatment.description && (
                  <p>
                    <strong>Megjegyzés:</strong>
                    <br />
                    {selectedTreatment.description}
                  </p>
                )}
              </>
            )}
          </Modal.Body>

          <Modal.Footer className="justify-content-between">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Bezárás
            </Button>

            <Button
              variant="primary"
              onClick={() => navigate("/user/treatments")}
            >
              Ugrás a kezeléseimhez
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default UserHome;
