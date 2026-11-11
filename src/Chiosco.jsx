import React, { useState } from 'react';
import { Lock, Sparkles, X, ShieldCheck } from 'lucide-react';

// --- CONFIGURAZIONE COLORI E STILI RARITÀ (STILE CLASH ROYALE / FIFA) ---
const RARITY_CONFIG = {
  comune: {
    label: 'COMUNE',
    badgeClass: 'bg-emerald-500 text-slate-950 border-emerald-300',
    cardBg: 'from-emerald-950/50 via-slate-900 to-slate-950',
    cardBorder: 'border-emerald-500/40 hover:border-emerald-400',
    modalBg: 'from-emerald-500/30 via-slate-900 to-slate-950',
    modalBorder: 'border-emerald-400',
    glow: 'bg-emerald-500/25',
    textAccent: 'text-emerald-400'
  },
  raro: {
    label: 'RARO',
    badgeClass: 'bg-sky-400 text-slate-950 border-sky-200',
    cardBg: 'from-sky-950/60 via-slate-900 to-slate-950',
    cardBorder: 'border-sky-500/50 hover:border-sky-400',
    modalBg: 'from-sky-500/35 via-slate-900 to-slate-950',
    modalBorder: 'border-sky-400',
    glow: 'bg-sky-400/30',
    textAccent: 'text-sky-300'
  },
  mitico: {
    label: 'MITICO',
    badgeClass: 'bg-purple-500 text-white border-purple-300',
    cardBg: 'from-purple-950/60 via-slate-900 to-slate-950',
    cardBorder: 'border-purple-500/60 hover:border-purple-400',
    modalBg: 'from-purple-600/40 via-slate-900 to-slate-950',
    modalBorder: 'border-purple-400',
    glow: 'bg-purple-500/35',
    textAccent: 'text-purple-300'
  },
  leggendario: {
    label: 'LEGGENDARIO',
    badgeClass: 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 border-yellow-200',
    cardBg: 'from-amber-500/25 via-slate-900 to-slate-950',
    cardBorder: 'border-amber-400/80 hover:border-yellow-300 shadow-lg shadow-amber-500/10',
    modalBg: 'from-amber-400/40 via-amber-950/50 to-slate-950',
    modalBorder: 'border-amber-400',
    glow: 'bg-amber-400/40',
    textAccent: 'text-amber-300'
  }
};

// --- CATALOGO UFFICIALE DEI 24 ELEMENTI DEL CHIOSCO (8 PER CATEGORIA: 2C, 2R, 2M, 2L) ---
const CHIOSCO_ITEMS = {
  cavatappi: [
    {
      id: 'accendino_ignorante',
      name: 'Accendino Ignorante',
      rarity: 'comune',
      categoryLabel: 'Cavatappi di Emergenza',
      desc: "Il grande classico di chi ha perso l'apribottiglie a inizio serata. Stappa per leva fisica pura, lasciando gloriosi segni di guerra sulla plastica gialla."
    },
    {
      id: 'cucchiaio_ignorante',
      name: 'Cucchiaio Ignorante',
      rarity: 'comune',
      categoryLabel: 'Utensile da Battaglia',
      desc: "Sottratto furtivamente dal cassetto della cucina: quando non hai il cavatappi ma hai una laurea ad honorem in meccanica applicata al bancone."
    },
    {
      id: 'bar_blade',
      name: 'Bar Blade',
      rarity: 'raro',
      categoryLabel: 'Cavatappi Professionale',
      desc: "La lama piatta in acciaio inox dei veri barman d'assalto: estrazione rapida dalla tasca posteriore dei jeans e tappo spedito direttamente in orbita."
    },
    {
      id: 'oste_legno',
      name: 'Oste in Legno',
      rarity: 'raro',
      categoryLabel: 'Cavatappi Tradizionale',
      desc: "Tornito dal legno massello di una vecchia botte di rovere e forgiato in ottone antico. Profuma ancora di cantina storica e vecchie leggende."
    },
    {
      id: 'pitstop_f1',
      name: 'Pit-Stop F1 Carbon',
      rarity: 'mitico',
      categoryLabel: 'Cavatappi Scuderia',
      desc: "Telaio monoscocca in fibra di carbonio intrecciata e profili Rosso Corsa. Tempo medio di cambio birra ai box: 1.8 secondi netti."
    },
    {
      id: 'zanna_drago',
      name: 'Zanna del Drago',
      rarity: 'mitico',
      categoryLabel: 'Reliquia Forgiata',
      desc: "Reliquia fantasy forgiata nel bronzo antico a forma di fauci di drago. Nessun tappo a corona osa opporsi al suo morso letale."
    },
    {
      id: 'cavatappi_mario',
      name: 'Cavatappi Mario',
      rarity: 'leggendario',
      categoryLabel: 'Reliquia Suprema',
      desc: "L'artefatto definitivo del culto di Sempre Noi. Basta appoggiarlo sul tavolo perché le bottiglie si stappino da sole per timore reverenziale."
    },
    {
      id: 'reale_24k',
      name: 'Reale 24 Carati',
      rarity: 'leggendario',
      categoryLabel: 'Gioiello della Corona',
      desc: "Cesellato in oro massiccio 24 carati con diamante azzurro incastonato nel perno centrale. Riservato esclusivamente all'aristocrazia del luppolo."
    }
  ],
  calici: [
    {
      id: 'krug_ceramica',
      name: 'Krug Ceramica',
      rarity: 'comune',
      categoryLabel: 'Calice Speciale',
      desc: "Boccale bavarese in gres grigio con coperchio in peltro: mantiene la birra gelida per ore e protegge la schiuma dagli attacchi esterni."
    },
    {
      id: 'boccale_vichingo',
      name: 'Boccale Vichingo',
      rarity: 'comune',
      categoryLabel: 'Calice Speciale',
      desc: "Doghe di quercia grezza tenute insieme da anelli in ferro battuto. È severamente obbligatorio sbatterlo sul tavolo urlando dopo ogni sorso."
    },
    {
      id: 'pinta_subzero',
      name: 'Pinta Sub-Zero',
      rarity: 'raro',
      categoryLabel: 'Calice Criogenico',
      desc: "Estratta direttamente da un ghiacciaio artico a -18°C: ricoperta di brina perenne e stalattiti di ghiaccio che sfidano le leggi della termodinamica."
    },
    {
      id: 'das_boot',
      name: 'Das Boot 1L',
      rarity: 'raro',
      categoryLabel: 'Stivale Tedesco',
      desc: "Il leggendario stivale di vetro da un litro intero. Attenzione alla bolla d'aria quando arrivi alla punta o finisci completamente lavato!"
    },
    {
      id: 'corno_nord',
      name: 'Corno del Nord',
      rarity: 'mitico',
      categoryLabel: 'Calice da Guerra',
      desc: "Corno vichingo levigato con finiture in oro antico. Non ha una base piatta: una volta riempito, sei moralmente costretto a finirlo tutto d'un fiato!"
    },
    {
      id: 'teschio_cristallo',
      name: 'Teschio Cristallo',
      rarity: 'mitico',
      categoryLabel: 'Calice Esoterico',
      desc: "Scolpito nel cristallo di Boemia a forma di cranio anatomico. Guarda negli occhi i tuoi avversari in classifica mentre li sorpassi in curva."
    },
    {
      id: 'boccale_f1',
      name: 'Boccale F1 Carbon',
      rarity: 'leggendario',
      categoryLabel: 'Calice Telemetrico',
      desc: "Rivestimento aerodinamico in carbonio, telemetria termica integrata e manometro di pressione sul fianco per staccate al limite del fegato."
    },
    {
      id: 'calice_imperiale',
      name: 'Calice Imperiale',
      rarity: 'leggendario',
      categoryLabel: 'Calice dei Re',
      desc: "Coppa imperiale in oro fuso tempestata di rubini reali. Anche la birra più ignorante bevuta qui dentro si trasforma in nettare degli dei."
    }
  ],
  cimeli: [
    {
      id: 'sottobicchiere_74',
      name: 'Sottobicchiere "Sempre Noi al 74"',
      rarity: 'comune',
      categoryLabel: 'Cimelio Storico',
      desc: "Il glorioso cartoncino ufficiale del 'Sempre Noi al 74', intriso di storia, aneddoti non raccontabili e macchie certificate di luppolo."
    },
    {
      id: 'casco_bombardiere',
      name: 'Casco da Bombardiere',
      rarity: 'comune',
      categoryLabel: 'Cimelio Tattico',
      desc: "Elmetto rosso ad assetto variabile con doppio alloggiamento laterale e cannucce a pescaggio diretto: lascia entrambe le mani libere per esultare."
    },
    {
      id: 'fusto_30l',
      name: 'Fusto Emergenza 30L',
      rarity: 'raro',
      categoryLabel: 'Riserva Strategica',
      desc: "Fusto corazzato in acciaio inox da 30 litri tenuto sotto il letto per le emergenze nazionali o i cali improvvisi di pressione nel weekend."
    },
    {
      id: 'alcoltest_esploso',
      name: 'Alcoltest Esploso',
      rarity: 'raro',
      categoryLabel: 'Trofeo Tecnologico',
      desc: "L'etilometro digitale che ha tentato di misurare il tasso alcolico della compagnia sabato sera, andando in cortocircuito tra le fiamme a ERR 999."
    },
    {
      id: 'chiavi_pub',
      name: 'Chiavi del Pub',
      rarity: 'mitico',
      categoryLabel: 'Onorificenza Notturna',
      desc: "Mazzo di chiavi in ottone massiccio consegnato dall'oste in persona a chi ha chiuso il locale per ultimo per 50 weekend consecutivi."
    },
    {
      id: 'cintura_pesi_massimi',
      name: 'Cintura Pesi Massimi',
      rarity: 'mitico',
      categoryLabel: 'Titolo Mondiale',
      desc: "Cintura mondiale in cuoio nero e placca d'oro sbalzata con doppi boccali: il riconoscimento indiscusso per i pesi massimi del bancone."
    },
    {
      id: 'cittadino_74',
      name: 'Cittadino Onorario del 74',
      rarity: 'leggendario',
      categoryLabel: 'Immunità Diplomatica',
      desc: "Pergamena ufficiale con sigillo in ceralacca rossa e timbro d'oro '74': garantisce immunità diplomatica totale e posto fisso d'onore al tavolo."
    },
    {
      id: 'busto_mario',
      name: "Busto d'Oro di Mario",
      rarity: 'leggendario',
      categoryLabel: 'Monumento Imperiale',
      desc: "Scultura imperiale in oro 24 carati con corona d'alloro cesellata. Chiunque esponga questo cimelio in bacheca ha raggiunto il Nirvana."
    }
  ]
};

// --- DISEGNI VETTORIALI AD ALTA DEFINIZIONE DEI 24 ELEMENTI ---
function ChioscoItemArtwork({ id, size = 'md' }) {
  const dim = size === 'xl' ? 'w-44 h-44' : 'w-20 h-20';

  return (
    <div className={`${dim} flex items-center justify-center select-none relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* ==================== 1. CAVATAPPI (8) ==================== */}
        {id === 'accendino_ignorante' && (
          <g transform="rotate(-14 50 50)">
            <path d="M50 8C56 16 58 23 50 28C42 23 44 16 50 8Z" fill="#f97316" />
            <path d="M50 13C53 18 54 22 50 26C46 22 47 18 50 13Z" fill="#fef08a" />
            <rect x="37" y="28" width="18" height="10" rx="2" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
            <rect x="53" y="31" width="10" height="5" rx="1.5" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
            <rect x="35" y="38" width="26" height="48" rx="4" fill="#facc15" stroke="#ca8a04" strokeWidth="2.5" />
            <path d="M35 80L42 86H61V38" stroke="#fef08a" strokeWidth="2" opacity="0.5" />
            <path d="M35 76L44 83" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {id === 'cucchiaio_ignorante' && (
          <g transform="rotate(-25 50 50)">
            <ellipse cx="50" cy="26" rx="15" ry="20" fill="#e2e8f0" stroke="#64748b" strokeWidth="2.5" />
            <ellipse cx="48" cy="24" rx="10" ry="14" fill="#cbd5e1" />
            <path d="M44 14C44 18 46 28 46 34" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M46 45L44 88C44 91 56 91 56 88L54 45Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="2.5" />
            <path d="M36 42L64 38" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
          </g>
        )}

        {id === 'bar_blade' && (
          <g transform="rotate(-30 50 50)">
            <rect x="36" y="10" width="28" height="80" rx="14" fill="#e2e8f0" stroke="#64748b" strokeWidth="2.5" />
            <path d="M36 48H64V76C64 83.7 57.7 90 50 90C42.3 90 36 83.7 36 76V48Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
            <rect x="42" y="18" width="16" height="14" rx="4" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
            <path d="M46 32H54V28H46V32Z" fill="#cbd5e1" />
            <circle cx="50" cy="74" r="6" fill="#0f172a" stroke="#fca5a5" strokeWidth="2" />
          </g>
        )}

        {id === 'oste_legno' && (
          <g transform="rotate(25 50 50)">
            <path d="M38 24C38 14 62 14 62 24C62 32 56 36 56 42H44C44 36 38 32 38 24Z" fill="#d97706" stroke="#fef3c7" strokeWidth="2" />
            <ellipse cx="50" cy="24" rx="7" ry="6" fill="#0f172a" />
            <rect x="41" y="42" width="18" height="5" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
            <path d="M39 47C35 60 36 76 42 88H58C64 76 65 60 61 47H39Z" fill="#9a3412" stroke="#431407" strokeWidth="2.5" />
            <path d="M45 52C43 64 44 75 46 84M54 52C56 64 55 75 53 84" stroke="#fdba74" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
            <rect x="40" y="78" width="20" height="4" fill="#fbbf24" />
          </g>
        )}

        {id === 'pitstop_f1' && (
          <g transform="rotate(-30 50 50)">
            <path d="M34 22C34 12 66 12 66 22C66 30 58 34 58 42V58C58 66 66 70 66 78C66 88 34 88 34 78C34 70 42 66 42 58V42C42 34 34 30 34 22Z" fill="#1e293b" stroke="#ef4444" strokeWidth="3.5" />
            <circle cx="50" cy="23" r="8" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="50" cy="77" r="7" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M45 40L55 46M45 48L55 54M45 56L55 62" stroke="#64748b" strokeWidth="2" />
          </g>
        )}

        {id === 'zanna_drago' && (
          <g transform="rotate(15 50 50)">
            <path d="M40 16C40 8 64 8 64 20C64 28 56 32 54 38L44 36C42 30 40 24 40 16Z" fill="#b45309" stroke="#fde68a" strokeWidth="2" />
            <circle cx="52" cy="19" r="6" fill="#0f172a" />
            <path d="M38 34L60 38L56 54L34 48Z" fill="#d97706" stroke="#78350f" strokeWidth="2" />
            <circle cx="48" cy="43" r="2.5" fill="#ef4444" />
            <path d="M36 48C32 66 38 82 58 90C48 76 48 62 54 52L36 48Z" fill="#fef3c7" stroke="#92400e" strokeWidth="2.5" />
          </g>
        )}

        {id === 'cavatappi_mario' && (
          <g>
            <rect x="18" y="10" width="64" height="68" rx="14" fill="#3b0764" stroke="#fbbf24" strokeWidth="3" />
            <path d="M26 76C26 64 74 64 74 76" fill="#f8fafc" />
            <ellipse cx="50" cy="42" rx="18" ry="21" fill="#f1c27d" stroke="#78350f" strokeWidth="1.5" />
            <path d="M39 26C44 22 54 22 60 26" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
            <path d="M32 42C32 56 40 64 50 64C60 64 68 56 68 42C66 48 60 50 50 50C40 50 34 48 32 42Z" fill="#27272a" />
            <rect x="43" y="51" width="14" height="5" rx="2" fill="#fca5a5" />
            <path d="M38 36L46 38M62 36L54 38" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="42" cy="40" r="2" fill="#18181b" />
            <circle cx="58" cy="40" r="2" fill="#18181b" />
            <rect x="36" y="72" width="28" height="18" rx="7" fill="#e2e8f0" stroke="#475569" strokeWidth="2.5" />
            <rect x="42" y="77" width="16" height="8" rx="3" fill="#0f172a" />
          </g>
        )}

        {id === 'reale_24k' && (
          <g>
            <ellipse cx="50" cy="18" rx="14" ry="9" stroke="#fde047" strokeWidth="4" fill="#0f172a" />
            <rect x="44" y="27" width="12" height="26" rx="3" fill="#eab308" stroke="#fef08a" strokeWidth="2" />
            <polygon points="50,34 55,40 50,46 45,40" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="1.2" />
            <path d="M44 34L22 68L28 72L44 46" fill="#facc15" stroke="#fef08a" strokeWidth="1.8" />
            <path d="M56 34L78 68L72 72L56 46" fill="#facc15" stroke="#fef08a" strokeWidth="1.8" />
            <path d="M50 53L47 60L53 66L47 72L53 78L50 88" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {/* ==================== 2. CALICI SPECIALI (8) ==================== */}
        {id === 'krug_ceramica' && (
          <g>
            <path d="M68 38H80C84 38 84 72 80 72H68" stroke="#94a3b8" strokeWidth="5" fill="none" />
            <path d="M30 28L66 28L70 86H26L30 28Z" fill="#64748b" stroke="#cbd5e1" strokeWidth="2.5" />
            <path d="M30 28L48 12L66 28H30Z" fill="#94a3b8" stroke="#e2e8f0" strokeWidth="2" />
            <circle cx="48" cy="10" r="3" fill="#e2e8f0" />
            <rect x="28" y="34" width="40" height="5" fill="#334155" />
            <rect x="27" y="76" width="42" height="5" fill="#334155" />
          </g>
        )}

        {id === 'boccale_vichingo' && (
          <g>
            <path d="M68 34H80C84 34 84 74 80 74H68" stroke="#78350f" strokeWidth="6" fill="none" />
            <path d="M26 24H70L66 86H30L26 24Z" fill="#9a3412" stroke="#431407" strokeWidth="2.5" />
            <path d="M38 24V86M50 24V86M60 24V86" stroke="#431407" strokeWidth="2" />
            <rect x="25" y="32" width="46" height="6" rx="1" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="28" y="72" width="40" height="6" rx="1" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="34" cy="35" r="1.5" fill="#cbd5e1" />
            <circle cx="50" cy="35" r="1.5" fill="#cbd5e1" />
            <circle cx="64" cy="35" r="1.5" fill="#cbd5e1" />
          </g>
        )}

        {id === 'pinta_subzero' && (
          <g>
            <path d="M28 22L34 86H66L72 22H28Z" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="2.5" />
            <path d="M26 22C26 14 36 12 50 12C64 12 74 14 74 22H26Z" fill="#f0f9ff" />
            <polygon points="30,22 33,38 37,22" fill="#e0f2fe" />
            <polygon points="38,22 43,46 48,22" fill="#e0f2fe" />
            <polygon points="52,22 57,42 62,22" fill="#e0f2fe" />
            <polygon points="63,22 67,36 70,22" fill="#e0f2fe" />
            <path d="M40 56L52 44M46 68L60 54" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {id === 'das_boot' && (
          <g>
            <path d="M32 16H60L56 62L78 72C84 75 84 86 74 86H30L32 16Z" fill="#facc15" stroke="#fef08a" strokeWidth="2.5" />
            <path d="M30 18C30 11 40 9 46 10C54 9 62 11 62 18H30Z" fill="#ffffff" />
            <path d="M38 26V76" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          </g>
        )}

        {id === 'corno_nord' && (
          <g>
            <path d="M24 20C22 54 44 82 82 84C62 68 54 48 58 20H24Z" fill="#fde68a" stroke="#92400e" strokeWidth="2.5" />
            <ellipse cx="41" cy="20" rx="17" ry="6" fill="#b45309" stroke="#fef08a" strokeWidth="2" />
            <path d="M25 28H57" stroke="#d97706" strokeWidth="4" />
            <circle cx="82" cy="84" r="4" fill="#d97706" />
          </g>
        )}

        {id === 'teschio_cristallo' && (
          <g>
            <path d="M26 42C26 22 74 22 74 42C74 54 66 60 64 68H36C34 60 26 54 26 42Z" fill="#ea580c" stroke="#e2e8f0" strokeWidth="2.5" />
            <rect x="36" y="68" width="28" height="16" rx="4" fill="#c2410c" stroke="#e2e8f0" strokeWidth="2.5" />
            <path d="M30 30C30 22 70 22 70 30H30Z" fill="#ffedd5" />
            <circle cx="40" cy="46" r="6" fill="#0f172a" stroke="#f8fafc" strokeWidth="1.5" />
            <circle cx="60" cy="46" r="6" fill="#0f172a" stroke="#f8fafc" strokeWidth="1.5" />
            <polygon points="50,52 46,60 54,60" fill="#0f172a" />
            <path d="M42 68V84M50 68V84M58 68V84" stroke="#e2e8f0" strokeWidth="2" />
          </g>
        )}

        {id === 'boccale_f1' && (
          <g>
            <path d="M68 32H80C85 32 85 72 80 72H68" stroke="#ef4444" strokeWidth="5" fill="none" />
            <rect x="26" y="20" width="42" height="66" rx="5" fill="#1e293b" stroke="#94a3b8" strokeWidth="2.5" />
            <path d="M34 20V86M42 20V86" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="55" cy="64" r="8" fill="#f8fafc" stroke="#ef4444" strokeWidth="2" />
            <path d="M55 64L59 59" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {id === 'calice_imperiale' && (
          <g>
            <path d="M24 22C24 52 36 60 50 60C64 60 76 52 76 22H24Z" fill="#eab308" stroke="#fef08a" strokeWidth="2.5" />
            <path d="M22 22C22 14 34 12 50 12C66 12 78 14 78 22H22Z" fill="#fef9c3" />
            <rect x="45" y="60" width="10" height="20" fill="#eab308" stroke="#fef08a" strokeWidth="2" />
            <path d="M30 84C36 78 64 78 70 84H30Z" fill="#eab308" stroke="#fef08a" strokeWidth="2.5" />
            <circle cx="36" cy="36" r="4" fill="#dc2626" stroke="#fef08a" strokeWidth="1.5" />
            <circle cx="50" cy="38" r="5" fill="#dc2626" stroke="#fef08a" strokeWidth="1.5" />
            <circle cx="64" cy="36" r="4" fill="#dc2626" stroke="#fef08a" strokeWidth="1.5" />
          </g>
        )}

        {/* ==================== 3. CIMELI (8) ==================== */}
        {id === 'sottobicchiere_74' && (
          <g>
            <circle cx="50" cy="50" r="38" fill="#fef3c7" stroke="#b45309" strokeWidth="3.5" />
            <circle cx="50" cy="50" r="32" fill="none" stroke="#92400e" strokeWidth="1.5" strokeDasharray="4 3" />
            <rect x="20" y="41" width="60" height="18" rx="3" fill="#78350f" />
            <text x="50" y="49" textAnchor="middle" fill="#fde68a" fontSize="7.5" fontWeight="900">SEMPRE NOI</text>
            <text x="50" y="57" textAnchor="middle" fill="#fbbf24" fontSize="7" fontWeight="900">AL 74</text>
            <circle cx="68" cy="28" r="7" fill="#d97706" opacity="0.35" />
          </g>
        )}

        {id === 'casco_bombardiere' && (
          <g>
            <path d="M26 54C26 32 74 32 74 54H26Z" fill="#dc2626" stroke="#fca5a5" strokeWidth="2" />
            <path d="M20 54H80L74 60H26L20 54Z" fill="#b91c1c" />
            <rect x="12" y="36" width="12" height="22" rx="2" fill="#facc15" stroke="#fef08a" strokeWidth="1.5" />
            <rect x="76" y="36" width="12" height="22" rx="2" fill="#facc15" stroke="#fef08a" strokeWidth="1.5" />
            <path d="M18 36C18 22 38 22 44 68M82 36C82 22 62 22 52 68" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          </g>
        )}

        {id === 'fusto_30l' && (
          <g>
            <rect x="26" y="22" width="48" height="64" rx="6" fill="#94a3b8" stroke="#e2e8f0" strokeWidth="2.5" />
            <rect x="24" y="36" width="52" height="6" rx="2" fill="#475569" />
            <rect x="24" y="62" width="52" height="6" rx="2" fill="#475569" />
            <path d="M46 22V12H54V22M40 14H60" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
            <text x="50" y="54" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="900">30L</text>
          </g>
        )}

        {id === 'alcoltest_esploso' && (
          <g transform="rotate(-12 50 50)">
            <path d="M22 64C16 48 28 34 34 26M78 64C84 48 72 34 66 26" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
            <rect x="32" y="26" width="36" height="60" rx="6" fill="#334155" stroke="#94a3b8" strokeWidth="2.5" />
            <rect x="38" y="12" width="8" height="14" fill="#cbd5e1" />
            <rect x="37" y="34" width="26" height="22" rx="2" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
            <text x="50" y="44" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="900">ERR</text>
            <text x="50" y="53" textAnchor="middle" fill="#facc15" fontSize="9" fontWeight="900">999</text>
            <circle cx="50" cy="70" r="5" fill="#22c55e" />
          </g>
        )}

        {id === 'chiavi_pub' && (
          <g>
            <circle cx="50" cy="24" r="10" stroke="#fbbf24" strokeWidth="3.5" fill="none" />
            <g transform="rotate(-22 50 30)">
              <circle cx="50" cy="40" r="8" fill="#d97706" stroke="#fef08a" strokeWidth="2" />
              <path d="M50 48V82M50 74H58M50 80H58" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" />
            </g>
            <g transform="rotate(20 50 30)">
              <circle cx="50" cy="40" r="8" fill="#b45309" stroke="#fef08a" strokeWidth="2" />
              <path d="M50 48V82M50 74H58M50 80H58" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          </g>
        )}

        {id === 'cintura_pesi_massimi' && (
          <g>
            <path d="M10 40L90 40L84 64L16 64L10 40Z" fill="#1c1917" stroke="#fbbf24" strokeWidth="2" />
            <ellipse cx="50" cy="52" rx="24" ry="18" fill="#eab308" stroke="#fef08a" strokeWidth="2.5" />
            <circle cx="20" cy="52" r="5" fill="#d97706" />
            <circle cx="80" cy="52" r="5" fill="#d97706" />
            <text x="50" y="56" textAnchor="middle" fill="#451a03" fontSize="12" fontWeight="900">🍺🍺</text>
          </g>
        )}

        {id === 'cittadino_74' && (
          <g>
            <rect x="20" y="16" width="60" height="68" rx="4" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
            <text x="50" y="30" textAnchor="middle" fill="#451a03" fontSize="6.2" fontWeight="900">CITTADINO DEL 74</text>
            <path d="M28 40H72M28 47H72M28 54H60" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="36" cy="70" r="8" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
            <circle cx="64" cy="68" r="9" fill="#eab308" stroke="#78350f" strokeWidth="1.5" />
            <text x="64" y="71.5" textAnchor="middle" fill="#451a03" fontSize="8.5" fontWeight="900">74</text>
          </g>
        )}

        {id === 'busto_mario' && (
          <g>
            <rect x="16" y="10" width="68" height="80" rx="12" fill="#451a03" stroke="#fde047" strokeWidth="3" />
            <path d="M30 74L70 74L64 60H36L30 74Z" fill="#eab308" stroke="#fef08a" strokeWidth="1.5" />
            <rect x="34" y="74" width="32" height="8" rx="2" fill="#ca8a04" stroke="#fef08a" strokeWidth="1.5" />
            <ellipse cx="50" cy="40" rx="15" ry="18" fill="#facc15" stroke="#fef08a" strokeWidth="1.8" />
            <path d="M36 42C36 52 42 58 50 58C58 58 64 52 64 42C60 46 40 46 36 42Z" fill="#a16207" />
            <path d="M33 34L40 24M67 34L60 24" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
}

export default function Chiosco() {
  const [activeCategory, setActiveCategory] = useState('cavatappi'); // 'cavatappi' | 'calici' | 'cimeli'
  const [inspectedItem, setInspectedItem] = useState(null);

  const currentItems = CHIOSCO_ITEMS[activeCategory] || [];

  return (
    <div className="space-y-4">
      {/* INTESTAZIONE DEL CHIOSCO */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-3.5 space-y-1 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Chiosco Ufficiale • Collezione 24 Pezzi
          </span>
          <span className="text-[9px] font-mono uppercase bg-slate-950 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Lock className="w-3 h-3" /> Anteprima
          </span>
        </div>
        <p className="text-[11px] text-slate-300">
          Tocca qualsiasi oggetto per aprirlo a tutto schermo e leggere la scheda tecnica!
        </p>
      </div>

      {/* SELETTORE DELLE 3 CATEGORIE */}
      <div className="grid grid-cols-3 gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
        {[
          { id: 'cavatappi', label: '🍾 Cavatappi' },
          { id: 'calici', label: '🍺 Calici Speciali' },
          { id: 'cimeli', label: '🏆 Cimeli' }
        ].map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`py-2.5 px-2 rounded-xl text-[11px] font-black uppercase tracking-tight transition ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* GRIGLIA 2x4 DEGLI 8 OGGETTI DELLA CATEGORIA */}
      <div className="grid grid-cols-2 gap-3">
        {currentItems.map(item => {
          const rStyle = RARITY_CONFIG[item.rarity];
          return (
            <div
              key={item.id}
              onClick={() => setInspectedItem(item)}
              className={`bg-gradient-to-b ${rStyle.cardBg} border-2 ${rStyle.cardBorder} rounded-2xl p-3 flex flex-col items-center text-center cursor-pointer transition active:scale-95 relative overflow-hidden`}
            >
              {/* Targhetta Rarità */}
              <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border ${rStyle.badgeClass} shadow-sm mb-2`}>
                {rStyle.label}
              </span>

              {/* Illustrazione Oggetto */}
              <div className="my-1 relative flex items-center justify-center">
                <div className={`w-16 h-16 rounded-full blur-xl absolute ${rStyle.glow}`} />
                <ChioscoItemArtwork id={item.id} size="md" />
              </div>

              {/* Nome Oggetto */}
              <h4 className="text-xs font-black text-white mt-1.5 leading-tight line-clamp-1">
                {item.name}
              </h4>

              {/* Stato Bloccato */}
              <div className="mt-2.5 w-full py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-400 text-[10px] font-black uppercase flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-amber-400" /> Bloccato
              </div>
            </div>
          );
        })}
      </div>

      {/* MODALE ISPEZIONE CARTA GIGANTE (STILE CLASH ROYALE / FIFA) */}
      {inspectedItem && (() => {
        const rStyle = RARITY_CONFIG[inspectedItem.rarity];
        return (
          <div
            onClick={() => setInspectedItem(null)}
            className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`bg-gradient-to-b ${rStyle.modalBg} border-2 ${rStyle.modalBorder} rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative overflow-hidden`}
            >
              {/* Tasto Chiudi in alto a destra */}
              <button
                type="button"
                onClick={() => setInspectedItem(null)}
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-950/80 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Categoria & Targhetta Rarità */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                  {inspectedItem.categoryLabel}
                </span>
                <span className={`text-[11px] font-black uppercase px-3.5 py-0.5 rounded-full border inline-block ${rStyle.badgeClass} shadow-md`}>
                  {rStyle.label}
                </span>
              </div>

              {/* Palco Centrale Gigante per l'Oggetto */}
              <div className="py-3 relative flex items-center justify-center">
                <div className={`w-36 h-36 rounded-full blur-2xl absolute ${rStyle.glow}`} />
                <ChioscoItemArtwork id={inspectedItem.id} size="xl" />
              </div>

              {/* Titolo & Descrizione Divertente */}
              <div className="space-y-2 bg-slate-950/80 border border-white/10 rounded-2xl p-4">
                <h2 className={`text-lg font-black uppercase tracking-wide ${rStyle.textAccent}`}>
                  {inspectedItem.name}
                </h2>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  "{inspectedItem.desc}"
                </p>
              </div>

              {/* Pulsante Bloccato */}
              <div className="space-y-2 pt-1">
                <div className="w-full py-3.5 rounded-2xl bg-slate-950 border border-slate-700 text-slate-300 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-inner">
                  <Lock className="w-4 h-4 text-amber-400" />
                  Bloccato
                </div>
                <button
                  type="button"
                  onClick={() => setInspectedItem(null)}
                  className="w-full py-2 text-[11px] font-bold uppercase text-slate-400 hover:text-white"
                >
                  Torna al Chiosco
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}