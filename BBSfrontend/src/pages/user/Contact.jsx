import "../../components/style/UserContact.css";

function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Kapcsolat</h1>
      <hr className="hrTop" />

      <div className="contact-cta">
        Időpontfoglalás vagy kérdés esetén vedd fel velünk bátran a kapcsolatot!
      </div>

      <div className="contact-sections-wrapper">
        {/* Cím */}
        <div className="contact-details">
          <h3 className="contact-heading">
            <i className="bi bi-geo-alt-fill icon"></i>
            <span>Cím</span>
          </h3>
          <a
            href="https://www.google.com/maps?q=8648+Balatonkeresztúr,+Kossuth+Lajos+u.+79"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            8648 Balatonkeresztúr, Kossuth Lajos u. 79.
          </a>
        </div>

        {/* Telefonszám */}
        <div className="contact-details">
          <h3 className="contact-heading">
            <i className="bi bi-telephone-fill icon"></i>
            <span>Telefonszám</span>
          </h3>

          <div className="phone-links">
            <a href="tel:+36123456789" className="contact-link">
              <i className="bi bi-telephone"></i> Hívás
            </a>
            <a
              href="https://wa.me/36123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <i className="bi bi-whatsapp"></i> WhatsApp
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="contact-details">
          <h3 className="contact-heading">
            <i className="bi bi-envelope-fill icon"></i>
            <span>Email cím</span>
          </h3>
          <a href="mailto:salon@gmail.com" className="contact-link">
            salon@gmail.com
          </a>
        </div>

        {/* Nyitvatartás */}
        <div className="contact-openingHours">
          <h2>Nyitvatartás</h2>
          <hr />
          <p>
            <strong>Kedd – Szombat:</strong> 06:00 – 20:00
          </p>
          <p>
            <strong>Vasárnap – Hétfő:</strong>{" "}
            <span className="closed">Zárva</span>
          </p>
        </div>
      </div>

      {/* Google térkép */}
      <div className="map-wrapper">
        <iframe
          title="Google térkép"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2736.682064788427!2d17.369901176769815!3d46.69227565066697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4768ff50bd34212f%3A0x60aec0da3bc4268!2sBalaton%20Beauty%20Salon!5e0!3m2!1shu!2shu!4v1768652012080!5m2!1shu!2shu"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
