import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../components/style/UserProfile.css";
import { useLoading } from "../../context/LoadingContext";
import { Toast, ToastContainer, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { setLoading } = useLoading();

  const [user, setUser] = useState(null);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");

  const [show, setShow] = useState({
    old: false,
    new: false,
    new2: false,
  });

  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get("/me")
      .then((res) => setUser(res.data))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });
  };

  const validate = () => {
    if (!oldPass || !newPass || !newPass2) {
      showToast("Minden mező kitöltése kötelező!", "danger");
      return false;
    }

    if (newPass.length < 6) {
      showToast("Az új jelszó minimum 6 karakter!", "danger");
      return false;
    }

    if (newPass !== newPass2) {
      showToast("Az új jelszavak nem egyeznek!", "danger");
      return false;
    }

    return true;
  };

  const changePassword = () => {
    if (!validate()) return;

    setSaving(true);

    api
      .post("/change-password", {
        oldPassword: oldPass,
        newPassword: newPass,
      })
      .then(() => {
        showToast("Jelszó sikeresen módosítva! Jelentkezz be újra.", "success");

        setTimeout(() => {
          localStorage.removeItem("token");
          navigate("/login");
        }, 1500);
      })
      .catch(() => {
        showToast("Hibás jelenlegi jelszó!", "danger");
      })
      .finally(() => setSaving(false));
  };

  const EyeButton = ({ active, onClick }) => (
    <span className="icon" onClick={onClick}>
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
        {!active && <line x1="3" y1="21" x2="21" y2="3" />}
      </svg>
    </span>
  );

  if (!user) return null;

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
          <input value={user.phone || "-"} disabled />
        </div>
      </div>

      <div className="card">
        <h2>Jelszó módosítása</h2>

        {[
          {
            label: "Jelenlegi jelszó",
            value: oldPass,
            set: setOldPass,
            key: "old",
          },
          {
            label: "Új jelszó",
            value: newPass,
            set: setNewPass,
            key: "new",
          },
          {
            label: "Új jelszó újra",
            value: newPass2,
            set: setNewPass2,
            key: "new2",
          },
        ].map((field) => (
          <div className="row" key={field.key}>
            <label>{field.label}</label>
            <div className="input-with-icon">
              <input
                type={show[field.key] ? "text" : "password"}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
              />
              <EyeButton
                active={show[field.key]}
                onClick={() =>
                  setShow((s) => ({
                    ...s,
                    [field.key]: !s[field.key],
                  }))
                }
              />
            </div>
          </div>
        ))}

        <button onClick={changePassword} disabled={saving}>
          {saving ? <Spinner size="sm" /> : "Jelszó mentése"}
        </button>
      </div>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg={toast.variant}
          show={toast.show}
          delay={3000}
          autohide
          onClose={() => setToast((t) => ({ ...t, show: false }))}
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Profile;
