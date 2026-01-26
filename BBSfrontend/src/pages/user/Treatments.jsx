import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../components/style/UserTreatments.css";
import { Search } from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
import { useLoading } from "../../context/LoadingContext";

function Treatments() {
  const [treatments, setTreatments] = useState([]);
  const { setLoading } = useLoading();
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);

    api
      .get("/treatments/me")
      .then((res) => setTreatments(res.data))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (date) => {
    return date.split("T")[0].replaceAll("-", ". ") + ".";
  };

  const formatServices = (services) => {
    if (!services || services.length === 0) return "-";

    return services
      .map((s) => (s.piece > 1 ? `${s.name} (${s.piece}x)` : s.name))
      .join(", ");
  };

  return (
    <div className="treatments-page user-treatments-page">
      <h1 className="page-title">Kezeléseim</h1>

      <div className="treatments-table">
        <div className="table-header">
          <span>Dátum</span>
          <span>Szolgáltatások</span>
          <span>Részletek</span>
          <span></span>
        </div>

        {treatments.map((treatment) => (
          <div className="table-row" key={treatment.id}>
            <span className="date">{formatDate(treatment.created_at)}</span>

            <span className="services ellipsis">
              {formatServices(treatment.services)}
            </span>

            <span className="details ellipsis">
              {treatment.description || "-"}
            </span>

            <button
              className="icon-btn"
              title="Részletek megtekintése"
              onClick={() => {
                setSelectedTreatment(treatment);
                setShowModal(true);
              }}
            >
              <Search />
            </button>
          </div>
        ))}
      </div>

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

        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Bezárás</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Treatments;
