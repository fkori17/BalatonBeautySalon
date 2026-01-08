import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import LoginComponent from "./components/LoginComponent.jsx";
import "./App.css";
import StatCard from "./components/StatCard.jsx";
import IconStatCard from "./components/IconStatCard.jsx";
import { Row, Col } from "react-bootstrap";
import { PeopleFill, PersonCheckFill, CashStack, CalendarCheck, PersonHearts, PersonFillUp  } from "react-bootstrap-icons";


function App() {
  return (
    <>
      <UserLayout name="Példáné Kovács Marika">
        <p>Admin kezdőlap kártyák</p>
        <Row className="g-4">
          <Col xs={12} md={6} lg={3}>
            <IconStatCard icon={PeopleFill} value="72" title="Összes ügyfél" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <IconStatCard icon={PersonCheckFill } value="57" title="Aktív ügyfelek" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <IconStatCard icon={PersonHearts} value="43" title="Visszatérő ügyfelek" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <IconStatCard icon={PersonFillUp} value="4" title="Új ügyfelek" />
          </Col>
        </Row>
        <br />
        <p>Admin statisztika kártyák</p>
        <Row className="g-4">
          <Col xs={12} md={6} lg={3}>
            <IconStatCard icon={PeopleFill} value="72" title="Összes ügyfél" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <IconStatCard icon={PersonCheckFill} value="57" title="Aktív ügyfelek" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <IconStatCard icon={CashStack} value="420 000 Ft" title="Havi bevétel" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <IconStatCard icon={CalendarCheck} value="210 000 Ft" title="Heti bevétel" />
          </Col>
        </Row>
        <br />
        <Row className="g-4">
          <Col xs={12} md={6} lg={3}>
            <StatCard value="1 240 000 Ft" title="Összes bevétel" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <StatCard value="1 140 000 Ft" title="Éves bevétel" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <StatCard value="420 000 Ft" title="Havi bevétel" />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <StatCard value="210 000 Ft" title="Heti bevétel" />
          </Col>
        </Row>
      </UserLayout>
      <LoginComponent />
    </>
  );
}

export default App;
