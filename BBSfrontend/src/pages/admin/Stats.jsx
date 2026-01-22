import { useEffect, useState } from "react";

import IconStatCard from "../../components/IconStatCard";
import { FaUserPlus, FaMoneyBillWave, FaStar } from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import "../../components/style/AdminStats.css";

function Stats() {
  const [stats, setStats] = useState(null);
  const [treatmentVisits, setTreatmentVisits] = useState([]);

  // MOCK ADATOK – API nélkül
  useEffect(() => {
    const mockStats = {
      monthlyNewUsers: 14,
      monthlyRevenue: 450000,
      topTreatment: {
        name: "Havi kezelések száma",
        count: 320,
      },
    };

    const mockVisits = [
      { month: "Jan", value: 22 },
      { month: "Feb", value: 28 },
      { month: "Már", value: 35 },
      { month: "Ápr", value: 40 },
      { month: "Máj", value: 52 },
      { month: "Jún", value: 60 },
      { month: "Júl", value: 65 },
      { month: "Aug", value: 58 },
      { month: "Szep", value: 46 },
      { month: "Okt", value: 38 },
      { month: "Nov", value: 30 },
      { month: "Dec", value: 26 },
    ];

    setStats(mockStats);
    setTreatmentVisits(mockVisits);
  }, []);

  if (!stats || treatmentVisits.length === 0) {
    return <div className="stats-loading">Betöltés...</div>;
  }

  return (
    <div className="stats-page">

      {/* Oldal cím */}
      <h1 className="stats-title">Statisztikák</h1>

      {/* Felső 3 kártya */}
      <div className="stats-cards">
        <IconStatCard
          icon={FaUserPlus}
          value={stats.monthlyNewUsers}
          title="Havi új ügyfelek"
        />

        <IconStatCard
          icon={FaMoneyBillWave}
          value={`${stats.monthlyRevenue} Ft`}
          title="Havi bevétel"
        />

        <IconStatCard
          icon={FaStar}
          value={`${stats.topTreatment.count} db`}
          title={stats.topTreatment.name}
        />
      </div>

      {/* Bar chart */}
      <div className="chart-container">
        <h2>{stats.topTreatment.name}</h2>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={treatmentVisits}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} db`} />
            <Bar dataKey="value" fill="#e9b174" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Stats;
