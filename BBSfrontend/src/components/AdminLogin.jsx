import "./AdminLoginCss.css";
function AdminLogin() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form elküldve");
  };

  return (
    <div className="login-page">
      <div className="login-card">

 
        <form className="login-left" onSubmit={handleSubmit}>
          <h1>
            Balaton Beauty <br /> Salon
          </h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Jelszó"
            required
          />

          <div className="forgot">Elfelejtett jelszó?</div>

          <button type="submit">Bejelentkezés</button>
        </form>

      </div>
    </div>
  );
}

export default AdminLogin;
