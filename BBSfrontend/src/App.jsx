import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import LoginComponent from "./components/LoginComponent.jsx";
import "./App.css";
import HomePageComps from "./components/HomePageComps";
import { Person } from "react-bootstrap-icons";
function App() {
  return (
    <>
<<<<<<< Updated upstream
      <UserLayout name="Példáné Kovács Marika">
        <HomePageComps key={1} icon={Person} value="teszt" title="valami"></HomePageComps>
      </UserLayout>
      
=======
      <LoginComponent />
>>>>>>> Stashed changes
    </>
  );
}

export default App;
