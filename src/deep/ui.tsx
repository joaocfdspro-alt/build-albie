/* eslint-disable react-refresh/only-export-components -- shared primitives and localization helper form one UI kit */
import { useEffect, useRef, type ReactNode } from "react";
import { LANGS, type DeepLang } from "./i18n";
import { useDeep } from "./store";
import type { Localized } from "./data";

export const loc = (value: Localized, lang: DeepLang) => value[lang];

/* ---------------- Lockup ---------------- */
export const Lockup = ({
  light = false,
  small = false,
  full = false,
  as = "div",
  onClick,
  label,
}: {
  light?: boolean;
  small?: boolean;
  full?: boolean;
  as?: "div" | "button";
  onClick?: () => void;
  label?: string;
}) => {
  const content = (
    <>
      <span className="deep-lockup__mark">DIP</span>
      <span className="deep-lockup__sub">Côte d’Ivoire</span>
      {full && <span className="deep-lockup__tagline">Destination<br />Intelligence Platform</span>}
    </>
  );
  const cls = `deep-lockup${light ? " deep-lockup--light" : ""}${small ? " deep-lockup--sm" : ""}${full ? " deep-lockup--full" : ""}`;
  if (as === "button") {
    return (
      <button
        type="button"
        className={cls}
        onClick={onClick}
        aria-label={label ?? "DIP"}
        style={{ background: "none", border: 0, cursor: "pointer", padding: 0 }}
      >
        {content}
      </button>
    );
  }
  return <div className={cls}>{content}</div>;
};

/* ---------------- Language switcher ---------------- */
export const LangSwitcher = ({ light = false }: { light?: boolean }) => {
  const { lang, setLang } = useDeep();
  const flags: Record<DeepLang, string> = { pt: "🇧🇷", en: "🇺🇸", fr: "🇫🇷" };
  return (
    <div
      className={`deep-lang${light ? " deep-lang--light" : ""}`}
      role="group"
      aria-label="Language / Idioma / Langue"
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          className="deep-lang__btn"
          aria-pressed={lang === l.code}
          aria-label={l.label}
          title={l.label}
          onClick={() => setLang(l.code)}
        >
          <span className="deep-lang__flag" aria-hidden="true">
            {flags[l.code]}
          </span>
          <span className="deep-lang__short" aria-hidden="true">
            {l.short}
          </span>
        </button>
      ))}
    </div>
  );
};

/* ---------------- Chips ---------------- */
export const ChipGroup = <T extends string>({
  options,
  value,
  onChange,
  multiple = false,
  label,
}: {
  options: { id: T; label: string }[];
  value: T | T[];
  onChange: (next: T | T[]) => void;
  multiple?: boolean;
  label: string;
}) => {
  const selected = Array.isArray(value) ? value : [value];
  return (
    <div role="group" aria-label={label} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((o) => {
        const isOn = selected.includes(o.id);
        return (
          <button
            key={o.id}
            type="button"
            className="deep-chip"
            aria-pressed={isOn}
            onClick={() => {
              if (multiple) {
                const arr = selected as T[];
                onChange(isOn ? arr.filter((x) => x !== o.id) : [...arr, o.id]);
              } else {
                onChange(o.id);
              }
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
};

/* ---------------- Modal ---------------- */
export const Modal = ({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="deep-overlay" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="deep-modal" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref}>
        <div className="deep-row" style={{ justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
          <h2 className="deep-h3">{title}</h2>
          <button type="button" className="deep-iconbtn" onClick={onClose} aria-label="Fechar / Close">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

/* ---------------- Misc ---------------- */
export const DemoFlag = ({ children }: { children: ReactNode }) => (
  <span className="deep-demoflag">
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v4h1" />
    </svg>
    {children}
  </span>
);

export const Section = ({
  title,
  action,
  children,
  id,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  id?: string;
}) => (
  <section className="deep-section" id={id}>
    {(title || action) && (
      <div className="deep-section__head">
        {title ? <h2 className="deep-h2">{title}</h2> : <span />}
        {action}
      </div>
    )}
    {children}
  </section>
);

export const Icon = ({ name, size = 20 }: { name: string; size?: number }) => {
  const paths: Record<string, ReactNode> = {
    mic: (
      <>
        <rect x="9" y="3" width="6" height="12" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
      </>
    ),
    chat: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    ),
    map: (
      <>
        <path d="M9 20 3 17V4l6 3 6-3 6 3v13l-6-3-6 3z" />
        <path d="M9 7v13M15 4v13" />
      </>
    ),
    palm: (
      <>
        <path d="M12 22V9" />
        <path d="M12 9c0-3 3-5 6-4-2-2-5-2-6 0-1-2-4-2-6 0 3-1 6 1 6 4z" />
      </>
    ),
    handshake: (
      <>
        <path d="m11 17 2 2 4-4 3 3" />
        <path d="M3 12l4-4 4 3 3-3 4 4" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8h.01M11 12h1v5h1" />
      </>
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15 9-2 6-4 2 2-6z" />
      </>
    ),
    heart: (
      <>
        <path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21l8.8-8.3a5 5 0 0 0 0-7.1z" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 11h18" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    plane: (
      <>
        <path d="M2 12l20-7-7 20-3-8-8-5z" />
      </>
    ),
    check: (
      <>
        <path d="m5 13 4 4L19 7" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    back: (
      <>
        <path d="M19 12H5M11 18l-6-6 6-6" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </>
    ),
    signal: (
      <>
        <path d="M4 20v-4M10 20V10M16 20V6M22 20v-9" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
        <path d="M17 5.5a3.5 3.5 0 0 1 0 7M18 20a6.6 6.6 0 0 0-2-4.7" />
      </>
    ),
    megaphone: (
      <>
        <path d="M3 11v2a1 1 0 0 0 1 1h2l6 4V6L6 10H4a1 1 0 0 0-1 1z" />
        <path d="M17 8a5 5 0 0 1 0 8" />
      </>
    ),
    file: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7.5 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 13.9H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 7.5l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1.3z" />
      </>
    ),
    camera: (
      <>
        <path d="M3 8h3l2-3h8l2 3h3v12H3z" />
        <circle cx="12" cy="13" r="4" />
      </>
    ),
    life: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.6" />
      </>
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
      </>
    ),
    external: (
      <>
        <path d="M14 4h6v6" />
        <path d="M20 4 10 14" />
        <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
      </>
    ),
    send: (
      <>
        <path d="M22 2 11 13" />
        <path d="M22 2 15 22l-4-9-9-4z" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.info}
    </svg>
  );
};
