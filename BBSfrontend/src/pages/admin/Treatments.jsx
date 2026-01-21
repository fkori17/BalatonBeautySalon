import { useState } from "react";
import "../../components/style/AdminTreatments.css";
import { Search, CalendarEvent } from "react-bootstrap-icons";
import TreatmentModal from "../../components/TreatmentModal";

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
  const [treatmentModal, setTreatmentModal] = useState(false);

  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("Összes");
  const [dateFilter, setDateFilter] = useState("");

  const filteredTreatments = mockTreatments.filter((t) => {
    const q = search.toLowerCase();

    const matchesSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.service.toLowerCase().includes(q);

    const matchesService =
      serviceFilter === "Összes" || t.service === serviceFilter;

    const matchesDate =
      !dateFilter || t.date.replaceAll(".", "-") === dateFilter;

    return matchesSearch && matchesService && matchesDate;
  });

  return (
    <div className="treatments-page">
      <div className="page-header">
        <h1 className="page-title">Kezelések</h1>
        <div className="page-actions">
          <button className="add-btn" onClick={() => setTreatmentModal(true)}>
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
              placeholder="Keresés név alapján…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search size={16} />
          </div>
        </div>

        <div className="filter-group">
          <label>Szolgáltatás</label>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
          >
            <option>Összes</option>
            <option>Manikűr</option>
            <option>Francia manikűr</option>
            <option>Pedikűr</option>
            <option>Géllakkozás</option>
            <option>Spa manikűr</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Dátum</label>
          <div className="input-with-icon calendar-input">
            <input
              type="date"
              id="dateFilter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
            <CalendarEvent
              size={18}
              className="calendar-icon"
              onClick={() => {
                const input = document.getElementById("dateFilter");
                input?.showPicker ? input.showPicker() : input.focus();
              }}
            />
          </div>
        </div>
      </div>

      <div className="treatments-table">
        <div className="treatments-header">
          <span>Dátum</span>
          <span>Ügyfél</span>
          <span>Szolgáltatás</span>
          <span>Ár</span>
          <span>Részletek</span>
          <span></span>
        </div>

        {filteredTreatments.map((c, i) => (
          <div className="treatments-row" key={i}>
            <span>{c.date}</span>
            <span>{c.name}</span>
            <span>{c.service}</span>
            <span>{c.price} Ft</span>
            <span>{c.details}</span>

            <button className="icon-btn details-btn">
              <Search size={18} />
            </button>
          </div>
        ))}
      </div>
      <TreatmentModal
        show={treatmentModal}
        onHide={() => setTreatmentModal(false)}
      />

    </div>
  );
}

export default Treatments;
