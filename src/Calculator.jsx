import { useState } from "react";
import "./Calculator.css";

const HEISTS = [
  { id: "bank", name: "Bank Robbery", icon: "🏦", baseReward: 2500000, risk: "Medium" },
  { id: "casino", name: "Casino Heist", icon: "🎰", baseReward: 8000000, risk: "High" },
  { id: "armored", name: "Armored Truck", icon: "🚛", baseReward: 500000, risk: "Low" },
  { id: "yacht", name: "Yacht Job", icon: "🛥️", baseReward: 4000000, risk: "Medium" },
  { id: "federal", name: "Federal Reserve", icon: "🏛️", baseReward: 15000000, risk: "Very High" },
  { id: "airport", name: "Airport Cargo", icon: "✈️", baseReward: 6000000, risk: "High" },
];

const DIFFICULTY = [
  { id: "easy", name: "Easy", multiplier: 0.75 },
  { id: "normal", name: "Normal", multiplier: 1.0 },
  { id: "hard", name: "Hard", multiplier: 1.25 },
];

const LIFESTYLE = [
  {
    category: "Housing",
    icon: "🏠",
    items: [
      { name: "Studio Apartment", price: 150000 },
      { name: "Beach House", price: 850000 },
      { name: "Vice City Penthouse", price: 3500000 },
      { name: "Mansion", price: 12000000 },
    ],
  },
  {
    category: "Vehicles",
    icon: "🚗",
    items: [
      { name: "Muscle Car", price: 45000 },
      { name: "Sports Car", price: 280000 },
      { name: "Supercar", price: 950000 },
      { name: "Private Jet", price: 5000000 },
    ],
  },
  {
    category: "Business",
    icon: "💼",
    items: [
      { name: "Nightclub", price: 1700000 },
      { name: "Car Dealership", price: 2200000 },
      { name: "Casino", price: 8000000 },
      { name: "Crime Empire HQ", price: 20000000 },
    ],
  },
];

const RISK_COLOR = {
  Low: "#27ae60",
  Medium: "#f39c12",
  High: "#e05c3a",
  "Very High": "#c0392b",
};

function fmt(n) {
  return "$" + n.toLocaleString("en-US");
}

function HeistCalc() {
  const [heist, setHeist] = useState(HEISTS[0]);
  const [difficulty, setDifficulty] = useState(DIFFICULTY[1]);
  const [crew, setCrew] = useState(2);
  const [cut, setCut] = useState(50);

  const total = Math.round(heist.baseReward * difficulty.multiplier);
  const yourCut = Math.round(total * (cut / 100));
  const crewShare = crew > 1 ? Math.round((total - yourCut) / (crew - 1)) : 0;

  return (
    <div className="calc-section">
      <h2 className="calc-section-title">
        <span>💰</span> Heist Calculator
      </h2>
      <p className="calc-section-desc">
        Plan your next job. Pick the heist, set the difficulty, split the cut.
      </p>

      {/* Heist selector */}
      <div className="field-label">Choose Your Heist</div>
      <div className="heist-grid">
        {HEISTS.map((h) => (
          <button
            key={h.id}
            className={`heist-card${heist.id === h.id ? " active" : ""}`}
            onClick={() => setHeist(h)}
          >
            <span className="heist-icon">{h.icon}</span>
            <span className="heist-name">{h.name}</span>
            <span className="heist-reward">{fmt(h.baseReward)}</span>
            <span className="heist-risk" style={{ color: RISK_COLOR[h.risk] }}>
              {h.risk}
            </span>
          </button>
        ))}
      </div>

      {/* Difficulty */}
      <div className="field-label">Difficulty</div>
      <div className="btn-group">
        {DIFFICULTY.map((d) => (
          <button
            key={d.id}
            className={`toggle-btn${difficulty.id === d.id ? " active" : ""}`}
            onClick={() => setDifficulty(d)}
          >
            {d.name}
            <span className="toggle-sub">×{d.multiplier}</span>
          </button>
        ))}
      </div>

      {/* Crew size */}
      <div className="field-label">Crew Size: <strong>{crew}</strong></div>
      <input
        type="range" min="1" max="4" value={crew}
        onChange={(e) => setCrew(Number(e.target.value))}
        className="slider"
      />
      <div className="slider-labels">
        <span>Solo</span><span>2</span><span>3</span><span>4</span>
      </div>

      {/* Your cut */}
      <div className="field-label">Your Cut: <strong>{cut}%</strong></div>
      <input
        type="range" min="10" max="90" step="5" value={cut}
        onChange={(e) => setCut(Number(e.target.value))}
        className="slider"
      />
      <div className="slider-labels">
        <span>10%</span><span>50%</span><span>90%</span>
      </div>

      {/* Result */}
      <div className="result-box">
        <div className="result-row">
          <span>Total Payout</span>
          <span className="result-value">{fmt(total)}</span>
        </div>
        <div className="result-divider" />
        <div className="result-row highlight">
          <span>Your Share ({cut}%)</span>
          <span className="result-value gold">{fmt(yourCut)}</span>
        </div>
        {crew > 1 && (
          <div className="result-row">
            <span>Each Crew Member</span>
            <span className="result-value">{fmt(crewShare)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function LifestyleSim() {
  const [selected, setSelected] = useState([]);
  const [budget, setBudget] = useState(10000000);

  const toggle = (item) => {
    setSelected((prev) =>
      prev.find((i) => i.name === item.name)
        ? prev.filter((i) => i.name !== item.name)
        : [...prev, item]
    );
  };

  const totalSpent = selected.reduce((s, i) => s + i.price, 0);
  const remaining = budget - totalSpent;
  const pct = Math.min(100, (totalSpent / budget) * 100);

  return (
    <div className="calc-section">
      <h2 className="calc-section-title">
        <span>🏙️</span> Lifestyle Simulator
      </h2>
      <p className="calc-section-desc">
        You just pulled off the heist. Now spend it. What's your Vice City life?
      </p>

      {/* Budget */}
      <div className="field-label">Your Budget</div>
      <div className="budget-grid">
        {[1000000, 5000000, 10000000, 50000000].map((b) => (
          <button
            key={b}
            className={`toggle-btn${budget === b ? " active" : ""}`}
            onClick={() => setBudget(b)}
          >
            {fmt(b)}
          </button>
        ))}
      </div>

      {/* Spend bar */}
      <div className="spend-bar-wrap">
        <div className="spend-bar">
          <div
            className="spend-bar-fill"
            style={{
              width: `${pct}%`,
              background: remaining < 0 ? "#c0392b" : "var(--gold)",
            }}
          />
        </div>
        <div className="spend-bar-labels">
          <span style={{ color: remaining < 0 ? "#c0392b" : "var(--gold)" }}>
            Spent: {fmt(totalSpent)}
          </span>
          <span style={{ color: remaining < 0 ? "#c0392b" : "#aaa" }}>
            {remaining < 0 ? `Over budget by ${fmt(Math.abs(remaining))}` : `Remaining: ${fmt(remaining)}`}
          </span>
        </div>
      </div>

      {/* Items */}
      {LIFESTYLE.map((cat) => (
        <div key={cat.category} className="lifestyle-cat">
          <div className="lifestyle-cat-title">
            {cat.icon} {cat.category}
          </div>
          <div className="lifestyle-items">
            {cat.items.map((item) => {
              const isSelected = selected.find((i) => i.name === item.name);
              return (
                <button
                  key={item.name}
                  className={`lifestyle-item${isSelected ? " active" : ""}`}
                  onClick={() => toggle(item)}
                >
                  <span className="lifestyle-item-name">{item.name}</span>
                  <span className="lifestyle-item-price">{fmt(item.price)}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Summary */}
      {selected.length > 0 && (
        <div className="result-box">
          <div className="field-label" style={{ marginBottom: "0.75rem" }}>Your Vice City Life</div>
          {selected.map((item) => (
            <div className="result-row" key={item.name}>
              <span>{item.name}</span>
              <span className="result-value">{fmt(item.price)}</span>
            </div>
          ))}
          <div className="result-divider" />
          <div className="result-row highlight">
            <span>Total Spent</span>
            <span className="result-value gold">{fmt(totalSpent)}</span>
          </div>
          <div className="result-row">
            <span>Remaining</span>
            <span
              className="result-value"
              style={{ color: remaining < 0 ? "#c0392b" : "#27ae60" }}
            >
              {fmt(Math.abs(remaining))} {remaining < 0 ? "over" : "left"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Calculator() {
  return (
    <div className="calculator-page">
      <div className="calc-header">
        <p className="eyebrow">GTA VI TOOLS</p>
        <h1 className="calc-title">Money Calculator</h1>
        <p className="calc-subtitle">Plan your heists. Live your Vice City dream.</p>
      </div>
      <HeistCalc />
      <LifestyleSim />
    </div>
  );
}
