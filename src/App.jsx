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
      {}
      <div className="noise" />

      {}
      <div className="grid" />

      <main className="content">
        {}
        <p className="eyebrow">ROCKSTAR GAMES • 2025</p>

        {}
        <h1 className="title">
          <span className="title-gta">GTA</span>
          <span className="title-vi">VI</span>
        </h1>

        <p className="subtitle">THE WAIT IS ALMOST OVER</p>

        {}
        <div className="countdown">
          <Digit value={days} label="DAYS" />
          <span className="sep">:</span>
          <Digit value={hours} label="HRS" />
          <span className="sep">:</span>
          <Digit value={minutes} label="MIN" />
          <span className="sep">:</span>
          <Digit value={seconds} label="SEC" />
        </div>

        {}
        <div className="divider">
          <span className="divider-line" />
          <span className="divider-text">GET NOTIFIED ON LAUNCH DAY</span>
          <span className="divider-line" />
        </div>

        {}
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

        {}
        <p className="footer-note">
          No spam. Just the drop date, leaks &amp; tips.
        </p>
      </main>
    </div>
  );
}
