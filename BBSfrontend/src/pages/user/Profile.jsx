import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../components/style/UserProfile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState(null); // "error" | "success"

  useEffect(() => {
    api.get("/me").then(res => setUser(res.data));
  }, []);

  const changePassword = () => {
    if (newPass !== newPass2) {
      setMsg("Az új jelszavak nem egyeznek!");
      setType("error");
      return;
    }

    api.post("/change-password", {
      oldPassword: oldPass,
      newPassword: newPass,
    })
      .then(() => {
        setMsg("Sikeres mentés");
        setType("success");
        setOldPass(""); setNewPass(""); setNewPass2("");
      })
      .catch(() => {
        setMsg("Hibás jelenlegi jelszó");
        setType("error");
      });
  };

  if (!user) return <p>Betöltés...</p>;

  return (
    <div className="profile-page">
      <h1>Profilom</h1>
       <br />
      <div className="card">
        <h2>Profil adatok</h2>
        <div className="row">
          <label>Teljes név</label>
          <input value={user.name} disabled />
        </div>
        <div className="row">
          <label>Email cím</label>
          <input value={user.user} disabled />
        </div>
        <div className="row">
          <label>Telefonszám</label>
          <input value={user.phone} disabled />
        </div>
      </div>

      <div className="card">
        <h2>Jelszó módosítása</h2>
        <div className="row">
          <label>Jelenlegi jelszó</label>
          <input type="password" autoComplete="old-password" value={oldPass} onChange={e=>setOldPass(e.target.value)} />
        </div>
        <div className="row">
          <label>Új jelszó</label>
          <input type="password" autoComplete="new-password" value={newPass} onChange={e=>setNewPass(e.target.value)} />
        </div>
        <div className="row">
          <label>Új jelszó újra</label>
          <input type="password" autoComplete="new-password" value={newPass2} onChange={e=>setNewPass2(e.target.value)} />
        </div>
        <button onClick={changePassword}>Jelszó mentése</button>
      </div>

      {msg && (
        <div className={`toast ${type}`}>
          {msg}
        </div>
      )}
    </div>
  );
}

export default Profile;
