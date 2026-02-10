import React, { useState, useEffect } from "react";
import IconStatCard from "../../components/IconStatCard";
import { 
  FaUserPlus, FaMoneyBillWave, FaStar, FaCalendarCheck, 
  FaChartLine, FaUsers, FaArrowUp, FaGem 
} from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList
} from "recharts";

import "../../components/style/AdminStats.css";

function Stats() {
  const months = ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec"];
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const genData = (min, max) => months.map(m => ({ 
    name: m, 
    v: Math.floor(Math.random() * (max - min + 1)) + min 
  }));

  const renderBarChart = (data, color, isCurrency = false) => (
    <ResponsiveContainer width="100%" height={isMobile ? 450 : 280}>
      <BarChart 
        data={data} 
        layout={isMobile ? "vertical" : "horizontal"} 
        margin={{ 
            top: 20, 
            right: isMobile ? 50 : 20, 
            left: isMobile ? 0 : 0, 
            bottom: 5 
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={!isMobile} horizontal={isMobile} opacity={0.1} />
        
        {isMobile ? (
          <>
            <XAxis type="number" hide /> 
            <YAxis dataKey="name" type="category" tick={{fontSize: 12}} width={45} />
          </>
        ) : (
          <>
            <XAxis dataKey="name" tick={{fontSize: 11}} interval={0} />
            <YAxis tick={{fontSize: 11}} />
          </>
        )}

        <Tooltip 
          cursor={{fill: 'rgba(0,0,0,0.02)'}} 
          formatter={(v) => isCurrency ? `${v.toLocaleString()} Ft` : v}
        />

        <Bar dataKey="v" fill={color} radius={isMobile ? [0, 4, 4, 0] : [4, 4, 0, 0]}>
          <LabelList 
            dataKey="v" 
            position={isMobile ? "right" : "top"} 
            formatter={(v) => isCurrency ? `${(v/1000).toFixed(0)}k` : v}
            style={{ fontSize: '11px', fontWeight: '600', fill: '#555' }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="stats-page">
      <h1 className="stats-title">Statisztikák</h1>

      <section className="stats-section">
        <h2 className="section-title">Ügyfél Statisztikák</h2>
        <div className="stats-cards">
          <IconStatCard icon={FaUserPlus} title="Összes regisztrált" value="842 fő" />
          <IconStatCard icon={FaUsers} title="Aktív (30 nap)" value="124 fő" />
          <IconStatCard icon={FaArrowUp} title="Visszatérési arány" value="78%" />
          <IconStatCard icon={FaCalendarCheck} title="Új foglalások" value="45 db" />
        </div>
        <div className="charts-grid">
          <div className="chart-container">
            <h2>Új ügyfelek havonta (fő)</h2>
            {renderBarChart(genData(10, 40), "#e9b174")}
          </div>
          <div className="chart-container">
            <h2>Vendégforgalom eloszlás (fő)</h2>
            {renderBarChart(genData(50, 150), "#fb8c00")}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h2 className="section-title">Pénzügyi Statisztikák</h2>
        <div className="stats-cards">
          <IconStatCard icon={FaMoneyBillWave} title="Éves bevétel" value="14.2M Ft" />
          <IconStatCard icon={FaArrowUp} title="Havi átlag" value="1.18M Ft" />
          <IconStatCard icon={FaChartLine} title="Növekedés" value="+12.5%" />
          <IconStatCard icon={FaCalendarCheck} title="Fizetett alkalmak" value="1.420 db" />
        </div>
        <div className="charts-grid">
          <div className="chart-container">
            <h2>Bevétel alakulása</h2>
            {renderBarChart(genData(500000, 900000), "#82ca9d", true)}
          </div>
          <div className="chart-container">
            <h2>Átlagos kosárérték</h2>
            {renderBarChart(genData(15000, 25000), "#4caf50", true)}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h2 className="section-title">Kezelés Statisztikák</h2>
        <div className="stats-cards">
          <IconStatCard icon={FaGem} title="Top kezelés" value="HydraFacial" />
          <IconStatCard icon={FaStar} title="Átlag értékelés" value="4.95" />
          <IconStatCard icon={FaCalendarCheck} title="Befejezett" value="2.140 db" />
          <IconStatCard icon={FaChartLine} title="Kapacitás" value="92%" />
        </div>
        <div className="charts-grid">
          <div className="chart-container">
            <h2>Havi kezelésszám (db)</h2>
            {renderBarChart(genData(80, 200), "#8884d8")}
          </div>
          <div className="chart-container">
            <h2>Kezelések népszerűsége (db)</h2>
            {renderBarChart(genData(40, 100), "#9575cd")}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Stats;