import { useEffect, useState } from "react";
import IconStatCard from "../../components/IconStatCard";
import { FaUserPlus, FaMoneyBillWave, FaStar, FaCalendarCheck } from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

import "../../components/style/AdminStats.css";

function Stats() {
  const [stats, setStats] = useState(null);
  const [treatmentVisits, setTreatmentVisits] = useState([]);
  const [revenueHistory, setRevenueHistory] = useState([]); // Második chart adatai

  useEffect(() => {
    const mockStats = {
      monthlyNewUsers: 14,
      monthlyRevenue: 450000,
      activeAppointments: 45, // ÚJ KÁRTYA ADATA
      topTreatment: {
        name: "Havi kezelések száma",
        count: 320,
      },
    };

    const mockVisits = [
      { month: "Jan", value: 22 }, { month: "Feb", value: 28 }, { month: "Már", value: 35 },
      { month: "Ápr", value: 40 }, { month: "Máj", value: 52 }, { month: "Jún", value: 60 }
    ];

    const mockRevenue = [
      { month: "Jan", value: 300000 }, { month: "Feb", value: 350000 }, { month: "Már", value: 450000 },
      { month: "Ápr", value: 410000 }, { month: "Máj", value: 480000 }, { month: "Jún", value: 520000 }
    ];

    setStats(mockStats);
    setTreatmentVisits(mockVisits);
    setRevenueHistory(mockRevenue);
  }, []);

  if (!stats) return <div className="stats-loading">Betöltés...</div>;

  return (
    <div className="stats-page">
      <h1 className="stats-title">Statisztikák</h1>

      {/* 4 KÁRTYA EGY SORBAN */}
      <div className="stats-cards">
        <IconStatCard icon={FaUserPlus} value={stats.monthlyNewUsers} title="Havi új ügyfelek" />
        <IconStatCard icon={FaMoneyBillWave} value={`${stats.monthlyRevenue.toLocaleString()} Ft`} title="Havi bevétel" />
        <IconStatCard icon={FaStar} value={`${stats.topTreatment.count} db`} title={stats.topTreatment.name} />
        <IconStatCard icon={FaCalendarCheck} value={stats.activeAppointments} title="Havi foglalások" />
      </div>

      {/* KÉT GRAFIKON EGYMÁS MELLETT */}
      <div className="charts-grid">
        <div className="chart-container">
          <h2>{stats.topTreatment.name}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={treatmentVisits}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${value} db`} />
              <Bar dataKey="value" fill="#e9b174" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h2>Bevétel alakulása (Ft)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueHistory}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${value.toLocaleString()} Ft`} />
              <Bar dataKey="value" fill="#82ca9d" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Stats;