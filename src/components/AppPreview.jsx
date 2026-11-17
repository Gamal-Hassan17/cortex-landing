import { useState } from 'react';
import { appSection, appTabs, appData } from '../content.js';
import { asset } from '../asset.js';

function Overview() {
  return (
    <>
      <p className="app-kicker">WELCOME BACK</p>
      <h3>Your security overview</h3>
      <div className="app-stats">
        {appData.stats.map(([n, l]) => (
          <div key={l}>
            <b>{n}</b>
            <span>{l}</span>
          </div>
        ))}
      </div>
      {appData.accounts.slice(0, 2).map(([ini, name, mail]) => (
        <AccountRow key={name} ini={ini} name={name} mail={mail} />
      ))}
    </>
  );
}

function AccountRow({ ini, name, mail }) {
  return (
    <div className="app-row">
      <span className="app-ini">{ini}</span>
      <div>
        <b>{name}</b>
        <small>{mail}</small>
      </div>
      <em>••••••••</em>
    </div>
  );
}

function Accounts() {
  return (
    <>
      <p className="app-kicker">SAVED ON YOUR KEY</p>
      <h3>Accounts</h3>
      {appData.accounts.map(([ini, name, mail]) => (
        <AccountRow key={name} ini={ini} name={name} mail={mail} />
      ))}
    </>
  );
}

function Logs() {
  return (
    <>
      <p className="app-kicker">RECENT</p>
      <h3>Activity logs</h3>
      {appData.logs.map(([when, what, where]) => (
        <div className="app-row app-log" key={when + what + where}>
          <small className="app-when">{when}</small>
          <div>
            <b>{what}</b>
            <small>{where}</small>
          </div>
          <span className="app-ok">Verified</span>
        </div>
      ))}
    </>
  );
}

function Updates() {
  return (
    <>
      <p className="app-kicker">SOFTWARE</p>
      <h3>Updates</h3>
      {appData.updates.map(([name, state, badge]) => (
        <div className="app-row" key={name}>
          <div>
            <b>{name}</b>
            <small>{state}</small>
          </div>
          <span className={badge === 'Ready' ? 'app-badge app-badge-hot' : 'app-badge'}>{badge}</span>
        </div>
      ))}
    </>
  );
}

const PANELS = [Overview, Accounts, Logs, Updates];

export default function AppPreview() {
  const [tab, setTab] = useState(0);
  const Panel = PANELS[tab];

  return (
    <section className="section app" id="app">
      <div className="app-copy" data-reveal>
        <p className="eyebrow">{appSection.eyebrow}</p>
        <h2>
          {appSection.title[0]}
          <br />
          <span className="blue">{appSection.title[1]}</span>
        </h2>
        <p className="lead">{appSection.body}</p>
        <p className="app-note">{appSection.note}</p>
      </div>

      <div className="app-window" data-reveal style={{ '--i': 1 }}>
        <div className="app-bar">
          <span />
          <span />
          <span />
          <small>Cortex / {appTabs[tab]}</small>
        </div>
        <div className="app-body">
          <aside role="tablist" aria-label="App sections">
            <div className="app-logo">
              <img src={asset('assets/cortex-mark.png')} alt="" /> CORTEX
            </div>
            {appTabs.map((t, i) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={i === tab}
                data-on={i === tab}
                onClick={() => setTab(i)}
              >
                {t}
              </button>
            ))}
          </aside>
          <div className="app-main" key={tab}>
            <Panel />
          </div>
        </div>
      </div>
    </section>
  );
}
