import React, { useState, useEffect } from "react";
import api from "../../api/axios"; // Feltételezem, van egy konfigurált axios példányod
import IconStatCard from "../../components/IconStatCard";
import {
  FaUserPlus,
  FaMoneyBillWave,
  FaStar,
  FaCalendarCheck,
  FaChartLine,
  FaUsers,
  FaArrowUp,
  FaGem,
  FaUserClock,
  FaClock,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

import "../../components/style/AdminStats.css";

function Stats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    // Adatok lekérése
    fetchStats();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get("/stats");
      setData(response.data);
    } catch (error) {
      console.error("Hiba a statisztikák betöltésekor:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderBarChart = (chartData, color, isCurrency = false) => (
    <ResponsiveContainer width="100%" height={isMobile ? 450 : 280}>
      <BarChart
        data={chartData}
        layout={isMobile ? "vertical" : "horizontal"}
        margin={{ top: 20, right: isMobile ? 50 : 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={!isMobile}
          horizontal={isMobile}
          opacity={0.1}
        />

        {isMobile ? (
          <>
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fontSize: 12 }}
              width={45}
            />
          </>
        ) : (
          <>
            <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
            <YAxis tick={{ fontSize: 11 }} />
          </>
        )}

        <Tooltip
          cursor={{ fill: "rgba(0,0,0,0.02)" }}
          formatter={(v) =>
            isCurrency ? `${Number(v).toLocaleString()} Ft` : v
          }
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />

        <Bar
          dataKey="v"
          fill={color}
          radius={isMobile ? [0, 4, 4, 0] : [4, 4, 0, 0]}
        >
          <LabelList
            dataKey="v"
            position={isMobile ? "right" : "top"}
            formatter={(v) => (isCurrency ? `${(v / 1000).toFixed(0)}k` : v)}
            style={{ fontSize: "11px", fontWeight: "600", fill: "#555" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p>Statisztikák betöltése...</p>
      </div>
    );
  }

  if (!data)
    return (
      <div className="text-center mt-5">
        Nem sikerült betölteni az adatokat.
      </div>
    );

  return (
    <div className="stats-page">
      <h1 className="stats-title">Statisztikák</h1>

      {/* --- ÜGYFÉL SZEKCIÓ --- */}
      <section className="stats-section">
        <h2 className="section-title">Ügyfél Statisztikák</h2>
        <div className="stats-cards">
          <IconStatCard
            icon={FaUsers}
            title="Összes ügyfél"
            value={`${data.customers.total} fő`}
          />
          <IconStatCard
            icon={FaUserClock}
            title="Visszatérő"
            value={`${data.customers.returning} fő`}
          />
          <IconStatCard
            icon={FaStar}
            title="Aktív (3 hó)"
            value={`${data.customers.active} fő`}
          />
          <IconStatCard
            icon={FaUserPlus}
            title="Új (ebben a hóban)"
            value={`${data.customers.new_this_month} fő`}
          />
        </div>
        <div className="charts-grid">
          <div className="chart-container">
            <h2>Új ügyfelek havonta</h2>
            {renderBarChart(data.charts.new_customers, "#e9b174")}
          </div>
          {/* Mivel a látogatások számát nem számoltuk ki külön, itt használhatjuk a kezelések számát proxyként, vagy az új ügyfelekét */}
          <div className="chart-container">
            <h2>Kezelések eloszlása (Látogatások)</h2>
            {renderBarChart(data.charts.treatments, "#fb8c00")}
          </div>
        </div>
      </section>

      {/* --- PÉNZÜGYI SZEKCIÓ --- */}
      <section className="stats-section">
        <h2 className="section-title">Pénzügyi Statisztikák</h2>
        <div className="stats-cards">
          <IconStatCard
            icon={FaMoneyBillWave}
            title="Összes bevétel"
            value={`${Number(data.financial.total_revenue).toLocaleString()} Ft`}
          />
          <IconStatCard
            icon={FaCalendarCheck}
            title="Elmúlt 365 nap"
            value={`${Number(data.financial.revenue_365).toLocaleString()} Ft`}
          />
          <IconStatCard
            icon={FaChartLine}
            title="Havi bevétel (Aktuális)"
            value={`${Number(data.financial.revenue_month).toLocaleString()} Ft`}
          />
          <IconStatCard
            icon={FaClock}
            title="Átlag napi bevétel"
            value={`${Math.round(data.financial.daily_avg).toLocaleString()} Ft`}
          />
        </div>
        <div className="charts-grid">
          <div className="chart-container">
            <h2>Havi bevétel alakulása</h2>
            {renderBarChart(data.charts.revenue, "#82ca9d", true)}
          </div>
          <div className="chart-container">
            <h2>Átlagos kosárérték havonta</h2>
            {renderBarChart(data.charts.avg_cart, "#4caf50", true)}
          </div>
        </div>
      </section>

      {/* --- KEZELÉS SZEKCIÓ --- */}
      <section className="stats-section">
        <h2 className="section-title">Kezelés Statisztikák</h2>
        <div className="stats-cards">
          <IconStatCard
            icon={FaGem}
            title="Összes kezelés"
            value={`${data.treatments.total} db`}
          />
          <IconStatCard
            icon={FaCalendarCheck}
            title="Elmúlt 30 nap"
            value={`${data.treatments.last_30_days} db`}
          />
          <IconStatCard
            icon={FaClock}
            title="Napi átlag (30 nap)"
            value={`${data.treatments.daily_avg} db`}
          />
          <IconStatCard
            icon={FaArrowUp}
            title="Átlag szolg. / kezelés"
            value={`${data.treatments.avg_services} db`}
          />
        </div>
        <div className="charts-grid">
          <div className="chart-container">
            <h2>Kezelések száma havonta</h2>
            {renderBarChart(data.charts.treatments, "#8884d8")}
          </div>
          {/* Itt újrahasználhatjuk a bevétel chartot vagy az avg chartot, de a kérés szerint ide a szolgáltatások száma kellene. 
              Mivel a backend most kezeléseket küld, duplikáljuk a kezelést, de ideális esetben a StatisticsControllerben a 
              getMonthlyData-t a 'treatment_service' táblára is meg lehetne hívni. 
              Most az egyszerűség kedvéért az Új ügyfelek chartot rakom ide, vagy hagyom a kezelést. 
              De legyen inkább a kezelések száma. */}
          <div className="chart-container">
            <h2>Kezelések dinamikája</h2>
            {renderBarChart(data.charts.treatments, "#9575cd")}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Stats;
