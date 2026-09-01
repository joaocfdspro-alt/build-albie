/**
 * DIP — estado local da demonstração.
 * Tudo é persistido em localStorage sob a chave `deep.state.v1`.
 * Nenhuma chamada de rede acontece no fluxo principal.
 */
import { createContext, useContext } from "react";
import type { DeepLang } from "./i18n";

export type DeepEventName =
  | "journey_generated"
  | "experience_viewed"
  | "experience_added"
  | "business_interest"
  | "partner_referral"
  | "readiness_opened"
  | "travel_intent_confirmed"
  | "explorer_checkin"
  | "explorer_log"
  | "explorer_feedback";

export type DeepEvent = {
  id: string;
  name: DeepEventName;
  at: number;
  source: "public" | "explorer";
  label: string;
  meta?: Record<string, string | number | boolean | string[]>;
};

export type FeedbackKind = "public" | "private" | "institutional";

export type LocalFeedback = {
  id: string;
  author: string;
  kind: FeedbackKind;
  text: string;
  status: "classified" | "in_review" | "validated";
  date: string;
  local: true;
};

export type DeepProfile = {
  origin: string;
  intent: string;
  duration: string;
  company: string;
  style: string;
  interests: string[];
};

export type DeepState = {
  lang: DeepLang;
  languageWasChosen: boolean;
  profile: DeepProfile;
  journeyIds: string[];
  savedIds: string[];
  addedIds: string[];
  checklist: string[];
  events: DeepEvent[];
  feedback: LocalFeedback[];
  intentConfirmed: boolean;
  explorerCheckins: string[];
};

export const STORAGE_KEY = "deep.state.v1";

export const DEFAULT_STATE: DeepState = {
  lang: "en",
  languageWasChosen: false,
  profile: { origin: "BR", intent: "leisure", duration: "8", company: "couple", style: "comfort", interests: ["culture", "gastronomy"] },
  journeyIds: [],
  savedIds: [],
  addedIds: [],
  checklist: [],
  events: [],
  feedback: [],
  intentConfirmed: false,
  explorerCheckins: [],
};

export const loadState = (): DeepState => {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<DeepState>;
    const languageWasChosen = parsed.languageWasChosen === true;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      lang: languageWasChosen && parsed.lang ? parsed.lang : "en",
      languageWasChosen,
      profile: { ...DEFAULT_STATE.profile, ...(parsed.profile ?? {}) },
    };
  } catch {
    return DEFAULT_STATE;
  }
};

export const saveState = (state: DeepState) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* modo privado / storage cheio: a demo segue em memória */
  }
};

export const makeId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export type DeepContextValue = {
  state: DeepState;
  lang: DeepLang;
  t: (key: string) => string;
  setLang: (lang: DeepLang) => void;
  setProfile: (patch: Partial<DeepProfile>) => void;
  setJourney: (ids: string[]) => void;
  toggleSaved: (id: string) => void;
  addToItinerary: (id: string, label: string) => void;
  toggleChecklist: (id: string) => void;
  confirmIntent: () => void;
  addCheckin: (id: string) => void;
  pushEvent: (e: Omit<DeepEvent, "id" | "at">) => void;
  addFeedback: (f: Omit<LocalFeedback, "id" | "date" | "local">) => void;
  resetDemo: () => void;
  toast: (message: string) => void;
};

export const DeepContext = createContext<DeepContextValue | null>(null);

export const useDeep = (): DeepContextValue => {
  const ctx = useContext(DeepContext);
  if (!ctx) throw new Error("useDeep must be used inside DeepProvider");
  return ctx;
};
