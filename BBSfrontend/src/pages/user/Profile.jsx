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

  // 👁️ új state-ek
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
          <div className="input-with-icon">
            <input
              type={showOld ? "text" : "password"}
              autoComplete="old-password"
              value={oldPass}
              onChange={e => setOldPass(e.target.value)}
            />
            <span className="icon" onClick={() => setShowOld(prev => !prev)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
              </svg>
            </span>
          </div>
        </div>

     
        <div className="row">
          <label>Új jelszó</label>
          <div className="input-with-icon">
            <input
              type={showNew ? "text" : "password"}
              autoComplete="new-password"
              value={newPass}
              onChange={e => setNewPass(e.target.value)}
            />
            <span className="icon" onClick={() => setShowNew(prev => !prev)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
              </svg>
            </span>
          </div>
        </div>

       
        <div className="row">
          <label>Új jelszó újra</label>
          <div className="input-with-icon">
            <input
              type={showNew2 ? "text" : "password"}
              autoComplete="new-password"
              value={newPass2}
              onChange={e => setNewPass2(e.target.value)}
            />
            <span className="icon" onClick={() => setShowNew2(prev => !prev)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
              </svg>
            </span>
          </div>
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
