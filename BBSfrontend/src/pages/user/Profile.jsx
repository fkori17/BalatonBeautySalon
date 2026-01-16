import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../components/style/UserProfile.css";
import { useLoading } from "../../context/LoadingContext";

function Profile() {
  const [user, setUser] = useState([]);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");

  const [msg, setMsg] = useState([]);
  const [type, setType] = useState([]);
  const { setLoading } = useLoading();

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showNew2, setShowNew2] = useState(false);

  useEffect(() => {
    setLoading(true);

    api
      .get("/me")
      .then((res) => setUser(res.data))
      .finally(() => setLoading(false));
  }, []);

  const changePassword = () => {
    if (newPass !== newPass2) {
      setMsg("Az új jelszavak nem egyeznek!");
      setType("error");
      return;
    }

    api
      .post("/change-password", {
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

  const EyeIcon = ({ active }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
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
              onChange={(e) => setOldPass(e.target.value)}
            />

            <span className="icon" onClick={() => setShowOld((v) => !v)}>
              <EyeIcon active={showOld} />
            </span>
            <span className="icon" onClick={() => setShowOld((prev) => !prev)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            </span>
          </div>
        </div>

        <div className="row">
          <label>Új jelszó</label>
          <div className="input-with-icon">
            <input
              type={showNew ? "text" : "password"}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />

            <span className="icon" onClick={() => setShowNew((v) => !v)}>
              <EyeIcon active={showNew} />
            </span>
            <span className="icon" onClick={() => setShowNew((prev) => !prev)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            </span>
          </div>
        </div>

        <div className="row">
          <label>Új jelszó újra</label>
          <div className="input-with-icon">
            <input
              type={showNew2 ? "text" : "password"}
              value={newPass2}
              onChange={(e) => setNewPass2(e.target.value)}
            />

            <span className="icon" onClick={() => setShowNew2((v) => !v)}>
              <EyeIcon active={showNew2} />
            </span>
            <span className="icon" onClick={() => setShowNew2((prev) => !prev)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
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
