import { useState } from "react";
import "../../components/style/AdminCustomers.css";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { Modal, Button, Form } from "react-bootstrap";

const mockClients = [
  {
    id: 1,
    name: "Példa Kovács János",
    email: "pelda.kovacs.janos@gmail.com",
    time: "2026.01.10",
    phone: "+36 30 123 4567",
  },
  {
    id: 2,
    name: "Példa Szabó Anna",
    email: "pelda.szabo.anna@gmail.com",
    time: "2026.01.12",
    phone: "+36 20 456 7812",
  },
  {
    id: 3,
    name: "Példa Nagy Péter",
    email: "pelda.nagy.peter@hotmail.com",
    time: "2026.01.14",
    phone: "+36 70 332 9981",
  },
  {
    id: 4,
    name: "Példa Tóth Eszter",
    email: "pelda.toth.eszter@yahoo.com",
    time: "2026.01.16",
    phone: "+36 30 987 1122",
  },
  {
    id: 5,
    name: "Példa Varga László",
    email: "pelda.varga.laszlo@gmail.com",
    time: "2026.01.18",
    phone: "+36 20 654 8899",
  },
  {
    id: 6,
    name: "Példa Horváth Réka",
    email: "pelda.horvath.reka@gmail.com",
    time: "2026.01.20",
    phone: "+36 70 445 6677",
  },
  {
    id: 7,
    name: "Példa Kiss Bence",
    email: "pelda.kiss.bence@outlook.com",
    time: "2026.01.22",
    phone: "+36 30 221 3344",
  },
  {
    id: 8,
    name: "Példa Molnár Zsófia",
    email: "pelda.molnar.zsofia@gmail.com",
    time: "2026.01.23",
    phone: "+36 20 778 9900",
  },
  {
    id: 9,
    name: "Példa Farkas Gergő",
    email: "pelda.farkas.gergo@gmail.com",
    time: "2026.01.25",
    phone: "+36 70 556 1122",
  },
  {
    id: 10,
    name: "Példa Balogh Dóra",
    email: "pelda.balogh.dora@hotmail.com",
    time: "2026.01.27",
    phone: "+36 30 889 7766",
  },
];

function Customers() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setShowAddModal(false);
    }

    setValidated(true);
  };

  return (
    <div className="treatments-page">
      <div className="page-header">
        <h1 className="page-title">Ügyfél profilok</h1>

        <div className="page-actions">
          <input
            type="text"
            className="search-input"
            placeholder="Keresés név vagy email alapján…"
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
          <span>Regisztráció</span>
          <span>Telefonszám</span>
          <span>Művelet</span>
        </div>

        {mockClients.map((c) => (
          <div className="table-row" key={c.id}>
            <span>{c.id}</span>
            <span className="ellipsis">{c.name}</span>
            <span className="ellipsis">{c.email}</span>
            <span className="ellipsis">{c.time}</span>
            <span className="ellipsis">{c.phone}</span>

            <div className="actions">
              <button className="icon-btn edit-btn">
                <PencilSquare size={18} />
              </button>
              <button className="icon-btn delete-btn">
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        centered
        size="md"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Új ügyfél hozzáadása</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Név <span className="requiredSpan">*</span></Form.Label>
              <Form.Control required type="text" />
              <Form.Control.Feedback type="invalid">
                A név megadása kötelező.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email <span className="requiredSpan">*</span></Form.Label>
              <Form.Control required type="email" />
              <Form.Control.Feedback type="invalid">
                Érvényes email cím szükséges.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefonszám <span className="requiredSpan">*</span></Form.Label>
              <Form.Control required type="tel" placeholder="+36 70 123 4567" />
              <Form.Control.Feedback type="invalid">
                Telefonszám megadása kötelező.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Születési hely <span className="requiredSpan">*</span></Form.Label>
              <Form.Control required type="text" />
              <Form.Control.Feedback type="invalid">
                Születési hely megadása kötelező.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Születési dátum <span className="requiredSpan">*</span></Form.Label>
              <div className="d-flex gap-2">
                <Form.Control required placeholder="ÉÉÉÉ" />
                <Form.Control required placeholder="HH" />
                <Form.Control required placeholder="NN" />
              </div>
              <Form.Control.Feedback type="invalid">
                Teljes dátum szükséges.
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer className="modal-actions">
            <Button
                className="cancel-btn"
                variant="secondary"
                onClick={() => setShowAddModal(false)}
            >
                Mégse
            </Button>

            <Button
                type="submit"
                className="save-btn"
            >
                Ügyfél mentése
            </Button>
          </Modal.Footer>

        </Form>
      </Modal>
    </div>
  );
}

export default Customers;