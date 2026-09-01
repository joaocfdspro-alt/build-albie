import { useEffect, useState } from "react";
import { useDeep, type FeedbackKind } from "./store";
import { AGENDA, MISSION_OBJECTIVES, SUPPORT_CONTACTS } from "./data";
import { ChipGroup, Icon, loc } from "./ui";

type Screen = "home" | "mission" | "agenda" | "checkin" | "log" | "feedback" | "support" | "sent";

const copy = {
  home: { pt: "Início", fr: "Accueil", en: "Home" },
  explore: { pt: "Explorar", fr: "Explorer", en: "Explore" },
  agenda: { pt: "Agenda", fr: "Agenda", en: "Agenda" },
  profile: { pt: "Perfil", fr: "Profil", en: "Profile" },
  mission: { pt: "Missão", fr: "Mission", en: "Mission" },
};

const MiniIcon = ({
  name,
  size = 24,
}: {
  name: "bell" | "audio" | "route" | "star" | "photo" | "close";
  size?: number;
}) => {
  const paths = {
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    audio: (
      <>
        <rect x="9" y="3" width="6" height="12" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
        <path d="M8 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3" />
      </>
    ),
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" />,
    photo: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="m21 15-5-5L5 19" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
};

const ExplorerApp = ({ onHub }: { onHub: () => void }) => {
  const { t, lang, setLang, state, addCheckin, addFeedback, pushEvent, toast } = useDeep();
  const [screen, setScreen] = useState<Screen>("home");
  const [langOpen, setLangOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(AGENDA[0]?.id ?? "day-1");
  const [logText, setLogText] = useState("");
  const [logPlace, setLogPlace] = useState("Grand-Bassam");
  const [logRating, setLogRating] = useState("5");
  const [capture, setCapture] = useState<"photo" | "audio" | "note">("photo");
  const [fbText, setFbText] = useState("");
  const [fbKind, setFbKind] = useState<FeedbackKind>("institutional");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const doneTasks = Math.min(8, 4 + state.explorerCheckins.length + state.feedback.length);
  const pct = Math.round((doneTasks / 8) * 100);
  const activeDay = AGENDA.find((day) => day.id === selectedDay) ?? AGENDA[0];

  useEffect(() => {
    document.title = `${loc(copy.explore, lang)} · DIP`;
  }, [lang]);

  const go = (next: Screen) => {
    setScreen(next);
    setError(null);
    setLangOpen(false);
    setNoticeOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitFeedback = () => {
    if (fbText.trim().length < 8) {
      setError(
        loc(
          {
            pt: "Conte em uma frase o que precisa melhorar.",
            fr: "Décrivez en une phrase ce qui doit être amélioré.",
            en: "Describe what needs improving in one sentence.",
          },
          lang,
        ),
      );
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      addFeedback({ author: "Albie Man", kind: fbKind, text: fbText.trim(), status: "classified" });
      pushEvent({
        name: "explorer_feedback",
        source: "explorer",
        label: `Destination improvement signal · ${fbKind}`,
        meta: { kind: fbKind },
      });
      toast(lang === "pt" ? "Sinal de melhoria enviado → Ministry" : lang === "fr" ? "Signal d’amélioration envoyé → Ministry" : "Improvement signal sent → Ministry");
      setSending(false);
      setFbText("");
      go("sent");
    }, 450);
  };

  const Top = ({ back = false, title }: { back?: boolean; title?: string }) => (
    <header className={`dip-explorer-top${screen === "home" ? " dip-explorer-top--hero" : ""}`}>
      {back ? (
        <button
          type="button"
          className="dip-explorer-iconbtn dip-explorer-iconbtn--back"
          onClick={() => go("home")}
          aria-label={loc({ pt: "Voltar", fr: "Retour", en: "Back" }, lang)}
        >
          <Icon name="back" size={24} />
        </button>
      ) : (
        <button
          type="button"
          className="dip-explorer-brand"
          onClick={onHub}
          aria-label={loc(
            { pt: "Voltar às áreas do DIP", fr: "Retour aux espaces DIP", en: "Back to DIP areas" },
            lang,
          )}
        >
          DIP EXPLORER
        </button>
      )}
      {title && <h1 className="dip-explorer-top__title">{title}</h1>}
      <div className="dip-explorer-top__actions">
        <div className="dip-explorer-popoverwrap">
          <button
            type="button"
            className="dip-explorer-langbtn"
            onClick={() => {
              setLangOpen(!langOpen);
              setNoticeOpen(false);
            }}
            aria-expanded={langOpen}
            aria-label="Language / Idioma / Langue"
          >
            {lang.toUpperCase()}
          </button>
          {langOpen && (
            <div
              className="dip-explorer-popover dip-explorer-language"
              role="group"
              aria-label="Language / Idioma / Langue"
            >
              {(
                [
                  { id: "pt", flag: "🇧🇷", label: "Português" },
                  { id: "en", flag: "🇺🇸", label: "English" },
                  { id: "fr", flag: "🇫🇷", label: "Français" },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={lang === item.id}
                  onClick={() => {
                    setLang(item.id);
                    setLangOpen(false);
                  }}
                >
                  <span aria-hidden="true">{item.flag}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        {!back && (
          <div className="dip-explorer-popoverwrap">
            <button
              type="button"
              className="dip-explorer-iconbtn"
              onClick={() => {
                setNoticeOpen(!noticeOpen);
                setLangOpen(false);
              }}
              aria-expanded={noticeOpen}
              aria-label={loc({ pt: "Notificações", fr: "Notifications", en: "Notifications" }, lang)}
            >
              <MiniIcon name="bell" size={25} />
              <span className="dip-explorer-notice-dot" />
            </button>
            {noticeOpen && (
              <div className="dip-explorer-popover dip-explorer-notice" role="status">
                <strong>
                  {loc({ pt: "Sua próxima atividade", fr: "Votre prochaine activité", en: "Your next activity" }, lang)}
                </strong>
                <span>
                  09:00 · {loc({ pt: "Circuito pelo Plateau", fr: "Circuit du Plateau", en: "Plateau circuit" }, lang)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );

  const Bottom = () => {
    const nav: { id: Screen; label: string; icon: string; central?: boolean }[] = [
      { id: "home", label: loc(copy.home, lang), icon: "home" },
      { id: "mission", label: loc(copy.explore, lang), icon: "compass" },
      { id: "log", label: loc({ pt: "Registrar", fr: "Ajouter", en: "Log" }, lang), icon: "plus", central: true },
      { id: "agenda", label: loc(copy.agenda, lang), icon: "calendar" },
      { id: "support", label: loc(copy.profile, lang), icon: "user" },
    ];
    return (
      <nav className="dip-explorer-bottom" aria-label="DIP Explorer">
        {nav.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`dip-explorer-bottom__item${item.central ? " dip-explorer-bottom__item--central" : ""}`}
            aria-current={screen === item.id ? "page" : undefined}
            aria-label={item.label}
            onClick={() => go(item.id)}
          >
            <span className="dip-explorer-bottom__icon">
              <Icon name={item.icon} size={item.central ? 31 : 25} />
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    );
  };

  const PageHeader = ({ step, title, lead }: { step: string; title: string; lead?: string }) => (
    <div className="dip-explorer-pagehead">
      <span>{step}</span>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );

  const desktopNavItems = [
    {
      key: "home",
      label: { pt: "Painel", fr: "Tableau", en: "Dashboard" },
      icon: "home",
      active: screen === "home",
      action: () => go("home"),
    },
    {
      key: "mission",
      label: { pt: "Missões", fr: "Missions", en: "Missions" },
      icon: "map",
      active: screen === "mission",
      action: () => go("mission"),
    },
    {
      key: "experiences",
      label: { pt: "Experiências", fr: "Expériences", en: "Experiences" },
      icon: "camera",
      active: screen === "log" || screen === "checkin",
      action: () => go("log"),
    },
    {
      key: "agenda",
      label: { pt: "Agenda", fr: "Agenda", en: "Agenda" },
      icon: "calendar",
      active: screen === "agenda",
      action: () => go("agenda"),
    },
    {
      key: "achievements",
      label: { pt: "Conquistas", fr: "Réalisations", en: "Achievements" },
      icon: "heart",
      active: screen === "sent",
      action: () => go("sent"),
    },
    {
      key: "impact",
      label: { pt: "Impacto", fr: "Impact", en: "Impact" },
      icon: "signal",
      active: screen === "feedback",
      action: () => go("feedback"),
    },
    {
      key: "settings",
      label: { pt: "Configurações", fr: "Paramètres", en: "Settings" },
      icon: "settings",
      active: screen === "support",
      action: () => go("support"),
    },
  ];

  const desktopActivities = [
    {
      title: { pt: "Visitar o Mercado de Adjamé", fr: "Visiter le marché d’Adjamé", en: "Visit Adjamé Market" },
      meta: { pt: "Abidjan · Cultura", fr: "Abidjan · Culture", en: "Abidjan · Culture" },
      icon: "briefcase",
      place: "Mercado de Adjamé",
    },
    {
      title: { pt: "Aula de culinária local", fr: "Cours de cuisine locale", en: "Local cooking class" },
      meta: { pt: "Abidjan · Gastronomia", fr: "Abidjan · Gastronomie", en: "Abidjan · Gastronomy" },
      icon: "palm",
      place: "Aula de culinária local",
    },
    {
      title: { pt: "Conhecer Grand-Bassam", fr: "Découvrir Grand-Bassam", en: "Discover Grand-Bassam" },
      meta: { pt: "Patrimônio Mundial UNESCO", fr: "Patrimoine mondial UNESCO", en: "UNESCO World Heritage" },
      icon: "home",
      place: "Grand-Bassam",
    },
  ];

  const desktopExperiences = [
    {
      title: { pt: "Mercado de Treichville", fr: "Marché de Treichville", en: "Treichville Market" },
      category: { pt: "Cultura", fr: "Culture", en: "Culture" },
      duration: { pt: "2 dias", fr: "2 jours", en: "2 days" },
      image: "/deep/yamoussoukro.jpg",
    },
    {
      title: { pt: "Praia de Assinie", fr: "Plage d’Assinie", en: "Assinie Beach" },
      category: { pt: "Natureza", fr: "Nature", en: "Nature" },
      duration: { pt: "1 dia", fr: "1 jour", en: "1 day" },
      image: "/deep/grand-bassam.jpg",
    },
    {
      title: { pt: "Culinária marfinense", fr: "Cuisine ivoirienne", en: "Ivorian cuisine" },
      category: { pt: "Gastronomia", fr: "Gastronomie", en: "Gastronomy" },
      duration: { pt: "3 dias", fr: "3 jours", en: "3 days" },
      image: "/deep/gastronomy.jpg",
    },
  ];

  const renderDesktopHome = () => (
    <main className="dip-explorer-desktop-home">
      <header className="dip-explorer-desktop-header">
        <h1>{loc({ pt: "Painel do Explorer", fr: "Tableau de l’Explorer", en: "Explorer dashboard" }, lang)}</h1>
        <div>
          <div className="dip-explorer-popoverwrap">
            <button
              type="button"
              className="dip-explorer-desktop-iconbtn"
              onClick={() => {
                setNoticeOpen(!noticeOpen);
                setLangOpen(false);
              }}
              aria-expanded={noticeOpen}
              aria-label={loc({ pt: "Notificações", fr: "Notifications", en: "Notifications" }, lang)}
            >
              <MiniIcon name="bell" size={25} />
              <span className="dip-explorer-notice-dot" />
            </button>
            {noticeOpen && (
              <div className="dip-explorer-popover dip-explorer-notice" role="status">
                <strong>
                  {loc({ pt: "Sua próxima atividade", fr: "Votre prochaine activité", en: "Your next activity" }, lang)}
                </strong>
                <span>
                  09:00 · {loc({ pt: "Mercado de Adjamé", fr: "Marché d’Adjamé", en: "Adjamé Market" }, lang)}
                </span>
              </div>
            )}
          </div>
          <button
            type="button"
            className="dip-explorer-desktop-iconbtn"
            onClick={() => go("support")}
            aria-label={loc({ pt: "Configurações", fr: "Paramètres", en: "Settings" }, lang)}
          >
            <Icon name="settings" size={25} />
          </button>
        </div>
      </header>

      <div className="dip-explorer-desktop-primarygrid">
        <section className="dip-explorer-desktop-card dip-explorer-desktop-mission">
          <span>{loc({ pt: "Missão ativa", fr: "Mission active", en: "Active mission" }, lang)}</span>
          <h2>{loc({ pt: "Costa do Marfim", fr: "Côte d’Ivoire", en: "Côte d’Ivoire" }, lang)}</h2>
          <p>04 – 11 {loc({ pt: "de setembro", fr: "septembre", en: "September" }, lang)}</p>
          <div className="dip-explorer-desktop-progress">
            <span aria-label={`${pct}%`}>
              <i style={{ width: `${pct}%` }} />
            </span>
            <strong>{doneTasks}/8</strong>
          </div>
          <button type="button" onClick={() => go("mission")}>
            <Icon name="file" size={19} />
            {loc(
              { pt: "Ver detalhes da missão", fr: "Voir les détails de la mission", en: "View mission details" },
              lang,
            )}
          </button>
        </section>

        <section className="dip-explorer-desktop-card dip-explorer-desktop-activities">
          <h2>{loc({ pt: "Próximas atividades", fr: "Prochaines activités", en: "Upcoming activities" }, lang)}</h2>
          <div>
            {desktopActivities.map((activity) => (
              <button
                type="button"
                key={activity.place}
                onClick={() => {
                  setLogPlace(activity.place);
                  go("checkin");
                }}
              >
                <span>
                  <Icon name={activity.icon} size={23} />
                </span>
                <span>
                  <strong>{loc(activity.title, lang)}</strong>
                  <small>{loc(activity.meta, lang)}</small>
                </span>
              </button>
            ))}
          </div>
          <button type="button" className="dip-explorer-desktop-secondary" onClick={() => go("agenda")}>
            {loc({ pt: "Ver agenda completa", fr: "Voir l’agenda complet", en: "View full agenda" }, lang)}
          </button>
        </section>
      </div>

      <div className="dip-explorer-desktop-secondarygrid">
        <section className="dip-explorer-desktop-card dip-explorer-desktop-recent">
          <h2>{loc({ pt: "Experiências recentes", fr: "Expériences récentes", en: "Recent experiences" }, lang)}</h2>
          <div className="dip-explorer-desktop-experiencegrid">
            {desktopExperiences.map((experience) => (
              <button
                type="button"
                key={experience.title.pt}
                onClick={() => {
                  setLogPlace(experience.title.pt);
                  go("log");
                }}
              >
                <img src={experience.image} alt="" />
                <span className="dip-explorer-desktop-duration">{loc(experience.duration, lang)}</span>
                <span className="dip-explorer-desktop-experiencecopy">
                  <strong>{loc(experience.title, lang)}</strong>
                  <small>{loc(experience.category, lang)}</small>
                </span>
              </button>
            ))}
          </div>
          <button type="button" className="dip-explorer-desktop-secondary" onClick={() => go("log")}>
            {loc(
              { pt: "Ver todas as experiências", fr: "Voir toutes les expériences", en: "View all experiences" },
              lang,
            )}
          </button>
        </section>

        <section className="dip-explorer-desktop-card dip-explorer-desktop-impact">
          <h2>{loc({ pt: "Impacto até agora", fr: "Impact jusqu’ici", en: "Impact so far" }, lang)}</h2>
          <div className="dip-explorer-impact-list">
            <button type="button" onClick={() => go("log")}>
              <span className="dip-explorer-impact-value">12</span>
              <span className="dip-explorer-impact-copy">
                <small>{loc({ pt: "Lugares", fr: "Lieux", en: "Places" }, lang)}</small>
                <strong>
                  {loc(
                    { pt: "Experiências registradas", fr: "Expériences enregistrées", en: "Experiences logged" },
                    lang,
                  )}
                </strong>
              </span>
            </button>
            <button type="button" onClick={() => go("mission")}>
              <span className="dip-explorer-impact-value">
                <Icon name="user" size={23} />
              </span>
              <span className="dip-explorer-impact-copy">
                <small>{loc({ pt: "Pessoas", fr: "Personnes", en: "People" }, lang)}</small>
                <strong>
                  {loc({ pt: "Pessoas alcançadas", fr: "Personnes touchées", en: "People reached" }, lang)}
                </strong>
              </span>
            </button>
            <button type="button" onClick={() => go("feedback")}>
              <span className="dip-explorer-impact-value">
                <Icon name="heart" size={23} />
              </span>
              <span className="dip-explorer-impact-copy">
                <small>{loc({ pt: "Ações", fr: "Actions", en: "Actions" }, lang)}</small>
                <strong>{loc({ pt: "Ações positivas", fr: "Actions positives", en: "Positive actions" }, lang)}</strong>
              </span>
            </button>
            <button type="button" onClick={() => go("agenda")}>
              <span className="dip-explorer-impact-value">23</span>
              <span className="dip-explorer-impact-copy">
                <small>{loc({ pt: "Dias", fr: "Jours", en: "Days" }, lang)}</small>
                <strong>
                  {loc({ pt: "Milhas/km servidos", fr: "Miles/km parcourus", en: "Miles/km served" }, lang)}
                </strong>
              </span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );

  return (
    <div className="deep-explorer dip-explorer-app">
      <aside className="dip-explorer-desktop-sidebar" aria-label="DIP Explorer">
        <button type="button" className="dip-explorer-desktop-brand" onClick={onHub}>
          DIP <span>EXPLORER</span>
        </button>
        <nav>
          {desktopNavItems.map((item) => (
            <button key={item.key} type="button" aria-current={item.active ? "page" : undefined} onClick={item.action}>
              <Icon name={item.icon} size={21} />
              <span>{loc(item.label, lang)}</span>
            </button>
          ))}
        </nav>
        <div className="dip-explorer-desktop-profile">
          <img src="/deep/albie.jpg" alt="Albie Man" />
          <div>
            <strong>Albie Man</strong>
            <small>{loc({ pt: "Explorer · Brasil", fr: "Explorer · Brésil", en: "Explorer · Brazil" }, lang)}</small>
          </div>
        </div>
        <div className="dip-explorer-desktop-account">
          <button type="button" onClick={() => go("support")}>
            {loc({ pt: "Preferências", fr: "Préférences", en: "Preferences" }, lang)}
          </button>
          <button type="button" onClick={onHub}>
            {loc({ pt: "Sair da conta", fr: "Se déconnecter", en: "Sign out" }, lang)}
          </button>
        </div>
      </aside>
      <div className="deep-shell dip-explorer-shell">
        {screen === "home" ? (
          <>
            <main className="dip-explorer-home dip-explorer-mobile-home">
              <section className="dip-explorer-hero">
                <Top />
                <div className="dip-explorer-identity">
                  <img src="/deep/albie.jpg" alt="Albie Man" width={160} height={160} />
                  <div>
                    <h1>Albie Man</h1>
                    <p>{loc({ pt: "Explorer · Brasil", fr: "Explorer · Brésil", en: "Explorer · Brazil" }, lang)}</p>
                    <span>
                      <Icon name="check" size={13} />{" "}
                      {loc({ pt: "Explorer verificado", fr: "Explorer vérifié", en: "Verified explorer" }, lang)}
                    </span>
                  </div>
                </div>
              </section>

              <section className="dip-explorer-homebody">
                <button type="button" className="dip-explorer-active-card" onClick={() => go("mission")}>
                  <span className="dip-explorer-muted">
                    {loc({ pt: "Missão ativa", fr: "Mission active", en: "Active mission" }, lang)}
                  </span>
                  <strong>{loc({ pt: "Costa do Marfim", fr: "Côte d’Ivoire", en: "Côte d’Ivoire" }, lang)}</strong>
                  <span className="dip-explorer-date">
                    04 – 11 {loc({ pt: "de setembro", fr: "septembre", en: "September" }, lang)}
                  </span>
                  <div className="dip-explorer-progressline">
                    <span>
                      {loc(
                        { pt: "Progresso da missão", fr: "Progression de la mission", en: "Mission progress" },
                        lang,
                      )}
                    </span>
                    <b>{doneTasks}/8</b>
                  </div>
                  <div className="dip-explorer-progress" aria-label={`${pct}%`}>
                    <span style={{ width: `${pct}%` }} />
                  </div>
                </button>

                <section className="dip-explorer-upcoming">
                  <div className="dip-explorer-sectiontitle">
                    <h2>{loc({ pt: "Próximas missões", fr: "Prochaines missions", en: "Next missions" }, lang)}</h2>
                    <button type="button" onClick={() => go("agenda")}>
                      {loc({ pt: "Ver agenda", fr: "Voir l’agenda", en: "View agenda" }, lang)}
                    </button>
                  </div>
                  <button
                    type="button"
                    className="dip-explorer-missionrow"
                    onClick={() => {
                      setLogPlace("Mercado local");
                      go("checkin");
                    }}
                  >
                    <span className="dip-explorer-missionrow__icon">
                      <Icon name="camera" size={26} />
                    </span>
                    <span>
                      <strong>
                        {loc(
                          {
                            pt: "Explorar a gastronomia local",
                            fr: "Explorer la gastronomie locale",
                            en: "Explore local gastronomy",
                          },
                          lang,
                        )}
                      </strong>
                      <small>
                        {loc(
                          {
                            pt: "Registrar uma experiência",
                            fr: "Enregistrer une expérience",
                            en: "Log an experience",
                          },
                          lang,
                        )}
                      </small>
                    </span>
                    <Icon name="arrow" size={19} />
                  </button>
                  <button
                    type="button"
                    className="dip-explorer-missionrow"
                    onClick={() => {
                      setLogPlace("Grand-Bassam");
                      go("checkin");
                    }}
                  >
                    <span className="dip-explorer-missionrow__icon">
                      <MiniIcon name="star" size={26} />
                    </span>
                    <span>
                      <strong>
                        {loc(
                          { pt: "Visitar Grand-Bassam", fr: "Visiter Grand-Bassam", en: "Visit Grand-Bassam" },
                          lang,
                        )}
                      </strong>
                      <small>
                        {loc(
                          {
                            pt: "Conhecer o patrimônio histórico",
                            fr: "Découvrir le patrimoine historique",
                            en: "Discover the historic heritage",
                          },
                          lang,
                        )}
                      </small>
                    </span>
                    <Icon name="arrow" size={19} />
                  </button>
                </section>
              </section>
            </main>
            {renderDesktopHome()}
          </>
        ) : (
          <>
            <Top
              back
              title={
                screen === "mission"
                  ? loc(copy.mission, lang)
                  : screen === "agenda"
                    ? loc(copy.agenda, lang)
                    : screen === "checkin"
                      ? "Check-in"
                      : screen === "log"
                        ? loc(
                            { pt: "Registrar experiência", fr: "Enregistrer l’expérience", en: "Log experience" },
                            lang,
                          )
                        : screen === "feedback"
                          ? "Feedback"
                          : screen === "support"
                            ? loc(copy.profile, lang)
                            : loc(
                                { pt: "Contribuição enviada", fr: "Contribution envoyée", en: "Contribution sent" },
                                lang,
                              )
              }
            />
            <main className="dip-explorer-content">
              {screen === "mission" && (
                <>
                  <PageHeader
                    step="02 · MISSION"
                    title={loc({ pt: "Costa do Marfim", fr: "Côte d’Ivoire", en: "Côte d’Ivoire" }, lang)}
                    lead={loc(
                      {
                        pt: "04 – 11 de setembro · Abidjan e Grand-Bassam",
                        fr: "04 – 11 septembre · Abidjan et Grand-Bassam",
                        en: "04 – 11 September · Abidjan and Grand-Bassam",
                      },
                      lang,
                    )}
                  />
                  <section className="dip-explorer-featurecard dip-explorer-featurecard--green">
                    <span className="dip-explorer-roundicon">
                      <Icon name="compass" size={27} />
                    </span>
                    <div>
                      <small>
                        {loc({ pt: "PROPÓSITO DA MISSÃO", fr: "OBJECTIF DE LA MISSION", en: "MISSION PURPOSE" }, lang)}
                      </small>
                      <h3>
                        {loc(
                          {
                            pt: "Transformar vivência em inteligência de destino",
                            fr: "Transformer l’expérience en intelligence de destination",
                            en: "Turn experience into destination intelligence",
                          },
                          lang,
                        )}
                      </h3>
                      <p>
                        {loc(
                          {
                            pt: "Registre experiências, identifique oportunidades e contribua para melhorar a jornada de futuros viajantes.",
                            fr: "Enregistrez les expériences, identifiez les opportunités et améliorez le voyage des futurs visiteurs.",
                            en: "Log experiences, identify opportunities and improve future travellers’ journeys.",
                          },
                          lang,
                        )}
                      </p>
                    </div>
                  </section>
                  <section className="dip-explorer-panel">
                    <div className="dip-explorer-sectiontitle">
                      <h2>
                        {loc({ pt: "Objetivos de campo", fr: "Objectifs terrain", en: "Field objectives" }, lang)}
                      </h2>
                      <span>4</span>
                    </div>
                    <ul className="dip-explorer-objectives">
                      {MISSION_OBJECTIVES.map((objective, index) => (
                        <li key={objective.en}>
                          <span>{index + 1}</span>
                          <p>{loc(objective, lang)}</p>
                          <Icon name={index < 2 ? "check" : "arrow"} size={18} />
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section className="dip-explorer-route">
                    <div>
                      <span className="dip-explorer-roundicon">
                        <MiniIcon name="route" size={24} />
                      </span>
                      <p>
                        <small>{loc({ pt: "ROTA DA MISSÃO", fr: "ITINÉRAIRE", en: "MISSION ROUTE" }, lang)}</small>
                        <strong>Abidjan → Grand-Bassam</strong>
                      </p>
                    </div>
                    <button type="button" onClick={() => go("agenda")}>
                      {loc({ pt: "Ver agenda", fr: "Voir l’agenda", en: "View agenda" }, lang)}{" "}
                      <Icon name="arrow" size={18} />
                    </button>
                  </section>
                </>
              )}

              {screen === "agenda" && activeDay && (
                <>
                  <PageHeader
                    step="03 · AGENDA"
                    title={loc({ pt: "Agenda da missão", fr: "Agenda de la mission", en: "Mission agenda" }, lang)}
                    lead={loc(
                      {
                        pt: "Horários, locais e responsáveis confirmados.",
                        fr: "Horaires, lieux et responsables confirmés.",
                        en: "Confirmed times, places and owners.",
                      },
                      lang,
                    )}
                  />
                  <div className="dip-explorer-daytabs" role="tablist" aria-label={loc(copy.agenda, lang)}>
                    {AGENDA.map((day) => (
                      <button
                        key={day.id}
                        type="button"
                        role="tab"
                        aria-selected={day.id === activeDay.id}
                        onClick={() => setSelectedDay(day.id)}
                      >
                        <span>{day.date.split("/")[0]}</span>
                        <small>{day.date}</small>
                      </button>
                    ))}
                  </div>
                  <section className="dip-explorer-panel">
                    <div className="dip-explorer-agendadate">
                      <span>
                        <Icon name="calendar" size={22} />
                      </span>
                      <div>
                        <small>{activeDay.date}</small>
                        <strong>
                          {loc({ pt: "Programação do dia", fr: "Programme du jour", en: "Day schedule" }, lang)}
                        </strong>
                      </div>
                    </div>
                    <ul className="dip-explorer-timeline">
                      {activeDay.items.map((item) => (
                        <li key={`${item.time}-${item.place}`}>
                          <span className="dip-explorer-time">{item.time}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setLogPlace(item.place);
                              go("checkin");
                            }}
                          >
                            <strong>{loc(item.title, lang)}</strong>
                            <small>
                              <Icon name="pin" size={15} /> {item.place}
                            </small>
                            <small>{item.owner}</small>
                            <b>{loc({ pt: "Confirmado", fr: "Confirmé", en: "Confirmed" }, lang)}</b>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                  <div className="dip-explorer-infobar">
                    <Icon name="info" size={19} />
                    <span>
                      {loc(
                        {
                          pt: "Toque em uma atividade para fazer check-in e registrar sua experiência.",
                          fr: "Touchez une activité pour vous enregistrer et raconter votre expérience.",
                          en: "Tap an activity to check in and log your experience.",
                        },
                        lang,
                      )}
                    </span>
                  </div>
                </>
              )}

              {screen === "checkin" && (
                <>
                  <PageHeader
                    step="04 · CHECK-IN"
                    title={loc({ pt: "Você chegou?", fr: "Vous êtes arrivé ?", en: "Have you arrived?" }, lang)}
                    lead={loc(
                      {
                        pt: "Confirme o local e faça uma avaliação rápida.",
                        fr: "Confirmez le lieu et donnez une évaluation rapide.",
                        en: "Confirm the place and give a quick rating.",
                      },
                      lang,
                    )}
                  />
                  <section className="dip-explorer-checkin-place">
                    <span>
                      <Icon name="pin" size={27} />
                    </span>
                    <div>
                      <small>
                        {loc({ pt: "LOCAL DA ATIVIDADE", fr: "LIEU DE L’ACTIVITÉ", en: "ACTIVITY LOCATION" }, lang)}
                      </small>
                      <strong>{logPlace}</strong>
                      <p>Abidjan · Côte d’Ivoire</p>
                    </div>
                    <b>{loc({ pt: "No local", fr: "Sur place", en: "On site" }, lang)}</b>
                  </section>
                  <form className="dip-explorer-form" noValidate onSubmit={(event) => event.preventDefault()}>
                    <label htmlFor="explorer-place">
                      {loc({ pt: "Confirmar local", fr: "Confirmer le lieu", en: "Confirm place" }, lang)}
                    </label>
                    <div className="dip-explorer-inputicon">
                      <Icon name="pin" size={19} />
                      <input
                        id="explorer-place"
                        value={logPlace}
                        onChange={(event) => setLogPlace(event.target.value)}
                      />
                    </div>
                    <fieldset>
                      <legend>
                        {loc(
                          {
                            pt: "Como foi a experiência?",
                            fr: "Comment était l’expérience ?",
                            en: "How was the experience?",
                          },
                          lang,
                        )}
                      </legend>
                      <div className="dip-explorer-rating">
                        {["1", "2", "3", "4", "5"].map((value) => (
                          <button
                            key={value}
                            type="button"
                            className={Number(value) <= Number(logRating) ? "is-active" : ""}
                            aria-pressed={logRating === value}
                            aria-label={`${value} ${loc(
                              {
                                pt: value === "1" ? "estrela" : "estrelas",
                                fr: value === "1" ? "étoile" : "étoiles",
                                en: value === "1" ? "star" : "stars",
                              },
                              lang,
                            )}`}
                            onClick={() => setLogRating(value)}
                          >
                            <MiniIcon name="star" size={27} />
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend>
                        {loc(
                          {
                            pt: "O que você quer registrar?",
                            fr: "Que voulez-vous enregistrer ?",
                            en: "What do you want to log?",
                          },
                          lang,
                        )}
                      </legend>
                      <div className="dip-explorer-capture">
                        {(
                          [
                            { id: "photo", icon: "photo", pt: "Foto", fr: "Photo", en: "Photo" },
                            { id: "audio", icon: "audio", pt: "Áudio", fr: "Audio", en: "Audio" },
                            { id: "note", icon: "file", pt: "Nota", fr: "Note", en: "Note" },
                          ] as const
                        ).map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            className={capture === item.id ? "is-active" : ""}
                            aria-pressed={capture === item.id}
                            onClick={() => setCapture(item.id)}
                          >
                            {item.icon === "photo" ? (
                              <MiniIcon name="photo" size={22} />
                            ) : item.icon === "audio" ? (
                              <MiniIcon name="audio" size={22} />
                            ) : (
                              <Icon name="file" size={22} />
                            )}
                            <span>{loc(item, lang)}</span>
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <button
                      type="button"
                      className="dip-explorer-primary"
                      onClick={() => {
                        addCheckin(logPlace);
                        toast(lang === "pt" ? "Check-in concluído → Ministry" : lang === "fr" ? "Check-in terminé → Ministry" : "Check-in completed → Ministry");
                        go("log");
                      }}
                    >
                      <Icon name="pin" size={20} />
                      {loc({ pt: "Registrar check-in", fr: "Enregistrer le check-in", en: "Register check-in" }, lang)}
                    </button>
                  </form>
                </>
              )}

              {screen === "log" && (
                <>
                  <PageHeader
                    step="05 · LOG EXPERIENCE"
                    title={loc(
                      { pt: "Registre o que viveu", fr: "Racontez votre expérience", en: "Log what you experienced" },
                      lang,
                    )}
                    lead={loc(
                      {
                        pt: "Seu relato entra em uma fila de contribuição e nunca é publicado automaticamente.",
                        fr: "Votre récit rejoint une file de contribution et n’est jamais publié automatiquement.",
                        en: "Your story enters a contribution queue and is never published automatically.",
                      },
                      lang,
                    )}
                  />
                  <section className="dip-explorer-logsummary">
                    <span>
                      <Icon name="pin" size={21} />
                    </span>
                    <div>
                      <small>{logPlace}</small>
                      <p>
                        {"★".repeat(Number(logRating))}
                        {"☆".repeat(5 - Number(logRating))}
                      </p>
                    </div>
                    <b>
                      {capture === "photo"
                        ? loc({ pt: "Foto", fr: "Photo", en: "Photo" }, lang)
                        : capture === "audio"
                          ? "Audio"
                          : "Note"}
                    </b>
                  </section>
                  <form className="dip-explorer-form" noValidate onSubmit={(event) => event.preventDefault()}>
                    <label htmlFor="explorer-log">
                      {loc(
                        {
                          pt: "Conte o que chamou sua atenção",
                          fr: "Racontez ce qui vous a marqué",
                          en: "Tell us what stood out",
                        },
                        lang,
                      )}
                    </label>
                    <textarea
                      className="resize-none"
                      id="explorer-log"
                      value={logText}
                      onChange={(event) => setLogText(event.target.value)}
                      placeholder={loc(
                        {
                          pt: "A comida é autêntica, o atendimento é acolhedor e esta experiência funcionaria muito bem para brasileiros…",
                          fr: "La cuisine est authentique, l’accueil chaleureux et cette expérience plairait aux Brésiliens…",
                          en: "The food is authentic, the welcome is warm and this experience would work very well for Brazilians…",
                        },
                        lang,
                      )}
                    />
                    <div className="dip-explorer-upload">
                      <span>
                        {capture === "audio" ? (
                          <MiniIcon name="audio" size={26} />
                        ) : (
                          <MiniIcon name="photo" size={26} />
                        )}
                      </span>
                      <div>
                        <strong>{loc({ pt: "Mídia anexada", fr: "Média joint", en: "Media attached" }, lang)}</strong>
                        <small>
                          {loc(
                            {
                              pt: "Simulação local para demonstração",
                              fr: "Simulation locale pour la démo",
                              en: "Local demo simulation",
                            },
                            lang,
                          )}
                        </small>
                      </div>
                      <Icon name="check" size={20} />
                    </div>
                    <button
                      type="button"
                      className="dip-explorer-primary"
                      disabled={logText.trim().length < 8}
                      onClick={() => {
                        pushEvent({
                          name: "explorer_log",
                          source: "explorer",
                          label: `Field experience recorded · ${logPlace}`,
                          meta: { place: logPlace, rating: logRating, media: capture },
                        });
                        toast(lang === "pt" ? "Experiência de campo registrada → Ministry" : lang === "fr" ? "Expérience terrain enregistrée → Ministry" : "Field experience recorded → Ministry");
                        go("feedback");
                      }}
                    >
                      <Icon name="send" size={20} />
                      {loc(
                        { pt: "Enviar para contribuição", fr: "Envoyer la contribution", en: "Send contribution" },
                        lang,
                      )}
                    </button>
                  </form>
                </>
              )}

              {screen === "feedback" && (
                <>
                  <PageHeader
                    step="06 · FIELD INTELLIGENCE"
                    title={loc(
                      {
                        pt: "Isso poderia ser melhor?",
                        fr: "Cela pourrait-il être amélioré ?",
                        en: "Could this be better?",
                      },
                      lang,
                    )}
                    lead={loc(
                      {
                        pt: "Transforme uma dificuldade em um sinal útil para o destino.",
                        fr: "Transformez une difficulté en signal utile pour la destination.",
                        en: "Turn a difficulty into a useful destination signal.",
                      },
                      lang,
                    )}
                  />
                  <div className="dip-explorer-signal">
                    <span>
                      <Icon name="signal" size={25} />
                    </span>
                    <div>
                      <small>DESTINATION IMPROVEMENT SIGNAL</small>
                      <strong>
                        {loc(
                          {
                            pt: "O feedback negativo não vira exposição pública.",
                            fr: "Le retour négatif ne devient pas une exposition publique.",
                            en: "Negative feedback does not become public exposure.",
                          },
                          lang,
                        )}
                      </strong>
                      <p>
                        {loc(
                          {
                            pt: "Ele passa por classificação, curadoria humana e validação institucional.",
                            fr: "Il passe par classification, curation humaine et validation institutionnelle.",
                            en: "It goes through classification, human curation and institutional validation.",
                          },
                          lang,
                        )}
                      </p>
                    </div>
                  </div>
                  <form className="dip-explorer-form" noValidate onSubmit={(event) => event.preventDefault()}>
                    <fieldset>
                      <legend>{t("explorer.feedback.kind")}</legend>
                      <ChipGroup
                        label={t("explorer.feedback.kind")}
                        options={[
                          { id: "public", label: t("explorer.kind.public") },
                          { id: "private", label: t("explorer.kind.private") },
                          { id: "institutional", label: t("explorer.kind.institutional") },
                        ]}
                        value={fbKind}
                        onChange={(value) => setFbKind(value as FeedbackKind)}
                      />
                    </fieldset>
                    <label htmlFor="explorer-feedback">
                      {loc({ pt: "Ponto de melhoria", fr: "Point d’amélioration", en: "Improvement point" }, lang)}
                    </label>
                    <textarea
                      className="resize-none"
                      id="explorer-feedback"
                      value={fbText}
                      onChange={(event) => {
                        setFbText(event.target.value);
                        setError(null);
                      }}
                      aria-invalid={!!error}
                      aria-describedby={error ? "explorer-feedback-error" : undefined}
                      placeholder={loc(
                        {
                          pt: "A experiência foi ótima, mas foi difícil encontrar o local e não havia informação em inglês.",
                          fr: "L’expérience était excellente, mais le lieu était difficile à trouver et il n’y avait pas d’information en anglais.",
                          en: "The experience was great, but the place was hard to find and there was no information in English.",
                        },
                        lang,
                      )}
                    />
                    {error && (
                      <p id="explorer-feedback-error" className="dip-explorer-error" role="alert">
                        {error}
                      </p>
                    )}
                    <button type="button" className="dip-explorer-primary" onClick={submitFeedback} disabled={sending}>
                      {sending
                        ? loc({ pt: "Enviando…", fr: "Envoi…", en: "Sending…" }, lang)
                        : t("explorer.feedback.send")}
                    </button>
                  </form>
                </>
              )}

              {screen === "support" && (
                <>
                  <section className="dip-explorer-profile">
                    <img src="/deep/albie.jpg" alt="Albie Man" width={128} height={128} />
                    <div>
                      <small>DIP EXPLORER</small>
                      <h2>Albie Man</h2>
                      <p>
                        {loc(
                          {
                            pt: "Explorer verificado · Brasil",
                            fr: "Explorer vérifié · Brésil",
                            en: "Verified explorer · Brazil",
                          },
                          lang,
                        )}
                      </p>
                    </div>
                  </section>
                  <div className="dip-explorer-profile-actions">
                    <button type="button" onClick={onHub}>
                      <Icon name="grid" size={20} />
                      {loc({ pt: "Trocar área do DIP", fr: "Changer d’espace DIP", en: "Switch DIP area" }, lang)}
                    </button>
                    <button type="button" onClick={() => setLangOpen(true)}>
                      <Icon name="settings" size={20} />
                      {loc({ pt: "Idioma", fr: "Langue", en: "Language" }, lang)} · {lang.toUpperCase()}
                    </button>
                  </div>
                  <section className="dip-explorer-panel">
                    <div className="dip-explorer-sectiontitle">
                      <h2>
                        {loc({ pt: "Suporte da missão", fr: "Support de la mission", en: "Mission support" }, lang)}
                      </h2>
                      <span>
                        <Icon name="life" size={18} />
                      </span>
                    </div>
                    <ul className="dip-explorer-contacts">
                      {SUPPORT_CONTACTS.map((contact, index) => (
                        <li key={contact.id}>
                          <a href={`tel:${contact.value.replace(/\s/g, "")}`}>
                            <span>
                              <Icon
                                name={index === SUPPORT_CONTACTS.length - 1 ? "life" : index < 2 ? "user" : "briefcase"}
                                size={21}
                              />
                            </span>
                            <div>
                              <strong>{loc(contact.label, lang)}</strong>
                              <small>{contact.value}</small>
                            </div>
                            <Icon name="arrow" size={18} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                </>
              )}

              {screen === "sent" && (
                <>
                  <section className="dip-explorer-success">
                    <span>
                      <Icon name="check" size={35} />
                    </span>
                    <small>08 · SENT</small>
                    <h2>{t("explorer.sent.title")}</h2>
                    <p>{t("explorer.sent.lead")}</p>
                  </section>
                  <section className="dip-explorer-impact">
                    <small>{loc({ pt: "IMPACTO ESPERADO", fr: "IMPACT ATTENDU", en: "EXPECTED IMPACT" }, lang)}</small>
                    <h3>
                      {loc(
                        {
                          pt: "Sua contribuição ajuda a tornar a Costa do Marfim mais preparada para receber novos viajantes.",
                          fr: "Votre contribution aide la Côte d’Ivoire à mieux accueillir les nouveaux voyageurs.",
                          en: "Your contribution helps Côte d’Ivoire become more prepared to welcome new travellers.",
                        },
                        lang,
                      )}
                    </h3>
                  </section>
                  <section className="dip-explorer-panel">
                    <div className="dip-explorer-sectiontitle">
                      <h2>
                        {loc(
                          { pt: "Status da contribuição", fr: "Statut de la contribution", en: "Contribution status" },
                          lang,
                        )}
                      </h2>
                    </div>
                    <ol className="dip-explorer-pipeline">
                      {[
                        loc(
                          { pt: "Contribuição recebida", fr: "Contribution reçue", en: "Contribution received" },
                          lang,
                        ),
                        loc(
                          { pt: "Classificação pela IA", fr: "Classification par l’IA", en: "AI classification" },
                          lang,
                        ),
                        loc({ pt: "Revisão humana", fr: "Revue humaine", en: "Human review" }, lang),
                        loc(
                          {
                            pt: "Validação institucional",
                            fr: "Validation institutionnelle",
                            en: "Institutional validation",
                          },
                          lang,
                        ),
                        loc({ pt: "Base de conhecimento", fr: "Base de connaissances", en: "Knowledge base" }, lang),
                      ].map((item, index) => (
                        <li key={item} className={index < 2 ? "is-done" : ""}>
                          <span>{index < 2 ? <Icon name="check" size={15} /> : index + 1}</span>
                          <p>
                            <strong>{item}</strong>
                            {index === 1 && (
                              <small>
                                {loc(
                                  {
                                    pt: "Experiência · Sinalização · Idioma · Brasil",
                                    fr: "Expérience · Signalétique · Langue · Brésil",
                                    en: "Experience · Signage · Language · Brazil",
                                  },
                                  lang,
                                )}
                              </small>
                            )}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </section>
                  <button type="button" className="dip-explorer-primary" onClick={() => go("home")}>
                    {loc({ pt: "Voltar ao início", fr: "Retour à l’accueil", en: "Back home" }, lang)}
                  </button>
                </>
              )}
            </main>
          </>
        )}
        <Bottom />
      </div>
    </div>
  );
};

export default ExplorerApp;
