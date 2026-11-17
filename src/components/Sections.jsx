import { useEffect, useRef, useState } from 'react';
import {
  navLinks,
  hero,
  marquee,
  problem,
  glance,
  system,
  flow,
  security,
  final,
} from '../content.js';
import { clamp } from '../hooks.js';
import { asset } from '../asset.js';

export function Wordmark() {
  return (
    <span className="wordmark">
      CORT<span className="wordmark-e">E</span>X
    </span>
  );
}

export function ScrollBar() {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${clamp(p)})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="scrollbar" aria-hidden="true">
      <span ref={ref} />
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className="nav" data-solid={solid}>
      <a className="brand" href="#top" aria-label="Cortex home">
        <img src={asset('assets/cortex-mark.png')} alt="" />
        <Wordmark />
      </a>
      <nav className="nav-links" data-open={open} aria-label="Main">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>
      <a className="btn btn-ghost nav-cta" href="#final">
        Meet Cortex
      </a>
      <button
        className="menu-btn"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow hero-in" style={{ '--i': 0 }}>
          {hero.eyebrow}
        </p>
        <h1 className="hero-in" style={{ '--i': 1 }}>
          Plug in.
          <br />
          <span className="blue">Touch.</span>
          <br />
          You&apos;re in.
        </h1>
        <p className="lead hero-in" style={{ '--i': 2 }}>
          {hero.lede}
        </p>
        <div className="hero-actions hero-in" style={{ '--i': 3 }}>
          <a className="btn btn-blue" href="#hardware">
            Look inside <span aria-hidden="true">↓</span>
          </a>
          <a className="btn btn-ghost" href="#how">
            How it works
          </a>
        </div>
        <ul className="chips hero-in" style={{ '--i': 4 }}>
          {hero.chips.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <div className="hero-device hero-in" style={{ '--i': 2 }}>
        <div className="hero-device-glow" aria-hidden="true" />
        <img src={asset('assets/cortex-device.webp')} alt="The Cortex key: a black USB device with a glowing fingerprint sensor" />
      </div>
    </section>
  );
}

export function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i}>
            <i /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Problem() {
  return (
    <section className="section problem" id="problem">
      <div className="problem-head" data-reveal>
        <p className="eyebrow">{problem.eyebrow}</p>
        <h2>
          {problem.title[0]} <span className="blue">{problem.title[1]}</span>
        </h2>
        <p className="lead">{problem.body}</p>
      </div>
      <ol className="problem-list">
        {problem.items.map(([t, b], i) => (
          <li key={t} data-reveal style={{ '--i': i }}>
            <span className="num">0{i + 1}</span>
            <h3>{t}</h3>
            <p>{b}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Glance() {
  return (
    <section className="section glance" id="glance">
      <div className="glance-head" data-reveal>
        <p className="eyebrow">{glance.eyebrow}</p>
        <h2>
          {glance.title[0]}
          <br />
          <span className="blue">{glance.title[1]}</span>
        </h2>
      </div>
      <dl className="glance-rows">
        {glance.rows.map(([k, v], i) => (
          <div key={k} data-reveal style={{ '--i': i * 0.5 }}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const ICONS = {
  key: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="8" width="26" height="32" rx="6" />
      <path d="M35 17h5v10h-5" />
      <path d="M22 32c-3-1-5-4-5-7s2-6 5-6 5 3 5 6" />
      <path d="M22 29c-1-.6-2-2-2-4s1-3 2-3 2 1 2 3" />
    </svg>
  ),
  app: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="9" width="36" height="30" rx="4" />
      <path d="M6 17h36" />
      <path d="M14 26h8M14 31h14" />
      <circle cx="35" cy="29" r="3" />
    </svg>
  ),
  ext: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 20h8a4 4 0 1 1 8 0h6v8a4 4 0 1 1 0 8v4H8z" />
      <path d="M30 20V10h10v10" />
    </svg>
  ),
};

export function System() {
  return (
    <section className="section system" id="system">
      <div className="system-head" data-reveal>
        <p className="eyebrow">{system.eyebrow}</p>
        <h2>
          {system.title[0]}
          <br />
          <span className="blue">{system.title[1]}</span>
        </h2>
        <p className="lead">{system.body}</p>
      </div>
      <div className="system-cards">
        {system.cards.map((c, i) => (
          <article key={c.name} className="card" data-reveal style={{ '--i': i }}>
            <div className="card-icon">{ICONS[c.icon]}</div>
            <span className="num">0{i + 1}</span>
            <h3>{c.name}</h3>
            <p>{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Flow() {
  const ref = useRef(null);
  const stepsRef = useRef(null);
  const [on, setOn] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const steps = stepsRef.current;
    if (!el || !steps) return;
    const n = flow.steps.length;
    const update = () => {
      // 0 when the steps row enters the lower part of the screen, 1 a bit later
      const r = steps.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh * 0.82 - r.top) / (vh * 0.42));
      el.style.setProperty('--fill', p.toFixed(3));
      setOn(p <= 0 ? 0 : Math.min(n, 1 + Math.floor(p * (n - 1) + 0.0001)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className="section flow" id="how" ref={ref}>
      <div className="flow-head" data-reveal>
        <p className="eyebrow">{flow.eyebrow}</p>
        <h2>
          {flow.title[0]}
          <br />
          <span className="blue">{flow.title[1]}</span>
        </h2>
        <p className="lead">{flow.body}</p>
      </div>
      <ol className="flow-steps" ref={stepsRef}>
        <li className="flow-rail" aria-hidden="true">
          <span />
        </li>
        {flow.steps.map(([t, b], i) => (
          <li key={t} className="flow-step" data-on={i < on}>
            <span className="flow-dot">{i + 1}</span>
            <h3>{t}</h3>
            <p>{b}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Security() {
  return (
    <section className="section security" id="security">
      <div className="security-grid">
        <div className="security-copy" data-reveal>
          <p className="eyebrow">{security.eyebrow}</p>
          <h2>
            {security.title[0]}
            <br />
            <span className="blue">{security.title[1]}</span>
          </h2>
          <p className="lead">{security.body}</p>
          <ul className="security-list">
            {security.items.map(([t, b], i) => (
              <li key={t}>
                <span className="num">0{i + 1}</span>
                <div>
                  <b>{t}</b>
                  <p>{b}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="security-visual" data-reveal style={{ '--i': 1 }} aria-hidden="true">
          <span className="ring ring-1" />
          <span className="ring ring-2" />
          <span className="ring ring-3" />
          <img src={asset('assets/cortex-mark.png')} alt="" />
        </div>
      </div>
    </section>
  );
}

export function Final() {
  return (
    <section className="final" id="final">
      <div className="final-glow" aria-hidden="true" />
      <div className="final-device" data-reveal>
        <img src={asset('assets/cortex-device.webp')} alt="The Cortex key" />
      </div>
      <div className="final-copy" data-reveal style={{ '--i': 1 }}>
        <p className="eyebrow">Cortex</p>
        <h2>
          {final.title[0]}
          <br />
          <span className="blue">{final.title[1]}</span>
        </h2>
        <p className="lead">{final.body}</p>
        <div className="hero-actions">
          <a className="btn btn-blue" href="#how">
            See how it works
          </a>
          <a className="btn btn-ghost" href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <a className="brand" href="#top" aria-label="Cortex home">
        <img src={asset('assets/cortex-mark.png')} alt="" />
        <Wordmark />
      </a>
      <p>Hardware / App / Extension</p>
      <p>© 2026 Cortex. Graduation project.</p>
    </footer>
  );
}
