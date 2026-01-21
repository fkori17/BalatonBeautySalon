import { useState } from "react";
import "../../components/style/AdminTreatments.css";
import { Search } from "react-bootstrap-icons";
import { CalendarEvent } from "react-bootstrap-icons";


const mockTreatments = [
  {
    date: "2026.01.21",
    name: "Példa Kovács János",
    service: "Manikűr",
    price: "3000",
    details: "Rövid leírás a kezelés részleteiről, otth...",
  },
  {
    date: "2026.01.19",
    name: "Példa Szabó Anna",
    service: "Francia manikűr",
    price: "4200",
    details: "Rövid leírás a kezelés részleteiről, otth...",
  },
  {
    date: "2026.01.18",
    name: "Példa Nagy Péter",
    service: "Géllakkozás",
    price: "5200",
    details: "Rövid leírás a kezelés részleteiről, otth...",
  },
  {
    date: "2026.01.17",
    name: "Példa Tóth Eszter",
    service: "Japán manikűr",
    price: "8500",
    details: "Rövid leírás a kezelés részleteiről, otth...",
  },
  {
    date: "2026.01.16",
    name: "Példa Varga László",
    service: "Pedikűr",
    price: "6000",
    details: "Rövid leírás a kezelés részleteiről, otth...",
  },
  {
    date: "2026.01.15",
    name: "Példa Horváth Réka",
    service: "Erősített géllakk",
    price: "7000",
    details: "Rövid leírás a kezelés részleteiről, otth...",
  },
  {
    date: "2026.01.14",
    name: "Példa Kiss Bence",
    service: "Lábápolás",
    price: "3900",
    details: "Rövid leírás a kezelés részleteiről, otth...",
  },
  {
    date: "2026.01.13",
    name: "Példa Molnár Zsófia",
    service: "Kézápolás",
    price: "2800",
    details: "Rövid leírás a kezelés részleteiről, otth...",
  },
  {
    date: "2026.01.12",
    name: "Példa Farkas Gergő",
    service: "Körömdíszítés",
    price: "1500",
    details: "Rövid leírás a kezelés részleteiről, otth...",
  },
  {
    date: "2026.01.11",
    name: "Példa Balogh Dóra",
    service: "Spa manikűr",
    price: "9000",
    details: "Rövid leírás a kezelés részleteiről, otth...",
  },
];

function Treatments() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setShowAddModal(false);
    }

    setValidated(true);
  };    

  return (
    <div className="treatments-page">
      <div className="page-header">
        <h1 className="page-title">Kezelések</h1>
        <div className="page-actions">
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            Új kezelés rögzítése
          </button>
        </div>
      </div>
      <div className="filters-row">
        <div className="filter-group">
            <label>Ügyfél</label>
            <div className="input-with-icon">
            <input
                type="text"
                placeholder="Keresés ügyfélre…"
            />
            <Search size={16} />
            </div>
        </div>

        <div className="filter-group">
            <label>Szolgáltatás</label>
            <select>
            <option>Összes</option>
            <option>Manikűr</option>
            <option>Francia manikűr</option>
            <option>Pedikűr</option>
            </select>
        </div>

        <div className="filter-group">
          <label>Dátum</label>
          <div className="input-with-icon calendar-input">
            <input type="date" id="dateFilter" />
            <CalendarEvent
              size={18}
              className="calendar-icon"
              onClick={() => {
                const input = document.getElementById("dateFilter");
                if (input.showPicker) {
                  input.showPicker();
                } else {
                  input.focus();
                }
              }}
            />
          </div>
        </div>
        <button className="search-btn">Keresés</button>
      </div>


      <div className="treatments-table">
        <div className="table-header">
          <span>Dátum</span>
          <span>Ügyfél</span>
          <span>Szolgáltatások</span>
          <span>Ár</span>
          <span>Részletek</span>
          <span></span>
        </div>

        {mockTreatments.map((c) => (
          <div className="table-row" key={c.id}>
            <span>{c.date}</span>
            <span>{c.name}</span>
            <span className="ellipsis">{c.service}</span>
            <span className="ellipsis">{c.price} Ft</span>
            <span className="ellipsis">{c.details}</span>

            <button className="icon-btn details-btn">
                <Search size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Treatments;