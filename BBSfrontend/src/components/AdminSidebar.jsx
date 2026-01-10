import "./style/ResponsiveSidebar.css";
import { useState } from "react";
import { Navbar, Nav, Offcanvas, Button } from "react-bootstrap";
import useLogout from "../hooks/useLogout";
import { NavLink } from "react-router-dom";

const AdminSidebar = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Navbar bg="light" className="d-lg-none px-3">
        <Button variant="outline-secondary" onClick={() => setShow(true)}>
          ☰
        </Button>
        <Navbar.Brand className="ms-3">Admin felület</Navbar.Brand>
      </Navbar>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin felület</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarContent />
        </Offcanvas.Body>
      </Offcanvas>

      <div className="user-layout">
        <aside className="sidebar d-none d-lg-flex flex-column">
          <div className="p-3 fw-bold">Admin felület</div>
          <SidebarContent />
        </aside>

        <main className="content">
          <div className="p-4">{children}</div>
        </main>
      </div>
    </>
  );
};

function SidebarContent() {
    const logout = useLogout();
  
  return (
    <Nav className="flex-column h-100 px-3">
      <Nav.Link as={NavLink} to="/admin">
        <HomeIcon /> Kezdőlap
      </Nav.Link>

      <Nav.Link as={NavLink} to="/admin/Treatments">
        <ListIcon /> Kezelések
      </Nav.Link>

      <Nav.Link as={NavLink} to="/admin/Customers">
        <UserIcon /> Ügyfelek
      </Nav.Link>

      <Nav.Link as={NavLink} to="/admin/Services">
        <ClipboardIcon /> Szolgáltatások
      </Nav.Link>

      <Nav.Link as={NavLink} to="/admin/Stats">
        <ChartIcon /> Statisztikák
      </Nav.Link>

      {/* alsó szekció */}
      <div className="mt-auto pt-3">
        <Nav.Link
          className="text-danger"
          onClick={logout}
          style={{ cursor: "pointer" }}
        >
          <LogoutIcon /> Kijelentkezés
        </Nav.Link>
      </div>
    </Nav>
  );
}

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="currentColor"
    className="bi bi-house-fill"
    viewBox="0 0 16 16"
  >
    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
  </svg>
);

const ListIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="currentColor"
    className="bi bi-list-ul"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="currentColor"
    className="bi bi-person-fill"
    viewBox="0 0 16 16"
  >
    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    fill="currentColor"
    className="bi bi-telephone-fill"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="currentColor"
    className="bi bi-box-arrow-right"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
    />
    <path
      fillRule="evenodd"
      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
    />
  </svg>
);

const ClipboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="currentColor"
    className="bi bi-clipboard-minus-fill"
    viewBox="0 0 16 16"
  >
    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zM6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1" />
  </svg>
);

const ChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="currentColor"
    className="bi bi-graph-up"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"
    />
  </svg>
);

export default AdminSidebar;
