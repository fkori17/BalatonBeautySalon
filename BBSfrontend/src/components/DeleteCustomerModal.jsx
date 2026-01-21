import { Modal, Button } from "react-bootstrap";

function DeleteCustomerModal({ show, onHide, customer, onConfirm }) {
  if (!customer) return null;

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Ügyfél törlése</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Biztosan törölni szeretnéd az alábbi ügyfelet?</p>
        <strong>{customer.name}</strong>
        <br />
        <small>{customer.email}</small>
      </Modal.Body>

      <Modal.Footer className="modal-footer-uniform">
        <Button variant="secondary" onClick={onHide}>
          Mégse
        </Button>
        <Button variant="danger" onClick={() => onConfirm(customer.id)}>
          Törlés
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteCustomerModal;
