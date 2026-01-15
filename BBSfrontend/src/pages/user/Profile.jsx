import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../components/style/UserProfile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState(null);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showNew2, setShowNew2] = useState(false);

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
        setOldPass("");
        setNewPass("");
        setNewPass2("");
      })
      .catch(() => {
        setMsg("Hibás jelenlegi jelszó");
        setType("error");
      });
  };

  if (!user) return <p>Betöltés...</p>;

  const EyeIcon = ({ active }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
      {!active && <line x1="3" y1="21" x2="21" y2="3" />}
    </svg>
  );

  return (
    <div className="profile-page">
      <h1>Profilom</h1>

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
          <div className="input-with-icon">
            <input
              type={showOld ? "text" : "password"}
              value={oldPass}
              onChange={e => setOldPass(e.target.value)}
            />
            <span className="icon" onClick={() => setShowOld(v => !v)}>
              <EyeIcon active={showOld} />
            </span>
          </div>
        </div>

        <div className="row">
          <label>Új jelszó</label>
          <div className="input-with-icon">
            <input
              type={showNew ? "text" : "password"}
              value={newPass}
              onChange={e => setNewPass(e.target.value)}
            />
            <span className="icon" onClick={() => setShowNew(v => !v)}>
              <EyeIcon active={showNew} />
            </span>
          </div>
        </div>

        <div className="row">
          <label>Új jelszó újra</label>
          <div className="input-with-icon">
            <input
              type={showNew2 ? "text" : "password"}
              value={newPass2}
              onChange={e => setNewPass2(e.target.value)}
            />
            <span className="icon" onClick={() => setShowNew2(v => !v)}>
              <EyeIcon active={showNew2} />
            </span>
          </div>
        </div>

        <button onClick={changePassword}>Jelszó mentése</button>
      </div>

      {msg && <div className={`toast ${type}`}>{msg}</div>}
    </div>
  );
}

export default Profile;
