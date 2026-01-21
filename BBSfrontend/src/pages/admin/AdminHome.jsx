import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useLoading } from "../../context/LoadingContext";
import { useNavigate } from "react-router-dom";
import "../../components/style/AdminHome.css";
import "../../components/style/IconStatCard.css";

import IconStatCard from "../../components/IconStatCard";
import TreatmentModal from "../../components/TreatmentModal";
import CustomerModal from "../../components/CustomerModal";
import ServiceModal from "../../components/ServiceModal";

import { BsPeopleFill, BsPersonCheckFill, BsCashStack, BsCalendarCheck } from "react-icons/bs";

function AdminHome() {
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalClients: 0,
    activeClients: 0,
    monthlyRevenue: 0,
    monthlyTreatments: 0,
  });

  const [recent, setRecent] = useState([]);
  const [showTreatment, setShowTreatment] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showService, setShowService] = useState(false);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      api.get("/admin/dashboard/stats"),
      api.get("/admin/dashboard/recent-treatments"),
    ])
      .then(([statsRes, recentRes]) => {
        setStats(statsRes.data);
        setRecent(recentRes.data);
      })
      .finally(() => setLoading(false));
  }, [setLoading]);

  const formatDate = (date) => date.split("T")[0].replaceAll("-", ". ") + ".";
  const formatCurrency = (value) => new Intl.NumberFormat("hu-HU").format(value);

  if (!stats) return null;

  return (
    <div className="dash-main-only">
      <div className="welcome-box">
        <h1>Üdvözöljük, Admin!</h1>
      </div>

      <div className="stats-grid">
        <IconStatCard icon={BsPeopleFill} value={stats.totalClients} title="Összes ügyfél" />
        <IconStatCard icon={BsPersonCheckFill} value={stats.activeClients} title="Aktív ügyfelek" />
        <IconStatCard icon={BsCashStack} value={`${formatCurrency(stats.monthlyRevenue)} Ft`} title="Havi bevétel" />
        <IconStatCard icon={BsCalendarCheck} value={stats.monthlyTreatments} title="Havi kezelések" />
      </div>

      <div className="bottom-grid">
        <div className="recent-box">
          <div className="recent-header">
            <h2>Legutóbbi kezelések</h2>
            <button className="all-treatments-btn" onClick={() => navigate("/admin/treatments")}>
              Összes kezelés
            </button>
          </div>

          <div className="recent-table-wrapper">
            <table className="recent-table">
              <thead>
                <tr>
                  <th>Dátum</th>
                  <th>Vendég</th>
                  <th>Szolgáltatás</th>
                  <th className="right">Bevétel</th>
                </tr>
              </thead>
              <tbody>
                {recent.slice(0, 4).map((item) => (
                  <tr key={item.id}>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.client}</td>
                    <td>{item.service}</td>
                    <td className="right">{formatCurrency(item.price)} Ft</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="quick-box">
          <h2>Gyors műveletek</h2>
          <button className="quick-btn" onClick={() => setShowTreatment(true)}>+ Új kezelés</button>
          <button className="quick-btn" onClick={() => setShowCustomer(true)}>+ Új ügyfél</button>
          <button className="quick-btn" onClick={() => setShowService(true)}>+ Új szolgáltatás</button>
        </div>
      </div>

      <TreatmentModal show={showTreatment} onHide={() => setShowTreatment(false)} />
      <CustomerModal show={showCustomer} onHide={() => setShowCustomer(false)} />
      <ServiceModal show={showService} onHide={() => setShowService(false)} />
    </div>
  );
}

export default AdminHome;
