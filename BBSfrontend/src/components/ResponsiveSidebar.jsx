import { useState } from "react";
import { Navbar, Nav, Offcanvas, Button } from "react-bootstrap";

function ResponsiveSidebar() {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Mobil fejléc */}
      <Navbar bg="light" className="d-lg-none px-3">
        <Button variant="outline-secondary" onClick={() => setShow(true)}>
          ☰
        </Button>
        <Navbar.Brand className="ms-3">Példáné Kovács Marika</Navbar.Brand>
      </Navbar>

      {/* Offcanvas – mobil */}
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        responsive="lg"
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Példáné Kovács Marika</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarContent />
        </Offcanvas.Body>
      </Offcanvas>

      {/* Fix sidebar – desktop */}
      <div className="d-none d-lg-flex flex-column sidebar">
        <div className="p-3 fw-bold">
          Példáné
          <br />
          Kovács
          <br />
          Marika
        </div>
        <SidebarContent />
      </div>
    </>
  );
}

function SidebarContent() {
  return (
    <Nav className="flex-column gap-2 px-3">
      <Nav.Link href="#">🏠 Kezdőlap</Nav.Link>
      <Nav.Link href="#">📋 Kezeléseim</Nav.Link>
      <Nav.Link href="#">👤 Profilom</Nav.Link>
      <Nav.Link href="#">📞 Kapcsolat</Nav.Link>

      <hr />

      <Nav.Link className="text-danger">⏻ Kijelentkezés</Nav.Link>
    </Nav>
  );
}

export default ResponsiveSidebar;
