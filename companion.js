/* THEOS — the companion. Precompiled from companion.jsx (Babel preset-react). */
(function () {
'use strict';
/* THEOS — the companion. An intelligence embedded in the experience, built from
   the design system's AI component group. Uses window.claude.complete when available. */
const {
  AIComposer,
  AIMessage,
  ThinkingIndicator
} = window.TheosDesignSystem_e121a9;
const {
  useState,
  useRef,
  useEffect
} = React;
const THEOS_SYSTEM = `You are THEOS, the resident intelligence of Theos — a premium AI-first digital product studio.

Facts you know:
- Theos partners with ambitious businesses across strategy, design, engineering, AI and growth — one integrated team, not four vendors.
- Services: product design, UX research, website design, brand identity, packaging, motion, design systems; web and mobile development, Shopify, custom software; AI consulting, AI agents, workflow automation, knowledge systems; SEO, performance marketing, content strategy; digital transformation and product strategy consulting.
- Process: discover, design, build, grow. Research always precedes design. Nothing ships without QA.
- Selected work: Sofy (women's health platform — UX research, mobile app, design system), Motherson supplier portal (enterprise manufacturing — dashboard UX at scale), Intrude (premium Indian streetwear — brand, packaging, web), Segreto (hospitality — brand marketing and campaigns).
- Engagements: fixed-scope projects, retainers, dedicated teams, consulting.
- Studio: founded by Sagar KD. New Delhi and London. hello@theos.design. theos.design.
- Pricing: never quote numbers. Recommend a discovery call.

Voice rules (strict):
- Sentence case. Short declarative sentences. One idea per sentence.
- No exclamation points. No emoji. No hype words. No bullet lists unless asked.
- 2-4 sentences maximum per reply.
- When relevant, close with: "Book a discovery call at hello@theos.design."
- If asked something outside the studio, answer briefly and steer back to how Theos can help.`;
const OPENERS = ['What can Theos build?', 'How does Theos use AI?', 'Tell me about the work', 'Book a discovery call'];
const FALLBACKS = {
  default: 'I can speak to what the studio designs, builds and automates. For anything specific to your product, a conversation works better. Book a discovery call at hello@theos.design.',
  build: 'Theos designs and builds digital products end to end. Strategy, product design, web and mobile engineering, AI systems and growth — one team, one standard. Book a discovery call at hello@theos.design.',
  ai: 'AI runs through everything here. We design AI agents, automate workflows and build knowledge systems — and we use the same intelligence to move client work faster without losing craft.',
  work: 'Recent work spans Sofy, a women\u2019s health platform. Motherson, an enterprise supplier portal. Intrude, a premium streetwear brand. Segreto, a hospitality identity. Each started with the business problem, not the screens.',
  call: 'Good decision. Write to hello@theos.design and the studio will set up a discovery call. Bring the problem — we will bring the questions.'
};
function fallbackFor(q) {
  const s = q.toLowerCase();
  if (s.includes('call') || s.includes('book') || s.includes('contact') || s.includes('price') || s.includes('cost')) return FALLBACKS.call;
  if (s.includes('ai') || s.includes('automat') || s.includes('agent')) return FALLBACKS.ai;
  if (s.includes('work') || s.includes('project') || s.includes('portfolio') || s.includes('sofy') || s.includes('motherson') || s.includes('intrude') || s.includes('segreto')) return FALLBACKS.work;
  if (s.includes('build') || s.includes('design') || s.includes('service') || s.includes('do')) return FALLBACKS.build;
  return FALLBACKS.default;
}
function Companion() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    text: 'I am Theos. Ask what we build, how we work, or whether we fit.'
  }]);
  const [value, setValue] = useState('');
  const [thinking, setThinking] = useState(false);
  const logRef = useRef(null);
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, thinking]);
  useEffect(() => {
    const onAsk = e => {
      if (e.detail) send(e.detail);
    };
    window.addEventListener('theos:ask', onAsk);
    return () => window.removeEventListener('theos:ask', onAsk);
  });
  async function send(text, instant) {
    const q = (text || value).trim();
    if (!q || thinking) return;
    setValue('');
    const next = [...messages, {
      role: 'user',
      text: q
    }];
    setMessages(next);
    setThinking(true);
    let reply;
    try {
      if (instant || !(window.claude && window.claude.complete)) {
        /* chips answer instantly from studio knowledge — no waiting */
        await new Promise(r => setTimeout(r, 350));
        reply = fallbackFor(q);
      } else {
        const transcript = next.map(m => (m.role === 'user' ? 'Visitor: ' : 'THEOS: ') + m.text).join('\n');
        /* never keep the user waiting: 8s cap, then answer locally */
        reply = await Promise.race([window.claude.complete(THEOS_SYSTEM + '\n\nConversation so far:\n' + transcript + '\n\nReply as THEOS. Output only the reply text.'), new Promise((_, rej) => setTimeout(() => rej(new Error('slow')), 8000))]);
      }
    } catch (err) {
      reply = fallbackFor(q);
    }
    setThinking(false);
    setMessages(m => [...m, {
      role: 'assistant',
      text: (reply || '').trim()
    }]);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "companion-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "companion-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: thinking ? 'orb busy' : 'orb'
  }), /*#__PURE__*/React.createElement("span", {
    className: "nm"
  }, "Theos"), /*#__PURE__*/React.createElement("span", {
    className: "st"
  }, thinking ? 'Processing' : 'Online')), /*#__PURE__*/React.createElement("div", {
    className: "companion-log",
    ref: logRef
  }, messages.map((m, i) => /*#__PURE__*/React.createElement(AIMessage, {
    key: i,
    role: m.role
  }, m.text)), thinking && /*#__PURE__*/React.createElement(ThinkingIndicator, {
    label: "Thinking"
  })), /*#__PURE__*/React.createElement("div", {
    className: "companion-chips"
  }, OPENERS.map(o => /*#__PURE__*/React.createElement("button", {
    key: o,
    className: "chip",
    onClick: () => send(o, true)
  }, o))), /*#__PURE__*/React.createElement(AIComposer, {
    placeholder: "Ask Theos anything\u2026",
    value: value,
    onChange: e => setValue(e.target.value),
    onSubmit: () => send(),
    disabled: thinking
  }));
}
const rootEl = document.getElementById('companion-mount');
if (rootEl) ReactDOM.createRoot(rootEl).render(/*#__PURE__*/React.createElement(Companion, null));
})();
