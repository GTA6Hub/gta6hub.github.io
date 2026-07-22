import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
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

function Nav() {
  const { pathname } = useLocation();
  return (
    <nav className="nav">
      <Link to="/" className={`nav-link${pathname === "/" ? " active" : ""}`}>HOME</Link>
      <Link to="/about" className={`nav-link${pathname === "/about" ? " active" : ""}`}>ABOUT</Link>
      <Link to="/contact" className={`nav-link${pathname === "/contact" ? " active" : ""}`}>CONTACT</Link>
      <Link to="/privacy" className={`nav-link${pathname === "/privacy" ? " active" : ""}`}>PRIVACY</Link>
    </nav>
  );
}

function Home() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE.getTime());
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) { setStatus("error"); return; }
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
    } catch { setStatus("error"); }
  };

  return (
    <>
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
        <button className="email-btn" type="submit" disabled={status === "success"}>
          {status === "success" ? "✓ LOCKED IN" : "NOTIFY ME"}
        </button>
      </form>

      {status === "error" && <p className="form-msg error">Enter a valid email address.</p>}
      {status === "success" && <p className="form-msg success">You're on the list. We'll hit you when it drops.</p>}
      <p className="footer-note">No spam. Just the drop date, leaks &amp; tips.</p>

      <div className="quiz-section">
        <div className="divider" style={{ margin: "3rem 0 2rem" }}>
          <span className="divider-line" />
          <span className="divider-text">WHICH GTA VI CHARACTER ARE YOU?</span>
          <span className="divider-line" />
        </div>
        <Quiz />
      </div>
    </>
  );
}

function About() {
  return (
    <div className="static-page">
      <h2 className="static-title">About GTA VI Hub</h2>
      <p>GTA VI Hub is an independent fan site dedicated to everything Grand Theft Auto VI — the most anticipated game in Rockstar Games history.</p>
      <p>Our goal is simple: keep fans informed, entertained, and ready for launch day. We track the latest news, leaks, trailers, and confirmed details so you don't have to.</p>
      <h3>What we offer</h3>
      <ul>
        <li>Live countdown to the GTA VI release date</li>
        <li>Interactive quiz to discover which character matches your personality</li>
        <li>Early access notifications — sign up to be the first to know</li>
        <li>Curated tips, leaks, and confirmed features</li>
      </ul>
      <h3>Who we are</h3>
      <p>We're a small team of GTA fans who have been following the franchise since the beginning. This site is built with passion for the community — not affiliated with Rockstar Games or Take-Two Interactive.</p>
      <h3>Disclaimer</h3>
      <p>GTA VI Hub is a fan-made site. All trademarks, game assets, and intellectual property belong to their respective owners. We do not claim ownership of any Rockstar Games content.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="static-page">
      <h2 className="static-title">Contact</h2>
      <p>Have a tip, a leak, a question, or want to collaborate? We'd love to hear from you.</p>
      <h3>General inquiries</h3>
      <p>For general questions, suggestions, or feedback about the site, reach out via email:</p>
      <p className="contact-email">📧 contact@gta6hub.github.io</p>
      <h3>Submit a tip or leak</h3>
      <p>If you have information about GTA VI that you'd like us to cover, send it our way. We review all submissions and credit sources where permitted.</p>
      <h3>Partnership & advertising</h3>
      <p>Interested in partnering with GTA VI Hub? We're open to collaborations with gaming brands, affiliate programs, and content creators. Get in touch and we'll respond within 48 hours.</p>
      <h3>Response time</h3>
      <p>We aim to respond to all messages within 2 business days.</p>
    </div>
  );
}

function Privacy() {
  return (
    <div className="static-page">
      <h2 className="static-title">Privacy Policy</h2>
      <p className="static-meta">Last updated: July 2026</p>

      <h3>1. Information we collect</h3>
      <p>When you subscribe to our notification list, we collect your email address. This is the only personal information we request. We do not collect names, phone numbers, or payment information.</p>

      <h3>2. How we use your information</h3>
      <p>Your email address is used solely to send you updates about GTA VI — including the confirmed release date, major news, and launch day notifications. We will never sell or share your email with third parties for marketing purposes.</p>

      <h3>3. Email service provider</h3>
      <p>We use Brevo (formerly Sendinblue) to manage our email list. Your email address is stored securely on their platform. You can view Brevo's privacy policy at brevo.com.</p>

      <h3>4. Cookies & analytics</h3>
      <p>This site may use Google Analytics to understand how visitors interact with our content. This data is anonymised and used only to improve the site experience. Google Analytics may use cookies to collect this information.</p>

      <h3>5. Third-party advertising</h3>
      <p>This site may display advertisements served by Google AdSense. Google may use cookies to show personalised ads based on your browsing behaviour. You can opt out via Google's Ad Settings at adssettings.google.com.</p>

      <h3>6. Your rights</h3>
      <p>You may unsubscribe from our email list at any time using the unsubscribe link in any email we send. To request deletion of your data, contact us directly.</p>

      <h3>7. Contact</h3>
      <p>For any privacy-related questions, please contact us via the Contact page.</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="page">
      <div className="noise" />
      <div className="grid" />
      <Nav />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>© 2026 GTA VI Hub — Fan site. Not affiliated with Rockstar Games.</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}