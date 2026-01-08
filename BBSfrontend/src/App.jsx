import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import LoginComponent from "./components/LoginComponent.jsx";
import "./App.css";
import AdminHomePageCards from "./components/AdminHomePageCards.jsx";
import AdminStatCards from "./components/AdminStatCards.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import { Row, Col } from "react-bootstrap";
import { PeopleFill, PersonLinesFill, CashStack, CalendarCheck } from "react-bootstrap-icons";


function App() {
  return (
    <>
    {/*
      <UserLayout name="Példáné Kovács Marika">
        <p>Admin kezdőlap kártyák</p>
        <Row className="g-4">
          <Col xs={12} md={6} lg={3}>
            <AdminHomePageCards icon={PeopleFill} value="72" title="Összes ügyfél" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <AdminHomePageCards icon={PersonLinesFill} value="57" title="Aktív ügyfelek" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <AdminHomePageCards icon={CashStack} value="420 000 Ft" title="Havi bevétel" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <AdminHomePageCards icon={CalendarCheck} value="43" title="Havi kezelések" />
          </Col>
        </Row>
        <br />
        <p>Admin statisztika kártyák</p>
        <Row className="g-4">
          <Col xs={12} md={6} lg={3}>
            <AdminStatCards icon={PeopleFill} value="72" title="Összes ügyfél" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <AdminStatCards icon={PersonLinesFill} value="57" title="Aktív ügyfelek" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <AdminStatCards icon={CashStack} value="420 000 Ft" title="Havi bevétel" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <AdminStatCards icon={CalendarCheck} value="210 000 Ft" title="Heti bevétel" />
          </Col>
        </Row>
        <br />
        <Row className="g-4">
          <Col xs={12} md={6} lg={3}>
            <AdminStatCards icon={PeopleFill} value="1 240 000 Ft" title="Összes bevétel" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <AdminStatCards icon={PersonLinesFill} value="1 140 000 Ft" title="Éves bevétel" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <AdminStatCards icon={CashStack} value="420 000 Ft" title="Havi bevétel" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <AdminStatCards icon={CalendarCheck} value="210 000 Ft" title="Havi bevétel" />
          </Col>
        </Row>
      </UserLayout>
      
       <LoginComponent  />*/}
       <AdminLogin />
    </>
  );
}

export default App;
