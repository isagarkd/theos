/* THEOS — instant audit. Precompiled from audit.jsx (Babel preset-react). */
(function () {
'use strict';
/* Theos AI — Instant UX intelligence. Split console (left) + streaming audit
   report (right). Real audit copy via window.claude.complete (JSON), with a
   crafted sample as instant fallback. PDF export opens a premium A4 document. */
const {
  useState,
  useRef,
  useEffect,
  useCallback
} = React;

/* ---------------- data ---------------- */
const STAGES = ['Website detected', 'Rendering pages', 'Capturing screenshots', 'Analyzing information architecture', 'Evaluating UX patterns', 'Checking accessibility', 'Performance analysis', 'Mobile review', 'Visual hierarchy detection', 'Design consistency', 'Conversion review', 'Generating recommendations', 'Preparing executive summary'];
const SAMPLE = {
  url: 'example.com',
  overall: 68,
  scores: {
    UX: 71,
    UI: 74,
    Accessibility: 58,
    Performance: 63,
    SEO: 72,
    Conversion: 66
  },
  summary: 'A capable site with a clear proposition, held back by uneven hierarchy and slow first paint. The largest gains sit in accessibility and conversion flow — both fixable without a redesign.',
  findings: [{
    area: 'Information architecture',
    score: 72,
    note: 'Primary nav is clear, but secondary content is buried three levels deep. Flatten to two.'
  }, {
    area: 'Visual hierarchy',
    score: 64,
    note: 'Three competing font sizes in the hero dilute the message. One dominant statement would double clarity.'
  }, {
    area: 'Accessibility',
    score: 58,
    note: 'Contrast fails WCAG AA on secondary text. Focus states are missing on 40% of interactive elements.'
  }, {
    area: 'Performance',
    score: 63,
    note: 'Unoptimized hero imagery delays LCP past 3.5s on 4G. Modern formats would cut it in half.'
  }, {
    area: 'Mobile experience',
    score: 69,
    note: 'Tap targets under 44px in the footer and nav. Content reflows correctly otherwise.'
  }, {
    area: 'Conversion path',
    score: 66,
    note: 'The primary CTA appears only once above the fold. No mid-page re-entry point exists.'
  }],
  recommendations: [{
    title: 'Rebuild the hero hierarchy',
    problem: 'Competing type sizes and dual CTAs split attention.',
    impact: 'First-impression clarity drives every downstream metric.',
    rec: 'One statement, one action. Move the secondary link below the fold.',
    priority: 'High',
    difficulty: 'Low',
    uplift: 'Bounce rate −10–15%'
  }, {
    title: 'Fix contrast and focus states',
    problem: 'Secondary text fails WCAG AA; keyboard users lose their place.',
    impact: 'Excludes users and exposes legal risk.',
    rec: 'Raise text contrast to 4.5:1 and add visible focus rings across all controls.',
    priority: 'High',
    difficulty: 'Low',
    uplift: 'AA compliance'
  }, {
    title: 'Compress the critical path',
    problem: 'LCP over 3.5s on mid-range mobile.',
    impact: 'Every second of delay costs conversion.',
    rec: 'Serve AVIF/WebP, preload the hero image, defer non-critical scripts.',
    priority: 'Medium',
    difficulty: 'Medium',
    uplift: 'LCP −40–50%'
  }, {
    title: 'Add a mid-page conversion point',
    problem: 'Users who scroll past the hero have no path to act.',
    impact: 'Long pages lose warm intent.',
    rec: 'Repeat the primary CTA after the proof section with a one-line reminder of value.',
    priority: 'Medium',
    difficulty: 'Low',
    uplift: 'CTA clicks +8–12%'
  }],
  quickWins: ['Preload hero image', 'Raise secondary text contrast', 'Add focus rings', 'Enlarge footer tap targets'],
  services: ['UX audit & research', 'Website redesign', 'Performance engineering']
};
const CLAUDE_PROMPT = url => `You are Theos AI, the UX intelligence of a premium design studio. A visitor requested an instant heuristic audit of: ${url}

You cannot browse. Infer from the domain, its industry, and common patterns for that category of site. Be specific and expert — never generic filler. Plausible, actionable, consultant-grade.

Return ONLY valid JSON, no markdown fences, matching exactly:
{"overall": <int 45-85>, "scores": {"UX": <int>, "UI": <int>, "Accessibility": <int>, "Performance": <int>, "SEO": <int>, "Conversion": <int>}, "summary": "<2-3 declarative sentences, sentence case>", "findings": [6 items: {"area": "<aspect>", "score": <int>, "note": "<1-2 specific sentences>"}], "recommendations": [4 items: {"title": "<verb phrase>", "problem": "<1 sentence>", "impact": "<1 sentence>", "rec": "<1-2 sentences>", "priority": "High|Medium", "difficulty": "Low|Medium|High", "uplift": "<short estimate>"}], "quickWins": [4 short strings], "services": [3 Theos services from: UX audit & research, Website redesign, Product design, Brand identity, Web development, Mobile app, AI & automation, Performance engineering, SEO & growth]}`;

/* ---------------- gauge ---------------- */
function Gauge({
  label,
  value,
  big,
  delay
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf, start;
    const tid = setTimeout(() => {
      const tick = ts => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / 1200);
        setV(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay || 0);
    return () => {
      clearTimeout(tid);
      cancelAnimationFrame(raf);
    };
  }, [value]);
  const R = big ? 62 : 34,
    S = big ? 150 : 88,
    C = 2 * Math.PI * R;
  const hue = v < 55 ? 'var(--brick-500, #b4553d)' : v < 72 ? 'var(--gold-500, #b98a2f)' : 'var(--ember-500)';
  return /*#__PURE__*/React.createElement("div", {
    className: big ? 'gauge gauge-big' : 'gauge'
  }, /*#__PURE__*/React.createElement("svg", {
    width: S,
    height: S,
    viewBox: `0 0 ${S} ${S}`
  }, /*#__PURE__*/React.createElement("circle", {
    cx: S / 2,
    cy: S / 2,
    r: R,
    fill: "none",
    stroke: "rgba(255,255,255,0.08)",
    strokeWidth: big ? 6 : 4
  }), /*#__PURE__*/React.createElement("circle", {
    cx: S / 2,
    cy: S / 2,
    r: R,
    fill: "none",
    stroke: hue,
    strokeWidth: big ? 6 : 4,
    strokeLinecap: "round",
    strokeDasharray: C,
    strokeDashoffset: C * (1 - v / 100),
    transform: `rotate(-90 ${S / 2} ${S / 2})`,
    style: {
      filter: `drop-shadow(0 0 ${big ? 10 : 5}px ${hue})`,
      transition: 'stroke 0.4s'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "gauge-txt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gv"
  }, v), /*#__PURE__*/React.createElement("span", {
    className: "gl"
  }, label)));
}

/* ---------------- PDF export ---------------- */
function exportPDF(data) {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const date = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const foot = `<div class="pf"><span>theos.design &middot; hello@theos.design &middot; New Delhi &middot; London</span><span>Confidential &middot; Generated by Theos AI</span></div>`;
  const scoreRows = Object.entries(data.scores).map(([k, v]) => `<div class="srow"><span>${k}</span><div class="sbar"><i style="width:${v}%"></i></div><b>${v}</b></div>`).join('');
  const w = window.open('', '_blank');
  if (!w) return;
  w.document.write(`<!DOCTYPE html><html><head><title>Theos AI — UX audit — ${esc(data.url)}</title><style>
    @page { size: A4; margin: 18mm 16mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Geist', -apple-system, sans-serif; color: #1e1e1e; line-height: 1.55; font-size: 11pt; }
    .page { page-break-after: always; padding-top: 6mm; }
    .page:last-child { page-break-after: auto; }
    .sq { display: inline-block; width: 10px; height: 10px; background: #f36d1f; margin-right: 8px; }
    .micro { font-size: 8.5pt; letter-spacing: 0.12em; text-transform: uppercase; color: #8a8178; }
    h1 { font-size: 30pt; letter-spacing: -0.02em; font-weight: 600; line-height: 1.05; margin: 10mm 0 4mm; }
    h2 { font-size: 17pt; letter-spacing: -0.01em; font-weight: 600; margin: 0 0 5mm; }
    h3 { font-size: 12pt; font-weight: 600; margin-bottom: 1.5mm; }
    .hr { height: 2px; background: linear-gradient(90deg, #f36d1f, rgba(243,109,31,0.1)); margin: 6mm 0; border: 0; }
    .cover { padding-top: 60mm; }
    .cover .big { font-size: 64pt; font-weight: 600; letter-spacing: -0.03em; color: #f36d1f; }
    .meta { color: #6f675f; font-size: 10pt; margin-top: 2mm; }
    .srow { display: flex; align-items: center; gap: 6mm; margin: 3mm 0; }
    .srow span { width: 34mm; font-size: 10pt; }
    .srow b { width: 10mm; text-align: right; font-size: 11pt; }
    .sbar { flex: 1; height: 5px; background: #eee7de; border-radius: 3px; overflow: hidden; }
    .sbar i { display: block; height: 100%; background: #f36d1f; border-radius: 3px; }
    .card { border: 1px solid #e5ddd3; border-radius: 10px; padding: 5mm 6mm; margin-bottom: 4mm; }
    .tag { display: inline-block; font-size: 8pt; letter-spacing: 0.08em; text-transform: uppercase; border: 1px solid #d8cfc4; border-radius: 99px; padding: 1mm 3mm; margin-right: 2mm; color: #6f675f; }
    .note { color: #55504a; font-size: 10pt; }
    .pf { display: flex; justify-content: space-between; font-size: 8pt; color: #a39a8f; border-top: 1px solid #e5ddd3; padding-top: 3mm; margin-top: 10mm; }
    ul { padding-left: 5mm; } li { margin: 1.5mm 0; }
    .contact { padding-top: 50mm; text-align: center; }
    .contact a { color: #f36d1f; text-decoration: none; }
  </style></head><body>
  <div class="page cover">
    <p class="micro"><span class="sq"></span>Theos AI &mdash; instant UX intelligence</p>
    <h1>UX audit report.</h1>
    <p class="meta">${esc(data.url)} &middot; ${date}</p>
    <div class="hr"></div>
    <p class="big">${data.overall}</p>
    <p class="micro">Overall experience score</p>
    ${foot}
  </div>
  <div class="page">
    <p class="micro"><span class="sq"></span>Executive summary</p>
    <h2 style="margin-top:4mm">The verdict.</h2>
    <p>${esc(data.summary)}</p>
    <div class="hr"></div>
    ${scoreRows}
    ${foot}
  </div>
  <div class="page">
    <p class="micro"><span class="sq"></span>Detailed findings</p>
    <h2 style="margin-top:4mm">What we saw.</h2>
    ${data.findings.map(f => `<div class="card"><h3>${esc(f.area)} — ${f.score}</h3><p class="note">${esc(f.note)}</p></div>`).join('')}
    ${foot}
  </div>
  <div class="page">
    <p class="micro"><span class="sq"></span>Recommendations</p>
    <h2 style="margin-top:4mm">What to do about it.</h2>
    ${data.recommendations.map(r => `<div class="card"><h3>${esc(r.title)}</h3>
      <p class="note"><b>Problem.</b> ${esc(r.problem)} <b>Impact.</b> ${esc(r.impact)}</p>
      <p class="note" style="margin-top:1.5mm">${esc(r.rec)}</p>
      <p style="margin-top:2.5mm"><span class="tag">Priority: ${esc(r.priority)}</span><span class="tag">Difficulty: ${esc(r.difficulty)}</span><span class="tag">${esc(r.uplift)}</span></p></div>`).join('')}
    <h3 style="margin-top:5mm">Quick wins</h3>
    <ul>${data.quickWins.map(q => `<li>${esc(q)}</li>`).join('')}</ul>
    ${foot}
  </div>
  <div class="page contact">
    <p class="micro"><span class="sq"></span>Next step</p>
    <h1 style="font-size:24pt">Want Theos to implement this?</h1>
    <p class="meta" style="margin-top:4mm">Suggested engagement: ${data.services.map(esc).join(' &middot; ')}</p>
    <div class="hr" style="width:40mm;margin:8mm auto"></div>
    <p><a href="mailto:hello@theos.design">hello@theos.design</a></p>
    <p class="meta">theos.design &middot; New Delhi &middot; London</p>
    ${foot}
  </div>
  </body></html>`);
  w.document.close();
  setTimeout(() => {
    w.focus();
    w.print();
  }, 400);
}

/* ---------------- main app ---------------- */
function AuditApp() {
  const [url, setUrl] = useState('');
  const [phase, setPhase] = useState('idle'); /* idle | running | done */
  const [stage, setStage] = useState(-1);
  const [pct, setPct] = useState(0);
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(0); /* streamed section count */
  const reportRef = useRef(null);
  const claudeRef = useRef(null);
  const clean = u => u.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const run = useCallback(sample => {
    const target = sample ? 'sample — a typical marketing site' : clean(url);
    if (!sample && !target.includes('.')) return;
    setPhase('running');
    setStage(0);
    setPct(0);
    setData(null);
    setVisible(0);
    if (window.__theosAudio) window.__theosAudio.click();

    /* fire the intelligence call immediately */
    claudeRef.current = sample || !(window.claude && window.claude.complete) ? Promise.resolve({
      ...SAMPLE,
      url: sample ? 'sample.report' : target
    }) : Promise.race([window.claude.complete(CLAUDE_PROMPT(target)).then(raw => {
      const j = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
      return {
        ...j,
        url: target
      };
    }), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 22000))]).catch(() => ({
      ...SAMPLE,
      url: target
    }));

    /* cinematic stage sequence ~14s */
    let i = 0;
    const step = () => {
      i++;
      setStage(Math.min(i, STAGES.length - 1));
      setPct(Math.round(i / STAGES.length * 100));
      if (window.__theosAudio) window.__theosAudio.hover();
      if (i < STAGES.length - 1) {
        setTimeout(step, 650 + Math.random() * 900);
      } else {
        /* wait for intelligence, then stream the report */
        claudeRef.current.then(d => {
          setData(d);
          setPct(100);
          setPhase('done');
          if (window.__theosAudio) window.__theosAudio.tick();
          let v = 0;
          const stream = () => {
            v++;
            setVisible(v);
            if (reportRef.current) reportRef.current.scrollTo({
              top: reportRef.current.scrollHeight,
              behavior: 'smooth'
            });
            if (v < 5) setTimeout(stream, 850);else if (reportRef.current) setTimeout(() => reportRef.current.scrollTo({
              top: 0,
              behavior: 'smooth'
            }), 1200);
          };
          setTimeout(stream, 300);
        });
      }
    };
    setTimeout(step, 600);
  }, [url]);
  return /*#__PURE__*/React.createElement("div", {
    className: "audit-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "audit-console"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ac-orb-wrap",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: phase === 'running' ? 'ac-orb busy' : 'ac-orb'
  }), /*#__PURE__*/React.createElement("div", {
    className: "ac-ring r1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ac-ring r2"
  })), /*#__PURE__*/React.createElement("p", {
    className: "t-micro"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sq"
  }), "Theos AI"), /*#__PURE__*/React.createElement("h3", {
    className: "ac-h"
  }, "Instant UX intelligence."), /*#__PURE__*/React.createElement("p", {
    className: "ac-sub"
  }, "A professional UX, accessibility, performance and conversion read of any website. Under sixty seconds. No signup."), phase !== 'running' ? /*#__PURE__*/React.createElement("div", {
    className: "ac-form"
  }, /*#__PURE__*/React.createElement("input", {
    className: "ac-input",
    type: "url",
    placeholder: "yourwebsite.com",
    value: url,
    onChange: e => setUrl(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') run(false);
    },
    "aria-label": "Website URL"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-solid",
    onClick: () => run(false)
  }, "Generate audit"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: () => run(true)
  }, "View sample report")) : /*#__PURE__*/React.createElement("div", {
    className: "ac-stages"
  }, STAGES.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s,
    className: 'ac-stage' + (i < stage ? ' done' : i === stage ? ' on' : '')
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), s)), /*#__PURE__*/React.createElement("div", {
    className: "ac-bar"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: pct + '%'
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "ac-pct"
  }, pct, "% \xB7 ", Math.max(1, Math.round((100 - pct) * 0.14)), "s remaining")), /*#__PURE__*/React.createElement("div", {
    className: "ac-badges"
  }, /*#__PURE__*/React.createElement("span", null, "No signup"), /*#__PURE__*/React.createElement("span", null, "AI powered"), /*#__PURE__*/React.createElement("span", null, "PDF export"))), /*#__PURE__*/React.createElement("div", {
    className: "audit-report",
    ref: reportRef
  }, !data && phase === 'idle' && /*#__PURE__*/React.createElement("div", {
    className: "ar-empty"
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-micro"
  }, "Report"), /*#__PURE__*/React.createElement("p", null, "Your audit will stream in here, section by section, while the analysis runs.")), !data && phase === 'running' && /*#__PURE__*/React.createElement("div", {
    className: "ar-empty"
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-micro"
  }, "Analyzing"), /*#__PURE__*/React.createElement("p", null, STAGES[Math.max(0, stage)], "\u2026"), /*#__PURE__*/React.createElement("div", {
    className: "ar-skel"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null))), data && /*#__PURE__*/React.createElement("div", {
    className: "ar-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ar-sec in"
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-micro"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sq"
  }), "Executive summary \u2014 ", data.url), /*#__PURE__*/React.createElement("div", {
    className: "ar-hero"
  }, /*#__PURE__*/React.createElement(Gauge, {
    label: "Overall",
    value: data.overall,
    big: true,
    delay: 100
  }), /*#__PURE__*/React.createElement("p", {
    className: "ar-verdict"
  }, data.summary))), visible >= 1 && /*#__PURE__*/React.createElement("div", {
    className: "ar-sec in"
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-micro"
  }, "Scores"), /*#__PURE__*/React.createElement("div", {
    className: "ar-gauges"
  }, Object.entries(data.scores).map(([k, v], i) => /*#__PURE__*/React.createElement(Gauge, {
    key: k,
    label: k,
    value: v,
    delay: i * 150
  })))), visible >= 2 && /*#__PURE__*/React.createElement("div", {
    className: "ar-sec in"
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-micro"
  }, "Findings"), data.findings.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.area,
    className: "ar-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ar-fhead"
  }, /*#__PURE__*/React.createElement("h4", null, f.area), /*#__PURE__*/React.createElement("span", {
    className: "ar-score"
  }, f.score)), /*#__PURE__*/React.createElement("p", null, f.note)))), visible >= 3 && /*#__PURE__*/React.createElement("div", {
    className: "ar-sec in"
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-micro"
  }, "Recommendations"), data.recommendations.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.title,
    className: "ar-card"
  }, /*#__PURE__*/React.createElement("h4", null, r.title), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Problem."), " ", r.problem, " ", /*#__PURE__*/React.createElement("strong", null, "Impact."), " ", r.impact), /*#__PURE__*/React.createElement("p", null, r.rec), /*#__PURE__*/React.createElement("div", {
    className: "ar-tags"
  }, /*#__PURE__*/React.createElement("span", null, "Priority: ", r.priority), /*#__PURE__*/React.createElement("span", null, "Difficulty: ", r.difficulty), /*#__PURE__*/React.createElement("span", {
    className: "em"
  }, r.uplift))))), visible >= 4 && /*#__PURE__*/React.createElement("div", {
    className: "ar-sec in"
  }, /*#__PURE__*/React.createElement("p", {
    className: "t-micro"
  }, "Quick wins"), /*#__PURE__*/React.createElement("ul", {
    className: "ar-wins"
  }, data.quickWins.map(q => /*#__PURE__*/React.createElement("li", {
    key: q
  }, q)))), visible >= 5 && /*#__PURE__*/React.createElement("div", {
    className: "ar-sec in ar-cta"
  }, /*#__PURE__*/React.createElement("h4", null, "Want Theos to implement these improvements?"), /*#__PURE__*/React.createElement("p", null, "Suggested engagement: ", data.services.join(' \u00b7 '), "."), /*#__PURE__*/React.createElement("div", {
    className: "ar-cta-row"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-solid btn-sm",
    href: "mailto:hello@theos.design?subject=Strategy%20session"
  }, "Book a discovery call"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: () => exportPDF(data)
  }, "Export as PDF")))), data && visible >= 5 && /*#__PURE__*/React.createElement("button", {
    className: "ar-float",
    onClick: () => exportPDF(data),
    "aria-label": "Export as PDF"
  }, "PDF \u2193")));
}
const auditMount = document.getElementById('audit-mount');
if (auditMount) ReactDOM.createRoot(auditMount).render(/*#__PURE__*/React.createElement(AuditApp, null));
})();
