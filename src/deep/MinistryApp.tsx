import { useMemo, useState } from "react";
import { useDeep } from "./store";
import { BASE_FEEDBACK, CAMPAIGNS, CREATORS, FUNNEL, JOURNEYS, MARKETS, PARTNERS, REPORTS, TRAVELERS } from "./data";
import { DemoFlag, Icon, LangSwitcher, Modal, loc } from "./ui";

type PrimaryView = "overview" | "travelers" | "campaigns" | "experiences" | "more";
type ExperienceView = "journeys" | "signals" | "funnel";
type MoreView = "creators" | "partners" | "reports" | "settings" | null;
type CampaignStatus = "live" | "planned" | "draft";
type ModalState =
  | { kind: "notifications" }
  | { kind: "traveler"; id: string }
  | { kind: "campaign"; id: string }
  | { kind: "journey"; id: string }
  | { kind: "creator"; id: string }
  | { kind: "partner"; id: string }
  | { kind: "report"; id: string }
  | null;

type Copy = { pt: string; fr: string; en: string };

const NAV: { id: PrimaryView; label: Copy; icon: string }[] = [
  { id: "overview", label: { pt: "Painel", fr: "Tableau", en: "Dashboard" }, icon: "home" },
  { id: "travelers", label: { pt: "Visitantes", fr: "Visiteurs", en: "Visitors" }, icon: "users" },
  { id: "campaigns", label: { pt: "Campanhas", fr: "Campagnes", en: "Campaigns" }, icon: "megaphone" },
  { id: "experiences", label: { pt: "Experiências", fr: "Expériences", en: "Experiences" }, icon: "compass" },
  { id: "more", label: { pt: "Mais", fr: "Plus", en: "More" }, icon: "info" },
];

const MASTER_MARKETS: { code: string; name: Copy; share: number; tone: string }[] = [
  { code: "BR", name: { pt: "Brasil", fr: "Brésil", en: "Brazil" }, share: 44, tone: "forest" },
  { code: "FR", name: { pt: "França", fr: "France", en: "France" }, share: 18, tone: "teal" },
  { code: "US", name: { pt: "Estados Unidos", fr: "États-Unis", en: "United States" }, share: 12, tone: "ocean" },
  { code: "PT", name: { pt: "Portugal", fr: "Portugal", en: "Portugal" }, share: 8, tone: "cyan" },
  { code: "other", name: { pt: "Outros", fr: "Autres", en: "Other" }, share: 17, tone: "sky" },
];

const BellIcon = ({ dot = false }: { dot?: boolean }) => (
  <span className="dip-ministry-bell" aria-hidden="true">
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
    {dot && <i />}
  </span>
);

const MinistryApp = ({ onHub }: { onHub: () => void }) => {
  const { lang, state, toast, t } = useDeep();
  const tx = (copy: Copy) => loc(copy, lang);

  const eventTitle = (name: string) => {
    const labels: Record<string, Copy> = {
      journey_generated: { pt: "Roteiro de viagem criado", fr: "Itinéraire de voyage créé", en: "Travel plan created" },
      experience_viewed: { pt: "Experiência visualizada", fr: "Expérience consultée", en: "Experience viewed" },
      experience_added: { pt: "Experiência adicionada ao roteiro", fr: "Expérience ajoutée à l’itinéraire", en: "Experience added to itinerary" },
      business_interest: { pt: "Oportunidade de negócio explorada", fr: "Opportunité d’affaires consultée", en: "Business opportunity explored" },
      partner_referral: { pt: "Opções de voo TAAG abertas", fr: "Options de vol TAAG ouvertes", en: "TAAG flight options opened" },
      readiness_opened: { pt: "Checklist de viagem aberto", fr: "Checklist de voyage ouverte", en: "Travel checklist opened" },
      travel_intent_confirmed: { pt: "Intenção de viagem confirmada", fr: "Intention de voyage confirmée", en: "Travel intent confirmed" },
      explorer_checkin: { pt: "Check-in do Explorer concluído", fr: "Check-in Explorer terminé", en: "Explorer check-in completed" },
      explorer_log: { pt: "Nova experiência de campo registrada", fr: "Nouvelle expérience terrain enregistrée", en: "New field experience recorded" },
      explorer_feedback: { pt: "Novo sinal de melhoria do destino", fr: "Nouveau signal d’amélioration de la destination", en: "New destination improvement signal" },
    };
    return tx(labels[name] ?? { pt: "Nova atividade na plataforma", fr: "Nouvelle activité sur la plateforme", en: "New platform activity" });
  };

  const eventSource = (source: string) => (source === "explorer" ? "DIP Explorer" : "DIP Public");

  const budgetLabel = (value: string) => {
    const labels: Record<string, Copy> = {
      essential: { pt: "Essencial", fr: "Essentiel", en: "Essential" },
      comfort: { pt: "Conforto", fr: "Confort", en: "Comfort" },
      premium: { pt: "Premium", fr: "Premium", en: "Premium" },
    };
    return tx(labels[value] ?? { pt: value, fr: value, en: value });
  };

  const [view, setView] = useState<PrimaryView>("overview");
  const [experienceView, setExperienceView] = useState<ExperienceView>("journeys");
  const [moreView, setMoreView] = useState<MoreView>(null);
  const [modal, setModal] = useState<ModalState>(null);
  const [query, setQuery] = useState("");
  const [marketFilter, setMarketFilter] = useState("all");
  const [campaignFilter, setCampaignFilter] = useState<"all" | CampaignStatus>("all");
  const [campaignStatuses, setCampaignStatuses] = useState<Record<string, CampaignStatus>>(() =>
    Object.fromEntries(CAMPAIGNS.map((campaign) => [campaign.id, campaign.status as CampaignStatus])),
  );
  const [reviewedSignals, setReviewedSignals] = useState<string[]>([]);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [desktopPeriod, setDesktopPeriod] = useState("aug24");

  const fmt = (value: number) =>
    new Intl.NumberFormat(lang === "pt" ? "pt-BR" : lang === "fr" ? "fr-FR" : "en-US").format(value);

  const liveActivity = useMemo(() => [...state.events].sort((a, b) => b.at - a.at).slice(0, 8), [state.events]);

  const travelers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return TRAVELERS.filter((traveler) => {
      const matchesMarket = marketFilter === "all" || traveler.market === marketFilter;
      const matchesQuery =
        !normalized ||
        traveler.id.toLowerCase().includes(normalized) ||
        traveler.name.toLowerCase().includes(normalized) ||
        traveler.interests.some((interest) => interest.toLowerCase().includes(normalized)) ||
        traveler.market.toLowerCase().includes(normalized);
      return matchesMarket && matchesQuery;
    });
  }, [marketFilter, query]);

  const campaigns = CAMPAIGNS.filter(
    (campaign) => campaignFilter === "all" || campaignStatuses[campaign.id] === campaignFilter,
  );

  const feedback = useMemo(
    () => [
      ...state.feedback.map((item) => ({
        id: item.id,
        author: item.author,
        text: item.text,
        kind: item.kind,
        date: item.date,
        live: true,
      })),
      ...BASE_FEEDBACK.map((item) => ({
        id: item.id,
        author: item.author,
        text: loc(item.text, lang),
        kind: item.kind,
        date: item.date,
        live: false,
      })),
    ],
    [lang, state.feedback],
  );

  const navigate = (next: PrimaryView) => {
    setView(next);
    setMoreView(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openMarket = (code: string) => {
    setMarketFilter(code === "other" ? "all" : code);
    navigate("travelers");
  };

  const cycleCampaign = (id: string) => {
    const order: CampaignStatus[] = ["draft", "planned", "live"];
    const current = campaignStatuses[id];
    const next = order[(order.indexOf(current) + 1) % order.length];
    setCampaignStatuses((previous) => ({ ...previous, [id]: next }));
    toast(
      tx({
        pt: `Campanha atualizada para ${next}`,
        fr: `Campagne mise à jour : ${next}`,
        en: `Campaign updated to ${next}`,
      }),
    );
  };

  const renderOverview = () => {
    const metrics = [
      {
        label: { pt: "Lugares documentados", fr: "Lieux documentés", en: "Places documented" },
        value: 12 + state.explorerCheckins.length,
        context: { pt: "Experiências registradas", fr: "Expériences enregistrées", en: "Experiences registered" },
        action: () => navigate("experiences"),
      },
      {
        label: { pt: "Pessoas alcançadas", fr: "Personnes touchées", en: "People reached" },
        value: 486000,
        context: { pt: "Nos mercados ativos", fr: "Sur les marchés actifs", en: "Across active markets" },
        action: () => navigate("travelers"),
      },
      {
        label: { pt: "Ações positivas", fr: "Actions positives", en: "Positive actions" },
        value: 47 + state.events.length,
        context: { pt: "Public e Explorer", fr: "Public et Explorer", en: "Public and Explorer" },
        action: () => navigate("campaigns"),
      },
      {
        label: { pt: "Dias em campo", fr: "Jours sur le terrain", en: "Field days" },
        value: 23,
        context: { pt: "Atividade da missão", fr: "Activité de la mission", en: "Mission activity" },
        action: () => navigate("experiences"),
      },
    ];

    return (
      <>
        <section className="dip-ministry-greeting" aria-labelledby="ministry-greeting-title">
          <div>
            <h1 id="ministry-greeting-title">{tx({ pt: "Bom dia!", fr: "Bonjour !", en: "Good morning!" })}</h1>
            <p>
              {tx({
                pt: "Aqui está o resumo de hoje.",
                fr: "Voici le résumé du jour.",
                en: "Here is today's summary.",
              })}
            </p>
          </div>
        </section>

        <section aria-labelledby="ministry-overview-title">
          <h2 id="ministry-overview-title" className="dip-ministry-sectiontitle">
            {tx({ pt: "Visão geral", fr: "Vue d’ensemble", en: "Overview" })}
          </h2>
          <div className="dip-ministry-kpis">
            {metrics.map((metric) => (
              <button key={metric.label.pt} type="button" className="dip-ministry-kpi" onClick={metric.action}>
                <span className="dip-ministry-kpi__label">{tx(metric.label)}</span>
                <strong>{fmt(metric.value)}</strong>
                <span className="dip-ministry-kpi__context">{tx(metric.context)}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="dip-ministry-markets" aria-labelledby="ministry-markets-title">
          <h2 id="ministry-markets-title" className="dip-ministry-sectiontitle">
            {tx({ pt: "Mercados em destaque", fr: "Marchés en vedette", en: "Featured markets" })}
          </h2>
          <div className="dip-ministry-marketlist">
            {MASTER_MARKETS.map((market) => (
              <button
                key={market.code}
                type="button"
                className="dip-ministry-marketrow"
                onClick={() => openMarket(market.code)}
              >
                <span>{tx(market.name)}</span>
                <span className="dip-ministry-marketbar" aria-hidden="true">
                  <i
                    className={`dip-ministry-marketbar__fill dip-ministry-marketbar__fill--${market.tone}`}
                    style={{ width: `${Math.min(100, market.share * 2.15)}%` }}
                  />
                </span>
                <strong>{market.share}%</strong>
                <Icon name="arrow" size={17} />
              </button>
            ))}
          </div>
          <div className="dip-ministry-demo">
            <DemoFlag>{t("common.demo")}</DemoFlag>
          </div>
        </section>

        <button
          type="button"
          className="dip-ministry-sgat"
          onClick={() => {
            navigate("more");
            setMoreView("settings");
          }}
        >
          <span className="dip-ministry-sgat__badge">
            <i aria-hidden="true" /> SGAT · {tx({ pt: "Conectado", fr: "Connecté", en: "Connected" })}
          </span>
          <strong>{tx({ pt: "Infraestrutura oficial de turismo", fr: "Infrastructure touristique officielle", en: "Official tourism infrastructure" })}</strong>
          <p>
            {tx({
              pt: "O DIP conecta sinais de demanda internacional e experiências de campo ao SGAT, complementando e-Administration e e-Tourism.",
              fr: "Le DIP relie les signaux de demande internationale et les expériences terrain au SGAT, en complément de e-Administration et e-Tourism.",
              en: "DIP connects international demand signals and field experiences to SGAT, complementing e-Administration and e-Tourism.",
            })}
          </p>
          <span className="dip-ministry-sgat__links">e-Administration · e-Tourism · Data</span>
          <Icon name="arrow" size={18} />
        </button>
      </>
    );
  };

  const renderDesktopOverview = () => {
    const referralExtra = state.events.filter((event) => event.name === "partner_referral").length;
    const journeyExtra = state.events.filter((event) => event.name === "journey_generated").length;
    const desktopMetrics = [
      {
        label: { pt: "Visitantes interessados", fr: "Visiteurs intéressés", en: "Interested visitors" },
        value: 12458,
        delta: 18,
        action: () => navigate("travelers"),
      },
      {
        label: { pt: "Pacotes inscritos", fr: "Forfaits inscrits", en: "Registered packages" },
        value: 4327 + journeyExtra,
        delta: 23,
        action: () => {
          setExperienceView("journeys");
          navigate("experiences");
        },
      },
      {
        label: { pt: "Cliques por parceiro", fr: "Clics par partenaire", en: "Partner clicks" },
        value: 2890 + referralExtra,
        delta: 15,
        action: () => {
          setMoreView("partners");
          setView("more");
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      },
      {
        label: { pt: "Expectativas registradas", fr: "Attentes enregistrées", en: "Registered expectations" },
        value: 1256 + state.feedback.length,
        delta: 18,
        action: () => {
          setExperienceView("signals");
          navigate("experiences");
        },
      },
    ];
    const topVisitors = [
      {
        creatorId: "albie",
        name: "Alain Man",
        market: "Paris",
        reach: "2,3M",
        clicks: "1.346",
        image: "/deep/albie.jpg",
      },
      { creatorId: "c-2", name: "Marie Claire", market: "François", reach: "1,5M", clicks: "842", initials: "MC" },
      { creatorId: "c-3", name: "James Will", market: "EUA", reach: "800k", clicks: "601", initials: "JW" },
    ];

    return (
      <section className="dip-ministry-desktop-dashboard" aria-labelledby="ministry-desktop-title">
        <div className="dip-ministry-desktop-topbar">
          <h1 id="ministry-desktop-title">{tx({ pt: "Visão geral", fr: "Vue d’ensemble", en: "Overview" })}</h1>
          <div className="dip-ministry-desktop-topbar__actions">
            <LangSwitcher />
            <button
              type="button"
              className="dip-ministry-sgat-pill"
              onClick={() => {
                navigate("more");
                setMoreView("settings");
              }}
            >
              <i aria-hidden="true" /> SGAT · {tx({ pt: "Conectado", fr: "Connecté", en: "Connected" })}
            </button>
            <label className="dip-ministry-period">
              <span>{tx({ pt: "Período", fr: "Période", en: "Period" })}</span>
              <select
                value={desktopPeriod}
                onChange={(event) => setDesktopPeriod(event.target.value)}
                aria-label={tx({ pt: "Selecionar período", fr: "Sélectionner la période", en: "Select period" })}
              >
                <option value="aug24">01 – 31 ago. 2024</option>
                <option value="sep24">01 – 30 set. 2024</option>
                <option value="q3">3º trimestre 2024</option>
              </select>
            </label>
            <button
              type="button"
              className="dip-ministry-export"
              onClick={() => setModal({ kind: "report", id: "r-1" })}
            >
              <Icon name="file" size={20} />
              {tx({ pt: "Exportar relatório", fr: "Exporter le rapport", en: "Export report" })}
            </button>
          </div>
        </div>

        <div className="dip-ministry-desktop-kpis">
          {desktopMetrics.map((metric) => (
            <button key={metric.label.pt} type="button" className="dip-ministry-desktop-kpi" onClick={metric.action}>
              <span>{tx(metric.label)}</span>
              <strong>{fmt(metric.value)}</strong>
              <small>
                <b aria-hidden="true">↑</b> {metric.delta}%{" "}
                <i>{tx({ pt: "vs. anterior", fr: "vs. précédent", en: "vs. previous" })}</i>
              </small>
            </button>
          ))}
        </div>

        <div className="dip-ministry-desktop-insights">
          <section className="dip-ministry-desktop-card dip-ministry-region-card" aria-labelledby="region-title">
            <h2 id="region-title">
              {tx({ pt: "Visitantes por região", fr: "Visiteurs par région", en: "Visitors by region" })}
            </h2>
            <svg
              className="dip-ministry-worldmap"
              viewBox="0 0 620 270"
              role="img"
              aria-label={tx({
                pt: "Mapa mundial com mercados destacados",
                fr: "Carte mondiale des marchés",
                en: "World map with highlighted markets",
              })}
            >
              <g className="land">
                <path d="M28 58 67 28l66 3 42 21 38-4 29 21-23 23-31 3-22 34-44 13-22-17-38-1-27-34z" />
                <path d="m143 146 32 9 23 34-6 41-20 28-18-26-3-32-18-29z" />
                <path d="m265 52 31-19 51 5 27 20-9 19-31 5-15 19-37-3-18-20z" />
                <path d="m312 104 45-12 42 17 8 38-18 42-32 50-28-13-10-43-27-31z" />
                <path d="m382 47 76-21 91 22 36 34-31 30-53-7-34 20-41-7-14-31-42-15z" />
                <path d="m505 171 39-16 47 19-7 35-45 19-35-24z" />
                <path d="m180 33 19-15 26 8-8 22-28 2z" />
              </g>
              <g className="active">
                <path d="m63 98 42 1 18 29-23 15-38-9-18-20z" />
                <path d="m286 59 17-7 12 8-4 20-22 3-9-13z" />
                <path d="m318 112 25-4 13 15-10 17-22-2-12-12z" />
                <path d="m372 75 17-8 16 10-9 14-20 1z" />
              </g>
            </svg>
            <div className="dip-ministry-region-list">
              {MASTER_MARKETS.map((market) => (
                <button type="button" key={market.code} onClick={() => openMarket(market.code)}>
                  <span className={`dot dot--${market.tone}`} />
                  <span>{tx(market.name)}</span>
                  <i aria-hidden="true">
                    <b className={`bar bar--${market.tone}`} style={{ width: `${Math.max(12, market.share * 2)}%` }} />
                  </i>
                  <strong>{market.share}%</strong>
                </button>
              ))}
            </div>
          </section>

          <section className="dip-ministry-desktop-card dip-ministry-goals-card" aria-labelledby="goals-title">
            <h2 id="goals-title">{tx({ pt: "Objetivos de viagem", fr: "Objectifs de voyage", en: "Travel goals" })}</h2>
            <div className="dip-ministry-goals-content">
              <div
                className="dip-ministry-donut"
                role="img"
                aria-label={tx({
                  pt: "Distribuição dos objetivos de viagem",
                  fr: "Répartition des objectifs",
                  en: "Travel goals distribution",
                })}
              >
                <span />
              </div>
              <ul>
                <li>
                  <i className="goal-dot goal-dot--1" />
                  <span>{tx({ pt: "Lazer", fr: "Loisirs", en: "Leisure" })}</span>
                  <strong>45%</strong>
                </li>
                <li>
                  <i className="goal-dot goal-dot--2" />
                  <span>{tx({ pt: "Negócios", fr: "Affaires", en: "Business" })}</span>
                  <strong>20%</strong>
                </li>
                <li>
                  <i className="goal-dot goal-dot--3" />
                  <span>{tx({ pt: "Eventos", fr: "Événements", en: "Events" })}</span>
                  <strong>30%</strong>
                </li>
                <li>
                  <i className="goal-dot goal-dot--4" />
                  <span>{tx({ pt: "Estudos", fr: "Études", en: "Studies" })}</span>
                  <strong>5%</strong>
                </li>
              </ul>
            </div>
          </section>

          <section className="dip-ministry-desktop-card dip-ministry-topvisitors" aria-labelledby="top-visitors-title">
            <h2 id="top-visitors-title">
              {tx({ pt: "Top visitantes", fr: "Meilleurs visiteurs", en: "Top visitors" })}
            </h2>
            <div>
              {topVisitors.map((visitor) => (
                <button
                  type="button"
                  key={visitor.creatorId}
                  onClick={() => setModal({ kind: "creator", id: visitor.creatorId })}
                >
                  {visitor.image ? (
                    <img src={visitor.image} alt="" />
                  ) : (
                    <span className="dip-ministry-visitor-avatar">{visitor.initials}</span>
                  )}
                  <span>
                    <strong>
                      {visitor.name} <i>({visitor.market})</i>
                    </strong>
                    <small>
                      {tx({ pt: "Alcance", fr: "Portée", en: "Reach" })} {visitor.reach} <b>•</b>{" "}
                      {tx({ pt: "Cliques", fr: "Clics", en: "Clicks" })} {visitor.clicks}
                    </small>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="dip-ministry-desktop-bottomgrid">
          <section className="dip-ministry-desktop-card dip-ministry-feature-card">
            <h2>{tx({ pt: "Experiência ativa", fr: "Expérience active", en: "Active experience" })}</h2>
            <button
              type="button"
              className="dip-ministry-feature-card__body"
              onClick={() => setModal({ kind: "journey", id: "j-8801" })}
            >
              <img src="/deep/grand-bassam.jpg" alt="" />
              <span>
                <strong>Buati Ambarakou</strong>
                <small>{tx({ pt: "Aventura", fr: "Aventure", en: "Adventure" })}</small>
                <em>08 – 15 out. 2024</em>
              </span>
              <i>{tx({ pt: "Ativo", fr: "Actif", en: "Active" })}</i>
            </button>
            <div className="dip-ministry-mini-progress">
              <span>
                <i />
              </span>
              <strong>72%</strong>
            </div>
          </section>

          <section className="dip-ministry-desktop-card dip-ministry-feature-card dip-ministry-partner-card">
            <h2>{tx({ pt: "Parceiro em destaque", fr: "Partenaire à la une", en: "Featured partner" })}</h2>
            <button
              type="button"
              className="dip-ministry-feature-card__body"
              onClick={() => setModal({ kind: "partner", id: "taag" })}
            >
              <span className="dip-ministry-taag-mark">TAAG</span>
              <span>
                <strong>TAAG</strong>
                <small>Official Travel Partner</small>
              </span>
              <i>{tx({ pt: "Ativo", fr: "Actif", en: "Active" })}</i>
            </button>
            <div className="dip-ministry-partner-clicks">
              {tx({ pt: "Cliques", fr: "Clics", en: "Clicks" })} {fmt(1346 + referralExtra)}
            </div>
          </section>

          <section className="dip-ministry-desktop-card dip-ministry-feedback-card">
            <h2>{tx({ pt: "Feedback recente", fr: "Retour récent", en: "Recent feedback" })}</h2>
            <div className="dip-ministry-feedback-card__summary">
              <span>
                <Icon name="chat" size={22} />
              </span>
              <div>
                <strong>
                  {tx({
                    pt: "Sondage Satisfação turistas",
                    fr: "Sondage satisfaction touristes",
                    en: "Tourist satisfaction survey",
                  })}
                </strong>
                <small>
                  {tx({
                    pt: "Respondido por 52 visitantes",
                    fr: "Répondu par 52 visiteurs",
                    en: "Answered by 52 visitors",
                  })}
                </small>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setExperienceView("signals");
                navigate("experiences");
              }}
            >
              {tx({ pt: "Ver todos os feedbacks", fr: "Voir tous les retours", en: "View all feedback" })}
            </button>
          </section>
        </div>
      </section>
    );
  };

  const renderTravelers = () => (
    <section className="dip-ministry-page" aria-labelledby="travelers-title">
      <div className="dip-ministry-pagehead">
        <div>
          <span>
            {tx({ pt: "INTELIGÊNCIA DE DEMANDA", fr: "INTELLIGENCE DE LA DEMANDE", en: "DEMAND INTELLIGENCE" })}
          </span>
          <h1 id="travelers-title">{tx({ pt: "Visitantes", fr: "Visiteurs", en: "Visitors" })}</h1>
          <p>
            {tx({
              pt: "Perfis e sinais de intenção por mercado.",
              fr: "Profils et signaux d’intention par marché.",
              en: "Profiles and intent signals by market.",
            })}
          </p>
        </div>
        <strong>{travelers.length}</strong>
      </div>

      <label className="dip-ministry-search">
        <span className="dip-ministry-sr">
          {tx({ pt: "Buscar visitantes", fr: "Rechercher des visiteurs", en: "Search visitors" })}
        </span>
        <Icon name="users" size={19} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={tx({
            pt: "Buscar nome, ID, mercado ou interesse",
            fr: "Rechercher nom, ID, marché ou intérêt",
            en: "Search name, ID, market or interest",
          })}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label={tx({ pt: "Limpar busca", fr: "Effacer la recherche", en: "Clear search" })}
          >
            ×
          </button>
        )}
      </label>

      <div
        className="dip-ministry-filterrail"
        role="group"
        aria-label={tx({ pt: "Filtrar por mercado", fr: "Filtrer par marché", en: "Filter by market" })}
      >
        <button type="button" aria-pressed={marketFilter === "all"} onClick={() => setMarketFilter("all")}>
          {tx({ pt: "Todos", fr: "Tous", en: "All" })}
        </button>
        {MARKETS.slice(0, 5).map((market) => (
          <button
            key={market.code}
            type="button"
            aria-pressed={marketFilter === market.code}
            onClick={() => setMarketFilter(market.code)}
          >
            {market.code}
          </button>
        ))}
      </div>

      {travelers.length === 0 ? (
        <div className="dip-ministry-empty">
          <Icon name="users" size={28} />
          <h2>{tx({ pt: "Nenhum visitante encontrado", fr: "Aucun visiteur trouvé", en: "No visitors found" })}</h2>
          <p>
            {tx({
              pt: "Ajuste a busca ou limpe os filtros.",
              fr: "Ajustez la recherche ou effacez les filtres.",
              en: "Adjust the search or clear the filters.",
            })}
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setMarketFilter("all");
            }}
          >
            {tx({ pt: "Limpar filtros", fr: "Effacer les filtres", en: "Clear filters" })}
          </button>
        </div>
      ) : (
        <div className="dip-ministry-records">
          {travelers.map((traveler) => (
            <button
              key={traveler.id}
              type="button"
              className="dip-ministry-record"
              onClick={() => setModal({ kind: "traveler", id: traveler.id })}
            >
              <span className="dip-ministry-record__avatar">{traveler.market}</span>
              <span className="dip-ministry-record__body">
                <strong>{traveler.name}</strong>
                <small className="dip-ministry-record__id">
                  {tx({ pt: "ID do visitante", fr: "ID visiteur", en: "Visitor ID" })} {traveler.id}
                </small>
                <small>
                  {traveler.lang} · {traveler.duration} {tx({ pt: "dias", fr: "jours", en: "days" })} ·{" "}
                  {budgetLabel(traveler.budget)}
                </small>
                <em>{traveler.interests.join(" · ")}</em>
              </span>
              <span className="dip-ministry-record__meta">
                {loc(traveler.barrier, lang)} <Icon name="arrow" size={16} />
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );

  const renderCampaigns = () => (
    <section className="dip-ministry-page" aria-labelledby="campaigns-title">
      <div className="dip-ministry-pagehead">
        <div>
          <span>
            {tx({ pt: "ATIVAÇÃO INTERNACIONAL", fr: "ACTIVATION INTERNATIONALE", en: "INTERNATIONAL ACTIVATION" })}
          </span>
          <h1 id="campaigns-title">{tx({ pt: "Campanhas", fr: "Campagnes", en: "Campaigns" })}</h1>
          <p>
            {tx({
              pt: "Mercados, creators e parceiros em uma visão única.",
              fr: "Marchés, créateurs et partenaires dans une vue unique.",
              en: "Markets, creators and partners in one view.",
            })}
          </p>
        </div>
        <strong>{campaigns.length}</strong>
      </div>

      <div
        className="dip-ministry-filterrail"
        role="group"
        aria-label={tx({ pt: "Filtrar campanhas", fr: "Filtrer les campagnes", en: "Filter campaigns" })}
      >
        {(["all", "live", "planned", "draft"] as const).map((status) => (
          <button
            key={status}
            type="button"
            aria-pressed={campaignFilter === status}
            onClick={() => setCampaignFilter(status)}
          >
            {status === "all" ? tx({ pt: "Todas", fr: "Toutes", en: "All" }) : status}
          </button>
        ))}
      </div>

      <div className="dip-ministry-campaigns">
        {campaigns.length === 0 && (
          <div className="dip-ministry-empty" role="status">
            <Icon name="megaphone" size={28} />
            <h2>
              {tx({
                pt: "Nenhuma campanha neste status",
                fr: "Aucune campagne avec ce statut",
                en: "No campaigns with this status",
              })}
            </h2>
            <p>
              {tx({
                pt: "O status foi atualizado. Veja todas as campanhas para continuar.",
                fr: "Le statut a été mis à jour. Affichez toutes les campagnes pour continuer.",
                en: "The status was updated. View all campaigns to continue.",
              })}
            </p>
            <button type="button" onClick={() => setCampaignFilter("all")}>
              {tx({ pt: "Ver todas", fr: "Voir toutes", en: "View all" })}
            </button>
          </div>
        )}
        {campaigns.map((campaign) => {
          const status = campaignStatuses[campaign.id];
          return (
            <article key={campaign.id} className="dip-ministry-campaign">
              <button
                type="button"
                className="dip-ministry-campaign__main"
                onClick={() => setModal({ kind: "campaign", id: campaign.id })}
              >
                <span className={`dip-ministry-status dip-ministry-status--${status}`}>{status}</span>
                <strong>{campaign.name}</strong>
                <p>
                  {campaign.market} · {campaign.lang} · {campaign.period}
                </p>
                <dl>
                  <div>
                    <dt>Creator</dt>
                    <dd>{campaign.creator}</dd>
                  </div>
                  <div>
                    <dt>{tx({ pt: "Parceiro", fr: "Partenaire", en: "Partner" })}</dt>
                    <dd>{campaign.partner}</dd>
                  </div>
                  <div>
                    <dt>{tx({ pt: "Intenções", fr: "Intentions", en: "Intents" })}</dt>
                    <dd>{fmt(campaign.intents)}</dd>
                  </div>
                </dl>
              </button>
              <button
                type="button"
                className="dip-ministry-campaign__action"
                onClick={() => cycleCampaign(campaign.id)}
              >
                {tx({ pt: "Avançar status", fr: "Faire avancer", en: "Advance status" })}{" "}
                <Icon name="arrow" size={16} />
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );

  const renderExperiences = () => (
    <section className="dip-ministry-page" aria-labelledby="experiences-title">
      <div className="dip-ministry-pagehead">
        <div>
          <span>{tx({ pt: "SINAIS DO DESTINO", fr: "SIGNAUX DE DESTINATION", en: "DESTINATION SIGNALS" })}</span>
          <h1 id="experiences-title">{tx({ pt: "Experiências", fr: "Expériences", en: "Experiences" })}</h1>
          <p>
            {tx({
              pt: "Jornadas geradas e aprendizados registrados em campo.",
              fr: "Voyages générés et enseignements du terrain.",
              en: "Generated journeys and field insights.",
            })}
          </p>
        </div>
        <strong>{JOURNEYS.length + feedback.length}</strong>
      </div>

      <div
        className="dip-ministry-segments"
        role="tablist"
        aria-label={tx({ pt: "Visões de experiências", fr: "Vues des expériences", en: "Experience views" })}
      >
        {(
          [
            ["journeys", { pt: "Jornadas", fr: "Voyages", en: "Journeys" }],
            ["signals", { pt: "Sinais", fr: "Signaux", en: "Signals" }],
            ["funnel", { pt: "Funil", fr: "Entonnoir", en: "Funnel" }],
          ] as [ExperienceView, Copy][]
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={experienceView === id}
            onClick={() => setExperienceView(id)}
          >
            {tx(label)}
          </button>
        ))}
      </div>

      {experienceView === "journeys" && (
        <div className="dip-ministry-records" role="tabpanel">
          {JOURNEYS.map((journey) => (
            <button
              key={journey.id}
              type="button"
              className="dip-ministry-record"
              onClick={() => setModal({ kind: "journey", id: journey.id })}
            >
              <span className="dip-ministry-record__avatar dip-ministry-record__avatar--journey">
                <Icon name="compass" size={22} />
              </span>
              <span className="dip-ministry-record__body">
                <strong>{journey.id}</strong>
                <small>
                  {journey.market} · {journey.days} {tx({ pt: "dias", fr: "jours", en: "days" })}
                </small>
                <em>
                  {journey.experiences} {tx({ pt: "experiências", fr: "expériences", en: "experiences" })}
                </em>
              </span>
              <span className={`dip-ministry-status dip-ministry-status--${journey.status}`}>{journey.status}</span>
            </button>
          ))}
        </div>
      )}

      {experienceView === "signals" && (
        <ul className="dip-ministry-signals" role="tabpanel">
          {feedback.map((item) => {
            const reviewed = reviewedSignals.includes(item.id);
            return (
              <li key={item.id}>
                <div>
                  <span>
                    {item.author} · {item.date}
                  </span>
                  <p>{item.text}</p>
                  <small>
                    {item.kind}
                    {item.live ? " · live" : ""}
                  </small>
                </div>
                <button
                  type="button"
                  aria-pressed={reviewed}
                  onClick={() =>
                    setReviewedSignals((current) =>
                      reviewed ? current.filter((id) => id !== item.id) : [...current, item.id],
                    )
                  }
                >
                  <Icon name="check" size={16} />{" "}
                  {reviewed
                    ? tx({ pt: "Revisado", fr: "Révisé", en: "Reviewed" })
                    : tx({ pt: "Revisar", fr: "Réviser", en: "Review" })}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {experienceView === "funnel" && (
        <div className="dip-ministry-funnel" role="tabpanel">
          {FUNNEL.map((step, index) => (
            <div key={step.id}>
              <span>
                <strong>{loc(step.label, lang)}</strong>
                <b>{fmt(step.value)}</b>
              </span>
              <i>
                <em style={{ width: `${(step.value / FUNNEL[0].value) * 100}%` }} />
              </i>
              {index < FUNNEL.length - 1 && (
                <small>{Math.round((FUNNEL[index + 1].value / step.value) * 100)}% →</small>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );

  const renderMore = () => {
    if (moreView === "creators") {
      return (
        <section className="dip-ministry-page">
          <button type="button" className="dip-ministry-back" onClick={() => setMoreView(null)}>
            <Icon name="back" size={18} /> {tx({ pt: "Mais", fr: "Plus", en: "More" })}
          </button>
          <h1>{tx({ pt: "Creators", fr: "Créateurs", en: "Creators" })}</h1>
          <div className="dip-ministry-tiles dip-ministry-tiles--details">
            {CREATORS.map((creator) => (
              <button key={creator.id} type="button" onClick={() => setModal({ kind: "creator", id: creator.id })}>
                {creator.id === "albie" ? (
                  <img className="dip-ministry-creator-avatar" src="/deep/albie.jpg" alt={creator.name} />
                ) : (
                  <span className={"dip-ministry-creator-avatar dip-ministry-creator-avatar--" + creator.id} aria-hidden="true">
                    {creator.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                  </span>
                )}
                <strong>{creator.name}</strong>
                <small>
                  {creator.market} · {creator.verified ? "verified" : "pending"}
                </small>
                <b>{fmt(creator.reach)}</b>
                <em>reach</em>
              </button>
            ))}
          </div>
        </section>
      );
    }

    if (moreView === "partners") {
      return (
        <section className="dip-ministry-page">
          <button type="button" className="dip-ministry-back" onClick={() => setMoreView(null)}>
            <Icon name="back" size={18} /> {tx({ pt: "Mais", fr: "Plus", en: "More" })}
          </button>
          <h1>{tx({ pt: "Parceiros", fr: "Partenaires", en: "Partners" })}</h1>
          <div className="dip-ministry-tiles dip-ministry-tiles--details">
            {PARTNERS.map((partner) => (
              <button key={partner.id} type="button" onClick={() => setModal({ kind: "partner", id: partner.id })}>
                <span className="dip-ministry-tileicon">
                  <Icon name="handshake" size={22} />
                </span>
                <strong>{typeof partner.name === "string" ? partner.name : loc(partner.name, lang)}</strong>
                <small>
                  {loc(partner.type, lang)} · {partner.status}
                </small>
                <b>{fmt(partner.referrals)}</b>
                <em>referrals</em>
              </button>
            ))}
          </div>
        </section>
      );
    }

    if (moreView === "reports") {
      return (
        <section className="dip-ministry-page">
          <button type="button" className="dip-ministry-back" onClick={() => setMoreView(null)}>
            <Icon name="back" size={18} /> {tx({ pt: "Mais", fr: "Plus", en: "More" })}
          </button>
          <h1>{tx({ pt: "Relatórios", fr: "Rapports", en: "Reports" })}</h1>
          <div className="dip-ministry-reports">
            {REPORTS.map((report) => (
              <article key={report.id}>
                <span>
                  <Icon name="file" size={22} />
                </span>
                <div>
                  <strong>{loc(report.name, lang)}</strong>
                  <small>
                    {report.period} · {report.format}
                  </small>
                </div>
                <button type="button" onClick={() => setModal({ kind: "report", id: report.id })}>
                  {tx({ pt: "Gerar", fr: "Générer", en: "Generate" })}
                </button>
              </article>
            ))}
          </div>
        </section>
      );
    }

    if (moreView === "settings") {
      return (
        <section className="dip-ministry-page">
          <button type="button" className="dip-ministry-back" onClick={() => setMoreView(null)}>
            <Icon name="back" size={18} /> {tx({ pt: "Mais", fr: "Plus", en: "More" })}
          </button>
          <h1>{tx({ pt: "Configurações", fr: "Paramètres", en: "Settings" })}</h1>
          <div className="dip-ministry-settings">
            <div>
              <strong>
                {tx({ pt: "Idioma da interface", fr: "Langue de l’interface", en: "Interface language" })}
              </strong>
              <LangSwitcher />
            </div>
            <div className="dip-ministry-sgat-detail">
              <span className="dip-ministry-sgat__badge">
                <i aria-hidden="true" /> SGAT · {tx({ pt: "Conectado", fr: "Connecté", en: "Connected" })}
              </span>
              <strong>DIP + SGAT</strong>
              <p>
                {tx({
                  pt: "O SGAT organiza e-Administration, e-Tourism e valorização de dados. O DIP acrescenta experiência, campanha e inteligência internacional sem substituir a infraestrutura oficial.",
                  fr: "Le SGAT organise e-Administration, e-Tourism et la valorisation des données. Le DIP ajoute expérience, campagne et intelligence internationale sans remplacer l’infrastructure officielle.",
                  en: "SGAT organizes e-Administration, e-Tourism and data valorization. DIP adds experience, campaigns and international intelligence without replacing the official infrastructure.",
                })}
              </p>
              <div className="dip-ministry-sgat__chips">
                <span>e-Administration</span><span>e-Tourism</span><span>Data</span>
              </div>
            </div>
            <div>
              <strong>{tx({ pt: "Governança de dados", fr: "Gouvernance des données", en: "Data governance" })}</strong>
              <p>
                {tx({
                  pt: "Demonstração local: nenhum dado sai deste dispositivo.",
                  fr: "Démonstration locale : aucune donnée ne quitte cet appareil.",
                  en: "Local demonstration: no data leaves this device.",
                })}
              </p>
            </div>
            <button type="button" className="dip-ministry-hubbutton" onClick={onHub}>
              <Icon name="grid" size={18} />{" "}
              {tx({
                pt: "Voltar às perspectivas DIP",
                fr: "Retour aux perspectives DIP",
                en: "Back to DIP perspectives",
              })}
            </button>
          </div>
        </section>
      );
    }

    const moreTiles: { id: Exclude<MoreView, null>; title: Copy; subtitle: Copy; icon: string }[] = [
      {
        id: "creators",
        title: { pt: "Creators", fr: "Créateurs", en: "Creators" },
        subtitle: { pt: "Performance e alcance", fr: "Performance et portée", en: "Performance and reach" },
        icon: "camera",
      },
      {
        id: "partners",
        title: { pt: "Parceiros", fr: "Partenaires", en: "Partners" },
        subtitle: { pt: "Referrals e ativações", fr: "Referrals et activations", en: "Referrals and activations" },
        icon: "handshake",
      },
      {
        id: "reports",
        title: { pt: "Relatórios", fr: "Rapports", en: "Reports" },
        subtitle: { pt: "Exportações simuladas", fr: "Exports simulés", en: "Simulated exports" },
        icon: "file",
      },
      {
        id: "settings",
        title: { pt: "Configurações", fr: "Paramètres", en: "Settings" },
        subtitle: { pt: "Idioma e governança", fr: "Langue et gouvernance", en: "Language and governance" },
        icon: "settings",
      },
    ];
    return (
      <section className="dip-ministry-page" aria-labelledby="more-title">
        <div className="dip-ministry-pagehead">
          <div>
            <span>DIP MINISTRY</span>
            <h1 id="more-title">{tx({ pt: "Mais", fr: "Plus", en: "More" })}</h1>
            <p>
              {tx({
                pt: "Gestão institucional e configurações.",
                fr: "Gestion institutionnelle et paramètres.",
                en: "Institutional management and settings.",
              })}
            </p>
          </div>
        </div>
        <div className="dip-ministry-tiles">
          {moreTiles.map((tile) => (
            <button key={tile.id} type="button" onClick={() => setMoreView(tile.id)}>
              <span className="dip-ministry-tileicon">
                <Icon name={tile.icon} size={23} />
              </span>
              <strong>{tx(tile.title)}</strong>
              <small>{tx(tile.subtitle)}</small>
              <Icon name="arrow" size={17} />
            </button>
          ))}
          <button type="button" onClick={onHub}>
            <span className="dip-ministry-tileicon">
              <Icon name="grid" size={23} />
            </span>
            <strong>{tx({ pt: "Perspectivas DIP", fr: "Perspectives DIP", en: "DIP perspectives" })}</strong>
            <small>Public · Explorer · Ministry</small>
            <Icon name="arrow" size={17} />
          </button>
        </div>
      </section>
    );
  };

  const modalTitle = () => {
    if (!modal) return "";
    if (modal.kind === "notifications") return tx({ pt: "Notificações e atividade", fr: "Notifications et activité", en: "Notifications and activity" });
    if (modal.kind === "traveler")
      return tx({ pt: "Detalhes do visitante", fr: "Détails du visiteur", en: "Visitor details" });
    if (modal.kind === "campaign")
      return tx({ pt: "Detalhes da campanha", fr: "Détails de la campagne", en: "Campaign details" });
    if (modal.kind === "journey")
      return tx({ pt: "Detalhes da jornada", fr: "Détails du voyage", en: "Journey details" });
    if (modal.kind === "creator")
      return tx({ pt: "Performance do creator", fr: "Performance du créateur", en: "Creator performance" });
    if (modal.kind === "partner")
      return tx({ pt: "Performance do parceiro", fr: "Performance du partenaire", en: "Partner performance" });
    return tx({ pt: "Gerar relatório", fr: "Générer le rapport", en: "Generate report" });
  };

  const renderModal = () => {
    if (!modal) return null;
    if (modal.kind === "notifications") {
      return (
        <div className="dip-ministry-modalcontent">
          <article>
            <span className="dip-ministry-modalicon">
              <Icon name="megaphone" size={20} />
            </span>
            <div>
              <strong>{tx({ pt: "Campanha Brasil em crescimento", fr: "Campagne Brésil en croissance", en: "Brazil campaign is growing" })}</strong>
              <p>+18% {tx({ pt: "em cliques por convite nesta semana.", fr: "de clics sur invitation cette semaine.", en: "invite clicks this week." })}</p>
            </div>
          </article>
          <article>
            <span className="dip-ministry-modalicon">
              <Icon name="signal" size={20} />
            </span>
            <div>
              <strong>{tx({ pt: "Novo sinal de campo", fr: "Nouveau signal terrain", en: "New field signal" })}</strong>
              <p>{tx({ pt: "A sinalização em inglês foi enviada para revisão.", fr: "La signalétique en anglais a été envoyée en révision.", en: "English signage was sent for review." })}</p>
            </div>
          </article>

          <section className="dip-ministry-liveblock" aria-labelledby="ministry-live-title">
            <h3 id="ministry-live-title">{tx({ pt: "Atividade recente da plataforma", fr: "Activité récente de la plateforme", en: "Recent platform activity" })}</h3>
            {liveActivity.length ? (
              <ul className="dip-ministry-activity">
                {liveActivity.map((event) => (
                  <li key={event.id}>
                    <span>{eventSource(event.source)}</span>
                    <div>
                      <strong>{eventTitle(event.name)}</strong>
                      <small>
                        {new Date(event.at).toLocaleTimeString(
                          lang === "pt" ? "pt-BR" : lang === "fr" ? "fr-FR" : "en-US",
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                      </small>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dip-ministry-liveempty">
                {tx({
                  pt: "As ações realizadas no DIP Public e no DIP Explorer aparecerão aqui em linguagem clara.",
                  fr: "Les actions réalisées dans DIP Public et DIP Explorer apparaîtront ici dans un langage clair.",
                  en: "Actions completed in DIP Public and DIP Explorer will appear here in plain language.",
                })}
              </p>
            )}
          </section>

          <button
            type="button"
            className="dip-ministry-modalaction"
            onClick={() => {
              setNotificationsRead(true);
              setModal(null);
            }}
          >
            {notificationsRead
              ? tx({ pt: "Tudo lido", fr: "Tout est lu", en: "All read" })
              : tx({ pt: "Marcar tudo como lido", fr: "Tout marquer comme lu", en: "Mark all as read" })}
          </button>
        </div>
      );
    }
    if (modal.kind === "traveler") {
      const traveler = TRAVELERS.find((item) => item.id === modal.id)!;
      return (
        <dl className="dip-ministry-detailgrid">
          <div className="dip-ministry-detailgrid__wide">
            <dt>{tx({ pt: "Nome", fr: "Nom", en: "Name" })}</dt>
            <dd>{traveler.name}</dd>
          </div>
          <div>
            <dt>{tx({ pt: "ID do visitante", fr: "ID visiteur", en: "Visitor ID" })}</dt>
            <dd>{traveler.id}</dd>
          </div>
          <div>
            <dt>{tx({ pt: "Mercado", fr: "Marché", en: "Market" })}</dt>
            <dd>{traveler.market}</dd>
          </div>
          <div>
            <dt>{tx({ pt: "Duração", fr: "Durée", en: "Duration" })}</dt>
            <dd>
              {traveler.duration} {tx({ pt: "dias", fr: "jours", en: "days" })}
            </dd>
          </div>
          <div>
            <dt>{tx({ pt: "Perfil de orçamento", fr: "Profil budgétaire", en: "Budget profile" })}</dt>
            <dd>{budgetLabel(traveler.budget)}</dd>
          </div>
          <div className="dip-ministry-detailgrid__wide">
            <dt>{tx({ pt: "Interesses", fr: "Intérêts", en: "Interests" })}</dt>
            <dd>{traveler.interests.join(", ")}</dd>
          </div>
          <div className="dip-ministry-detailgrid__wide">
            <dt>{tx({ pt: "Principal barreira", fr: "Principal obstacle", en: "Main barrier" })}</dt>
            <dd>{loc(traveler.barrier, lang)}</dd>
          </div>
        </dl>
      );
    }
    if (modal.kind === "campaign") {
      const campaign = CAMPAIGNS.find((item) => item.id === modal.id)!;
      return (
        <div className="dip-ministry-modalcontent">
          <div className="dip-ministry-modalhero">
            <span className={`dip-ministry-status dip-ministry-status--${campaignStatuses[campaign.id]}`}>
              {campaignStatuses[campaign.id]}
            </span>
            <strong>{campaign.name}</strong>
            <p>{campaign.period}</p>
          </div>
          <dl className="dip-ministry-detailgrid">
            <div>
              <dt>Creator</dt>
              <dd>{campaign.creator}</dd>
            </div>
            <div>
              <dt>{tx({ pt: "Parceiro", fr: "Partenaire", en: "Partner" })}</dt>
              <dd>{campaign.partner}</dd>
            </div>
            <div>
              <dt>{tx({ pt: "Mercado", fr: "Marché", en: "Market" })}</dt>
              <dd>{campaign.market}</dd>
            </div>
            <div>
              <dt>{tx({ pt: "Intenções", fr: "Intentions", en: "Intents" })}</dt>
              <dd>{fmt(campaign.intents)}</dd>
            </div>
          </dl>
          <button type="button" className="dip-ministry-modalaction" onClick={() => cycleCampaign(campaign.id)}>
            {tx({ pt: "Avançar status", fr: "Faire avancer", en: "Advance status" })}
          </button>
        </div>
      );
    }
    if (modal.kind === "journey") {
      const journey = JOURNEYS.find((item) => item.id === modal.id)!;
      return (
        <dl className="dip-ministry-detailgrid">
          <div>
            <dt>ID</dt>
            <dd>{journey.id}</dd>
          </div>
          <div>
            <dt>{tx({ pt: "Mercado", fr: "Marché", en: "Market" })}</dt>
            <dd>{journey.market}</dd>
          </div>
          <div>
            <dt>{tx({ pt: "Duração", fr: "Durée", en: "Duration" })}</dt>
            <dd>
              {journey.days} {tx({ pt: "dias", fr: "jours", en: "days" })}
            </dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{journey.status}</dd>
          </div>
          <div>
            <dt>{tx({ pt: "Experiências", fr: "Expériences", en: "Experiences" })}</dt>
            <dd>{journey.experiences}</dd>
          </div>
          <div>
            <dt>Referral</dt>
            <dd>{journey.referral ? "TAAG" : "—"}</dd>
          </div>
        </dl>
      );
    }
    if (modal.kind === "creator") {
      const creator = CREATORS.find((item) => item.id === modal.id)!;
      return (
        <div className="dip-ministry-modalcontent">
          <div className="dip-ministry-modalhero dip-ministry-modalhero--creator">
            {creator.id === "albie" ? (
              <img className="dip-ministry-creator-avatar" src="/deep/albie.jpg" alt={creator.name} />
            ) : (
              <span className={"dip-ministry-creator-avatar dip-ministry-creator-avatar--" + creator.id} aria-hidden="true">
                {creator.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
              </span>
            )}
            <strong>{creator.name}</strong>
            <p>
              {creator.market} · {creator.verified ? "verified" : "pending"}
            </p>
          </div>
          <dl className="dip-ministry-detailgrid">
            <div>
              <dt>Reach</dt>
              <dd>{fmt(creator.reach)}</dd>
            </div>
            <div>
              <dt>Visits</dt>
              <dd>{fmt(creator.visits)}</dd>
            </div>
            <div>
              <dt>Chats</dt>
              <dd>{fmt(creator.chats)}</dd>
            </div>
            <div>
              <dt>Journeys</dt>
              <dd>{fmt(creator.journeys)}</dd>
            </div>
            <div>
              <dt>TAAG</dt>
              <dd>{fmt(creator.taag)}</dd>
            </div>
            <div>
              <dt>{tx({ pt: "Contribuições", fr: "Contributions", en: "Contributions" })}</dt>
              <dd>{fmt(creator.contributions)}</dd>
            </div>
          </dl>
        </div>
      );
    }
    if (modal.kind === "partner") {
      const partner = PARTNERS.find((item) => item.id === modal.id)!;
      return (
        <div className="dip-ministry-modalcontent">
          <div className="dip-ministry-modalhero">
            <strong>{typeof partner.name === "string" ? partner.name : loc(partner.name, lang)}</strong>
            <p>
              {loc(partner.type, lang)} · {partner.status}
            </p>
          </div>
          <dl className="dip-ministry-detailgrid">
            <div>
              <dt>Referrals</dt>
              <dd>{fmt(partner.referrals)}</dd>
            </div>
            <div>
              <dt>{tx({ pt: "Contextual", fr: "Contextuel", en: "Contextual" })}</dt>
              <dd>
                {partner.contextual ? tx({ pt: "Sim", fr: "Oui", en: "Yes" }) : tx({ pt: "Não", fr: "Non", en: "No" })}
              </dd>
            </div>
          </dl>
        </div>
      );
    }
    const report = REPORTS.find((item) => item.id === modal.id)!;
    return (
      <div className="dip-ministry-modalcontent">
        <div className="dip-ministry-modalhero">
          <strong>{loc(report.name, lang)}</strong>
          <p>
            {report.period} · {report.format}
          </p>
        </div>
        <p>
          {tx({
            pt: "A demonstração vai preparar uma exportação simulada, sem enviar dados para serviços externos.",
            fr: "La démonstration préparera une exportation simulée sans envoyer de données externes.",
            en: "The demo will prepare a simulated export without sending data to external services.",
          })}
        </p>
        <button
          type="button"
          className="dip-ministry-modalaction"
          onClick={() => {
            toast(tx({ pt: "Relatório preparado", fr: "Rapport préparé", en: "Report prepared" }));
            setModal(null);
          }}
        >
          {tx({ pt: "Preparar relatório", fr: "Préparer le rapport", en: "Prepare report" })}
        </button>
      </div>
    );
  };

  const desktopNavItems = [
    {
      key: "overview",
      label: { pt: "Visão geral", fr: "Vue d’ensemble", en: "Overview" },
      icon: "home",
      active: view === "overview",
      action: () => navigate("overview"),
    },
    {
      key: "travelers",
      label: { pt: "Viajantes", fr: "Voyageurs", en: "Travelers" },
      icon: "user",
      active: view === "travelers",
      action: () => navigate("travelers"),
    },
    {
      key: "registrations",
      label: { pt: "Inscrições", fr: "Inscriptions", en: "Registrations" },
      icon: "file",
      active: view === "experiences" && experienceView === "journeys",
      action: () => {
        setExperienceView("journeys");
        navigate("experiences");
      },
    },
    {
      key: "campaigns",
      label: { pt: "Campanhas", fr: "Campagnes", en: "Campaigns" },
      icon: "megaphone",
      active: view === "campaigns",
      action: () => navigate("campaigns"),
    },
    {
      key: "creators",
      label: { pt: "Criadores", fr: "Créateurs", en: "Creators" },
      icon: "users",
      active: view === "more" && moreView === "creators",
      action: () => {
        setMoreView("creators");
        setView("more");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    {
      key: "partners",
      label: { pt: "Parceiros", fr: "Partenaires", en: "Partners" },
      icon: "handshake",
      active: view === "more" && moreView === "partners",
      action: () => {
        setMoreView("partners");
        setView("more");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    {
      key: "feedback",
      label: { pt: "Feedbacks", fr: "Retours", en: "Feedback" },
      icon: "chat",
      active: view === "experiences" && experienceView === "signals",
      action: () => {
        setExperienceView("signals");
        navigate("experiences");
      },
    },
    {
      key: "reports",
      label: { pt: "Relatórios", fr: "Rapports", en: "Reports" },
      icon: "file",
      active: view === "more" && moreView === "reports",
      action: () => {
        setMoreView("reports");
        setView("more");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    {
      key: "settings",
      label: { pt: "Configurações", fr: "Paramètres", en: "Settings" },
      icon: "settings",
      active: view === "more" && moreView === "settings",
      action: () => {
        setMoreView("settings");
        setView("more");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
  ];

  return (
    <div className="deep-ministry dip-ministry-app">
      <aside className="dip-ministry-sidebar" aria-label="DIP Ministry">
        <button type="button" className="dip-ministry-sidebar__brand" onClick={onHub}>
          DIP <span>MINISTRY</span>
        </button>
        <nav>
          {desktopNavItems.map((item) => (
            <button key={item.key} type="button" aria-current={item.active ? "page" : undefined} onClick={item.action}>
              <Icon name={item.icon} size={20} /> {tx(item.label)}
            </button>
          ))}
        </nav>
        <div className="dip-ministry-sidebar__footer">
          <button type="button" className="dip-ministry-sidebar__hub" onClick={onHub}>
            <Icon name="grid" size={18} /> Public · Explorer · Ministry
          </button>
          <div
            className="dip-ministry-sidebar__institution"
            aria-label="Ministério do Turismo e das Artes, Côte d’Ivoire"
          >
            <span aria-hidden="true">🇨🇮</span>
            <strong>
              Ministério do Turismo
              <br />e das Artes
            </strong>
            <small>Côte d’Ivoire</small>
          </div>
        </div>
      </aside>

      <div className="dip-ministry-shell">
        <header className="dip-ministry-header">
          <div className="dip-ministry-header__identity">
            <button
              type="button"
              className="dip-ministry-hubicon"
              onClick={onHub}
              aria-label={tx({
                pt: "Voltar às perspectivas DIP",
                fr: "Retour aux perspectives DIP",
                en: "Back to DIP perspectives",
              })}
            >
              <Icon name="grid" size={20} />
            </button>
            <button
              type="button"
              className="dip-ministry-brand"
              onClick={onHub}
              aria-label={tx({
                pt: "Voltar às perspectivas DIP",
                fr: "Retour aux perspectives DIP",
                en: "Back to DIP perspectives",
              })}
            >
              DIP <span>MINISTRY</span>
            </button>
          </div>
          <LangSwitcher />
          <div className="dip-ministry-header__actions">
            <button
              type="button"
              onClick={() => setModal({ kind: "notifications" })}
              aria-label={tx({
                pt: notificationsRead ? "Notificações, tudo lido" : "Notificações não lidas",
                fr: notificationsRead ? "Notifications, tout est lu" : "Notifications non lues",
                en: notificationsRead ? "Notifications, all read" : "Unread notifications",
              })}
            >
              <BellIcon dot={liveActivity.length > 0} />
              {!notificationsRead && <span className="dip-ministry-count">{2 + liveActivity.length}</span>}
            </button>
          </div>
        </header>

        <main className="dip-ministry-content">
          {view === "overview" && (
            <>
              <div className="dip-ministry-mobile-overview">{renderOverview()}</div>
              <div className="dip-ministry-desktop-overview">{renderDesktopOverview()}</div>
            </>
          )}
          {view === "travelers" && renderTravelers()}
          {view === "campaigns" && renderCampaigns()}
          {view === "experiences" && renderExperiences()}
          {view === "more" && renderMore()}
        </main>

        <nav className="dip-ministry-bottom" aria-label="DIP Ministry">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={view === item.id ? "page" : undefined}
              onClick={() => navigate(item.id)}
            >
              <Icon name={item.icon} size={23} />
              <span>{tx(item.label)}</span>
            </button>
          ))}
        </nav>
      </div>

      <Modal open={modal !== null} onClose={() => setModal(null)} title={modalTitle()}>
        {renderModal()}
      </Modal>
    </div>
  );
};

export default MinistryApp;
