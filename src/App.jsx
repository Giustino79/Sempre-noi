import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Trophy, PlusCircle, ShieldAlert, Users, Camera, 
  CheckCircle2, Sparkles, LogOut, Plus, UserPlus, Key, User, 
  Beer, Copy, Check, ChevronRight, ArrowLeft, BookOpen, Flag, 
  XCircle, Share2, RefreshCw, Eye, Sun, Crown, Trash2, Clock, Lock, Award,
  Newspaper, Store
} from 'lucide-react';
import Chiosco from './Chiosco';

// ============================================================================
// 🔗 LINK FIREBASE REALTIME DATABASE PRECONFIGURATO
// ============================================================================
const CLOUD_DB_URL = "https://sempre-noi-default-rtdb.europe-west1.firebasedatabase.app/"; 

const cleanDbUrl = CLOUD_DB_URL ? CLOUD_DB_URL.replace(/\/$/, "") : "";
const GAZZETTA_EXPIRY_MS = 24 * 60 * 60 * 1000;

const filterActiveGazzettaNews = (newsList, nowMs = Date.now()) => {
  return (newsList || [])
    .filter(n => n && n.createdAtMs && (nowMs - Number(n.createdAtMs)) < GAZZETTA_EXPIRY_MS)
    .slice(0, 30);
};

// --- LOGO UFFICIALE NON DEFORMATO ---
function SempreNoiLogo({ size = "md" }) {
  const [imgError, setImgError] = useState(false);
  const sizeClasses = { sm: "w-10 h-10", md: "w-12 h-12", lg: "w-20 h-20" }[size] || "w-12 h-12";

  return (
    <div className={`${sizeClasses} aspect-square rounded-full overflow-hidden border-2 border-amber-400 bg-slate-900 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0`}>
      {!imgError ? (
        <img
          src="/logo.jpg"
          alt="Sempre Noi Logo"
          className="w-full h-full object-cover aspect-square"
          onError={() => setImgError(true)}
        />
      ) : (
        <svg viewBox="0 0 64 64" className="w-full h-full p-1.5" fill="none">
          <path d="M32 6V12M24 9L27 14M40 9L37 14" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round"/>
          <rect x="13" y="20" width="15" height="22" rx="3" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="2"/>
          <rect x="36" y="20" width="15" height="22" rx="3" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="2"/>
        </svg>
      )}
    </div>
  );
}

// --- CATALOGO BICCHIERI AVATAR (8 STILI + LATTINA 24H) ---
const BEER_GLASS_TYPES = [
  { id: 'weiss', name: 'Weiss / Weizen', shortName: 'Weiss' },
  { id: 'lager', name: 'Lager / Pils', shortName: 'Lager' },
  { id: 'ipa', name: 'IPA Artigianale', shortName: 'IPA' },
  { id: 'session_ipa', name: 'Session IPA', shortName: 'Session IPA' },
  { id: 'dipa', name: 'DIPA (Double IPA)', shortName: 'DIPA' },
  { id: 'triple', name: 'Triple Belga', shortName: 'Triple' },
  { id: 'trappista', name: 'Trappista', shortName: 'Trappista' },
  { id: 'stout', name: 'Stout Irlandese', shortName: 'Stout' }
];

const isCrushedCanActive = (member) => {
  return Boolean(member?.rumenoUntil && Number(member.rumenoUntil) > Date.now());
};

const formatCaptainTimeLeft = (expiresAtMs, nowMs) => {
  if (!expiresAtMs) return '12h 00m';
  const diff = Number(expiresAtMs) - nowMs;
  if (diff <= 0) return '12h scadute (Attesa VAR)';
  const hrs = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  return `${hrs}h ${String(mins).padStart(2, '0')}m`;
};

function BeerGlassAvatar({ type = 'weiss', size = 'md', crushed = false }) {
  const effectiveType = crushed ? 'crushed_can' : type;
  const sizeClasses = { sm: 'w-8 h-8 p-1', md: 'w-11 h-11 p-1.5', lg: 'w-14 h-14 p-2' }[size] || 'w-11 h-11 p-1.5';

  return (
    <div className={`${sizeClasses} aspect-square rounded-2xl ${effectiveType === 'crushed_can' ? 'bg-red-950/80 border-red-500/70' : 'bg-slate-900 border-slate-700'} border flex items-center justify-center shadow-inner shrink-0 relative`}>
      {effectiveType === 'crushed_can' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M14 10L34 10L35 17L28 24L35 31L33 40L15 40L13 31L20 23L13 17Z" fill="#15803d" stroke="#cbd5e1" strokeWidth="1.6" />
          <ellipse cx="24" cy="10" rx="10" ry="2.5" fill="#e2e8f0" />
          <text x="24" y="36" textAnchor="middle" fill="#fef08a" fontSize="6.5" fontWeight="900">9%</text>
        </svg>
      )}
      {effectiveType === 'weiss' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M16 13C14.5 21 17.5 30 18 41H30C30.5 30 33.5 21 32 13H16Z" fill="#eab308" />
          <path d="M14.5 13.5C14 9.5 17.5 7 20.5 8C22.5 6 26 6 28 8C31 7 34 9.5 33.5 13.5H14.5Z" fill="#ffffff" />
          <path d="M15 11C13.5 20 17 30 17.5 42H30.5C31 30 34.5 20 33 11" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
        </svg>
      )}
      {effectiveType === 'lager' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M33 19H38.5C40.5 19 41.5 20.5 41.5 26C41.5 31.5 40.5 33 38.5 33H33" stroke="#cbd5e1" strokeWidth="2.8" fill="none" />
          <rect x="12" y="15" width="21" height="26" rx="2.5" fill="#facc15" />
          <path d="M11 15.5C11 12 13.5 10.5 16.5 11C18.5 8.5 23 8.5 25 11C28.5 10 34 11.5 34 15.5H11Z" fill="#ffffff" />
        </svg>
      )}
      {effectiveType === 'ipa' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M15 13L11.5 23.5L24 30L36.5 23.5L33 13H15Z" fill="#ea580c" />
          <path d="M14.5 13.5C14.5 10.5 18 9.5 24 9.5C30 9.5 33.5 10.5 33.5 13.5H14.5Z" fill="#fff7ed" />
          <path d="M24 30.5V41.5" stroke="#cbd5e1" strokeWidth="2.4" />
          <path d="M15.5 42.5C18 40.8 30 40.8 32.5 42.5" stroke="#e2e8f0" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      )}
      {effectiveType === 'session_ipa' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M13.5 14L12 19.5L14 23.5L16.5 42H31.5L34 23.5L36 19.5L34.5 14H13.5Z" fill="#fde047" />
          <path d="M13 14.5C13 11 16 9.5 24 9.5C32 9.5 35 11 35 14.5H13Z" fill="#ffffff" />
        </svg>
      )}
      {effectiveType === 'dipa' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M14 13C15.5 17 11 22 13 27.5C15 31.5 19.5 33 24 33C28.5 33 33 31.5 35 27.5C37 22 32.5 17 34 13H14Z" fill="#c2410c" />
          <path d="M24 33.5V41.5" stroke="#cbd5e1" strokeWidth="2.6" />
          <path d="M16 42.5C18.5 41 29.5 41 32 42.5" stroke="#e2e8f0" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      )}
      {effectiveType === 'triple' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M11 14C11 25 16.5 30 24 30C31.5 30 37 25 37 14H11Z" fill="#d97706" />
          <path d="M24 30.5V41" stroke="#cbd5e1" strokeWidth="2.8" />
          <path d="M15 42.5C17 40.5 31 40.5 33 42.5" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}
      {effectiveType === 'trappista' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M8.5 15C9.5 26.5 15.5 31 24 31C32.5 31 38.5 26.5 39.5 15H8.5Z" fill="#7c2d12" />
          <path d="M24 31.5V41" stroke="#cbd5e1" strokeWidth="3.2" />
          <path d="M14 42.5C17 40.5 31 40.5 34 42.5" stroke="#fbbf24" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      )}
      {effectiveType === 'stout' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M13 15L14.5 19L16.5 42H31.5L33.5 19L35 15H13Z" fill="#1c1917" />
          <path d="M13 15.5V11.5C13 10 15 9.5 24 9.5C33 9.5 35 10 35 11.5V15.5H13Z" fill="#f5deb3" />
        </svg>
      )}
    </div>
  );
}

// --- ICONE ALBO D'ORO ---
function AlboDrawing({ type }) {
  const configs = {
    goat: { bg: 'from-amber-500/30 to-yellow-900/40 border-amber-400', emoji: '🐐', badge: 'GOAT', bColor: 'bg-amber-400' },
    lemans: { bg: 'from-sky-500/30 to-blue-950/50 border-sky-400', emoji: '⏱️', badge: '24H', bColor: 'bg-sky-400' },
    idrovora: { bg: 'from-emerald-500/30 to-teal-950/50 border-emerald-400', emoji: '⛽', badge: 'MAX L', bColor: 'bg-emerald-400' },
    regoyim: { bg: 'from-pink-500/25 to-purple-950/50 border-pink-400/80', emoji: '🍼', badge: 'GOYIM', bColor: 'bg-pink-400' }
  }[type] || { bg: 'from-slate-800 to-slate-900 border-slate-700', emoji: '🏆', badge: 'MVP', bColor: 'bg-amber-400' };

  return (
    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${configs.bg} border-2 flex flex-col items-center justify-center shadow-lg shrink-0 relative`}>
      <span className="text-2xl leading-none">{configs.emoji}</span>
      <span className={`text-[8px] font-black uppercase ${configs.bColor} text-slate-950 px-1.5 rounded-full mt-0.5`}>{configs.badge}</span>
    </div>
  );
}

// --- DISCLAIMER PERSONALI (1ª, 2ª, 3ª BIRRA) ---
const PERSONAL_DISCLAIMERS = {
  1: { badge: '1ª Birra del Giorno', emoji: '🍻', title: 'Alla salute!', message: 'Prima birra della giornata messa a referto! Motore in temperatura.', buttonText: 'Daje tutta! 🍺', theme: 'from-amber-500/30 via-slate-900 to-slate-950 border-amber-400 text-amber-300' },
  2: { badge: '2ª Birra del Giorno', emoji: '⚽🔥', title: 'Doppietta, bravo bomber!', message: 'Seconda stappata di giornata: passo gara da attaccante di razza!', buttonText: 'Puntiamo alla tripletta! 🚀', theme: 'from-emerald-500/30 via-slate-900 to-slate-950 border-emerald-400 text-emerald-300' },
  3: { badge: '3ª Birra del Giorno', emoji: '🧐🚨', title: 'Ehi calmo, vuoi diventare Mario?', message: 'Siamo già alla terza birra... dalla panchina iniziano a preoccuparsi!', buttonText: 'Tranquilli, reggo il passo! 😎', theme: 'from-purple-500/30 via-slate-900 to-slate-950 border-purple-400 text-purple-300' }
};

// --- OPZIONI SALA VAR ---
const VAR_PENALTY_OPTIONS = [
  { id: 'yellow', label: '🟨 Cartellino giallo: birra avanzata -2pt', desc: 'Toglie esattamente -2 pt e assegna 1 Cartellino Giallo.', penaltyPts: 2 },
  { id: 'simulation', label: '🚨 Simulazione in area: foto riciclata/vuota -5pt', desc: 'Toglie esattamente -5 pt e annulla la bevuta dal VAR.', penaltyPts: 5 },
  { id: 'red', label: '🟥 Cartellino rosso: birra analcolica/radler -10pt', desc: 'Toglie esattamente -10 pt e assegna 1 Cartellino Rosso.', penaltyPts: 10 }
];

const checkGocciaWindow = () => {
  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  const isOpen = totalMinutes >= 7 * 60 && totalMinutes <= 12 * 60 + 30;
  return { isOpen, isTooEarly: totalMinutes < 7 * 60 };
};

const checkCaptainWindow = () => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const isFriOrSat = day === 5 || day === 6;
  const isBefore20 = hour < 20;
  const dayNames = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  return {
    isOpen: isFriOrSat && isBefore20,
    reason: !isFriOrSat ? `Oggi è ${dayNames[day]}: solo Ven e Sab entro le 20:00` : 'Tempo scaduto per dichiarare il Capitano stasera'
  };
};

const getCurrentWeekKey = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${weekNum}`;
};

const getTodayDateKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

// --- GESTIONE AUTOMATICA SCADENZA CAPITANO (12 ORE) E NOTIZIE (>24H) ---
const settleExpiredCaptainsInLeague = (leagueObj, nowMs) => {
  if (!leagueObj || !leagueObj.members) return { updatedLeague: leagueObj, changed: false, events: [] };

  let changed = false;
  const events = [];
  let currentFeed = [...(leagueObj.feed || [])];
  const rawGazzetta = leagueObj.gazzetta || [];
  let currentGazzetta = filterActiveGazzettaNews(rawGazzetta, nowMs);
  if (currentGazzetta.length !== rawGazzetta.length) changed = true;

  const prevSorted = [...(leagueObj.members || [])].sort((a, b) => b.points - a.points);
  const prevLeader = prevSorted[0];

  const updatedMembers = leagueObj.members.map(m => {
    if (!m.captainActive || !m.captainExpiresAtMs) return m;
    if (nowMs < Number(m.captainExpiresAtMs)) return m;

    const confirmedCount = m.captainBeers || 0;
    const pendingCapBeersInVar = currentFeed.filter(b => b.playerId === m.id && b.isCaptainBeer);
    if (confirmedCount < 4 && (confirmedCount + pendingCapBeersInVar.length) >= 4) return m;

    changed = true;
    if (confirmedCount >= 4) {
      const vaultPts = Number((m.captainVaultPoints || 0).toFixed(1));
      const vaultLiters = Number((m.captainVaultLiters || 0).toFixed(2));
      events.push({ type: 'success', playerName: m.name, pts: vaultPts });
      return {
        ...m,
        captainActive: false, captainExpiresAtMs: null, captainBeers: 0, captainBeersSubmitted: 0,
        captainVaultPoints: 0, captainVaultLiters: 0,
        points: Number((m.points + vaultPts).toFixed(1)),
        weekendPts: Number((m.weekendPts + vaultPts).toFixed(1)),
        beers: (m.beers || 0) + 4,
        liters: Number(((m.liters || (m.beers || 0) * 0.5) + vaultLiters).toFixed(2))
      };
    } else {
      currentFeed = currentFeed.filter(b => !(b.playerId === m.id && b.isCaptainBeer));
      events.push({ type: 'fail', playerName: m.name, confirmedCount });
      return {
        ...m,
        captainActive: false, captainExpiresAtMs: null, captainBeers: 0, captainBeersSubmitted: 0,
        captainVaultPoints: 0, captainVaultLiters: 0,
        points: Number((m.points - 20).toFixed(1)),
        weekendPts: Number((m.weekendPts - 20).toFixed(1))
      };
    }
  });

  if (!changed) return { updatedLeague: leagueObj, changed: false, events: [] };

  if (updatedMembers.length > 1) {
    const newSorted = [...updatedMembers].sort((a, b) => b.points - a.points);
    const newLeader = newSorted[0];
    if (prevLeader && newLeader && prevLeader.id !== newLeader.id) {
      const overtakeNews = {
        id: 'news_sorpasso_cap_' + nowMs,
        category: 'SORPASSO IN CURVA',
        icon: '🏎️',
        badgeColor: 'bg-emerald-500 text-slate-950',
        text: `${newLeader.name} si prende la Pole Position (${newLeader.points} pt)! ${prevLeader.name} scivola dietro!`,
        timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
        dateLabel: new Date().toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' }),
        createdAtMs: nowMs
      };
      currentGazzetta = filterActiveGazzettaNews([overtakeNews, ...currentGazzetta], nowMs);
    }
  }

  return {
    updatedLeague: { ...leagueObj, members: updatedMembers, feed: currentFeed, gazzetta: currentGazzetta },
    changed: true,
    events
  };
};

const DEFAULT_LEAGUES = [
  {
    id: 'SN-2026',
    name: 'Lega Storica Sempre Noi',
    adminId: 'usr_manolo',
    members: [
      { id: 'u1', name: 'Manolo', glassType: 'trappista', points: 54.5, weekendPts: 21.0, beers: 7, liters: 3.8, yellowCards: 1, redCards: 0, captainActive: false, captainBeers: 0, captainBeersSubmitted: 0, captainVaultPoints: 0, captainVaultLiters: 0, captainExpiresAtMs: null, captainWeekUsed: null, rumenoUntil: null, lastDrinkAtMs: Date.now() - 3600000, dailyDate: '', dailyCount: 0 },
      { id: 'u2', name: 'Marco', glassType: 'ipa', points: 46.0, weekendPts: 17.5, beers: 6, liters: 3.0, yellowCards: 0, redCards: 0, captainActive: true, captainBeers: 2, captainBeersSubmitted: 2, captainVaultPoints: 26.0, captainVaultLiters: 1.0, captainExpiresAtMs: Date.now() + 8 * 3600000, captainWeekUsed: '2026-W46', rumenoUntil: null, lastDrinkAtMs: Date.now() - 7200000, dailyDate: '', dailyCount: 0 },
      { id: 'u3', name: 'Andrea', glassType: 'stout', points: 38.0, weekendPts: 12.0, beers: 5, liters: 2.5, yellowCards: 0, redCards: 0, captainActive: false, captainBeers: 0, captainBeersSubmitted: 0, captainVaultPoints: 0, captainVaultLiters: 0, captainExpiresAtMs: null, captainWeekUsed: null, rumenoUntil: null, lastDrinkAtMs: Date.now() - 86400000, dailyDate: '', dailyCount: 0 },
      { id: 'u4', name: 'Luca', glassType: 'lager', points: 21.5, weekendPts: 6.0, beers: 4, liters: 1.6, yellowCards: 1, redCards: 1, captainActive: false, captainBeers: 0, captainBeersSubmitted: 0, captainVaultPoints: 0, captainVaultLiters: 0, captainExpiresAtMs: null, captainWeekUsed: null, rumenoUntil: null, lastDrinkAtMs: Date.now() - 6 * 86400000, dailyDate: '', dailyCount: 0 }
    ],
    history: [],
    gazzetta: [],
    feed: []
  }
];

export default function App() {
  const [accounts, setAccounts] = useState(() => JSON.parse(localStorage.getItem('sempre_noi_accounts_db') || '[]'));
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('sempre_noi_active_user') || 'null'));
  const [savedCreds, setSavedCreds] = useState(() => JSON.parse(localStorage.getItem('sempre_noi_remembered_creds') || '{"username":"","password":""}'));

  const [authMode, setAuthMode] = useState('login');
  const [authUsername, setAuthUsername] = useState(savedCreds.username || '');
  const [authPassword, setAuthPassword] = useState(savedCreds.password || '');
  const [rememberMe, setRememberMe] = useState(true);

  const [leagues, setLeagues] = useState(() => JSON.parse(localStorage.getItem('sempre_noi_leagues_v3') || JSON.stringify(DEFAULT_LEAGUES)));
  const [activeLeagueId, setActiveLeagueId] = useState(null);
  const [showCreateLeagueModal, setShowCreateLeagueModal] = useState(false);
  const [showJoinLeagueModal, setShowJoinLeagueModal] = useState(false);
  const [leagueToDelete, setLeagueToDelete] = useState(null);
  const [newLeagueName, setNewLeagueName] = useState('');
  const [joinLeagueCode, setJoinLeagueCode] = useState('');
  const [joinLeagueCustomName, setJoinLeagueCustomName] = useState('');
  const [copiedType, setCopiedType] = useState(null);

  // Navigazione: 'classifica' | 'stappa' | 'var' | 'albo' | 'chiosco'
  const [activeTab, setActiveTab] = useState('classifica');
  const [toastMessage, setToastMessage] = useState(null);
  const [showGlassPicker, setShowGlassPicker] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [clockTick, setClockTick] = useState(Date.now());
  const [personalDisclaimer, setPersonalDisclaimer] = useState(null);
  const [showGazzettaModal, setShowGazzettaModal] = useState(false);
  const [breakingNewsAlert, setBreakingNewsAlert] = useState(null);
  const [readNewsByLeague, setReadNewsByLeague] = useState(() => JSON.parse(localStorage.getItem('sempre_noi_read_gazzetta_map') || '{}'));

  const [beerTitle, setBeerTitle] = useState('');
  const [format, setFormat] = useState('spina50');
  const [abvTier, setAbvTier] = useState('leggera');
  const [qualityTier, setQualityTier] = useState('spina');
  const [bonusSempreNoi, setBonusSempreNoi] = useState(false);
  const [bonusGocciaDOro, setBonusGocciaDOro] = useState(() => checkGocciaWindow().isOpen);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fallbackCameraInputRef = useRef(null);

  const [varModalBeer, setVarModalBeer] = useState(null);
  const [selectedPenaltyId, setSelectedPenaltyId] = useState('simulation');

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setClockTick(Date.now());
      if (!checkGocciaWindow().isOpen) setBonusGocciaDOro(false);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const gocciaStatus = useMemo(() => checkGocciaWindow(), [clockTick]);
  const captainWindowStatus = useMemo(() => checkCaptainWindow(), [clockTick]);
  const currentWeekKey = useMemo(() => getCurrentWeekKey(), [clockTick]);

  const pushLeagueToCloud = async (leagueObj) => {
    if (!cleanDbUrl || !leagueObj?.id) return;
    try {
      await fetch(`${cleanDbUrl}/leagues/${leagueObj.id}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leagueObj)
      });
    } catch (e) {}
  };

  const fetchAllLeaguesFromCloud = async () => {
    if (!cleanDbUrl) return null;
    try {
      const res = await fetch(`${cleanDbUrl}/leagues.json`);
      if (!res.ok) return null;
      const data = await res.json();
      if (!data) return null;

      const nowMs = Date.now();
      const rawValues = Object.values(data);
      const deletedIds = new Set(rawValues.filter(l => l && l.deleted).map(l => l.id));
      const cloudList = rawValues
        .filter(l => l && l.id && !l.deleted)
        .map(l => ({
          ...l,
          members: l.members || [],
          history: l.history || [],
          gazzetta: filterActiveGazzettaNews(l.gazzetta || [], nowMs),
          feed: (l.feed || []).map(item => ({
            ...item,
            approvals: item.approvals || [],
            varVotes: item.varVotes || []
          }))
        }));

      setLeagues(prev => {
        const mergedMap = new Map();
        prev.forEach(item => { if (!deletedIds.has(item.id)) mergedMap.set(item.id, item); });
        cloudList.forEach(item => mergedMap.set(item.id, item));
        return Array.from(mergedMap.values());
      });

      setActiveLeagueId(currentId => (currentId && deletedIds.has(currentId) ? null : currentId));
      return cloudList;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (!cleanDbUrl) return;
    fetchAllLeaguesFromCloud();
    const interval = setInterval(fetchAllLeaguesFromCloud, 3000);
    return () => clearInterval(interval);
  }, []);

  const activeLeague = leagues.find(l => l.id === activeLeagueId);
  const activeGazzettaList = useMemo(() => filterActiveGazzettaNews(activeLeague?.gazzetta || [], clockTick), [activeLeague?.gazzetta, clockTick]);
  const latestGazzettaNews = activeGazzettaList[0] || null;

  const hasUnreadGazzetta = Boolean(
    activeLeague && latestGazzettaNews && readNewsByLeague[activeLeague.id] !== latestGazzettaNews.id
  );

  const handleOpenGazzetta = () => {
    setShowGazzettaModal(true);
    setBreakingNewsAlert(null);
    if (activeLeague && latestGazzettaNews) {
      const updatedMap = { ...readNewsByLeague, [activeLeague.id]: latestGazzettaNews.id };
      setReadNewsByLeague(updatedMap);
      localStorage.setItem('sempre_noi_read_gazzetta_map', JSON.stringify(updatedMap));
    }
  };

  useEffect(() => {
    if (!activeLeague) return;
    const { updatedLeague, changed, events } = settleExpiredCaptainsInLeague(activeLeague, clockTick);
    if (changed) {
      setLeagues(prev => prev.map(l => l.id === activeLeague.id ? updatedLeague : l));
      pushLeagueToCloud(updatedLeague);
      if (events.length > 0) {
        const ev = events[0];
        if (ev.type === 'success') {
          showToast(`👑 12h Concluse! ${ev.playerName} ha completato le 4/4 birre: +${ev.pts} pt accreditati!`, 'success');
        } else {
          showToast(`🚨 12h Scadute! ${ev.playerName} fermo a ${ev.confirmedCount}/4: 0 pt birre e MALUS -20 pt!`, 'danger');
        }
      }
    }
  }, [clockTick, activeLeague]);

  useEffect(() => { localStorage.setItem('sempre_noi_accounts_db', JSON.stringify(accounts)); }, [accounts]);
  useEffect(() => {
    if (currentUser) localStorage.setItem('sempre_noi_active_user', JSON.stringify(currentUser));
    else localStorage.removeItem('sempre_noi_active_user');
  }, [currentUser]);
  useEffect(() => { localStorage.setItem('sempre_noi_leagues_v3', JSON.stringify(leagues)); }, [leagues]);

  useEffect(() => {
    if (!activeLeague || !latestGazzettaNews) return;
    const storageKey = `sempre_noi_seen_news_${activeLeague.id}`;
    if (latestGazzettaNews.id !== localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, latestGazzettaNews.id);
      setBreakingNewsAlert(latestGazzettaNews);
      const timer = setTimeout(() => setBreakingNewsAlert(null), 7000);
      return () => clearTimeout(timer);
    }
  }, [activeLeague?.id, latestGazzettaNews?.id]);

  const handleConfirmDeleteLeague = async () => {
    if (!leagueToDelete) return;
    const targetId = leagueToDelete.id;
    const targetName = leagueToDelete.name;

    setLeagues(prev => prev.filter(l => l.id !== targetId));
    if (activeLeagueId === targetId) setActiveLeagueId(null);
    setLeagueToDelete(null);

    if (cleanDbUrl) {
      try {
        await fetch(`${cleanDbUrl}/leagues/${targetId}.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: targetId, deleted: true })
        });
      } catch (e) {}
    }
    showToast(`🗑️ Lega "${targetName}" eliminata definitivamente.`, 'warning');
  };

  const joinOrCreateSharedLeague = async (rawCode, optionalName = '', optionalHost = '') => {
    const cleanCode = rawCode.trim().toUpperCase();
    if (!cleanCode) return showToast('Inserisci un codice lega valido!', 'danger');

    const newMemberObj = {
      id: currentUser.id, name: currentUser.username, glassType: currentUser.glassType || 'weiss',
      points: 0, weekendPts: 0, beers: 0, liters: 0, yellowCards: 0, redCards: 0,
      captainActive: false, captainBeers: 0, captainBeersSubmitted: 0, captainVaultPoints: 0, captainVaultLiters: 0,
      captainExpiresAtMs: null, captainWeekUsed: null, rumenoUntil: null, lastDrinkAtMs: null, dailyDate: '', dailyCount: 0
    };

    let targetLeague = leagues.find(l => l.id.toUpperCase() === cleanCode);
    if (targetLeague) {
      const isAlready = targetLeague.members.some(m => m.id === currentUser.id);
      const updated = isAlready ? targetLeague : { ...targetLeague, members: [...targetLeague.members, newMemberObj] };
      setLeagues(prev => prev.map(l => l.id.toUpperCase() === cleanCode ? updated : l));
      await pushLeagueToCloud(updated);
      setActiveLeagueId(updated.id);
      setShowJoinLeagueModal(false);
      showToast(`🎉 Sei entrato nella lega "${updated.name}"!`, 'success');
    } else {
      const title = optionalName.trim() || joinLeagueCustomName.trim() || `Lega Sempre Noi (${cleanCode})`;
      const hostMember = optionalHost && optionalHost !== currentUser.username
        ? [{ id: 'usr_' + optionalHost.toLowerCase().replace(/\s+/g, '_'), name: optionalHost, glassType: 'lager', points: 0, weekendPts: 0, beers: 0, liters: 0, yellowCards: 0, redCards: 0, captainActive: false, captainBeers: 0, captainBeersSubmitted: 0, captainVaultPoints: 0, captainVaultLiters: 0, captainExpiresAtMs: null, captainWeekUsed: null, rumenoUntil: null, lastDrinkAtMs: null, dailyDate: '', dailyCount: 0 }]
        : [];
      const synced = { id: cleanCode, name: title, adminId: currentUser.id, members: [...hostMember, newMemberObj], history: [], gazzetta: [], feed: [] };
      setLeagues(prev => [synced, ...prev]);
      await pushLeagueToCloud(synced);
      setActiveLeagueId(cleanCode);
      setShowJoinLeagueModal(false);
      showToast(`🍻 Sei entrato nella lega "${title}"!`, 'success');
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const cleanUser = authUsername.trim();
    const cleanPass = authPassword.trim();
    if (!cleanUser || !cleanPass) return showToast('Inserisci sia username che password!', 'danger');

    const userId = 'usr_' + cleanUser.toLowerCase().replace(/\s+/g, '_');
    const existing = accounts.find(a => a.username.toLowerCase() === cleanUser.toLowerCase());

    if (authMode === 'register') {
      if (existing) return showToast('Username già esistente! Fai Accedi.', 'warning');
      const newAcc = { id: userId, username: cleanUser, password: cleanPass, glassType: 'weiss' };
      setAccounts([...accounts, newAcc]);
      setCurrentUser(newAcc);
      if (rememberMe) localStorage.setItem('sempre_noi_remembered_creds', JSON.stringify({ username: cleanUser, password: cleanPass }));
      showToast(`Account creato! Benvenuto ${cleanUser} 🍺`, 'success');
    } else {
      if (existing && existing.password !== cleanPass) return showToast('Password errata!', 'danger');
      const logged = existing || { id: userId, username: cleanUser, password: cleanPass, glassType: 'weiss' };
      if (!existing) setAccounts([...accounts, logged]);
      setCurrentUser(logged);
      if (rememberMe) localStorage.setItem('sempre_noi_remembered_creds', JSON.stringify({ username: cleanUser, password: cleanPass }));
      showToast(`Bentornato ${logged.username}!`, 'success');
    }
  };

  const handleLogout = () => {
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    setCurrentUser(null);
    setActiveLeagueId(null);
    showToast('Disconnesso. Credenziali ricordate.', 'warning');
  };

  const handleCreateLeague = async (e) => {
    e.preventDefault();
    if (!newLeagueName.trim()) return;
    const code = 'SN-' + Math.floor(1000 + Math.random() * 9000);
    const newL = {
      id: code, name: newLeagueName.trim(), adminId: currentUser.id,
      members: [{ id: currentUser.id, name: currentUser.username, glassType: currentUser.glassType || 'weiss', points: 0, weekendPts: 0, beers: 0, liters: 0, yellowCards: 0, redCards: 0, captainActive: false, captainBeers: 0, captainBeersSubmitted: 0, captainVaultPoints: 0, captainVaultLiters: 0, captainExpiresAtMs: null, captainWeekUsed: null, rumenoUntil: null, lastDrinkAtMs: null, dailyDate: '', dailyCount: 0 }],
      history: [], gazzetta: [], feed: []
    };
    setLeagues([newL, ...leagues]);
    await pushLeagueToCloud(newL);
    setActiveLeagueId(code);
    setShowCreateLeagueModal(false);
    setNewLeagueName('');
    showToast(`Lega "${newL.name}" creata!`, 'success');
  };

  const myMemberProfile = activeLeague?.members.find(m => m.id === currentUser?.id);
  const myCrushedCanActive = isCrushedCanActive(myMemberProfile);
  const currentGlassObj = useMemo(() => BEER_GLASS_TYPES.find(g => g.id === (currentUser?.glassType || 'weiss')) || BEER_GLASS_TYPES[0], [currentUser]);
  const hasUsedCaptainThisWeek = Boolean(myMemberProfile?.captainWeekUsed === currentWeekKey || (myMemberProfile?.captainUsedThisWeek && !myMemberProfile?.captainWeekUsed));

  const handleCopyInvite = (leagueObj, type) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?join=${encodeURIComponent(leagueObj.id)}&name=${encodeURIComponent(leagueObj.name)}&host=${encodeURIComponent(currentUser.username)}`;
    const txt = type === 'link' ? `🍺 Entra nella lega "${leagueObj.name}" su Sempre Noi! ${shareUrl}` : leagueObj.id;
    if (navigator.clipboard) navigator.clipboard.writeText(txt);
    setCopiedType(type);
    showToast(type === 'link' ? 'Link invito copiato!' : `Codice ${leagueObj.id} copiato!`, 'success');
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleActivateCaptain = () => {
    if (!activeLeagueId || !myMemberProfile) return;
    if (!captainWindowStatus.isOpen) return showToast(`🔒 ${captainWindowStatus.reason}`, 'danger');
    if (hasUsedCaptainThisWeek && !myMemberProfile.captainActive) return showToast('Bonus Capitano già usato questa settimana!', 'warning');

    const nowMs = Date.now();
    const expiresAtMs = nowMs + 12 * 60 * 60 * 1000;
    setLeagues(prev => prev.map(l => {
      if (l.id !== activeLeagueId) return l;
      const updated = {
        ...l,
        members: l.members.map(m => m.id === currentUser.id ? { ...m, captainActive: true, captainBeers: 0, captainBeersSubmitted: 0, captainVaultPoints: 0, captainVaultLiters: 0, captainStartedAtMs: nowMs, captainExpiresAtMs: expiresAtMs, captainWeekUsed: currentWeekKey, captainUsedThisWeek: true } : m)
      };
      pushLeagueToCloud(updated);
      return updated;
    }));
    showToast('👑 Timer 12h avviato! Le tue prime 4 birre valgono PUNTI DOPPI (x2) sbloccati solo a 12h se 4/4 confermate!', 'success');
  };

  const startCamera = async () => {
    setCapturedPhoto(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
      streamRef.current = stream;
      setIsCameraOpen(true);
      setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = stream; }, 100);
    } catch (err) { fallbackCameraInputRef.current?.click(); }
  };

  const stopCameraStream = () => {
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    setIsCameraOpen(false);
  };

  const captureInstantPhoto = () => {
    if (!videoRef.current) return;
    const rawW = videoRef.current.videoWidth || 640;
    const rawH = videoRef.current.videoHeight || 480;
    const scale = Math.min(1, 480 / rawW);
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(rawW * scale); canvas.height = Math.round(rawH * scale);
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setCapturedPhoto(canvas.toDataURL('image/jpeg', 0.65));
    stopCameraStream();
    showToast('📸 Foto acquisita!', 'success');
  };

  const calculatedDrink = useMemo(() => {
    const fMap = { piccola33: { pts: 3, liters: 0.33, label: '33cl (+3pt)' }, spina50: { pts: 5, liters: 0.5, label: 'Media 50cl (+5pt)' }, litro: { pts: 8, liters: 1.0, label: '1 litro (+8pt)' } };
    const aMap = { leggera: { mult: 1.0, label: 'Leggera fino a 5,6° (x1.0)' }, media: { mult: 1.3, label: 'Media 5,6° - 7,5° (x1.3)' }, forte: { mult: 1.7, label: 'Forte > 7,5° (x1.7)' } };
    const qMap = { industriale: { bonus: 0, label: 'Industriale (+0pt)' }, artigianale: { bonus: 2, label: 'Artigianale (+2pt)' }, spina: { bonus: 3, label: 'Alla spina (+3pt)' }, rumeno: { bonus: -5, label: 'Passaporto Rumeno (-5pt)' } };

    const base = fMap[format].pts;
    const liters = fMap[format].liters;
    const mult = aMap[abvTier].mult;
    const qualityBonus = qMap[qualityTier].bonus;
    const gocciaBonus = gocciaStatus.isOpen && bonusGocciaDOro ? 3 : 0;
    const isWithin12h = Boolean(myMemberProfile?.captainActive && (!myMemberProfile?.captainExpiresAtMs || clockTick < Number(myMemberProfile.captainExpiresAtMs)));
    const eligibleForCaptainDouble = isWithin12h && (myMemberProfile?.captainBeersSubmitted || 0) < 4;

    let subtotal = (base * mult) + qualityBonus;
    if (bonusSempreNoi) subtotal *= 1.3;
    subtotal += gocciaBonus;
    if (eligibleForCaptainDouble) subtotal *= 2;

    return {
      total: Number(subtotal.toFixed(1)),
      base, liters, mult, qualityBonus, gocciaBonus, eligibleForCaptainDouble,
      nextCaptainSlot: eligibleForCaptainDouble ? (myMemberProfile?.captainBeersSubmitted || 0) + 1 : null,
      formatLabel: fMap[format].label, abvLabel: aMap[abvTier].label, styleLabel: qMap[qualityTier].label
    };
  }, [format, abvTier, qualityTier, bonusSempreNoi, bonusGocciaDOro, gocciaStatus.isOpen, myMemberProfile, clockTick]);

  const handleAddBeer = (e) => {
    e.preventDefault();
    if (!capturedPhoto) return showToast('⚠️ Scatta la foto prima di confermare!', 'danger');

    const nowMs = Date.now();
    const todayKey = getTodayDateKey();
    const isRumeno = qualityTier === 'rumeno';
    const isCapSlot = calculatedDrink.eligibleForCaptainDouble;

    const prevCount = myMemberProfile?.dailyDate === todayKey ? (myMemberProfile?.dailyCount || 0) : 0;
    const newCount = prevCount + 1;
    if (newCount >= 1 && newCount <= 3) setPersonalDisclaimer(PERSONAL_DISCLAIMERS[newCount]);

    const newsItems = [];
    if (isRumeno) {
      newsItems.push({ id: 'news_deg_' + nowMs, category: 'ALLARME DEGRADO', icon: '🥫', badgeColor: 'bg-red-600 text-white', text: `${currentUser.username} ha stappato un Passaporto Rumeno! Chiudete le finestre!`, timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }), dateLabel: new Date().toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' }), createdAtMs: nowMs });
    }

    const activeBonuses = [];
    if (isRumeno) activeBonuses.push('Passaporto Rumeno (-5pt • 🥫 24h)');
    if (bonusSempreNoi) activeBonuses.push('Sempre noi (x1.3)');
    if (gocciaStatus.isOpen && bonusGocciaDOro) activeBonuses.push("Goccia d'Oro (+3pt)");
    if (isCapSlot) activeBonuses.push(`👑 Birra Capitano ${calculatedDrink.nextCaptainSlot}/4 (x2)`);

    const newBeer = {
      id: 'b_' + nowMs, playerId: currentUser.id, playerName: currentUser.username, glassType: currentUser.glassType || 'weiss',
      beerName: beerTitle.trim() || (isRumeno ? 'Lattina da Battaglia' : 'Birra Fresca'),
      formatId: format, liters: calculatedDrink.liters, formatLabel: calculatedDrink.formatLabel, abvLabel: calculatedDrink.abvLabel, styleLabel: calculatedDrink.styleLabel,
      isRumeno, isCaptainBeer: isCapSlot, captainSlot: calculatedDrink.nextCaptainSlot, points: calculatedDrink.total,
      timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
      createdAtMs: nowMs, location: bonusSempreNoi ? 'Tavolata "Sempre noi"' : 'Fotocamera Live', photoUrl: capturedPhoto,
      bonuses: activeBonuses, approvals: [], varVotes: [], status: 'pending_var'
    };

    setLeagues(prev => prev.map(l => {
      if (l.id !== activeLeagueId) return l;
      const updated = {
        ...l,
        feed: [newBeer, ...(l.feed || [])],
        gazzetta: filterActiveGazzettaNews([...newsItems, ...(l.gazzetta || [])], nowMs),
        members: l.members.map(m => m.id === currentUser.id ? { ...m, rumenoUntil: isRumeno ? nowMs + 24 * 3600000 : m.rumenoUntil, captainBeersSubmitted: isCapSlot ? (m.captainBeersSubmitted || 0) + 1 : m.captainBeersSubmitted, lastDrinkAtMs: nowMs, dailyDate: todayKey, dailyCount: newCount } : m)
      };
      pushLeagueToCloud(updated);
      return updated;
    }));

    setBeerTitle(''); setCapturedPhoto(null); setBonusSempreNoi(false);
    showToast(`📸 Birra inviata in Sala VAR (${calculatedDrink.total >= 0 ? `+${calculatedDrink.total}` : calculatedDrink.total} pt in palio)!`, 'success');
    setActiveTab('var');
  };

  const handleApproveBeer = (beerId) => {
    const target = (activeLeague?.feed || []).find(item => item.id === beerId);
    if (!target) return;
    if (target.playerId === currentUser.id) return showToast('⚠️ Non puoi confermare la tua birra!', 'warning');
    if ((target.approvals || []).includes(currentUser.id)) return;

    const newApprovals = [...(target.approvals || []), currentUser.id];
    const reached2 = newApprovals.length >= 2;
    const isCap = Boolean(target.isCaptainBeer);

    setLeagues(prev => prev.map(l => {
      if (l.id !== activeLeagueId) return l;
      const nowMs = Date.now();
      const updatedFeed = reached2 ? (l.feed || []).filter(item => item.id !== beerId) : (l.feed || []).map(item => item.id === beerId ? { ...item, approvals: newApprovals } : item);
      const drinkL = Number(target.liters || 0.5);

      const updatedMembers = reached2 ? l.members.map(m => {
        if (m.id !== target.playerId) return m;
        if (isCap && m.captainActive) {
          return { ...m, captainBeers: (m.captainBeers || 0) + 1, captainVaultPoints: Number(((m.captainVaultPoints || 0) + target.points).toFixed(1)), captainVaultLiters: Number(((m.captainVaultLiters || 0) + drinkL).toFixed(2)) };
        }
        return { ...m, points: Number((m.points + target.points).toFixed(1)), weekendPts: Number((m.weekendPts + target.points).toFixed(1)), beers: m.beers + 1, liters: Number(((m.liters || m.beers * 0.5) + drinkL).toFixed(2)) };
      }) : l.members;

      const draft = { ...l, feed: updatedFeed, members: updatedMembers };
      const { updatedLeague: finalL } = settleExpiredCaptainsInLeague(draft, nowMs);
      pushLeagueToCloud(finalL);
      return finalL;
    }));

    if (reached2) showToast(`🍻 Birra confermata (2/2)! Foto rimossa dal VAR!`, 'success');
    else showToast('✅ 1ª Conferma registrata (1/2)!', 'success');
  };

  const handleConfirmVarCall = () => {
    if (!varModalBeer || !activeLeagueId) return;
    const opt = VAR_PENALTY_OPTIONS.find(o => o.id === selectedPenaltyId) || VAR_PENALTY_OPTIONS[1];
    const votes = [...(varModalBeer.varVotes || []), { voterId: currentUser.id, voterName: currentUser.username, reasonId: opt.id, reasonLabel: opt.label }];
    const reached2 = votes.length >= 2;
    const malus = Number(opt.penaltyPts);

    setLeagues(prev => prev.map(l => {
      if (l.id !== activeLeagueId) return l;
      const updatedFeed = reached2 ? (l.feed || []).filter(item => item.id !== varModalBeer.id) : (l.feed || []).map(item => item.id === varModalBeer.id ? { ...item, varVotes: votes } : item);
      const updatedMembers = reached2 ? l.members.map(m => m.id === varModalBeer.playerId ? { ...m, points: Number((m.points - malus).toFixed(1)), weekendPts: Number((m.weekendPts - malus).toFixed(1)) } : m) : l.members;
      const draft = { ...l, feed: updatedFeed, members: updatedMembers };
      pushLeagueToCloud(draft);
      return draft;
    }));

    setVarModalBeer(null);
    if (reached2) showToast(`🚨 VAR Confermato (2/2)! Applicato malus -${malus} pt!`, 'danger');
    else showToast(`🖥️ 1ª Segnalazione VAR (1/2) per -${malus} pt!`, 'warning');
  };

  const sortedMembers = useMemo(() => [...(activeLeague?.members || [])].sort((a, b) => b.points - a.points), [activeLeague]);
  const leaderPoints = sortedMembers[0]?.points || 0;

  const alboRecords = useMemo(() => {
    const members = activeLeague?.members || [];
    if (members.length === 0) return null;
    const mvp = [...members].sort((a, b) => b.points - a.points)[0];
    const idrovora = [...members].sort((a, b) => (b.liters || b.beers * 0.5) - (a.liters || a.beers * 0.5))[0];
    const goyim = [...members].sort((a, b) => a.beers - b.beers || a.points - b.points)[0];

    return [
      { id: 'mvp', title: 'MVP Mensile', subtitle: 'Il GOAT della lega', drawingType: 'goat', member: mvp, statBadge: `${mvp.points} pt`, accent: 'border-amber-400/50 bg-gradient-to-r from-amber-500/15 to-slate-900' },
      { id: 'lemans', title: '24 Ore di Le Mans', subtitle: 'Record birre in 24h', drawingType: 'lemans', member: mvp, statBadge: `${Math.max(1, Math.ceil(mvp.beers / 2))} birre in 24h`, accent: 'border-sky-400/50 bg-gradient-to-r from-sky-500/15 to-slate-900' },
      { id: 'idrovora', title: "L'Idrovora", subtitle: 'Massimo litri scolati', drawingType: 'idrovora', member: idrovora, statBadge: `${(idrovora.liters || idrovora.beers * 0.5).toFixed(1)} L`, accent: 'border-emerald-400/50 bg-gradient-to-r from-emerald-500/15 to-slate-900' },
      { id: 'regoyim', title: 'Re Goyim', subtitle: 'Cucchiaio di legno', drawingType: 'regoyim', member: goyim, statBadge: `${goyim.beers} birre`, accent: 'border-pink-400/50 bg-gradient-to-r from-pink-500/15 to-slate-900' }
    ];
  }, [activeLeague]);

  // =========================================================================
  // VISTA 1: LOGIN
  // =========================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
          <div className="flex flex-col items-center text-center space-y-2">
            <SempreNoiLogo size="lg" />
            <h1 className="text-2xl font-black uppercase tracking-wider text-amber-400 pt-1">Sempre Noi</h1>
            <p className="text-xs text-slate-400">Campionato Fantabirra • F1 Mode</p>
          </div>
          <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button onClick={() => setAuthMode('login')} className={`py-2 rounded-xl text-xs font-black uppercase ${authMode === 'login' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>Accedi</button>
            <button onClick={() => setAuthMode('register')} className={`py-2 rounded-xl text-xs font-black uppercase ${authMode === 'register' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>Registrati</button>
          </div>
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <input type="text" required value={authUsername} onChange={(e) => setAuthUsername(e.target.value)} placeholder="Soprannome" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white" />
            <input type="password" required value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white" />
            <button type="submit" className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-black text-sm uppercase">Entra e Gioca</button>
          </form>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VISTA 2: LISTA LEGHE ESTERNA (CON CESTINO ELIMINAZIONE)
  // =========================================================================
  if (!activeLeagueId) {
    const userLeagues = leagues.filter(l => (l.members || []).some(m => m.id === currentUser.id));

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 pb-12">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <SempreNoiLogo size="md" />
              <div>
                <span className="text-[11px] text-amber-400 font-bold uppercase block">Pilota</span>
                <span className="text-base font-black text-white">{currentUser.username}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5"><LogOut className="w-4 h-4" /> Esci</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setShowCreateLeagueModal(true)} className="p-4 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs uppercase flex flex-col items-center gap-1.5 shadow-lg"><Plus className="w-6 h-6 stroke-[2.5]" /> Crea una Lega</button>
            <button onClick={() => setShowJoinLeagueModal(true)} className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 text-amber-300 font-black text-xs uppercase flex flex-col items-center gap-1.5 shadow-lg"><UserPlus className="w-6 h-6 text-amber-400" /> Unisciti</button>
          </div>

          <div className="space-y-2.5">
            <h2 className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5"><Trophy className="w-4 h-4" /> Le Tue Leghe</h2>
            {userLeagues.map(league => (
              <div key={league.id} onClick={() => setActiveLeagueId(league.id)} className="bg-slate-900 hover:bg-slate-800/90 border border-slate-800 rounded-2xl p-4 cursor-pointer flex items-center justify-between group">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-white group-hover:text-amber-300">{league.name}</h3>
                    <span className="text-[10px] font-mono bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 font-bold">{league.id}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">👥 {(league.members || []).length} Piloti</p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={(e) => { e.stopPropagation(); setLeagueToDelete(league); }} className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400" title="Elimina Lega"><Trash2 className="w-4 h-4" /></button>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {leagueToDelete && (
          <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-red-500/50 rounded-2xl max-w-sm w-full p-5 space-y-4 text-center">
              <Trash2 className="w-8 h-8 text-red-400 mx-auto" />
              <h3 className="text-sm font-black uppercase text-red-400">Eliminare definitivamente la Lega?</h3>
              <p className="text-xs text-slate-300">Stai per eliminare la lega <strong>"{leagueToDelete.name}"</strong> per tutti i piloti.</p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button onClick={() => setLeagueToDelete(null)} className="py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300">Annulla</button>
                <button onClick={handleConfirmDeleteLeague} className="py-2.5 rounded-xl bg-red-600 text-xs font-black uppercase text-white">Elimina</button>
              </div>
            </div>
          </div>
        )}

        {showCreateLeagueModal && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <form onSubmit={handleCreateLeague} className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-sm w-full p-5 space-y-4">
              <h3 className="text-sm font-black uppercase text-amber-400">Nuova Lega</h3>
              <input type="text" required value={newLeagueName} onChange={(e) => setNewLeagueName(e.target.value)} placeholder="Nome Lega" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button type="button" onClick={() => setShowCreateLeagueModal(false)} className="py-2.5 rounded-xl bg-slate-800 text-xs font-bold">Annulla</button>
                <button type="submit" className="py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black uppercase">Crea</button>
              </div>
            </form>
          </div>
        )}

        {showJoinLeagueModal && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <form onSubmit={(e) => { e.preventDefault(); joinOrCreateSharedLeague(joinLeagueCode, joinLeagueCustomName); }} className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-sm w-full p-5 space-y-4">
              <h3 className="text-sm font-black uppercase text-amber-400">Unisciti a una Lega</h3>
              <input type="text" required value={joinLeagueCode} onChange={(e) => setJoinLeagueCode(e.target.value)} placeholder="Codice (es. SN-2026)" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono uppercase" />
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button type="button" onClick={() => setShowJoinLeagueModal(false)} className="py-2.5 rounded-xl bg-slate-800 text-xs font-bold">Annulla</button>
                <button type="submit" className="py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black uppercase">Entra</button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VISTA 3: DENTRO LA LEGA ATTIVA
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center pb-24 font-sans select-none">
      {toastMessage && (
        <div className={`fixed top-4 z-[100] max-w-sm w-11/12 px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 ${toastMessage.type === 'danger' ? 'bg-red-950 border-red-500 text-red-100' : 'bg-emerald-950 border-emerald-400 text-emerald-100'}`}>
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="text-xs font-semibold">{toastMessage.text}</p>
        </div>
      )}

      {personalDisclaimer && (
        <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`bg-gradient-to-b ${personalDisclaimer.theme} border-2 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl`}>
            <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-slate-950/80 border border-white/15 inline-block">{personalDisclaimer.badge}</span>
            <div className="text-6xl py-2">{personalDisclaimer.emoji}</div>
            <h2 className="text-xl font-black uppercase text-white">{personalDisclaimer.title}</h2>
            <p className="text-xs text-slate-200 leading-relaxed font-semibold">{personalDisclaimer.message}</p>
            <button onClick={() => setPersonalDisclaimer(null)} className="w-full py-3.5 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs uppercase">{personalDisclaimer.buttonText}</button>
          </div>
        </div>
      )}

      <div className="w-full max-w-md min-h-screen bg-slate-900/70 border-x border-slate-800 flex flex-col justify-between shadow-2xl">
        
        {/* HEADER: REGOLE AL POSTO DEL CESTINO */}
        <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-amber-500/25 px-3.5 py-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => setActiveLeagueId(null)} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400"><ArrowLeft className="w-4 h-4" /></button>
              <SempreNoiLogo size="sm" />
              <div className="min-w-0">
                <h1 className="text-sm font-black text-white leading-tight truncate">{activeLeague.name}</h1>
                <span className="text-[10px] text-amber-400 font-bold block">{(activeLeague.members || []).length} Piloti • F1 Mode</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button onClick={handleOpenGazzetta} className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-400 relative">
                <Newspaper className="w-4 h-4" />
                {hasUnreadGazzetta && <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1 animate-pulse" />}
              </button>

              <button onClick={() => setShowGlassPicker(!showGlassPicker)} className={`px-2 py-1.5 rounded-xl bg-slate-900 border text-xs font-bold flex items-center gap-1.5 ${myCrushedCanActive ? 'border-red-500 text-red-300' : 'border-slate-700 text-amber-300'}`}>
                <BeerGlassAvatar type={currentUser.glassType || 'weiss'} size="sm" crushed={myCrushedCanActive} />
                <span className="text-[10px] uppercase font-black">{myCrushedCanActive ? '🥫 24h' : currentGlassObj.shortName}</span>
              </button>

              {/* PULSANTE REGOLE IN ALTO A DESTRA */}
              <button onClick={() => setShowRulesModal(true)} className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 hover:text-amber-400" title="Regolamento Ufficiale">
                <BookOpen className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-[11px]">
            <div><span className="text-slate-400">Codice: </span><span className="font-mono font-black text-amber-400">{activeLeague.id}</span></div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => handleCopyInvite(activeLeague, 'code')} className="px-2 py-1 rounded bg-slate-800 text-[10px] font-bold text-slate-200">Codice</button>
              <button onClick={() => handleCopyInvite(activeLeague, 'link')} className="px-2 py-1 rounded bg-amber-500/20 text-[10px] font-black text-amber-300">Link Invito</button>
            </div>
          </div>

          {latestGazzettaNews && (
            <div onClick={handleOpenGazzetta} className="bg-slate-900 border border-amber-500/40 rounded-xl overflow-hidden cursor-pointer">
              <div className="bg-gradient-to-r from-red-600 to-amber-400 px-2.5 py-0.5 text-[9px] font-black uppercase text-slate-950 flex justify-between">
                <span>GAZZETTA LIVE • {latestGazzettaNews.category}</span>
                <span>Leggi ▸</span>
              </div>
              <div className="px-2.5 py-1.5 flex items-center gap-2">
                <span className="text-base">{latestGazzettaNews.icon}</span>
                <p className="text-[11px] font-bold text-slate-100 line-clamp-1">{latestGazzettaNews.text}</p>
              </div>
            </div>
          )}

          {showGlassPicker && (
            <div className="pt-2 border-t border-slate-800 grid grid-cols-4 gap-1.5">
              {BEER_GLASS_TYPES.map(g => (
                <button key={g.id} onClick={() => {
                  setCurrentUser({ ...currentUser, glassType: g.id });
                  setShowGlassPicker(false);
                }} className={`p-1.5 rounded-xl border flex flex-col items-center ${currentUser.glassType === g.id ? 'bg-amber-500/20 border-amber-400' : 'bg-slate-900 border-slate-800'}`}>
                  <BeerGlassAvatar type={g.id} size="sm" />
                  <span className="text-[9px] font-black text-white mt-1">{g.shortName}</span>
                </button>
              ))}
            </div>
          )}
        </header>

        {/* CONTENUTO CENTRALE */}
        <main className="flex-1 p-4 space-y-5">
          {activeTab === 'classifica' && (
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg divide-y divide-slate-800">
                <div className="px-3.5 py-2 bg-slate-800/70 text-[10px] font-black text-slate-400 uppercase flex justify-between">
                  <span>Pilota</span><span>Punti F1</span>
                </div>
                {sortedMembers.map((member, idx) => (
                  <div key={member.id} className={`px-3 py-2.5 flex items-center justify-between ${member.id === currentUser.id ? 'bg-amber-500/10' : ''}`}>
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 text-center text-xs font-black ${idx === 0 ? 'text-amber-400' : 'text-slate-500'}`}>{idx + 1}</span>
                      <BeerGlassAvatar type={member.glassType} size="sm" crushed={isCrushedCanActive(member)} />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white">{member.name}</span>
                          {member.captainActive && <span className="px-1.5 py-0.2 bg-purple-500/20 border border-purple-400 text-purple-300 rounded text-[9px] font-black">👑 CAP {member.captainBeers || 0}/4</span>}
                        </div>
                        <span className="text-[10px] text-slate-400 block">{member.beers} birre</span>
                      </div>
                    </div>
                    <span className="text-sm font-black text-amber-400">{member.points} pt</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stappa' && (
            <form onSubmit={handleAddBeer} className="space-y-4">
              <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-3.5 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 block">Punti in Palio</span>
                  <span className="text-xs font-bold text-white">{calculatedDrink.formatLabel} • {calculatedDrink.abvLabel}</span>
                </div>
                <div className="text-xl font-black text-amber-400">+{calculatedDrink.total} pt</div>
              </div>

              {/* Box Capitano */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-purple-500/40 space-y-2">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-purple-400" />
                  <span className="text-xs font-black uppercase text-white">Capitano della Serata (12h • 4 Birre x2)</span>
                </div>
                {myMemberProfile?.captainActive ? (
                  <div className="text-xs font-bold text-purple-200">
                    Timer 12h: {formatCaptainTimeLeft(myMemberProfile.captainExpiresAtMs, clockTick)} • Confermate: {myMemberProfile.captainBeers || 0}/4
                  </div>
                ) : (
                  <button type="button" onClick={handleActivateCaptain} className="w-full py-2.5 rounded-xl bg-purple-600 text-white text-xs font-black uppercase">Attiva Capitano</button>
                )}
              </div>

              <input type="text" value={beerTitle} onChange={(e) => setBeerTitle(e.target.value)} placeholder="Nome Birra" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />

              <div className="grid grid-cols-3 gap-1.5">
                {['piccola33', 'spina50', 'litro'].map(f => (
                  <button type="button" key={f} onClick={() => setFormat(f)} className={`p-2 rounded-xl border text-xs font-bold ${format === f ? 'bg-amber-500/20 border-amber-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                    {f === 'piccola33' ? '33cl (+3)' : f === 'spina50' ? '50cl (+5)' : '1 Litro (+8)'}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'industriale', name: 'Industriale (+0)' },
                  { id: 'artigianale', name: 'Artigianale (+2)' },
                  { id: 'spina', name: 'Alla spina (+3)' },
                  { id: 'rumeno', name: 'Passaporto Rumeno (-5)' }
                ].map(q => (
                  <button type="button" key={q.id} onClick={() => setQualityTier(q.id)} className={`p-2 rounded-xl border text-xs font-bold ${qualityTier === q.id ? 'bg-amber-500/20 border-amber-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                    {q.name}
                  </button>
                ))}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
                {isCameraOpen ? (
                  <div className="space-y-2">
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-48 object-cover rounded-xl" />
                    <button type="button" onClick={captureInstantPhoto} className="w-full py-2 bg-amber-500 text-slate-950 font-black text-xs uppercase rounded-xl">Scatta</button>
                  </div>
                ) : capturedPhoto ? (
                  <img src={capturedPhoto} alt="Live" className="w-full h-48 object-cover rounded-xl" />
                ) : (
                  <button type="button" onClick={startCamera} className="w-full py-6 border-2 border-dashed border-slate-700 rounded-xl text-xs font-black uppercase text-amber-400">Apri Fotocamera</button>
                )}
                <input ref={fallbackCameraInputRef} type="file" accept="image/*" capture="environment" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => setCapturedPhoto(ev.target.result);
                    reader.readAsDataURL(file);
                  }
                }} className="hidden" />
              </div>

              <button type="submit" className="w-full py-3.5 bg-amber-500 text-slate-950 font-black text-xs uppercase rounded-2xl">Invia in Sala VAR</button>
            </form>
          )}

          {activeTab === 'var' && (
            <div className="space-y-3.5">
              {(activeLeague.feed || []).length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs font-bold">Nessuna foto in attesa di revisione</div>
              ) : (
                (activeLeague.feed || []).map(item => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-3 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span>{item.playerName} • {item.beerName}</span>
                      <span className="text-amber-400">+{item.points} pt</span>
                    </div>
                    <img src={item.photoUrl} alt="" className="w-full h-48 object-cover rounded-xl" />
                    {item.playerId !== currentUser.id && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button onClick={() => handleApproveBeer(item.id)} className="py-2 rounded-xl bg-emerald-500/20 text-emerald-300 font-black text-xs">Conferma ({(item.approvals || []).length}/2)</button>
                        <button onClick={() => setVarModalBeer(item)} className="py-2 rounded-xl bg-red-500/20 text-red-300 font-black text-xs">VAR ({(item.varVotes || []).length}/2)</button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'albo' && alboRecords && (
            <div className="space-y-3">
              {alboRecords.map(rec => (
                <div key={rec.id} className={`p-3.5 rounded-2xl border ${rec.accent} flex items-center gap-3`}>
                  <AlboDrawing type={rec.drawingType} />
                  <div>
                    <span className="text-xs font-black uppercase text-white block">{rec.title}</span>
                    <span className="text-sm font-black text-amber-300">{rec.member.name} ({rec.statBadge})</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: IL CHIOSCO DEI GADGET */}
          {activeTab === 'chiosco' && <Chiosco />}
        </main>

        {/* MODALE REGOLE UFFICIALI (APERTO DALL'ICONA IN ALTO A DESTRA) */}
        {showRulesModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border-2 border-amber-400 rounded-2xl max-w-sm w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> Regolamento Sempre Noi</span>
                <button onClick={() => setShowRulesModal(false)} className="text-slate-400 text-xs font-bold">✕</button>
              </div>
              <div className="p-4 overflow-y-auto space-y-3 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-black uppercase text-amber-400">1. Formati e Qualità</span>
                  <div className="flex justify-between"><span>33cl / 50cl / 1L</span><strong className="text-white">+3 / +5 / +8 pt</strong></div>
                  <div className="flex justify-between"><span>Passaporto Rumeno</span><strong className="text-red-400">-5 pt + 🥫 24h</strong></div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-purple-500/30 space-y-1">
                  <span className="text-[10px] font-black uppercase text-purple-400">2. Capitano 12 Ore</span>
                  <div className="flex justify-between"><span>4 Birre validate</span><strong className="text-purple-300">Punti Doppi (x2)</strong></div>
                  <div className="flex justify-between"><span>Meno di 4 birre</span><strong className="text-red-500">0 pt e Malus -20 pt</strong></div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-red-500/30 space-y-1">
                  <span className="text-[10px] font-black uppercase text-red-400">3. Sala VAR (2 Voti)</span>
                  <div className="flex justify-between"><span>2 Conferme</span><strong className="text-emerald-400">+Punti Birra</strong></div>
                  <div className="flex justify-between"><span>2 Voti VAR</span><strong className="text-red-400">Malus e Foto Rimossa</strong></div>
                </div>
              </div>
              <div className="p-3 bg-slate-950 border-t border-slate-800">
                <button onClick={() => setShowRulesModal(false)} className="w-full py-2.5 bg-amber-500 text-slate-950 text-xs font-black uppercase rounded-xl">Chiudi</button>
              </div>
            </div>
          </div>
        )}

        {/* MODALE GAZZETTA */}
        {showGazzettaModal && (
          <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
            <div className="bg-slate-900 border-2 border-amber-400 rounded-2xl max-w-sm w-full max-h-[82vh] flex flex-col overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-red-600 to-amber-400 px-4 py-3 flex justify-between items-center text-slate-950 font-black text-xs uppercase">
                <span>Gazzetta del Sempre Noi (24h)</span>
                <button onClick={() => setShowGazzettaModal(false)}>✕</button>
              </div>
              <div className="p-3.5 overflow-y-auto space-y-2 flex-1">
                {activeGazzettaList.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs">Nessuna notizia nelle ultime 24 ore!</div>
                ) : (
                  activeGazzettaList.map(n => (
                    <div key={n.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs space-y-1">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${n.badgeColor}`}>{n.icon} {n.category}</span>
                      <p className="font-bold text-white">{n.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODALE CHIAMATA VAR */}
        {varModalBeer && (
          <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-red-500/50 rounded-2xl max-w-sm w-full p-4 space-y-3">
              <h3 className="text-xs font-black uppercase text-red-400">Chiama VAR su {varModalBeer.playerName}</h3>
              {VAR_PENALTY_OPTIONS.map(opt => (
                <button key={opt.id} onClick={() => setSelectedPenaltyId(opt.id)} className={`w-full p-3 rounded-xl text-left border ${selectedPenaltyId === opt.id ? 'bg-red-500/20 border-red-400' : 'bg-slate-950 border-slate-800'}`}>
                  <div className="text-xs font-black text-white">{opt.label}</div>
                </button>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button onClick={() => setVarModalBeer(null)} className="py-2.5 rounded-xl bg-slate-800 text-xs font-bold">Annulla</button>
                <button onClick={handleConfirmVarCall} className="py-2.5 rounded-xl bg-red-600 text-white text-xs font-black uppercase">Conferma VAR</button>
              </div>
            </div>
          </div>
        )}

        {/* BARRA INFERIORE: ORA CON IL CHIOSCO */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 z-40">
          <div className="grid grid-cols-5 gap-1">
            <button onClick={() => setActiveTab('classifica')} className={`flex flex-col items-center py-1 rounded-xl ${activeTab === 'classifica' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}>
              <Trophy className="w-5 h-5" /><span className="text-[9px] font-bold mt-1">Classifica</span>
            </button>
            <button onClick={() => setActiveTab('stappa')} className={`flex flex-col items-center py-1 rounded-xl ${activeTab === 'stappa' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}>
              <PlusCircle className="w-5 h-5" /><span className="text-[9px] font-bold mt-1">Stappa!</span>
            </button>
            <button onClick={() => setActiveTab('var')} className={`flex flex-col items-center py-1 rounded-xl relative ${activeTab === 'var' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}>
              <ShieldAlert className="w-5 h-5" />
              {(activeLeague.feed || []).length > 0 && <span className="absolute top-0.5 right-3 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center">{(activeLeague.feed || []).length}</span>}
              <span className="text-[9px] font-bold mt-1">Sala VAR</span>
            </button>
            <button onClick={() => setActiveTab('albo')} className={`flex flex-col items-center py-1 rounded-xl ${activeTab === 'albo' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}>
              <Award className="w-5 h-5" /><span className="text-[9px] font-bold mt-1">Albo d'Oro</span>
            </button>
            <button onClick={() => setActiveTab('chiosco')} className={`flex flex-col items-center py-1 rounded-xl ${activeTab === 'chiosco' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}>
              <Store className="w-5 h-5" /><span className="text-[9px] font-bold mt-1">Chiosco</span>
            </button>
          </div>
        </nav>

      </div>
    </div>
  );
}