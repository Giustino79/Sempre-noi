import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Trophy, PlusCircle, ShieldAlert, Flame, Users, Camera, 
  CheckCircle2, AlertTriangle, MapPin, Clock, Sparkles,
  LogOut, Plus, UserPlus, Key, User, Beer, Copy, Check, ChevronRight,
  ArrowLeft, BookOpen, Flag, XCircle, Share2, RefreshCw, Eye
} from 'lucide-react';

// --- LOGO SVG VETTORIALE MINIMALISTA "SEMPRE NOI" ---
function SempreNoiToastLogo({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgBadge" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="beerGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#bgBadge)" stroke="#f59e0b" strokeWidth="2.5" />
      <path d="M32 7V13M25 10L28 14M39 10L36 14" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" />
      <g transform="rotate(14 22 36)">
        <path d="M4 50L14 40" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
        <path d="M16 29H12C10.5 29 10 30.5 10 32.5C10 34.5 10.5 36 12 36H16" stroke="#cbd5e1" strokeWidth="2.2" fill="none" />
        <rect x="15" y="24" width="13" height="18" rx="2.5" fill="url(#beerGold)" stroke="#f8fafc" strokeWidth="1.8" />
        <path d="M14 24C14 21.5 16 20 18 20.5C19.5 19 22.5 19 24 20.5C26.5 20 29 21.5 29 24H14Z" fill="#ffffff" />
      </g>
      <g transform="rotate(-14 42 36)">
        <path d="M60 50L50 40" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
        <path d="M48 29H52C53.5 29 54 30.5 54 32.5C54 34.5 53.5 36 52 36H48" stroke="#cbd5e1" strokeWidth="2.2" fill="none" />
        <rect x="36" y="24" width="13" height="18" rx="2.5" fill="url(#beerGold)" stroke="#f8fafc" strokeWidth="1.8" />
        <path d="M35 24C35 21.5 37.5 20 39.5 20.5C41 19 44 19 45.5 20.5C48 20 50 21.5 50 24H35Z" fill="#ffffff" />
      </g>
    </svg>
  );
}

// --- CATALOGO BICCHIERI AVATAR (5 STILI ICONICI) ---
const BEER_GLASS_TYPES = [
  { id: 'weiss', name: 'Weiss / Weizen', shortDesc: 'Vaso slanciato dorato' },
  { id: 'triple', name: 'Triple / Belga', shortDesc: 'Calice a coppa trappista' },
  { id: 'stout', name: 'Stout Irlandese', shortDesc: 'Pinta scura con schiuma beige' },
  { id: 'ipa', name: 'IPA Artigianale', shortDesc: 'Calice Teku luppolato' },
  { id: 'lager', name: 'Pils / Lager', shortDesc: 'Boccale classico da pub' }
];

function BeerGlassAvatar({ type = 'weiss', size = 'md' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 p-1',
    md: 'w-11 h-11 p-1.5',
    lg: 'w-14 h-14 p-2'
  }[size] || 'w-11 h-11 p-1.5';

  return (
    <div className={`${sizeClasses} rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-inner shrink-0 relative`}>
      {type === 'weiss' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M16 13C14.5 21 17.5 30 18 41H30C30.5 30 33.5 21 32 13H16Z" fill="#eab308" />
          <path d="M14.5 13.5C14 9.5 17.5 7 20.5 8C22.5 6 26 6 28 8C31 7 34 9.5 33.5 13.5H14.5Z" fill="#ffffff" />
          <path d="M15 11C13.5 20 17 30 17.5 42H30.5C31 30 34.5 20 33 11" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
        </svg>
      )}
      {type === 'triple' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M11 14C11 25 16.5 30 24 30C31.5 30 37 25 37 14H11Z" fill="#d97706" />
          <path d="M10.5 14.5C10.5 11.5 14 10 17.5 11C20 9.5 28 9.5 30.5 11C34 10 37.5 11.5 37.5 14.5H10.5Z" fill="#fffbeb" />
          <path d="M10 12C10 25 16 30.5 24 30.5C32 30.5 38 25 38 12" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
          <path d="M24 30.5V41" stroke="#cbd5e1" strokeWidth="2.8" />
          <path d="M15 42.5C17 40.5 31 40.5 33 42.5" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}
      {type === 'stout' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M13 15L14.5 19L16.5 42H31.5L33.5 19L35 15H13Z" fill="#1c1917" />
          <path d="M13 15.5V11.5C13 10 15 9.5 24 9.5C33 9.5 35 10 35 11.5V15.5H13Z" fill="#f5deb3" />
          <path d="M13 10.5L12 16.5L14.5 20L16.5 42.5H31.5L33.5 20L36 16.5L35 10.5" stroke="#cbd5e1" strokeWidth="1.8" fill="none" />
        </svg>
      )}
      {type === 'ipa' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M15 13L11.5 23.5L24 30L36.5 23.5L33 13H15Z" fill="#ea580c" />
          <path d="M14.5 13.5C14.5 11 18 10 24 10C30 10 33.5 11 33.5 13.5H14.5Z" fill="#fff7ed" />
          <path d="M15 10.5L11 23.5L24 30.5L37 23.5L33 10.5" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
          <path d="M24 30.5V42" stroke="#cbd5e1" strokeWidth="2.2" />
        </svg>
      )}
      {type === 'lager' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M33 19H38.5C40.5 19 41.5 20.5 41.5 26C41.5 31.5 40.5 33 38.5 33H33" stroke="#cbd5e1" strokeWidth="2.8" fill="none" />
          <rect x="12" y="15" width="21" height="26" rx="2.5" fill="#facc15" />
          <path d="M11 15.5C11 12 13.5 10.5 16.5 11C18.5 8.5 23 8.5 25 11C28.5 10 34 11.5 34 15.5H11Z" fill="#ffffff" />
          <rect x="12" y="14" width="21" height="27.5" rx="3" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
        </svg>
      )}
    </div>
  );
}

// --- OPZIONI UFFICIALI DELLA SALA VAR ---
const VAR_PENALTY_OPTIONS = [
  {
    id: 'yellow',
    label: 'Cartellino giallo: birra avanzata -2pt',
    shortTitle: '🟨 Cartellino Giallo (-2pt)',
    desc: 'Il giocatore ha lasciato il fondo caldo o non ha finito il bicchiere.',
    penaltyPts: 2,
    revokeBeer: false
  },
  {
    id: 'simulation',
    label: 'Simulazione in area: foto riciclata/vuota -5pt',
    shortTitle: '🚨 Simulazione in Area (-5pt)',
    desc: 'Foto vecchia, bicchiere già vuoto o presa in prestito dal vicino di banco.',
    penaltyPts: 5,
    revokeBeer: true
  },
  {
    id: 'red',
    label: 'Cartellino rosso: birra analcolica/radler -10pt',
    shortTitle: '🟥 Cartellino Rosso Diretto (-10pt)',
    desc: 'Grave violazione del codice etico: birra 0.0% o aromatizzata al limone.',
    penaltyPts: 10,
    revokeBeer: true
  }
];

// --- LEGA DEMO DI DEFAULT ---
const DEFAULT_LEAGUES = [
  {
    id: 'SN-2026',
    name: 'Lega Storica Sempre Noi',
    adminId: 'usr_manolo',
    members: [
      { id: 'u1', name: 'Manolo', glassType: 'triple', points: 54.5, weekendPts: 21.0, beers: 7, yellowCards: 1, redCards: 0 },
      { id: 'u2', name: 'Marco', glassType: 'ipa', points: 46.0, weekendPts: 17.5, beers: 6, yellowCards: 0, redCards: 0 },
      { id: 'u3', name: 'Andrea', glassType: 'stout', points: 38.0, weekendPts: 12.0, beers: 5, yellowCards: 0, redCards: 0 },
      { id: 'u4', name: 'Luca', glassType: 'lager', points: 21.5, weekendPts: 6.0, beers: 4, yellowCards: 1, redCards: 1 }
    ],
    feed: [
      {
        id: 'b101',
        playerId: 'u1',
        playerName: 'Manolo',
        glassType: 'triple',
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
          { voterId: 'u3', voterName: 'Andrea', reasonId: 'simulation', reasonLabel: 'Simulazione in area: foto riciclata/vuota -5pt' }
        ],
        status: 'pending_var' // 'valid' | 'pending_var' | 'yellow' | 'simulation' | 'red'
      },
      {
        id: 'b102',
        playerId: 'u2',
        playerName: 'Marco',
        glassType: 'ipa',
        beerName: 'Double IPA Artigianale',
        formatLabel: 'Media 50cl (+5pt)',
        abvLabel: 'Forte > 7,5° (x1.7)',
        styleLabel: 'Artigianale (+2pt)',
        points: 13.7,
        timestamp: '1 ora fa',
        location: 'Tavolata Sempre Noi',
        photoUrl: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&w=600&q=80',
        bonuses: ['Sempre noi (x1.3)'],
        approvals: ['u1', 'u3'],
        varVotes: [],
        status: 'valid'
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

  // Pre-compila username e password ricordati per gli accessi successivi
  const [savedCreds, setSavedCreds] = useState(() => {
    const saved = localStorage.getItem('sempre_noi_remembered_creds');
    return saved ? JSON.parse(saved) : { username: '', password: '' };
  });

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authUsername, setAuthUsername] = useState(savedCreds.username || '');
  const [authPassword, setAuthPassword] = useState(savedCreds.password || '');
  const [rememberMe, setRememberMe] = useState(true);

  // --- 2. STATO LEGHE E INVITI TRAMITE LINK/CODICE ---
  const [leagues, setLeagues] = useState(() => {
    const saved = localStorage.getItem('sempre_noi_leagues_v2');
    return saved ? JSON.parse(saved) : DEFAULT_LEAGUES;
  });

  const [activeLeagueId, setActiveLeagueId] = useState(null);
  const [showCreateLeagueModal, setShowCreateLeagueModal] = useState(false);
  const [showJoinLeagueModal, setShowJoinLeagueModal] = useState(false);
  const [newLeagueName, setNewLeagueName] = useState('');
  const [joinLeagueCode, setJoinLeagueCode] = useState('');
  const [copiedType, setCopiedType] = useState(null); // 'code' | 'link'

  // --- 3. STATO NAVIGAZIONE E GIOCO ---
  const [activeTab, setActiveTab] = useState('classifica');
  const [toastMessage, setToastMessage] = useState(null);
  const [showGlassPicker, setShowGlassPicker] = useState(false);

  // --- 4. STATO FOTOCAMERA ISTANTANEA (SOLO SCATTO LIVE) ---
  const [beerTitle, setBeerTitle] = useState('');
  const [format, setFormat] = useState('spina50'); // 'piccola33' | 'spina50' | 'litro'
  const [abvTier, setAbvTier] = useState('leggera'); // 'leggera' | 'media' | 'forte'
  const [qualityTier, setQualityTier] = useState('spina'); // 'industriale' | 'artigianale' | 'spina'
  const [bonusSempreNoi, setBonusSempreNoi] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fallbackCameraInputRef = useRef(null);

  // --- 5. STATO SALA VAR ---
  const [varModalBeer, setVarModalBeer] = useState(null);
  const [selectedPenaltyId, setSelectedPenaltyId] = useState('simulation');

  // --- PERSISTENZA DATI ---
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
    localStorage.setItem('sempre_noi_leagues_v2', JSON.stringify(leagues));
  }, [leagues]);

  // Controlla se l'utente ha aperto un Link di Invito (?join=CODICE)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inviteCode = params.get('join');
    if (inviteCode && currentUser) {
      setJoinLeagueCode(inviteCode.toUpperCase());
      setShowJoinLeagueModal(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [currentUser]);

  // Ferma lo stream fotocamera quando si cambia scheda
  useEffect(() => {
    if (activeTab !== 'stappa') {
      stopCameraStream();
    }
  }, [activeTab]);

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // --- FUNZIONI AUTENTICAZIONE CON MEMORIA CREDENZIALI ---
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
      showToast(`Account creato! Benvenuto al bancone, ${cleanUser} 🍺`, 'success');
    } else {
      // Modalità Login
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
      showToast(`Bentornato ${loggedUser.username}! Credenziali salvate.`, 'success');
    }
  };

  const handleLogout = () => {
    stopCameraStream();
    setCurrentUser(null);
    setActiveLeagueId(null);
    // Ricarica in automatico le credenziali salvate nei campi
    setAuthUsername(savedCreds.username || '');
    setAuthPassword(savedCreds.password || '');
    showToast('Sei uscito. Le tue credenziali sono pronte per il prossimo accesso.', 'warning');
  };

  // --- FUNZIONI LEGHE & INVITI ---
  const handleCreateLeague = (e) => {
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
          redCards: 0
        }
      ],
      feed: []
    };

    setLeagues([newLeague, ...leagues]);
    setActiveLeagueId(code);
    setShowCreateLeagueModal(false);
    setNewLeagueName('');
    showToast(`Lega "${newLeague.name}" creata! Codice: ${code}`, 'success');
  };

  const handleJoinLeague = (e) => {
    e.preventDefault();
    const cleanCode = joinLeagueCode.trim().toUpperCase();
    const foundLeague = leagues.find(l => l.id.toUpperCase() === cleanCode);

    if (!foundLeague) {
      showToast('Codice non trovato! Controlla il codice mandato dal tuo amico.', 'danger');
      return;
    }

    const isAlreadyMember = foundLeague.members.some(m => m.id === currentUser.id);
    if (!isAlreadyMember) {
      setLeagues(prev => prev.map(l => {
        if (l.id === foundLeague.id) {
          return {
            ...l,
            members: [
              ...l.members,
              {
                id: currentUser.id,
                name: currentUser.username,
                glassType: currentUser.glassType || 'weiss',
                points: 0,
                weekendPts: 0,
                beers: 0,
                yellowCards: 0,
                redCards: 0
              }
            ]
          };
        }
        return l;
      }));
    }

    setActiveLeagueId(foundLeague.id);
    setShowJoinLeagueModal(false);
    setJoinLeagueCode('');
    showToast(`Sei entrato nella lega "${foundLeague.name}"!`, 'success');
  };

  const handleCopyInvite = (code, type) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?join=${code}`;
    const textToCopy = type === 'link' 
      ? `🍺 Entra nella nostra lega "${activeLeague?.name || 'Sempre Noi'}"! Clicca qui: ${shareUrl} oppure inserisci il codice: ${code}`
      : code;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy);
    }
    setCopiedType(type);
    showToast(type === 'link' ? 'Link di invito copiato! Incollalo su WhatsApp.' : `Codice ${code} copiato!`, 'success');
    setTimeout(() => setCopiedType(null), 2500);
  };

  // --- FOTOCAMERA ISTANTANEA IN-APP (SOLO SCATTO SUL MOMENTO) ---
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
      // Se il browser richiede l'input nativo della fotocamera mobile
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
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
    setCapturedPhoto(dataUrl);
    stopCameraStream();
    showToast('📸 Scatto istantaneo certificato per il VAR!', 'success');
  };

  const handleFallbackCameraCapture = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCapturedPhoto(reader.result);
        showToast('📸 Foto istantanea acquisita!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // --- CALCOLATORE PUNTI SECONDO LE NUOVE REGOLE ---
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

    let subtotal = (base * mult) + qualityBonus;
    if (bonusSempreNoi) {
      subtotal *= 1.3; // Nuovo moltiplicatore "Sempre noi" x1.3
    }

    return {
      total: Number(subtotal.toFixed(1)),
      base,
      mult,
      qualityBonus,
      formatLabel: formatMap[format].label,
      abvLabel: abvMap[abvTier].label,
      styleLabel: qualityMap[qualityTier].label
    };
  }, [format, abvTier, qualityTier, bonusSempreNoi]);

  // --- INVIO NUOVA BIRRA ---
  const handleAddBeer = (e) => {
    e.preventDefault();
    if (!capturedPhoto) {
      showToast('⚠️ Obbligatorio: devi scattare la foto sul momento con la fotocamera!', 'danger');
      return;
    }

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
      bonuses: bonusSempreNoi ? ['Sempre noi (x1.3)'] : [],
      approvals: [currentUser.id],
      varVotes: [],
      status: 'valid'
    };

    setLeagues(prev => prev.map(l => {
      if (l.id === activeLeagueId) {
        return {
          ...l,
          feed: [newBeer, ...l.feed],
          members: l.members.map(m => {
            if (m.id === currentUser.id) {
              return {
                ...m,
                points: Number((m.points + calculatedDrink.total).toFixed(1)),
                weekendPts: Number((m.weekendPts + calculatedDrink.total).toFixed(1)),
                beers: m.beers + 1
              };
            }
            return m;
          })
        };
      }
      return l;
    }));

    setBeerTitle('');
    setCapturedPhoto(null);
    setBonusSempreNoi(false);
    showToast(`🍻 Stappata! +${calculatedDrink.total} pt accreditati (Silent Check VAR attivo)`, 'success');
    setActiveTab('classifica');
  };

  // --- SALA VAR: CONFERMA BIRRA (TUTTO REGOLARE) ---
  const handleApproveBeer = (beerId) => {
    setLeagues(prev => prev.map(l => {
      if (l.id !== activeLeagueId) return l;
      return {
        ...l,
        feed: l.feed.map(item => {
          if (item.id !== beerId) return item;
          if (item.approvals.includes(currentUser.id)) return item;
          return {
            ...item,
            approvals: [...item.approvals, currentUser.id]
          };
        })
      };
    }));
    showToast('✅ Hai confermato la regolarità della bevuta! Tutto buono per Lissone.', 'success');
  };

  // --- SALA VAR: CHIAMA VAR (CON 2 VOTI SCATTA IL MALUS) ---
  const handleConfirmVarCall = () => {
    if (!varModalBeer || !activeLeagueId) return;

    const chosenOption = VAR_PENALTY_OPTIONS.find(o => o.id === selectedPenaltyId) || VAR_PENALTY_OPTIONS[1];

    setLeagues(prev => prev.map(l => {
      if (l.id !== activeLeagueId) return l;

      let penaltyTriggered = false;

      const updatedFeed = l.feed.map(item => {
        if (item.id !== varModalBeer.id) return item;
        const alreadyVoted = item.varVotes.some(v => v.voterId === currentUser.id);
        if (alreadyVoted) return item;

        const newVotes = [
          ...item.varVotes,
          {
            voterId: currentUser.id,
            voterName: currentUser.username,
            reasonId: chosenOption.id,
            reasonLabel: chosenOption.label
          }
        ];

        const reachedThreshold = newVotes.length >= 2;
        if (reachedThreshold && item.status !== 'yellow' && item.status !== 'simulation' && item.status !== 'red') {
          penaltyTriggered = true;
        }

        return {
          ...item,
          varVotes: newVotes,
          status: reachedThreshold ? chosenOption.id : 'pending_var'
        };
      });

      let updatedMembers = l.members;
      if (penaltyTriggered) {
        updatedMembers = l.members.map(m => {
          if (m.id === varModalBeer.playerId) {
            // Se è Simulazione (-5) o Cartellino Rosso (-10), toglie anche i punti della birra falsa + il malus!
            // Se è Cartellino Giallo (-2), la birra resta ma prende -2pt di penalità.
            const pointsToSubtract = chosenOption.revokeBeer
              ? (varModalBeer.points + chosenOption.penaltyPts)
              : chosenOption.penaltyPts;

            return {
              ...m,
              points: Number((m.points - pointsToSubtract).toFixed(1)),
              weekendPts: Number((m.weekendPts - pointsToSubtract).toFixed(1)),
              beers: chosenOption.revokeBeer ? Math.max(0, m.beers - 1) : m.beers,
              yellowCards: chosenOption.id === 'yellow' || chosenOption.id === 'simulation' ? m.yellowCards + 1 : m.yellowCards,
              redCards: chosenOption.id === 'red' ? m.redCards + 1 : m.redCards
            };
          }
          return m;
        });
      }

      return { ...l, feed: updatedFeed, members: updatedMembers };
    }));

    setVarModalBeer(null);
    showToast('🖥️ Segnalazione inviata in Sala VAR a Lissone!', 'warning');
  };

  // Cambio Calice Avatar
  const handleSelectGlass = (glassId) => {
    const updatedUser = { ...currentUser, glassType: glassId };
    setCurrentUser(updatedUser);
    setAccounts(prev => prev.map(a => a.id === currentUser.id ? { ...a, glassType: glassId } : a));

    if (activeLeagueId) {
      setLeagues(prev => prev.map(l => {
        if (l.id === activeLeagueId) {
          return {
            ...l,
            members: l.members.map(m => m.id === currentUser.id ? { ...m, glassType: glassId } : m)
          };
        }
        return l;
      }));
    }
    setShowGlassPicker(false);
    showToast('Calice ufficiale aggiornato!', 'success');
  };

  const activeLeague = leagues.find(l => l.id === activeLeagueId);

  const sortedMembers = useMemo(() => {
    if (!activeLeague) return [];
    return [...activeLeague.members].sort((a, b) => b.points - a.points);
  }, [activeLeague]);

  const leaderPoints = sortedMembers[0]?.points || 0;

  // =========================================================================
  // VISTA 1: LOGIN E REGISTRAZIONE CON MEMORIA CREDENZIALI
  // =========================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
        {toastMessage && (
          <div className="fixed top-4 z-50 max-w-sm w-11/12 px-4 py-3 rounded-2xl bg-amber-950 border border-amber-400 text-amber-100 text-xs font-bold flex items-center gap-2 shadow-2xl">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage.text}</span>
          </div>
        )}

        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
          <div className="text-center space-y-2">
            <SempreNoiToastLogo className="w-16 h-16 mx-auto drop-shadow-lg" />
            <h1 className="text-2xl font-black uppercase tracking-wider text-amber-400">
              Sempre Noi
            </h1>
            <p className="text-xs text-slate-400">
              Campionato Ufficiale Fantabirra • Modalità F1
            </p>
          </div>

          {/* Selettore Tab Accedi / Registrati */}
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
  // VISTA 2: HOME DASHBOARD LEGHE (LE TUE LEGHE / CREA / UNISCITI)
  // =========================================================================
  if (!activeLeagueId) {
    const userLeagues = leagues.filter(l => l.members.some(m => m.id === currentUser.id));

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 pb-12">
        {toastMessage && (
          <div className="fixed top-4 z-50 max-w-sm w-11/12 px-4 py-3 rounded-2xl bg-emerald-950 border border-emerald-400 text-emerald-100 text-xs font-bold flex items-center gap-2 shadow-2xl">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage.text}</span>
          </div>
        )}

        <div className="w-full max-w-md space-y-6">
          {/* Header Utente */}
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <SempreNoiToastLogo className="w-11 h-11" />
              <div>
                <span className="text-[11px] text-amber-400 font-bold uppercase block">Dashboard Pilota</span>
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

          {/* Pulsanti Azione Principali: Crea o Unisciti */}
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

          {/* Lista Leghe Esistenti dell'Utente */}
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
                  Non sei ancora iscritto a nessuna lega!
                </p>
                <p className="text-[11px] text-slate-400">
                  Clicca su <strong>"Crea una Lega"</strong> per fondare il campionato con i tuoi amici, oppure prova la lega demo inserendo il codice <strong className="text-amber-400">SN-2026</strong> in "Unisciti a una Lega".
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
                        <span>👥 {league.members.length} Piloti</span>
                        <span>•</span>
                        <span>🍺 {league.feed.length} Birre a referto</span>
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MODALE CREA LEGA */}
        {showCreateLeagueModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleCreateLeague} className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
              <h3 className="text-sm font-black uppercase text-amber-400">Fonda una Nuova Lega</h3>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Nome Ufficiale della Lega</label>
                <input
                  type="text"
                  required
                  value={newLeagueName}
                  onChange={(e) => setNewLeagueName(e.target.value)}
                  placeholder="Es. GP del Luppolo"
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
            <form onSubmit={handleJoinLeague} className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
              <h3 className="text-sm font-black uppercase text-amber-400">Unisciti a una Lega</h3>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Codice Lega (Es. SN-2026)</label>
                <input
                  type="text"
                  required
                  value={joinLeagueCode}
                  onChange={(e) => setJoinLeagueCode(e.target.value)}
                  placeholder="SN-2026"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white uppercase font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button type="button" onClick={() => setShowJoinLeagueModal(false)} className="py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">
                  Annulla
                </button>
                <button type="submit" className="py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black uppercase">
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
  // VISTA 3: DENTRO LA LEGA (CLASSIFICA F1, STAPPA CON FOTOCAMERA, SALA VAR)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center pb-24 font-sans select-none">
      {toastMessage && (
        <div className={`fixed top-4 z-50 max-w-sm w-11/12 px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 ${
          toastMessage.type === 'danger' ? 'bg-red-950/95 border-red-500 text-red-100' :
          toastMessage.type === 'warning' ? 'bg-amber-950/95 border-amber-400 text-amber-100' :
          'bg-emerald-950/95 border-emerald-400 text-emerald-100'
        }`}>
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="text-xs font-semibold">{toastMessage.text}</p>
        </div>
      )}

      <div className="w-full max-w-md min-h-screen bg-slate-900/70 border-x border-slate-800 flex flex-col justify-between shadow-2xl">
        
        {/* HEADER LEGA + INVITO CODICE E LINK */}
        <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-amber-500/25 px-3.5 py-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setActiveLeagueId(null)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400"
                title="Torna alla Dashboard Leghe"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-base font-black text-white leading-none">{activeLeague.name}</h1>
                <span className="text-[10px] text-slate-400">Campionato Formula 1 • Tutti contro Tutti</span>
              </div>
            </div>

            <button
              onClick={() => setShowGlassPicker(!showGlassPicker)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold flex items-center gap-1.5 text-amber-300"
            >
              <BeerGlassAvatar type={currentUser.glassType || 'weiss'} size="sm" />
              <span className="text-[10px] uppercase font-black">Calice</span>
            </button>
          </div>

          {/* Barra Invito Amici: Codice + Link Diretto */}
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5">
            <div className="text-[11px]">
              <span className="text-slate-400">Codice Lega: </span>
              <span className="font-mono font-black text-amber-400">{activeLeague.id}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleCopyInvite(activeLeague.id, 'code')}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-slate-200 flex items-center gap-1"
              >
                <Copy className="w-3 h-3 text-amber-400" />
                {copiedType === 'code' ? 'Copiato!' : 'Codice'}
              </button>
              <button
                onClick={() => handleCopyInvite(activeLeague.id, 'link')}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-[10px] font-black text-amber-300 flex items-center gap-1"
              >
                <Share2 className="w-3 h-3" />
                {copiedType === 'link' ? 'Link Copiato!' : 'Link Invito'}
              </button>
            </div>
          </div>

          {showGlassPicker && (
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-[10px] uppercase font-black text-amber-400 block">Scegli il tuo Bicchiere Ufficiale:</span>
              <div className="grid grid-cols-5 gap-1">
                {BEER_GLASS_TYPES.map(g => (
                  <button
                    key={g.id}
                    onClick={() => handleSelectGlass(g.id)}
                    className={`p-1 rounded-xl border flex flex-col items-center ${
                      currentUser.glassType === g.id ? 'bg-amber-500/20 border-amber-400' : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <BeerGlassAvatar type={g.id} size="sm" />
                    <span className="text-[9px] font-bold text-white mt-1 truncate w-full text-center">
                      {g.name.split(' ')[0]}
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
              {/* PODIO F1 */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl p-3.5 border border-amber-500/30 shadow-xl">
                <span className="text-[10px] font-black uppercase text-amber-400 flex items-center gap-1 mb-2">
                  <Flag className="w-3.5 h-3.5" /> Podio Gran Premio
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

              {/* TABELLA PILOTI */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="px-3.5 py-2.5 bg-slate-800/70 border-b border-slate-800 flex justify-between text-[10px] font-black text-slate-400 uppercase">
                  <span>Pos / Pilota</span>
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
                              {member.yellowCards > 0 && (
                                <span title="Cartellini Gialli" className="px-1 bg-yellow-400 text-slate-950 rounded-sm text-[9px] font-black">
                                  {member.yellowCards}
                                </span>
                              )}
                              {member.redCards > 0 && (
                                <span title="Cartellini Rossi" className="px-1 bg-red-600 text-white rounded-sm text-[9px] font-black">
                                  {member.redCards}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 block">{member.beers} birre validate</span>
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

          {/* TAB 2: STAPPA! (NUOVI PUNTEGGI + SOLO FOTOCAMERA ISTANTANEA) */}
          {activeTab === 'stappa' && (
            <form onSubmit={handleAddBeer} className="space-y-4">
              <div className="bg-gradient-to-r from-amber-500/20 to-slate-900 border border-amber-500/40 rounded-2xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 block">Calcolo Telemetria Bevuta</span>
                  <h2 className="text-xs font-bold text-white mt-0.5">
                    (({calculatedDrink.base}pt × {calculatedDrink.mult}) + {calculatedDrink.qualityBonus}pt) {bonusSempreNoi ? '× 1.3' : ''}
                  </h2>
                </div>
                <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-amber-400/40 text-right">
                  <span className="text-xl font-black text-amber-400">+{calculatedDrink.total}</span>
                  <span className="text-[9px] block text-slate-400 font-bold uppercase">Punti</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Nome o Stile della Birra</label>
                <input
                  type="text"
                  value={beerTitle}
                  onChange={(e) => setBeerTitle(e.target.value)}
                  placeholder="Es. Keller, Weiss, Pils, IPA..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* 1. Formato (1 litro = +8pt) */}
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

              {/* 2. Grado Alcolico (fino a 5,6° | 5,6° - 7,5° | > 7,5°) */}
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

              {/* 3. Qualità della Birra (Industriale +0 | Artigianale +2 | Alla spina +3) */}
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

              {/* Bonus "Sempre noi" x1.3 */}
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

              {/* FOTOCAMERA ISTANTANEA OBBLIGATORIA */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase text-amber-400 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5" /> Fotocamera Live Anti-Frode (No Galleria)
                  </label>
                  <span className="text-[9px] text-slate-400 uppercase font-bold">Obbligatoria</span>
                </div>

                {isCameraOpen ? (
                  <div className="space-y-2">
                    <div className="relative h-56 w-full rounded-xl overflow-hidden bg-black border-2 border-amber-400">
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={stopCameraStream}
                        className="py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                      >
                        Annulla
                      </button>
                      <button
                        type="button"
                        onClick={captureInstantPhoto}
                        className="py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black uppercase flex items-center justify-center gap-1.5"
                      >
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

                {/* Input nativo con capture="environment" come fallback per smartphone */}
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
                🍻 Stappa e Manda a Referto (+{calculatedDrink.total} PT)
              </button>
            </form>
          )}

          {/* TAB 3: SALA VAR DI LISSONE */}
          {activeTab === 'var' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-950/70 to-slate-900 border border-red-500/40 rounded-2xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-red-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" /> Sala VAR Centrale di Lissone
                  </span>
                  <span className="text-[9px] font-mono uppercase bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-bold">
                    Live Monitor
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Ispeziona le foto della lega: puoi <strong>Confermare la regolarità</strong> oppure aprire una <strong>On-Field Review</strong>. Con <strong>2 chiamate VAR</strong> scatta il malus ufficiale in classifica!
                </p>
              </div>

              <div className="space-y-3.5">
                {activeLeague.feed.map(item => {
                  const isPenalized = item.status === 'yellow' || item.status === 'simulation' || item.status === 'red';
                  const hasApproved = item.approvals?.includes(currentUser.id);
                  const hasVotedVar = item.varVotes?.some(v => v.voterId === currentUser.id);
                  const lastVarReason = item.varVotes?.[item.varVotes.length - 1]?.reasonLabel;

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
                        <div className="text-right">
                          <span className={`text-xs font-black px-2 py-1 rounded-lg ${
                            isPenalized ? 'bg-red-500/20 text-red-400 line-through' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            +{item.points} pt
                          </span>
                        </div>
                      </div>

                      <div className="relative h-52 w-full bg-slate-950">
                        <img src={item.photoUrl} alt={item.beerName} className="w-full h-full object-cover" />
                        
                        {/* Overlay Decisione Ufficiale VAR dopo 2 voti */}
                        {isPenalized && (
                          <div className="absolute inset-0 bg-red-950/90 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center">
                            <XCircle className="w-11 h-11 text-red-400 mb-1.5" />
                            <span className="text-xs font-black text-white uppercase bg-red-600 px-3 py-1 rounded-full tracking-wider">
                              Sentenza Ufficiale VAR (2/2 Voti)
                            </span>
                            <p className="text-xs font-bold text-red-200 mt-2">
                              {lastVarReason}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="p-3.5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xs font-black text-white">{item.beerName}</h3>
                            <p className="text-[10px] text-slate-400">
                              {item.formatLabel} • {item.abvLabel} • {item.styleLabel}
                            </p>
                          </div>
                          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {item.approvals?.length || 0} Conferme
                          </span>
                        </div>

                        {/* Avviso se c'è 1 chiamata VAR in attesa del 2° giudice */}
                        {item.varVotes?.length === 1 && !isPenalized && (
                          <div className="bg-amber-500/15 border border-amber-500/40 rounded-xl p-2.5 text-[11px] text-amber-200 flex items-center gap-2">
                            <Eye className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>
                              <strong>Check VAR aperto da {item.varVotes[0].voterName}:</strong> "{item.varVotes[0].reasonLabel}". Serve 1 altro voto per applicare il malus!
                            </span>
                          </div>
                        )}

                        {/* Pulsanti Azione Sala VAR: Conferma Birra + Chiama VAR */}
                        {!isPenalized && (
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => handleApproveBeer(item.id)}
                              disabled={hasApproved}
                              className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 border transition ${
                                hasApproved
                                  ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                                  : 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/40 text-emerald-300'
                              }`}
                            >
                              <Check className="w-4 h-4" />
                              {hasApproved ? 'Birra Confermata' : 'Conferma Birra'}
                            </button>

                            <button
                              type="button"
                              onClick={() => setVarModalBeer(item)}
                              disabled={hasVotedVar}
                              className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 border transition ${
                                hasVotedVar
                                  ? 'bg-red-950/60 border-red-500/40 text-red-300 opacity-75'
                                  : 'bg-red-500/20 hover:bg-red-500/30 border-red-500/50 text-red-300'
                              }`}
                            >
                              <ShieldAlert className="w-4 h-4" />
                              {hasVotedVar ? `VAR Chiamato (${item.varVotes.length}/2)` : `Chiama VAR (${item.varVotes.length}/2)`}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: REGOLAMENTO AGGIORNATO */}
          {activeTab === 'regole' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs text-slate-300">
              <h3 className="text-xs font-black uppercase text-amber-400">Regolamento Ufficiale "Sempre Noi"</h3>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-black uppercase text-amber-400">1. Formati Base</span>
                  <div className="flex justify-between"><span>Piccola (33cl)</span><strong className="text-white">+3 pt</strong></div>
                  <div className="flex justify-between"><span>Media (50cl)</span><strong className="text-white">+5 pt</strong></div>
                  <div className="flex justify-between"><span>1 litro</span><strong className="text-amber-400">+8 pt</strong></div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-black uppercase text-amber-400">2. Grado Alcolico & Qualità</span>
                  <div className="flex justify-between"><span>Leggera (fino a 5,6°)</span><strong className="text-white">x1.0</strong></div>
                  <div className="flex justify-between"><span>Media (da 5,6° a 7,5°)</span><strong className="text-white">x1.3</strong></div>
                  <div className="flex justify-between"><span>Forte (oltre 7,5°)</span><strong className="text-white">x1.7</strong></div>
                  <div className="flex justify-between pt-1 border-t border-slate-800"><span>Qualità Alla spina</span><strong className="text-amber-400">+3 pt</strong></div>
                  <div className="flex justify-between"><span>Qualità Artigianale</span><strong className="text-amber-400">+2 pt</strong></div>
                  <div className="flex justify-between"><span>Bonus "Sempre noi"</span><strong className="text-emerald-400">x1.3</strong></div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-red-500/30 space-y-1">
                  <span className="text-[10px] font-black uppercase text-red-400">3. Codice Disciplinare Sala VAR (2 Voti)</span>
                  <div className="flex justify-between"><span>🟨 Cartellino giallo: birra avanzata</span><strong className="text-yellow-400">-2 pt</strong></div>
                  <div className="flex justify-between"><span>🚨 Simulazione: foto riciclata/vuota</span><strong className="text-red-400">-5 pt + Annullo</strong></div>
                  <div className="flex justify-between"><span>🟥 Cartellino rosso: analcolica/radler</span><strong className="text-red-500">-10 pt + Annullo</strong></div>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* MODALE DI CHIAMATA AL VAR CON LE 3 SANZIONI */}
        {varModalBeer && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-red-500/50 rounded-2xl max-w-sm w-full p-4 space-y-3.5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <h3 className="text-xs font-black uppercase text-red-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> On-Field Review: {varModalBeer.playerName}
                </h3>
                <span className="text-[10px] font-mono bg-red-500/20 text-red-300 px-2 py-0.5 rounded">
                  Voto {varModalBeer.varVotes.length + 1} di 2
                </span>
              </div>

              <p className="text-[11px] text-slate-300">
                Seleziona l'infrazione rilevata al monitor. Al 2° voto concorde la penalità verrà applicata in Classifica F1:
              </p>

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
                <button
                  type="button"
                  onClick={() => setVarModalBeer(null)}
                  className="py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Chiudi Monitor
                </button>
                <button
                  type="button"
                  onClick={handleConfirmVarCall}
                  className="py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase shadow-lg shadow-red-600/30"
                >
                  Invia Voto VAR
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
            <button onClick={() => setActiveTab('var')} className={`flex flex-col items-center py-1 rounded-xl ${activeTab === 'var' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}>
              <ShieldAlert className="w-5 h-5" />
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