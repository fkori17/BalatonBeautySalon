import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import "./App.css";
import HomePageComps from "./components/HomePageComps";
import { Person } from "react-bootstrap-icons";
function App() {
  return (
    <>
      <UserLayout name="Példáné Kovács Marika">
        <HomePageComps key={1} icon={Person} value="teszt" title="valami"></HomePageComps>
      </UserLayout>
      
    </>
  );
}

export default App;
