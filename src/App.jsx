import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Trophy, PlusCircle, ShieldAlert, Users, Camera, 
  CheckCircle2, Sparkles, LogOut, Plus, UserPlus, Key, User, 
  Beer, Copy, Check, ChevronRight, ArrowLeft, BookOpen, Flag, 
  XCircle, Share2, RefreshCw, Eye, Sun, Crown, Trash2, Clock, Lock
} from 'lucide-react';

// ============================================================================
// 🔗 LINK FIREBASE REALTIME DATABASE PRECONFIGURATO
// ============================================================================
const CLOUD_DB_URL = "https://sempre-noi-default-rtdb.europe-west1.firebasedatabase.app/"; 

const cleanDbUrl = CLOUD_DB_URL ? CLOUD_DB_URL.replace(/\/$/, "") : "";

// --- LOGO UFFICIALE NON DEFORMATO (CARICA /logo.jpg CON FALLBACK PULITO) ---
function SempreNoiLogo({ size = "md" }) {
  const [imgError, setImgError] = useState(false);
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-20 h-20"
  }[size] || "w-12 h-12";

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
        <svg viewBox="0 0 64 64" className="w-full h-full p-1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 6V12M24 9L27 14M40 9L37 14" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round"/>
          <g transform="rotate(-10 22 32)">
            <rect x="13" y="20" width="15" height="22" rx="3" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="2"/>
            <path d="M13 24H9C7.5 24 7 25.5 7 27.5V34.5C7 36.5 7.5 38 9 38H13" stroke="#FEF3C7" strokeWidth="2.5"/>
            <path d="M12 20C12 16 15.5 14 20.5 14C25.5 14 29 16 29 20H12Z" fill="#FFFBEB"/>
          </g>
          <g transform="rotate(10 42 32)">
            <rect x="36" y="20" width="15" height="22" rx="3" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="2"/>
            <path d="M51 24H55C56.5 24 57 25.5 57 27.5V34.5C57 36.5 56.5 38 55 38H51" stroke="#FEF3C7" strokeWidth="2.5"/>
            <path d="M35 20C35 16 38.5 14 43.5 14C48.5 14 52 16 52 20H35Z" fill="#FFFBEB"/>
          </g>
        </svg>
      )}
    </div>
  );
}

// --- CATALOGO BICCHIERI AVATAR (8 STILI ICONICI CON COLORI E FORME REALI) ---
const BEER_GLASS_TYPES = [
  { id: 'weiss', name: 'Weiss / Weizen', shortName: 'Weiss', shortDesc: 'Vaso slanciato dorato' },
  { id: 'lager', name: 'Lager / Pils', shortName: 'Lager', shortDesc: 'Boccale classico da pub' },
  { id: 'ipa', name: 'IPA Artigianale', shortName: 'IPA', shortDesc: 'Calice Teku con base' },
  { id: 'session_ipa', name: 'Session IPA', shortName: 'Session IPA', shortDesc: 'Pinta Nonic chiara' },
  { id: 'dipa', name: 'DIPA (Double IPA)', shortName: 'DIPA', shortDesc: 'Snifter tulipano ramato' },
  { id: 'triple', name: 'Triple Belga', shortName: 'Triple', shortDesc: 'Calice a coppa dorato' },
  { id: 'trappista', name: 'Trappista', shortName: 'Trappista', shortDesc: 'Coppa larga bruno-ambrata' },
  { id: 'stout', name: 'Stout Irlandese', shortName: 'Stout', shortDesc: 'Pinta scura cremosa' }
];

function BeerGlassAvatar({ type = 'weiss', size = 'md' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 p-1',
    md: 'w-11 h-11 p-1.5',
    lg: 'w-14 h-14 p-2'
  }[size] || 'w-11 h-11 p-1.5';

  return (
    <div className={`${sizeClasses} aspect-square rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-inner shrink-0 relative`}>
      {/* 1. WEISS: Vaso alto svasato giallo dorato */}
      {type === 'weiss' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M16 13C14.5 21 17.5 30 18 41H30C30.5 30 33.5 21 32 13H16Z" fill="#eab308" />
          <path d="M14.5 13.5C14 9.5 17.5 7 20.5 8C22.5 6 26 6 28 8C31 7 34 9.5 33.5 13.5H14.5Z" fill="#ffffff" />
          <path d="M15 11C13.5 20 17 30 17.5 42H30.5C31 30 34.5 20 33 11" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
          <path d="M16.5 42.5H31.5" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}

      {/* 2. LAGER: Boccale da pub con manico, giallo brillante */}
      {type === 'lager' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M33 19H38.5C40.5 19 41.5 20.5 41.5 26C41.5 31.5 40.5 33 38.5 33H33" stroke="#cbd5e1" strokeWidth="2.8" fill="none" />
          <rect x="12" y="15" width="21" height="26" rx="2.5" fill="#facc15" />
          <path d="M11 15.5C11 12 13.5 10.5 16.5 11C18.5 8.5 23 8.5 25 11C28.5 10 34 11.5 34 15.5H11Z" fill="#ffffff" />
          <rect x="12" y="14" width="21" height="27.5" rx="3" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
        </svg>
      )}

      {/* 3. IPA: Calice Teku angolare ambrato CON BASE CORRETTA */}
      {type === 'ipa' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M15 13L11.5 23.5L24 30L36.5 23.5L33 13H15Z" fill="#ea580c" />
          <path d="M14.5 13.5C14.5 10.5 18 9.5 24 9.5C30 9.5 33.5 10.5 33.5 13.5H14.5Z" fill="#fff7ed" />
          <path d="M15 10.5L11 23.5L24 30.5L37 23.5L33 10.5" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
          <path d="M24 30.5V41.5" stroke="#cbd5e1" strokeWidth="2.4" />
          <path d="M15.5 42.5C18 40.8 30 40.8 32.5 42.5" stroke="#e2e8f0" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      )}

      {/* 4. SESSION IPA: Pinta Nonic (con bombatura alta) giallo paglierino chiaro */}
      {type === 'session_ipa' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M13.5 14L12 19.5L14 23.5L16.5 42H31.5L34 23.5L36 19.5L34.5 14H13.5Z" fill="#fde047" />
          <path d="M13 14.5C13 11 16 9.5 24 9.5C32 9.5 35 11 35 14.5H13Z" fill="#ffffff" />
          <path d="M13.5 11L11.8 19.5L14 23.5L16.5 42.5H31.5L34 23.5L36.2 19.5L34.5 11" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
        </svg>
      )}

      {/* 5. DIPA (Double IPA): Calice Snifter/Tulipano panciuto arancio-ramato */}
      {type === 'dipa' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M14 13C15.5 17 11 22 13 27.5C15 31.5 19.5 33 24 33C28.5 33 33 31.5 35 27.5C37 22 32.5 17 34 13H14Z" fill="#c2410c" />
          <path d="M13.5 13.5C13.5 10.5 17.5 9.5 24 9.5C30.5 9.5 34.5 10.5 34.5 13.5H13.5Z" fill="#ffedd5" />
          <path d="M13.5 11C15.5 16 10.5 21.5 12.8 27.5C14.8 32 19.5 33.5 24 33.5C28.5 33.5 33.2 32 35.2 27.5C37.5 21.5 32.5 16 34.5 11" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
          <path d="M24 33.5V41.5" stroke="#cbd5e1" strokeWidth="2.6" />
          <path d="M16 42.5C18.5 41 29.5 41 32 42.5" stroke="#e2e8f0" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      )}

      {/* 6. TRIPLE: Calice a coppa dorato ambrato */}
      {type === 'triple' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M11 14C11 25 16.5 30 24 30C31.5 30 37 25 37 14H11Z" fill="#d97706" />
          <path d="M10.5 14.5C10.5 11.5 14 10 17.5 11C20 9.5 28 9.5 30.5 11C34 10 37.5 11.5 37.5 14.5H10.5Z" fill="#fffbeb" />
          <path d="M10 12C10 25 16 30.5 24 30.5C32 30.5 38 25 38 12" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
          <path d="M24 30.5V41" stroke="#cbd5e1" strokeWidth="2.8" />
          <path d="M15 42.5C17 40.5 31 40.5 33 42.5" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}

      {/* 7. TRAPPISTA: Coppa trappista larga e bassa, colore bruno tonaca di frate con bordo dorato */}
      {type === 'trappista' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M8.5 15C9.5 26.5 15.5 31 24 31C32.5 31 38.5 26.5 39.5 15H8.5Z" fill="#7c2d12" />
          <path d="M8 15.5C8 12.5 13 11 24 11C35 11 40 12.5 40 15.5H8Z" fill="#fef3c7" />
          <path d="M8 13.5C9 26.5 15.5 31.5 24 31.5C32.5 31.5 39 26.5 40 13.5" stroke="#fbbf24" strokeWidth="2" fill="none" />
          <path d="M24 31.5V41" stroke="#cbd5e1" strokeWidth="3.2" />
          <path d="M14 42.5C17 40.5 31 40.5 34 42.5" stroke="#fbbf24" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      )}

      {/* 8. STOUT: Pinta scura irlandese con schiuma crema */}
      {type === 'stout' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M13 15L14.5 19L16.5 42H31.5L33.5 19L35 15H13Z" fill="#1c1917" />
          <path d="M13 15.5V11.5C13 10 15 9.5 24 9.5C33 9.5 35 10 35 11.5V15.5H13Z" fill="#f5deb3" />
          <path d="M13 10.5L12 16.5L14.5 20L16.5 42.5H31.5L33.5 20L36 16.5L35 10.5" stroke="#cbd5e1" strokeWidth="1.8" fill="none" />
        </svg>
      )}
    </div>
  );
}

// --- OPZIONI UFFICIALI DELLA SALA VAR (SOLO MALUS PURO SENZA SOMMARE I PUNTI BIRRA) ---
const VAR_PENALTY_OPTIONS = [
  {
    id: 'yellow',
    label: '🟨 Cartellino giallo: birra avanzata -2pt',
    desc: 'Toglie esattamente -2 pt in classifica e assegna 1 Cartellino Giallo.',
    penaltyPts: 2
  },
  {
    id: 'simulation',
    label: '🚨 Simulazione in area: foto riciclata/vuota -5pt',
    desc: 'Toglie esattamente -5 pt in classifica e annulla la bevuta dalla Sala VAR.',
    penaltyPts: 5
  },
  {
    id: 'red',
    label: '🟥 Cartellino rosso: birra analcolica/radler -10pt',
    desc: 'Toglie esattamente -10 pt in classifica e assegna 1 Cartellino Rosso.',
    penaltyPts: 10
  }
];

// --- CONTROLLI ORARIO E CALENDARIO REAL-TIME ---
const checkGocciaWindow = () => {
  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = 7 * 60; // 07:00
  const endMinutes = 12 * 60 + 30; // 12:30
  const isOpen = totalMinutes >= startMinutes && totalMinutes <= endMinutes;
  const isTooEarly = totalMinutes < startMinutes;
  return { isOpen, isTooEarly };
};

const checkCaptainWindow = () => {
  const now = new Date();
  const day = now.getDay(); // 0=Dom, 1=Lun, ..., 5=Ven, 6=Sab
  const hour = now.getHours();
  const isFriOrSat = day === 5 || day === 6;
  const isBefore20 = hour < 20;
  const isOpen = isFriOrSat && isBefore20;

  const dayNames = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  let reason = '';
  if (!isFriOrSat) {
    reason = `Oggi è ${dayNames[day]}: attivabile solo Venerdì e Sabato entro le 20:00`;
  } else if (!isBefore20) {
    reason = 'Sono passate le 20:00! Tempo scaduto per dichiarare il Capitano stasera';
  }
  return { isOpen, reason };
};

const getCurrentWeekKey = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const pastDays = Math.floor((now - startOfYear) / 86400000);
  const weekNum = Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${weekNum}`;
};

// --- LEGA DEMO DI DEFAULT ---
const DEFAULT_LEAGUES = [
  {
    id: 'SN-2026',
    name: 'Lega Storica Sempre Noi',
    adminId: 'usr_manolo',
    members: [
      { id: 'u1', name: 'Manolo', glassType: 'trappista', points: 54.5, weekendPts: 21.0, beers: 7, yellowCards: 1, redCards: 0, captainActive: false, captainBeers: 0, captainWeekUsed: null },
      { id: 'u2', name: 'Marco', glassType: 'ipa', points: 46.0, weekendPts: 17.5, beers: 6, yellowCards: 0, redCards: 0, captainActive: true, captainBeers: 2, captainWeekUsed: '2026-W46' },
      { id: 'u3', name: 'Andrea', glassType: 'stout', points: 38.0, weekendPts: 12.0, beers: 5, yellowCards: 0, redCards: 0, captainActive: false, captainBeers: 0, captainWeekUsed: null },
      { id: 'u4', name: 'Luca', glassType: 'lager', points: 21.5, weekendPts: 6.0, beers: 4, yellowCards: 1, redCards: 1, captainActive: false, captainBeers: 0, captainWeekUsed: null }
    ],
    feed: [
      {
        id: 'b101',
        playerId: 'u1',
        playerName: 'Manolo',
        glassType: 'trappista',
        beerName: 'Keller Non Filtrata',
        formatLabel: 'Media 50cl (+5pt)',
        abvLabel: 'Leggera fino a 5,6° (x1.0)',
        styleLabel: 'Alla spina (+3pt)',
        points: 8.0,
        timestamp: '18 min fa',
        location: 'Scatto Live Verificato',
        photoUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=600&q=80',
        bonuses: [],
        approvals: ['u2'],
        varVotes: [
          { voterId: 'u3', voterName: 'Andrea', reasonId: 'simulation', reasonLabel: '🚨 Simulazione in area: foto riciclata/vuota -5pt' }
        ],
        status: 'pending_var'
      }
    ]
  }
];

export default function App() {
  // --- 1. DATABASE ACCOUNT & CREDENZIALI SALVATE ---
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('sempre_noi_accounts_db');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sempre_noi_active_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [savedCreds, setSavedCreds] = useState(() => {
    const saved = localStorage.getItem('sempre_noi_remembered_creds');
    return saved ? JSON.parse(saved) : { username: '', password: '' };
  });

  const [authMode, setAuthMode] = useState('login');
  const [authUsername, setAuthUsername] = useState(savedCreds.username || '');
  const [authPassword, setAuthPassword] = useState(savedCreds.password || '');
  const [rememberMe, setRememberMe] = useState(true);

  // --- 2. STATO LEGHE, ELIMINAZIONE E SINCRONIZZAZIONE MULTI-DISPOSITIVO ---
  const [leagues, setLeagues] = useState(() => {
    const saved = localStorage.getItem('sempre_noi_leagues_v3');
    return saved ? JSON.parse(saved) : DEFAULT_LEAGUES;
  });

  const [activeLeagueId, setActiveLeagueId] = useState(null);
  const [showCreateLeagueModal, setShowCreateLeagueModal] = useState(false);
  const [showJoinLeagueModal, setShowJoinLeagueModal] = useState(false);
  const [leagueToDelete, setLeagueToDelete] = useState(null);
  const [newLeagueName, setNewLeagueName] = useState('');
  const [joinLeagueCode, setJoinLeagueCode] = useState('');
  const [joinLeagueCustomName, setJoinLeagueCustomName] = useState('');
  const [copiedType, setCopiedType] = useState(null);

  // --- 3. STATO NAVIGAZIONE, OROLOGIO LIVE E GIOCO ---
  const [activeTab, setActiveTab] = useState('classifica');
  const [toastMessage, setToastMessage] = useState(null);
  const [showGlassPicker, setShowGlassPicker] = useState(false);
  const [clockTick, setClockTick] = useState(Date.now());

  // --- 4. STATO SEZIONE "STAPPA!" + GOCCIA D'ORO + CAPITANO ---
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

  // --- 5. STATO SALA VAR ---
  const [varModalBeer, setVarModalBeer] = useState(null);
  const [selectedPenaltyId, setSelectedPenaltyId] = useState('simulation');

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setClockTick(Date.now());
      if (!checkGocciaWindow().isOpen) {
        setBonusGocciaDOro(false);
      }
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  const gocciaStatus = useMemo(() => checkGocciaWindow(), [clockTick]);
  const captainWindowStatus = useMemo(() => checkCaptainWindow(), [clockTick]);
  const currentWeekKey = useMemo(() => getCurrentWeekKey(), [clockTick]);

  // --- FUNZIONI DI SINCRONIZZAZIONE CLOUD (FIREBASE REST) ---
  const pushLeagueToCloud = async (leagueObj) => {
    if (!cleanDbUrl || !leagueObj?.id) return;
    try {
      await fetch(`${cleanDbUrl}/leagues/${leagueObj.id}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leagueObj)
      });
    } catch (e) {
      console.error('Errore invio cloud:', e);
    }
  };

  const fetchAllLeaguesFromCloud = async () => {
    if (!cleanDbUrl) return null;
    try {
      const res = await fetch(`${cleanDbUrl}/leagues.json`);
      if (!res.ok) return null;
      const data = await res.json();
      if (!data) return null;

      const rawValues = Object.values(data);
      const deletedIds = new Set(rawValues.filter(l => l && l.deleted).map(l => l.id));
      const cloudList = rawValues
        .filter(l => l && l.id && !l.deleted)
        .map(l => ({
          ...l,
          members: l.members || [],
          feed: (l.feed || []).map(item => ({
            ...item,
            approvals: item.approvals || [],
            varVotes: item.varVotes || []
          }))
        }));

      setLeagues(prev => {
        const mergedMap = new Map();
        prev.forEach(item => {
          if (!deletedIds.has(item.id)) {
            mergedMap.set(item.id, item);
          }
        });
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
    const interval = setInterval(() => {
      fetchAllLeaguesFromCloud();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- SALVATAGGIO AUTOMATICO IN LOCALSTORAGE ---
  useEffect(() => {
    localStorage.setItem('sempre_noi_accounts_db', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sempre_noi_active_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sempre_noi_active_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('sempre_noi_leagues_v3', JSON.stringify(leagues));
  }, [leagues]);

  // --- CATTURA LINK DI INVITO ANCHE PRIMA DEL LOGIN ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inviteCode = params.get('join');
    const inviteName = params.get('name');
    const inviteHost = params.get('host');

    if (inviteCode) {
      const pendingData = {
        code: inviteCode.trim().toUpperCase(),
        name: inviteName ? decodeURIComponent(inviteName) : `Lega ${inviteCode.toUpperCase()}`,
        host: inviteHost ? decodeURIComponent(inviteHost) : 'Amico'
      };
      localStorage.setItem('sempre_noi_pending_invite', JSON.stringify(pendingData));
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const savedInvite = localStorage.getItem('sempre_noi_pending_invite');
    if (savedInvite) {
      try {
        const { code, name, host } = JSON.parse(savedInvite);
        localStorage.removeItem('sempre_noi_pending_invite');
        joinOrCreateSharedLeague(code, name, host);
      } catch (e) {
        localStorage.removeItem('sempre_noi_pending_invite');
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (activeTab !== 'stappa') {
      stopCameraStream();
    }
  }, [activeTab]);

  // --- ELIMINAZIONE LEGA (LOCALE + CLOUD) ---
  const handleConfirmDeleteLeague = async () => {
    if (!leagueToDelete) return;
    const targetId = leagueToDelete.id;
    const targetName = leagueToDelete.name;

    setLeagues(prev => prev.filter(l => l.id !== targetId));
    if (activeLeagueId === targetId) {
      setActiveLeagueId(null);
    }
    setLeagueToDelete(null);

    if (cleanDbUrl) {
      try {
        await fetch(`${cleanDbUrl}/leagues/${targetId}.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: targetId, deleted: true })
        });
      } catch (e) {
        console.error('Errore eliminazione lega dal cloud:', e);
      }
    }

    showToast(`🗑️ Lega "${targetName}" eliminata definitivamente.`, 'warning');
  };

  // --- FUNZIONE CHE UNISCE IL GIOCATORE E SINCRONIZZA TUTTI GLI ALTRI TELEFONI ---
  const joinOrCreateSharedLeague = async (rawCode, optionalName = '', optionalHost = '') => {
    const cleanCode = rawCode.trim().toUpperCase();
    if (!cleanCode) {
      showToast('Inserisci un codice lega valido!', 'danger');
      return;
    }

    const newMemberObj = {
      id: currentUser.id,
      name: currentUser.username,
      glassType: currentUser.glassType || 'weiss',
      points: 0,
      weekendPts: 0,
      beers: 0,
      yellowCards: 0,
      redCards: 0,
      captainActive: false,
      captainBeers: 0,
      captainWeekUsed: null
    };

    let targetLeague = null;
    if (cleanDbUrl) {
      try {
        const res = await fetch(`${cleanDbUrl}/leagues/${cleanCode}.json`);
        if (res.ok) {
          const cloudLeague = await res.json();
          if (cloudLeague && cloudLeague.id && !cloudLeague.deleted) {
            targetLeague = {
              ...cloudLeague,
              members: cloudLeague.members || [],
              feed: (cloudLeague.feed || []).map(item => ({
                ...item,
                approvals: item.approvals || [],
                varVotes: item.varVotes || []
              }))
            };
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (!targetLeague) {
      targetLeague = leagues.find(l => l.id.toUpperCase() === cleanCode);
    }

    if (targetLeague) {
      const isAlreadyMember = targetLeague.members.some(m => m.id === currentUser.id);
      const updatedLeague = isAlreadyMember
        ? targetLeague
        : { ...targetLeague, members: [...targetLeague.members, newMemberObj] };

      setLeagues(prev => {
        const exists = prev.some(l => l.id.toUpperCase() === cleanCode);
        return exists
          ? prev.map(l => l.id.toUpperCase() === cleanCode ? updatedLeague : l)
          : [updatedLeague, ...prev];
      });

      await pushLeagueToCloud(updatedLeague);
      setActiveLeagueId(updatedLeague.id);
      setShowJoinLeagueModal(false);
      setJoinLeagueCode('');
      showToast(`🎉 Sei entrato nella lega "${updatedLeague.name}"! (${updatedLeague.members.length} giocatori)`, 'success');
    } else {
      const leagueTitle = optionalName.trim() || joinLeagueCustomName.trim() || `Lega Sempre Noi (${cleanCode})`;
      const hostMember = optionalHost && optionalHost !== currentUser.username
        ? [{
            id: 'usr_' + optionalHost.toLowerCase().replace(/\s+/g, '_'),
            name: optionalHost,
            glassType: 'lager',
            points: 0,
            weekendPts: 0,
            beers: 0,
            yellowCards: 0,
            redCards: 0,
            captainActive: false,
            captainBeers: 0,
            captainWeekUsed: null
          }]
        : [];

      const syncedLeague = {
        id: cleanCode,
        name: leagueTitle,
        adminId: currentUser.id,
        members: [...hostMember, newMemberObj],
        feed: []
      };

      setLeagues(prev => [syncedLeague, ...prev]);
      await pushLeagueToCloud(syncedLeague);
      setActiveLeagueId(cleanCode);
      setShowJoinLeagueModal(false);
      setJoinLeagueCode('');
      setJoinLeagueCustomName('');
      showToast(`🍻 Sei entrato nella lega "${leagueTitle}" (${cleanCode})!`, 'success');
    }
  };

  // --- LOGIN / REGISTRAZIONE ---
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const cleanUser = authUsername.trim();
    const cleanPass = authPassword.trim();

    if (!cleanUser || !cleanPass) {
      showToast('Inserisci sia username che password!', 'danger');
      return;
    }

    const userId = 'usr_' + cleanUser.toLowerCase().replace(/\s+/g, '_');
    const existingAccount = accounts.find(a => a.username.toLowerCase() === cleanUser.toLowerCase());

    if (authMode === 'register') {
      if (existingAccount) {
        showToast('Questo username esiste già! Passa ad "Accedi".', 'warning');
        setAuthMode('login');
        return;
      }
      const newAcc = { id: userId, username: cleanUser, password: cleanPass, glassType: 'weiss' };
      setAccounts([...accounts, newAcc]);
      setCurrentUser(newAcc);
      if (rememberMe) {
        const creds = { username: cleanUser, password: cleanPass };
        setSavedCreds(creds);
        localStorage.setItem('sempre_noi_remembered_creds', JSON.stringify(creds));
      }
      showToast(`Account creato! Benvenuto ${cleanUser} 🍺`, 'success');
    } else {
      if (existingAccount && existingAccount.password !== cleanPass) {
        showToast('Password errata per questo username!', 'danger');
        return;
      }
      const loggedUser = existingAccount || { id: userId, username: cleanUser, password: cleanPass, glassType: 'weiss' };
      if (!existingAccount) {
        setAccounts([...accounts, loggedUser]);
      }
      setCurrentUser(loggedUser);
      if (rememberMe) {
        const creds = { username: cleanUser, password: cleanPass };
        setSavedCreds(creds);
        localStorage.setItem('sempre_noi_remembered_creds', JSON.stringify(creds));
      }
      showToast(`Bentornato ${loggedUser.username}!`, 'success');
    }
  };

  const handleLogout = () => {
    stopCameraStream();
    setCurrentUser(null);
    setActiveLeagueId(null);
    setAuthUsername(savedCreds.username || '');
    setAuthPassword(savedCreds.password || '');
    showToast('Disconnesso. Username e password sono stati ricordati.', 'warning');
  };

  // --- CREA NUOVA LEGA E SALVALA SUL CLOUD ---
  const handleCreateLeague = async (e) => {
    e.preventDefault();
    if (!newLeagueName.trim()) return;

    const code = 'SN-' + Math.floor(1000 + Math.random() * 9000);
    const newLeague = {
      id: code,
      name: newLeagueName.trim(),
      adminId: currentUser.id,
      members: [
        {
          id: currentUser.id,
          name: currentUser.username,
          glassType: currentUser.glassType || 'weiss',
          points: 0,
          weekendPts: 0,
          beers: 0,
          yellowCards: 0,
          redCards: 0,
          captainActive: false,
          captainBeers: 0,
          captainWeekUsed: null
        }
      ],
      feed: []
    };

    setLeagues([newLeague, ...leagues]);
    await pushLeagueToCloud(newLeague);
    setActiveLeagueId(code);
    setShowCreateLeagueModal(false);
    setNewLeagueName('');
    showToast(`Lega "${newLeague.name}" creata! Codice: ${code}`, 'success');
  };

  const handleJoinLeagueSubmit = (e) => {
    e.preventDefault();
    joinOrCreateSharedLeague(joinLeagueCode, joinLeagueCustomName);
  };

  const activeLeague = leagues.find(l => l.id === activeLeagueId);
  const myMemberProfile = activeLeague?.members.find(m => m.id === currentUser?.id);

  // Oggetto del bicchiere attualmente selezionato dall'utente (per mostrare il nome della birra nell'header)
  const currentGlassObj = useMemo(() => {
    const userGlassId = currentUser?.glassType || 'weiss';
    return BEER_GLASS_TYPES.find(g => g.id === userGlassId) || BEER_GLASS_TYPES[0];
  }, [currentUser]);

  const hasUsedCaptainThisWeek = Boolean(
    myMemberProfile?.captainWeekUsed === currentWeekKey ||
    (myMemberProfile?.captainUsedThisWeek && !myMemberProfile?.captainWeekUsed)
  );

  const handleCopyInvite = (leagueObj, type) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?join=${encodeURIComponent(leagueObj.id)}&name=${encodeURIComponent(leagueObj.name)}&host=${encodeURIComponent(currentUser.username)}`;
    const textToCopy = type === 'link' 
      ? `🍺 Entra nella nostra lega "${leagueObj.name}" su Sempre Noi! Clicca sul link diretto: ${shareUrl} (oppure usa il codice: ${leagueObj.id})`
      : leagueObj.id;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy);
    }
    setCopiedType(type);
    showToast(type === 'link' ? 'Link d\'invito copiato! Mandalo su WhatsApp.' : `Codice ${leagueObj.id} copiato!`, 'success');
    setTimeout(() => setCopiedType(null), 2500);
  };

  // --- GESTIONE "IL CAPITANO DELLA SERATA" ---
  const handleActivateCaptain = () => {
    if (!activeLeagueId || !myMemberProfile) return;

    if (!captainWindowStatus.isOpen) {
      showToast(`🔒 ${captainWindowStatus.reason}`, 'danger');
      return;
    }

    if (hasUsedCaptainThisWeek && !myMemberProfile.captainActive) {
      showToast('Hai già utilizzato il Bonus Capitano in questa settimana!', 'warning');
      return;
    }

    setLeagues(prev => prev.map(l => {
      if (l.id !== activeLeagueId) return l;
      const updated = {
        ...l,
        members: l.members.map(m => {
          if (m.id === currentUser.id) {
            return {
              ...m,
              captainActive: true,
              captainBeers: 0,
              captainWeekUsed: currentWeekKey,
              captainUsedThisWeek: true
            };
          }
          return m;
        })
      };
      pushLeagueToCloud(updated);
      return updated;
    }));
    showToast('👑 Fascia da Capitano attivata entro le 20:00! Tutte le tue birre validate stasera valgono PUNTI DOPPI (x2). Raggiungi almeno 4 birre o scatta il malus -10 pt!', 'success');
  };

  const handleEndCaptainEvening = () => {
    if (!activeLeagueId || !myMemberProfile || !myMemberProfile.captainActive) return;
    const beersCount = myMemberProfile.captainBeers || 0;
    const failedTarget = beersCount < 4;

    setLeagues(prev => prev.map(l => {
      if (l.id !== activeLeagueId) return l;
      const updated = {
        ...l,
        members: l.members.map(m => {
          if (m.id === currentUser.id) {
            return {
              ...m,
              captainActive: false,
              points: failedTarget ? Number((m.points - 10).toFixed(1)) : m.points,
              weekendPts: failedTarget ? Number((m.weekendPts - 10).toFixed(1)) : m.weekendPts
            };
          }
          return m;
        })
      };
      pushLeagueToCloud(updated);
      return updated;
    }));

    if (failedTarget) {
      showToast(`🚨 Tradimento delle aspettative! Hai validato solo ${beersCount}/4 birre da Capitano: -10 punti di malus applicati!`, 'danger');
    } else {
      showToast(`🏆 Serata da Capitano completata con ${beersCount} birre validate! Obiettivo 4/4 superato!`, 'success');
    }
  };

  // --- FOTOCAMERA ISTANTANEA CON COMPRESSIONE LEGGERA PER IL CLOUD ---
  const startCamera = async () => {
    setCapturedPhoto(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false
      });
      streamRef.current = stream;
      setIsCameraOpen(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      fallbackCameraInputRef.current?.click();
    }
  };

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const captureInstantPhoto = () => {
    if (!videoRef.current) return;
    const rawW = videoRef.current.videoWidth || 640;
    const rawH = videoRef.current.videoHeight || 480;
    const scale = Math.min(1, 480 / rawW);
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(rawW * scale);
    canvas.height = Math.round(rawH * scale);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.65);
    setCapturedPhoto(dataUrl);
    stopCameraStream();
    showToast('📸 Foto istantanea acquisita!', 'success');
  };

  const handleFallbackCameraCapture = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (ev) => {
        img.onload = () => {
          const scale = Math.min(1, 480 / img.width);
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setCapturedPhoto(canvas.toDataURL('image/jpeg', 0.65));
          showToast('📸 Foto istantanea acquisita!', 'success');
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // --- CALCOLATORE PUNTI COMPLETO ---
  const calculatedDrink = useMemo(() => {
    const formatMap = {
      piccola33: { pts: 3, label: '33cl (+3pt)' },
      spina50: { pts: 5, label: 'Media 50cl (+5pt)' },
      litro: { pts: 8, label: '1 litro (+8pt)' }
    };
    const abvMap = {
      leggera: { mult: 1.0, label: 'Leggera fino a 5,6° (x1.0)' },
      media: { mult: 1.3, label: 'Media 5,6° - 7,5° (x1.3)' },
      forte: { mult: 1.7, label: 'Forte > 7,5° (x1.7)' }
    };
    const qualityMap = {
      industriale: { bonus: 0, label: 'Industriale (+0pt)' },
      artigianale: { bonus: 2, label: 'Artigianale (+2pt)' },
      spina: { bonus: 3, label: 'Alla spina (+3pt)' }
    };

    const base = formatMap[format].pts;
    const mult = abvMap[abvTier].mult;
    const qualityBonus = qualityMap[qualityTier].bonus;
    const isGocciaValidNow = gocciaStatus.isOpen && bonusGocciaDOro;
    const gocciaBonus = isGocciaValidNow ? 3 : 0;
    const isCaptainActive = Boolean(myMemberProfile?.captainActive);

    let subtotal = (base * mult) + qualityBonus;
    if (bonusSempreNoi) {
      subtotal *= 1.3;
    }
    subtotal += gocciaBonus;
    if (isCaptainActive) {
      subtotal *= 2;
    }

    return {
      total: Number(subtotal.toFixed(1)),
      base,
      mult,
      qualityBonus,
      gocciaBonus,
      isCaptainActive,
      formatLabel: formatMap[format].label,
      abvLabel: abvMap[abvTier].label,
      styleLabel: qualityMap[qualityTier].label
    };
  }, [format, abvTier, qualityTier, bonusSempreNoi, bonusGocciaDOro, gocciaStatus.isOpen, myMemberProfile]);

  // --- INVIO NUOVA BIRRA (VA IN SALA VAR SENZA AGGIUNGERE PUNTI FINO ALLE 2 CONFERME) ---
  const handleAddBeer = (e) => {
    e.preventDefault();
    if (!capturedPhoto) {
      showToast('⚠️ Devi scattare la foto sul momento con la fotocamera prima di confermare!', 'danger');
      return;
    }

    const activeBonuses = [];
    if (bonusSempreNoi) activeBonuses.push('Sempre noi (x1.3)');
    if (gocciaStatus.isOpen && bonusGocciaDOro) activeBonuses.push("Goccia d'Oro (+3pt)");
    if (calculatedDrink.isCaptainActive) activeBonuses.push('Capitano Serata (x2)');

    const newBeer = {
      id: 'b_' + Date.now(),
      playerId: currentUser.id,
      playerName: currentUser.username,
      glassType: currentUser.glassType || 'weiss',
      beerName: beerTitle.trim() || 'Birra Fresca di Serata',
      formatLabel: calculatedDrink.formatLabel,
      abvLabel: calculatedDrink.abvLabel,
      styleLabel: calculatedDrink.styleLabel,
      points: calculatedDrink.total,
      timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
      location: bonusSempreNoi ? 'Tavolata "Sempre noi" (x1.3)' : 'Scatto Live Fotocamera',
      photoUrl: capturedPhoto,
      bonuses: activeBonuses,
      approvals: [],
      varVotes: [],
      status: 'pending_var'
    };

    setLeagues(prev => prev.map(l => {
      if (l.id === activeLeagueId) {
        const updated = {
          ...l,
          feed: [newBeer, ...(l.feed || [])]
        };
        pushLeagueToCloud(updated);
        return updated;
      }
      return l;
    }));

    setBeerTitle('');
    setCapturedPhoto(null);
    setBonusSempreNoi(false);
    showToast(`📸 Birra in Sala VAR! (0 pt assegnati per ora: servono 2 Conferme per +${calculatedDrink.total} pt)`, 'success');
    setActiveTab('var');
  };

  // --- SALA VAR: CONFERMA BIRRA (A 2 CONFERME ASSEGNA I PUNTI DELLA BIRRA E RIMUOVE LA FOTO) ---
  const handleApproveBeer = (beerId) => {
    const targetBeer = (activeLeague?.feed || []).find(item => item.id === beerId);
    if (!targetBeer) return;

    if (targetBeer.playerId === currentUser.id) {
      showToast('⚠️ Non puoi confermare la tua stessa birra! Devono votare i tuoi amici.', 'warning');
      return;
    }

    const currentApprovals = targetBeer.approvals || [];
    if (currentApprovals.includes(currentUser.id)) return;

    const newApprovals = [...currentApprovals, currentUser.id];
    const reachedTwoConfirmations = newApprovals.length >= 2;

    setLeagues(prev => prev.map(l => {
      if (l.id !== activeLeagueId) return l;

      const updatedFeed = reachedTwoConfirmations
        ? (l.feed || []).filter(item => item.id !== beerId)
        : (l.feed || []).map(item => item.id === beerId ? { ...item, approvals: newApprovals } : item);

      const updatedMembers = reachedTwoConfirmations
        ? l.members.map(m => {
            if (m.id === targetBeer.playerId) {
              return {
                ...m,
                points: Number((m.points + targetBeer.points).toFixed(1)),
                weekendPts: Number((m.weekendPts + targetBeer.points).toFixed(1)),
                beers: m.beers + 1,
                captainBeers: m.captainActive ? (m.captainBeers || 0) + 1 : (m.captainBeers || 0)
              };
            }
            return m;
          })
        : l.members;

      const updatedLeague = { ...l, feed: updatedFeed, members: updatedMembers };
      pushLeagueToCloud(updatedLeague);
      return updatedLeague;
    }));

    if (reachedTwoConfirmations) {
      showToast(`🍻 2/2 Conferme! +${targetBeer.points} pt accreditati a ${targetBeer.playerName} e foto rimossa dalla Sala VAR!`, 'success');
    } else {
      showToast('✅ 1ª Conferma registrata (1/2)! Serve 1 altra conferma per accreditare i punti.', 'success');
    }
  };

  const handleOpenVarModal = (beerItem) => {
    if (beerItem.playerId === currentUser.id) {
      showToast('⚠️ Non puoi segnalare al VAR la tua stessa birra!', 'warning');
      return;
    }
    const existingFirstVote = (beerItem.varVotes || [])[0];
    if (existingFirstVote?.reasonId) {
      setSelectedPenaltyId(existingFirstVote.reasonId);
    } else {
      setSelectedPenaltyId('simulation');
    }
    setVarModalBeer(beerItem);
  };

  // --- SALA VAR: CHIAMA VAR (A 2 SEGNALAZIONI APPLICA SOLO IL MALUS E RIMUOVE LA FOTO) ---
  const handleConfirmVarCall = () => {
    if (!varModalBeer || !activeLeagueId) return;

    const liveBeer = (activeLeague?.feed || []).find(item => item.id === varModalBeer.id) || varModalBeer;

    if (liveBeer.playerId === currentUser.id) {
      showToast('⚠️ Non puoi segnalare al VAR la tua stessa birra!', 'warning');
      setVarModalBeer(null);
      return;
    }

    const chosenOption = VAR_PENALTY_OPTIONS.find(o => o.id === selectedPenaltyId) || VAR_PENALTY_OPTIONS[1];
    const currentVotes = liveBeer.varVotes || [];
    if (currentVotes.some(v => v.voterId === currentUser.id)) {
      setVarModalBeer(null);
      return;
    }

    const newVotes = [
      ...currentVotes,
      {
        voterId: currentUser.id,
        voterName: currentUser.username,
        reasonId: chosenOption.id,
        reasonLabel: chosenOption.label
      }
    ];
    const reachedTwoVarVotes = newVotes.length >= 2;
    const onlyMalusPts = Number(chosenOption.penaltyPts);

    setLeagues(prev => prev.map(l => {
      if (l.id !== activeLeagueId) return l;

      const updatedFeed = reachedTwoVarVotes
        ? (l.feed || []).filter(item => item.id !== liveBeer.id)
        : (l.feed || []).map(item => item.id === liveBeer.id ? { ...item, varVotes: newVotes, status: 'pending_var' } : item);

      const updatedMembers = reachedTwoVarVotes
        ? l.members.map(m => {
            if (m.id === liveBeer.playerId) {
              return {
                ...m,
                points: Number((m.points - onlyMalusPts).toFixed(1)),
                weekendPts: Number((m.weekendPts - onlyMalusPts).toFixed(1)),
                yellowCards: chosenOption.id === 'yellow' || chosenOption.id === 'simulation' ? m.yellowCards + 1 : m.yellowCards,
                redCards: chosenOption.id === 'red' ? m.redCards + 1 : m.redCards
              };
            }
            return m;
          })
        : l.members;

      const updatedLeague = { ...l, feed: updatedFeed, members: updatedMembers };
      pushLeagueToCloud(updatedLeague);
      return updatedLeague;
    }));

    setVarModalBeer(null);
    if (reachedTwoVarVotes) {
      showToast(`🚨 VAR Confermato (2/2)! Applicato solo il malus di -${onlyMalusPts} pt a ${liveBeer.playerName} e foto rimossa dalla Sala VAR!`, 'danger');
    } else {
      showToast(`🖥️ 1ª Segnalazione VAR registrata (1/2) per -${onlyMalusPts} pt! Serve 1 altro voto VAR per applicare il malus.`, 'warning');
    }
  };

  const handleSelectGlass = (glassId) => {
    const selectedObj = BEER_GLASS_TYPES.find(g => g.id === glassId);
    const updatedUser = { ...currentUser, glassType: glassId };
    setCurrentUser(updatedUser);
    setAccounts(prev => prev.map(a => a.id === currentUser.id ? { ...a, glassType: glassId } : a));

    if (activeLeagueId) {
      setLeagues(prev => prev.map(l => {
        if (l.id === activeLeagueId) {
          const updated = {
            ...l,
            members: l.members.map(m => m.id === currentUser.id ? { ...m, glassType: glassId } : m)
          };
          pushLeagueToCloud(updated);
          return updated;
        }
        return l;
      }));
    }
    setShowGlassPicker(false);
    showToast(`🍺 Hai scelto ${selectedObj?.shortName || 'il tuo nuovo bicchiere'}!`, 'success');
  };

  const sortedMembers = useMemo(() => {
    if (!activeLeague) return [];
    return [...(activeLeague.members || [])].sort((a, b) => b.points - a.points);
  }, [activeLeague]);

  const leaderPoints = sortedMembers[0]?.points || 0;

  // =========================================================================
  // VISTA 1: LOGIN E REGISTRAZIONE
  // =========================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
        {toastMessage && (
          <div className="fixed top-4 z-[100] max-w-sm w-11/12 px-4 py-3 rounded-2xl bg-amber-950 border border-amber-400 text-amber-100 text-xs font-bold flex items-center gap-2 shadow-2xl">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage.text}</span>
          </div>
        )}

        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
          <div className="flex flex-col items-center text-center space-y-2">
            <SempreNoiLogo size="lg" />
            <h1 className="text-2xl font-black uppercase tracking-wider text-amber-400 pt-1">
              Sempre Noi
            </h1>
            <p className="text-xs text-slate-400">
              Campionato Ufficiale Fantabirra • Modalità F1
            </p>
          </div>

          <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`py-2 rounded-xl text-xs font-black uppercase transition ${
                authMode === 'login' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400'
              }`}
            >
              Accedi
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`py-2 rounded-xl text-xs font-black uppercase transition ${
                authMode === 'register' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400'
              }`}
            >
              Registrati
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  autoComplete="username"
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  placeholder="Il tuo soprannome"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded"
              />
              <span>Ricorda username e password per i prossimi accessi</span>
            </label>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
            >
              {authMode === 'login' ? 'Entra nella Home' : 'Crea Account e Gioca'}
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VISTA 2: HOME DASHBOARD LEGHE
  // =========================================================================
  if (!activeLeagueId) {
    const userLeagues = leagues.filter(l => (l.members || []).some(m => m.id === currentUser.id));

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 pb-12">
        {toastMessage && (
          <div className="fixed top-4 z-[100] max-w-sm w-11/12 px-4 py-3 rounded-2xl bg-emerald-950 border border-emerald-400 text-emerald-100 text-xs font-bold flex items-center gap-2 shadow-2xl">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage.text}</span>
          </div>
        )}

        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <SempreNoiLogo size="md" />
              <div>
                <span className="text-[11px] text-amber-400 font-bold uppercase block">Pilota Ufficiale</span>
                <span className="text-base font-black text-white">{currentUser.username}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-red-400 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <LogOut className="w-4 h-4" /> Esci
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowCreateLeagueModal(true)}
              className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase flex flex-col items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition"
            >
              <Plus className="w-6 h-6 stroke-[2.5]" />
              Crea una Lega
            </button>

            <button
              onClick={() => setShowJoinLeagueModal(true)}
              className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-black text-xs uppercase flex flex-col items-center justify-center gap-1.5 shadow-lg transition"
            >
              <UserPlus className="w-6 h-6 text-amber-400" />
              Unisciti a una Lega
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Trophy className="w-4 h-4" /> Le Tue Leghe Attive
              </h2>
              <span className="text-xs text-slate-400 font-bold">{userLeagues.length} Leghe</span>
            </div>

            {userLeagues.length === 0 ? (
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
                <Beer className="w-9 h-9 text-amber-400/60 mx-auto" />
                <p className="text-xs text-slate-300 font-semibold">
                  Non sei ancora dentro nessuna lega!
                </p>
                <p className="text-[11px] text-slate-400">
                  Clicca su <strong>"Crea una Lega"</strong> oppure su <strong>"Unisciti a una Lega"</strong> inserendo il codice mandato dal tuo amico (es. <strong className="text-amber-400">SN-2026</strong>).
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {userLeagues.map(league => (
                  <div
                    key={league.id}
                    onClick={() => setActiveLeagueId(league.id)}
                    className="bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 cursor-pointer transition shadow-lg flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-black text-white group-hover:text-amber-300 transition">
                          {league.name}
                        </h3>
                        <span className="text-[10px] font-mono bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded-lg border border-amber-500/30 font-bold">
                          {league.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                        <span>👥 {(league.members || []).length} Piloti</span>
                        <span>•</span>
                        <span>⏳ {(league.feed || []).length} in Sala VAR</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLeagueToDelete(league);
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-transparent hover:border-red-500/40 transition"
                        title="Elimina Lega"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MODALE CONFERMA ELIMINAZIONE LEGA */}
        {leagueToDelete && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-red-500/50 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-sm font-black uppercase text-red-400">Eliminare la Lega?</h3>
              <p className="text-xs text-slate-300">
                Stai per eliminare definitivamente la lega <strong className="text-white">"{leagueToDelete.name}" ({leagueToDelete.id})</strong> e tutta la sua classifica.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setLeagueToDelete(null)}
                  className="py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Annulla
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeleteLeague}
                  className="py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase shadow-lg"
                >
                  Sì, Elimina
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODALE CREA LEGA */}
        {showCreateLeagueModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleCreateLeague} className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
              <h3 className="text-sm font-black uppercase text-amber-400">Fonda una Nuova Lega</h3>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Nome della Lega</label>
                <input
                  type="text"
                  required
                  value={newLeagueName}
                  onChange={(e) => setNewLeagueName(e.target.value)}
                  placeholder="Es. Sempre Noi GP"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button type="button" onClick={() => setShowCreateLeagueModal(false)} className="py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">
                  Annulla
                </button>
                <button type="submit" className="py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black uppercase">
                  Crea Lega
                </button>
              </div>
            </form>
          </div>
        )}

        {/* MODALE UNISCITI CON CODICE */}
        {showJoinLeagueModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleJoinLeagueSubmit} className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
              <h3 className="text-sm font-black uppercase text-amber-400">Entra nella Lega degli Amici</h3>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Codice Lega (Es. SN-2026)</label>
                <input
                  type="text"
                  required
                  value={joinLeagueCode}
                  onChange={(e) => setJoinLeagueCode(e.target.value)}
                  placeholder="Inserisci il codice (es. SN-4821)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white uppercase font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  Nome della Lega (Opzionale)
                </label>
                <input
                  type="text"
                  value={joinLeagueCustomName}
                  onChange={(e) => setJoinLeagueCustomName(e.target.value)}
                  placeholder="Es. Fantabirra del Sabato"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button type="button" onClick={() => setShowJoinLeagueModal(false)} className="py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">
                  Annulla
                </button>
                <button type="submit" className="py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase shadow-lg">
                  Entra in Lega
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VISTA 3: DENTRO LA LEGA
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center pb-24 font-sans select-none">
      {toastMessage && (
        <div className={`fixed top-4 z-[100] max-w-sm w-11/12 px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 ${
          toastMessage.type === 'danger' ? 'bg-red-950/95 border-red-500 text-red-100' :
          toastMessage.type === 'warning' ? 'bg-amber-950/95 border-amber-400 text-amber-100' :
          'bg-emerald-950/95 border-emerald-400 text-emerald-100'
        }`}>
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="text-xs font-semibold">{toastMessage.text}</p>
        </div>
      )}

      <div className="w-full max-w-md min-h-screen bg-slate-900/70 border-x border-slate-800 flex flex-col justify-between shadow-2xl">
        
        {/* HEADER LEGA CON NOME DELLA BIRRA SCELTA ACCANTO AL BICCHIERE */}
        <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-amber-500/25 px-3.5 py-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setActiveLeagueId(null)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400"
                title="Torna alle Leghe"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <SempreNoiLogo size="sm" />
              <div>
                <h1 className="text-sm font-black text-white leading-tight">{activeLeague.name}</h1>
                <span className="text-[10px] text-amber-400 font-bold block">
                  {(activeLeague.members || []).length} Giocatori in Lega • F1 Mode
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowGlassPicker(!showGlassPicker)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold flex items-center gap-1.5 text-amber-300 transition"
                title="Cambia la tua birra e bicchiere avatar"
              >
                <BeerGlassAvatar type={currentUser.glassType || 'weiss'} size="sm" />
                <span className="text-[10px] uppercase font-black tracking-tight">
                  {currentGlassObj.shortName}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setLeagueToDelete(activeLeague)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-red-500/20 border border-slate-800 hover:border-red-500/40 text-slate-400 hover:text-red-400 transition"
                title="Elimina questa lega"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Barra Invito Rapido: Codice + Link Diretto */}
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5">
            <div className="text-[11px]">
              <span className="text-slate-400">Codice Invito: </span>
              <span className="font-mono font-black text-amber-400">{activeLeague.id}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleCopyInvite(activeLeague, 'code')}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-slate-200 flex items-center gap-1"
              >
                <Copy className="w-3 h-3 text-amber-400" />
                {copiedType === 'code' ? 'Copiato!' : 'Codice'}
              </button>
              <button
                onClick={() => handleCopyInvite(activeLeague, 'link')}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-[10px] font-black text-amber-300 flex items-center gap-1"
              >
                <Share2 className="w-3 h-3" />
                {copiedType === 'link' ? 'Link Copiato!' : 'Link Invito'}
              </button>
            </div>
          </div>

          {/* SELETTORE A 8 BICCHIERI E TIPOLOGIE DI BIRRA (GRIGLIA 4x2) */}
          {showGlassPicker && (
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-[10px] uppercase font-black text-amber-400 block">
                Scegli la tua Birra e Bicchiere Ufficiale:
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {BEER_GLASS_TYPES.map(g => (
                  <button
                    key={g.id}
                    onClick={() => handleSelectGlass(g.id)}
                    className={`p-1.5 rounded-xl border flex flex-col items-center transition ${
                      currentUser.glassType === g.id 
                        ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/10' 
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <BeerGlassAvatar type={g.id} size="sm" />
                    <span className="text-[9px] font-black text-white mt-1 truncate w-full text-center">
                      {g.shortName}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* CONTENUTO CENTRALE */}
        <main className="flex-1 p-4 space-y-5">
          
          {/* TAB 1: CLASSIFICA FORMULA 1 */}
          {activeTab === 'classifica' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl p-3.5 border border-amber-500/30 shadow-xl">
                <span className="text-[10px] font-black uppercase text-amber-400 flex items-center gap-1 mb-2">
                  <Flag className="w-3.5 h-3.5" /> Podio Gran Premio ({sortedMembers.length} Piloti)
                </span>

                <div className="grid grid-cols-3 gap-1.5 items-end text-center pt-1">
                  {sortedMembers[1] && (
                    <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-2 flex flex-col items-center">
                      <span className="text-[9px] font-black bg-slate-300 text-slate-950 px-1.5 rounded mb-1">P2</span>
                      <BeerGlassAvatar type={sortedMembers[1].glassType} size="sm" />
                      <span className="text-xs font-bold text-white truncate max-w-full mt-1">{sortedMembers[1].name}</span>
                      <span className="text-xs font-black text-amber-400">{sortedMembers[1].points} pt</span>
                    </div>
                  )}
                  {sortedMembers[0] && (
                    <div className="bg-amber-500/15 border-2 border-amber-400 rounded-xl p-2.5 flex flex-col items-center -translate-y-1 shadow-lg">
                      <span className="text-[9px] font-black bg-amber-400 text-slate-950 px-2 rounded mb-1">LEADER</span>
                      <BeerGlassAvatar type={sortedMembers[0].glassType} size="md" />
                      <span className="text-xs font-black text-white truncate max-w-full mt-1">{sortedMembers[0].name}</span>
                      <span className="text-sm font-black text-amber-300">{sortedMembers[0].points} pt</span>
                    </div>
                  )}
                  {sortedMembers[2] && (
                    <div className="bg-slate-900/90 border border-amber-700/50 rounded-xl p-2 flex flex-col items-center">
                      <span className="text-[9px] font-black bg-amber-700 text-white px-1.5 rounded mb-1">P3</span>
                      <BeerGlassAvatar type={sortedMembers[2].glassType} size="sm" />
                      <span className="text-xs font-bold text-white truncate max-w-full mt-1">{sortedMembers[2].name}</span>
                      <span className="text-xs font-black text-amber-500">{sortedMembers[2].points} pt</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="px-3.5 py-2.5 bg-slate-800/70 border-b border-slate-800 flex justify-between text-[10px] font-black text-slate-400 uppercase">
                  <span>Pos / Pilota ({sortedMembers.length})</span>
                  <span>Distacco F1 / Totale</span>
                </div>
                <div className="divide-y divide-slate-800">
                  {sortedMembers.map((member, idx) => {
                    const isLeader = idx === 0;
                    const gap = isLeader ? 'POLE' : `-${(leaderPoints - member.points).toFixed(1)} pt`;
                    const isMe = member.id === currentUser.id;

                    return (
                      <div key={member.id} className={`px-3 py-2.5 flex items-center justify-between ${isMe ? 'bg-amber-500/10' : ''}`}>
                        <div className="flex items-center gap-2.5">
                          <span className={`w-5 text-center text-xs font-black ${isLeader ? 'text-amber-400' : 'text-slate-500'}`}>
                            {idx + 1}
                          </span>
                          <BeerGlassAvatar type={member.glassType} size="sm" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className={`text-xs font-bold ${isMe ? 'text-amber-300' : 'text-white'}`}>
                                {member.name}
                              </span>
                              {member.captainActive && (
                                <span className="px-1.5 py-0.2 bg-purple-500/20 border border-purple-400 text-purple-300 rounded text-[9px] font-black">
                                  👑 CAP ({member.captainBeers || 0}/4)
                                </span>
                              )}
                              {member.yellowCards > 0 && (
                                <span className="px-1 bg-yellow-400 text-slate-950 rounded-sm text-[9px] font-black">
                                  {member.yellowCards}
                                </span>
                              )}
                              {member.redCards > 0 && (
                                <span className="px-1 bg-red-600 text-white rounded-sm text-[9px] font-black">
                                  {member.redCards}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 block">{member.beers} birre confermate (2/2)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-black text-amber-400">{member.points} pt</div>
                          <div className={`text-[9px] font-extrabold px-1.5 rounded inline-block ${isLeader ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                            {gap}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STAPPA! (CON BLOCCO ORARIO GOCCIA D'ORO E CALENDARIO CAPITANO) */}
          {activeTab === 'stappa' && (
            <form onSubmit={handleAddBeer} className="space-y-4">
              {/* RIEPILOGO FORMULA PUNTI LIVE */}
              <div className="bg-gradient-to-r from-amber-500/20 to-slate-900 border border-amber-500/40 rounded-2xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 block">Punti in Palio (Dopo 2 Conferme)</span>
                  <h2 className="text-[11px] font-bold text-white mt-0.5">
                    (({calculatedDrink.base}pt × {calculatedDrink.mult}) + {calculatedDrink.qualityBonus}pt)
                    {bonusSempreNoi ? ' × 1.3' : ''}
                    {gocciaStatus.isOpen && bonusGocciaDOro ? ' + 3pt' : ''}
                    {calculatedDrink.isCaptainActive ? ' × 2 (CAP)' : ''}
                  </h2>
                </div>
                <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-amber-400/40 text-right">
                  <span className="text-xl font-black text-amber-400">+{calculatedDrink.total}</span>
                  <span className="text-[9px] block text-slate-400 font-bold uppercase">Punti</span>
                </div>
              </div>

              {/* PANNELLO UFFICIALE: IL "CAPITANO" DELLA SERATA */}
              <div className={`p-3.5 rounded-2xl border transition space-y-2.5 ${
                myMemberProfile?.captainActive 
                  ? 'bg-purple-950/60 border-purple-400 text-white shadow-lg shadow-purple-500/10' 
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Crown className={`w-5 h-5 shrink-0 ${myMemberProfile?.captainActive ? 'text-amber-400' : 'text-purple-400'}`} />
                    <div>
                      <span className="text-xs font-black uppercase text-white block">
                        Il "Capitano" della Serata (x2 Punti)
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        Attivabile 1 volta a settimana solo <strong>Venerdì e Sabato entro le 20:00</strong>. Raddoppia i punti, ma se non raggiungi <strong>4 birre validate</strong> scatta il malus <strong>"Tradimento delle aspettative" (-10 pt)</strong>!
                      </span>
                    </div>
                  </div>
                </div>

                {myMemberProfile?.captainActive ? (
                  <div className="space-y-2 pt-1 border-t border-purple-500/30">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-purple-200">Progresso Serata Capitano:</span>
                      <span className={`font-black ${
                        (myMemberProfile.captainBeers || 0) >= 4 ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {myMemberProfile.captainBeers || 0} / 4 Birre
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${
                          (myMemberProfile.captainBeers || 0) >= 4 ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                        style={{ width: `${Math.min(100, ((myMemberProfile.captainBeers || 0) / 4) * 100)}%` }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleEndCaptainEvening}
                      className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-purple-400/50 text-[11px] font-black uppercase text-purple-200"
                    >
                      {(myMemberProfile.captainBeers || 0) >= 4 
                        ? '✅ Chiudi Serata Capitano (Obiettivo 4/4 Raggiunto!)' 
                        : `⚠️ Chiudi Serata Capitano (Attenzione: < 4 birre = -10 pt)`}
                    </button>
                  </div>
                ) : hasUsedCaptainThisWeek ? (
                  <div className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 text-[11px] font-black uppercase flex items-center justify-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> Bonus Capitano già utilizzato questa settimana
                  </div>
                ) : !captainWindowStatus.isOpen ? (
                  <div className="w-full py-2.5 px-3 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300 text-[10px] font-bold flex items-center justify-center gap-1.5 text-center">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{captainWindowStatus.reason}</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleActivateCaptain}
                    className="w-full py-2.5 rounded-xl text-xs font-black uppercase bg-purple-600 hover:bg-purple-500 text-white shadow-md transition"
                  >
                    👑 Dichiara "Capitano della Serata" (x2 Punti)
                  </button>
                )}
              </div>

              {/* Nome Birra */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Nome o Stile della Birra</label>
                <input
                  type="text"
                  value={beerTitle}
                  onChange={(e) => setBeerTitle(e.target.value)}
                  placeholder="Es. Keller, Trappista, Session IPA, DIPA..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* 1. Formato */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
                <label className="block text-[10px] font-bold uppercase text-slate-400">1. Formato</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'piccola33', name: '33cl', pts: '+3 pt' },
                    { id: 'spina50', name: 'Media 50cl', pts: '+5 pt' },
                    { id: 'litro', name: '1 litro', pts: '+8 pt' }
                  ].map(f => (
                    <button
                      type="button"
                      key={f.id}
                      onClick={() => setFormat(f.id)}
                      className={`p-2.5 rounded-xl border text-center transition ${format === f.id ? 'bg-amber-500/20 border-amber-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                    >
                      <span className="text-xs font-bold block">{f.name}</span>
                      <span className="text-[10px] text-amber-400 font-black">{f.pts}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Grado Alcolico */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
                <label className="block text-[10px] font-bold uppercase text-slate-400">2. Grado Alcolico</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'leggera', name: 'Leggera', sub: 'fino a 5,6°', mult: 'x1.0' },
                    { id: 'media', name: 'Media', sub: '5,6° - 7,5°', mult: 'x1.3' },
                    { id: 'forte', name: 'Forte', sub: 'oltre 7,5°', mult: 'x1.7' }
                  ].map(a => (
                    <button
                      type="button"
                      key={a.id}
                      onClick={() => setAbvTier(a.id)}
                      className={`p-2 rounded-xl border text-center transition ${abvTier === a.id ? 'bg-amber-500/20 border-amber-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                    >
                      <span className="text-xs font-bold block">{a.name}</span>
                      <span className="text-[9px] text-slate-400 block">{a.sub}</span>
                      <span className="text-[10px] text-amber-400 font-black">{a.mult}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Qualità della Birra */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
                <label className="block text-[10px] font-bold uppercase text-slate-400">3. Qualità della Birra</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'industriale', name: 'Industriale', bonus: '+0 pt' },
                    { id: 'artigianale', name: 'Artigianale', bonus: '+2 pt' },
                    { id: 'spina', name: 'Alla spina', bonus: '+3 pt' }
                  ].map(q => (
                    <button
                      type="button"
                      key={q.id}
                      onClick={() => setQualityTier(q.id)}
                      className={`p-2.5 rounded-xl border text-center transition ${qualityTier === q.id ? 'bg-amber-500/20 border-amber-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                    >
                      <span className="text-xs font-bold block">{q.name}</span>
                      <span className="text-[10px] text-amber-400 font-black">{q.bonus}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* BONUS 1: "Sempre noi" (x1.3) */}
              <div 
                onClick={() => setBonusSempreNoi(!bonusSempreNoi)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  bonusSempreNoi ? 'bg-emerald-950/60 border-emerald-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className={`w-5 h-5 ${bonusSempreNoi ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <div>
                    <span className="text-xs font-bold block">Bonus "Sempre noi"</span>
                    <span className="text-[10px] text-slate-400">Bevuta in compagnia con gli amici della lega</span>
                  </div>
                </div>
                <span className="text-sm font-black text-emerald-400">x1,3</span>
              </div>

              {/* BONUS 2: Trofeo "Goccia d'Oro" (SOLO 07:00 - 12:30, ALTRIMENTI BARRATO CON X ROSSA) */}
              <div 
                onClick={() => {
                  if (!gocciaStatus.isOpen) {
                    showToast(
                      gocciaStatus.isTooEarly
                        ? '⏰ Troppo presto! Il Trofeo Goccia d\'Oro apre alle 07:00 del mattino.'
                        : '❌ Sei arrivato tardi! Il Trofeo Goccia d\'Oro è valido solo dalle 07:00 alle 12:30.',
                      'danger'
                    );
                    return;
                  }
                  setBonusGocciaDOro(!bonusGocciaDOro);
                }}
                className={`relative overflow-hidden p-3.5 rounded-2xl border flex items-center justify-between transition ${
                  !gocciaStatus.isOpen
                    ? 'bg-slate-950/90 border-red-500/40 text-slate-500 cursor-not-allowed opacity-85'
                    : bonusGocciaDOro
                    ? 'bg-amber-950/60 border-amber-400 text-white cursor-pointer'
                    : 'bg-slate-900 border-slate-800 text-slate-400 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative flex items-center justify-center w-7 h-7">
                    <Sun className={`w-5 h-5 ${gocciaStatus.isOpen && bonusGocciaDOro ? 'text-amber-400' : 'text-slate-600'}`} />
                    {!gocciaStatus.isOpen && (
                      <XCircle className="w-7 h-7 text-red-500 absolute inset-0 stroke-[2.5] drop-shadow" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-bold ${!gocciaStatus.isOpen ? 'line-through text-slate-500' : ''}`}>
                        Trofeo "Goccia d'Oro"
                      </span>
                      {!gocciaStatus.isOpen && (
                        <span className="text-[9px] font-black uppercase bg-red-500/20 text-red-400 border border-red-500/40 px-1.5 py-0.2 rounded">
                          {gocciaStatus.isTooEarly ? 'Apre alle 07:00' : 'Arrivato Tardi!'}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      {gocciaStatus.isOpen
                        ? 'Fascia attiva (07:00 - 12:30): prima birra del mattino!'
                        : 'Fascia oraria 07:00 - 12:30 chiusa'}
                    </span>
                  </div>
                </div>
                <span className={`text-sm font-black ${!gocciaStatus.isOpen ? 'text-red-500 line-through' : 'text-amber-400'}`}>
                  +3 pt
                </span>
              </div>

              {/* FOTOCAMERA ISTANTANEA OBBLIGATORIA */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase text-amber-400 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5" /> Fotocamera Istantanea (No Galleria)
                  </label>
                  <span className="text-[9px] text-slate-400 uppercase font-bold">Obbligatoria</span>
                </div>

                {isCameraOpen ? (
                  <div className="space-y-2">
                    <div className="relative h-56 w-full rounded-xl overflow-hidden bg-black border-2 border-amber-400">
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button type="button" onClick={stopCameraStream} className="py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">
                        Annulla
                      </button>
                      <button type="button" onClick={captureInstantPhoto} className="py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black uppercase flex items-center justify-center gap-1.5">
                        <Camera className="w-4 h-4" /> Scatta Ora!
                      </button>
                    </div>
                  </div>
                ) : capturedPhoto ? (
                  <div className="relative h-52 w-full rounded-xl overflow-hidden border border-emerald-500/50 bg-slate-950">
                    <img src={capturedPhoto} alt="Scatto Live" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={startCamera}
                      className="absolute bottom-2 right-2 bg-slate-950/90 text-amber-300 px-3 py-1.5 rounded-xl text-[10px] font-black border border-amber-400/40 flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Riscatta Foto
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={startCamera}
                    className="w-full py-8 rounded-xl border-2 border-dashed border-amber-500/40 hover:border-amber-400 bg-slate-950/70 flex flex-col items-center justify-center gap-2 transition"
                  >
                    <Camera className="w-8 h-8 text-amber-400" />
                    <span className="text-xs font-black text-white uppercase">Apri Fotocamera e Scatta Istantanea</span>
                    <span className="text-[10px] text-slate-400">Scatto diretto richiesto dalla Sala VAR</span>
                  </button>
                )}

                <input
                  ref={fallbackCameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFallbackCameraCapture}
                  className="hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                🍻 Invia in Sala VAR (+{calculatedDrink.total} PT in palio)
              </button>
            </form>
          )}

          {/* TAB 3: SALA VAR */}
          {activeTab === 'var' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-950/70 to-slate-900 border border-red-500/40 rounded-2xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-red-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" /> Sala VAR Centrale
                  </span>
                  <span className="text-[9px] font-mono uppercase bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-bold">
                    {(activeLeague.feed || []).length} Foto in revisione
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Con <strong>2 Conferme</strong> vengono accreditati i punti della birra. Con <strong>2 Segnalazioni VAR</strong> viene applicato <strong>solo il malus</strong> (-2, -5 o -10 pt) e la foto sparisce subito dalla Sala VAR!
                </p>
              </div>

              {(activeLeague.feed || []).length === 0 ? (
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400/70 mx-auto" />
                  <h3 className="text-xs font-black uppercase text-white">Nessuna foto in attesa di revisione</h3>
                  <p className="text-[11px] text-slate-400">
                    Tutte le bevute sono state giudicate (2/2) e rimosse dalla Sala VAR!
                  </p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {(activeLeague.feed || []).map(item => {
                    const isMyBeer = item.playerId === currentUser.id;
                    const approvalsList = item.approvals || [];
                    const varVotesList = item.varVotes || [];
                    const hasApproved = approvalsList.includes(currentUser.id);
                    const hasVotedVar = varVotesList.some(v => v.voterId === currentUser.id);

                    return (
                      <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                        <div className="p-3 flex items-center justify-between border-b border-slate-800/80">
                          <div className="flex items-center gap-2.5">
                            <BeerGlassAvatar type={item.glassType} size="sm" />
                            <div>
                              <span className="text-xs font-black text-white block">{item.playerName}</span>
                              <span className="text-[10px] text-slate-400">{item.timestamp} • {item.location}</span>
                            </div>
                          </div>
                          <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Se confermata: +{item.points} pt
                          </span>
                        </div>

                        <div className="relative h-52 w-full bg-slate-950">
                          <img src={item.photoUrl} alt={item.beerName} className="w-full h-full object-cover" />
                        </div>

                        <div className="p-3.5 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xs font-black text-white">{item.beerName}</h3>
                              <p className="text-[10px] text-slate-400">
                                {item.formatLabel} • {item.abvLabel} • {item.styleLabel}
                              </p>
                              {item.bonuses?.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {item.bonuses.map((b, i) => (
                                    <span key={i} className="text-[9px] font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded">
                                      {b}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-right shrink-0 space-y-0.5">
                              <span className="text-[10px] text-emerald-400 font-black block">
                                ✅ {approvalsList.length}/2 Conferme
                              </span>
                              <span className="text-[10px] text-red-400 font-black block">
                                🚨 {varVotesList.length}/2 VAR
                              </span>
                            </div>
                          </div>

                          {varVotesList.length === 1 && (
                            <div className="bg-amber-500/15 border border-amber-500/40 rounded-xl p-2.5 text-[11px] text-amber-200 flex items-center gap-2">
                              <Eye className="w-4 h-4 text-amber-400 shrink-0" />
                              <span>
                                <strong>1° Voto VAR ({varVotesList[0].voterName}):</strong> "{varVotesList[0].reasonLabel}". Con il 2° voto scatta solo questo malus e la foto sparisce!
                              </span>
                            </div>
                          )}

                          {isMyBeer ? (
                            <div className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-[11px] font-bold flex items-center justify-center gap-2">
                              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                              <span>Tua bevuta: in attesa del giudizio di 2 amici della lega</span>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => handleApproveBeer(item.id)}
                                disabled={hasApproved || hasVotedVar}
                                className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 border transition ${
                                  hasApproved
                                    ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300 opacity-75'
                                    : 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/40 text-emerald-300'
                                }`}
                              >
                                <Check className="w-4 h-4" />
                                {hasApproved ? `Confermata (${approvalsList.length}/2)` : `Conferma (${approvalsList.length}/2)`}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenVarModal(item)}
                                disabled={hasVotedVar || hasApproved}
                                className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 border transition ${
                                  hasVotedVar
                                    ? 'bg-red-950/60 border-red-500/40 text-red-300 opacity-75'
                                    : 'bg-red-500/20 hover:bg-red-500/30 border-red-500/50 text-red-300'
                                }`}
                              >
                                <ShieldAlert className="w-4 h-4" />
                                {hasVotedVar ? `VAR (${varVotesList.length}/2)` : `Chiama VAR (${varVotesList.length}/2)`}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: REGOLE */}
          {activeTab === 'regole' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs text-slate-300">
              <h3 className="text-xs font-black uppercase text-amber-400">Regolamento Ufficiale "Sempre Noi"</h3>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-black uppercase text-amber-400">1. Formati, Gradi e Qualità</span>
                  <div className="flex justify-between"><span>Piccola 33cl / Media 50cl / 1 litro</span><strong className="text-white">+3 / +5 / +8 pt</strong></div>
                  <div className="flex justify-between"><span>Leggera (≤5,6°) / Media / Forte (&gt;7,5°)</span><strong className="text-white">x1.0 / x1.3 / x1.7</strong></div>
                  <div className="flex justify-between"><span>Industriale / Artigianale / Alla spina</span><strong className="text-amber-400">+0 / +2 / +3 pt</strong></div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
                  <span className="text-[10px] font-black uppercase text-amber-400">2. Bonus Speciali (Sincronizzati con Orologio)</span>
                  <div className="flex justify-between"><span>🍻 Bonus "Sempre noi" (in gruppo)</span><strong className="text-emerald-400">x1.3</strong></div>
                  <div className="flex justify-between"><span>☀️ Trofeo "Goccia d'Oro" (Solo 07:00 - 12:30)</span><strong className="text-amber-400">+3 pt</strong></div>
                  <div className="flex justify-between"><span>👑 Il "Capitano" della Serata (Ven/Sab entro le 20:00)</span><strong className="text-purple-400">x2 Punti</strong></div>
                  <div className="flex justify-between"><span>⚠️ Malus "Tradimento aspettative" (&lt; 4 birre da Capitano)</span><strong className="text-red-400">-10 pt</strong></div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-red-500/30 space-y-1">
                  <span className="text-[10px] font-black uppercase text-red-400">3. Giudizio Sala VAR (Gara a 2 Voti)</span>
                  <div className="flex justify-between"><span>✅ 2 Conferme dagli amici</span><strong className="text-emerald-400">+Punti Birra</strong></div>
                  <div className="flex justify-between"><span>🟨 Cartellino giallo: birra avanzata</span><strong className="text-yellow-400">Solo -2 pt</strong></div>
                  <div className="flex justify-between"><span>🚨 Simulazione in area: foto riciclata/vuota</span><strong className="text-red-400">Solo -5 pt</strong></div>
                  <div className="flex justify-between"><span>🟥 Cartellino rosso: analcolica/radler</span><strong className="text-red-500">Solo -10 pt</strong></div>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* MODALE CONFERMA ELIMINAZIONE LEGA (DA DENTRO LA LEGA) */}
        {leagueToDelete && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-red-500/50 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-sm font-black uppercase text-red-400">Eliminare la Lega?</h3>
              <p className="text-xs text-slate-300">
                Stai per eliminare definitivamente la lega <strong className="text-white">"{leagueToDelete.name}" ({leagueToDelete.id})</strong> per tutti i partecipanti.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setLeagueToDelete(null)}
                  className="py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Annulla
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeleteLeague}
                  className="py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase shadow-lg"
                >
                  Sì, Elimina
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODALE DI CHIAMATA AL VAR CON GLI EMOJI 🟨 🚨 🟥 */}
        {varModalBeer && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-red-500/50 rounded-2xl max-w-sm w-full p-4 space-y-3.5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <h3 className="text-xs font-black uppercase text-red-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Chiamata VAR: {varModalBeer.playerName}
                </h3>
                <span className="text-[10px] font-mono bg-red-500/20 text-red-300 px-2 py-0.5 rounded">
                  Voto {(varModalBeer.varVotes || []).length + 1} di 2
                </span>
              </div>

              <div className="space-y-2">
                {VAR_PENALTY_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedPenaltyId(opt.id)}
                    className={`w-full p-3 rounded-xl text-left border transition ${
                      selectedPenaltyId === opt.id
                        ? 'bg-red-500/20 border-red-400 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-black text-white">{opt.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button type="button" onClick={() => setVarModalBeer(null)} className="py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">
                  Annulla
                </button>
                <button type="button" onClick={handleConfirmVarCall} className="py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase">
                  Conferma VAR
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BARRA NAVIGAZIONE INFERIORE */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 z-40">
          <div className="grid grid-cols-4 gap-1">
            <button onClick={() => setActiveTab('classifica')} className={`flex flex-col items-center py-1 rounded-xl ${activeTab === 'classifica' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}>
              <Trophy className="w-5 h-5" />
              <span className="text-[9px] font-bold mt-1">Classifica</span>
            </button>
            <button onClick={() => setActiveTab('stappa')} className={`flex flex-col items-center py-1 rounded-xl ${activeTab === 'stappa' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}>
              <PlusCircle className="w-5 h-5" />
              <span className="text-[9px] font-bold mt-1">Stappa!</span>
            </button>
            <button onClick={() => setActiveTab('var')} className={`flex flex-col items-center py-1 rounded-xl relative ${activeTab === 'var' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}>
              <ShieldAlert className="w-5 h-5" />
              {(activeLeague.feed || []).length > 0 && (
                <span className="absolute top-0.5 right-5 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center">
                  {(activeLeague.feed || []).length}
                </span>
              )}
              <span className="text-[9px] font-bold mt-1">Sala VAR</span>
            </button>
            <button onClick={() => setActiveTab('regole')} className={`flex flex-col items-center py-1 rounded-xl ${activeTab === 'regole' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}>
              <BookOpen className="w-5 h-5" />
              <span className="text-[9px] font-bold mt-1">Regole</span>
            </button>
          </div>
        </nav>

      </div>
    </div>
  );
}