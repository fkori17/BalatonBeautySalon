import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useLoading } from "../../context/LoadingContext";
import "../../components/style/AdminHome.css";
import "../../components/style/IconStatCard.css";
import IconStatCard from "../../components/IconStatCard";
import {
  BsPeopleFill,
  BsPersonCheckFill,
  BsCashStack,
  BsCalendarCheck,
} from "react-icons/bs";

function AdminHome() {
  const { setLoading } = useLoading();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      api.get("/treatments/me/stats"),
      api.get("/treatments/me/last"),
    ])
      .then(([statsRes, recentRes]) => {
        setStats({
          totalClients: statsRes.data.totalClients || 0,
          activeClients: statsRes.data.activeClients || 0,
          monthlyRevenue: statsRes.data.monthlyRevenue || 0,
          monthlyTreatments: statsRes.data.monthlyTreatments || 0,
        });
        setRecent(Array.isArray(recentRes.data) ? recentRes.data : []);
      })
      .finally(() => setLoading(false));
  }, [setLoading]);

  const formatDate = (date) => {
    return date.split("T")[0].replaceAll("-", ". ") + ".";
  };

  if (!stats) return null;

  return (
    <div className="dash-main-only">
     
      <div className="welcome-box">
        <h1>Üdvözöljük, Admin!</h1>
      </div>

      
      <div className="stats-grid">
        <IconStatCard
          icon={BsPeopleFill}
          value={stats.totalClients}
          title="Összes ügyfél"
        />
        <IconStatCard
          icon={BsPersonCheckFill}
          value={stats.activeClients}
          title="Aktív ügyfelek"
        />
        <IconStatCard
          icon={BsCashStack}
          value={`${stats.monthlyRevenue} Ft`}
          title="Havi bevétel"
        />
        <IconStatCard
          icon={BsCalendarCheck}
          value={stats.monthlyTreatments}
          title="Havi kezelések"
        />
      </div>

    
      <div className="bottom-grid">
     
        <div className="recent-box">
          <div className="recent-header">
            <h2>Legutóbbi kezelések</h2>
            <button className="link-btn">Összes kezelés</button>
          </div>

          <div className="recent-list">
            {recent.map((item) => (
              <div className="recent-row" key={item.id}>
                <span className="recent-date">{formatDate(item.date)}</span>
                <span className="recent-name">{item.client}</span>
                <span className="recent-service">{item.service}</span>
              </div>
            ))}
          </div>
        </div>

     
        <div className="quick-box">
          <h2>Gyors műveletek</h2>
          <button className="quick-btn">+ Új kezelés</button>
          <button className="quick-btn">+ Új ügyfél</button>
          <button className="quick-btn">+ Új szolgáltatás</button>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
