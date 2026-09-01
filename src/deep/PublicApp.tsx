import { lazy, Suspense, useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useDeep } from "./store";
import { BUSINESS_EVENTS, COMPANIES, EXPERIENCES, READY_ITEMS, SECTORS, STYLES, TAAG_URL, buildJourney } from "./data";
import { Icon, LangSwitcher, Lockup, Modal, loc } from "./ui";

const JourneyMap = lazy(() => import("./JourneyMap"));

type MainScreen = "home" | "chat" | "route" | "checklist" | "tips" | "profile" | "experiences" | "business" | "intent";
type RouteTab = "route" | "map" | "budget";
type Locale = "pt" | "fr" | "en";

const tx = (lang: Locale, pt: string, fr: string, en: string) => (lang === "pt" ? pt : lang === "fr" ? fr : en);

const USER_PROFILE_IMAGE =
  "data:image/jpeg;base64,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";

const NAV: { id: MainScreen; icon: string; labels: Record<Locale, string> }[] = [
  { id: "home", icon: "compass", labels: { pt: "Explorar", fr: "Explorer", en: "Explore" } },
  { id: "route", icon: "map", labels: { pt: "Roteiros", fr: "Itinéraires", en: "Itineraries" } },
  { id: "experiences", icon: "briefcase", labels: { pt: "Experiências", fr: "Expériences", en: "Experiences" } },
  { id: "tips", icon: "heart", labels: { pt: "Favoritos", fr: "Favoris", en: "Favorites" } },
  { id: "profile", icon: "user", labels: { pt: "Perfil", fr: "Profil", en: "Profile" } },
];

type CanonicalStop = {
  id: string;
  title: Record<Locale, string>;
  meta: Record<Locale, string>;
  city: "Abidjan" | "Grand-Bassam";
  group: "green" | "orange";
  image: string;
  lat: number;
  lng: number;
};

const STOPS: CanonicalStop[] = [
  {
    id: "marcory",
    title: { pt: "Mercado de Marcory", fr: "Marché de Marcory", en: "Marcory Market" },
    meta: { pt: "Cultura · Manhã", fr: "Culture · Matin", en: "Culture · Morning" },
    city: "Abidjan",
    group: "green",
    image: "/deep/gastronomy.jpg",
    lat: 5.3029,
    lng: -3.9947,
  },
  {
    id: "civilizacoes",
    title: { pt: "Museu das Civilizações", fr: "Musée des Civilisations", en: "Museum of Civilizations" },
    meta: { pt: "História · Tarde", fr: "Histoire · Après-midi", en: "History · Afternoon" },
    city: "Abidjan",
    group: "green",
    image: "/deep/yamoussoukro.jpg",
    lat: 5.3284,
    lng: -4.0267,
  },
  {
    id: "laguna",
    title: { pt: "Laguna Ébrié (pôr do sol)", fr: "Lagune Ébrié (coucher du soleil)", en: "Ébrié Lagoon (sunset)" },
    meta: { pt: "Natureza · Fim de tarde", fr: "Nature · Fin de journée", en: "Nature · Late afternoon" },
    city: "Abidjan",
    group: "green",
    image: "/cote-conecta/abidjan-home.jpg",
    lat: 5.2996,
    lng: -4.0189,
  },
  {
    id: "culinaria",
    title: { pt: "Culinária Ivoriana", fr: "Cuisine ivoirienne", en: "Ivorian Cuisine" },
    meta: { pt: "Gastronomia · Noite", fr: "Gastronomie · Soir", en: "Food · Evening" },
    city: "Abidjan",
    group: "green",
    image: "/deep/gastronomy.jpg",
    lat: 5.3104,
    lng: -3.9826,
  },
  {
    id: "centro-historico",
    title: { pt: "Centro Histórico (UNESCO)", fr: "Centre historique (UNESCO)", en: "Historic Centre (UNESCO)" },
    meta: { pt: "Cultura · Manhã", fr: "Culture · Matin", en: "Culture · Morning" },
    city: "Grand-Bassam",
    group: "orange",
    image: "/deep/grand-bassam.jpg",
    lat: 5.1958,
    lng: -3.7368,
  },
  {
    id: "praia-bassam",
    title: { pt: "Praia de Grand-Bassam", fr: "Plage de Grand-Bassam", en: "Grand-Bassam Beach" },
    meta: { pt: "Praia · Tarde", fr: "Plage · Après-midi", en: "Beach · Afternoon" },
    city: "Grand-Bassam",
    group: "orange",
    image: "/deep/grand-bassam.jpg",
    lat: 5.1898,
    lng: -3.7341,
  },
  {
    id: "traje",
    title: { pt: "Museu Nacional do Traje", fr: "Musée National du Costume", en: "National Costume Museum" },
    meta: { pt: "Cultura · Tarde", fr: "Culture · Après-midi", en: "Culture · Afternoon" },
    city: "Grand-Bassam",
    group: "orange",
    image: "/deep/yamoussoukro.jpg",
    lat: 5.1968,
    lng: -3.7389,
  },
];

const CHECK_ORDER = ["passport", "visa", "yellow", "transfer", "esim", "money", "insurance"];

const CHECK_DETAILS: Record<
  string,
  { category: "documents" | "health" | "bag"; label: Record<Locale, string>; desc: Record<Locale, string> }
> = {
  passport: {
    category: "documents",
    label: { pt: "Passaporte válido", fr: "Passeport valide", en: "Valid passport" },
    desc: {
      pt: "Válido por no mínimo 6 meses da data de entrada.",
      fr: "Valide au moins 6 mois après la date d’entrée.",
      en: "Valid for at least 6 months from entry.",
    },
  },
  visa: {
    category: "documents",
    label: { pt: "Visto de entrada", fr: "Visa d’entrée", en: "Entry visa" },
    desc: {
      pt: "Brasileiros precisam de visto. E-visa disponível.",
      fr: "Un visa est requis. E-visa disponible.",
      en: "A visa is required. E-visa available.",
    },
  },
  yellow: {
    category: "health",
    label: { pt: "Vacina contra Febre Amarela", fr: "Vaccin contre la fièvre jaune", en: "Yellow fever vaccination" },
    desc: {
      pt: "Obrigatória. Certificado Internacional exigido.",
      fr: "Obligatoire. Certificat international requis.",
      en: "Required. International certificate needed.",
    },
  },
  insurance: {
    category: "health",
    label: { pt: "Seguro viagem", fr: "Assurance voyage", en: "Travel insurance" },
    desc: {
      pt: "Recomendado para sua segurança e tranquilidade.",
      fr: "Recommandée pour voyager sereinement.",
      en: "Recommended for safety and peace of mind.",
    },
  },
  money: {
    category: "documents",
    label: { pt: "Moeda e pagamentos", fr: "Monnaie et paiements", en: "Currency and payments" },
    desc: {
      pt: "Saiba sobre FCFA, cartões aceitos e câmbio.",
      fr: "Préparez FCFA, cartes acceptées et change.",
      en: "Prepare CFA francs, accepted cards and exchange.",
    },
  },
  esim: {
    category: "bag",
    label: { pt: "Telefone e Internet", fr: "Téléphone et Internet", en: "Phone and Internet" },
    desc: {
      pt: "Roaming, eSIM local ou chip para sua viagem.",
      fr: "Roaming, eSIM ou carte SIM locale.",
      en: "Roaming, local eSIM or SIM card.",
    },
  },
  transfer: {
    category: "bag",
    label: { pt: "Bagagem", fr: "Bagages", en: "Luggage" },
    desc: {
      pt: "Verifique franquia, itens proibidos e líquidos.",
      fr: "Vérifiez la franchise, les objets interdits et les liquides.",
      en: "Check allowance, prohibited items and liquids.",
    },
  },
};

const PublicHeader = ({ title, onBack, onMenu }: { title?: string; onBack?: () => void; onMenu: () => void }) => {
  const { lang } = useDeep();
  const hubLabel = tx(
    lang,
    "Voltar para Public, Explorer e Ministry",
    "Retourner à Public, Explorer et Ministry",
    "Back to Public, Explorer and Ministry",
  );

  return (
    <header className="dip-public-header">
      <div className="dip-public-header__side">
        {onBack ? (
          <button
            type="button"
            className="dip-icon-button"
            aria-label={tx(lang, "Voltar", "Retour", "Back")}
            onClick={onBack}
          >
            <Icon name="back" size={24} />
          </button>
        ) : (
          <Lockup small />
        )}
      </div>
      {title ? <h1>{title}</h1> : <span />}
      <div className="dip-public-header__actions">
        <LangSwitcher />
        <button
          type="button"
          className="dip-icon-button dip-hub-button"
          aria-label={hubLabel}
          title={hubLabel}
          onClick={() => window.location.assign("/dip")}
        >
          <Icon name="grid" size={20} />
          <span className="dip-hub-label">{tx(lang, "Ambientes", "Espaces", "Spaces")}</span>
        </button>
        <button
          type="button"
          className="dip-icon-button"
          aria-label={tx(lang, "Abrir menu", "Ouvrir le menu", "Open menu")}
          onClick={onMenu}
        >
          <span className="dip-hamburger" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>
    </header>
  );
};

const BottomNav = ({ screen, go, lang }: { screen: MainScreen; go: (s: MainScreen) => void; lang: Locale }) => {
  const active = screen === "chat" || screen === "business" || screen === "intent" ? "home" : screen;
  return (
    <nav className="dip-bottom-nav" aria-label="DIP Public">
      {NAV.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-current={active === item.id ? "page" : undefined}
          onClick={() => go(item.id)}
        >
          <Icon name={item.icon} size={23} />
          <span>{item.labels[lang]}</span>
        </button>
      ))}
    </nav>
  );
};

const HomeScreen = ({ go, onMenu }: { go: (s: MainScreen) => void; onMenu: () => void }) => {
  const { lang } = useDeep();

  return (
    <div className="dip-home dip-public-home-v2">
      <PublicHeader onMenu={onMenu} />
      <section className="dip-home-hero">
        <div className="dip-home-hero__copy">
          <h1>
            {tx(
              lang,
              "A sua jornada na Costa do Marfim começa aqui",
              "Votre voyage en Côte d’Ivoire commence ici",
              "Your Côte d’Ivoire journey starts here",
            )}
          </h1>
          <p>
            {tx(
              lang,
              "Converse com a Aya, sua guia inteligente.",
              "Parlez avec Aya, votre guide intelligente.",
              "Talk to Aya, your intelligent guide.",
            )}
          </p>
        </div>

        <div className="dip-voice-card">
          <div className="dip-voice-card__intro">
            <img src="/deep/aya.jpg" alt="Aya" width={72} height={72} />
            <div>
              <h2>{tx(lang, "Olá! Eu sou a Aya.", "Bonjour ! Je suis Aya.", "Hi! I’m Aya.")}</h2>
              <p>
                {tx(
                  lang,
                  "Como posso ajudar você hoje?",
                  "Comment puis-je vous aider aujourd’hui ?",
                  "How can I help you today?",
                )}
              </p>
            </div>
            <span className="dip-voice-card__signal" aria-hidden="true">
              <Icon name="signal" size={24} />
            </span>
          </div>

          <button type="button" className="dip-public-voice-cta" onClick={() => go("chat")}>
            <Icon name="chat" size={23} />
            {tx(lang, "Começar com a Aya", "Commencer avec Aya", "Start with Aya")}
          </button>

          <div className="dip-voice-wave" aria-hidden="true">
            {Array.from({ length: 22 }).map((_, index) => (
              <i key={index} style={{ "--voice-bar": `${8 + ((index * 7) % 24)}px` } as CSSProperties} />
            ))}
          </div>
        </div>
      </section>

      <section className="dip-suggestions">
        <div className="dip-section-title">
          <h2>{tx(lang, "Sugestões para você", "Suggestions pour vous", "Suggestions for you")}</h2>
        </div>
        <div className="dip-suggestion-rail">
          {EXPERIENCES.slice(0, 4).map((item) => (
            <button type="button" key={item.id} onClick={() => go("experiences")}>
              <img src={item.image} alt="" width={280} height={190} loading="lazy" />
              <span>
                <strong>{loc(item.title, lang)}</strong>
                <small>{loc(item.short, lang)}</small>
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

const ChatScreen = ({ go, onMenu }: { go: (s: MainScreen) => void; onMenu: () => void }) => {
  const { lang, state, setProfile, setJourney, pushEvent, toast } = useDeep();
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<{ id: number; role: "me" | "aya"; text: string }[]>([]);
  const [budget, setBudget] = useState(state.profile.style || "comfort");
  const [replying, setReplying] = useState(false);
  const replyTimer = useRef<number | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    () => () => {
      if (replyTimer.current !== null) window.clearTimeout(replyTimer.current);
    },
    [],
  );

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, replying]);

  const createRoute = () => {
    const route = buildJourney(Number(state.profile.duration) || 7, state.profile.interests).map((d) => d.expId);
    setJourney(route);
    pushEvent({
      name: "journey_generated",
      source: "public",
      label: "Travel plan created · DIP Public",
      meta: { duration: state.profile.duration },
    });
    toast(lang === "pt" ? "Roteiro criado → Ministry" : lang === "fr" ? "Itinéraire créé → Ministry" : "Travel plan created → Ministry");
    go("route");
  };

  return (
    <div className="dip-page dip-chat-page">
      <PublicHeader
        title={tx(lang, "Aya, sua guia", "Aya, votre guide", "Aya, your guide")}
        onBack={() => go("home")}
        onMenu={onMenu}
      />
      <div className="dip-chat-profile">
        <img src="/deep/aya.jpg" alt="Aya" width={58} height={58} />
        <div>
          <h2>
            {tx(
              lang,
              "Aya, sua guia da Costa do Marfim",
              "Aya, votre guide en Côte d’Ivoire",
              "Aya, your Côte d’Ivoire guide",
            )}
          </h2>
          <p>
            <span />{" "}
            {tx(lang, "IA local · Sempre com você", "IA locale · Toujours avec vous", "Local AI · Always with you")}
          </p>
        </div>
      </div>
      <div ref={logRef} className="dip-chat-log" role="log" aria-live="polite" aria-busy={replying}>
        <div className="dip-bubble dip-bubble--me">
          {tx(
            lang,
            "Quero viajar por 7 dias, gosto de cultura, gastronomia e praia.",
            "Je veux voyager 7 jours, entre culture, gastronomie et plage.",
            "I want a 7-day trip with culture, food and beaches.",
          )}
        </div>
        <div className="dip-bubble dip-bubble--aya">
          {tx(
            lang,
            "Perfeito. Seu roteiro combina Abidjan, Grand-Bassam e experiências culturais locais. Antes de montar tudo: qual é seu orçamento?",
            "Parfait. Votre itinéraire combine Abidjan, Grand-Bassam et des expériences culturelles. Quel est votre budget ?",
            "Perfect. Your itinerary combines Abidjan, Grand-Bassam and local cultural experiences. What is your budget?",
          )}
        </div>
        <div className="dip-bubble dip-bubble--me">
          {tx(
            lang,
            "Vou sozinho e quero viajar com tranquilidade.",
            "Je voyage seul et je veux du confort.",
            "I’m traveling solo and want a comfortable pace.",
          )}
        </div>
        {messages.map((message) => (
          <div className={`dip-bubble dip-bubble--${message.role}`} key={message.id}>
            {message.text}
          </div>
        ))}
        {replying && (
          <div className="dip-bubble dip-bubble--aya dip-bubble--typing" role="status">
            {tx(lang, "Aya está respondendo…", "Aya vous répond…", "Aya is replying…")}
          </div>
        )}
      </div>
      <div className="dip-budget-chips" role="group" aria-label={tx(lang, "Orçamento", "Budget", "Budget")}>
        {[
          ["essential", tx(lang, "Econômico", "Économique", "Budget")],
          ["comfort", tx(lang, "Conforto", "Confort", "Comfort")],
          ["premium", tx(lang, "Experiência completa", "Expérience complète", "Full experience")],
        ].map(([id, label]) => (
          <button
            type="button"
            key={id}
            aria-pressed={budget === id}
            onClick={() => {
              setBudget(id);
              setProfile({ style: id });
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="dip-verified">
        <Icon name="check" size={16} />{" "}
        {tx(lang, "Fontes oficiais verificadas", "Sources officielles vérifiées", "Verified official sources")}
      </div>
      <form
        className="dip-chat-composer"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const message = draft.trim();
          if (!message || replying) return;
          setMessages((current) => [...current, { id: Date.now(), role: "me", text: message }]);
          setDraft("");
          setReplying(true);
          replyTimer.current = window.setTimeout(() => {
            setMessages((current) => [
              ...current,
              {
                id: Date.now() + 1,
                role: "aya",
                text: tx(
                  lang,
                  "Entendi. Vou considerar isso no seu roteiro e priorizar experiências que combinem com o que você procura.",
                  "Compris. Je vais en tenir compte dans votre itinéraire et privilégier les expériences qui correspondent à vos envies.",
                  "Got it. I’ll use that in your itinerary and prioritize experiences that match what you’re looking for.",
                ),
              },
            ]);
            setReplying(false);
            replyTimer.current = null;
          }, 650);
        }}
      >
        <label className="dip-sr-only" htmlFor="dip-chat-input">
          {tx(lang, "Fale com Aya", "Parlez à Aya", "Talk to Aya")}
        </label>
        <input
          id="dip-chat-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={replying}
          placeholder={tx(
            lang,
            "Conte para a Aya o que você procura",
            "Dites à Aya ce que vous cherchez",
            "Tell Aya what you’re looking for",
          )}
        />
        <button
          type="submit"
          aria-label={tx(lang, "Enviar", "Envoyer", "Send")}
          aria-busy={replying}
          disabled={replying || !draft.trim()}
        >
          <Icon name="send" size={20} />
        </button>
      </form>
      <button type="button" className="dip-primary dip-chat-next" onClick={createRoute}>
        {tx(lang, "Ver meu roteiro", "Voir mon itinéraire", "View my itinerary")}
      </button>
    </div>
  );
};

const Tabs = ({ active, setActive, lang }: { active: RouteTab; setActive: (tab: RouteTab) => void; lang: Locale }) => {
  const tabs: { id: RouteTab; label: string }[] = [
    { id: "route", label: tx(lang, "Roteiro", "Itinéraire", "Itinerary") },
    { id: "map", label: tx(lang, "Mapa", "Carte", "Map") },
    { id: "budget", label: tx(lang, "Orçamento", "Budget", "Budget") },
  ];
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = event.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
    setActive(tabs[next].id);
    document.getElementById(`dip-tab-${tabs[next].id}`)?.focus();
  };
  return (
    <div
      className="dip-route-tabs"
      role="tablist"
      aria-label={tx(lang, "Meu roteiro", "Mon itinéraire", "My itinerary")}
    >
      {tabs.map((tab, index) => (
        <button
          id={`dip-tab-${tab.id}`}
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          aria-controls={`dip-panel-${tab.id}`}
          onClick={() => setActive(tab.id)}
          onKeyDown={(e) => onKey(e, index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const TimelineGroup = ({ group, lang }: { group: "green" | "orange"; lang: Locale }) => {
  const items = STOPS.filter((stop) => stop.group === group);
  return (
    <section className={`dip-timeline-group dip-timeline-group--${group}`}>
      <span className="dip-timeline-dot" aria-hidden="true" />
      <h2>
        <small>
          {group === "green"
            ? tx(lang, "Dia 1 – 4", "Jour 1 – 4", "Day 1 – 4")
            : tx(lang, "Dia 5 – 7", "Jour 5 – 7", "Day 5 – 7")}
        </small>
        {group === "green" ? "Abidjan" : "Grand-Bassam"}
      </h2>
      <div className="dip-route-list">
        {items.map((item) => (
          <article key={item.id}>
            <img src={item.image} alt="" width={180} height={112} loading="lazy" />
            <div>
              <strong>{item.title[lang]}</strong>
              <span>{item.meta[lang]}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const RouteTimeline = ({ lang }: { lang: Locale }) => (
  <div id="dip-panel-route" role="tabpanel" aria-labelledby="dip-tab-route" className="dip-timeline">
    <TimelineGroup group="green" lang={lang} />
    <TimelineGroup group="orange" lang={lang} />
    <div className="dip-route-summary">
      <div>
        <strong>{tx(lang, "Orçamento total", "Budget total", "Total budget")}</strong>
        <strong>R$ 8.000</strong>
      </div>
      <div>
        <span>2 {tx(lang, "pessoas", "personnes", "people")}</span>
        <span>72% {tx(lang, "usado", "utilisé", "used")}</span>
      </div>
      <div className="dip-progress">
        <span style={{ width: "72%" }} />
      </div>
      <div>
        <span>R$ 5.760 {tx(lang, "usados", "utilisés", "used")}</span>
        <span>R$ 2.240 {tx(lang, "restantes", "restants", "remaining")}</span>
      </div>
    </div>
  </div>
);

const RouteMapPanel = ({ lang }: { lang: Locale }) => {
  const [filter, setFilter] = useState<"all" | "green" | "orange">("all");
  const [selectedId, setSelectedId] = useState("civilizacoes");
  const visible = useMemo(
    () => (filter === "all" ? STOPS.slice(0, 6) : STOPS.filter((stop) => stop.group === filter).slice(0, 4)),
    [filter],
  );
  const selected = STOPS.find((stop) => stop.id === selectedId) ?? visible[0];
  const mapStops = useMemo(
    () =>
      visible.map((stop) => ({
        id: stop.id,
        label: stop.title[lang],
        lat: stop.lat,
        lng: stop.lng,
        group: stop.group,
      })),
    [visible, lang],
  );

  useEffect(() => {
    if (!visible.some((stop) => stop.id === selectedId)) setSelectedId(visible[0]?.id ?? "civilizacoes");
  }, [filter, selectedId, visible]);

  return (
    <div id="dip-panel-map" role="tabpanel" aria-labelledby="dip-tab-map" className="dip-map-panel">
      <div className="dip-map-filters">
        <button
          type="button"
          aria-pressed={filter === "green"}
          onClick={() => setFilter(filter === "green" ? "all" : "green")}
        >
          <i className="green" /> {tx(lang, "Dias 1–4", "Jours 1–4", "Days 1–4")}
        </button>
        <button
          type="button"
          aria-pressed={filter === "orange"}
          onClick={() => setFilter(filter === "orange" ? "all" : "orange")}
        >
          <i className="orange" /> {tx(lang, "Dias 5–7", "Jours 5–7", "Days 5–7")}
        </button>
      </div>
      <div className="dip-map-shell">
        <Suspense fallback={<div className="dip-map-loading" aria-busy="true" />}>
          <JourneyMap stops={mapStops} onSelect={setSelectedId} />
        </Suspense>
        <button type="button" className="dip-map-all" onClick={() => setFilter("all")}>
          {tx(lang, "Ver rota completa", "Voir l’itinéraire complet", "View full route")}
        </button>
        {selected && (
          <div className="dip-map-card" aria-live="polite">
            <span className={selected.group}>
              <Icon name="pin" size={25} />
            </span>
            <div>
              <small>
                {selected.city} ·{" "}
                {selected.group === "green"
                  ? tx(lang, "Dias 1–4", "Jours 1–4", "Days 1–4")
                  : tx(lang, "Dias 5–7", "Jours 5–7", "Days 5–7")}
              </small>
              <strong>{selected.title[lang]}</strong>
              <p>{selected.meta[lang]}</p>
            </div>
          </div>
        )}
      </div>
      <p className="dip-map-note">
        <Icon name="info" size={16} />{" "}
        {tx(
          lang,
          "Trajeto ilustrativo. Confirme deslocamentos e horários localmente.",
          "Trajet indicatif. Confirmez les déplacements et horaires sur place.",
          "Illustrative route. Confirm local travel times and schedules.",
        )}
      </p>
    </div>
  );
};

const BudgetPanel = ({ lang }: { lang: Locale }) => {
  const [profile, setProfile] = useState<"economic" | "comfort" | "complete">("comfort");
  const [travelers, setTravelers] = useState(2);
  const [expenses, setExpenses] = useState([2300, 1100, 700, 1060, 600]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(0);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const factor = profile === "economic" ? 0.76 : profile === "complete" ? 1.45 : 1;
  const scale = travelers / 2;
  const total = 4000 * travelers;
  const values = expenses.map((value) => Math.round(value * factor * scale));
  const estimated = values.reduce((sum, value) => sum + value, 0);
  const balance = total - estimated;
  const pct = Math.min(100, Math.round((estimated / total) * 100));
  const labels = [
    tx(lang, "Hospedagem", "Hébergement", "Stay"),
    tx(lang, "Alimentação", "Restauration", "Food"),
    tx(lang, "Transporte", "Transport", "Transport"),
    tx(lang, "Experiências", "Expériences", "Experiences"),
    tx(lang, "Reserva", "Réserve", "Reserve"),
  ];
  const money = (value: number) =>
    new Intl.NumberFormat(lang === "pt" ? "pt-BR" : lang === "fr" ? "fr-FR" : "en-US", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);

  const add = () => {
    const numeric = Number(amount.replace(",", "."));
    if (!Number.isFinite(numeric) || numeric <= 0) {
      setError(
        tx(
          lang,
          "Informe um valor maior que zero.",
          "Saisissez un montant supérieur à zéro.",
          "Enter an amount greater than zero.",
        ),
      );
      return;
    }
    setExpenses((current) =>
      current.map((value, index) =>
        index === category ? value + Math.round(numeric / Math.max(factor * scale, 0.1)) : value,
      ),
    );
    setAmount("");
    setError("");
    setOpen(false);
  };

  return (
    <div id="dip-panel-budget" role="tabpanel" aria-labelledby="dip-tab-budget" className="dip-budget-panel">
      <div className="dip-estimate-label">
        <Icon name="info" size={16} /> {tx(lang, "Estimativa simulada", "Estimation simulée", "Simulated estimate")}
      </div>
      <section className="dip-budget-summary">
        <div className="dip-budget-summary__top">
          <span>{tx(lang, "Orçamento total", "Budget total", "Total budget")}</span>
          <strong>{money(total)}</strong>
        </div>
        <div className="dip-budget-values">
          <div>
            <span>{tx(lang, "Valor estimado", "Montant estimé", "Estimated")}</span>
            <strong>{money(estimated)}</strong>
          </div>
          <div>
            <span>{tx(lang, "Saldo", "Solde", "Balance")}</span>
            <strong className={balance < 0 ? "negative" : ""}>{money(balance)}</strong>
          </div>
        </div>
        <div className="dip-progress">
          <span style={{ width: `${pct}%` }} />
        </div>
        <small>
          {pct}% {tx(lang, "previsto", "prévu", "planned")}
        </small>
      </section>
      <section className="dip-budget-controls">
        <h2>{tx(lang, "Perfil da viagem", "Profil du voyage", "Travel profile")}</h2>
        <div
          className="dip-profile-switch"
          role="group"
          aria-label={tx(lang, "Perfil da viagem", "Profil du voyage", "Travel profile")}
        >
          {[
            ["economic", tx(lang, "Econômico", "Économique", "Budget")],
            ["comfort", tx(lang, "Conforto", "Confort", "Comfort")],
            ["complete", tx(lang, "Experiência completa", "Expérience complète", "Full experience")],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={profile === id}
              onClick={() => setProfile(id as typeof profile)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="dip-traveler-control">
          <div>
            <small>{tx(lang, "Viajantes", "Voyageurs", "Travelers")}</small>
            <strong>
              {travelers}{" "}
              {travelers === 1 ? tx(lang, "pessoa", "personne", "person") : tx(lang, "pessoas", "personnes", "people")}
            </strong>
          </div>
          <div>
            <button
              type="button"
              aria-label={tx(lang, "Diminuir viajantes", "Réduire le nombre de voyageurs", "Decrease travelers")}
              disabled={travelers === 1}
              onClick={() => setTravelers((n) => Math.max(1, n - 1))}
            >
              −
            </button>
            <b>{travelers}</b>
            <button
              type="button"
              aria-label={tx(lang, "Aumentar viajantes", "Augmenter le nombre de voyageurs", "Increase travelers")}
              disabled={travelers === 4}
              onClick={() => setTravelers((n) => Math.min(4, n + 1))}
            >
              +
            </button>
          </div>
        </div>
      </section>
      <section className="dip-budget-categories">
        <h2>{tx(lang, "Por categoria", "Par catégorie", "By category")}</h2>
        {labels.map((label, index) => (
          <div className="dip-budget-category" key={label}>
            <div>
              <strong>{label}</strong>
              <b>{money(values[index])}</b>
            </div>
            <i>
              <span style={{ width: `${Math.min(100, Math.round((values[index] / total) * 100 * 2))}%` }} />
            </i>
          </div>
        ))}
      </section>
      <button type="button" className="dip-primary dip-add-expense" onClick={() => setOpen(true)}>
        <Icon name="plus" size={21} /> {tx(lang, "Adicionar gasto", "Ajouter une dépense", "Add expense")}
      </button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setError("");
        }}
        title={tx(lang, "Adicionar gasto", "Ajouter une dépense", "Add expense")}
      >
        <form
          className="dip-expense-form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            add();
          }}
        >
          <label htmlFor="dip-category">{tx(lang, "Categoria", "Catégorie", "Category")}</label>
          <select id="dip-category" value={category} onChange={(e) => setCategory(Number(e.target.value))}>
            {labels.map((label, index) => (
              <option value={index} key={label}>
                {label}
              </option>
            ))}
          </select>
          <label htmlFor="dip-amount">{tx(lang, "Valor em reais", "Montant en reais", "Amount in BRL")}</label>
          <input
            id="dip-amount"
            inputMode="decimal"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError("");
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "dip-expense-error" : undefined}
          />
          {error && (
            <p id="dip-expense-error" role="alert">
              {error}
            </p>
          )}
          <button className="dip-primary" type="submit">
            {tx(lang, "Adicionar", "Ajouter", "Add")}
          </button>
        </form>
      </Modal>
    </div>
  );
};

const RouteScreen = ({ go, onMenu }: { go: (s: MainScreen) => void; onMenu: () => void }) => {
  const { lang } = useDeep();
  const [tab, setTab] = useState<RouteTab>("route");
  return (
    <div className="dip-page dip-route-page">
      <PublicHeader
        title={tx(lang, "Meu roteiro", "Mon itinéraire", "My itinerary")}
        onBack={() => go("home")}
        onMenu={onMenu}
      />
      <Tabs active={tab} setActive={setTab} lang={lang} />
      {tab === "route" && <RouteTimeline lang={lang} />}
      {tab === "map" && <RouteMapPanel lang={lang} />}
      {tab === "budget" && <BudgetPanel lang={lang} />}
    </div>
  );
};

const ChecklistScreen = ({ go, onMenu }: { go: (s: MainScreen) => void; onMenu: () => void }) => {
  const { lang, state, toggleChecklist, pushEvent, toast } = useDeep();
  const initial = state.checklist.length ? state.checklist : CHECK_ORDER.slice(0, 6);
  const [done, setDone] = useState<string[]>(initial);
  const [filter, setFilter] = useState<"all" | "documents" | "health" | "bag">("all");
  const [flightOpen, setFlightOpen] = useState(false);
  const opened = useRef(false);
  useEffect(() => {
    if (opened.current) return;
    opened.current = true;
    pushEvent({ name: "readiness_opened", source: "public", label: "Travel checklist opened · DIP Public" });
  }, [pushEvent]);
  const visible = CHECK_ORDER.map((id) => READY_ITEMS.find((item) => item.id === id))
    .filter((item): item is (typeof READY_ITEMS)[number] => Boolean(item))
    .filter((item) => filter === "all" || CHECK_DETAILS[item.id]?.category === filter);
  const toggle = (id: string) => {
    setDone((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
    toggleChecklist(id);
  };
  const pct = Math.round((done.length / READY_ITEMS.length) * 360);
  return (
    <div className="dip-page dip-check-page">
      <PublicHeader
        title={tx(lang, "Checklist da viagem", "Checklist du voyage", "Travel checklist")}
        onBack={() => go("home")}
        onMenu={onMenu}
      />
      <section className="dip-check-summary">
        <div className="dip-check-ring" style={{ "--dip-ring": `${pct}deg` } as CSSProperties}>
          <span>
            {done.length}/{READY_ITEMS.length}
          </span>
        </div>
        <div>
          <h2>
            {done.length === READY_ITEMS.length
              ? tx(lang, "Tudo pronto!", "Tout est prêt !", "All set!")
              : tx(lang, "Quase lá!", "Presque prêt !", "Almost there!")}
          </h2>
          <p>{tx(lang, "Revise os itens pendentes.", "Vérifiez les éléments en attente.", "Review pending items.")}</p>
        </div>
      </section>
      <div className="dip-check-tabs" role="tablist" aria-label={tx(lang, "Filtros", "Filtres", "Filters")}>
        {[
          ["all", tx(lang, "Todos", "Tous", "All")],
          ["documents", tx(lang, "Documentos", "Documents", "Documents")],
          ["health", tx(lang, "Saúde", "Santé", "Health")],
          ["bag", tx(lang, "Bagagem", "Bagages", "Luggage")],
        ].map(([id, label]) => (
          <button
            type="button"
            role="tab"
            aria-selected={filter === id}
            key={id}
            onClick={() => setFilter(id as typeof filter)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="dip-check-list">
        {visible.map((item) => {
          const checked = done.includes(item.id);
          const detail = CHECK_DETAILS[item.id];
          return (
            <button type="button" key={item.id} aria-pressed={checked} onClick={() => toggle(item.id)}>
              <span className="dip-check-icon">
                <Icon name={item.id === "transfer" ? "briefcase" : "check"} size={23} />
              </span>
              <span>
                <strong>{detail.label[lang]}</strong>
                <small>{detail.desc[lang]}</small>
              </span>
              <i>{checked && <Icon name="check" size={19} />}</i>
            </button>
          );
        })}
      </div>
      <button type="button" className="dip-primary dip-flight-cta" onClick={() => setFlightOpen(true)}>
        {tx(lang, "Ver opções de voo", "Voir les options de vol", "View flight options")}{" "}
        <Icon name="plane" size={22} />
      </button>
      <Modal
        open={flightOpen}
        onClose={() => setFlightOpen(false)}
        title={tx(lang, "Pesquisar voos com a TAAG?", "Rechercher des vols avec TAAG ?", "Search flights with TAAG?")}
      >
        <div className="dip-taag-modal">
          <div className="dip-plane-mark">
            <Icon name="plane" size={34} />
          </div>
          <p>
            {tx(
              lang,
              "Não consultamos preços, disponibilidade nem fazemos reservas. Você será direcionado ao site oficial.",
              "Nous ne consultons ni prix ni disponibilités et ne faisons pas de réservations. Vous serez redirigé vers le site officiel.",
              "We do not check prices or availability and do not make reservations. You will be redirected to the official site.",
            )}
          </p>
          <a
            className="dip-primary"
            href={TAAG_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              pushEvent({
                name: "partner_referral",
                source: "public",
                label: "TAAG flight options opened",
                meta: { partner: "TAAG" },
              });
              toast(lang === "pt" ? "Opções TAAG abertas → Ministry" : lang === "fr" ? "Options TAAG ouvertes → Ministry" : "TAAG options opened → Ministry");
            }}
          >
            {tx(lang, "Ir ao site oficial da TAAG", "Aller sur le site officiel de TAAG", "Go to TAAG official site")}{" "}
            <Icon name="external" size={19} />
          </a>
          <button type="button" className="dip-secondary" onClick={() => setFlightOpen(false)}>
            {tx(lang, "Continuar no aplicativo", "Continuer dans l’application", "Continue in the app")}
          </button>
        </div>
      </Modal>
    </div>
  );
};

const TipsScreen = ({ go, onMenu }: { go: (s: MainScreen) => void; onMenu: () => void }) => {
  const { lang, state, toggleSaved, addToItinerary, toast } = useDeep();
  const favorites = EXPERIENCES.filter((item) => state.savedIds.includes(item.id));

  return (
    <div className="dip-page">
      <PublicHeader title={tx(lang, "Favoritos", "Favoris", "Favorites")} onBack={() => go("home")} onMenu={onMenu} />
      <main className="dip-simple-content">
        {favorites.length === 0 ? (
          <section className="dip-favorites-empty" aria-labelledby="dip-favorites-title">
            <span aria-hidden="true">
              <Icon name="heart" size={34} />
            </span>
            <h2 id="dip-favorites-title">
              {tx(
                lang,
                "Seus lugares favoritos aparecerão aqui",
                "Vos lieux favoris apparaîtront ici",
                "Your favorite places will appear here",
              )}
            </h2>
            <p>
              {tx(
                lang,
                "Explore as experiências e salve as que combinam com a sua viagem.",
                "Explorez les expériences et enregistrez celles qui correspondent à votre voyage.",
                "Explore experiences and save the ones that match your trip.",
              )}
            </p>
            <button type="button" className="dip-primary" onClick={() => go("experiences")}>
              {tx(lang, "Explorar experiências", "Explorer les expériences", "Explore experiences")}
            </button>
          </section>
        ) : (
          <div className="dip-experience-grid">
            {favorites.map((item) => (
              <article key={item.id}>
                <img src={item.image} alt="" width={420} height={280} loading="lazy" />
                <div>
                  <h2>{loc(item.title, lang)}</h2>
                  <p>{loc(item.short, lang)}</p>
                  <div className="dip-experience-actions">
                    <button
                      type="button"
                      onClick={() => {
                        addToItinerary(item.id, loc(item.title, lang));
                        toast(tx(lang, "Adicionado ao roteiro", "Ajouté à l’itinéraire", "Added to itinerary"));
                      }}
                    >
                      {tx(lang, "Adicionar ao roteiro", "Ajouter à l’itinéraire", "Add to itinerary")}
                    </button>
                    <button type="button" className="dip-favorite-button" onClick={() => toggleSaved(item.id)}>
                      {tx(lang, "Remover", "Retirer", "Remove")}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const ProfileScreen = ({ go, onMenu }: { go: (s: MainScreen) => void; onMenu: () => void }) => {
  const { lang, state } = useDeep();
  const company = COMPANIES.find((item) => item.id === state.profile.company);
  const style = STYLES.find((item) => item.id === state.profile.style);
  return (
    <div className="dip-page">
      <PublicHeader title={tx(lang, "Perfil", "Profil", "Profile")} onBack={() => go("home")} onMenu={onMenu} />
      <main className="dip-simple-content">
        <div className="dip-profile-hero">
          <img
            src={USER_PROFILE_IMAGE}
            alt={tx(lang, "Foto do viajante DIP", "Photo du voyageur DIP", "DIP traveler photo")}
            width={88}
            height={88}
          />
          <div>
            <p className="dip-eyebrow">{tx(lang, "Seu planejamento", "Votre planification", "Your planning")}</p>
            <h2>{tx(lang, "Viajante DIP", "Voyageur DIP", "DIP traveler")}</h2>
            <p>
              {tx(
                lang,
                "Preferências salvas neste dispositivo",
                "Préférences enregistrées sur cet appareil",
                "Preferences saved on this device",
              )}
            </p>
          </div>
        </div>
        <div className="dip-profile-grid">
          <div>
            <small>{tx(lang, "Duração", "Durée", "Duration")}</small>
            <strong>
              {state.profile.duration || 7} {tx(lang, "dias", "jours", "days")}
            </strong>
          </div>
          <div>
            <small>{tx(lang, "Com quem", "Avec qui", "With whom")}</small>
            <strong>{company ? loc(company.label, lang) : tx(lang, "Sozinho", "Seul", "Solo")}</strong>
          </div>
          <div>
            <small>{tx(lang, "Estilo", "Style", "Style")}</small>
            <strong>{style ? loc(style.label, lang) : tx(lang, "Conforto", "Confort", "Comfort")}</strong>
          </div>
          <div>
            <small>{tx(lang, "Interesses", "Intérêts", "Interests")}</small>
            <strong>{state.profile.interests.length || 3}</strong>
          </div>
        </div>
        <button type="button" className="dip-primary" onClick={() => go("route")}>
          {tx(lang, "Abrir meu roteiro", "Ouvrir mon itinéraire", "Open my itinerary")}
        </button>
        <div className="dip-profile-actions">
          <button type="button" onClick={() => go("experiences")}>
            {tx(lang, "Experiências", "Expériences", "Experiences")}
          </button>
          <button type="button" onClick={() => go("business")}>
            {tx(lang, "Negócios", "Affaires", "Business")}
          </button>
          <button type="button" onClick={() => go("intent")}>
            {tx(lang, "Intenção de viagem", "Intention de voyage", "Travel intent")}
          </button>
        </div>
      </main>
    </div>
  );
};

const ExperiencesScreen = ({ go, onMenu }: { go: (s: MainScreen) => void; onMenu: () => void }) => {
  const { lang, state, addToItinerary, toggleSaved, pushEvent, toast } = useDeep();

  return (
    <div className="dip-page">
      <PublicHeader
        title={tx(lang, "Experiências", "Expériences", "Experiences")}
        onBack={() => go("home")}
        onMenu={onMenu}
      />
      <main className="dip-simple-content">
        <div className="dip-experience-grid">
          {EXPERIENCES.map((item) => {
            const saved = state.savedIds.includes(item.id);
            return (
              <article key={item.id}>
                <img src={item.image} alt="" width={420} height={280} loading="lazy" />
                <div>
                  <h2>{loc(item.title, lang)}</h2>
                  <p>{loc(item.short, lang)}</p>
                  <div className="dip-experience-actions">
                    <button
                      type="button"
                      onClick={() => {
                        addToItinerary(item.id, loc(item.title, lang));
                        pushEvent({
                          name: "experience_viewed",
                          source: "public",
                          label: `Experience viewed · ${item.id}`,
                          meta: { id: item.id },
                        });
                        toast(tx(lang, "Adicionado ao roteiro", "Ajouté à l’itinéraire", "Added to itinerary"));
                      }}
                    >
                      {tx(lang, "Adicionar ao roteiro", "Ajouter à l’itinéraire", "Add to itinerary")}
                    </button>
                    <button
                      type="button"
                      className="dip-favorite-button"
                      aria-pressed={saved}
                      onClick={() => toggleSaved(item.id)}
                    >
                      <Icon name="heart" size={18} />
                      {saved ? tx(lang, "Salvo", "Enregistré", "Saved") : tx(lang, "Salvar", "Enregistrer", "Save")}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
};

const BusinessScreen = ({ go, onMenu }: { go: (s: MainScreen) => void; onMenu: () => void }) => {
  const { lang, pushEvent, toast } = useDeep();
  const [sent, setSent] = useState(false);
  return (
    <div className="dip-page">
      <PublicHeader title={tx(lang, "Negócios", "Affaires", "Business")} onBack={() => go("tips")} onMenu={onMenu} />
      <main className="dip-simple-content">
        <p className="dip-eyebrow">
          {tx(lang, "Conexões e oportunidades", "Connexions et opportunités", "Connections and opportunities")}
        </p>
        <h2>
          {tx(
            lang,
            "Conheça setores estratégicos da Costa do Marfim",
            "Découvrez les secteurs stratégiques de la Côte d’Ivoire",
            "Explore Côte d’Ivoire’s strategic sectors",
          )}
        </h2>
        <div className="dip-sector-grid">
          {SECTORS.map((sector) => (
            <span key={sector.id}>{loc(sector.label, lang)}</span>
          ))}
        </div>
        <h3>
          {tx(
            lang,
            "Próximos eventos institucionais",
            "Prochains événements institutionnels",
            "Upcoming institutional events",
          )}
        </h3>
        <div className="dip-event-list">
          {BUSINESS_EVENTS.map((event) => (
            <article key={event.id}>
              <strong>{loc(event.label, lang)}</strong>
              <span>{event.date}</span>
            </article>
          ))}
        </div>
        <button
          type="button"
          className="dip-primary"
          onClick={() => {
            setSent(true);
            pushEvent({ name: "business_interest", source: "public", label: "Business opportunity explored · DIP Public" });
            toast(lang === "pt" ? "Oportunidade explorada → Ministry" : lang === "fr" ? "Opportunité consultée → Ministry" : "Business opportunity explored → Ministry");
          }}
        >
          {sent
            ? tx(lang, "Interesse registrado", "Intérêt enregistré", "Interest registered")
            : tx(
                lang,
                "Tenho interesse em negócios",
                "Je suis intéressé par les affaires",
                "I’m interested in business",
              )}
        </button>
      </main>
    </div>
  );
};

const IntentScreen = ({ go, onMenu }: { go: (s: MainScreen) => void; onMenu: () => void }) => {
  const { lang, state, confirmIntent, toast } = useDeep();
  return (
    <div className="dip-page">
      <PublicHeader
        title={tx(lang, "Minha viagem", "Mon voyage", "My trip")}
        onBack={() => go("profile")}
        onMenu={onMenu}
      />
      <main className="dip-simple-content">
        <div className="dip-intent-card">
          <Icon name="heart" size={42} />
          <h2>
            {tx(
              lang,
              "Sua Costa do Marfim já tem um começo",
              "Votre Côte d’Ivoire a déjà un début",
              "Your Côte d’Ivoire journey has begun",
            )}
          </h2>
          <p>
            {tx(
              lang,
              "Salve sua intenção para manter o roteiro e ajudar o destino a entender o interesse gerado.",
              "Enregistrez votre intention pour garder l’itinéraire et aider la destination à comprendre l’intérêt généré.",
              "Save your intent to keep the itinerary and help the destination understand generated interest.",
            )}
          </p>
          <button
            type="button"
            className="dip-primary"
            disabled={state.intentConfirmed}
            onClick={() => {
              confirmIntent();
              toast("travel_intent_confirmed → Ministry");
            }}
          >
            {state.intentConfirmed
              ? tx(lang, "Intenção confirmada", "Intention confirmée", "Intent confirmed")
              : tx(lang, "Confirmar intenção de viagem", "Confirmer l’intention de voyage", "Confirm travel intent")}
          </button>
        </div>
      </main>
    </div>
  );
};

const PublicApp = ({ onHub }: { onHub: () => void }) => {
  const { lang } = useDeep();
  const [screen, setScreen] = useState<MainScreen>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const go = (next: MainScreen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
    mainRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    document.title = `${screen === "home" ? "DIP Public" : (NAV.find((item) => item.id === screen)?.labels[lang] ?? "DIP Public")} — DIP`;
  }, [screen, lang]);

  return (
    <div className="deep-shell deep-public-canonical" ref={mainRef} tabIndex={-1}>
      <main className="dip-main" id="deep-public-main">
        {screen === "home" && <HomeScreen go={go} onMenu={() => setMenuOpen(true)} />}
        {screen === "chat" && <ChatScreen go={go} onMenu={() => setMenuOpen(true)} />}
        {screen === "route" && <RouteScreen go={go} onMenu={() => setMenuOpen(true)} />}
        {screen === "checklist" && <ChecklistScreen go={go} onMenu={() => setMenuOpen(true)} />}
        {screen === "tips" && <TipsScreen go={go} onMenu={() => setMenuOpen(true)} />}
        {screen === "profile" && <ProfileScreen go={go} onMenu={() => setMenuOpen(true)} />}
        {screen === "experiences" && <ExperiencesScreen go={go} onMenu={() => setMenuOpen(true)} />}
        {screen === "business" && <BusinessScreen go={go} onMenu={() => setMenuOpen(true)} />}
        {screen === "intent" && <IntentScreen go={go} onMenu={() => setMenuOpen(true)} />}
      </main>
      <BottomNav screen={screen} go={go} lang={lang} />
      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} title="DIP Public">
        <div className="dip-menu">
          <LangSwitcher />
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              go("experiences");
            }}
          >
            {tx(lang, "Experiências", "Expériences", "Experiences")}
          </button>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              go("business");
            }}
          >
            {tx(lang, "Negócios", "Affaires", "Business")}
          </button>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              go("intent");
            }}
          >
            {tx(lang, "Intenção de viagem", "Intention de voyage", "Travel intent")}
          </button>
          <button type="button" onClick={onHub}>
            {tx(lang, "Voltar ao Hub DIP", "Retour au Hub DIP", "Back to DIP Hub")}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PublicApp;
