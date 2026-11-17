import { useCallback, useEffect, useRef, useState } from 'react';
import { hwSteps, hwRail } from '../content.js';
import { clamp, useReducedMotion } from '../hooks.js';
import { asset } from '../asset.js';

/*
  Scroll-driven exploded view.

  The four layers are cut from the Cortex render (public/assets/hw/*.png). Each one is placed
  at its original position inside a 491 x 721 frame, so with --e = 1 (fully exploded) they
  line up exactly like the render. With --e = 0 each layer is pushed down by `d` frame units
  until they stack into the assembled device.

  --e is written straight to the stage element on every animation frame (no React re-render).
  React state only changes when the active step changes.
*/

const FRAME = { w: 491, h: 721 };

// Listed back to front. `d` = how far (in frame units) the layer drops when assembled.
const LAYERS = [
  { id: 'pcb', x: 0, y: 431, w: 491, h: 290, d: 0, z: 1, step: 4, tag: 'PCB + USB', ty: 24 },
  { id: 'esp', x: 1, y: 320, w: 408, h: 221, d: 85, z: 2, step: 3, tag: 'ESP32', ty: 30 },
  { id: 'sensor', x: 167, y: 201, w: 258, h: 148, d: 215, z: 3, step: 2, tag: 'Fingerprint sensor', ty: 32 },
  { id: 'cover', x: 1, y: 0, w: 485, h: 222, d: 330, z: 4, step: 1, tag: 'Top cover', ty: 32 },
];

// Where each step sits (0..1) inside the pinned section. Used by the rail buttons.
const MID = [0.06, 0.29, 0.465, 0.635, 0.8, 0.94];

const stepOf = (p) => (p < 0.2 ? 0 : p < 0.38 ? 1 : p < 0.55 ? 2 : p < 0.72 ? 3 : p < 0.88 ? 4 : 5);
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
// 0 = assembled, 1 = exploded. Opens early, stays open while you inspect, closes at the end.
const explodeAt = (p) => Math.min(ease(clamp((p - 0.04) / 0.16)), ease(clamp((0.96 - p) / 0.1)));

export default function Hardware() {
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sec = sectionRef.current;
    const stage = stageRef.current;
    if (!sec || !stage) return;

    let target = 0;
    let cur = 0;
    let raf = 0;
    let last = 0;
    let lastStep = -1;

    const measure = () => {
      const r = sec.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      target = total > 0 ? clamp(-r.top / total) : 0;
    };

    const paint = () => {
      stage.style.setProperty('--e', explodeAt(cur).toFixed(4));
      stage.style.setProperty('--p', cur.toFixed(4));
      const s = stepOf(cur);
      if (s !== lastStep) {
        lastStep = s;
        setStep(s);
      }
    };

    const frame = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
      last = t;
      cur = reduced ? target : cur + (target - cur) * (1 - Math.exp(-dt * 9));
      if (Math.abs(target - cur) < 0.0005) cur = target;
      paint();
      raf = cur !== target ? requestAnimationFrame(frame) : 0;
    };

    const onScroll = () => {
      measure();
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    measure();
    cur = target;
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const goTo = useCallback((i) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const total = sec.offsetHeight - window.innerHeight;
    const top = sec.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + total * MID[i], behavior: 'smooth' });
  }, []);

  const inspecting = step >= 1 && step <= 4;

  return (
    <section className="hw" id="hardware" ref={sectionRef}>
      <div className="hw-stage" ref={stageRef} data-step={step}>
        <div className="hw-bg" aria-hidden="true" />

        <div className="hw-copy">
          {hwSteps.map((s, i) => (
            <div className="hw-panel" data-on={i === step} key={s.title} aria-hidden={i !== step}>
              <p className="eyebrow">
                {s.kicker} <span className="eyebrow-count">{String(i + 1).padStart(2, '0')} / 06</span>
              </p>
              <h2>{s.title}</h2>
              <p className="hw-body">{s.body}</p>
              {i === 0 && (
                <p className="hw-hint">
                  <span className="hw-hint-line" /> Scroll to open it
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="hw-fig-wrap">
          <div className="hw-fig" role="img" aria-label="Exploded view of the Cortex device: top cover, fingerprint sensor, ESP32 and PCB with USB plug">
            <i className="hw-guide hw-guide-l" aria-hidden="true" />
            <i className="hw-guide hw-guide-r" aria-hidden="true" />
            {LAYERS.map((l) => {
              const state = !inspecting ? 'on' : l.step === step ? 'hot' : 'dim';
              return (
                <div
                  key={l.id}
                  className="hw-layer"
                  data-state={state}
                  style={{
                    left: `${(l.x / FRAME.w) * 100}%`,
                    top: `${(l.y / FRAME.h) * 100}%`,
                    width: `${(l.w / FRAME.w) * 100}%`,
                    zIndex: l.z,
                    '--d': l.d,
                    '--rg': FRAME.w - l.x - l.w,
                  }}
                >
                  <img src={asset(`assets/hw/${l.id}.png`)} alt="" draggable="false" />
                  <div className="hw-tag" style={{ top: `${l.ty}%` }} aria-hidden="true">
                    <i />
                    <span>{l.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <ol className="hw-rail" aria-label="Hardware steps">
          {hwRail.map((label, i) => (
            <li key={label}>
              <button type="button" data-on={i === step} data-done={i < step} onClick={() => goTo(i)}>
                <span className="hw-rail-bar" />
                <span className="hw-rail-label">{label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
