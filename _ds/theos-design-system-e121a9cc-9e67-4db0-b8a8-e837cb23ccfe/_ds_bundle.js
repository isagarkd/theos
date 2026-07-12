/* @ds-bundle: {"format":4,"namespace":"TheosDesignSystem_e121a9","components":[{"name":"AIComposer","sourcePath":"components/ai/AIComposer.jsx"},{"name":"AIMessage","sourcePath":"components/ai/AIMessage.jsx"},{"name":"AgentCard","sourcePath":"components/ai/AgentCard.jsx"},{"name":"StreamingText","sourcePath":"components/ai/StreamingText.jsx"},{"name":"ThinkingIndicator","sourcePath":"components/ai/ThinkingIndicator.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Tag","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Drawer","sourcePath":"components/feedback/Drawer.jsx"},{"name":"Loader","sourcePath":"components/feedback/Loader.jsx"},{"name":"Progress","sourcePath":"components/feedback/Progress.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Textarea","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/ai/AIComposer.jsx":"a4ef4f837f06","components/ai/AIMessage.jsx":"2f4843cafa76","components/ai/AgentCard.jsx":"ac7e5f182782","components/ai/StreamingText.jsx":"c70e1174564e","components/ai/ThinkingIndicator.jsx":"cebb0a6f236a","components/core/Avatar.jsx":"b3caa0d10fa3","components/core/Badge.jsx":"16848bda17cc","components/core/Button.jsx":"99d0d7fab994","components/core/Card.jsx":"2387e01d4a2f","components/core/IconButton.jsx":"81fdcf6889df","components/feedback/Alert.jsx":"19153f1d952a","components/feedback/Dialog.jsx":"6ead6d35536a","components/feedback/Drawer.jsx":"c4750dfdf109","components/feedback/Loader.jsx":"c5c28eaa1ed5","components/feedback/Progress.jsx":"255dfcdd4d3a","components/feedback/Skeleton.jsx":"b7b978f3a7cc","components/feedback/Toast.jsx":"361cb9560d53","components/feedback/Tooltip.jsx":"14f3b58b0b23","components/forms/Checkbox.jsx":"8479b6184219","components/forms/Input.jsx":"1f5765a5dd9c","components/forms/Radio.jsx":"6a4e52d3d4e3","components/forms/Select.jsx":"21679e8a69b1","components/forms/Switch.jsx":"c65c15572f35","components/navigation/Tabs.jsx":"cdc81c7af198","ui_kits/marketing-site/AboutContactPages.jsx":"a59360da414a","ui_kits/marketing-site/Chrome.jsx":"5f1241d57e0a","ui_kits/marketing-site/HomePage.jsx":"d2dc33b04f05","ui_kits/marketing-site/ServicesPage.jsx":"f7cb197b9830","ui_kits/marketing-site/WorkPage.jsx":"f3520792b0d0","ui_kits/studio-app/ChatView.jsx":"548ff70deba9","ui_kits/studio-app/LoginScreen.jsx":"025c7c158adb","ui_kits/studio-app/SettingsView.jsx":"ab5217dd1890","ui_kits/studio-app/Sidebar.jsx":"555499e266a9","ui_kits/studio-app/WorkflowView.jsx":"8384cab3f803"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TheosDesignSystem_e121a9 = window.TheosDesignSystem_e121a9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/ai/AIComposer.jsx
try { (() => {
function AIComposer({
  placeholder = 'Ask Theos anything…',
  value,
  onChange,
  onSubmit,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 10,
      background: 'var(--glass-bg)',
      border: '1px solid var(--glass-border)',
      backdropFilter: `blur(var(--blur-md))`,
      WebkitBackdropFilter: `blur(var(--blur-md))`,
      borderRadius: 'var(--radius-xl)',
      padding: '10px 10px 10px 20px',
      boxShadow: 'var(--shadow-lg)',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    rows: 1,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      resize: 'none',
      background: 'transparent',
      fontSize: 'var(--text-body)',
      color: 'var(--fg-primary)',
      fontFamily: 'var(--font-sans)',
      padding: '8px 0',
      lineHeight: 1.5
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onSubmit,
    disabled: disabled,
    "aria-label": "Send",
    style: {
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--ink-950)',
      color: 'var(--stone-25)',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      transition: 'background var(--duration-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 13V3M3 8L8 3L13 8",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}
Object.assign(__ds_scope, { AIComposer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/AIComposer.jsx", error: String((e && e.message) || e) }); }

// components/ai/AIMessage.jsx
try { (() => {
function AIMessage({
  role = 'assistant',
  children,
  streaming = false
}) {
  const isUser = role === 'user';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '80%',
      background: isUser ? 'var(--ink-950)' : 'var(--surface-2)',
      color: isUser ? 'var(--stone-25)' : 'var(--fg-primary)',
      borderRadius: isUser ? 'var(--radius-lg) var(--radius-lg) 4px var(--radius-lg)' : 'var(--radius-lg) var(--radius-lg) var(--radius-lg) 4px',
      padding: '12px 16px',
      fontSize: 'var(--text-body)',
      lineHeight: 'var(--leading-body)'
    }
  }, children, streaming && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 2,
      height: '1em',
      background: 'var(--fg-accent)',
      marginLeft: 2,
      verticalAlign: 'text-bottom',
      animation: 'theos-caret 0.9s steps(1) infinite'
    }
  })), /*#__PURE__*/React.createElement("style", null, `@keyframes theos-caret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }`));
}
Object.assign(__ds_scope, { AIMessage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/AIMessage.jsx", error: String((e && e.message) || e) }); }

// components/ai/AgentCard.jsx
try { (() => {
function AgentCard({
  name,
  task,
  status = 'running',
  progress = 0
}) {
  const statusMap = {
    running: {
      label: 'Running',
      color: 'var(--fg-accent)'
    },
    done: {
      label: 'Complete',
      color: 'var(--fg-success)'
    },
    queued: {
      label: 'Queued',
      color: 'var(--fg-tertiary)'
    },
    error: {
      label: 'Failed',
      color: 'var(--fg-danger)'
    }
  };
  const s = statusMap[status];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-component-md)',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      width: 260
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-title-2)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--fg-primary)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 'var(--text-micro)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-micro)',
      color: s.color
    }
  }, status === 'running' && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: s.color,
      animation: 'theos-think 1.1s var(--ease-ai-pulse) infinite'
    }
  }), s.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--fg-secondary)'
    }
  }, task), status === 'running' && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-3)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${progress}%`,
      background: 'var(--fg-accent)',
      transition: 'width var(--duration-slow) var(--ease-emphasized)'
    }
  })), /*#__PURE__*/React.createElement("style", null, `@keyframes theos-think { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }`));
}
Object.assign(__ds_scope, { AgentCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/AgentCard.jsx", error: String((e && e.message) || e) }); }

// components/ai/StreamingText.jsx
try { (() => {
/**
 * StreamingText — renders text with a soft blinking caret to indicate
 * tokens are still arriving. Pass the text as it grows; the caret is
 * purely decorative and never blocks the (already-rendered) text.
 */
function StreamingText({
  text = '',
  streaming = false
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      color: 'var(--fg-primary)',
      lineHeight: 'var(--leading-body)'
    }
  }, text, streaming && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 2,
      height: '1em',
      background: 'var(--fg-accent)',
      marginLeft: 2,
      verticalAlign: 'text-bottom',
      animation: 'theos-caret 0.9s steps(1) infinite'
    }
  }), /*#__PURE__*/React.createElement("style", null, `@keyframes theos-caret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }`));
}
Object.assign(__ds_scope, { StreamingText });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/StreamingText.jsx", error: String((e && e.message) || e) }); }

// components/ai/ThinkingIndicator.jsx
try { (() => {
/**
 * ThinkingIndicator — three dots with a slow, staggered pulse. The one
 * place the system permits an easing curve with any "life" to it
 * (--ease-ai-pulse); everywhere else motion stays strictly architectural.
 */
function ThinkingIndicator({
  label = 'Thinking'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 6,
      height: 6,
      borderRadius: 'var(--radius-full)',
      background: 'var(--fg-accent)',
      animation: `theos-think 1.1s var(--ease-ai-pulse) ${i * 0.15}s infinite`
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--fg-tertiary)'
    }
  }, label), /*#__PURE__*/React.createElement("style", null, `@keyframes theos-think { 0%, 100% { opacity: 0.25; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-2px); } }`));
}
Object.assign(__ds_scope, { ThinkingIndicator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ai/ThinkingIndicator.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function Avatar({
  src,
  name = '',
  size = 'md'
}) {
  const dims = {
    sm: 28,
    md: 36,
    lg: 48,
    xl: 64
  };
  const d = dims[size];
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: d,
      height: d,
      borderRadius: 'var(--radius-full)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: src ? 'transparent' : 'var(--stone-300)',
      color: 'var(--ink-950)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      fontSize: d * 0.38,
      overflow: 'hidden',
      flexShrink: 0
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function Badge({
  children,
  tone = 'neutral'
}) {
  const tones = {
    neutral: {
      background: 'var(--surface-2)',
      color: 'var(--fg-secondary)'
    },
    accent: {
      background: 'var(--surface-accent)',
      color: 'var(--fg-accent)'
    },
    success: {
      background: 'var(--surface-success)',
      color: 'var(--fg-success)'
    },
    warning: {
      background: 'var(--surface-warning)',
      color: 'var(--fg-warning)'
    },
    danger: {
      background: 'var(--surface-danger)',
      color: 'var(--fg-danger)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 10px',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-micro)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-micro)',
      textTransform: 'uppercase',
      ...tones[tone]
    }
  }, children);
}
function Tag({
  children,
  onRemove
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 8px 4px 12px',
      borderRadius: 'var(--radius-xs)',
      background: 'var(--surface-2)',
      border: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-caption)',
      color: 'var(--fg-primary)'
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'var(--fg-tertiary)',
      display: 'flex',
      padding: 0,
      fontSize: '14px',
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Badge, Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  iconLeft = null,
  iconRight = null,
  children,
  onClick,
  type = 'button',
  style
}) {
  const sizes = {
    sm: {
      padding: '8px 14px',
      fontSize: 'var(--text-caption)',
      gap: '6px',
      radius: 'var(--radius-sm)'
    },
    md: {
      padding: '11px 20px',
      fontSize: 'var(--text-button)',
      gap: '8px',
      radius: 'var(--radius-sm)'
    },
    lg: {
      padding: '15px 28px',
      fontSize: '17px',
      gap: '10px',
      radius: 'var(--radius-md)'
    }
  };
  const variants = {
    primary: {
      background: 'var(--ink-950)',
      color: 'var(--stone-25)',
      border: '1px solid var(--ink-950)'
    },
    secondary: {
      background: 'var(--surface-1)',
      color: 'var(--fg-primary)',
      border: '1px solid var(--border-default)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--fg-primary)',
      border: '1px solid transparent'
    },
    tertiary: {
      background: 'var(--surface-2)',
      color: 'var(--fg-primary)',
      border: '1px solid transparent'
    },
    danger: {
      background: 'var(--brick-500)',
      color: '#fff',
      border: '1px solid var(--brick-500)'
    },
    accent: {
      background: 'var(--gradient-ember-solid)',
      color: '#fff',
      border: '1px solid transparent'
    }
  };
  const s = sizes[size];
  const v = variants[variant];
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    onClick: onClick,
    disabled: disabled,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      padding: s.padding,
      fontFamily: 'var(--font-sans)',
      fontSize: s.fontSize,
      fontWeight: 'var(--weight-medium)',
      borderRadius: s.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      transition: `all var(--duration-fast) var(--ease-standard)`,
      ...v,
      ...style
    },
    onMouseEnter: e => {
      if (disabled) return;
      if (variant === 'primary') e.currentTarget.style.background = 'var(--stone-800)';else if (variant === 'secondary') e.currentTarget.style.background = 'var(--surface-2)';else if (variant === 'ghost' || variant === 'tertiary') e.currentTarget.style.background = 'var(--surface-3)';else if (variant === 'danger') e.currentTarget.style.background = 'var(--brick-700)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = v.background;
    }
  }, iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  children,
  padding = 'lg',
  elevated = false,
  style,
  ...rest
}) {
  const paddings = {
    md: 'var(--space-component-md)',
    lg: 'var(--space-component-lg)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: paddings[padding],
      boxShadow: elevated ? 'var(--shadow-md)' : 'none',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  icon,
  size = 'md',
  variant = 'ghost',
  label,
  disabled = false,
  onClick
}) {
  const dims = {
    sm: 32,
    md: 40,
    lg: 48
  };
  const d = dims[size];
  const variants = {
    ghost: {
      background: 'transparent',
      color: 'var(--fg-primary)'
    },
    filled: {
      background: 'var(--surface-2)',
      color: 'var(--fg-primary)'
    },
    inverse: {
      background: 'var(--ink-950)',
      color: 'var(--stone-25)'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": label,
    title: label,
    onClick: onClick,
    disabled: disabled,
    style: {
      width: d,
      height: d,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-sm)',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      transition: 'background var(--duration-fast) var(--ease-standard)',
      ...variants[variant]
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.background = 'var(--surface-3)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = variants[variant].background;
    }
  }, icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function Alert({
  tone = 'neutral',
  title,
  children,
  onClose
}) {
  const tones = {
    neutral: {
      bg: 'var(--surface-2)',
      fg: 'var(--fg-primary)',
      border: 'var(--border-subtle)'
    },
    accent: {
      bg: 'var(--surface-accent)',
      fg: 'var(--fg-accent)',
      border: 'var(--ember-200)'
    },
    success: {
      bg: 'var(--surface-success)',
      fg: 'var(--fg-success)',
      border: 'var(--sage-100)'
    },
    warning: {
      bg: 'var(--surface-warning)',
      fg: 'var(--fg-warning)',
      border: 'var(--gold-100)'
    },
    danger: {
      bg: 'var(--surface-danger)',
      fg: 'var(--fg-danger)',
      border: 'var(--brick-100)'
    }
  };
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      background: t.bg,
      border: `1px solid ${t.border}`,
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--text-body)',
      color: t.fg,
      marginBottom: children ? 4 : 0
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--fg-secondary)'
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'var(--fg-tertiary)',
      fontSize: 16,
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  onClose,
  footer
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--overlay-scrim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-6)',
      width: 440,
      maxWidth: '90vw',
      boxShadow: 'var(--shadow-xl)',
      fontFamily: 'var(--font-sans)'
    },
    onClick: e => e.stopPropagation()
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "t-title-1",
    style: {
      marginBottom: 12,
      color: 'var(--fg-primary)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "t-body",
    style: {
      color: 'var(--fg-secondary)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8,
      marginTop: 24
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Drawer.jsx
try { (() => {
function Drawer({
  open,
  title,
  children,
  onClose,
  side = 'right'
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--overlay-scrim)',
      zIndex: 1000
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      [side]: 0,
      height: '100%',
      width: 380,
      background: 'var(--surface-1)',
      padding: 'var(--space-6)',
      boxShadow: 'var(--shadow-xl)',
      fontFamily: 'var(--font-sans)'
    },
    onClick: e => e.stopPropagation()
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "t-title-1",
    style: {
      marginBottom: 16
    }
  }, title), children));
}
Object.assign(__ds_scope, { Drawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Drawer.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Loader.jsx
try { (() => {
function Loader({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    style: {
      animation: 'theos-spin 0.8s linear infinite'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "var(--border-subtle)",
    strokeWidth: "2.5",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2a10 10 0 0 1 10 10",
    stroke: "var(--fg-accent)",
    strokeWidth: "2.5",
    fill: "none",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("style", null, `@keyframes theos-spin { to { transform: rotate(360deg); } }`));
}
Object.assign(__ds_scope, { Loader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Loader.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Progress.jsx
try { (() => {
function Progress({
  value = 0,
  tone = 'accent'
}) {
  const colors = {
    accent: 'var(--fg-accent)',
    success: 'var(--sage-500)',
    neutral: 'var(--ink-950)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-3)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${Math.min(100, Math.max(0, value))}%`,
      background: colors[tone],
      borderRadius: 'var(--radius-full)',
      transition: 'width var(--duration-slow) var(--ease-emphasized)'
    }
  }));
}
Object.assign(__ds_scope, { Progress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Progress.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Skeleton.jsx
try { (() => {
function Skeleton({
  width = '100%',
  height = 16,
  radius = 'var(--radius-xs)'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: radius,
      background: 'linear-gradient(90deg, var(--stone-100) 25%, var(--stone-200) 37%, var(--stone-100) 63%)',
      backgroundSize: '400% 100%',
      animation: 'theos-shimmer 1.6s ease-in-out infinite'
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes theos-shimmer { 0% { background-position: 100% 0; } 100% { background-position: 0 0; } }`));
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  tone = 'neutral',
  message,
  onClose
}) {
  const dot = {
    neutral: 'var(--stone-500)',
    success: 'var(--sage-500)',
    warning: 'var(--gold-500)',
    danger: 'var(--brick-500)',
    accent: 'var(--ember-500)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--ink-950)',
      color: 'var(--stone-25)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 16px',
      boxShadow: 'var(--shadow-lg)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-caption)',
      minWidth: 240
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 'var(--radius-full)',
      background: dot[tone],
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, message), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'var(--stone-400)',
      fontSize: 14
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  children
}) {
  const [show, setShow] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: '125%',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--ink-950)',
      color: 'var(--stone-25)',
      fontSize: 'var(--text-micro)',
      textTransform: 'none',
      letterSpacing: 0,
      fontWeight: 'var(--weight-regular)',
      padding: '6px 10px',
      borderRadius: 'var(--radius-xs)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-md)',
      pointerEvents: 'none',
      fontFamily: 'var(--font-sans)'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 'var(--radius-xs)',
      border: `1.5px solid ${checked ? 'var(--ink-950)' : 'var(--border-default)'}`,
      background: checked ? 'var(--ink-950)' : 'var(--surface-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all var(--duration-instant) var(--ease-standard)',
      flexShrink: 0
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "10",
    viewBox: "0 0 12 10",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 5L4.5 8.5L11 1.5",
    stroke: "var(--stone-25)",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body)',
      color: 'var(--fg-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  type = 'text',
  helpText,
  error,
  disabled = false,
  value,
  onChange,
  size = 'md'
}) {
  const heights = {
    sm: '36px',
    md: '44px'
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--fg-primary)'
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    disabled: disabled,
    value: value,
    onChange: onChange,
    style: {
      height: heights[size],
      padding: '0 14px',
      borderRadius: 'var(--radius-sm)',
      border: `1px solid ${error ? 'var(--brick-500)' : 'var(--border-default)'}`,
      background: disabled ? 'var(--surface-2)' : 'var(--surface-1)',
      color: 'var(--fg-primary)',
      fontSize: 'var(--text-body)',
      fontFamily: 'var(--font-sans)',
      outline: 'none',
      transition: 'border-color var(--duration-fast) var(--ease-standard)'
    },
    onFocus: e => {
      e.target.style.borderColor = 'var(--border-focus)';
    },
    onBlur: e => {
      e.target.style.borderColor = error ? 'var(--brick-500)' : 'var(--border-default)';
    }
  }), (helpText || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-micro)',
      textTransform: 'none',
      letterSpacing: 0,
      color: error ? 'var(--fg-danger)' : 'var(--fg-tertiary)'
    }
  }, error || helpText));
}
function Textarea({
  label,
  placeholder,
  rows = 4,
  helpText,
  disabled = false,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--fg-primary)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", {
    placeholder: placeholder,
    rows: rows,
    disabled: disabled,
    value: value,
    onChange: onChange,
    style: {
      padding: '12px 14px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-default)',
      background: disabled ? 'var(--surface-2)' : 'var(--surface-1)',
      color: 'var(--fg-primary)',
      fontSize: 'var(--text-body)',
      fontFamily: 'var(--font-sans)',
      resize: 'vertical',
      outline: 'none'
    }
  }), helpText && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-micro)',
      textTransform: 'none',
      letterSpacing: 0,
      color: 'var(--fg-tertiary)'
    }
  }, helpText));
}
Object.assign(__ds_scope, { Input, Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  checked,
  onChange,
  name,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 'var(--radius-full)',
      border: `1.5px solid ${checked ? 'var(--ink-950)' : 'var(--border-default)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 'var(--radius-full)',
      background: 'var(--ink-950)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body)',
      color: 'var(--fg-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select…'
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--fg-primary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: onChange,
    style: {
      width: '100%',
      height: 44,
      padding: '0 36px 0 14px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-default)',
      background: 'var(--surface-1)',
      color: 'var(--fg-primary)',
      fontSize: 'var(--text-body)',
      fontFamily: 'var(--font-sans)',
      appearance: 'none',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "8",
    viewBox: "0 0 12 8",
    fill: "none",
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1L6 6L11 1",
    stroke: "var(--fg-tertiary)",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  disabled = false,
  label
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 24,
      borderRadius: 'var(--radius-full)',
      background: checked ? 'var(--ink-950)' : 'var(--stone-300)',
      position: 'relative',
      flexShrink: 0,
      transition: 'background var(--duration-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 19 : 3,
      width: 18,
      height: 18,
      borderRadius: 'var(--radius-full)',
      background: '#fff',
      boxShadow: 'var(--shadow-xs)',
      transition: 'left var(--duration-fast) var(--ease-standard)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body)',
      color: 'var(--fg-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-sans)'
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.value,
    onClick: () => onChange(t.value),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '10px 16px',
      fontSize: 'var(--text-body)',
      fontWeight: 'var(--weight-medium)',
      color: active === t.value ? 'var(--fg-primary)' : 'var(--fg-tertiary)',
      borderBottom: `2px solid ${active === t.value ? 'var(--ink-950)' : 'transparent'}`,
      marginBottom: -1,
      transition: 'color var(--duration-fast) var(--ease-standard)'
    }
  }, t.label)));
}
function Breadcrumb({
  items = []
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-caption)'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-disabled)'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: i === items.length - 1 ? 'var(--fg-primary)' : 'var(--fg-tertiary)',
      fontWeight: i === items.length - 1 ? 'var(--weight-medium)' : 'var(--weight-regular)'
    }
  }, it))));
}
Object.assign(__ds_scope, { Tabs, Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/AboutContactPages.jsx
try { (() => {
function AboutPage() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '120px 80px 160px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-micro",
    style: {
      color: 'var(--fg-accent)',
      marginBottom: 24
    }
  }, "About"), /*#__PURE__*/React.createElement("h1", {
    className: "t-display-2",
    style: {
      color: 'var(--fg-primary)',
      maxWidth: 760,
      marginBottom: 40
    }
  }, "Design judgment. AI execution."), /*#__PURE__*/React.createElement("p", {
    className: "t-heading-3",
    style: {
      color: 'var(--fg-secondary)',
      maxWidth: 640,
      fontWeight: 400,
      marginBottom: 96
    }
  }, "Theos is a small studio of designers and engineers who believe the best products come from combining human taste with machine speed."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24,
      marginBottom: 96
    }
  }, [{
    n: '12',
    l: 'Designers & engineers'
  }, {
    n: '60+',
    l: 'Products shipped'
  }, {
    n: '2019',
    l: 'Founded'
  }].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.l,
    style: {
      borderTop: '1px solid var(--border-strong)',
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-heading-1",
    style: {
      color: 'var(--fg-primary)'
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    className: "t-caption",
    style: {
      color: 'var(--fg-tertiary)',
      marginTop: 8
    }
  }, s.l)))));
}
function ContactPage() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: '0 auto',
      padding: '120px 80px 160px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-micro",
    style: {
      color: 'var(--fg-accent)',
      marginBottom: 24
    }
  }, "Start a project"), /*#__PURE__*/React.createElement("h1", {
    className: "t-heading-1",
    style: {
      color: 'var(--fg-primary)',
      marginBottom: 48
    }
  }, "Tell us about your product."), /*#__PURE__*/React.createElement("form", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    },
    onSubmit: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "t-caption",
    style: {
      display: 'block',
      marginBottom: 6,
      fontWeight: 500,
      color: 'var(--fg-primary)'
    }
  }, "Name"), /*#__PURE__*/React.createElement("input", {
    style: {
      width: '100%',
      height: 44,
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-default)',
      padding: '0 14px',
      fontSize: 'var(--text-body)',
      fontFamily: 'var(--font-sans)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "t-caption",
    style: {
      display: 'block',
      marginBottom: 6,
      fontWeight: 500,
      color: 'var(--fg-primary)'
    }
  }, "Work email"), /*#__PURE__*/React.createElement("input", {
    style: {
      width: '100%',
      height: 44,
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-default)',
      padding: '0 14px',
      fontSize: 'var(--text-body)',
      fontFamily: 'var(--font-sans)'
    }
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "t-caption",
    style: {
      display: 'block',
      marginBottom: 6,
      fontWeight: 500,
      color: 'var(--fg-primary)'
    }
  }, "Project brief"), /*#__PURE__*/React.createElement("textarea", {
    rows: 5,
    style: {
      width: '100%',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-default)',
      padding: '12px 14px',
      fontSize: 'var(--text-body)',
      fontFamily: 'var(--font-sans)',
      resize: 'vertical'
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      alignSelf: 'flex-start',
      background: 'var(--ink-950)',
      color: 'var(--stone-25)',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      padding: '13px 28px',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-button)',
      fontWeight: 'var(--weight-medium)',
      cursor: 'pointer'
    }
  }, "Send")));
}
window.AboutPage = AboutPage;
window.ContactPage = ContactPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/AboutContactPages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Chrome.jsx
try { (() => {
function SiteHeader({
  page,
  onNavigate
}) {
  const links = [{
    key: 'work',
    label: 'Work'
  }, {
    key: 'services',
    label: 'Services'
  }, {
    key: 'about',
    label: 'About'
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '24px 80px',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(var(--blur-md))',
      WebkitBackdropFilter: 'blur(var(--blur-md))',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate('home');
    },
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/theos-lockup-black.svg",
    alt: "Theos",
    style: {
      height: 22
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 40
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.key,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate(l.key);
    },
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-body)',
      fontWeight: 'var(--weight-medium)',
      color: page === l.key ? 'var(--fg-primary)' : 'var(--fg-tertiary)',
      textDecoration: 'none'
    }
  }, l.label))), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('contact'),
    style: {
      background: 'var(--ink-950)',
      color: 'var(--stone-25)',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      padding: '11px 22px',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-button)',
      fontWeight: 'var(--weight-medium)',
      cursor: 'pointer'
    }
  }, "Start a project"));
}
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: '64px 80px 48px',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/theos-mark.svg",
    alt: "",
    style: {
      width: 28,
      height: 28,
      borderRadius: 6,
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-caption)',
      color: 'var(--fg-tertiary)'
    }
  }, "\xA9 2026 Theos. AI-first design studio.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 48
    }
  }, ['UX Design', 'Branding', 'AI Solutions', 'Contact'].map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-caption)',
      color: 'var(--fg-secondary)',
      textDecoration: 'none'
    }
  }, l))));
}
window.SiteHeader = SiteHeader;
window.SiteFooter = SiteFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/HomePage.jsx
try { (() => {
const services = [{
  name: 'UX Design',
  desc: 'Research-led product experiences that hold up at scale.'
}, {
  name: 'UI Design',
  desc: 'Interfaces engineered pixel by pixel, not assembled from templates.'
}, {
  name: 'Product Design',
  desc: 'From zero to one — strategy, design, and shipped product.'
}, {
  name: 'Branding',
  desc: 'Identity systems built to last a decade, not a trend cycle.'
}, {
  name: 'Web Development',
  desc: 'Production-grade builds that match the design exactly.'
}, {
  name: 'Mobile Apps',
  desc: 'Native-feeling iOS and Android product experiences.'
}, {
  name: 'AI Solutions',
  desc: 'Agentic workflows and AI-native product features.'
}, {
  name: 'Product Strategy',
  desc: 'The roadmap decisions that make design decisions easy.'
}];
const work = [{
  client: 'Nordhouse',
  category: 'Branding + Web',
  year: '2026'
}, {
  client: 'Arcform',
  category: 'Product Design',
  year: '2025'
}, {
  client: 'Veyra',
  category: 'AI Solutions',
  year: '2025'
}, {
  client: 'Kiln Studio',
  category: 'UI Design',
  year: '2024'
}];
function HomePage() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '160px 80px 120px',
      maxWidth: 1280,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-micro",
    style: {
      color: 'var(--fg-accent)',
      marginBottom: 24
    }
  }, "AI-first design studio"), /*#__PURE__*/React.createElement("h1", {
    className: "t-display-1",
    style: {
      color: 'var(--fg-primary)',
      maxWidth: 900
    }
  }, "Design with ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-accent)'
    }
  }, "intelligence.")), /*#__PURE__*/React.createElement("p", {
    className: "t-heading-3",
    style: {
      color: 'var(--fg-secondary)',
      marginTop: 32,
      maxWidth: 620,
      fontWeight: 400
    }
  }, "We pair design judgment with AI execution \u2014 so the work that used to take weeks takes days.")), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 80px 120px',
      maxWidth: 1280,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-micro",
    style: {
      color: 'var(--fg-tertiary)',
      marginBottom: 32
    }
  }, "Services"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 1,
      background: 'var(--border-subtle)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, services.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    style: {
      background: 'var(--surface-1)',
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      minHeight: 180
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-title-2",
    style: {
      color: 'var(--fg-primary)'
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    className: "t-caption",
    style: {
      color: 'var(--fg-secondary)'
    }
  }, s.desc))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 80px 120px',
      maxWidth: 1280,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-micro",
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, "Selected work"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-caption)',
      color: 'var(--fg-link)'
    }
  }, "View all work \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, work.map(w => /*#__PURE__*/React.createElement("div", {
    key: w.client,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '28px 0',
      borderBottom: '1px solid var(--border-subtle)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-heading-3",
    style: {
      color: 'var(--fg-primary)',
      fontWeight: 500
    }
  }, w.client), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 40,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-body",
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, w.category), /*#__PURE__*/React.createElement("span", {
    className: "t-body",
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, w.year)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 80px 160px',
      maxWidth: 1280,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--gradient-ember-wash)',
      borderRadius: 'var(--radius-2xl)',
      padding: '96px 80px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "t-heading-1",
    style: {
      color: 'var(--fg-primary)',
      marginBottom: 32
    }
  }, "Let's build something intelligent."), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'var(--ink-950)',
      color: 'var(--stone-25)',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      padding: '15px 32px',
      fontFamily: 'var(--font-sans)',
      fontSize: '17px',
      fontWeight: 'var(--weight-medium)',
      cursor: 'pointer'
    }
  }, "Start a project"))));
}
window.HomePage = HomePage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/ServicesPage.jsx
try { (() => {
const services = [{
  name: 'UX Design',
  desc: 'Research, information architecture, and interaction design for complex products.'
}, {
  name: 'UI Design',
  desc: 'Interface systems — components, states, and specs engineered for handoff.'
}, {
  name: 'Product Design',
  desc: 'End-to-end ownership from problem definition to shipped feature.'
}, {
  name: 'Branding',
  desc: 'Identity, voice, and visual systems built for a decade of use.'
}, {
  name: 'Web Development',
  desc: 'Front-end builds that match the design file exactly, pixel for pixel.'
}, {
  name: 'Mobile Apps',
  desc: 'iOS and Android product design and native-feeling builds.'
}, {
  name: 'AI Solutions',
  desc: 'Agentic workflows, AI-native features, and model-integrated product design.'
}, {
  name: 'Product Strategy',
  desc: 'Roadmapping and prioritization grounded in what users actually need.'
}];
function ServicesPage() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '120px 80px 160px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-micro",
    style: {
      color: 'var(--fg-accent)',
      marginBottom: 24
    }
  }, "Services"), /*#__PURE__*/React.createElement("h1", {
    className: "t-display-2",
    style: {
      color: 'var(--fg-primary)',
      maxWidth: 760,
      marginBottom: 80
    }
  }, "Full-stack design, engineered end to end."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, services.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    style: {
      display: 'grid',
      gridTemplateColumns: '80px 1fr 1fr',
      gap: 40,
      padding: '40px 0',
      borderBottom: '1px solid var(--border-subtle)',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-caption",
    style: {
      color: 'var(--fg-disabled)',
      fontFamily: 'var(--font-mono)'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    className: "t-heading-3",
    style: {
      color: 'var(--fg-primary)',
      fontWeight: 500
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    className: "t-body",
    style: {
      color: 'var(--fg-secondary)'
    }
  }, s.desc)))));
}
window.ServicesPage = ServicesPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/ServicesPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/WorkPage.jsx
try { (() => {
const work = [{
  client: 'Nordhouse',
  category: 'Branding + Web',
  year: '2026'
}, {
  client: 'Arcform',
  category: 'Product Design',
  year: '2025'
}, {
  client: 'Veyra',
  category: 'AI Solutions',
  year: '2025'
}, {
  client: 'Kiln Studio',
  category: 'UI Design',
  year: '2024'
}, {
  client: 'Palisade',
  category: 'Product Strategy',
  year: '2024'
}, {
  client: 'Fielding & Co.',
  category: 'Branding',
  year: '2023'
}];
function WorkPage() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '120px 80px 160px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-micro",
    style: {
      color: 'var(--fg-accent)',
      marginBottom: 24
    }
  }, "Work"), /*#__PURE__*/React.createElement("h1", {
    className: "t-display-2",
    style: {
      color: 'var(--fg-primary)',
      maxWidth: 760,
      marginBottom: 80
    }
  }, "Selected client work."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 24
    }
  }, work.map(w => /*#__PURE__*/React.createElement("div", {
    key: w.client,
    style: {
      background: 'var(--gradient-stone)',
      borderRadius: 'var(--radius-xl)',
      aspectRatio: '4/3',
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      border: '1px solid var(--border-subtle)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-title-1",
    style: {
      color: 'var(--fg-primary)',
      marginBottom: 8
    }
  }, w.client), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-caption",
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, w.category), /*#__PURE__*/React.createElement("span", {
    className: "t-caption",
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, w.year))))));
}
window.WorkPage = WorkPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/WorkPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio-app/ChatView.jsx
try { (() => {
function ChatView() {
  const {
    AIMessage,
    AIComposer,
    ThinkingIndicator
  } = window.TheosDesignSystem_e121a9;
  const [value, setValue] = React.useState('');
  const [messages, setMessages] = React.useState([{
    role: 'user',
    text: 'Redesign the Nordhouse pricing page to feel more premium.'
  }, {
    role: 'assistant',
    text: 'I reviewed the current layout and your brand tokens. Here are three directions — I lean toward the second: more whitespace, a single accent color, and a simplified plan comparison.'
  }, {
    role: 'user',
    text: 'Go with the second, but tighten the headline.'
  }]);
  const [thinking, setThinking] = React.useState(false);
  function send() {
    if (!value.trim()) return;
    setMessages(m => [...m, {
      role: 'user',
      text: value
    }]);
    setValue('');
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages(m => [...m, {
        role: 'assistant',
        text: 'Updated — the headline is now one line and the CTA moved above the fold.'
      }]);
    }, 1400);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      padding: '18px 32px',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t-title-2",
    style: {
      color: 'var(--fg-primary)'
    }
  }, "Nordhouse rebrand"), /*#__PURE__*/React.createElement("div", {
    className: "t-caption",
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, "Chat with Theos AI"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, messages.map((m, i) => /*#__PURE__*/React.createElement(AIMessage, {
    key: i,
    role: m.role
  }, m.text)), thinking && /*#__PURE__*/React.createElement(ThinkingIndicator, {
    label: "Updating design"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 32px 28px'
    }
  }, /*#__PURE__*/React.createElement(AIComposer, {
    value: value,
    onChange: e => setValue(e.target.value),
    onSubmit: send,
    placeholder: "Ask Theos to change anything\u2026"
  })));
}
window.ChatView = ChatView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio-app/ChatView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio-app/LoginScreen.jsx
try { (() => {
function LoginScreen({
  onLogin
}) {
  const {
    Button,
    Input
  } = window.TheosDesignSystem_e121a9;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--gradient-ember-wash)',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 380,
      background: 'var(--surface-1)',
      borderRadius: 'var(--radius-xl)',
      padding: 40,
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/theos-lockup-black.svg",
    alt: "Theos",
    style: {
      height: 20,
      marginBottom: 32
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "t-heading-3",
    style: {
      color: 'var(--fg-primary)',
      marginBottom: 8
    }
  }, "Welcome back"), /*#__PURE__*/React.createElement("div", {
    className: "t-caption",
    style: {
      color: 'var(--fg-tertiary)',
      marginBottom: 28
    }
  }, "Sign in to Theos Studio"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Work email",
    placeholder: "you@company.com"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onLogin,
    style: {
      width: '100%'
    }
  }, "Sign in")));
}
window.LoginScreen = LoginScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio-app/LoginScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio-app/SettingsView.jsx
try { (() => {
function SettingsView() {
  const {
    Switch,
    Select,
    Button
  } = window.TheosDesignSystem_e121a9;
  const [dark, setDark] = React.useState(false);
  const [notify, setNotify] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: '100%',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      padding: '18px 32px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-title-2",
    style: {
      color: 'var(--fg-primary)'
    }
  }, "Settings")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      maxWidth: 480,
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t-body",
    style: {
      color: 'var(--fg-primary)',
      fontWeight: 500
    }
  }, "Dark mode"), /*#__PURE__*/React.createElement("div", {
    className: "t-caption",
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, "Switch the workspace to dark surfaces")), /*#__PURE__*/React.createElement(Switch, {
    checked: dark,
    onChange: () => setDark(!dark)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t-body",
    style: {
      color: 'var(--fg-primary)',
      fontWeight: 500
    }
  }, "Agent notifications"), /*#__PURE__*/React.createElement("div", {
    className: "t-caption",
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, "Notify when a workflow finishes")), /*#__PURE__*/React.createElement(Switch, {
    checked: notify,
    onChange: () => setNotify(!notify)
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Select, {
    label: "Default model",
    options: [{
      value: 'fast',
      label: 'Theos Fast'
    }, {
      value: 'pro',
      label: 'Theos Pro'
    }],
    placeholder: "Select\u2026"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Sign out"))));
}
window.SettingsView = SettingsView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio-app/SettingsView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio-app/Sidebar.jsx
try { (() => {
const projects = [{
  name: 'Nordhouse rebrand',
  active: true
}, {
  name: 'Arcform onboarding'
}, {
  name: 'Veyra agent workflows'
}, {
  name: 'Kiln Studio site'
}];
function Sidebar({
  view,
  onNavigate
}) {
  const items = [{
    key: 'chat',
    label: 'Chat'
  }, {
    key: 'workflow',
    label: 'Agents'
  }, {
    key: 'settings',
    label: 'Settings'
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 260,
      flexShrink: 0,
      height: '100%',
      background: 'var(--surface-2)',
      borderRight: '1px solid var(--border-subtle)',
      padding: '20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 8px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/theos-mark.svg",
    alt: "",
    style: {
      width: 20,
      height: 20,
      borderRadius: 4
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--fg-primary)'
    }
  }, "Theos Studio")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.key,
    onClick: () => onNavigate(it.key),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textAlign: 'left',
      padding: '9px 10px',
      borderRadius: 'var(--radius-sm)',
      border: 'none',
      cursor: 'pointer',
      background: view === it.key ? 'var(--surface-1)' : 'transparent',
      boxShadow: view === it.key ? 'var(--shadow-xs)' : 'none',
      color: view === it.key ? 'var(--fg-primary)' : 'var(--fg-secondary)',
      fontSize: 'var(--text-body)',
      fontWeight: 'var(--weight-medium)'
    }
  }, it.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-micro",
    style: {
      color: 'var(--fg-tertiary)',
      padding: '0 10px',
      marginBottom: 4
    }
  }, "Projects"), projects.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      padding: '8px 10px',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      background: p.active ? 'var(--surface-1)' : 'transparent',
      fontSize: 'var(--text-caption)',
      color: p.active ? 'var(--fg-primary)' : 'var(--fg-secondary)'
    }
  }, p.name))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: 'var(--stone-300)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--ink-950)'
    }
  }, "MO"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-caption)',
      color: 'var(--fg-secondary)'
    }
  }, "Mira Osei")));
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio-app/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio-app/WorkflowView.jsx
try { (() => {
function WorkflowView() {
  const {
    AgentCard,
    Badge
  } = window.TheosDesignSystem_e121a9;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: '100%',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      padding: '18px 32px',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t-title-2",
    style: {
      color: 'var(--fg-primary)'
    }
  }, "Agent workflow"), /*#__PURE__*/React.createElement("div", {
    className: "t-caption",
    style: {
      color: 'var(--fg-tertiary)'
    }
  }, "Veyra \u2014 homepage rewrite")), /*#__PURE__*/React.createElement(Badge, {
    tone: "accent"
  }, "3 agents running")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(AgentCard, {
    name: "Researcher",
    task: "Reading competitor sites and pulling positioning notes",
    status: "done"
  }), /*#__PURE__*/React.createElement(AgentCard, {
    name: "Copywriter",
    task: "Drafting hero copy \u2014 3 variants",
    status: "running",
    progress: 65
  }), /*#__PURE__*/React.createElement(AgentCard, {
    name: "Designer",
    task: "Waiting on final copy before layout",
    status: "queued"
  }), /*#__PURE__*/React.createElement(AgentCard, {
    name: "Reviewer",
    task: "Checking against brand tokens",
    status: "queued"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-title-2",
    style: {
      color: 'var(--fg-primary)',
      marginBottom: 16
    }
  }, "Memory"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Brand voice: declarative, no hype, sentence case.', 'Primary accent used once per view — ember-500.', 'Client prefers shorter headlines over descriptive ones.'].map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: 'var(--fg-accent)',
      marginTop: 7,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "t-caption",
    style: {
      color: 'var(--fg-secondary)'
    }
  }, m)))))));
}
window.WorkflowView = WorkflowView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio-app/WorkflowView.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AIComposer = __ds_scope.AIComposer;

__ds_ns.AIMessage = __ds_scope.AIMessage;

__ds_ns.AgentCard = __ds_scope.AgentCard;

__ds_ns.StreamingText = __ds_scope.StreamingText;

__ds_ns.ThinkingIndicator = __ds_scope.ThinkingIndicator;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Drawer = __ds_scope.Drawer;

__ds_ns.Loader = __ds_scope.Loader;

__ds_ns.Progress = __ds_scope.Progress;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

})();
