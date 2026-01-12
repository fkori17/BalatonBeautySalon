import "../../components/style/UserContact.css";

function Contact() {
    return (
    <div className="contact-container">
        <h1 className="contact-title">Kapcsolat</h1>
        <hr className="hrTop"/>
        <div className="contact-sections-wrapper">
            <div className="contact-details">
                <h2>Elérhetőségek</h2>
                <hr className="hrMiddle"/>

                <h3><i className="bi bi-geo-alt-fill icon"></i> Cím</h3>
                <p>
                    <a 
                        href="https://www.google.com/maps?q=8648+Balatonkeresztúr,+Kossuth+Lajos+u.+79" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="contact-link"
                    >
                        8648 Balatonkeresztúr, Kossuth Lajos u. 79.
                    </a>
                </p>

                <hr />

                <h3><i className="bi bi-telephone-fill icon"></i> Telefonszám</h3>
                <p>
                    <a href="tel:+36123456789 https://wa.me/36123456789" 
                    className="contact-link">
                        +36 12 345 6789
                    </a>
                </p>

                <div className="phone-links">
                    <a href="tel:+36123456789" className="contact-link">
                        Telefon
                    </a>

                    <a 
                        href="https://wa.me/36123456789"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                    >
                        WhatsApp
                    </a>
                </div>
                <hr />

                <h3><i className="bi bi-envelope-fill icon"></i> Email cím</h3>
                <p>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=salon@gmail.com" 
                    target="_blank" 
                    className="contact-link">
                        salon@gmail.com
                    </a>
                </p>
            </div>

            <div className="contact-openingHours">
            <h2>Nyitvatartás</h2>
            <hr className="hrMiddle"/>
            <p><strong>Hétfő - Szombat:</strong> 06:00 – 20:00</p>
            <p><strong>Vasárnap:</strong> <span className="closed">Zárva</span></p>
            </div>
        </div>
    </div>

    );
}

export default Contact;