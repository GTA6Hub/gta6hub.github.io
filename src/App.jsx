import { useState, useEffect } from "react";
import "./App.css";

const LAUNCH_DATE = new Date("2026-11-19T00:00:00");

function useCountdown(target) {
  const [diff, setDiff] = useState(target - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const total = Math.max(0, diff);
  return {
    days: Math.floor(total / 86400000),
    hours: Math.floor((total % 86400000) / 3600000),
    minutes: Math.floor((total % 3600000) / 60000),
    seconds: Math.floor((total % 60000) / 1000),
  };
}

function Digit({ value, label }) {
  const str = String(value).padStart(2, "0");
  return (
    <div className="digit-block">
      <div className="digit-value">{str}</div>
      <div className="digit-label">{label}</div>
    </div>
  );
}

const QUESTIONS = [
  {
    id: 1,
    text: "Pick your ideal Friday night:",
    options: [
      { label: "Counting cash at a casino", value: "lucia" },
      { label: "Street racing until sunrise", value: "jason" },
      { label: "Running a hustle from the shadows", value: "lucia" },
      { label: "Causing chaos just for fun", value: "jason" },
    ],
  },
  {
    id: 2,
    text: "Your weapon of choice?",
    options: [
      { label: "Wit and manipulation", value: "lucia" },
      { label: "Brute force — ask questions later", value: "jason" },
      { label: "A pistol and a plan", value: "lucia" },
      { label: "Whatever's closest", value: "jason" },
    ],
  },
  {
    id: 3,
    text: "What drives you?",
    options: [
      { label: "Getting out and building something real", value: "lucia" },
      { label: "The thrill — no plan, just adrenaline", value: "jason" },
      { label: "Loyalty to the people I trust", value: "lucia" },
      { label: "Money. Always money.", value: "jason" },
    ],
  },
  {
    id: 4,
    text: "You walk into a trap. What do you do?",
    options: [
      { label: "I saw it coming — already have a way out", value: "lucia" },
      { label: "Shoot first, escape later", value: "jason" },
      { label: "Talk my way out", value: "lucia" },
      { label: "Turn it into their trap", value: "jason" },
    ],
  },
  {
    id: 5,
    text: "Pick a Vice City vibe:",
    options: [
      { label: "Rooftop lounge, watching the city below", value: "lucia" },
      { label: "Back alley, engine revving", value: "jason" },
      { label: "Beachfront at golden hour, planning the next move", value: "lucia" },
      { label: "Neon-lit strip, every eye on you", value: "jason" },
    ],
  },
];

const RESULTS = {
  lucia: {
    name: "Lucia",
    tagline: "The Strategist",
    description:
      "You're calculated, ambitious, and always three steps ahead. Like Lucia, you play the long game — using your head when others reach for their guns.",
    color: "#C8A84B",
  },
  jason: {
    name: "Jason",
    tagline: "The Wildcard",
    description:
      "Unpredictable, fearless, and impossible to ignore. Like Jason, you live for the moment and thrive in chaos — rules were made for someone else.",
    color: "#e05c3a",
  },
};

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const handleOption = (value, idx) => {
    setSelectedIdx(idx);
    setTimeout(() => {
      const next = [...answers, value];
      if (current + 1 < QUESTIONS.length) {
        setAnswers(next);
        setCurrent(current + 1);
        setSelectedIdx(null);
      } else {
        const count = next.reduce(
          (acc, v) => ({ ...acc, [v]: (acc[v] || 0) + 1 }),
          {}
        );
        setResult(count.lucia >= count.jason ? "lucia" : "jason");
      }
    }, 320);
  };

  const reset = () => {
    setCurrent(0);
    setAnswers([]);
    setResult(null);
    setSelectedIdx(null);
  };

  if (result) {
    const r = RESULTS[result];
    return (
      <div className="quiz-result">
        <p className="quiz-result-label">YOU ARE</p>
        <h2 className="quiz-result-name" style={{ color: r.color }}>{r.name}</h2>
        <p className="quiz-result-tagline">{r.tagline}</p>
        <p className="quiz-result-desc">{r.description}</p>
        <button className="quiz-restart" onClick={reset}>PLAY AGAIN</button>
      </div>
    );
  }

  const q = QUESTIONS[current];
  return (
    <div className="quiz">
      <div className="quiz-progress">
        <div className="quiz-progress-bar" style={{ width: `${(current / QUESTIONS.length) * 100}%` }} />
      </div>
      <p className="quiz-counter">{current + 1} / {QUESTIONS.length}</p>
      <h3 className="quiz-question">{q.text}</h3>
      <div className="quiz-options">
        {q.options.map((opt, i) => (
          <button
            key={i}
            className={`quiz-option${selectedIdx === i ? " selected" : ""}`}
            onClick={() => handleOption(opt.value, i)}
            disabled={selectedIdx !== null}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE.getTime());
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email || !email.includes("@")) {
    setStatus("error");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("EMAIL", email);
    formData.append("email_address_check", "");
    formData.append("locale", "en");

    await fetch(
      "https://8f57265f.sibforms.com/serve/MUIFABw1uUm8yw5aM0SBguNvVDWVAcPSKMbdw2fHYOpbi0bpbAtZuTvnjVUomzdWDuAXnGUu3GRs3HU9603o69FMa9Qv1AKGyj6m15gfASBUV8Tx2Xz8tg6BsRDPnlpPjQiabWXQkgSuyGNJDiQ7KHRnjm1N7Z8YNQz0hXhi2sQQCHKmGLvX-oyM-m1ri6E0CQ-ksYYHTIaQ5iUpJQ==",
      { method: "POST", body: formData, mode: "no-cors" }
    );

    setStatus("success");
    setEmail("");
  } catch {
    setStatus("error");
  }
};

  return (
    <div className="page">
      <div className="noise" />
      <div className="grid" />
      <main className="content">
        <p className="eyebrow">ROCKSTAR GAMES • 2026</p>
        <h1 className="title">
          <span className="title-gta">GTA</span>
          <span className="title-vi">VI</span>
        </h1>

        <p className="subtitle">THE WAIT IS ALMOST OVER</p>
        <div className="countdown">
          <Digit value={days} label="DAYS" />
          <span className="sep">:</span>
          <Digit value={hours} label="HRS" />
          <span className="sep">:</span>
          <Digit value={minutes} label="MIN" />
          <span className="sep">:</span>
          <Digit value={seconds} label="SEC" />
        </div>
        <div className="divider">
          <span className="divider-line" />
          <span className="divider-text">GET NOTIFIED ON LAUNCH DAY</span>
          <span className="divider-line" />
        </div>
        <form className="email-form" onSubmit={handleSubmit}>
          <input
            className="email-input"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "success"}
          />
          <button
            className="email-btn"
            type="submit"
            disabled={status === "success"}
          >
            {status === "success" ? "✓ LOCKED IN" : "NOTIFY ME"}
          </button>
        </form>

        {status === "error" && (
          <p className="form-msg error">Enter a valid email address.</p>
        )}
        {status === "success" && (
          <p className="form-msg success">
            You're on the list. We'll hit you when it drops.
          </p>
        )}
        <p className="footer-note">
          No spam. Just the drop date, leaks &amp; tips.
        </p>

        <div className="quiz-section">
          <div className="divider" style={{ margin: "3rem 0 2rem" }}>
            <span className="divider-line" />
            <span className="divider-text">WHICH GTA VI CHARACTER ARE YOU?</span>
            <span className="divider-line" />
          </div>
          <Quiz />
        </div>
      </main>
    </div>
  );
}