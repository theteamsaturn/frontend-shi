import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/*
  ================================================================
  BACKEND INTEGRATION POINT — REPLACE WITH FASTAPI DATA LATER
  ================================================================
  Keep the object shapes below when connecting your API. For example:

  const dashboardData = await fetch('http://localhost:8000/dashboard').then(r => r.json());

  Every value below is intentionally simulated. Search for "API: REPLACE"
  to find individual fields that should come from your FastAPI endpoints.
*/
const districts = [
  // API: REPLACE with GET /districts or GET /risk-summary
  { name: 'Bengaluru Urban', risk: 'High', rain: '78 mm', level: 82, color: '#ff795b' },
  { name: 'Chennai', risk: 'Moderate', rain: '54 mm', level: 58, color: '#f4be5d' },
  { name: 'Pune', risk: 'Watch', rain: '31 mm', level: 31, color: '#62cfe2' },
  { name: 'Kochi', risk: 'High', rain: '69 mm', level: 76, color: '#ff795b' },
];
// API: REPLACE with GET /forecast/timeline
const hours = ['Now','14:00','17:00','20:00','23:00','02:00'];
// API: REPLACE with GET /forecast/rainfall
const rainfallSeries = [21,35,58,73,65,42,28,18,22,35,51,39];
// API: REPLACE with GET /sources/health
const dataSources = [
  ['INSAT-3D satellite', 'Updated 11 min ago'],
  ['Doppler weather radar', 'Updated 4 min ago'],
  ['AWS observations', 'Updated 2 min ago'],
  ['NWP ensemble (GFS)', 'Run 12:30 IST'],
];

function App() {
  const [activeDistrict, setActiveDistrict] = useState(districts[0]);
  const [layer, setLayer] = useState('Inundation');
  const [isPlaying, setIsPlaying] = useState(false);
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => districts.filter(d => d.name.toLowerCase().includes(search.toLowerCase())), [search]);
  return <main>
    <header className="topbar">
      <div className="brand"><span className="brand-mark">∿</span><div><b>AquaFall</b><small>AI / flood intelligence</small></div></div>
      <nav><a className="active">Monitor</a><a>Forecast</a><a>Reports</a><a>Data health</a></nav>
      <div className="header-actions"><span className="demo-pill">DEMO FEED</span><button className="icon-btn" aria-label="Notifications">⌁<i /></button><div className="avatar">RK</div></div>
    </header>

    <section className="intro">
      <div><p className="eyebrow"><span className="pulse" /> NATIONAL EARLY WARNING CONSOLE</p><h1>Heavy rainfall, <em>seen earlier.</em></h1><p className="subcopy">Integrated rainfall and inundation guidance for decision support. <span>All values on this screen are simulated for demonstration.</span></p></div>
      <div className="updated"><span>Last model run</span><b>12:30 IST, 10 Sep</b><small>Coverage: South India + coastal districts</small></div>
    </section>

    <section className="metrics">
      {/* API: REPLACE metrics with GET /dashboard/summary */}
      <Metric label="Rainfall in 24h" value="78" unit="mm" note="+18% vs. normal" trend="up" />
      <Metric label="Flood risk index" value="82" unit="/100" note="High · next 6 hrs" trend="risk" />
      <Metric label="Area potentially inundated" value="14.6" unit="km²" note="Model estimate" trend="water" />
      <Metric label="Active field alerts" value="03" unit="" note="2 require acknowledgement" trend="alert" />
    </section>

    <section className="workspace">
      <div className="map-card panel">
        <div className="panel-head"><div><p className="eyebrow">SITUATIONAL VIEW</p><h2>Inundation probability</h2></div><div className="map-tools"><button className="selected">{layer}</button><button onClick={() => setLayer(layer === 'Inundation' ? 'Rainfall' : 'Inundation')}>{layer === 'Inundation' ? 'Rainfall' : 'Inundation'}</button><button className="locate">⌖</button></div></div>
        <div className="map-area">
          <div className="map-grid" />
          <div className="river river-one" /><div className="river river-two" />
          <span className="place p1">Tumakuru</span><span className="place p2">Bengaluru</span><span className="place p3">Hosur</span><span className="place p4">Kolar</span>
          <div className="flood f1" /><div className="flood f2" /><div className="flood f3" />
          <div className="route r1" /><div className="route r2" />
          <button className="map-pin pin-a" onClick={() => setActiveDistrict(districts[0])}><span /><label>82%</label></button>
          <button className="map-pin pin-b" onClick={() => setActiveDistrict(districts[1])}><span /><label>61%</label></button>
          <button className="map-pin pin-c" onClick={() => setActiveDistrict(districts[2])}><span /><label>34%</label></button>
          <div className="map-legend"><b>{layer === 'Inundation' ? 'Inundation likelihood' : 'Rain intensity'}</b><div><i className="l1" />Low <i className="l2" />Elevated <i className="l3" />High</div></div>
          <div className="scale">10 km <span /></div>
        </div>
        <div className="timeline"><button onClick={() => setIsPlaying(!isPlaying)} className={isPlaying ? 'playing' : ''}>{isPlaying ? 'Ⅱ' : '▶'}</button>{hours.map((h,i)=><div key={h} className={i === 0 ? 'time active-time':'time'}><span>{h}</span><i /></div>)}<small>Forecast window · IST</small></div>
      </div>
      <aside className="side-stack">
        {/* API: REPLACE this whole card with GET /alerts/priority */}<div className="panel alert-panel"><div className="panel-head"><div><p className="eyebrow">PRIORITY ALERT</p><h2>Urban flood advisory</h2></div><span className="severity">HIGH</span></div><p>Low-lying wards around Bellandur may see waterlogging after 16:00.</p><div className="alert-meta"><span>▣ 12 wards</span><span>◷ Valid for 8h</span></div><button className="wide-btn">Review advisory <span>→</span></button></div>
        <div className="panel source-panel"><div className="panel-head"><div><p className="eyebrow">DATA FUSION</p><h2>Input availability</h2></div><b className="good">4 / 4 live</b></div><div className="sources">{/* API: sourced from dataSources / GET /sources/health */}{dataSources.map(([name,status]) => <Source key={name} name={name} status={status} />)}</div></div>
      </aside>
    </section>

    <section className="lower-grid">
      <div className="panel rain-panel"><div className="panel-head"><div><p className="eyebrow">PRECIPITATION OUTLOOK</p><h2>Rainfall, next 12 hours</h2></div><button className="text-btn">Bengaluru Urban⌄</button></div><div className="chart">{/* API: rainfallSeries from GET /forecast/rainfall */}<div className="chart-y"><span>80</span><span>40</span><span>0</span></div><div className="bars">{rainfallSeries.map((n,i)=><div className="bar-wrap" key={i}><div className={'bar '+(i===3?'peak':'')} style={{height:n+'%'}} /><small>{i%2===0 ? `${(12+i)%24}:00`:''}</small></div>)}</div><div className="chart-note">Peak cell expected around <b>15:00–17:00</b></div></div></div>
      <div className="panel district-panel"><div className="panel-head"><div><p className="eyebrow">DISTRICT QUEUE</p><h2>Areas to watch</h2></div><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" /></div><div className="district-list">{filtered.map(d=><button className={'district '+(activeDistrict.name===d.name?'chosen':'')} key={d.name} onClick={()=>setActiveDistrict(d)}><span className="risk-dot" style={{background:d.color}} /><div><b>{d.name}</b><small>{d.rain} expected / 24h</small></div><div className="risk-value"><b>{d.risk}</b><span>{d.level}</span></div></button>)}</div></div>
    </section>
    <footer><span>AquaFall AI · SIH prototype</span><span>Prepared for <b>India Meteorological Department / MoES</b></span><span>Simulated data · Not for operational use</span></footer>
  </main>
}
function Metric({label,value,unit,note,trend}) { return <article className="metric panel"><p>{label}</p><div><b>{value}</b><span>{unit}</span></div><small className={trend}>{trend==='up'?'↗ ':trend==='risk'?'● ':trend==='water'?'≈ ':'⚑ '}{note}</small></article> }
function Source({name,status}) { return <div className="source"><span className="source-check">✓</span><div><b>{name}</b><small>{status}</small></div><i>•••</i></div> }
createRoot(document.getElementById('root')).render(<App />);
