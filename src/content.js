// All the words on the page live here, so you can edit copy without touching the layout.

export const navLinks = [
  { href: '#problem', label: 'Why' },
  { href: '#hardware', label: 'Hardware' },
  { href: '#system', label: 'System' },
  { href: '#how', label: 'How it works' },
  { href: '#security', label: 'Security' },
];

export const hero = {
 
  lede:
    'Cortex is a USB key with a fingerprint sensor built in. It keeps your logins on the device and hands them to your browser only after it recognizes your finger.',
  chips: ['ESP32', 'Fingerprint', 'USB'],
};

export const marquee = [
  'Fingerprint authentication',
  'ESP32 powered',
  'USB interface',
  'Browser extension',
  'Companion app',
  'Your keys. In your hands.',
];

export const problem = {
  eyebrow: 'The problem',
  title: ['Most passwords sit where', 'anyone can reach them.'],
  body:
    'A browser autofill list. A notes app. The same word with a different number on the end. If a password can be copied, someone else can copy it too.',
  items: [
    ['Reused', 'One leaked password opens every account that shares it.'],
    ['Typed', 'Anything you type can be watched, guessed, or handed over on a fake login page.'],
    ['Stored as software', 'A file on a laptop is only as safe as the laptop.'],
  ],
};

// Steps for the scroll-driven hardware section. Index 0 is the assembled device,
// 1-4 are the layers (top to bottom), 5 is the reassembly.
export const hwSteps = [
  {
    kicker: 'The device',
    title: 'One small key.',
    body: "A fingerprint sensor on the front and a USB plug on the side. Keep scrolling and we'll open it up.",
  },
  {
    kicker: 'Layer 01',
    title: 'Top cover',
    body: 'The shell has a window cut out for your finger, and it holds everything underneath in place.',
  },
  {
    kicker: 'Layer 02',
    title: 'Fingerprint sensor',
    body: "It reads your finger before anything else happens. If it doesn't recognize you, nothing leaves the device.",
  },
  {
    kicker: 'Layer 03',
    title: 'ESP32',
    body: 'The brain of the key. It runs the firmware, listens to the sensor, and decides what goes out over USB.',
  },
  {
    kicker: 'Layer 04',
    title: 'PCB and USB plug',
    body: 'Everything is mounted on one board. The USB plug connects it to your computer and powers it.',
  },
  {
    kicker: 'Assembled',
    title: 'Back together.',
    body: "Four layers, one key. That's the whole device. Next up: what it does with your logins.",
  },
];

export const hwRail = ['Device', 'Cover', 'Sensor', 'ESP32', 'PCB + USB', 'Closed'];

export const glance = {
  eyebrow: 'At a glance',
  title: ['What it is,', 'in six lines.'],
  rows: [
    ['Brain', 'ESP32'],
    ['Authentication', 'Fingerprint sensor'],
    ['Connection', 'USB'],
    ['Board', 'Single PCB'],
    ['Software', 'Cortex app and browser extension'],
    
  ],
};

export const system = {
  eyebrow: 'The system',
  title: ['One key.', 'Two pieces of software.'],
  body: 'The device does the sensitive part. The app and the extension make it usable day to day.',
  cards: [
    {
      icon: 'key',
      name: 'The key',
      body: 'Holds your credentials and checks your fingerprint. This is where the trust starts.',
    },
    {
      icon: 'app',
      name: 'The app',
      body: 'Shows your accounts, activity logs and updates. It has no reason to display the secrets themselves.',
    },
    {
      icon: 'ext',
      name: 'The extension',
      body: 'Connects the key to the sign-in page, so your login goes in without you typing it.',
    },
  ],
};

export const appSection = {
  eyebrow: 'The app',
  title: ["See what's happening.", 'Never see the password.'],
  body: 'Check which accounts are saved, when the key was used, and whether an update is waiting. The credentials stay on the hardware.',
  note: 'Preview with sample data',
};

export const appTabs = ['Overview', 'Accounts', 'Activity logs', 'Updates'];

export const appData = {
  stats: [
    ['12', 'Accounts'],
    ['48', 'Verified logs'],
    ['03', 'Updates'],
  ],
  accounts: [
    ['G', 'Google', 'username@gmail.com'],
    ['Gh', 'GitHub', 'developer@example.com'],
    ['Li', 'LinkedIn', 'name@example.com'],
    ['Dr', 'Dropbox', 'files@example.com'],
  ],
  logs: [
    ['09:42', 'Fingerprint verified', 'github.com'],
    ['09:41', 'Key connected', 'USB port 2'],
    ['Yesterday', 'Fingerprint verified', 'google.com'],
    ['Yesterday', 'Account added', 'dropbox.com'],
  ],
  updates: [
    ['Firmware', 'A new version is ready to install', 'Ready'],
    ['Browser extension', 'Up to date', 'Done'],
    ['App', 'Up to date', 'Done'],
  ],
};

export const flow = {
  eyebrow: 'How it works',
  title: ['From the key', 'to the browser.'],
  body: 'Five steps, and you only do two of them.',
  steps: [
    ['Plug it in', 'Put Cortex in a free USB port.'],
    ['Touch the sensor', 'Your fingerprint is checked on the device itself.'],
    ['Pick the account', 'Choose the login you need for this site.'],
    ['Login goes through', 'The key passes it to the browser extension. You never type it.'],
    ['You are in', 'The site signs you in. Unplug the key and take it with you.'],
  ],
};

export const security = {
  eyebrow: 'Why hardware',
  title: ['Two things have to show up:', 'the key, and you.'],
  body: 'A master password can be guessed from anywhere in the world. A key and a fingerprint have to be in the same room.',
  items: [
    ['Something you hold', 'Your logins are tied to the device in your hand.'],
    ['Something you are', 'Your fingerprint is checked before the key releases anything.'],
    ['Something in between', "The browser extension connects the key to supported sign-in pages. That's all it's there for."],
  ],
};

export const final = {
  title: ['Your keys.', 'In your hands.'],
  body: 'Cortex is our graduation project: an ESP32, a fingerprint sensor and a USB plug, turned into a password key.',
};
