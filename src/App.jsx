import { useCallback, useState } from 'react';
import Boot from './components/Boot.jsx';
import Hardware from './components/Hardware.jsx';
import AppPreview from './components/AppPreview.jsx';
import {
  ScrollBar,
  Nav,
  Hero,
  Marquee,
  Problem,
  Glance,
  System,
  Flow,
  Security,
  Final,
  Footer,
} from './components/Sections.jsx';
import { useReveal } from './hooks.js';

// Add ?skipboot to the URL to jump past the intro while you work on the page.
const skipBoot = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('skipboot');

export default function App() {
  const [booted, setBooted] = useState(skipBoot);
  const done = useCallback(() => setBooted(true), []);
  useReveal(booted);

  if (!booted) return <Boot onDone={done} />;

  return (
    <div className="site">
      <ScrollBar />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Hardware />
        <Glance />
        <System />
        <AppPreview />
        <Flow />
        <Security />
        <Final />
      </main>
      <Footer />
    </div>
  );
}
