import { useEffect, useState } from 'react';
import { asset } from '../asset.js';

export default function Boot({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;
    let finish = 0;
    const timer = setInterval(() => {
      value += value < 70 ? 5 : value < 92 ? 3 : 1;
      if (value >= 100) {
        value = 100;
        clearInterval(timer);
        finish = setTimeout(onDone, 350);
      }
      setProgress(value);
    }, 28);
    const skip = (e) => {
      if (e.type === 'keydown' && e.key !== 'Escape' && e.key !== 'Enter') return;
      onDone();
    };
    window.addEventListener('keydown', skip);
    return () => {
      clearInterval(timer);
      clearTimeout(finish);
      window.removeEventListener('keydown', skip);
    };
  }, [onDone]);

  return (
    <div className="boot" onClick={onDone} role="status" aria-label="Loading Cortex">
      <div className="boot-glow" />
      <div className="boot-center">
        <img src={asset('assets/cortex-logo.png')} alt="Cortex" className="boot-logo" />
        <div className="boot-status">
          <span>STARTING UP</span>
          <span>{String(progress).padStart(3, '0')}%</span>
        </div>
        <div className="boot-bar">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
