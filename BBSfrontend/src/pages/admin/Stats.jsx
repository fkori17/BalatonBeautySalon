import IconStatCard from "../../components/IconStatCard";
import { 
  FaUserPlus, FaMoneyBillWave, FaStar, FaCalendarCheck, 
  FaChartLine, FaUsers, FaArrowUp, FaGem 
} from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

import "../../components/style/AdminStats.css";

function Stats() {
  const months = ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec"];
  
  const genData = (min, max) => months.map(m => ({ name: m, v: Math.floor(Math.random() * (max - min + 1)) + min }));

  return (
    <div className="stats-page">
      <h1 className="stats-title"> Statisztikák</h1>
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
            <h2>Új ügyfelek havonta</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={genData(10, 40)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" tick={{fontSize: 11}} interval={0} />
                <YAxis tick={{fontSize: 11}} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} />
                <Bar dataKey="v" fill="#e9b174" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-container">
            <h2>Vendégforgalom eloszlás</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={genData(50, 150)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" tick={{fontSize: 11}} interval={0} />
                <YAxis tick={{fontSize: 11}} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} />
                <Bar dataKey="v" fill="#fb8c00" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
            <h2>Havi kezelésszám</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={genData(80, 200)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" tick={{fontSize: 11}} interval={0} />
                <YAxis tick={{fontSize: 11}} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} />
                <Bar dataKey="v" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-container">
            <h2>Kezelések népszerűsége</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={genData(40, 100)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" tick={{fontSize: 11}} interval={0} />
                <YAxis tick={{fontSize: 11}} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} />
                <Bar dataKey="v" fill="#9575cd" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={genData(500000, 900000)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" tick={{fontSize: 11}} interval={0} />
                <YAxis tick={{fontSize: 11}} />
                <Tooltip formatter={(v) => `${v.toLocaleString()} Ft`} />
                <Bar dataKey="v" fill="#82ca9d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-container">
            <h2>Átlagos kosárérték</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={genData(15000, 25000)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" tick={{fontSize: 11}} interval={0} />
                <YAxis tick={{fontSize: 11}} />
                <Tooltip formatter={(v) => `${v.toLocaleString()} Ft`} />
                <Bar dataKey="v" fill="#4caf50" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Stats;