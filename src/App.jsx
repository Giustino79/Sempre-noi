import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Trophy, PlusCircle, ShieldAlert, Users, Camera, 
  CheckCircle2, Sparkles, LogOut, Plus, UserPlus, Key, User, 
  Beer, Copy, Check, ChevronRight, ArrowLeft, BookOpen, Flag, 
  XCircle, Share2, RefreshCw, Eye, Sun, Crown, Trash2, Clock, Lock, Award,
  Newspaper, Store, Pencil 
} from 'lucide-react';
import Chiosco, { GodPinModal, GodBollettinoConsole, OwnedItemsShowcase } from './Chiosco';

// ============================================================================
// 🔗 LINK FIREBASE REALTIME DATABASE PRECONFIGURATO
// ============================================================================
const CLOUD_DB_URL = "https://sempre-noi-default-rtdb.europe-west1.firebasedatabase.app/"; 

const cleanDbUrl = CLOUD_DB_URL ? CLOUD_DB_URL.replace(/\/$/, "") : "";

// Durata massima delle notizie: 24 ore
const GAZZETTA_EXPIRY_MS = 24 * 60 * 60 * 1000;

// Filtra solo le notizie uscite nelle ultime 24 ore (massimo 30)
const filterActiveGazzettaNews = (newsList, nowMs = Date.now()) => {
  return (newsList || [])
    .filter(n => n && n.createdAtMs && (nowMs - Number(n.createdAtMs)) < GAZZETTA_EXPIRY_MS)
    .slice(0, 30);
};

// --- LOGO UFFICIALE NON DEFORMATO ---
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

// --- CATALOGO BICCHIERI AVATAR (8 STILI + LATTINA AMMACCATA PENITENZA 24H) ---
const BEER_GLASS_TYPES = [
  { id: 'weiss', name: 'Weiss / Weizen', shortName: 'Weiss', shortDesc: 'Vaso slanciato dorato' },
  { id: 'lager', name: 'Lager / Pils', shortName: 'Lager', shortDesc: 'Boccale classico da pub' },
  { id: 'ipa', name: 'IPA Artigianale', shortName: 'IPA', shortDesc: 'Calice Teku con base' },
  { id: 'session_ipa', name: 'Session IPA', shortName: 'Session IPA', shortDesc: 'Pinta Nonic chiara' },
  { id: 'dipa', name: 'DIPA (Double IPA)', shortName: 'DIPA', shortDesc: 'Snifter tulipano ramato' },
  { id: 'triple', name: 'Tripel Belga', shortName: 'Tripel', shortDesc: 'Calice a coppa dorato' },
  { id: 'trappista', name: 'Trappista', shortName: 'Trappista', shortDesc: 'Coppa larga bruno-ambrata' },
  { id: 'stout', name: 'Stout Irlandese', shortName: 'Stout', shortDesc: 'Pinta scura cremosa' }
];

const isCrushedCanActive = (member) => {
  return Boolean(member?.rumenoUntil && Number(member.rumenoUntil) > Date.now());
};

// Calcola la serie attiva della serata (si azzera 3 ore dopo l'ultima birra stappata)
const STREAK_EXPIRY_MS = 3 * 60 * 60 * 1000;
const getActiveSessionStreak = (member, nowMs = Date.now()) => {
  if (!member?.lastDrinkAtMs || !member?.dailyCount) return 0;
  if ((nowMs - Number(member.lastDrinkAtMs)) > STREAK_EXPIRY_MS) return 0;
  return Number(member.dailyCount || 0);
};

const getMemberStreakLevel = (member, nowMs = Date.now()) => {
  const count = getActiveSessionStreak(member, nowMs);
  if (count >= 5) return 'comet';
  if (count >= 3) return 'fire';
  return 'none';
};

const formatCaptainTimeLeft = (expiresAtMs, nowMs) => {
  if (!expiresAtMs) return '12h 00m';
  const diff = Number(expiresAtMs) - nowMs;
  if (diff <= 0) return '12h scadute (Attesa VAR)';
  const hrs = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  return `${hrs}h ${String(mins).padStart(2, '0')}m`;
};

function BeerGlassAvatar({ type = 'weiss', size = 'md', crushed = false, streakLevel = 'none' }) {
  const effectiveType = crushed ? 'crushed_can' : type;
  const sizeClasses = {
    sm: 'w-8 h-8 p-1',
    md: 'w-11 h-11 p-1.5',
    lg: 'w-14 h-14 p-2'
  }[size] || 'w-11 h-11 p-1.5';

  const borderStyle = streakLevel === 'comet'
    ? 'bg-indigo-950/90 border-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.85)]'
    : streakLevel === 'fire'
    ? 'bg-orange-950/80 border-orange-400 shadow-[0_0_14px_rgba(249,115,22,0.85)]'
    : effectiveType === 'crushed_can'
    ? 'bg-red-950/80 border-red-500/70'
    : 'bg-slate-900 border-slate-700';

  return (
    <div className={`${sizeClasses} aspect-square rounded-2xl ${borderStyle} border flex items-center justify-center shrink-0 relative overflow-visible`}>
      {/* EFFETTO FIAMME DINAMICHE A PIÙ FIAMMETTE INDIPENDENTI (3ª e 4ª BIRRA) */}
      {streakLevel === 'fire' && (
        <svg viewBox="0 0 64 64" className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none z-20 overflow-visible">
          <defs>
            <linearGradient id="snFlameRed" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="55%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
            <linearGradient id="snFlameGold" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#fef9c3" />
            </linearGradient>
          </defs>

          {/* Gruppo 1: Fiammette laterali basse e alte (Ritmo A) */}
          <g className="sn-flame-a">
            <path d="M8 48 C2 40, 4 28, 10 21 C9 29, 13 33, 12 44 Z" fill="url(#snFlameRed)" />
            <path d="M56 48 C62 40, 60 28, 54 21 C55 29, 51 33, 52 44 Z" fill="url(#snFlameRed)" />
            <path d="M18 13 C15 7, 19 2, 23 -1 C22 5, 25 8, 23 13 Z" fill="url(#snFlameGold)" />
            <path d="M46 13 C49 7, 45 2, 41 -1 C42 5, 39 8, 41 13 Z" fill="url(#snFlameGold)" />
          </g>

          {/* Gruppo 2: Fiammette intermedie e cresta superiore (Ritmo B sfasato) */}
          <g className="sn-flame-b">
            <path d="M11 33 C5 24, 9 14, 15 8 C13 16, 17 21, 15 30 Z" fill="url(#snFlameGold)" />
            <path d="M53 33 C59 24, 55 14, 49 8 C51 16, 47 21, 49 30 Z" fill="url(#snFlameGold)" />
            <path d="M29 10 C27 3, 32 -3, 33 -5 C35 -1, 37 4, 35 10 Z" fill="url(#snFlameRed)" />
          </g>

          {/* Gruppo 3: Lingue di fuoco vive interne (Ritmo C veloce) */}
          <g className="sn-flame-c">
            <path d="M14 55 C9 49, 10 41, 15 36 C14 42, 18 46, 17 53 Z" fill="url(#snFlameGold)" />
            <path d="M50 55 C55 49, 54 41, 49 36 C50 42, 46 46, 47 53 Z" fill="url(#snFlameGold)" />
            <path d="M31 11 C30 6, 32 1, 33 -1 C34 2, 35 6, 33 11 Z" fill="#fef08a" />
          </g>

          {/* Scintille che salgono */}
          <circle cx="11" cy="14" r="1.6" fill="#fde047" className="sn-spark-1" />
          <circle cx="53" cy="12" r="1.5" fill="#fb923c" className="sn-spark-2" />
          <circle cx="25" cy="2" r="1.4" fill="#fef08a" className="sn-spark-2" />
          <circle cx="39" cy="1" r="1.7" fill="#fde047" className="sn-spark-1" />
        </svg>
      )}

      {/* EFFETTO SCIA DI STELLE E COMETA (5+ BIRRE) */}
      {streakLevel === 'comet' && (
        <svg viewBox="0 0 64 64" className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none z-20 overflow-visible">
          <defs>
            <linearGradient id="cometTailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="sn-comet-orbit">
            <circle cx="32" cy="32" r="27" fill="none" stroke="url(#cometTailGrad)" strokeWidth="2.8" strokeDasharray="42 35" strokeLinecap="round" />
            <circle cx="32" cy="5" r="3.2" fill="#ffffff" />
            <circle cx="32" cy="5" r="5.5" fill="#22d3ee" opacity="0.55" />
            <polygon points="56,24 58,28 62,29 58,31 56,35 54,31 50,29 54,28" fill="#fde047" />
            <polygon points="8,38 9.5,41 13,42 9.5,43.5 8,47 6.5,43.5 3,42 6.5,41" fill="#38bdf8" />
          </g>
          <polygon points="12,10 13.5,13 17,14 13.5,15.5 12,19 10.5,15.5 7,14 10.5,13" fill="#facc15" className="sn-star-twinkle" />
          <polygon points="52,48 53.2,50.5 56,51.5 53.2,52.5 52,55 50.8,52.5 48,51.5 50.8,50.5" fill="#e879f9" className="sn-star-twinkle" />
        </svg>
      )}

      {effectiveType === 'crushed_can' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M14 10L34 10L35 17L28 24L35 31L33 40L15 40L13 31L20 23L13 17Z" fill="#15803d" stroke="#cbd5e1" strokeWidth="1.6" strokeLinejoin="round" />
          <ellipse cx="24" cy="10" rx="10" ry="2.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2" />
          <path d="M15 40C15 41.5 33 41.5 33 40" stroke="#e2e8f0" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="24" cy="10" r="2" fill="#475569" />
          <path d="M24 10L27 7" stroke="#f8fafc" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M16 19L27 23M20 26L31 29" stroke="#facc15" strokeWidth="1.6" strokeLinecap="round" />
          <text x="24" y="36" textAnchor="middle" fill="#fef08a" fontSize="6.5" fontWeight="900">9%</text>
        </svg>
      )}

      {effectiveType === 'weiss' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M16 13C14.5 21 17.5 30 18 41H30C30.5 30 33.5 21 32 13H16Z" fill="#eab308" />
          <path d="M14.5 13.5C14 9.5 17.5 7 20.5 8C22.5 6 26 6 28 8C31 7 34 9.5 33.5 13.5H14.5Z" fill="#ffffff" />
          <path d="M15 11C13.5 20 17 30 17.5 42H30.5C31 30 34.5 20 33 11" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
          <path d="M16.5 42.5H31.5" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}

      {effectiveType === 'lager' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M33 19H38.5C40.5 19 41.5 20.5 41.5 26C41.5 31.5 40.5 33 38.5 33H33" stroke="#cbd5e1" strokeWidth="2.8" fill="none" />
          <rect x="12" y="15" width="21" height="26" rx="2.5" fill="#facc15" />
          <path d="M11 15.5C11 12 13.5 10.5 16.5 11C18.5 8.5 23 8.5 25 11C28.5 10 34 11.5 34 15.5H11Z" fill="#ffffff" />
          <rect x="12" y="14" width="21" height="27.5" rx="3" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
        </svg>
      )}

      {effectiveType === 'ipa' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M15 13L11.5 23.5L24 30L36.5 23.5L33 13H15Z" fill="#ea580c" />
          <path d="M14.5 13.5C14.5 10.5 18 9.5 24 9.5C30 9.5 33.5 10.5 33.5 13.5H14.5Z" fill="#fff7ed" />
          <path d="M15 10.5L11 23.5L24 30.5L37 23.5L33 10.5" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
          <path d="M24 30.5V41.5" stroke="#cbd5e1" strokeWidth="2.4" />
          <path d="M15.5 42.5C18 40.8 30 40.8 32.5 42.5" stroke="#e2e8f0" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      )}

      {effectiveType === 'session_ipa' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M13.5 14L12 19.5L14 23.5L16.5 42H31.5L34 23.5L36 19.5L34.5 14H13.5Z" fill="#fde047" />
          <path d="M13 14.5C13 11 16 9.5 24 9.5C32 9.5 35 11 35 14.5H13Z" fill="#ffffff" />
          <path d="M13.5 11L11.8 19.5L14 23.5L16.5 42.5H31.5L34 23.5L36.2 19.5L34.5 11" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
        </svg>
      )}

      {effectiveType === 'dipa' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M14 13C15.5 17 11 22 13 27.5C15 31.5 19.5 33 24 33C28.5 33 33 31.5 35 27.5C37 22 32.5 17 34 13H14Z" fill="#c2410c" />
          <path d="M13.5 13.5C13.5 10.5 17.5 9.5 24 9.5C30.5 9.5 34.5 10.5 34.5 13.5H13.5Z" fill="#ffedd5" />
          <path d="M13.5 11C15.5 16 10.5 21.5 12.8 27.5C14.8 32 19.5 33.5 24 33.5C28.5 33.5 33.2 32 35.2 27.5C37.5 21.5 32.5 16 34.5 11" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
          <path d="M24 33.5V41.5" stroke="#cbd5e1" strokeWidth="2.6" />
          <path d="M16 42.5C18.5 41 29.5 41 32 42.5" stroke="#e2e8f0" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      )}

      {effectiveType === 'triple' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M11 14C11 25 16.5 30 24 30C31.5 30 37 25 37 14H11Z" fill="#d97706" />
          <path d="M10.5 14.5C10.5 11.5 14 10 17.5 11C20 9.5 28 9.5 30.5 11C34 10 37.5 11.5 37.5 14.5H10.5Z" fill="#fffbeb" />
          <path d="M10 12C10 25 16 30.5 24 30.5C32 30.5 38 25 38 12" stroke="#e2e8f0" strokeWidth="1.8" fill="none" />
          <path d="M24 30.5V41" stroke="#cbd5e1" strokeWidth="2.8" />
          <path d="M15 42.5C17 40.5 31 40.5 33 42.5" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}

      {effectiveType === 'trappista' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M8.5 15C9.5 26.5 15.5 31 24 31C32.5 31 38.5 26.5 39.5 15H8.5Z" fill="#7c2d12" />
          <path d="M8 15.5C8 12.5 13 11 24 11C35 11 40 12.5 40 15.5H8Z" fill="#fef3c7" />
          <path d="M8 13.5C9 26.5 15.5 31.5 24 31.5C32.5 31.5 39 26.5 40 13.5" stroke="#fbbf24" strokeWidth="2" fill="none" />
          <path d="M24 31.5V41" stroke="#cbd5e1" strokeWidth="3.2" />
          <path d="M14 42.5C17 40.5 31 40.5 34 42.5" stroke="#fbbf24" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      )}

      {effectiveType === 'stout' && (
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <path d="M13 15L14.5 19L16.5 42H31.5L33.5 19L35 15H13Z" fill="#1c1917" />
          <path d="M13 15.5V11.5C13 10 15 9.5 24 9.5C33 9.5 35 10 35 11.5V15.5H13Z" fill="#f5deb3" />
          <path d="M13 10.5L12 16.5L14.5 20L16.5 42.5H31.5L33.5 20L36 16.5L35 10.5" stroke="#cbd5e1" strokeWidth="1.8" fill="none" />
        </svg>
      )}
    </div>
  );
}

// --- DISEGNI PERSONALIZZATI PER L'ALBO D'ORO ---
function AlboDrawing({ type }) {
  if (type === 'goat') {
    return (
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/30 to-yellow-900/40 border-2 border-amber-400 flex flex-col items-center justify-center shadow-lg shrink-0 relative">
        <span className="text-2xl leading-none">🐐</span>
        <span className="text-[8px] font-black uppercase bg-amber-400 text-slate-950 px-1.5 rounded-full mt-0.5">GOAT</span>
      </div>
    );
  }
  if (type === 'lemans') {
    return (
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500/30 to-blue-950/50 border-2 border-sky-400 flex flex-col items-center justify-center shadow-lg shrink-0 relative">
        <span className="text-2xl leading-none">⏱️</span>
        <span className="text-[8px] font-black uppercase bg-sky-400 text-slate-950 px-1.5 rounded-full mt-0.5">24H</span>
      </div>
    );
  }
  if (type === 'idrovora') {
    return (
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-950/50 border-2 border-emerald-400 flex flex-col items-center justify-center shadow-lg shrink-0 relative">
        <span className="text-2xl leading-none">⛽</span>
        <span className="text-[8px] font-black uppercase bg-emerald-400 text-slate-950 px-1.5 rounded-full mt-0.5">MAX L</span>
      </div>
    );
  }
  return (
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/25 to-purple-950/50 border-2 border-pink-400/80 flex flex-col items-center justify-center shadow-lg shrink-0 relative">
      <span className="text-2xl leading-none">🍼</span>
      <span className="text-[8px] font-black uppercase bg-pink-400 text-slate-950 px-1.5 rounded-full mt-0.5">GOYIM</span>
    </div>
  );
}

// --- CONFIGURAZIONE DISCLAIMER PERSONALI DEL GIORNO ---
const PERSONAL_DISCLAIMERS = {
  1: {
    badge: '1ª Birra del Giorno',
    emoji: '🍻',
    title: 'Alla salute!',
    message: 'Prima birra della giornata messa a referto! Il motore è ufficialmente entrato in temperatura.',
    buttonText: 'Daje tutta! 🍺',
    theme: 'from-amber-500/30 via-slate-900 to-slate-950 border-amber-400 text-amber-300'
  },
  2: {
    badge: '2ª Birra del Giorno',
    emoji: '⚽🔥',
    title: 'Doppietta, bravo bomber!',
    message: 'Seconda stappata di giornata: passo gara deciso e freddezza sotto porta da vero attaccante di razza!',
    buttonText: 'Puntiamo alla tripletta! 🚀',
    theme: 'from-emerald-500/30 via-slate-900 to-slate-950 border-emerald-400 text-emerald-300'
  },
  3: {
    badge: '3ª Birra del Giorno',
    emoji: '🧐🚨',
    title: 'Ehi calmo, vuoi diventare Mario?',
    message: 'Siamo già alla terza birra di oggi... dalla panchina il mister inizia a guardarti con una certa preoccupazione!',
    buttonText: 'Tranquilli, reggo il passo! 😎',
    theme: 'from-purple-500/30 via-slate-900 to-slate-950 border-purple-400 text-purple-300'
  }
};

// --- OPZIONI SALA VAR ---
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

// --- ORARI E CONTROLLI LIVE ---
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
  const day = now.getDay();
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

const getTodayDateKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

// --- GESTIONE AUTOMATICA SCADENZA 12 ORE CAPITANO + PULIZIA GAZZETTA 24H ---
const settleExpiredCaptainsInLeague = (leagueObj, nowMs) => {
  if (!leagueObj || !leagueObj.members) return { updatedLeague: leagueObj, changed: false, events: [] };

  let changed = false;
  const events = [];
  let currentFeed = [...(leagueObj.feed || [])];

  const rawGazzetta = leagueObj.gazzetta || [];
  let currentGazzetta = filterActiveGazzettaNews(rawGazzetta, nowMs);
  if (currentGazzetta.length !== rawGazzetta.length) {
    changed = true;
  }

  const prevSorted = [...(leagueObj.members || [])].sort((a, b) => b.points - a.points);
  const prevLeader = prevSorted[0];

  const updatedMembers = leagueObj.members.map(m => {
    if (!m.captainActive || !m.captainExpiresAtMs) return m;
    if (nowMs < Number(m.captainExpiresAtMs)) return m;

    const confirmedCount = m.captainBeers || 0;
    const pendingCapBeersInVar = currentFeed.filter(b => b.playerId === m.id && b.isCaptainBeer);

    if (confirmedCount < 4 && (confirmedCount + pendingCapBeersInVar.length) >= 4) {
      return m;
    }

    changed = true;

    if (confirmedCount >= 4) {
      const vaultPts = Number((m.captainVaultPoints || 0).toFixed(1));
      const vaultLiters = Number((m.captainVaultLiters || 0).toFixed(2));
      events.push({
        type: 'success',
        playerName: m.name,
        pts: vaultPts
      });
      return {
        ...m,
        captainActive: false,
        captainExpiresAtMs: null,
        captainBeers: 0,
        captainBeersSubmitted: 0,
        captainVaultPoints: 0,
        captainVaultLiters: 0,
        points: Number((m.points + vaultPts).toFixed(1)),
        weekendPts: Number((m.weekendPts + vaultPts).toFixed(1)),
        beers: (m.beers || 0) + 4,
        liters: Number(((m.liters || (m.beers || 0) * 0.5) + vaultLiters).toFixed(2))
      };
    } else {
      currentFeed = currentFeed.filter(b => !(b.playerId === m.id && b.isCaptainBeer));
      events.push({
        type: 'fail',
        playerName: m.name,
        confirmedCount
      });
      return {
        ...m,
        captainActive: false,
        captainExpiresAtMs: null,
        captainBeers: 0,
        captainBeersSubmitted: 0,
        captainVaultPoints: 0,
        captainVaultLiters: 0,
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
        text: `${newLeader.name} si prende la Pole Position della lega (${newLeader.points} pt)! ${prevLeader.name} scivola dietro e mastica amaro!`,
        timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
        dateLabel: new Date().toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' }),
        createdAtMs: nowMs
      };
      currentGazzetta = filterActiveGazzettaNews([overtakeNews, ...currentGazzetta], nowMs);
    }
  }

  return {
    updatedLeague: {
      ...leagueObj,
      members: updatedMembers,
      feed: currentFeed,
      gazzetta: currentGazzetta
    },
    changed: true,
    events
  };
};

// --- LEGA DEMO DI DEFAULT ---
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
    gazzetta: [
      {
        id: 'news_init_1',
        category: 'SORPASSO IN CURVA',
        icon: '🏎️',
        badgeColor: 'bg-emerald-500 text-slate-950',
        text: 'Manolo si prende la Pole Position della lega (54.5 pt)! Marco insegue a ruota e prepara il controsorpasso!',
        timestamp: '19:45',
        dateLabel: 'Oggi',
        createdAtMs: Date.now() - 3600000
      }
    ],
    feed: [
      {
        id: 'b101',
        playerId: 'u1',
        playerName: 'Manolo',
        glassType: 'trappista',
        beerName: 'Keller Non Filtrata',
        formatId: 'spina50',
        liters: 0.5,
        formatLabel: 'Media 50cl (+5pt)',
        abvLabel: 'Leggera fino a 5,6° (x1.0)',
        styleLabel: 'Alla spina (+3pt)',
        isRumeno: false,
        isCaptainBeer: false,
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

  // Tab: 'classifica' | 'stappa' | 'var' | 'albo' | 'chiosco'
  const [activeTab, setActiveTab] = useState('classifica');
  const [toastMessage, setToastMessage] = useState(null);
  const [showGlassPicker, setShowGlassPicker] = useState(false);
const [showRulesModal, setShowRulesModal] = useState(false);
const [rulesPage, setRulesPage] = useState('intro');
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

  const [isGodMode, setIsGodMode] = useState(() => localStorage.getItem('sempre_noi_god_mode') === 'true');
  const [showGodPinModal, setShowGodPinModal] = useState(false);
  const logoTapRef = useRef({ count: 0, timer: null });

  const handleSecretLogoTap = () => {
    if (isGodMode) {
      setIsGodMode(false);
      localStorage.removeItem('sempre_noi_god_mode');
      showToast('🔒 God Mode nascosta.', 'warning');
      return;
    }
    logoTapRef.current.count += 1;
    if (logoTapRef.current.timer) clearTimeout(logoTapRef.current.timer);
    if (logoTapRef.current.count >= 5) {
      logoTapRef.current.count = 0;
      setShowGodPinModal(true);
    } else {
      logoTapRef.current.timer = setTimeout(() => {
        logoTapRef.current.count = 0;
      }, 2200);
    }
  };

  const gocciaStatus = useMemo(() => isGodMode ? { isOpen: true, isTooEarly: false } : checkGocciaWindow(), [clockTick, isGodMode]);
  const captainWindowStatus = useMemo(() => isGodMode ? { isOpen: true, reason: '' } : checkCaptainWindow(), [clockTick, isGodMode]);
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
    if (showGazzettaModal && activeLeague && latestGazzettaNews) {
      if (readNewsByLeague[activeLeague.id] !== latestGazzettaNews.id) {
        const updatedMap = { ...readNewsByLeague, [activeLeague.id]: latestGazzettaNews.id };
        setReadNewsByLeague(updatedMap);
        localStorage.setItem('sempre_noi_read_gazzetta_map', JSON.stringify(updatedMap));
      }
    }
  }, [showGazzettaModal, activeLeague?.id, latestGazzettaNews?.id]);

  useEffect(() => {
    if (!activeLeague) return;
    const { updatedLeague, changed, events } = settleExpiredCaptainsInLeague(activeLeague, clockTick);
    if (changed) {
      setLeagues(prev => prev.map(l => l.id === activeLeague.id ? updatedLeague : l));
      pushLeagueToCloud(updatedLeague);
      if (events.length > 0) {
        const ev = events[0];
        if (ev.type === 'success') {
          showToast(`👑 12 Ore Concluse! ${ev.playerName} ha completato le 4/4 birre da Capitano: +${ev.pts} pt accreditati!`, 'success');
        } else {
          showToast(`🚨 12 Ore Scadute! ${ev.playerName} si è fermato a ${ev.confirmedCount}/4 birre da Capitano: 0 punti per le birre e MALUS di -20 pt!`, 'danger');
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
    const lastSeenId = localStorage.getItem(storageKey);

    if (latestGazzettaNews.id !== lastSeenId) {
      localStorage.setItem(storageKey, latestGazzettaNews.id);
      setBreakingNewsAlert(latestGazzettaNews);
      const timer = setTimeout(() => setBreakingNewsAlert(null), 7000);
      return () => clearTimeout(timer);
    }
  }, [activeLeague?.id, latestGazzettaNews?.id]);

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
    if (activeTab !== 'stappa' && streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
      setIsCameraOpen(false);
    }
  }, [activeTab]);

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
      id: currentUser.id,
      name: currentUser.username,
      glassType: currentUser.glassType || 'weiss',
      points: 0,
      weekendPts: 0,
      beers: 0,
      liters: 0,
      yellowCards: 0,
      redCards: 0,
      captainActive: false,
      captainBeers: 0,
      captainBeersSubmitted: 0,
      captainVaultPoints: 0,
      captainVaultLiters: 0,
      captainExpiresAtMs: null,
      captainWeekUsed: null,
      rumenoUntil: null,
      lastDrinkAtMs: null,
      dailyDate: '',
      dailyCount: 0
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
              history: cloudLeague.history || [],
              gazzetta: filterActiveGazzettaNews(cloudLeague.gazzetta || [], Date.now()),
              feed: (cloudLeague.feed || []).map(item => ({
                ...item,
                approvals: item.approvals || [],
                varVotes: item.varVotes || []
              }))
            };
          }
        }
      } catch (e) {}
    }

    if (!targetLeague) {
      targetLeague = leagues.find(l => l.id.toUpperCase() === cleanCode);
    }

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
        ? [{
            id: 'usr_' + optionalHost.toLowerCase().replace(/\s+/g, '_'),
            name: optionalHost,
            glassType: 'lager',
            points: 0, weekendPts: 0, beers: 0, liters: 0, yellowCards: 0, redCards: 0,
            captainActive: false, captainBeers: 0, captainBeersSubmitted: 0, captainVaultPoints: 0, captainVaultLiters: 0,
            captainExpiresAtMs: null, captainWeekUsed: null, rumenoUntil: null, lastDrinkAtMs: null, dailyDate: '', dailyCount: 0
          }]
        : [];
      const synced = {
        id: cleanCode,
        name: title,
        adminId: currentUser.id,
        members: [...hostMember, newMemberObj],
        history: [],
        gazzetta: [],
        feed: []
      };
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
    if (!cleanUser || !cleanPass) return showToast('Inserisci username e password!', 'danger');

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
// --- STATI E FUNZIONI PER CAMBIO NOME E BOLLETTINO MEDICO GIOCATORE ---
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [editNicknameValue, setEditNicknameValue] = useState('');
  const [inspectedMemberId, setInspectedMemberId] = useState(null);

  const inspectedMember = useMemo(() => {
    if (!inspectedMemberId || !activeLeague) return null;
    return (activeLeague.members || []).find(m => m.id === inspectedMemberId) || null;
  }, [inspectedMemberId, activeLeague]);

  const handleOpenEditName = () => {
    setEditNicknameValue(currentUser?.username || '');
    setShowEditNameModal(true);
  };

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    const cleanNewName = editNicknameValue.trim();
    if (!cleanNewName) return showToast('Inserisci un soprannome valido!', 'danger');
    if (cleanNewName.length > 22) return showToast('Massimo 22 caratteri!', 'warning');

    const updatedUser = { ...currentUser, username: cleanNewName };
    setCurrentUser(updatedUser);
    setAccounts(prev => prev.map(a => a.id === currentUser.id ? updatedUser : a));
    localStorage.setItem('sempre_noi_remembered_creds', JSON.stringify({
      username: cleanNewName,
      password: currentUser.password || ''
    }));

    const updatedLeagues = leagues.map(l => {
      const isMember = (l.members || []).some(m => m.id === currentUser.id);
      if (!isMember) return l;
      const updatedL = {
        ...l,
        members: (l.members || []).map(m => m.id === currentUser.id ? { ...m, name: cleanNewName } : m),
        feed: (l.feed || []).map(item => item.playerId === currentUser.id ? { ...item, playerName: cleanNewName } : item),
        history: (l.history || []).map(h => h.playerId === currentUser.id ? { ...h, playerName: cleanNewName } : h)
      };
      pushLeagueToCloud(updatedL);
      return updatedL;
    });

    setLeagues(updatedLeagues);
    setShowEditNameModal(false);
    showToast(`✏️ Soprannome aggiornato in "${cleanNewName}"!`, 'success');
  };
  const handleGodEditMember = (memberId, action) => {
    if (!activeLeagueId) return;
    setLeagues(prev => prev.map(l => {
      if (l.id !== activeLeagueId) return l;
      const updated = {
        ...l,
        members: (l.members || []).map(m => {
          if (m.id !== memberId) return m;
          const nextPts = action.pointsDelta ? Number((m.points + action.pointsDelta).toFixed(1)) : m.points;
          const nextCaps = action.goldCapsDelta ? Math.max(0, (m.goldCaps || 0) + action.goldCapsDelta) : (m.goldCaps || 0);
          const nextBeers = action.beersDelta ? Math.max(0, (m.beers || 0) + action.beersDelta) : (m.beers || 0);
          const baseLiters = m.liters ?? ((m.beers || 0) * 0.5);
          const nextLiters = action.litersDelta ? Math.max(0, Number((baseLiters + action.litersDelta).toFixed(2))) : baseLiters;
          const hasCanNow = Boolean(m.rumenoUntil && Number(m.rumenoUntil) > Date.now());
          const nextRumeno = action.toggleCan ? (hasCanNow ? null : Date.now() + 24 * 3600000) : m.rumenoUntil;
          const hasStreakOverride = typeof action.setStreak === 'number';

          return {
            ...m,
            points: nextPts,
            goldCaps: nextCaps,
            beers: nextBeers,
            liters: nextLiters,
            rumenoUntil: nextRumeno,
            dailyCount: hasStreakOverride ? action.setStreak : (m.dailyCount || 0),
            lastDrinkAtMs: hasStreakOverride ? (action.setStreak > 0 ? Date.now() : null) : m.lastDrinkAtMs,
            yellowCards: action.resetCards ? 0 : (m.yellowCards || 0),
            simulations: action.resetCards ? 0 : (m.simulations || 0),
            redCards: action.resetCards ? 0 : (m.redCards || 0)
          };
        })
      };
      pushLeagueToCloud(updated);
      return updated;
    }));
  };

  const handleToggleChioscoItem = (itemObj) => {
    if (!activeLeagueId || !currentUser) return;
    setLeagues(prev => prev.map(l => {
      if (l.id !== activeLeagueId) return l;
      const updated = {
        ...l,
        members: (l.members || []).map(m => {
          if (m.id !== currentUser.id) return m;
          const currentOwned = m.ownedItems || [];
          const exists = currentOwned.some(x => (typeof x === 'string' ? x === itemObj.id : x?.id === itemObj.id));
          const nextOwned = exists
            ? currentOwned.filter(x => (typeof x === 'string' ? x !== itemObj.id : x?.id !== itemObj.id))
            : [...currentOwned, { id: itemObj.id, name: itemObj.name, rarity: itemObj.rarity }];
          showToast(exists ? `🗑️ "${itemObj.name}" rimosso dai tuoi averi` : `⚡ "${itemObj.name}" aggiunto gratis ai tuoi averi!`, 'success');
          return { ...m, ownedItems: nextOwned };
        })
      };
      pushLeagueToCloud(updated);
      return updated;
    }));
  };

  const handleGodForceVar = (beerItem, mode) => {
    if (!beerItem || !activeLeagueId) return;
    setLeagues(prev => prev.map(l => {
      if (l.id !== activeLeagueId) return l;
      const updatedFeed = (l.feed || []).filter(item => item.id !== beerItem.id);
      const drinkL = Number(beerItem.liters || 0.5);
      const updatedMembers = mode === 'approve'
        ? (l.members || []).map(m => m.id === beerItem.playerId ? {
            ...m,
            points: Number((m.points + beerItem.points).toFixed(1)),
            beers: (m.beers || 0) + 1,
            liters: Number(((m.liters ?? ((m.beers || 0) * 0.5)) + drinkL).toFixed(2))
          } : m)
        : l.members;
      const updated = { ...l, feed: updatedFeed, members: updatedMembers };
      pushLeagueToCloud(updated);
      return updated;
    }));
    showToast(mode === 'approve' ? '⚡ Birra convalidata istantaneamente (God Mode)!' : '🗑️ Foto eliminata dalla Sala VAR (God Mode)!', 'success');
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
      id: code,
      name: newLeagueName.trim(),
      adminId: currentUser.id,
      members: [{
        id: currentUser.id, name: currentUser.username, glassType: currentUser.glassType || 'weiss',
        points: 0, weekendPts: 0, beers: 0, liters: 0, yellowCards: 0, redCards: 0,
        captainActive: false, captainBeers: 0, captainBeersSubmitted: 0, captainVaultPoints: 0, captainVaultLiters: 0,
        captainExpiresAtMs: null, captainWeekUsed: null, rumenoUntil: null, lastDrinkAtMs: null, dailyDate: '', dailyCount: 0
      }],
      history: [],
      gazzetta: [],
      feed: []
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
        members: l.members.map(m => m.id === currentUser.id ? {
          ...m,
          captainActive: true, captainBeers: 0, captainBeersSubmitted: 0, captainVaultPoints: 0, captainVaultLiters: 0,
          captainStartedAtMs: nowMs, captainExpiresAtMs: expiresAtMs, captainWeekUsed: currentWeekKey, captainUsedThisWeek: true
        } : m)
      };
      pushLeagueToCloud(updated);
      return updated;
    }));
    showToast('👑 Timer 12h avviato! Le prime 4 birre valgono PUNTI DOPPI (x2) sbloccati solo a 12h se 4/4 confermate!', 'success');
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
    canvas.width = Math.round(rawW * scale);
    canvas.height = Math.round(rawH * scale);
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setCapturedPhoto(canvas.toDataURL('image/jpeg', 0.65));
    stopCameraStream();
    showToast('📸 Foto acquisita!', 'success');
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
          showToast('📸 Foto acquisita!', 'success');
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const [beerTypeTier, setBeerTypeTier] = useState('classica');

  const calculatedDrink = useMemo(() => {
    const fMap = {
      piccola33: { pts: 3, liters: 0.33, label: '33cl (+3pt)' },
      spina50: { pts: 5, liters: 0.5, label: 'Media 50cl (+5pt)' },
      boccione66: { pts: 6.5, liters: 0.66, label: 'Boccione 66cl (+6.5pt)' },
      litro: { pts: 10, liters: 1.0, label: '1 litro (+10pt)' }
    };
    const aMap = {
      leggera: { mult: 1.0, label: 'Leggera fino a 5,6° (x1.0)' },
      media: { mult: 1.2, label: 'Media 5,6° - 7,5° (x1.2)' },
      forte: { mult: 1.4, label: 'Forte > 7,5° (x1.4)' }
    };
    const qMap = {
      industriale: { bonus: 0, label: 'Industriale (+0pt)' },
      artigianale: { bonus: 2, label: 'Artigianale (+2pt)' },
      spina: { bonus: 3, label: 'Alla spina (+3pt)' },
      rumeno: { bonus: -5, label: 'Passaporto Rumeno (-5pt)' }
    };
    const tMap = {
      classica: { bonus: 0, label: 'Lager/Pils/Weiss (+0pt)' },
      session: { bonus: 1.0, label: 'Session IPA/APA/Rossa (+1pt)' },
      ipa: { bonus: 1.5, label: 'IPA/Double IPA/Stout (+1.5pt)' },
      trappista: { bonus: 2.0, label: 'Trappista/Tripel/Quadrupel (+2pt)' }
    };

    const safeFormat = fMap[format] ? format : 'spina50';
    const safeType = tMap[beerTypeTier] ? beerTypeTier : 'classica';

    const base = fMap[safeFormat].pts;
    const liters = fMap[safeFormat].liters;
    const mult = aMap[abvTier].mult;
    const qualityBonus = qMap[qualityTier].bonus;
    const typeBonus = tMap[safeType].bonus;
    const gocciaBonus = gocciaStatus.isOpen && bonusGocciaDOro ? 3 : 0;
    const isWithin12h = Boolean(myMemberProfile?.captainActive && (!myMemberProfile?.captainExpiresAtMs || clockTick < Number(myMemberProfile.captainExpiresAtMs)));
    const eligibleForCaptainDouble = isWithin12h && (myMemberProfile?.captainBeersSubmitted || 0) < 4;

    let subtotal = (base * mult) + qualityBonus + typeBonus;
    if (bonusSempreNoi) subtotal *= 1.3;
    subtotal += gocciaBonus;
    if (eligibleForCaptainDouble) subtotal *= 2;

    return {
      total: Number(subtotal.toFixed(1)),
      base, liters, mult, qualityBonus, typeBonus, gocciaBonus, eligibleForCaptainDouble,
      nextCaptainSlot: eligibleForCaptainDouble ? (myMemberProfile?.captainBeersSubmitted || 0) + 1 : null,
      formatLabel: fMap[safeFormat].label,
      abvLabel: aMap[abvTier].label,
      styleLabel: `${qMap[qualityTier].label} • ${tMap[safeType].label}`
    };
  }, [format, abvTier, qualityTier, beerTypeTier, bonusSempreNoi, bonusGocciaDOro, gocciaStatus.isOpen, myMemberProfile, clockTick]);

  const handleAddBeer = (e) => {
    e.preventDefault();
    if (!capturedPhoto) return showToast('⚠️ Scatta la foto prima di confermare!', 'danger');

    const nowMs = Date.now();
    const todayKey = getTodayDateKey();
    const isRumeno = qualityTier === 'rumeno';
    const isCapSlot = calculatedDrink.eligibleForCaptainDouble;

    const prevCount = getActiveSessionStreak(myMemberProfile, nowMs);
const newCount = prevCount + 1;
    if (newCount >= 1 && newCount <= 3) setPersonalDisclaimer(PERSONAL_DISCLAIMERS[newCount]);

    const newsItems = [];
    if (myMemberProfile?.lastDrinkAtMs && (nowMs - Number(myMemberProfile.lastDrinkAtMs)) >= 5 * 24 * 60 * 60 * 1000) {
      const daysOff = Math.floor((nowMs - Number(myMemberProfile.lastDrinkAtMs)) / (24 * 60 * 60 * 1000));
      newsItems.push({ id: 'news_pentito_' + nowMs, category: 'IL PENTITO', icon: '🚨', badgeColor: 'bg-purple-500 text-white', text: `Il rincoglionito (${currentUser.username}) è tornato a bere dopo ${daysOff} giorni di astinenza!`, timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }), dateLabel: new Date().toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' }), createdAtMs: nowMs });
    }
    if (isRumeno) {
      newsItems.push({ id: 'news_deg_' + nowMs, category: 'ALLARME DEGRADO', icon: '🥫', badgeColor: 'bg-red-600 text-white', text: `${currentUser.username} ha stappato un Passaporto Rumeno (${beerTitle.trim() || 'Ceres/Tennent\'s/Faxe'}). Chiudete le finestre!`, timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }), dateLabel: new Date().toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' }), createdAtMs: nowMs });
    }
    if (gocciaStatus.isOpen && bonusGocciaDOro) {
      newsItems.push({ id: 'news_colazione_' + nowMs, category: 'COLAZIONE DEI CAMPIONI', icon: '☀️', badgeColor: 'bg-amber-400 text-slate-950', text: `Non è neanche mezzogiorno e mezza e ${currentUser.username} ha già stappato. Inchinatevi!`, timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }), dateLabel: new Date().toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' }), createdAtMs: nowMs });
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
        members: l.members.map(m => m.id === currentUser.id ? {
          ...m,
          rumenoUntil: isRumeno ? nowMs + 24 * 3600000 : m.rumenoUntil,
          captainBeersSubmitted: isCapSlot ? (m.captainBeersSubmitted || 0) + 1 : m.captainBeersSubmitted,
          lastDrinkAtMs: nowMs, dailyDate: todayKey, dailyCount: newCount
        } : m)
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
      const prevSorted = [...(l.members || [])].sort((a, b) => b.points - a.points);
      const prevLeader = prevSorted[0];

      const updatedFeed = reached2 ? (l.feed || []).filter(item => item.id !== beerId) : (l.feed || []).map(item => item.id === beerId ? { ...item, approvals: newApprovals } : item);
      const drinkL = Number(target.liters || 0.5);

      const updatedMembers = reached2 ? l.members.map(m => {
        if (m.id !== target.playerId) return m;
        if (isCap && m.captainActive) {
          return {
            ...m,
            captainBeers: (m.captainBeers || 0) + 1,
            captainVaultPoints: Number(((m.captainVaultPoints || 0) + target.points).toFixed(1)),
            captainVaultLiters: Number(((m.captainVaultLiters || 0) + drinkL).toFixed(2)),
            rumenoUntil: target.isRumeno ? (nowMs + 24 * 3600000) : m.rumenoUntil
          };
        }
        return {
          ...m,
          points: Number((m.points + target.points).toFixed(1)),
          weekendPts: Number((m.weekendPts + target.points).toFixed(1)),
          beers: m.beers + 1,
          liters: Number(((m.liters || m.beers * 0.5) + drinkL).toFixed(2)),
          rumenoUntil: target.isRumeno ? (nowMs + 24 * 3600000) : m.rumenoUntil
        };
      }) : l.members;

      let updatedGazzetta = filterActiveGazzettaNews(l.gazzetta || [], nowMs);
      if (reached2 && !isCap && updatedMembers.length > 1) {
        const newSorted = [...updatedMembers].sort((a, b) => b.points - a.points);
        const newLeader = newSorted[0];
        if (prevLeader && newLeader && prevLeader.id !== newLeader.id && newLeader.id === target.playerId) {
          const overtakeNews = {
            id: 'news_sorpasso_' + nowMs, category: 'SORPASSO IN CURVA', icon: '🏎️', badgeColor: 'bg-emerald-500 text-slate-950',
            text: `${newLeader.name} si prende la Pole Position (${newLeader.points} pt)! ${prevLeader.name} scivola dietro!`,
            timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
            dateLabel: new Date().toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' }),
            createdAtMs: nowMs
          };
          updatedGazzetta = filterActiveGazzettaNews([overtakeNews, ...updatedGazzetta], nowMs);
        }
      }

      const updatedHistory = reached2 ? [{
        id: target.id, playerId: target.playerId, playerName: target.playerName,
        points: target.points, liters: drinkL, timestampMs: target.createdAtMs || nowMs
      }, ...(l.history || [])] : (l.history || []);

      const draft = { ...l, feed: updatedFeed, members: updatedMembers, history: updatedHistory, gazzetta: updatedGazzetta };
      const { updatedLeague: finalL } = settleExpiredCaptainsInLeague(draft, nowMs);
      pushLeagueToCloud(finalL);
      return finalL;
    }));

    if (reached2) {
      if (isCap) showToast(`👑 Birra Capitano confermata (2/2)! Punti messi in cassaforte per fine 12h!`, 'success');
      else showToast(`🍻 Birra confermata (2/2)! Foto rimossa dal VAR!`, 'success');
    } else {
      showToast('✅ 1ª Conferma registrata (1/2)!', 'success');
    }
  };
// --- SALA VAR: IL PROPRIETARIO RITIRA/CANCELLA LA PROPRIA FOTO CARICATA PER ERRORE ---
  const handleDeleteOwnBeer = (beerItem) => {
    if (!beerItem || !activeLeagueId) return;
    if (beerItem.playerId !== currentUser.id) {
      showToast('⚠️ Puoi cancellare solo le foto caricate da te!', 'warning');
      return;
    }
    if ((beerItem.varVotes || []).length > 0) {
      showToast('🚨 Troppo tardi! Hai già una segnalazione VAR su questa foto, non puoi più ritirarla!', 'danger');
      return;
    }

    setLeagues(prev => prev.map(l => {
      if (l.id !== activeLeagueId) return l;
      const updatedFeed = (l.feed || []).filter(item => item.id !== beerItem.id);
      const updatedMembers = l.members.map(m => {
        if (m.id === currentUser.id && beerItem.isCaptainBeer) {
          return {
            ...m,
            captainBeersSubmitted: Math.max(0, (m.captainBeersSubmitted || 1) - 1)
          };
        }
        return m;
      });
      const updated = { ...l, feed: updatedFeed, members: updatedMembers };
      pushLeagueToCloud(updated);
      return updated;
    }));

    showToast('🗑️ Hai ritirato e cancellato la tua birra dalla Sala VAR!', 'warning');
  };
  const handleOpenVarModal = (beerItem) => {
    if (beerItem.playerId === currentUser.id) return showToast('⚠️ Non puoi segnalare al VAR la tua stessa birra!', 'warning');
    const existingFirstVote = (beerItem.varVotes || [])[0];
    setSelectedPenaltyId(existingFirstVote?.reasonId || 'simulation');
    setVarModalBeer(beerItem);
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
      const updatedMembers = reached2 ? l.members.map(m => m.id === varModalBeer.playerId ? {
        ...m,
        points: Number((m.points - malus).toFixed(1)),
        weekendPts: Number((m.weekendPts - malus).toFixed(1)),
        yellowCards: opt.id === 'yellow' ? (m.yellowCards || 0) + 1 : (m.yellowCards || 0),
        simulations: opt.id === 'simulation' ? (m.simulations || 0) + 1 : (m.simulations || 0),
        redCards: opt.id === 'red' ? m.redCards + 1 : m.redCards
      } : m) : l.members;
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
    const history = activeLeague?.history || [];
    if (members.length === 0) return null;
    const now = new Date();
    const cMonth = now.getMonth();
    const cYear = now.getFullYear();

    const monthlyStats = {};
    history.forEach(h => {
      const d = new Date(h.timestampMs || Date.now());
      if (d.getMonth() === cMonth && d.getFullYear() === cYear) {
        if (!monthlyStats[h.playerId]) monthlyStats[h.playerId] = { pts: 0, beers: 0 };
        monthlyStats[h.playerId].pts += Number(h.points || 0);
        monthlyStats[h.playerId].beers += 1;
      }
    });

    const mvp = [...members].sort((a, b) => (monthlyStats[b.id]?.pts ?? b.points) - (monthlyStats[a.id]?.pts ?? a.points))[0];
    const idrovora = [...members].sort((a, b) => (b.liters || b.beers * 0.5) - (a.liters || a.beers * 0.5))[0];
    const goyim = [...members].sort((a, b) => a.beers - b.beers || a.points - b.points)[0];

    return [
      { id: 'mvp', title: 'MVP Mensile', subtitle: 'Il GOAT della lega', drawingType: 'goat', member: mvp, statBadge: `${monthlyStats[mvp.id]?.pts ? monthlyStats[mvp.id].pts.toFixed(1) : mvp.points} pt`, accent: 'border-amber-400/50 bg-gradient-to-r from-amber-500/15 to-slate-900' },
      { id: 'lemans', title: '24 Ore di Le Mans', subtitle: 'Record birre in 24h', drawingType: 'lemans', member: mvp, statBadge: `${Math.max(1, Math.ceil(mvp.beers / 2))} birre in 24h`, accent: 'border-sky-400/50 bg-gradient-to-r from-sky-500/15 to-slate-900' },
      { id: 'idrovora', title: "L'Idrovora", subtitle: 'Massimo litri scolati', drawingType: 'idrovora', member: idrovora, statBadge: `${(idrovora.liters || idrovora.beers * 0.5).toFixed(1)} L`, accent: 'border-emerald-400/50 bg-gradient-to-r from-emerald-500/15 to-slate-900' },
      { id: 'regoyim', title: 'Re Goyim', subtitle: 'Cucchiaio di legno', drawingType: 'regoyim', member: goyim, statBadge: `${goyim.beers} birre`, accent: 'border-pink-400/50 bg-gradient-to-r from-pink-500/15 to-slate-900' }
    ];
  }, [activeLeague, clockTick]);

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
  // VISTA 2: LISTA LEGHE ESTERNA (CON CESTINO ELIMINAZIONE)
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
             <span className="text-[11px] text-amber-400 font-bold uppercase block">Bevitore Ufficiale</span>
             <div className="flex items-center gap-2">
               <span className="text-base font-black text-white truncate max-w-[165px]">{currentUser.username}</span>
               <button
                 type="button"
                 onClick={handleOpenEditName}
                 className="p-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 transition"
                 title="Cambia Nome"
               >
                 <Pencil className="w-3.5 h-3.5" />
               </button>
             </div>
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
{/* MODALE CAMBIA NOME (HOME) */}
     {showEditNameModal && (
       <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
         <form onSubmit={handleUpdateUsername} className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
           <h3 className="text-sm font-black uppercase text-amber-400 flex items-center gap-1.5">
             <Pencil className="w-4 h-4" /> Cambia Soprannome
           </h3>
           <div>
             <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Nuovo Nome Bevitore</label>
             <input
               type="text"
               required
               maxLength={22}
               value={editNicknameValue}
               onChange={(e) => setEditNicknameValue(e.target.value)}
               placeholder="Es. Il Sindaco del 74"
               className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
             />
             <span className="text-[10px] text-slate-400 block mt-1">
               Punti, birre e litri rimarranno intatti!
             </span>
           </div>
           <div className="grid grid-cols-2 gap-2 pt-2">
             <button type="button" onClick={() => setShowEditNameModal(false)} className="py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">
               Annulla
             </button>
             <button type="submit" className="py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black uppercase">
               Salva Nome
             </button>
           </div>
         </form>
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
            <form onSubmit={(e) => { e.preventDefault(); joinOrCreateSharedLeague(joinLeagueCode, joinLeagueCustomName); }} className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
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
  // VISTA 3: DENTRO LA LEGA ATTIVA
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center pb-24 font-sans select-none">
      {/* TOAST STANDARD */}
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

      {/* POPUP NOTIFICA LIVE SKY SPORT 24 */}
      {breakingNewsAlert && !personalDisclaimer && (
        <div className="fixed top-16 z-[95] max-w-md w-11/12 bg-slate-950 border-2 border-amber-400 rounded-2xl shadow-2xl overflow-hidden animate-bounce">
          <div className="bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 px-3 py-1 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-950">
                ULTIM'ORA • GAZZETTA DEL SEMPRE NOI
              </span>
            </div>
            <button
              type="button"
              onClick={() => setBreakingNewsAlert(null)}
              className="text-[10px] font-black text-slate-950 uppercase px-1"
            >
              ✕
            </button>
          </div>
          <div
            onClick={handleOpenGazzetta}
            className="p-3 flex items-center gap-3 cursor-pointer"
          >
            <span className="text-2xl shrink-0">{breakingNewsAlert.icon}</span>
            <div className="min-w-0">
              <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${breakingNewsAlert.badgeColor}`}>
                {breakingNewsAlert.category}
              </span>
              <p className="text-xs font-bold text-white mt-1 leading-snug">
                {breakingNewsAlert.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* POPUP DISCLAIMER PERSONALE (1ª, 2ª E 3ª BIRRA) */}
      {personalDisclaimer && (
        <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`bg-gradient-to-b ${personalDisclaimer.theme} border-2 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl`}>
            <span className="text-[10px] font-black uppercase tracking-widest bg-slate-950/80 border border-white/15 px-3 py-1 rounded-full inline-block">
              {personalDisclaimer.badge}
            </span>
            <div className="text-6xl py-2 drop-shadow-lg">
              {personalDisclaimer.emoji}
            </div>
            <h2 className="text-xl font-black uppercase text-white tracking-wide">
              {personalDisclaimer.title}
            </h2>
            <p className="text-xs text-slate-200 leading-relaxed font-semibold">
              {personalDisclaimer.message}
            </p>
            <button
              type="button"
              onClick={() => setPersonalDisclaimer(null)}
              className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition"
            >
              {personalDisclaimer.buttonText}
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-md min-h-screen bg-slate-900/70 border-x border-slate-800 flex flex-col justify-between shadow-2xl">
        
        {/* HEADER LEGA: REGOLE AL POSTO DEL CESTINO IN ALTO A DESTRA */}
        <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-amber-500/25 px-3.5 py-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveLeagueId(null)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400"
                title="Torna alle Leghe"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div onClick={handleSecretLogoTap} className="cursor-pointer relative">
             <SempreNoiLogo size="sm" />
             {isGodMode && (
               <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 text-[8px] font-black px-1 rounded-full border border-slate-950 shadow">
                 ⚡GOD
               </span>
             )}
           </div>
              <div className="min-w-0">
                <h1 className="text-sm font-black text-white leading-tight truncate">{activeLeague.name}</h1>
                <span className="text-[10px] text-amber-400 font-bold block">
                  {(activeLeague.members || []).length} Piloti • F1 Mode
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Pulsante Gazzetta del Sempre Noi */}
              <button
                type="button"
                onClick={handleOpenGazzetta}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-400 relative transition"
                title="Apri la Gazzetta del Sempre Noi"
              >
                <Newspaper className="w-4 h-4" />
                {hasUnreadGazzetta && (
                  <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1 animate-pulse" />
                )}
              </button>

              {/* Selettore Bicchiere Avatar */}
              <button
                onClick={() => setShowGlassPicker(!showGlassPicker)}
                className={`px-2 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border text-xs font-bold flex items-center gap-1.5 transition ${
                  myCrushedCanActive ? 'border-red-500/60 text-red-300' : 'border-slate-700 text-amber-300'
                }`}
                title="Cambia la tua birra e bicchiere avatar"
              >
                <BeerGlassAvatar type={currentUser.glassType || 'weiss'} size="sm" crushed={myCrushedCanActive} />
                <span className="text-[10px] uppercase font-black tracking-tight">
                  {myCrushedCanActive ? '🥫 24h' : currentGlassObj.shortName}
                </span>
              </button>

              {/* PULSANTE REGOLE IN ALTO A DESTRA */}
              <button
                type="button"
                onClick={() => setShowRulesModal(true)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 hover:text-amber-400 transition"
                title="Regolamento Ufficiale"
              >
                <BookOpen className="w-4 h-4" />
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

         {/* BARRA PROFILO PERSONALE (SOSTITUISCE IL BANNER GAZZETTA FISSO) */}
          {myMemberProfile && (
            <div
              onClick={() => setInspectedMemberId(myMemberProfile.id)}
              className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 hover:bg-slate-800/90 border border-amber-500/40 rounded-xl p-2.5 cursor-pointer transition shadow-md space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[9px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.5 rounded">
                    TU
                  </span>
                  <span className="text-xs font-black text-white truncate">
                    {myMemberProfile.name}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditName();
                    }}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-amber-400 border border-slate-700 hover:border-amber-400/50 transition shrink-0"
                    title="Cambia il tuo soprannome"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                </div>

                {/* Tappi d'Oro in alto a destra nella barra profilo */}
                <div className="flex items-center gap-1 bg-slate-950 border border-amber-400/50 px-2 py-0.5 rounded-full shrink-0">
                  <span className="text-xs leading-none">🪙</span>
                  <span className="text-[10px] font-black text-amber-300">
                    {myMemberProfile.goldCaps || 0} Tappi d'Oro
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[10px]">
                <div className="flex items-center gap-3 font-bold text-slate-300">
                  <span>🍺 <strong className="text-white">{myMemberProfile.beers || 0}</strong> birre</span>
                  <span>⛽ <strong className="text-emerald-400">{(myMemberProfile.liters ?? ((myMemberProfile.beers || 0) * 0.5)).toFixed(1)}L</strong></span>
                  <span>🎒 <strong className="text-amber-300">{(myMemberProfile.ownedItems || []).length}</strong> averi</span>
                </div>
                <span className="text-[9px] font-black uppercase text-amber-400 flex items-center gap-0.5">
                  Bollettino ▸
                </span>
              </div>
            </div>
          )} 

         {/* SELETTORE A 8 BICCHIERI */}
          {showGlassPicker && (
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-[10px] uppercase font-black text-amber-400 block">
                {myCrushedCanActive
                  ? '⚠️ Penitenza Passaporto Rumeno attiva (Lattina Ammaccata per 24h):'
                  : 'Scegli la tua Birra e Bicchiere Ufficiale:'}
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {BEER_GLASS_TYPES.map(g => (
                  <button
                    key={g.id}
                    onClick={() => {
                      const updated = { ...currentUser, glassType: g.id };
                      setCurrentUser(updated);
                      setAccounts(prev => prev.map(a => a.id === currentUser.id ? updated : a));

                      setLeagues(prev => prev.map(l => {
                        const isMatch = (m) => m.id === currentUser.id || m.name?.toLowerCase() === currentUser.username?.toLowerCase();
                        const hasUser = (l.members || []).some(isMatch);
                        if (!hasUser) return l;

                        const updatedL = {
                          ...l,
                          members: (l.members || []).map(m => isMatch(m) ? { ...m, glassType: g.id } : m),
                          feed: (l.feed || []).map(item => (item.playerId === currentUser.id || item.playerName?.toLowerCase() === currentUser.username?.toLowerCase()) ? { ...item, glassType: g.id } : item)
                        };
                        pushLeagueToCloud(updatedL);
                        return updatedL;
                      }));

                      setShowGlassPicker(false);
                      showToast(`🍺 Immagine profilo aggiornata: ${g.shortName}!`, 'success');
                    }}
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
          
          {/* TAB 1: CLASSIFICA FORMULA 1 (CON EFFETTI LIVE ON FIRE E COMETA INARRESTABILE) */}
          {activeTab === 'classifica' && (
            <div className="space-y-4">
              {/* CSS Animazioni Fiamme e Scia di Cometa */}
              <style>{`
                @keyframes snFlameDance {
                  0%, 100% { transform: scaleY(1) translateY(0px); opacity: 0.9; }
                  50% { transform: scaleY(1.14) translateY(-2px); opacity: 1; }
                }
                @keyframes snSparkRise {
                  0% { transform: translateY(4px) scale(0.7); opacity: 0; }
                  50% { opacity: 1; }
                  100% { transform: translateY(-7px) scale(1.2); opacity: 0; }
                }
                @keyframes snOrbitSpin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                @keyframes snTwinkle {
                  0%, 100% { transform: scale(0.75); opacity: 0.5; }
                  50% { transform: scale(1.25); opacity: 1; }
                }
                @keyframes snCometSweep {
                  0% { transform: translateX(-110%) skewX(-18deg); }
                  100% { transform: translateX(220%) skewX(-18deg); }
                }
        .sn-flame-a { animation: snFlameDance 0.55s infinite ease-in-out; transform-origin: center; }
                .sn-flame-b { animation: snFlameDance 0.75s infinite ease-in-out 0.18s; transform-origin: center; }
                .sn-flame-c { animation: snFlameDance 0.42s infinite ease-in-out 0.32s; transform-origin: center; }
                .sn-spark-1 { animation: snSparkRise 1.1s infinite ease-out; }
                .sn-spark-2 { animation: snSparkRise 1.4s infinite ease-out 0.35s; }
                .sn-comet-orbit { animation: snOrbitSpin 3.4s infinite linear; transform-origin: 32px 32px; }
                .sn-star-twinkle { animation: snTwinkle 1.1s infinite ease-in-out; transform-box: fill-box; transform-origin: center; }
                .sn-comet-row-beam { animation: snCometSweep 2.6s infinite linear; }
              `}</style>

              <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl p-3.5 border border-amber-500/30 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase text-amber-400 flex items-center gap-1">
                    <Flag className="w-3.5 h-3.5" /> Podio Gran Premio ({sortedMembers.length} Piloti)
                  </span>
                  <span className="text-[9px] text-slate-400 font-bold">
                    Tocca un bevitore per la scheda ▸
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 items-end text-center pt-2">
                  {sortedMembers[1] && (
                    <div
                      onClick={() => setInspectedMemberId(sortedMembers[1].id)}
                      className="bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl p-2 flex flex-col items-center cursor-pointer transition active:scale-95"
                    >
                      <span className="text-[9px] font-black bg-slate-300 text-slate-950 px-1.5 rounded mb-1.5">P2</span>
                      <BeerGlassAvatar
                        type={sortedMembers[1].glassType}
                        size="sm"
                        crushed={isCrushedCanActive(sortedMembers[1])}
                        streakLevel={getMemberStreakLevel(sortedMembers[1], clockTick)}
                      />
                      <span className="text-xs font-bold text-white truncate max-w-full mt-1.5">{sortedMembers[1].name}</span>
                      <span className="text-xs font-black text-amber-400">{sortedMembers[1].points} pt</span>
                    </div>
                  )}
                  {sortedMembers[0] && (
                    <div
                      onClick={() => setInspectedMemberId(sortedMembers[0].id)}
                      className="bg-amber-500/15 hover:bg-amber-500/25 border-2 border-amber-400 rounded-xl p-2.5 flex flex-col items-center -translate-y-1 shadow-lg cursor-pointer transition active:scale-95"
                    >
                      <span className="text-[9px] font-black bg-amber-400 text-slate-950 px-2 rounded mb-1.5">LEADER</span>
                      <BeerGlassAvatar
                        type={sortedMembers[0].glassType}
                        size="md"
                        crushed={isCrushedCanActive(sortedMembers[0])}
                        streakLevel={getMemberStreakLevel(sortedMembers[0], clockTick)}
                      />
                      <span className="text-xs font-black text-white truncate max-w-full mt-1.5">{sortedMembers[0].name}</span>
                      <span className="text-sm font-black text-amber-300">{sortedMembers[0].points} pt</span>
                    </div>
                  )}
                  {sortedMembers[2] && (
                    <div
                      onClick={() => setInspectedMemberId(sortedMembers[2].id)}
                      className="bg-slate-900/90 hover:bg-slate-800 border border-amber-700/50 rounded-xl p-2 flex flex-col items-center cursor-pointer transition active:scale-95"
                    >
                      <span className="text-[9px] font-black bg-amber-700 text-white px-1.5 rounded mb-1.5">P3</span>
                      <BeerGlassAvatar
                        type={sortedMembers[2].glassType}
                        size="sm"
                        crushed={isCrushedCanActive(sortedMembers[2])}
                        streakLevel={getMemberStreakLevel(sortedMembers[2], clockTick)}
                      />
                      <span className="text-xs font-bold text-white truncate max-w-full mt-1.5">{sortedMembers[2].name}</span>
                      <span className="text-xs font-black text-amber-500">{sortedMembers[2].points} pt</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="px-3.5 py-2.5 bg-slate-800/70 border-b border-slate-800 flex justify-between text-[10px] font-black text-slate-400 uppercase">
                  <span>Pos / Bevitore (Tocca per aprire)</span>
                  <span>Distacco F1 / Totale</span>
                </div>
                <div className="divide-y divide-slate-800">
                  {sortedMembers.map((member, idx) => {
                    const isLeader = idx === 0;
                    const gap = isLeader ? 'POLE' : `-${(leaderPoints - member.points).toFixed(1)} pt`;
                    const isMe = member.id === currentUser.id;
                    const hasCanPenalty = isCrushedCanActive(member);
                    const streakCount = getActiveSessionStreak(member, clockTick);
                    const streakLevel = getMemberStreakLevel(member, clockTick);

                    const rowBgClass = streakLevel === 'comet'
                      ? 'bg-gradient-to-r from-indigo-950/90 via-purple-900/55 to-cyan-950/80 border-l-4 border-l-cyan-300'
                      : streakLevel === 'fire'
                      ? 'bg-gradient-to-r from-orange-950/65 via-red-950/40 to-slate-900 border-l-4 border-l-orange-500'
                      : isMe
                      ? 'bg-amber-500/10'
                      : '';

                    const nameColorClass = streakLevel === 'comet'
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-amber-300 font-black drop-shadow'
                      : streakLevel === 'fire'
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 font-black'
                      : isMe
                      ? 'text-amber-300 font-bold'
                      : 'text-white font-bold';

                    return (
                      <div
                        key={member.id}
                        onClick={() => setInspectedMemberId(member.id)}
                        className={`px-3 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-800/60 transition relative overflow-hidden ${rowBgClass}`}
                      >
                        {/* Scia luminosa di Cometa che attraversa la riga (5+ birre) */}
                        {streakLevel === 'comet' && (
                          <div className="pointer-events-none absolute inset-0 overflow-hidden">
                            <div className="sn-comet-row-beam w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent" />
                          </div>
                        )}

                        <div className="flex items-center gap-3 relative z-10">
                          <span className={`w-5 text-center text-xs font-black ${isLeader ? 'text-amber-400' : 'text-slate-500'}`}>
                            {idx + 1}
                          </span>
                          <BeerGlassAvatar
                            type={member.glassType}
                            size="sm"
                            crushed={hasCanPenalty}
                            streakLevel={streakLevel}
                          />
                          <div className="text-left">
                            <div className="flex items-center justify-start gap-1.5 flex-wrap">
                              <span className={`text-xs ${nameColorClass}`}>
                                {member.name}
                              </span>

                              {/* Targhetta ON FIRE (3ª e 4ª Birra) */}
                              {streakLevel === 'fire' && (
                                <span className="px-1.5 py-0.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full text-[8px] font-black uppercase tracking-wider shadow animate-pulse">
                                  🔥 ON FIRE ({streakCount})
                                </span>
                              )}

                              {/* Targhetta INARRESTABILE (5+ Birre) */}
                              {streakLevel === 'comet' && (
                                <span className="px-2 py-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 text-slate-950 rounded-full text-[8px] font-black uppercase tracking-wider shadow-md animate-pulse">
                                  ☄️ INARRESTABILE ({streakCount})
                                </span>
                              )}

                              {hasCanPenalty && (
                                <span className="px-1.5 py-0.2 bg-red-500/20 border border-red-500/50 text-red-300 rounded text-[9px] font-black">
                                  🥫 24h
                                </span>
                              )}
                              {member.captainActive && (
                                <span className="px-1.5 py-0.2 bg-purple-500/20 border border-purple-400 text-purple-300 rounded text-[9px] font-black">
                                  👑 CAP {member.captainBeers || 0}/4 ({formatCaptainTimeLeft(member.captainExpiresAtMs, clockTick)})
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
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              {member.beers} birre • {(member.liters ?? (member.beers * 0.5)).toFixed(1)}L
                              {member.captainActive && (member.captainVaultPoints || 0) > 0 ? ` • Cassaforte CAP: +${member.captainVaultPoints} pt` : ''}
                            </span>
                          </div>
                        </div>
                        <div className="text-right relative z-10">
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
          {/* TAB 2: STAPPA! (CON CAPITANO 12H, MAX 4 BIRRE x2 E MALUS -20 PT) */}
          {activeTab === 'stappa' && (
            <form onSubmit={handleAddBeer} className="space-y-4">
              {/* RIEPILOGO PUNTI LIVE */}
              <div className="bg-gradient-to-r from-amber-500/20 to-slate-900 border border-amber-500/40 rounded-2xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 block">
                    {calculatedDrink.eligibleForCaptainDouble
                      ? `👑 Birra Capitano (${calculatedDrink.nextCaptainSlot}/4) • Punti Doppi`
                      : 'Punti in Palio (Dopo 2 Conferme)'}
                  </span>
                  <h2 className="text-[11px] font-bold text-white mt-0.5">
                    (({calculatedDrink.base}pt × {calculatedDrink.mult}) {calculatedDrink.qualityBonus >= 0 ? `+ ${calculatedDrink.qualityBonus}pt` : `${calculatedDrink.qualityBonus}pt`})
                    {bonusSempreNoi ? ' × 1.3' : ''}
                    {gocciaStatus.isOpen && bonusGocciaDOro ? ' + 3pt' : ''}
                    {calculatedDrink.eligibleForCaptainDouble ? ' × 2 (CAP)' : ''}
                  </h2>
                </div>
                <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-amber-400/40 text-right">
                  <span className={`text-xl font-black ${calculatedDrink.total < 0 ? 'text-red-400' : 'text-amber-400'}`}>
                    {calculatedDrink.total >= 0 ? `+${calculatedDrink.total}` : calculatedDrink.total}
                  </span>
                  <span className="text-[9px] block text-slate-400 font-bold uppercase">Punti</span>
                </div>
              </div>

              {/* PANNELLO CAPITANO */}
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
                        Il "Capitano" della Serata (Timer 12 Ore • Max 4 Birre x2)
                      </span>
                      <span className="text-[10px] text-slate-300 block leading-snug mt-0.5">
                        Scade in automatico dopo <strong>12 ore</strong>. Le tue prime <strong>4 birre</strong> valgono <strong>Punti Doppi (x2)</strong> e vengono accreditate solo allo scadere delle 12h se tutte e 4 sono confermate dal VAR. Se fallisci: <strong>0 punti per le birre e Malus di -20 pt</strong>!
                      </span>
                    </div>
                  </div>
                </div>

                {myMemberProfile?.captainActive ? (
                  <div className="space-y-2.5 pt-2 border-t border-purple-500/30">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-purple-200 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        Scadenza automatica:
                      </span>
                      <span className="font-mono font-black text-amber-300 bg-slate-950 px-2 py-0.5 rounded border border-purple-400/40">
                        {formatCaptainTimeLeft(myMemberProfile.captainExpiresAtMs, clockTick)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-purple-500/30 text-center">
                      <div>
                        <span className="text-[9px] uppercase text-slate-400 font-bold block">Confermate dal VAR</span>
                        <span className={`text-sm font-black ${(myMemberProfile.captainBeers || 0) >= 4 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {myMemberProfile.captainBeers || 0} / 4 Birre
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase text-slate-400 font-bold block">Cassaforte (Sblocco a 12h)</span>
                        <span className="text-sm font-black text-purple-300">
                          +{myMemberProfile.captainVaultPoints || 0} pt
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${
                          (myMemberProfile.captainBeers || 0) >= 4 ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                        style={{ width: `${Math.min(100, ((myMemberProfile.captainBeers || 0) / 4) * 100)}%` }}
                      />
                    </div>

                    {(myMemberProfile.captainBeersSubmitted || 0) >= 4 ? (
                      <div className="p-2 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-[10px] text-emerald-200 font-bold text-center">
                        ✅ Hai già stappato le 4 birre del Capitano! Eventuali birre successive in queste 12h avranno punteggio normale (x1).
                      </div>
                    ) : (
                      <div className="p-2 rounded-xl bg-slate-950/70 border border-purple-500/30 text-[10px] text-purple-200 font-semibold text-center">
                        Slot raddoppio utilizzati: <strong>{myMemberProfile.captainBeersSubmitted || 0}/4</strong> • Alla fine delle 12h il sistema assegnerà in automatico i punti o il malus di -20 pt!
                      </div>
                    )}
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
                    👑 Attiva "Capitano della Serata" (12 Ore • 4 Birre x2)
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
                  placeholder="Es. Keller, Trappista, Session IPA, Faxe..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

             {/* 1. Formato (4 Opzioni: 33cl, 50cl, 66cl, 1L) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
                <label className="block text-[10px] font-bold uppercase text-slate-400">1. Formato</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {[
                    { id: 'piccola33', name: 'Piccola 33cl', sub: '0,33 L', pts: '+3 pt' },
                    { id: 'spina50', name: 'Media 50cl', sub: '0,50 L', pts: '+5 pt' },
                    { id: 'boccione66', name: 'Boccione 66cl', sub: '0,66 L', pts: '+6.5 pt' },
                    { id: 'litro', name: 'Boccale 1 Litro', sub: '1,00 L', pts: '+10 pt' }
                  ].map(f => (
                    <button
                      type="button"
                      key={f.id}
                      onClick={() => setFormat(f.id)}
                      className={`p-2.5 rounded-xl border text-center transition ${format === f.id ? 'bg-amber-500/20 border-amber-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                    >
                      <span className="text-xs font-bold block">{f.name}</span>
                      <span className="text-[9px] text-slate-400 block">{f.sub}</span>
                      <span className="text-[10px] text-amber-400 font-black">{f.pts}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Grado Alcolico (Strada A: x1.0 / x1.2 / x1.4) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
                <label className="block text-[10px] font-bold uppercase text-slate-400">2. Grado Alcolico</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'leggera', name: 'Leggera', sub: 'fino a 5,6°', mult: 'x1.0' },
                    { id: 'media', name: 'Media', sub: '5,6° - 7,5°', mult: 'x1.2' },
                    { id: 'forte', name: 'Forte', sub: 'oltre 7,5°', mult: 'x1.4' }
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
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'industriale', name: 'Industriale', sub: 'Commerciale standard', bonus: '+0 pt' },
                    { id: 'artigianale', name: 'Artigianale', sub: 'Bottiglia / Lattina craft', bonus: '+2 pt' },
                    { id: 'spina', name: 'Alla spina', sub: 'Spillata al pub', bonus: '+3 pt' },
                    { id: 'rumeno', name: 'Passaporto Rumeno', sub: 'Ceres, Tennent\'s, Faxe...', bonus: '-5 pt • 🥫 24h' }
                  ].map(q => (
                    <button
                      type="button"
                      key={q.id}
                      onClick={() => setQualityTier(q.id)}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        qualityTier === q.id 
                          ? (q.id === 'rumeno' ? 'bg-red-500/20 border-red-500 text-white shadow-md shadow-red-500/10' : 'bg-amber-500/20 border-amber-400 text-white') 
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-bold block">{q.name}</span>
                      <span className="text-[9px] text-slate-400 block">{q.sub}</span>
                      <span className={`text-[10px] font-black ${q.id === 'rumeno' ? 'text-red-400' : 'text-amber-400'}`}>
                        {q.bonus}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Tipologia / Stile della Birra (NUOVO) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2">
                <label className="block text-[10px] font-bold uppercase text-slate-400">4. Tipologia della Birra</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'classica', name: 'Lager / Pils / Weiss', sub: 'Chiara o non filtrata classica', bonus: '+0 pt' },
                    { id: 'session', name: 'Session IPA / APA / Rossa', sub: 'Luppolata leggera o Ambrata', bonus: '+1 pt' },
                    { id: 'ipa', name: 'IPA / Double IPA / Stout', sub: 'Luppolo deciso o Scura', bonus: '+1.5 pt' },
                    { id: 'trappista', name: 'Trappista / Tripel / Quadrupel', sub: 'Speciale d\'Abbazia', bonus: '+2 pt' }
                  ].map(t => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setBeerTypeTier(t.id)}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        beerTypeTier === t.id
                          ? 'bg-amber-500/20 border-amber-400 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-bold block">{t.name}</span>
                      <span className="text-[9px] text-slate-400 block">{t.sub}</span>
                      <span className="text-[10px] text-amber-400 font-black">{t.bonus}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* BONUS 1: Sempre Noi */}
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
                    <span className="text-[10px] text-slate-400">Bevuta in compagnia con almeno altri 2 membri della lega</span>
                  </div>
                </div>
                <span className="text-sm font-black text-emerald-400">x1,3</span>
              </div> 

              {/* BONUS 2: Goccia d'Oro */}
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

              {/* Fotocamera Istantanea */}
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
                🍻 Invia in Sala VAR ({calculatedDrink.total >= 0 ? `+${calculatedDrink.total}` : calculatedDrink.total} PT in palio)
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
                  Con <strong>2 Conferme</strong> la birra è validata (le 4 birre Capitano vanno in cassaforte fino allo scadere delle 12h). Con <strong>2 Segnalazioni VAR</strong> scatta il malus e la foto sparisce!
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
                            <BeerGlassAvatar type={item.glassType} size="sm" crushed={item.isRumeno} />
                            <div>
                              <span className="text-xs font-black text-white block">{item.playerName}</span>
                              <span className="text-[10px] text-slate-400">{item.timestamp} • {item.location}</span>
                            </div>
                          </div>
                          <span className={`text-xs font-black px-2.5 py-1 rounded-lg border ${
                            item.isCaptainBeer
                              ? 'bg-purple-500/20 text-purple-300 border-purple-400/40'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          }`}>
                            {item.isCaptainBeer ? `👑 CAP (${item.captainSlot}/4): ` : 'Se confermata: '}
                            {item.points >= 0 ? `+${item.points}` : item.points} pt
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
{isGodMode && (
                         <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-amber-500/10 border border-amber-400/50">
                           <button
                             type="button"
                             onClick={() => handleGodForceVar(item, 'approve')}
                             className="py-1.5 px-2 rounded-lg bg-emerald-500 text-slate-950 text-[10px] font-black uppercase"
                           >
                             ⚡ Approva Subito
                           </button>
                           <button
                             type="button"
                             onClick={() => handleGodForceVar(item, 'delete')}
                             className="py-1.5 px-2 rounded-lg bg-red-600 text-white text-[10px] font-black uppercase"
                           >
                             ⚡ Cancella Foto
                           </button>
                         </div>
                       )}
                         {isMyBeer ? (
                            <div className="space-y-2 pt-1">
                              <div className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-[11px] font-bold flex items-center justify-center gap-2">
                                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                                <span>Tua bevuta: in attesa del giudizio di 2 amici della lega</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleDeleteOwnBeer(item)}
                                disabled={varVotesList.length > 0}
                                className={`w-full py-2 px-3 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-1.5 border transition ${
                                  varVotesList.length > 0
                                    ? 'bg-slate-950 border-slate-800 text-slate-600 cursor-not-allowed'
                                    : 'bg-red-500/15 hover:bg-red-500/25 border-red-500/40 text-red-300'
                                }`}
                              >
                                <Trash2 className="w-4 h-4" />
                                {varVotesList.length > 0
                                  ? 'Bloccata (Sotto indagine VAR)'
                                  : 'Hai sbagliato? Ritira ed Elimina Foto'}
                              </button>
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

          {/* TAB 4: ALBO D'ORO */}
          {activeTab === 'albo' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-3.5 space-y-1 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4" /> Albo d'Oro Ufficiale della Lega
                  </span>
                  <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                    Hall of Fame
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  I 4 titoli onorifici aggiornati in tempo reale in base alle bevute confermate nella lega!
                </p>
              </div>

              {alboRecords && (
                <div className="space-y-3">
                  {alboRecords.map(rec => (
                    <div
                      key={rec.id}
                      className={`p-4 rounded-2xl border ${rec.accent} shadow-lg flex items-center justify-between gap-3`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <AlboDrawing type={rec.drawingType} />
                        <div className="min-w-0">
                          <span className="text-xs font-black uppercase tracking-wider text-white block">
                            {rec.title}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            {rec.subtitle}
                          </span>
                          <div className="mt-2 flex items-center gap-2">
                            <BeerGlassAvatar
                              type={rec.member.glassType}
                              size="sm"
                              crushed={isCrushedCanActive(rec.member)}
                            />
                            <div className="truncate">
                              <span className="text-sm font-black text-amber-300 block truncate">
                                {rec.member.name}
                              </span>
                              <span className="text-[10px] font-bold text-slate-200 bg-slate-950/80 border border-slate-700 px-2 py-0.5 rounded-lg inline-block mt-0.5">
                                {rec.statBadge}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: IL CHIOSCO DEI GADGET */}
         {activeTab === 'chiosco' && (
         <Chiosco
           isGodMode={isGodMode}
           ownedItems={myMemberProfile?.ownedItems || []}
           onToggleOwnItem={handleToggleChioscoItem}
         />
       )}
       <GodPinModal
         isOpen={showGodPinModal}
         onClose={() => setShowGodPinModal(false)}
         onUnlock={() => {
           setIsGodMode(true);
           localStorage.setItem('sempre_noi_god_mode', 'true');
           setShowGodPinModal(false);
           showToast('⚡ GOD MODE ATTIVATA! Tocca il logo per nasconderla.', 'success');
         }}
       />
        </main>
{/* MODALE BOLLETTINO MEDICO PERSONALE / SCHEDA BEVITORE */}
        {inspectedMember && (
          <div
            onClick={() => setInspectedMemberId(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border-2 border-amber-400 rounded-3xl max-w-sm w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Intestazione Superiore con Tappi d'Oro in alto */}
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-black uppercase text-amber-400 flex items-center gap-1.5">
                  🏥 Bollettino Medico • Scheda Bevitore
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-400/50 px-2.5 py-0.5 rounded-full">
                    <span className="text-xs">🪙</span>
                    <span className="text-[11px] font-black text-amber-300">
                      {inspectedMember.goldCaps || 0} Tappi
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInspectedMemberId(null)}
                    className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-black flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-4 overflow-y-auto space-y-4">
                {/* Identità del Bevitore */}
                <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-2xl p-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <BeerGlassAvatar
                   type={inspectedMember.glassType}
                   size="lg"
                   crushed={isCrushedCanActive(inspectedMember)}
                   streakLevel={getMemberStreakLevel(inspectedMember, clockTick)}
                 />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-black text-white truncate">
                          {inspectedMember.name}
                        </h3>
                        {inspectedMember.id === currentUser.id && (
                          <button
                            type="button"
                            onClick={handleOpenEditName}
                            className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 transition shrink-0"
                            title="Modifica il tuo nome"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-amber-400 uppercase block mt-0.5">
                        Posizione #{sortedMembers.findIndex(m => m.id === inspectedMember.id) + 1} in Classifica
                      </span>
                      {isCrushedCanActive(inspectedMember) && (
                        <span className="text-[9px] font-black bg-red-500/20 text-red-300 border border-red-500/40 px-1.5 py-0.5 rounded inline-block mt-1">
                          🥫 Penitenza Passaporto Rumeno Attiva
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* I 4 BOX STATISTICHE (PUNTI, BIRRE, LITRI, CARTELLINI/SIMULAZIONI) */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-3 text-center">
                    <span className="text-[9px] font-black uppercase text-slate-400 block">Punteggio F1</span>
                    <span className="text-xl font-black text-amber-400 mt-0.5 block">
                      {inspectedMember.points} pt
                    </span>
                  </div>

                  <div className="bg-slate-950 border border-sky-500/30 rounded-2xl p-3 text-center">
                    <span className="text-[9px] font-black uppercase text-slate-400 block">Birre Scolate</span>
                    <span className="text-xl font-black text-sky-400 mt-0.5 block">
                      🍺 {inspectedMember.beers || 0}
                    </span>
                  </div>

                  <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-3 text-center">
                    <span className="text-[9px] font-black uppercase text-slate-400 block">Litri Totali</span>
                    <span className="text-xl font-black text-emerald-400 mt-0.5 block">
                      ⛽ {(inspectedMember.liters ?? ((inspectedMember.beers || 0) * 0.5)).toFixed(1)} L
                    </span>
                  </div>

                  <div className="bg-slate-950 border border-red-500/30 rounded-2xl p-3 text-center">
                    <span className="text-[9px] font-black uppercase text-slate-400 block">Fedina Sala VAR</span>
                    <div className="flex items-center justify-center gap-2 mt-1 text-xs font-black">
                      <span title="Cartellini Gialli" className="text-yellow-400">🟨 {inspectedMember.yellowCards || 0}</span>
                      <span title="Simulazioni" className="text-orange-400">🚨 {inspectedMember.simulations || 0}</span>
                      <span title="Cartellini Rossi" className="text-red-500">🟥 {inspectedMember.redCards || 0}</span>
                    </div>
                  </div>
                </div>

               {/* SEZIONE LIBERA "I MIEI AVERI" + CONSOLE GOD MODE */}
                <OwnedItemsShowcase
                  ownedItems={inspectedMember.ownedItems || []}
                  isMe={inspectedMember.id === currentUser.id}
                  playerName={inspectedMember.name}
                  onGoToChiosco={() => {
                    setInspectedMemberId(null);
                    setActiveTab('chiosco');
                  }}
                />

                {isGodMode && (
                  <GodBollettinoConsole
                    member={inspectedMember}
                    onGodEdit={handleGodEditMember}
                  />
                )}
              </div>

              <div className="p-3 bg-slate-950 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setInspectedMemberId(null)}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase rounded-xl"
                >
                  Chiudi Bollettino Medico
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODALE CAMBIA SOPRANNOME (DENTRO LA LEGA) */}
        {showEditNameModal && (
          <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleUpdateUsername} className="bg-slate-900 border-2 border-amber-400 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
              <h3 className="text-sm font-black uppercase text-amber-400 flex items-center gap-1.5">
                <Pencil className="w-4 h-4" /> Cambia il tuo Soprannome
              </h3>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Nuovo Nome Bevitore</label>
                <input
                  type="text"
                  required
                  maxLength={22}
                  value={editNicknameValue}
                  onChange={(e) => setEditNicknameValue(e.target.value)}
                  placeholder="Es. Il Sindaco del 74"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Il nuovo nome sarà subito visibile a tutti senza perdere punti!
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button type="button" onClick={() => setShowEditNameModal(false)} className="py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">
                  Annulla
                </button>
                <button type="submit" className="py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black uppercase">
                  Salva Nome
                </button>
              </div>
            </form>
          </div>
        )}
       {/* MODALE REGOLE UFFICIALI (A 2 PAGINE: COME SI GIOCA + PUNTI E BONUS) */}
        {showRulesModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border-2 border-amber-400 rounded-2xl max-w-sm w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Regolamento Sempre Noi
                </span>
                <button
                  type="button"
                  onClick={() => setShowRulesModal(false)}
                  className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Selettore delle 2 Pagine */}
              <div className="grid grid-cols-2 gap-1.5 p-2 bg-slate-950/90 border-b border-slate-800">
                <button
                  type="button"
                  onClick={() => setRulesPage('intro')}
                  className={`py-2 rounded-xl text-[10px] font-black uppercase transition ${
                    rulesPage === 'intro'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  🍺 1. Come si Gioca
                </button>
                <button
                  type="button"
                  onClick={() => setRulesPage('punti')}
                  className={`py-2 rounded-xl text-[10px] font-black uppercase transition ${
                    rulesPage === 'punti'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ 2. Punti & Bonus
                </button>
              </div>

              {/* CONTENUTO PAGINA 1: INTRODUZIONE GENERALE (CALCIO & BIRRA) */}
              {rulesPage === 'intro' ? (
                <div className="p-4 overflow-y-auto space-y-2.5 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/15 to-slate-950 border border-amber-500/30 space-y-1">
                    <span className="text-[10px] font-black uppercase text-amber-400 block">
                      🍻⚽ Benvenuto nel Fantabirra Ufficiale
                    </span>
                    <p className="text-[11px] leading-relaxed text-slate-200">
                      Crea la lega con i tuoi compagni di bevute e scendi in campo al bancone! Qui ogni pinta vale punti pesanti: si gioca tutti contro tutti a colpi di luppolo, doppiette e chiamate al VAR per incoronare il vero <strong>Bomber</strong> della compagnia.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-black uppercase text-sky-400 block">
                      1️⃣ Stappa, Fascia da Capitano e Scatta Live
                    </span>
                    <p className="text-[11px] leading-snug">
                      Quando hai la birra davanti, vai su <strong>Stappa!</strong>, scegli formato, gradi e qualità (o indossa la <strong>Fascia da Capitano</strong> del weekend!) e scatta la foto in diretta: niente foto vecchie dalla galleria!
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-black uppercase text-emerald-400 block">
                      2️⃣ Il Giudizio della Sala VAR
                    </span>
                    <p className="text-[11px] leading-snug">
                      La tua foto finisce al vaglio della <strong>Sala VAR</strong>: servono <strong>2 conferme</strong> degli amici per convalidare la bevuta e incassare i punti. Ma se avanzi la birra o provi a barare, scattano <strong>Simulazioni, Cartellini Gialli e Rossi</strong>!
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-black uppercase text-purple-400 block">
                      3️⃣ Gazzetta, Bollettino e Chiosco
                    </span>
                    <p className="text-[11px] leading-snug">
                      Ogni impresa o degrado finisce in prima pagina sulla <strong>Gazzetta</strong>! Tocca i giocatori in classifica per spiare il loro <strong>Bollettino Medico</strong> e accumula <strong>Tappi d'Oro 🪙</strong> per collezionare le 32 carte del <strong>Chiosco</strong>.
                    </p>
                  </div>
                </div>
              ) : (
                /* CONTENUTO PAGINA 2: LE TUE REGOLE SUI PUNTI E BONUS */
                <div className="p-4 overflow-y-auto space-y-3 text-xs text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-black uppercase text-amber-400">1. Formati, Gradi, Qualità e Stile</span>
                    <div className="flex justify-between"><span>33cl / 50cl / 66cl / 1 Litro</span><strong className="text-white">+3 / +5 / +6.5 / +10 pt</strong></div>
                    <div className="flex justify-between"><span>Leggera (≤5,6°) / Media / Forte (&gt;7,5°)</span><strong className="text-white">x1.0 / x1.2 / x1.4</strong></div>
                    <div className="flex justify-between"><span>Industriale / Artigianale / Alla spina</span><strong className="text-amber-400">+0 / +2 / +3 pt</strong></div>
                    <div className="flex justify-between"><span>Stile: Classica / Session / IPA-Stout / Abbazia</span><strong className="text-amber-300">+0 / +1 / +1.5 / +2 pt</strong></div>
                    <div className="flex justify-between"><span>Bonus "Sempre noi" (con +2 membri lega)</span><strong className="text-emerald-400">x1.3</strong></div>
                    <div className="flex justify-between"><span>Passaporto Rumeno (Ceres, Tennent's, Faxe...)</span><strong className="text-red-400">-5 pt + 🥫 24h</strong></div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-purple-500/30 space-y-1">
                    <span className="text-[10px] font-black uppercase text-purple-400">2. Capitano 12 Ore</span>
                    <div className="flex justify-between"><span>4 Birre validate nelle 12h</span><strong className="text-purple-300">Punti Doppi (x2)</strong></div>
                    <div className="flex justify-between"><span>Meno di 4 birre a fine 12h</span><strong className="text-red-500">0 pt birre e Malus -20 pt</strong></div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-red-500/30 space-y-1">
                    <span className="text-[10px] font-black uppercase text-red-400">3. Sala VAR (2 Voti)</span>
                    <div className="flex justify-between"><span>2 Conferme dagli amici</span><strong className="text-emerald-400">+Punti Birra</strong></div>
                    <div className="flex justify-between"><span>🟨 Cartellino giallo: birra avanzata</span><strong className="text-yellow-400">Solo -2 pt</strong></div>
                    <div className="flex justify-between"><span>🚨 Simulazione: foto riciclata/vuota</span><strong className="text-red-400">Solo -5 pt</strong></div>
                    <div className="flex justify-between"><span>🟥 Cartellino rosso: analcolica/radler</span><strong className="text-red-500">Solo -10 pt</strong></div>
                  </div>
                </div>
              )}

              <div className="p-3 bg-slate-950 border-t border-slate-800 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRulesPage(rulesPage === 'intro' ? 'punti' : 'intro')}
                  className="py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-black uppercase rounded-xl"
                >
                  {rulesPage === 'intro' ? 'Vedi Punti ▸' : '◂ Come si Gioca'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowRulesModal(false)}
                  className="py-2.5 bg-amber-500 text-slate-950 text-xs font-black uppercase rounded-xl"
                >
                  Ho Capito
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODALE GAZZETTA */}
        {showGazzettaModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border-2 border-amber-400 rounded-2xl max-w-sm w-full max-h-[82vh] flex flex-col overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 px-4 py-3 flex items-center justify-between text-slate-950 font-black text-xs uppercase">
                <span>Gazzetta del Sempre Noi (24h)</span>
                <button
                  type="button"
                  onClick={() => setShowGazzettaModal(false)}
                  className="px-2 py-1 rounded-lg bg-slate-950/20 text-slate-950 text-xs font-black"
                >
                  ✕
                </button>
              </div>

              <div className="p-3.5 overflow-y-auto space-y-2.5 flex-1">
                {activeGazzettaList.length === 0 ? (
                  <div className="text-center py-8 space-y-2 text-slate-400">
                    <Newspaper className="w-8 h-8 mx-auto text-slate-600" />
                    <p className="text-xs font-bold">Nessuna notizia nelle ultime 24 ore!</p>
                  </div>
                ) : (
                  activeGazzettaList.map(news => (
                    <div
                      key={news.id}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-1.5 shadow"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${news.badgeColor}`}>
                          {news.icon} {news.category}
                        </span>
                        <span className="text-[9px] text-slate-500 font-mono">
                          {news.dateLabel} • {news.timestamp}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-100 leading-snug">
                        {news.text}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="p-3 border-t border-slate-800 bg-slate-950">
                <button
                  type="button"
                  onClick={() => setShowGazzettaModal(false)}
                  className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black uppercase"
                >
                  Chiudi Gazzetta
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODALE DI CHIAMATA AL VAR */}
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

        {/* BARRA NAVIGAZIONE INFERIORE (5 SCHEDE: ORA CON IL CHIOSCO) */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 z-40">
          <div className="grid grid-cols-5 gap-1">
            <button
              onClick={() => setActiveTab('classifica')}
              className={`flex flex-col items-center py-1 rounded-xl transition ${activeTab === 'classifica' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}
            >
              <Trophy className="w-5 h-5" />
              <span className="text-[9px] font-bold mt-1">Classifica</span>
            </button>
            <button
              onClick={() => setActiveTab('stappa')}
              className={`flex flex-col items-center py-1 rounded-xl transition ${activeTab === 'stappa' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}
            >
              <PlusCircle className="w-5 h-5" />
              <span className="text-[9px] font-bold mt-1">Stappa!</span>
            </button>
            <button
              onClick={() => setActiveTab('var')}
              className={`flex flex-col items-center py-1 rounded-xl relative transition ${activeTab === 'var' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}
            >
              <ShieldAlert className="w-5 h-5" />
              {(activeLeague.feed || []).length > 0 && (
                <span className="absolute top-0.5 right-3 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center">
                  {(activeLeague.feed || []).length}
                </span>
              )}
              <span className="text-[9px] font-bold mt-1">Sala VAR</span>
            </button>
            <button
              onClick={() => setActiveTab('albo')}
              className={`flex flex-col items-center py-1 rounded-xl transition ${activeTab === 'albo' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}
            >
              <Award className="w-5 h-5" />
              <span className="text-[9px] font-bold mt-1">Albo d'Oro</span>
            </button>
            <button
              onClick={() => setActiveTab('chiosco')}
              className={`flex flex-col items-center py-1 rounded-xl transition ${activeTab === 'chiosco' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}
            >
              <Store className="w-5 h-5" />
              <span className="text-[9px] font-bold mt-1">Chiosco</span>
            </button>
          </div>
        </nav>

      </div>
    </div>
  );
}