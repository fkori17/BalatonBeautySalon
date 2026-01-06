import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import "./App.css";
import { Col, Row } from "react-bootstrap";
function App() {
  return (
    <>
      <UserLayout name="Példáné Kovács Marika">
        {/* <h1>Üdvözlünk, Marika!</h1> */}
      </UserLayout>
    </>
  );
}

export default App;
