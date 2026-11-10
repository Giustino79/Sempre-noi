import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Trophy, PlusCircle, ShieldAlert, Flame, Users, Camera, 
  CheckCircle2, AlertTriangle, Award, MapPin, Clock, Sparkles,
  LogOut, Plus, UserPlus, Key, User, Beer, Copy, Check, ChevronRight,
  ArrowLeft, BookOpen, Crown, Flag, XCircle, Upload, Shield
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

// --- CATALOGO BICCHIERI AVATAR (5 STILI ICONICI CON COLORI REALI) ---
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

// --- LEGA DEMO DI DEFAULT ---
const DEFAULT_LEAGUES = [
  {
    id: 'PUB-2026',
    name: 'Fantabirra Bar Sport',
    adminId: 'user_manolo',
    members: [
      { id: 'u1', name: 'Manolo "Il Secco"', glassType: 'triple', points: 58.0, weekendPts: 24.0, beers: 8, yellowCards: 1, redCards: 0, isCaptain: false },
      { id: 'u2', name: 'Marco "Spina"', glassType: 'ipa', points: 45.5, weekendPts: 18.5, beers: 6, yellowCards: 0, redCards: 0, isCaptain: true },
      { id: 'u3', name: 'Andrea "Litro"', glassType: 'stout', points: 39.0, weekendPts: 13.0, beers: 5, yellowCards: 0, redCards: 0, isCaptain: false },
      { id: 'u4', name: 'Luca "Radler"', glassType: 'lager', points: 22.0, weekendPts: 6.0, beers: 4, yellowCards: 1, redCards: 1, isCaptain: false }
    ],
    feed: [
      {
        id: 'b101',
        playerId: 'u1',
        playerName: 'Manolo "Il Secco"',
        glassType: 'triple',
        beerName: 'La Chouffe Blonde alla Spina',
        formatLabel: 'Spina Media (50cl)',
        abvLabel: 'Doppio Malto (8.0%)',
        styleLabel: 'Artigianale / Triple (+2pt)',
        points: 10.5,
        timestamp: '22 min fa',
        location: 'Luppolo d’Oro • GPS Verificato',
        photoUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=600&q=80',
        bonuses: ['GP Weekend'],
        approvals: 2,
        varVotes: 1,
        varReason: 'Bicchiere già mezzo vuoto allo scatto (-5pt Simulazione)',
        status: 'pending_var',
        userVotedVar: false,
        userApproved: false
      },
      {
        id: 'b102',
        playerId: 'u2',
        playerName: 'Marco "Spina"',
        glassType: 'ipa',
        beerName: 'Double IPA "Spacca Fegato"',
        formatLabel: 'Spina Media (50cl)',
        abvLabel: 'Doppio Malto (8.2%)',
        styleLabel: 'Artigianale / IPA (+2pt)',
        points: 15.8,
        timestamp: '2 ore fa',
        location: 'Old Fox Pub',
        photoUrl: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&w=600&q=80',
        bonuses: ['Bonus Sempre Noi (x1.5)'],
        approvals: 4,
        varVotes: 0,
        varReason: null,
        status: 'valid',
        userVotedVar: false,
        userApproved: true
      }
    ]
  }
];

export default function App() {
  // --- STATO AUTENTICAZIONE E UTENTE (Memorizzato in localStorage) ---
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sempre_noi_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // --- STATO LEGHE ---
  const [leagues, setLeagues] = useState(() => {
    const saved = localStorage.getItem('sempre_noi_leagues');
    return saved ? JSON.parse(saved) : DEFAULT_LEAGUES;
  });

  const [activeLeagueId, setActiveLeagueId] = useState(null);
  const [showCreateLeagueModal, setShowCreateLeagueModal] = useState(false);
  const [showJoinLeagueModal, setShowJoinLeagueModal] = useState(false);
  const [newLeagueName, setNewLeagueName] = useState('');
  const [joinLeagueCode, setJoinLeagueCode] = useState('');

  // --- STATO GIOCO IN-LEAGUE ---
  const [activeTab, setActiveTab] = useState('classifica'); // 'classifica' | 'stappa' | 'var' | 'regole'
  const [toastMessage, setToastMessage] = useState(null);
  const [showGlassPicker, setShowGlassPicker] = useState(false);
  const [copiedCodeToast, setCopiedCodeToast] = useState(false);

  // Modale sanzione VAR
  const [varModalBeer, setVarModalBeer] = useState(null);
  const [selectedVarReason, setSelectedVarReason] = useState('Bicchiere mezzo vuoto (-5pt Simulazione)');

  // Form Stappa!
  const [beerTitle, setBeerTitle] = useState('');
  const [format, setFormat] = useState('spina');
  const [abvTier, setAbvTier] = useState('media');
  const [craftTier, setCraftTier] = useState('artigianale');
  const [bonusSempreNoi, setBonusSempreNoi] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=600&q=80');
  const fileInputRef = useRef(null);

  // Salva stato in LocalStorage quando cambia
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sempre_noi_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sempre_noi_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('sempre_noi_leagues', JSON.stringify(leagues));
  }, [leagues]);

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // --- LOGICA LOGIN & REGISTRAZIONE ---
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authUsername.trim() || !authPassword.trim()) {
      showToast('Inserisci username e password per continuare!', 'danger');
      return;
    }

    const cleanUser = authUsername.trim();
    const userId = 'usr_' + cleanUser.toLowerCase().replace(/\s+/g, '_');
    
    const userObj = {
      id: userId,
      username: cleanUser,
      glassType: 'weiss'
    };

    setCurrentUser(userObj);
    showToast(`Benvenuto ${cleanUser}! Pronto a stappare? 🍺`, 'success');
    setAuthUsername('');
    setAuthPassword('');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveLeagueId(null);
    showToast('Disconnessione effettuata.', 'warning');
  };

  // --- LOGICA CREAZIONE E ADESIONE LEGHE ---
  const handleCreateLeague = (e) => {
    e.preventDefault();
    if (!newLeagueName.trim()) return;

    const code = 'PUB-' + Math.floor(1000 + Math.random() * 9000);
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
          isCaptain: false
        }
      ],
      feed: []
    };

    setLeagues([newLeague, ...leagues]);
    setActiveLeagueId(code);
    setShowCreateLeagueModal(false);
    setNewLeagueName('');
    showToast(`Lega "${newLeague.name}" creata! Codice invito: ${code}`, 'success');
  };

  const handleJoinLeague = (e) => {
    e.preventDefault();
    const cleanCode = joinLeagueCode.trim().toUpperCase();
    const foundLeague = leagues.find(l => l.id === cleanCode);

    if (!foundLeague) {
      showToast('Codice lega non valido! Verifica il codice e riprova.', 'danger');
      return;
    }

    // Controlla se l'utente è già dentro
    const isMember = foundLeague.members.some(m => m.id === currentUser.id);
    if (!isMember) {
      setLeagues(prev => prev.map(l => {
        if (l.id === cleanCode) {
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
                redCards: 0,
                isCaptain: false
              }
            ]
          };
        }
        return l;
      }));
    }

    setActiveLeagueId(cleanCode);
    setShowJoinLeagueModal(false);
    setJoinLeagueCode('');
    showToast(`Ti sei unito alla lega "${foundLeague.name}"!`, 'success');
  };

  // Copia codice lega negli appunti
  const copyLeagueCode = (code) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code);
    } else {
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopiedCodeToast(true);
    setTimeout(() => setCopiedCodeToast(false), 2000);
  };

  // Lega selezionata corrente
  const activeLeague = leagues.find(l => l.id === activeLeagueId);

  // Cambio calice dell'utente
  const handleSelectGlass = (glassId) => {
    const updatedUser = { ...currentUser, glassType: glassId };
    setCurrentUser(updatedUser);

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
    showToast(`Calice aggiornato con successo!`, 'success');
  };

  // Calcolo punti live form "Stappa!"
  const calculatedDrink = useMemo(() => {
    const formatMap = { spina: { pts: 5, label: 'Spina Media 50cl' }, bottiglia: { pts: 3, label: 'Bottiglia 33cl' }, litro: { pts: 10, label: 'Litro / Pinta Imperiale' } };
    const abvMap = { leggera: { mult: 1.0, label: 'Leggera (<5%)' }, media: { mult: 1.3, label: 'Strutturata (5%-7.5%)' }, alta: { mult: 1.7, label: 'Doppio Malto (>7.5%)' } };
    const craftMap = { industriale: { bonus: 0, label: 'Industriale' }, artigianale: { bonus: 2, label: 'Artigianale / IPA / Weiss' }, homebrewing: { bonus: 4, label: 'Homebrewing Autoprodotta' } };

    const base = formatMap[format].pts;
    const mult = abvMap[abvTier].mult;
    const styleBonus = craftMap[craftTier].bonus;

    let subtotal = (base * mult) + styleBonus;
    if (bonusSempreNoi) subtotal *= 1.5;

    const meInLeague = activeLeague?.members.find(m => m.id === currentUser?.id);
    if (meInLeague?.isCaptain) subtotal *= 2;

    return {
      total: Number(subtotal.toFixed(1)),
      base, mult, styleBonus,
      formatLabel: formatMap[format].label,
      abvLabel: abvMap[abvTier].label,
      styleLabel: craftMap[craftTier].label
    };
  }, [format, abvTier, craftTier, bonusSempreNoi, activeLeague, currentUser]);

  // Invio nuova birra
  const handleAddBeer = (e) => {
    e.preventDefault();
    if (!activeLeagueId) return;

    const me = activeLeague.members.find(m => m.id === currentUser.id);
    const activeBonuses = [];
    if (bonusSempreNoi) activeBonuses.push('Sempre Noi (x1.5)');
    if (me?.isCaptain) activeBonuses.push('Capitano (x2)');

    const newBeer = {
      id: 'b_' + Date.now(),
      playerId: currentUser.id,
      playerName: currentUser.username,
      glassType: currentUser.glassType || 'weiss',
      beerName: beerTitle.trim() || `${calculatedDrink.styleLabel.split(' ')[0]} alla Spina`,
      formatLabel: calculatedDrink.formatLabel,
      abvLabel: calculatedDrink.abvLabel,
      styleLabel: `${calculatedDrink.styleLabel} (+${calculatedDrink.styleBonus}pt)`,
      points: calculatedDrink.total,
      timestamp: 'Adesso',
      location: bonusSempreNoi ? 'Pub (Tavolata 3+ Amici)' : 'Posizione Certificata',
      photoUrl: selectedPhoto,
      bonuses: activeBonuses,
      approvals: 1,
      varVotes: 0,
      varReason: null,
      status: 'valid',
      userVotedVar: false,
      userApproved: true
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
    showToast(`🍺 Birra registrata! +${calculatedDrink.total} Punti in Classifica!`, 'success');
    setActiveTab('classifica');
  };

  // Conferma Voto VAR
  const handleConfirmVar = () => {
    if (!varModalBeer || !activeLeagueId) return;

    const isRed = selectedVarReason.includes('Rosso');
    const isYellow = selectedVarReason.includes('Giallo');
    const penalty = isRed ? 10 : isYellow ? 2 : 5;

    setLeagues(prev => prev.map(l => {
      if (l.id === activeLeagueId) {
        const updatedFeed = l.feed.map(item => {
          if (item.id === varModalBeer.id) {
            const newVotes = item.varVotes + 1;
            const rejected = newVotes >= 2;
            return {
              ...item,
              varVotes: newVotes,
              varReason: selectedVarReason,
              userVotedVar: true,
              status: rejected ? (isRed ? 'red_card' : isYellow ? 'yellow_card' : 'rejected') : 'pending_var'
            };
          }
          return item;
        });

        // Se raggiunge 2 voti, applica penalità
        let updatedMembers = l.members;
        if (varModalBeer.varVotes + 1 >= 2) {
          updatedMembers = l.members.map(m => {
            if (m.id === varModalBeer.playerId) {
              const ptsDeduct = isYellow ? penalty : (varModalBeer.points + penalty);
              return {
                ...m,
                points: Math.max(0, Number((m.points - ptsDeduct).toFixed(1))),
                weekendPts: Math.max(0, Number((m.weekendPts - ptsDeduct).toFixed(1))),
                beers: isYellow ? m.beers : Math.max(0, m.beers - 1),
                yellowCards: isYellow ? m.yellowCards + 1 : m.yellowCards,
                redCards: isRed ? m.redCards + 1 : m.redCards
              };
            }
            return m;
          });
        }

        return { ...l, feed: updatedFeed, members: updatedMembers };
      }
      return l;
    }));

    setVarModalBeer(null);
    showToast(`Segnalazione VAR applicata con successo!`, 'warning');
  };

  // Caricamento foto
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Classifica F1 ordinata
  const sortedMembers = useMemo(() => {
    if (!activeLeague) return [];
    return [...activeLeague.members].sort((a, b) => b.points - a.points);
  }, [activeLeague]);

  const leaderPoints = sortedMembers[0]?.points || 0;

  // =========================================================================
  // SCHERMATA 1: LOGIN / REGISTRAZIONE UTENTE
  // =========================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-amber-500 selection:text-slate-950">
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <SempreNoiToastLogo className="w-16 h-16 mx-auto drop-shadow-lg" />
            <h1 className="text-2xl font-black uppercase tracking-wider text-amber-400">
              Sempre Noi
            </h1>
            <p className="text-xs text-slate-400">
              Il Fantabirra per gruppi di amici • Entra nella Lega
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Username o Nickname</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  placeholder="Es. IlLuppoloDOro"
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
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
            >
              {authMode === 'login' ? 'Entra in Lega' : 'Crea Account'}
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-800/80">
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-xs text-amber-400 hover:underline font-bold"
            >
              {authMode === 'login' ? 'Non hai un account? Registrati subito' : 'Hai già un account? Accedi qui'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SCHERMATA 2: DASHBOARD LEGHE (SELEZIONE / CREAZIONE / ADESIONE)
  // =========================================================================
  if (!activeLeagueId) {
    const userLeagues = leagues.filter(l => l.members.some(m => m.id === currentUser.id));

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 pb-12">
        <div className="w-full max-w-md space-y-6">
          
          {/* Header Dashboard Utente */}
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <BeerGlassAvatar type={currentUser.glassType || 'weiss'} size="sm" />
              <div>
                <span className="text-xs text-slate-400 block font-semibold">Benvenuto al bar,</span>
                <span className="text-base font-black text-white">{currentUser.username}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 transition"
              title="Esci dal tuo account"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Banner Le Tue Leghe */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Trophy className="w-4 h-4" /> Le Tue Leghe "Sempre Noi"
              </h2>
              <span className="text-xs text-slate-500 font-bold">{userLeagues.length} Attive</span>
            </div>

            {userLeagues.length === 0 ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
                <Beer className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">Non partecipi ancora a nessuna lega. Creane una nuova o unisciti col codice d'invito dei tuoi amici!</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {userLeagues.map(league => (
                  <div
                    key={league.id}
                    onClick={() => setActiveLeagueId(league.id)}
                    className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 cursor-pointer transition shadow-lg flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                          {league.name}
                        </h3>
                        <span className="text-[10px] font-mono bg-slate-800 text-amber-400 px-1.5 py-0.5 rounded border border-slate-700">
                          {league.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                        <span>👥 {league.members.length} Amici</span>
                        <span>•</span>
                        <span>🍺 {league.feed.length} Bevute</span>
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Azioni Rapide Leghe */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setShowCreateLeagueModal(true)}
              className="py-3.5 px-4 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-xs uppercase flex flex-col items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-5 h-5 text-amber-400" />
              Crea una Lega
            </button>

            <button
              onClick={() => setShowJoinLeagueModal(true)}
              className="py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs uppercase flex flex-col items-center justify-center gap-1.5 transition"
            >
              <UserPlus className="w-5 h-5 text-amber-400" />
              Unisciti con Codice
            </button>
          </div>

        </div>

        {/* MODALE CREA LEGA */}
        {showCreateLeagueModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleCreateLeague} className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
              <h3 className="text-sm font-black uppercase text-amber-400">Crea Nuova Lega</h3>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Nome della Lega</label>
                <input
                  type="text"
                  required
                  value={newLeagueName}
                  onChange={(e) => setNewLeagueName(e.target.value)}
                  placeholder="Es. I Luppoli di Roma"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button type="button" onClick={() => setShowCreateLeagueModal(false)} className="py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">
                  Annulla
                </button>
                <button type="submit" className="py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black uppercase">
                  Crea e Entra
                </button>
              </div>
            </form>
          </div>
        )}

        {/* MODALE UNISCITI A LEGA */}
        {showJoinLeagueModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleJoinLeague} className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
              <h3 className="text-sm font-black uppercase text-amber-400">Unisciti a una Lega</h3>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Codice Invito (Es. PUB-2026)</label>
                <input
                  type="text"
                  required
                  value={joinLeagueCode}
                  onChange={(e) => setJoinLeagueCode(e.target.value)}
                  placeholder="PUB-2026"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white uppercase focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button type="button" onClick={() => setShowJoinLeagueModal(false)} className="py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">
                  Annulla
                </button>
                <button type="submit" className="py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black uppercase">
                  Unisciti
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // SCHERMATA 3: GIOCO IN-LEAGUE (CLASSIFICA F1, STAPPA, VAR, REGOLE)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center pb-24 font-sans select-none">
      
      {/* TOAST NOTIFICHE */}
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

      {/* CONTAINER PRINCIPALE */}
      <div className="w-full max-w-md min-h-screen bg-slate-900/70 border-x border-slate-800 flex flex-col justify-between shadow-2xl">
        
        {/* HEADER LEGA CORRENTE */}
        <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-amber-500/25 px-3.5 py-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setActiveLeagueId(null)}
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                title="Torna alle tue leghe"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-base font-black text-white leading-none">
                  {activeLeague.name}
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-mono text-amber-400 font-bold">
                    {activeLeague.id}
                  </span>
                  <button
                    onClick={() => copyLeagueCode(activeLeague.id)}
                    className="text-[10px] text-slate-400 hover:text-amber-300 flex items-center gap-0.5"
                  >
                    <Copy className="w-3 h-3" /> {copiedCodeToast ? 'Copiato!' : 'Copia'}
                  </button>
                </div>
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

          {/* Selettore rapido bicchiere avatar */}
          {showGlassPicker && (
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-[10px] uppercase font-black text-amber-400 block">Scegli il tuo Bicchiere Avatar:</span>
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

        {/* CONTENUTO SCHEDE GIOCO */}
        <main className="flex-1 p-4 space-y-5">
          
          {/* TAB 1: CLASSIFICA F1 TUTTI CONTRO TUTTI */}
          {activeTab === 'classifica' && (
            <div className="space-y-4">
              
              {/* PODIO DEL WEEKEND */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl p-3.5 border border-amber-500/30 shadow-xl">
                <span className="text-[10px] font-black uppercase text-amber-400 flex items-center gap-1 mb-2">
                  <Flag className="w-3.5 h-3.5" /> Podio Gran Premio Weekend
                </span>

                <div className="grid grid-cols-3 gap-1.5 items-end text-center pt-1">
                  {/* P2 */}
                  {sortedMembers[1] && (
                    <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-2 flex flex-col items-center">
                      <span className="text-[9px] font-black bg-slate-300 text-slate-950 px-1.5 py-0.2 rounded mb-1">P2</span>
                      <BeerGlassAvatar type={sortedMembers[1].glassType} size="sm" />
                      <span className="text-xs font-bold text-white truncate max-w-full mt-1">{sortedMembers[1].name}</span>
                      <span className="text-xs font-black text-slate-300">+{sortedMembers[1].weekendPts} pt</span>
                    </div>
                  )}

                  {/* P1 */}
                  {sortedMembers[0] && (
                    <div className="bg-amber-500/15 border-2 border-amber-400 rounded-xl p-2.5 flex flex-col items-center -translate-y-1 shadow-lg shadow-amber-500/10">
                      <span className="text-[9px] font-black bg-amber-400 text-slate-950 px-2 py-0.2 rounded mb-1">POLE</span>
                      <BeerGlassAvatar type={sortedMembers[0].glassType} size="md" />
                      <span className="text-xs font-black text-white truncate max-w-full mt-1">{sortedMembers[0].name}</span>
                      <span className="text-sm font-black text-amber-400">+{sortedMembers[0].weekendPts} pt</span>
                    </div>
                  )}

                  {/* P3 */}
                  {sortedMembers[2] && (
                    <div className="bg-slate-900/90 border border-amber-700/50 rounded-xl p-2 flex flex-col items-center">
                      <span className="text-[9px] font-black bg-amber-700 text-white px-1.5 py-0.2 rounded mb-1">P3</span>
                      <BeerGlassAvatar type={sortedMembers[2].glassType} size="sm" />
                      <span className="text-xs font-bold text-white truncate max-w-full mt-1">{sortedMembers[2].name}</span>
                      <span className="text-xs font-black text-amber-500">+{sortedMembers[2].weekendPts} pt</span>
                    </div>
                  )}
                </div>
              </div>

              {/* TABELLA CLASSIFICA GENERALE */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="px-3.5 py-2.5 bg-slate-800/70 border-b border-slate-800 flex justify-between text-[10px] font-black text-slate-400 uppercase">
                  <span>Pilota Lega</span>
                  <span>Distacco F1 / Punti</span>
                </div>

                <div className="divide-y divide-slate-800">
                  {sortedMembers.map((member, idx) => {
                    const isLeader = idx === 0;
                    const gap = isLeader ? 'LEADER' : `-${(leaderPoints - member.points).toFixed(1)} pt`;
                    const isMe = member.id === currentUser.id;

                    return (
                      <div key={member.id} className={`px-3 py-2.5 flex items-center justify-between ${isMe ? 'bg-amber-500/10' : ''}`}>
                        <div className="flex items-center gap-2.5">
                          <span className={`w-5 text-center text-xs font-black ${isLeader ? 'text-amber-400' : 'text-slate-500'}`}>
                            {idx + 1}
                          </span>
                          <BeerGlassAvatar type={member.glassType} size="sm" />
                          <div>
                            <div className="flex items-center gap-1">
                              <span className={`text-xs font-bold ${isMe ? 'text-amber-300' : 'text-white'}`}>
                                {member.name}
                              </span>
                              {member.yellowCards > 0 && <span className="w-2 h-3 bg-yellow-400 rounded-sm inline-block" />}
                              {member.redCards > 0 && <span className="w-2 h-3 bg-red-600 rounded-sm inline-block" />}
                            </div>
                            <span className="text-[10px] text-slate-400 block">{member.beers} birre registrate</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-black text-amber-400">{member.points} pt</div>
                          <div className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded inline-block ${isLeader ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                            {gap}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setActiveTab('stappa')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <PlusCircle className="w-5 h-5 stroke-[2.5]" /> Stappa Nuova Birra
              </button>
            </div>
          )}

          {/* TAB 2: STAPPA! */}
          {activeTab === 'stappa' && (
            <form onSubmit={handleAddBeer} className="space-y-4">
              <div className="bg-gradient-to-r from-amber-500/20 to-slate-900 border border-amber-500/40 rounded-2xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 block">Punti Stimati GP</span>
                  <h2 className="text-xs font-bold text-white mt-0.5">({calculatedDrink.base}pt × {calculatedDrink.mult}) + {calculatedDrink.styleBonus}pt</h2>
                </div>
                <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-amber-400/40 text-right">
                  <span className="text-xl font-black text-amber-400">+{calculatedDrink.total}</span>
                  <span className="text-[9px] block text-slate-400 font-bold uppercase">Punti F1</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Nome Birra / Pub</label>
                <input
                  type="text"
                  value={beerTitle}
                  onChange={(e) => setBeerTitle(e.target.value)}
                  placeholder="Es. Weissbier, IPA Artigianale..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Selettori Formato, ABV, Stile */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
                <label className="block text-[10px] font-bold uppercase text-slate-400">1. Formato (Base Punti)</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'bottiglia', name: '33cl', pts: '+3 pt' },
                    { id: 'spina', name: 'Media 50cl', pts: '+5 pt' },
                    { id: 'litro', name: 'Litro / Pinta', pts: '+10 pt' }
                  ].map(f => (
                    <button
                      type="button"
                      key={f.id}
                      onClick={() => setFormat(f.id)}
                      className={`p-2 rounded-xl border text-center ${format === f.id ? 'bg-amber-500/20 border-amber-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                    >
                      <span className="text-xs font-bold block">{f.name}</span>
                      <span className="text-[10px] text-amber-400 font-black">{f.pts}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
                <label className="block text-[10px] font-bold uppercase text-slate-400">2. Grado Alcolico (Moltiplicatore)</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'leggera', name: 'Leggera', mult: 'x1.0' },
                    { id: 'media', name: 'Strutturata', mult: 'x1.3' },
                    { id: 'alta', name: 'Doppio Malto', mult: 'x1.7' }
                  ].map(a => (
                    <button
                      type="button"
                      key={a.id}
                      onClick={() => setAbvTier(a.id)}
                      className={`p-2 rounded-xl border text-center ${abvTier === a.id ? 'bg-amber-500/20 border-amber-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                    >
                      <span className="text-xs font-bold block">{a.name}</span>
                      <span className="text-[10px] text-amber-400 font-black">{a.mult}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bonus "Sempre Noi" */}
              <div 
                onClick={() => setBonusSempreNoi(!bonusSempreNoi)}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer ${bonusSempreNoi ? 'bg-emerald-950/60 border-emerald-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
              >
                <div className="flex items-center gap-2">
                  <Users className={`w-4 h-4 ${bonusSempreNoi ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold">Bonus "Sempre Noi" (3+ amici al tavolo)</span>
                </div>
                <span className="text-xs font-black text-emerald-400">x1.5</span>
              </div>

              {/* Foto Prova */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
                <label className="block text-[10px] font-bold uppercase text-slate-400">Foto Prova per il VAR</label>
                <div className="relative h-36 w-full rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                  <img src={selectedPhoto} alt="Birra" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-2 right-2 bg-slate-950/90 text-amber-400 px-2.5 py-1 rounded-lg text-[10px] font-bold border border-amber-400/40"
                  >
                    Carica Foto
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                Conferma Bevuta (+{calculatedDrink.total} PT)
              </button>
            </form>
          )}

          {/* TAB 3: SALA VAR */}
          {activeTab === 'var' && (
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
                <p className="text-xs text-slate-300">
                  Controlla le bevute degli amici: con 2 voti scatta la sanzione in classifica!
                </p>
              </div>

              <div className="space-y-3">
                {activeLeague.feed.map(item => {
                  const isRejected = item.status === 'rejected' || item.status === 'red_card' || item.status === 'yellow_card';
                  return (
                    <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
                      <div className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BeerGlassAvatar type={item.glassType} size="sm" />
                          <div>
                            <span className="text-xs font-bold text-white block">{item.playerName}</span>
                            <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-amber-400">+{item.points} pt</span>
                      </div>

                      <div className="relative h-44 w-full bg-slate-950">
                        <img src={item.photoUrl} alt={item.beerName} className="w-full h-full object-cover" />
                        {isRejected && (
                          <div className="absolute inset-0 bg-red-950/85 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 text-center">
                            <XCircle className="w-10 h-10 text-red-400 mb-1" />
                            <span className="text-xs font-black text-white uppercase border border-red-400 px-2 py-0.5 rounded">
                              Annullata dal VAR!
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-3 space-y-2">
                        <h3 className="text-xs font-bold text-white">{item.beerName}</h3>
                        {!isRejected && (
                          <button
                            onClick={() => setVarModalBeer(item)}
                            disabled={item.userVotedVar}
                            className="w-full py-2 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-bold flex items-center justify-center gap-1"
                          >
                            <ShieldAlert className="w-3.5 h-3.5" />
                            {item.userVotedVar ? 'VAR Chiamato' : `Chiama VAR (${item.varVotes}/2)`}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: REGOLE */}
          {activeTab === 'regole' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs text-slate-300">
              <h3 className="text-xs font-black uppercase text-amber-400">Regolamento "Sempre Noi"</h3>
              <p>Il campionato è in <strong>modalità Formula 1 (Tutti contro Tutti)</strong>: ogni birra validata fa punti sia per il Gran Premio del Weekend che per la Classifica Generale.</p>
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between border-b border-slate-800 py-1">
                  <span>🍻 Bonus "Sempre Noi" (3+ amici)</span>
                  <span className="font-bold text-emerald-400">x1.5</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 py-1">
                  <span>🚨 Simulazione al VAR (Foto falsa)</span>
                  <span className="font-bold text-red-400">-5 pt</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>🟥 Cartellino Rosso (Radler/Analcolica)</span>
                  <span className="font-bold text-red-500">-10 pt</span>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* MODALE SANZIONE VAR */}
        {varModalBeer && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-red-500/40 rounded-2xl max-w-sm w-full p-4 space-y-3 shadow-2xl">
              <h3 className="text-xs font-black uppercase text-red-400 flex items-center gap-1">
                <ShieldAlert className="w-4 h-4" /> Chiamata VAR per {varModalBeer.playerName}
              </h3>
              <div className="space-y-1.5">
                {[
                  '🟨 Cartellino Giallo: Birra avanzata (-2pt)',
                  '🚨 Simulazione in Area: Foto riciclata/vuota (-5pt)',
                  '🟥 Cartellino Rosso: Birra analcolica/Radler (-10pt)'
                ].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedVarReason(r)}
                    className={`w-full p-2 rounded-xl text-left text-xs font-semibold border ${selectedVarReason === r ? 'bg-red-500/20 border-red-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button type="button" onClick={() => setVarModalBeer(null)} className="py-2 rounded-xl bg-slate-800 text-xs font-bold">Annulla</button>
                <button type="button" onClick={handleConfirmVar} className="py-2 rounded-xl bg-red-600 text-white text-xs font-black uppercase">Conferma VAR</button>
              </div>
            </div>
          </div>
        )}

        {/* BARRA NAVIGAZIONE IN BASSO */}
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