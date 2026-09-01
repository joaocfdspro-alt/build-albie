import { useCallback, useEffect, useMemo, useState } from "react";
import "./deep.css";
import { DICTS, translate, type DeepLang } from "./i18n";
import {
  DEFAULT_STATE,
  DeepContext,
  loadState,
  makeId,
  saveState,
  type DeepContextValue,
  type DeepEvent,
  type DeepProfile,
  type DeepState,
  type LocalFeedback,
  useDeep,
} from "./store";
import { Icon, LangSwitcher, Lockup } from "./ui";
import PublicApp from "./PublicApp";
import ExplorerApp from "./ExplorerApp";
import MinistryApp from "./MinistryApp";

type Perspective = "hub" | "public" | "explorer" | "ministry";

const Hub = ({ onOpen, onReset }: { onOpen: (p: Perspective) => void; onReset: () => void }) => {
  const { t } = useDeep();
  const cards: { id: Perspective; num: string; title: string; sub: string; desc: string; mod: string }[] = [
    {
      id: "public",
      num: "01",
      title: t("hub.public.title"),
      sub: t("hub.public.sub"),
      desc: t("hub.public.desc"),
      mod: "public",
    },
    {
      id: "explorer",
      num: "02",
      title: t("hub.explorer.title"),
      sub: t("hub.explorer.sub"),
      desc: t("hub.explorer.desc"),
      mod: "explorer",
    },
    {
      id: "ministry",
      num: "03",
      title: t("hub.ministry.title"),
      sub: t("hub.ministry.sub"),
      desc: t("hub.ministry.desc"),
      mod: "ministry",
    },
  ];
  return (
    <div className="deep-hub">
      <header className="deep-wrap deep-row" style={{ justifyContent: "space-between", paddingTop: 22, gap: 12 }}>
        <Lockup light full />
        <LangSwitcher light />
      </header>
      <div className="deep-wrap deep-hub__inner">
        <p className="deep-eyebrow" style={{ color: "rgba(255,255,255,.65)" }}>
          {t("hub.eyebrow")}
        </p>
        <h1 className="deep-h1 deep-serif" style={{ marginTop: 12, maxWidth: 720 }}>
          {t("hub.title")}
        </h1>
        <p className="deep-body" style={{ color: "rgba(255,255,255,.76)", marginTop: 14, maxWidth: 560, fontSize: 16 }}>
          {t("hub.lead")}
        </p>

        <div className="deep-hub__grid">
          {cards.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`deep-perspective deep-perspective--${c.mod}`}
              onClick={() => onOpen(c.id)}
            >
              <span className="deep-perspective__num">{c.num}</span>
              <span className="deep-perspective__title">{c.title}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#ffb98a" }}>{c.sub}</span>
              <span className="deep-perspective__desc">{c.desc}</span>
              <span className="deep-perspective__go">{t("hub.open")} →</span>
            </button>
          ))}
        </div>

        <div className="deep-row" style={{ gap: 12, marginTop: 28, flexWrap: "wrap" }}>
          <button type="button" className="deep-btn deep-btn--primary" onClick={() => onOpen("public")}>
            {t("hub.enter")} <Icon name="arrow" size={18} />
          </button>
          <span className="deep-small" style={{ color: "rgba(255,255,255,.7)" }}>
            {t("hub.sequence")}
          </span>
        </div>

        <div className="deep-row" style={{ gap: 12, marginTop: 26, flexWrap: "wrap" }}>
          <span className="deep-badge" style={{ background: "rgba(255,255,255,.14)", color: "#fff" }}>
            {t("hub.demo")}
          </span>
          <button
            type="button"
            className="deep-btn deep-btn--ghost deep-btn--sm"
            style={{ color: "#fff", borderColor: "rgba(255,255,255,.3)" }}
            onClick={onReset}
          >
            {t("common.clear")}
          </button>
        </div>
      </div>
      <footer className="deep-wrap" style={{ padding: "0 20px 26px" }}>
        <p style={{ fontSize: 11.5, color: "rgba(255,255,255,.5)" }}>
          DIP — Destination Intelligence Platform · {t("brand.tagline")}
        </p>
      </footer>
    </div>
  );
};

const DeepApp = () => {
  const [state, setState] = useState<DeepState>(() => loadState());
  const [perspective, setPerspective] = useState<Perspective>("hub");
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    document.documentElement.lang = state.lang === "pt" ? "pt-BR" : state.lang === "fr" ? "fr-FR" : "en-US";
  }, [state.lang]);

  useEffect(() => {
    if (perspective === "hub") document.title = "DIP | Destination Intelligence Platform";
  }, [perspective]);

  const toast = useCallback((message: string) => {
    const id = makeId();
    setToasts((prev) => [...prev, { id, message }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3800);
  }, []);

  const pushEvent = useCallback((e: Omit<DeepEvent, "id" | "at">) => {
    setState((prev) => ({ ...prev, events: [...prev.events, { ...e, id: makeId(), at: Date.now() }].slice(-80) }));
  }, []);

  const value = useMemo<DeepContextValue>(() => {
    const lang = state.lang;
    return {
      state,
      lang,
      t: (key: string) => translate(lang, key),
      setLang: (next: DeepLang) =>
        setState((prev) => ({ ...prev, lang: next, languageWasChosen: true })),
      setProfile: (patch: Partial<DeepProfile>) =>
        setState((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } })),
      setJourney: (ids: string[]) => setState((prev) => ({ ...prev, journeyIds: ids })),
      toggleSaved: (id: string) =>
        setState((prev) => ({
          ...prev,
          savedIds: prev.savedIds.includes(id) ? prev.savedIds.filter((x) => x !== id) : [...prev.savedIds, id],
        })),
      addToItinerary: (id: string, label: string) => {
        setState((prev) => (prev.addedIds.includes(id) ? prev : { ...prev, addedIds: [...prev.addedIds, id] }));
        pushEvent({ name: "experience_added", source: "public", label: `Experience added · ${label}`, meta: { id } });
        toast(lang === "pt" ? "Experiência adicionada → Ministry" : lang === "fr" ? "Expérience ajoutée → Ministry" : "Experience added → Ministry");
      },
      toggleChecklist: (id: string) =>
        setState((prev) => ({
          ...prev,
          checklist: prev.checklist.includes(id) ? prev.checklist.filter((x) => x !== id) : [...prev.checklist, id],
        })),
      confirmIntent: () => {
        setState((prev) => ({ ...prev, intentConfirmed: true }));
        pushEvent({ name: "travel_intent_confirmed", source: "public", label: "travel_intent_confirmed" });
      },
      addCheckin: (id: string) => {
        setState((prev) =>
          prev.explorerCheckins.includes(id) ? prev : { ...prev, explorerCheckins: [...prev.explorerCheckins, id] },
        );
        pushEvent({ name: "explorer_checkin", source: "explorer", label: `Explorer check-in · ${id}` });
      },
      pushEvent,
      addFeedback: (f: Omit<LocalFeedback, "id" | "date" | "local">) =>
        setState((prev) => ({
          ...prev,
          feedback: [
            {
              ...f,
              id: makeId(),
              date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
              local: true,
            },
            ...prev.feedback,
          ],
        })),
      resetDemo: () =>
        setState({ ...DEFAULT_STATE, lang, languageWasChosen: state.languageWasChosen }),
      toast,
    };
  }, [state, pushEvent, toast]);

  const goHub = useCallback(() => {
    setPerspective("hub");
    window.scrollTo({ top: 0 });
  }, []);

  const open = useCallback((p: Perspective) => {
    setPerspective(p);
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <DeepContext.Provider value={value}>
      <div className="deep-app">
        {perspective === "hub" && <Hub onOpen={open} onReset={value.resetDemo} />}
        {perspective === "public" && <PublicApp onHub={goHub} />}
        {perspective === "explorer" && <ExplorerApp onHub={goHub} />}
        {perspective === "ministry" && <MinistryApp onHub={goHub} />}

        <div className="deep-toasts" aria-live="polite" aria-atomic="false">
          {toasts.map((x) => (
            <div className="deep-toast" key={x.id} role="status">
              <strong>DIP</strong> · {x.message}
            </div>
          ))}
        </div>
      </div>
    </DeepContext.Provider>
  );
};

export const AVAILABLE_LANGS = Object.keys(DICTS) as DeepLang[];

export default DeepApp;
