/**
 * DIP — conteúdo determinístico da demonstração.
 * Todos os números aqui são simulados e devem ser exibidos como tal.
 */
import type { DeepLang } from "./i18n";

export type Localized = Record<DeepLang, string>;


export const L = (pt: string, fr: string, en: string): Localized => ({ pt, fr, en });

export type Experience = {
  id: string;
  image: string;
  title: Localized;
  place: Localized;
  short: Localized;
  long: Localized;
  source: Localized;
  sourceUrl: string;
  logistics: Localized;
  ayaTip: Localized;
  tags: ("culture" | "nature" | "gastronomy" | "beach" | "business")[];
  lat: number;
  lng: number;
  priceBrl: number;
};

export const EXPERIENCES: Experience[] = [
  {
    id: "abidjan",
    image: "/cote-conecta/abidjan-home.jpg",
    title: L("Abidjan contemporânea", "Abidjan contemporaine", "Contemporary Abidjan"),
    place: L("Abidjan · Plateau e Cocody", "Abidjan · Plateau et Cocody", "Abidjan · Plateau & Cocody"),
    short: L("Skyline, arte e vida urbana", "Skyline, art et vie urbaine", "Skyline, art and city life"),
    long: L(
      "Caminhada guiada pelo Plateau, Cocody e a lagoa Ébrié, com paradas em galerias, mercados de tecido e arquitetura moderna.",
      "Balade guidée au Plateau, à Cocody et sur la lagune Ébrié, avec galeries, marchés de tissus et architecture moderne.",
      "Guided walk through Plateau, Cocody and the Ébrié lagoon, with galleries, fabric markets and modern architecture.",
    ),
    source: L("Ministério do Turismo", "Ministère du Tourisme", "Ministry of Tourism"),
    sourceUrl: "https://tourismecotedivoire.ci",
    logistics: L("4h · guia PT/FR/EN · transporte incluído", "4h · guide FR/EN/PT · transport inclus", "4h · PT/FR/EN guide · transport included"),
    ayaTip: L(
      "Comece cedo: o Plateau é mais agradável antes das 11h.",
      "Commencez tôt : le Plateau est plus agréable avant 11h.",
      "Start early: Plateau is nicer before 11am.",
    ),
    tags: ["culture", "business"],
    lat: 5.3245,
    lng: -4.0207,
    priceBrl: 420,
  },
  {
    id: "grand-bassam",
    image: "/deep/grand-bassam.jpg",
    title: L("Grand-Bassam, patrimônio", "Grand-Bassam, patrimoine", "Grand-Bassam heritage"),
    place: L("Grand-Bassam · 43 km de Abidjan", "Grand-Bassam · 43 km d’Abidjan", "Grand-Bassam · 43 km from Abidjan"),
    short: L("Patrimônio UNESCO e praia", "Patrimoine UNESCO et plage", "UNESCO heritage and beach"),
    long: L(
      "Primeira capital colonial, hoje Patrimônio Mundial da UNESCO. Casarões restaurados, museu do traje e uma orla de praia viva.",
      "Première capitale coloniale, aujourd’hui patrimoine mondial de l’UNESCO. Maisons restaurées, musée du costume et front de mer animé.",
      "The first colonial capital, now a UNESCO World Heritage site. Restored houses, costume museum and a lively beachfront.",
    ),
    source: L("UNESCO · lista do Patrimônio Mundial", "UNESCO · liste du patrimoine mondial", "UNESCO · World Heritage list"),
    sourceUrl: "https://whc.unesco.org/en/list/1322/",
    logistics: L("Dia inteiro · 1h de carro", "Journée · 1h de route", "Full day · 1h drive"),
    ayaTip: L(
      "Combine o museu de manhã e a praia no fim da tarde.",
      "Musée le matin, plage en fin d’après-midi.",
      "Museum in the morning, beach late afternoon.",
    ),
    tags: ["culture", "beach"],
    lat: 5.1961,
    lng: -3.7381,
    priceBrl: 380,
  },
  {
    id: "tai",
    image: "/deep/tai-park.jpg",
    title: L("Parque Nacional de Taï", "Parc national de Taï", "Taï National Park"),
    place: L("Sudoeste · floresta primária", "Sud-ouest · forêt primaire", "Southwest · primary forest"),
    short: L("Natureza e vida selvagem", "Nature et faune", "Nature and wildlife"),
    long: L(
      "Uma das últimas florestas primárias da África Ocidental, com trilhas guiadas e observação de fauna com equipes locais.",
      "L’une des dernières forêts primaires d’Afrique de l’Ouest, avec sentiers guidés et observation de la faune.",
      "One of West Africa’s last primary rainforests, with guided trails and wildlife observation with local teams.",
    ),
    source: L("Office Ivoirien des Parcs et Réserves", "Office Ivoirien des Parcs et Réserves", "Ivorian Office of Parks and Reserves"),
    sourceUrl: "https://whc.unesco.org/en/list/195/",
    logistics: L("2 dias · guia obrigatório · alta temporada seca", "2 jours · guide obligatoire · saison sèche", "2 days · guide required · dry season"),
    ayaTip: L(
      "Leve repelente e calçado fechado; as trilhas saem cedo.",
      "Prenez répulsif et chaussures fermées ; départs tôt.",
      "Bring repellent and closed shoes; trails start early.",
    ),
    tags: ["nature"],
    lat: 5.75,
    lng: -7.1,
    priceBrl: 1650,
  },
  {
    id: "yamoussoukro",
    image: "/deep/yamoussoukro.jpg",
    title: L("Yamoussoukro institucional", "Yamoussoukro institutionnelle", "Institutional Yamoussoukro"),
    place: L("Capital política", "Capitale politique", "Political capital"),
    short: L("Arquitetura, cultura e Estado", "Architecture, culture et État", "Architecture, culture and state"),
    long: L(
      "A capital política reúne a Basílica de Nossa Senhora da Paz, instituições e um circuito cultural pouco explorado por brasileiros.",
      "La capitale politique réunit la Basilique Notre-Dame-de-la-Paix, des institutions et un circuit culturel peu exploré.",
      "The political capital gathers the Basilica of Our Lady of Peace, institutions and an under-visited cultural circuit.",
    ),
    source: L("Ministério do Turismo", "Ministère du Tourisme", "Ministry of Tourism"),
    sourceUrl: "https://tourismecotedivoire.ci",
    logistics: L("Dia inteiro · 3h de estrada de Abidjan", "Journée · 3h de route depuis Abidjan", "Full day · 3h drive from Abidjan"),
    ayaTip: L(
      "Ótimo par com agenda de negócios institucional.",
      "Idéal en complément d’un agenda institutionnel.",
      "Great pairing with an institutional business agenda.",
    ),
    tags: ["culture", "business"],
    lat: 6.8276,
    lng: -5.2893,
    priceBrl: 520,
  },
  {
    id: "maquis",
    image: "/deep/gastronomy.jpg",
    title: L("Noite de maquis", "Soirée maquis", "Maquis night"),
    place: L("Abidjan · Marcory", "Abidjan · Marcory", "Abidjan · Marcory"),
    short: L("Gastronomia local autêntica", "Gastronomie locale authentique", "Authentic local food"),
    long: L(
      "Jantar em maquis tradicional: peixe braseado, attiéké, alloco e música ao vivo, com anfitrião local.",
      "Dîner dans un maquis traditionnel : poisson braisé, attiéké, alloco et musique live avec un hôte local.",
      "Dinner at a traditional maquis: braised fish, attiéké, alloco and live music with a local host.",
    ),
    source: L("Parceiro verificado DIP", "Partenaire vérifié DIP", "DIP verified partner"),
    sourceUrl: "https://tourismecotedivoire.ci",
    logistics: L("3h · à noite · reserva recomendada", "3h · le soir · réservation conseillée", "3h · evening · booking advised"),
    ayaTip: L(
      "Peça attiéké com peixe braseado; é o prato-símbolo.",
      "Demandez l’attiéké avec poisson braisé, le plat symbole.",
      "Ask for attiéké with braised fish, the signature dish.",
    ),
    tags: ["gastronomy", "culture"],
    lat: 5.3,
    lng: -3.99,
    priceBrl: 260,
  },
  {
    id: "assinie",
    image: "/deep/grand-bassam.jpg",
    title: L("Assinie, litoral", "Assinie, littoral", "Assinie coastline"),
    place: L("Assinie-Mafia", "Assinie-Mafia", "Assinie-Mafia"),
    short: L("Praia, lagoa e descanso", "Plage, lagune et repos", "Beach, lagoon and rest"),
    long: L(
      "Faixa de areia entre o Atlântico e a lagoa Aby, com pousadas, esportes náuticos e vilarejos de pescadores.",
      "Bande de sable entre l’Atlantique et la lagune Aby, avec lodges, sports nautiques et villages de pêcheurs.",
      "A strip of sand between the Atlantic and the Aby lagoon, with lodges, water sports and fishing villages.",
    ),
    source: L("Ministério do Turismo", "Ministère du Tourisme", "Ministry of Tourism"),
    sourceUrl: "https://tourismecotedivoire.ci",
    logistics: L("2 dias · 2h de carro", "2 jours · 2h de route", "2 days · 2h drive"),
    ayaTip: L(
      "Ideal para fechar a viagem antes do voo de volta.",
      "Parfait pour clore le voyage avant le vol retour.",
      "Perfect to close the trip before the return flight.",
    ),
    tags: ["beach", "nature"],
    lat: 5.13,
    lng: -3.28,
    priceBrl: 900,
  },
];

export const findExperience = (id: string) => EXPERIENCES.find((e) => e.id === id);

/* ------------------------- Perfil ------------------------- */

export const ORIGINS = [
  { id: "BR", label: L("Brasil", "Brésil", "Brazil") },
  { id: "FR", label: L("França", "France", "France") },
  { id: "US", label: L("Estados Unidos", "États-Unis", "United States") },
  { id: "PT", label: L("Portugal", "Portugal", "Portugal") },
  { id: "AO", label: L("Angola", "Angola", "Angola") },
];

export const DURATIONS = [
  { id: "4", label: L("4 dias", "4 jours", "4 days") },
  { id: "8", label: L("8 dias", "8 jours", "8 days") },
  { id: "12", label: L("12 dias", "12 jours", "12 days") },
  { id: "15", label: L("+12 dias", "+12 jours", "+12 days") },
];

export const COMPANIES = [
  { id: "solo", label: L("Sozinho(a)", "Seul(e)", "Solo") },
  { id: "couple", label: L("Casal", "En couple", "Couple") },
  { id: "family", label: L("Família", "Famille", "Family") },
  { id: "group", label: L("Grupo", "Groupe", "Group") },
];

export const STYLES = [
  { id: "essential", label: L("Essencial", "Essentiel", "Essential") },
  { id: "comfort", label: L("Conforto", "Confort", "Comfort") },
  { id: "premium", label: L("Premium", "Premium", "Premium") },
];

export const INTERESTS = [
  { id: "culture", label: L("Cultura", "Culture", "Culture") },
  { id: "nature", label: L("Natureza", "Nature", "Nature") },
  { id: "gastronomy", label: L("Gastronomia", "Gastronomie", "Gastronomy") },
  { id: "beach", label: L("Praia", "Plage", "Beach") },
  { id: "business", label: L("Negócios", "Affaires", "Business") },
];

export const INTENTS = [
  { id: "leisure", key: "intent.leisure" },
  { id: "culture", key: "intent.culture" },
  { id: "business", key: "intent.business" },
  { id: "family", key: "intent.family" },
];

export const BUDGETS: Record<string, { total: number; cats: number[] }> = {
  essential: { total: 6000, cats: [1500, 700, 500, 600, 400] },
  comfort: { total: 8600, cats: [2300, 1100, 700, 1060, 600] },
  premium: { total: 13400, cats: [4200, 1900, 1100, 1600, 900] },
};

export const BUDGET_CATS = [
  L("Voo", "Vol", "Flight"),
  L("Hospedagem", "Hébergement", "Stay"),
  L("Alimentação", "Restauration", "Food"),
  L("Experiências", "Expériences", "Experiences"),
  L("Transporte local", "Transport local", "Local transport"),
];

/* ------------------------- Jornada ------------------------- */

export type JourneyDay = { day: number; expId: string; why: Localized };

export const buildJourney = (durationDays: number, interests: string[]): JourneyDay[] => {
  const pool = EXPERIENCES.filter((e) =>
    interests.length ? e.tags.some((t) => interests.includes(t)) : true,
  );
  const list = pool.length >= 3 ? pool : EXPERIENCES;
  const days = Math.max(3, Math.min(6, Math.round(durationDays / 2)));
  return Array.from({ length: days }, (_, i) => {
    const exp = list[i % list.length];
    return {
      day: i + 1,
      expId: exp.id,
      why: L(
        `Combina com ${interests.length ? "seus interesses selecionados" : "um primeiro contato com o país"} e com o ritmo do roteiro.`,
        `Correspond à ${interests.length ? "vos centres d’intérêt" : "une première découverte du pays"} et au rythme du séjour.`,
        `Matches ${interests.length ? "your selected interests" : "a first contact with the country"} and the pace of the itinerary.`,
      ),
    };
  });
};

/* ------------------------- Travel ready ------------------------- */

export const READY_ITEMS = [
  { id: "passport", label: L("Passaporte válido por 6 meses", "Passeport valide 6 mois", "Passport valid for 6 months") },
  { id: "visa", label: L("e-Visa Côte d’Ivoire solicitado", "e-Visa Côte d’Ivoire demandé", "Côte d’Ivoire e-Visa requested") },
  { id: "yellow", label: L("Vacina de febre amarela", "Vaccin fièvre jaune", "Yellow fever vaccination") },
  { id: "insurance", label: L("Seguro viagem contratado", "Assurance voyage souscrite", "Travel insurance purchased") },
  { id: "money", label: L("Franco CFA (XOF) e cartão internacional", "Franc CFA (XOF) et carte internationale", "CFA franc (XOF) and international card") },
  { id: "esim", label: L("eSIM ou chip local", "eSIM ou SIM locale", "eSIM or local SIM") },
  { id: "transfer", label: L("Transfer do aeroporto reservado", "Transfert aéroport réservé", "Airport transfer booked") },
];

export const TAAG_URL = "https://www.taag.com";

/* ------------------------- Negócios ------------------------- */

export const SECTORS = [
  { id: "cocoa", label: L("Cacau e agroindústria", "Cacao et agro-industrie", "Cocoa and agribusiness") },
  { id: "cashew", label: L("Caju e processamento", "Anacarde et transformation", "Cashew and processing") },
  { id: "energy", label: L("Energia", "Énergie", "Energy") },
  { id: "infra", label: L("Infraestrutura e logística", "Infrastructure et logistique", "Infrastructure and logistics") },
  { id: "tech", label: L("Tecnologia e digital", "Technologie et numérique", "Technology and digital") },
  { id: "tourism", label: L("Turismo e hotelaria", "Tourisme et hôtellerie", "Tourism and hospitality") },
];

export const BUSINESS_EVENTS = [
  { id: "sara", date: "2026-11", label: L("SARA · Salão da Agricultura", "SARA · Salon de l’Agriculture", "SARA · Agriculture Show") },
  { id: "cgeci", date: "2026-10", label: L("CGECI Academy", "CGECI Academy", "CGECI Academy") },
  { id: "africa-ceo", date: "2027-05", label: L("Africa CEO Forum", "Africa CEO Forum", "Africa CEO Forum") },
];

/* ------------------------- Explorer ------------------------- */

export const MISSION_OBJECTIVES = [
  L("Viver a gastronomia local e registrar", "Vivre et documenter la gastronomie locale", "Experience and document local gastronomy"),
  L("Avaliar acessibilidade de idioma", "Évaluer l’accessibilité linguistique", "Evaluate language accessibility"),
  L("Documentar a experiência de transporte", "Documenter l’expérience de transport", "Document the transport experience"),
  L("Conhecer um empreendedor local", "Rencontrer un entrepreneur local", "Meet a local entrepreneur"),
];

export const AGENDA = [
  {
    id: "d1",
    date: "04/09",
    items: [
      { time: "14:20", title: L("Chegada · Aeroporto FHB", "Arrivée · Aéroport FHB", "Arrival · FHB Airport"), place: "Abidjan", owner: "Ministry Host" },
      { time: "19:00", title: L("Jantar de boas-vindas", "Dîner de bienvenue", "Welcome dinner"), place: "Cocody", owner: "Ministry Host" },
    ],
  },
  {
    id: "d2",
    date: "05/09",
    items: [
      { time: "09:00", title: L("Circuito Plateau", "Circuit Plateau", "Plateau circuit"), place: "Abidjan", owner: "Guia local" },
      { time: "16:00", title: L("Encontro com operadores", "Rencontre opérateurs", "Meeting with operators"), place: "Plateau", owner: "Ministry" },
    ],
  },
  {
    id: "d3",
    date: "06/09",
    items: [
      { time: "08:00", title: L("Grand-Bassam · patrimônio", "Grand-Bassam · patrimoine", "Grand-Bassam · heritage"), place: "Grand-Bassam", owner: "Guia local" },
      { time: "20:00", title: L("Maquis e música ao vivo", "Maquis et musique live", "Maquis and live music"), place: "Marcory", owner: "Parceiro" },
    ],
  },
];

export const SUPPORT_CONTACTS = [
  { id: "host", label: L("Ministry Host", "Ministry Host", "Ministry Host"), value: "+225 07 00 00 00" },
  { id: "taag", label: L("TAAG · atendimento", "TAAG · service client", "TAAG · support"), value: "+244 923 000 000" },
  { id: "operator", label: L("Operador local", "Opérateur local", "Local operator"), value: "+225 05 00 00 00" },
  { id: "hotel", label: L("Hotel", "Hôtel", "Hotel"), value: "+225 27 00 00 00" },
  { id: "emergency", label: L("Emergência", "Urgence", "Emergency"), value: "170" },
];

/* ------------------------- Ministry (base simulada) ------------------------- */

export const BASE_METRICS = {
  intents: 1284,
  journeys: 3120,
  markets: 14,
  creators: 6,
  referrals: 412,
  signals: 87,
};

export const TREND = [38, 44, 41, 55, 62, 58, 71, 78, 74, 89, 96, 104];

export const MARKETS = [
  { code: "BR", name: "Brasil", share: 34, intents: 436, lang: "PT" },
  { code: "FR", name: "France", share: 22, intents: 282, lang: "FR" },
  { code: "US", name: "United States", share: 15, intents: 193, lang: "EN" },
  { code: "PT", name: "Portugal", share: 9, intents: 116, lang: "PT" },
  { code: "AO", name: "Angola", share: 8, intents: 103, lang: "PT" },
  { code: "MA", name: "Maroc", share: 6, intents: 77, lang: "FR" },
];

export const INTEREST_SHARE = [
  { id: "culture", label: L("Cultura", "Culture", "Culture"), value: 31 },
  { id: "gastronomy", label: L("Gastronomia", "Gastronomie", "Gastronomy"), value: 24 },
  { id: "nature", label: L("Natureza", "Nature", "Nature"), value: 19 },
  { id: "beach", label: L("Praia", "Plage", "Beach"), value: 15 },
  { id: "business", label: L("Negócios", "Affaires", "Business"), value: 11 },
];

export const FUNNEL = [
  { id: "visit", label: L("Visitas", "Visites", "Visits"), value: 12840 },
  { id: "chat", label: L("Conversas com Aya", "Conversations Aya", "Aya conversations"), value: 5210 },
  { id: "profile", label: L("Perfis completos", "Profils complets", "Completed profiles"), value: 3980 },
  { id: "journey", label: L("Jornadas geradas", "Voyages générés", "Journeys generated"), value: 3120 },
  { id: "intent", label: L("Intenções confirmadas", "Intentions confirmées", "Confirmed intents"), value: 1284 },
  { id: "referral", label: L("Referrals de parceiro", "Referrals partenaires", "Partner referrals"), value: 412 },
];

export const TRAVELERS = [
  { id: "BR-1041", name: "Ana Ribeiro", market: "BR", lang: "PT", duration: 8, budget: "comfort", interests: ["culture", "gastronomy"], barrier: L("Idioma", "Langue", "Language") },
  { id: "FR-1042", name: "Camille Laurent", market: "FR", lang: "FR", duration: 12, budget: "premium", interests: ["nature", "beach"], barrier: L("Conectividade", "Connectivité", "Connectivity") },
  { id: "US-1043", name: "Daniel Brooks", market: "US", lang: "EN", duration: 4, budget: "essential", interests: ["business"], barrier: L("Visto", "Visa", "Visa") },
  { id: "BR-1044", name: "Lucas Mendes", market: "BR", lang: "PT", duration: 8, budget: "comfort", interests: ["beach", "gastronomy"], barrier: L("Voos", "Vols", "Flights") },
  { id: "PT-1045", name: "Inês Silva", market: "PT", lang: "PT", duration: 12, budget: "comfort", interests: ["culture"], barrier: L("Segurança", "Sécurité", "Safety") },
  { id: "AO-1046", name: "Mateus Nzola", market: "AO", lang: "PT", duration: 4, budget: "essential", interests: ["business", "culture"], barrier: L("Custo", "Coût", "Cost") },
];

export const JOURNEYS = [
  { id: "j-8801", market: "BR", days: 8, experiences: 6, status: "intent", referral: true },
  { id: "j-8802", market: "FR", days: 12, experiences: 9, status: "completed", referral: false },
  { id: "j-8803", market: "US", days: 4, experiences: 3, status: "started", referral: false },
  { id: "j-8804", market: "BR", days: 8, experiences: 5, status: "completed", referral: true },
  { id: "j-8805", market: "PT", days: 12, experiences: 7, status: "intent", referral: true },
];

export const CREATORS = [
  { id: "albie", name: "Albie", market: "BR", reach: 486000, visits: 9120, chats: 2140, journeys: 780, taag: 214, contributions: 12, verified: true },
  { id: "c-2", name: "Mariam K.", market: "FR", reach: 132000, visits: 2410, chats: 610, journeys: 190, taag: 44, contributions: 5, verified: true },
  { id: "c-3", name: "Kofi A.", market: "US", reach: 88000, visits: 1580, chats: 380, journeys: 96, taag: 21, contributions: 3, verified: false },
];

export const CAMPAIGNS = [
  { id: "cmp-br-1", name: "Brasil × Côte d’Ivoire", market: "BR", period: "set–nov 2026", creator: "Albie", partner: "TAAG", lang: "PT", status: "live", intents: 436 },
  { id: "cmp-fr-1", name: "France Découverte", market: "FR", period: "out–dez 2026", creator: "Mariam K.", partner: "Air Côte d’Ivoire", lang: "FR", status: "planned", intents: 282 },
  { id: "cmp-us-1", name: "US Heritage Trail", market: "US", period: "jan–mar 2027", creator: "Kofi A.", partner: "—", lang: "EN", status: "draft", intents: 193 },
];

export const PARTNERS = [
  { id: "taag", name: "TAAG Angola Airlines", type: L("Aviação", "Aviation", "Aviation"), contextual: true, referrals: 412, status: "active" },
  { id: "hotels", name: L("Rede hoteleira Abidjan", "Réseau hôtelier Abidjan", "Abidjan hotel network"), type: L("Hospedagem", "Hébergement", "Stay"), contextual: true, referrals: 168, status: "active" },
  { id: "operators", name: L("Operadores locais", "Opérateurs locaux", "Local operators"), type: L("Experiências", "Expériences", "Experiences"), contextual: true, referrals: 96, status: "active" },
  { id: "telecom", name: L("Telecom e eSIM", "Télécom et eSIM", "Telecom & eSIM"), type: L("Conectividade", "Connectivité", "Connectivity"), contextual: false, referrals: 51, status: "pilot" },
];

export const BASE_FEEDBACK = [
  {
    id: "f-001",
    author: "Albie",
    kind: "institutional" as const,
    text: L(
      "Faltam informações em inglês na sinalização do aeroporto.",
      "Il manque des informations en anglais dans la signalétique de l’aéroport.",
      "Airport signage lacks information in English.",
    ),
    status: "in_review" as const,
    date: "05/09",
  },
  {
    id: "f-002",
    author: "Mariam K.",
    kind: "public" as const,
    text: L(
      "Experiência gastronômica autêntica; brasileiros adorariam.",
      "Expérience gastronomique authentique ; les Brésiliens adoreraient.",
      "Authentic food experience; Brazilians would love it.",
    ),
    status: "validated" as const,
    date: "06/09",
  },
  {
    id: "f-003",
    author: "Kofi A.",
    kind: "private" as const,
    text: L(
      "Transporte entre Abidjan e Bassam pode melhorar em horário de pico.",
      "Le transport Abidjan–Bassam peut être amélioré aux heures de pointe.",
      "Abidjan–Bassam transport could improve at peak hours.",
    ),
    status: "classified" as const,
    date: "06/09",
  },
];

export const REPORTS = [
  { id: "r-1", name: L("Demanda internacional — trimestral", "Demande internationale — trimestriel", "International demand — quarterly"), period: "Q3 2026", format: "PDF" },
  { id: "r-2", name: L("Performance de creators", "Performance des créateurs", "Creator performance"), period: "set 2026", format: "XLSX" },
  { id: "r-3", name: L("Sinais de melhoria do destino", "Signaux d’amélioration", "Destination improvement signals"), period: "set 2026", format: "PDF" },
];
