import React, { useState } from 'react';
import { Lock, Sparkles, X, Award, Wrench, Info } from 'lucide-react';

// ============================================================================
// 🎨 CONFIGURAZIONE RARITÀ (COMUNE, RARO, MITICO, LEGGENDARIO)
// ============================================================================
const RARITY_STYLES = {
  COMUNE: {
    label: 'COMUNE',
    badgeBg: 'bg-emerald-500 text-slate-950',
    textAccent: 'text-emerald-400',
    cardBorder: 'border-emerald-500/40 hover:border-emerald-400',
    cardBg: 'from-emerald-950/40 via-slate-900 to-slate-950',
    glow: 'shadow-emerald-500/10',
    modalGlow: 'shadow-[0_0_50px_rgba(16,185,129,0.35)] border-emerald-400',
    radialBg: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(15,23,42,0) 70%)'
  },
  RARO: {
    label: 'RARO',
    badgeBg: 'bg-sky-400 text-slate-950',
    textAccent: 'text-sky-400',
    cardBorder: 'border-sky-400/50 hover:border-sky-300',
    cardBg: 'from-sky-950/50 via-slate-900 to-slate-950',
    glow: 'shadow-sky-500/15',
    modalGlow: 'shadow-[0_0_55px_rgba(56,189,248,0.4)] border-sky-400',
    radialBg: 'radial-gradient(circle, rgba(56,189,248,0.28) 0%, rgba(15,23,42,0) 70%)'
  },
  MITICO: {
    label: 'MITICO',
    badgeBg: 'bg-purple-500 text-white',
    textAccent: 'text-purple-400',
    cardBorder: 'border-purple-500/60 hover:border-purple-400',
    cardBg: 'from-purple-950/55 via-slate-900 to-slate-950',
    glow: 'shadow-purple-500/20',
    modalGlow: 'shadow-[0_0_65px_rgba(168,85,247,0.45)] border-purple-400',
    radialBg: 'radial-gradient(circle, rgba(168,85,247,0.32) 0%, rgba(15,23,42,0) 70%)'
  },
  LEGGENDARIO: {
    label: 'LEGGENDARIO',
    badgeBg: 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950',
    textAccent: 'text-amber-400',
    cardBorder: 'border-amber-400/80 hover:border-yellow-300',
    cardBg: 'from-amber-500/25 via-slate-900 to-slate-950',
    glow: 'shadow-amber-500/30',
    modalGlow: 'shadow-[0_0_80px_rgba(251,191,36,0.55)] border-amber-400',
    radialBg: 'radial-gradient(circle, rgba(251,191,36,0.38) 0%, rgba(15,23,42,0) 70%)'
  }
};

// Distinzione per categoria (mostrata quando clicchi l'oggetto)
const CATEGORY_META = {
  cavatappi: {
    badge: '🍾 Utensile da Stappata',
    usage: 'Equipaggiabile nel profilo per personalizzare la tua scheda nella sezione Stappa!',
    statLabel: 'Stile di Stappata'
  },
  calici: {
    badge: '🍺 Calice Speciale Avatar',
    usage: 'Equipaggiabile al posto degli 8 bicchieri standard vicino al tuo nome in Classifica F1 e in Sala VAR!',
    statLabel: 'Prestigio al Bancone'
  },
  cimeli: {
    badge: '🏆 Cimelio da Bacheca',
    usage: 'Esponibile nella tua Bacheca Pilota personale visibile a tutti i membri della lega!',
    statLabel: 'Livello Leggenda'
  }
};

// ============================================================================
// 📦 CATALOGO UFFICIALE DEI 24 OGGETTI CON DESCRIZIONI E CARATTERISTICHE
// ============================================================================
const CHIOSCO_ITEMS = {
  cavatappi: [
    {
      id: 'accendino',
      name: 'Accendino Ignorante',
      rarity: 'COMUNE',
      perk: 'Leva da Marciapiede • +100% Ignoranza',
      desc: 'Il classico Bic giallo consumato fino all’osso: leva fisica pura sul collo della bottiglia, nocca d’acciaio e tappo spedito direttamente in orbita col botto.'
    },
    {
      id: 'cucchiaio',
      name: 'Cucchiaio Ignorante',
      rarity: 'COMUNE',
      perk: 'Fisica Applicata • Salva-Serata',
      desc: 'Sottratto furtivamente dal cassetto della cucina a mezzanotte. Quando nessuno ha il cavatappi, l’ingegneria domestica da bancone trionfa sempre.'
    },
    {
      id: 'bar_blade',
      name: 'Bar Blade Pro',
      rarity: 'RARO',
      perk: 'Estrazione Rapida • Stile Bartender',
      desc: 'Piastra piatta professionale in acciaio inox temprato con impugnatura rossa antiscivolo e foro rotante per il dito. Stappata fulminea da pub irlandese.'
    },
    {
      id: 'oste_legno',
      name: 'Oste in Legno',
      rarity: 'RARO',
      perk: 'Rovere Invecchiato • Presa Tradizionale',
      desc: 'Impugnatura ergonomica tornita a mano dal legno massello di una botte di rovere, doppia ghiera in ottone rivettato e becco stappatore indistruttibile.'
    },
    {
      id: 'pitstop_f1',
      name: 'Pit-Stop F1 Carbon',
      rarity: 'MITICO',
      perk: 'Telaio in Carbonio • Pit-Stop 1.8s',
      desc: 'Forgiato in vera fibra di carbonio intrecciata con profili Rosso Scuderia. Progettato in galleria del vento per stappare 4 birre nel tempo di un cambio gomme.'
    },
    {
      id: 'zanna_drago',
      name: 'Zanna del Drago',
      rarity: 'MITICO',
      perk: 'Reliquia Draconica • +50 Aura Mitica',
      desc: 'Artiglio ricurvo in avorio antico con crepe da battaglia, stretto nelle fauci di un drago d’oro e bronzo dagli occhi di rubino. Nessun tappo a corona gli resiste.'
    },
    {
      id: 'cavatappi_mario',
      name: 'Cavatappi Mario',
      rarity: 'LEGGENDARIO',
      perk: 'Edizione "THE BOYS" • Sguardo Giudicante',
      desc: 'L’icona assoluta del gruppo con la leggendaria maglia "THE BOYS", sguardo laterale vigile e piastra stappatrice d’acciaio pesante incastonata nel mito.'
    },
    {
      id: 'reale_24k',
      name: 'Reale 24 Carati',
      rarity: 'LEGGENDARIO',
      perk: 'Oro Massiccio 24k • Diamante Imperiale',
      desc: 'Cavatappi reale a doppia leva cesellato in oro zecchino 24 carati, impugnatura a corona, ingranaggi di precisione e diamante azzurro al centro.'
    }
  ],
  calici: [
    {
      id: 'krug_ceramica',
      name: 'Krug Ceramica',
      rarity: 'COMUNE',
      perk: 'Gres Bavarese • Coperchio in Peltro',
      desc: 'Autentico Bierkrug di Monaco in gres porcellanato con rilievi blu cobalto, stemma dorato e coperchio a cupola in peltro con leva poggia-pollice.'
    },
    {
      id: 'boccale_vichingo',
      name: 'Boccale Vichingo',
      rarity: 'COMUNE',
      perk: 'Quercia & Ferro • Urlo del Valhalla',
      desc: 'Assemblato con doghe di quercia affumicata e cerchiato in ferro battuto inchiodato a mano. Perfetto per sbattere il boccale sul tavolo dopo ogni punto.'
    },
    {
      id: 'pinta_subzero',
      name: 'Pinta Sub-Zero',
      rarity: 'RARO',
      perk: 'Temperatura -18°C • Brina Perenne',
      desc: 'Pinta tenuta sotto chiave nel congelatore: pareti rivestite di cristalli di ghiaccio vivo e stalattiti polari che mantengono la birra gelida per ore.'
    },
    {
      id: 'das_boot',
      name: 'Das Boot 1L',
      rarity: 'RARO',
      perk: 'Capienza 1 Litro • Bolla d’Aria Fatale',
      desc: 'Il leggendario stivale di vetro tedesco da 1 Litro: chi non ruota la punta al momento giusto viene travolto dallo tsunami di schiuma finale!'
    },
    {
      id: 'corno_nord',
      name: 'Corno del Nord',
      rarity: 'MITICO',
      perk: 'Zero Base d’Appoggio • Bevuta Obbligata',
      desc: 'Corno cerimoniale levigato a specchio con ghiera runica in oro antico: non avendo una base piatta, ti costringe a finirlo tutto prima di poterlo posare.'
    },
    {
      id: 'teschio_cristallo',
      name: 'Teschio Cristallo',
      rarity: 'MITICO',
      perk: 'Cristallo di Boemia • Riflesso Ambrato',
      desc: 'Scolpito in un blocco unico di cristallo purissimo: a ogni sorso il livello della birra illumina le orbite del teschio con riflessi dorati.'
    },
    {
      id: 'boccale_f1',
      name: 'Boccale F1 Carbon',
      rarity: 'LEGGENDARIO',
      perk: 'Telemetria Live • Manometro Bar',
      desc: 'Boccale da Gran Premio in fibra di carbonio aerodinamica con livrea Rosso Corsa e manometro analogico laterale per misurare la pressione della schiuma.'
    },
    {
      id: 'calice_imperiale',
      name: 'Calice Imperiale',
      rarity: 'LEGGENDARIO',
      perk: 'Oro 24k & Rubini • Re della Classifica',
      desc: 'Coppa solenne in oro massiccio 24 carati tempestata di rubini imperiali. Il calice definitivo per chi guarda il resto della lega dall’alto della Pole Position.'
    }
  ],
  cimeli: [
    {
      id: 'sottobicchiere_74',
      name: 'Sottobicchiere "Sempre Noi al 74"',
      rarity: 'COMUNE',
      perk: 'Reliquia del Pub • Macchia Originale',
      desc: 'Il glorioso sottobicchiere in cartone pressato del pub "Sempre Noi al 74", completo di timbro storico e macchia circolare di boccale certificata.'
    },
    {
      id: 'casco_bombardiere',
      name: 'Casco da Bombardiere',
      rarity: 'COMUNE',
      perk: 'Mani Libere • Doppio Iniettore',
      desc: 'Elmetto rosso da assalto serale con doppio alloggiamento laterale per lattine e tubicini di pescaggio diretto: permette di bere e votare al VAR contemporaneamente.'
    },
    {
      id: 'fusto_30l',
      name: 'Fusto Emergenza 30L',
      rarity: 'RARO',
      perk: 'Scorta Strategica • 30 Litri Puri',
      desc: 'Fusto corazzato in acciaio inox da 30 Litri con attacco rapido da pub. Da sbloccare quando il frigo piange e la serata è ancora lunga.'
    },
    {
      id: 'alcoltest_esploso',
      name: 'Alcoltest Esploso',
      rarity: 'RARO',
      perk: 'Fuori Scala "ERR 999" • Cortocircuito',
      desc: 'Etilometro digitale andato in tilt tra scintille, fumo e fiamme vive dopo aver tentato di misurare il tasso alcolico del sabato sera.'
    },
    {
      id: 'chiavi_pub',
      name: 'Chiavi del Pub',
      rarity: 'MITICO',
      perk: 'Chiusura Locale • Accesso VIP',
      desc: 'Mazzo di chiavi antiche in oro massiccio con l’emblema del luppolo: vengono consegnate solo a chi resta in piedi fino alla chiusura della saracinesca.'
    },
    {
      id: 'cintura_pesi_massimi',
      name: 'Cintura Pesi Massimi',
      rarity: 'MITICO',
      perk: 'Titolo Mondiale • Cuoio & Oro',
      desc: 'Cinturone da campione del mondo dei pesi massimi in cuoio nero borchiato con placca centrale d’oro e i due boccali brindanti di Sempre Noi.'
    },
    {
      id: 'cittadino_74',
      name: 'Cittadino Onorario del 74',
      rarity: 'LEGGENDARIO',
      perk: 'Immunità Diplomatica • Sigillo 74',
      desc: 'Pergamena ufficiale con sigillo in ceralacca rossa e timbro d’oro "74": conferisce le chiavi morali del civico più leggendario di sempre.'
    },
    {
      id: 'busto_mario',
      name: 'Busto d’Oro di Mario',
      rarity: 'LEGGENDARIO',
      perk: 'Monumento Immortale • MARIVS LXXIV',
      desc: 'Scultura imperiale in oro 24 carati con corona d’alloro, maglia "THE BOYS" scolpita nel metallo prezioso e sguardo eterno verso l’orizzonte.'
    }
  ]
};

// ============================================================================
// 🖌️ MOTORE GRAFICO SVG AD ALTA DEFINIZIONE PER I 24 OGGETTI
// ============================================================================
function ChioscoItemArtwork({ id, size = 'md' }) {
  const sizeClass = size === 'xl' ? 'w-52 h-52' : 'w-24 h-24';

  return (
    <div className={`${sizeClass} flex items-center justify-center relative select-none`}>
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.7)]">
        <defs>
          {/* Oro 24 Carati Multi-Riflesso */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="20%" stopColor="#fde047" />
            <stop offset="45%" stopColor="#eab308" />
            <stop offset="75%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>
          <linearGradient id="goldDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#713f12" />
          </linearGradient>
          {/* Ottone Antico */}
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#d97706" />
            <stop offset="80%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          {/* Acciaio Inox & Peltro */}
          <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#cbd5e1" />
            <stop offset="75%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          {/* Gres Porcellanato Krug */}
          <linearGradient id="stonewareGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="30%" stopColor="#f1f5f9" />
            <stop offset="65%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          {/* Legno di Rovere 3D */}
          <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="28%" stopColor="#b45309" />
            <stop offset="52%" stopColor="#d97706" />
            <stop offset="80%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#290f02" />
          </linearGradient>
          {/* Avorio Zanna */}
          <linearGradient id="ivoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#fef3c7" />
            <stop offset="80%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          {/* Ghiaccio */}
          <linearGradient id="iceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          {/* Birra Ambrata */}
          <linearGradient id="beerAmber" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="55%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          {/* Carnagione Mario */}
          <linearGradient id="marioSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="60%" stopColor="#fdba74" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.55" />
          </linearGradient>
          {/* Trama Fibra di Carbonio */}
          <pattern id="carbonPattern" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#0f172a" />
            <path d="M0 0L6 6M6 0L0 6" stroke="#334155" strokeWidth="1.1" />
          </pattern>
        </defs>

        {/* ===================== 1. CAVATAPPI (8) ===================== */}

        {/* 1. ACCENDINO IGNORANTE */}
        {id === 'accendino' && (
          <g transform="rotate(14 60 65)">
            <path d="M60 8C50 20 51 31 60 35C69 31 70 20 60 8Z" fill="#f97316" />
            <path d="M60 13C54 22 55 30 60 34C65 30 66 22 60 13Z" fill="#facc15" />
            <path d="M60 21C57 26 58 31 60 33C62 31 63 26 60 21Z" fill="#e0f2fe" />
            <rect x="44" y="34" width="22" height="14" rx="2" fill="url(#steelGrad)" stroke="#475569" strokeWidth="1.5" />
            <circle cx="67" cy="40" r="5" fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
            <rect x="64" y="44" width="12" height="5" rx="1.5" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1" />
            <rect x="42" y="48" width="34" height="56" rx="5" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            <rect x="46" y="52" width="6" height="48" rx="2" fill="#fef08a" opacity="0.65" />
            <path d="M44 96L52 93M45 100L55 98" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}

        {/* 2. CUCCHIAIO IGNORANTE */}
        {id === 'cucchiaio' && (
          <g transform="rotate(-28 60 60)">
            <path d="M56 54L52 104C52 109 68 109 68 104L64 54Z" fill="url(#steelGrad)" stroke="#475569" strokeWidth="2" />
            <path d="M57 62V98" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <ellipse cx="60" cy="34" rx="17" ry="23" fill="url(#steelGrad)" stroke="#475569" strokeWidth="2" />
            <ellipse cx="58" cy="33" rx="11" ry="16" fill="#94a3b8" opacity="0.55" />
            <path d="M52 22C50 28 51 38 55 44" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <g transform="translate(24, -6) rotate(25)">
              <circle cx="15" cy="15" r="9" fill="url(#goldGrad)" stroke="#b45309" strokeWidth="1.5" strokeDasharray="2 1" />
              <path d="M2 22L10 18" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        )}

        {/* 3. BAR BLADE PRO */}
        {id === 'bar_blade' && (
          <g transform="rotate(-35 60 60)">
            <rect x="44" y="10" width="32" height="100" rx="16" fill="url(#steelGrad)" stroke="#334155" strokeWidth="2.2" />
            <rect x="50" y="18" width="20" height="18" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
            <path d="M53 36H67" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M44 54H76V94C76 103 69 110 60 110C51 110 44 103 44 94V54Z" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2" />
            <circle cx="60" cy="92" r="8" fill="#0f172a" stroke="url(#steelGrad)" strokeWidth="3" />
            <path d="M49 40L71 48" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </g>
        )}

        {/* 4. OSTE IN LEGNO (POTENZIATO: REALISTICO CON VENATURE 3D, OTTONE BRUNITO E GANCIO) */}
        {id === 'oste_legno' && (
          <g transform="rotate(-32 60 60)">
            {/* Ombra esterna morbida */}
            <ellipse cx="60" cy="60" rx="22" ry="52" fill="#000000" opacity="0.25" />
            {/* Testa stappatrice sagomata in ottone massiccio */}
            <path d="M45 44V24C45 9 75 9 75 24V44Z" fill="url(#brassGrad)" stroke="#451a03" strokeWidth="2.2" />
            {/* Riflesso metallico sull'arco superiore */}
            <path d="M49 22C50 13 70 13 71 22" fill="none" stroke="#fef9c3" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            {/* Apertura interna con dentino leva */}
            <path d="M50 25C50 17 70 17 70 25C70 31 66 34 65 34L63 30H57L55 34C54 34 50 31 50 25Z" fill="#090d16" stroke="#78350f" strokeWidth="1.5" />
            {/* Dentino metallico lucido che aggancia il tappo */}
            <path d="M55 34L57 29H63L65 34Z" fill="url(#goldGrad)" stroke="#451a03" strokeWidth="1" />

            {/* Ghiera superiore in ottone tornito con rivetti */}
            <rect x="42" y="42" width="36" height="8" rx="2.5" fill="url(#goldGrad)" stroke="#451a03" strokeWidth="1.8" />
            <circle cx="48" cy="46" r="1.5" fill="#451a03" />
            <circle cx="60" cy="46" r="1.5" fill="#451a03" />
            <circle cx="72" cy="46" r="1.5" fill="#451a03" />

            {/* Manico ergonomico bombato in legno di botte di rovere */}
            <path d="M44 50C36 68 37 88 45 104H75C83 88 84 68 76 50Z" fill="url(#woodGrad)" stroke="#290f02" strokeWidth="2.2" />
            {/* Luce laterale 3D sul legno */}
            <path d="M49 52C44 68 44 86 49 102" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
            {/* Venature realistiche e nodi del legno */}
            <path d="M55 50C52 66 53 84 55 104" fill="none" stroke="#451a03" strokeWidth="1.5" opacity="0.75" />
            <path d="M64 50C67 64 66 78 63 104" fill="none" stroke="#451a03" strokeWidth="1.5" opacity="0.75" />
            <ellipse cx="64" cy="74" rx="2.5" ry="4.5" fill="#451a03" opacity="0.65" />
            {/* Fascia centrale stile botte */}
            <path d="M40 74C52 77 68 77 80 74" fill="none" stroke="url(#goldGrad)" strokeWidth="3.2" />
            <path d="M40 74C52 77 68 77 80 74" fill="none" stroke="#451a03" strokeWidth="0.8" />

            {/* Pomello inferiore in ottone con anello da oste */}
            <rect x="44" y="102" width="32" height="6" rx="2" fill="url(#goldGrad)" stroke="#451a03" strokeWidth="1.8" />
            <circle cx="60" cy="111" r="4.5" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" />
          </g>
        )}

        {/* 5. PIT-STOP F1 CARBON */}
        {id === 'pitstop_f1' && (
          <g transform="rotate(-35 60 60)">
            <path d="M43 22C43 11 77 11 77 22C77 32 70 40 70 60C70 80 77 88 77 98C77 109 43 109 43 98C43 88 50 80 50 60C50 40 43 32 43 22Z" fill="url(#carbonPattern)" stroke="#ef4444" strokeWidth="3" />
            <circle cx="60" cy="24" r="9" fill="#020617" stroke="url(#steelGrad)" strokeWidth="2.5" />
            <rect x="55" y="29" width="10" height="4" fill="#cbd5e1" />
            <circle cx="60" cy="96" r="8" fill="#020617" stroke="#ef4444" strokeWidth="2" />
            <path d="M54 52H66L63 68H51Z" fill="#ef4444" />
            <text x="59" y="63" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="900">F1</text>
          </g>
        )}

        {/* 6. ZANNA DEL DRAGO (POTENZIATO: TESTA DI DRAGO SCOLPITA + ZANNA D'AVORIO E GANCIO) */}
        {id === 'zanna_drago' && (
          <g>
            {/* Bagliore di fuoco draconico sullo sfondo */}
            <circle cx="62" cy="52" r="38" fill="#ea580c" opacity="0.15" />

            {/* Gancio Apribottiglie Superiore a forma di Artiglio Draconico in Oro/Bronzo */}
            <path d="M64 10C84 10 98 22 95 38C93 48 82 54 71 50L68 42C76 44 83 41 85 35C86 27 79 20 67 21L71 27L59 27Z" fill="url(#goldGrad)" stroke="#451a03" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M68 14C82 14 91 23 90 34" fill="none" stroke="#fef9c3" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />

            {/* Corna Posteriori del Drago */}
            <path d="M52 30C40 22 30 18 22 20C28 27 36 33 46 37Z" fill="url(#brassGrad)" stroke="#451a03" strokeWidth="1.8" />
            <path d="M58 25C48 14 38 10 30 11C35 19 43 25 52 30Z" fill="url(#goldGrad)" stroke="#451a03" strokeWidth="1.8" />

            {/* Testa Scolpita del Drago (Elsa in Oro & Bronzo Antico) */}
            <path d="M44 36L64 24L80 34L76 52L62 60L44 50Z" fill="url(#goldGrad)" stroke="#451a03" strokeWidth="2.2" strokeLinejoin="round" />
            {/* Squame in rilievo sulla testa */}
            <path d="M48 40Q54 36 58 42M54 46Q60 42 64 48M48 48Q54 45 57 51" fill="none" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" />
            {/* Cresta sopraccigliare e Occhio di Rubino Infuocato */}
            <path d="M59 33L71 30L68 38Z" fill="#78350f" />
            <polygon points="61,36 68,34 66,39 60,39" fill="#dc2626" stroke="#fef08a" strokeWidth="1" />
            <circle cx="64" cy="36.5" r="1" fill="#ffffff" />

            {/* Denti aguzzi del drago che mordono l'attacco della zanna */}
            <polygon points="46,50 49,57 53,52" fill="#fef3c7" stroke="#451a03" strokeWidth="1" />
            <polygon points="53,52 56,60 60,55" fill="#fef3c7" stroke="#451a03" strokeWidth="1" />
            <polygon points="60,55 64,62 67,56" fill="#fef3c7" stroke="#451a03" strokeWidth="1" />

            {/* Grande Zanna Ricurva in Avorio Antico con Sfumatura 3D */}
            <path d="M46 50C34 70 24 88 14 106C38 104 62 86 68 56Z" fill="url(#ivoryGrad)" stroke="#451a03" strokeWidth="2.4" strokeLinejoin="round" />
            {/* Riflesso lucido lungo la curvatura della zanna */}
            <path d="M49 55C39 73 30 88 20 101" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
            {/* Crepe e striature naturali dell'avorio */}
            <path d="M58 68L51 71L54 75M46 84L39 86" fill="none" stroke="#78350f" strokeWidth="1.4" strokeLinecap="round" />
          </g>
        )}

        {/* 7. CAVATAPPI MARIO (CON MAGLIA "THE BOYS" E SGUARDO LATERALE) */}
        {id === 'cavatappi_mario' && (
          <g>
            <circle cx="60" cy="54" r="46" fill="#581c87" fillOpacity="0.35" stroke="url(#goldGrad)" strokeWidth="2" />
            <path d="M22 96C24 76 38 70 60 70C82 70 96 76 98 96Z" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
            <path d="M45 70C50 77 70 77 75 70" fill="none" stroke="#334155" strokeWidth="3" />
            <text x="74" y="83" textAnchor="middle" fill="#f8fafc" fontSize="5.2" fontWeight="900" letterSpacing="0.3">THE</text>
            <text x="75" y="90" textAnchor="middle" fill="#ffffff" fontSize="8.2" fontWeight="900" letterSpacing="-0.4">BOYS</text>

            <ellipse cx="34" cy="46" rx="4.5" ry="7" fill="url(#marioSkin)" stroke="#9a3412" strokeWidth="1.2" />
            <ellipse cx="86" cy="46" rx="4.5" ry="7" fill="url(#marioSkin)" stroke="#9a3412" strokeWidth="1.2" />

            <path d="M36 38C36 17 84 17 84 38C85 57 76 71 60 71C44 71 35 57 36 38Z" fill="url(#marioSkin)" stroke="#9a3412" strokeWidth="1.5" />
            <ellipse cx="53" cy="24" rx="11" ry="4.5" fill="#ffffff" opacity="0.45" transform="rotate(-10 53 24)" />

            <path d="M36 42C35 33 38 26 42 24C39 30 39 37 39 44Z" fill="#27272a" />
            <path d="M84 42C85 33 82 26 78 24C81 30 81 37 81 44Z" fill="#27272a" />

            <path d="M43 36C47 33.5 53 34 56 36" stroke="#18181b" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <path d="M64 36C67 34 73 33.5 77 36" stroke="#18181b" strokeWidth="2.6" strokeLinecap="round" fill="none" />

            <ellipse cx="49.5" cy="41.5" rx="4.8" ry="3.4" fill="#ffffff" stroke="#451a03" strokeWidth="1" />
            <circle cx="51.3" cy="41.5" r="2.3" fill="#1c1917" />
            <circle cx="52" cy="40.7" r="0.8" fill="#ffffff" />

            <ellipse cx="70.5" cy="41.5" rx="4.8" ry="3.4" fill="#ffffff" stroke="#451a03" strokeWidth="1" />
            <circle cx="72.3" cy="41.5" r="2.3" fill="#1c1917" />
            <circle cx="73" cy="40.7" r="0.8" fill="#ffffff" />

            <path d="M58 41V49C56 51 64 51 62 49" fill="none" stroke="#9a3412" strokeWidth="1.8" strokeLinecap="round" />

            <path d="M36 46C36 62 45 72 60 72C75 72 84 62 84 46C81 52 77 55 71 54C68 50 52 50 49 54C43 55 39 52 36 46Z" fill="#27272a" stroke="#09090b" strokeWidth="1.2" />
            <path d="M53 56C57 54.5 63 54.5 67 56C65 60 55 60 53 56Z" fill="#450a0a" stroke="#fca5a5" strokeWidth="0.8" />

            <rect x="42" y="90" width="36" height="22" rx="10" fill="url(#steelGrad)" stroke="#1e293b" strokeWidth="2.2" />
            <ellipse cx="60" cy="101" rx="10" ry="5.5" fill="#020617" />
            <rect x="55" y="94" width="10" height="4" rx="1" fill="#e2e8f0" />
          </g>
        )}

        {/* 8. REALE 24 CARATI (POTENZIATO: CAVATAPPI REALE IN ORO 24K CON CORONA, ALI SCOLPITE E DIAMANTE) */}
        {id === 'reale_24k' && (
          <g>
            {/* Aura dorata regale */}
            <circle cx="60" cy="56" r="42" fill="#facc15" opacity="0.14" />

            {/* Impugnatura superiore a Corona + Apribottiglie Reale */}
            <path d="M42 22C42 9 78 9 78 22C78 30 70 34 60 34C50 34 42 30 42 22Z" fill="url(#goldGrad)" stroke="#713f12" strokeWidth="2.2" />
            <path d="M48 21C48 14 72 14 72 21C72 26 66 28 60 28C54 28 48 26 48 21Z" fill="#090d16" />
            {/* Piccole punte di corona e rubini */}
            <polygon points="46,13 50,7 54,12 60,5 66,12 70,7 74,13" fill="url(#goldGrad)" stroke="#713f12" strokeWidth="1.2" />
            <circle cx="60" cy="9" r="2" fill="#dc2626" />

            {/* Colonna centrale con cremagliera cesellata */}
            <rect x="52" y="33" width="16" height="32" rx="3" fill="url(#goldGrad)" stroke="#713f12" strokeWidth="2" />
            <path d="M52 39H55M52 44H55M52 49H55M65 39H68M65 44H68M65 49H68" stroke="#713f12" strokeWidth="1.8" />

            {/* Ali Laterali Reali Sagomate (Bracci a leva 3D) */}
            <path d="M52 38L20 74C17 78 22 85 27 82L52 54Z" fill="url(#goldGrad)" stroke="#713f12" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M68 38L100 74C103 78 98 85 93 82L68 54Z" fill="url(#goldGrad)" stroke="#713f12" strokeWidth="2.2" strokeLinejoin="round" />
            {/* Intagli decorativi sulle ali */}
            <path d="M46 47L27 72" stroke="#fef9c3" strokeWidth="2" strokeLinecap="round" />
            <path d="M74 47L93 72" stroke="#fef9c3" strokeWidth="2" strokeLinecap="round" />

            {/* Campana inferiore cesellata */}
            <path d="M47 64H73L69 78H51Z" fill="url(#goldDark)" stroke="#fef08a" strokeWidth="1.5" />

            {/* Diamante Azzurro Imperiale Sfaccettato nel Perno Centrale */}
            <polygon points="60,40 68,48 60,56 52,48" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
            <polygon points="60,43 65,48 60,53 55,48" fill="#7dd3fc" />
            <circle cx="58" cy="46" r="1.5" fill="#ffffff" />

            {/* Spirale / Verme Elicoidale 3D in Oro 24k */}
            <path d="M60 78C53 82 67 86 60 91C53 95 67 99 60 104C55 107 61 111 60 115" stroke="#713f12" strokeWidth="4.8" fill="none" strokeLinecap="round" />
            <path d="M60 78C53 82 67 86 60 91C53 95 67 99 60 104C55 107 61 111 60 115" stroke="url(#goldGrad)" strokeWidth="2.8" fill="none" strokeLinecap="round" />

            {/* Scintille di lusso */}
            <path d="M22 28L30 28M26 24L26 32M90 24L98 24M94 20L94 28M86 92L94 92M90 88L90 96" stroke="#fef9c3" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* ===================== 2. CALICI SPECIALI (8) ===================== */}

        {/* 9. KRUG CERAMICA (POTENZIATO: BIERKRUG BAVARESE 3D CON COPERCHIO IN PELTRO E MEDAGLIONE) */}
        {id === 'krug_ceramica' && (
          <g>
            {/* Manico sagomato in gres con ombreggiatura */}
            <path d="M78 44H93C99 44 102 50 102 66C102 82 99 88 93 88H78" fill="none" stroke="#334155" strokeWidth="8.5" strokeLinecap="round" />
            <path d="M78 44H93C99 44 102 50 102 66C102 82 99 88 93 88H78" fill="none" stroke="url(#stonewareGrad)" strokeWidth="5.5" strokeLinecap="round" />

            {/* Meccanismo cerniera e Leva Poggia-Pollice in Peltro (Daumendrücker) */}
            <rect x="80" y="34" width="10" height="10" rx="2" fill="url(#steelGrad)" stroke="#1e293b" strokeWidth="1.5" />
            <path d="M84 36C92 34 98 28 101 22C95 22 89 27 83 33Z" fill="url(#steelGrad)" stroke="#1e293b" strokeWidth="1.5" />

            {/* Coperchio a Cupola in Peltro Cesellato (Zinndeckel) a 3 livelli */}
            <path d="M31 37C33 20 81 20 83 37Z" fill="url(#steelGrad)" stroke="#1e293b" strokeWidth="2.2" />
            <path d="M40 24C44 16 70 16 74 24Z" fill="url(#steelGrad)" stroke="#1e293b" strokeWidth="1.8" />
            {/* Riflesso lucido sulla cupola in peltro */}
            <path d="M38 34C40 24 52 22 56 22" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
            {/* Pinnacolo superiore in peltro */}
            <circle cx="57" cy="13" r="4.5" fill="url(#steelGrad)" stroke="#1e293b" strokeWidth="1.8" />
            <rect x="29" y="35" width="56" height="4.5" rx="2" fill="url(#steelGrad)" stroke="#1e293b" strokeWidth="1.5" />

            {/* Corpo Cilindrico 3D in Gres Porcellanato */}
            <path d="M31 39L28 102C28 106 86 106 86 102L83 39Z" fill="url(#stonewareGrad)" stroke="#1e293b" strokeWidth="2.4" />
            {/* Luce verticale cilindrica */}
            <rect x="40" y="41" width="9" height="60" fill="#ffffff" opacity="0.35" />

            {/* Bande Decorative in Rilievo Blu Cobalto con Losanghe Bavaresi */}
            <rect x="30" y="44" width="54" height="8" fill="#1e3a8a" stroke="#172554" strokeWidth="1.2" />
            <path d="M32 48L37 44L42 48L37 52Z M44 48L49 44L54 48L49 52Z M56 48L61 44L66 48L61 52Z M68 48L73 44L78 48L73 52Z" fill="#38bdf8" opacity="0.85" />

            <rect x="29" y="90" width="56" height="8" fill="#1e3a8a" stroke="#172554" strokeWidth="1.2" />
            <path d="M32 94L37 90L42 94L37 98Z M44 94L49 90L54 94L49 98Z M56 94L61 90L66 94L61 98Z M68 94L73 90L78 94L73 98Z" fill="#38bdf8" opacity="0.85" />

            {/* Medaglione Centrale Bavarese in Rilievo con Corona d'Oro e Boccale */}
            <circle cx="57" cy="71" r="15" fill="#1e3a8a" stroke="url(#goldGrad)" strokeWidth="3" />
            <circle cx="57" cy="71" r="11" fill="none" stroke="#fef08a" strokeWidth="1" strokeDasharray="2 2" />
            {/* Piccolo boccale dorato nello stemma */}
            <rect x="52" y="66" width="9" height="11" rx="1.5" fill="url(#goldGrad)" stroke="#451a03" strokeWidth="1" />
            <path d="M51 66C51 63 62 63 62 66Z" fill="#ffffff" />

            {/* Zoccolo inferiore tornito */}
            <path d="M26 102H88L86 108H28Z" fill="#64748b" stroke="#1e293b" strokeWidth="2" />
          </g>
        )}

        {/* 10. BOCCALE VICHINGO */}
        {id === 'boccale_vichingo' && (
          <g>
            <path d="M80 38H95C100 38 102 45 102 64C102 83 100 90 95 90H80" fill="none" stroke="#78350f" strokeWidth="7" strokeLinejoin="round" />
            <path d="M30 30C30 22 40 20 48 23C54 18 66 18 72 23C80 20 86 24 86 30Z" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
            <path d="M30 28L26 100H90L86 28Z" fill="url(#woodGrad)" stroke="#290f02" strokeWidth="2.5" />
            <path d="M42 28L40 100M58 28V100M74 28L76 100" stroke="#290f02" strokeWidth="1.8" />
            <rect x="28" y="40" width="60" height="7" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="26" y="82" width="64" height="8" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="36" cy="43.5" r="1.8" fill="#94a3b8" /><circle cx="58" cy="43.5" r="1.8" fill="#94a3b8" /><circle cx="80" cy="43.5" r="1.8" fill="#94a3b8" />
            <circle cx="36" cy="86" r="1.8" fill="#94a3b8" /><circle cx="58" cy="86" r="1.8" fill="#94a3b8" /><circle cx="80" cy="86" r="1.8" fill="#94a3b8" />
          </g>
        )}

        {/* 11. PINTA SUB-ZERO */}
        {id === 'pinta_subzero' && (
          <g>
            <path d="M32 24L38 102H82L88 24Z" fill="url(#iceGrad)" stroke="#bae6fd" strokeWidth="2.5" />
            <path d="M30 25C30 17 42 15 50 18C56 13 66 13 72 18C80 15 90 17 90 25Z" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.5" />
            <polygon points="32,25 36,48 41,25" fill="#e0f2fe" />
            <polygon points="44,25 49,58 55,25" fill="#e0f2fe" />
            <polygon points="65,25 70,52 76,25" fill="#e0f2fe" />
            <polygon points="78,25 83,44 88,25" fill="#e0f2fe" />
            <path d="M52 70L68 70M60 62L60 78M54 64L66 76M66 64L54 76" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* 12. DAS BOOT 1L */}
        {id === 'das_boot' && (
          <g>
            <path d="M36 18C36 11 46 10 54 12C62 10 72 11 72 18Z" fill="#ffffff" stroke="#fde68a" strokeWidth="1.5" />
            <path d="M38 18V74C38 82 36 96 36 102H94C102 102 104 90 96 86L70 76V18Z" fill="url(#beerAmber)" stroke="#fef08a" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="52" cy="50" r="2" fill="#fef9c3" /><circle cx="58" cy="64" r="1.5" fill="#fef9c3" /><circle cx="48" cy="80" r="2.2" fill="#fef9c3" /><circle cx="76" cy="92" r="2" fill="#fef9c3" />
            <path d="M35 105H96" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {/* 13. CORNO DEL NORD */}
        {id === 'corno_nord' && (
          <g>
            <path d="M70 18C68 58 48 82 16 92C44 104 84 86 98 24Z" fill="#fef3c7" stroke="#78350f" strokeWidth="2.5" />
            <path d="M74 28C70 60 52 82 24 91" stroke="#d97706" strokeWidth="2" fill="none" opacity="0.55" />
            <path d="M68 16L100 22L97 34L66 28Z" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" />
            <circle cx="16" cy="92" r="4.5" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.5" />
            <path d="M68 16C72 9 98 12 100 22Z" fill="#ffffff" />
          </g>
        )}

        {/* 14. TESCHIO CRISTALLO */}
        {id === 'teschio_cristallo' && (
          <g>
            <path d="M34 22C36 14 84 14 86 22Z" fill="#fffbeb" />
            <path d="M32 22C24 38 26 62 38 72L42 98H78L82 72C94 62 96 38 88 22Z" fill="url(#beerAmber)" stroke="#e0f2fe" strokeWidth="2.8" />
            <ellipse cx="47" cy="52" rx="9" ry="8" fill="#451a03" stroke="#fef08a" strokeWidth="2" />
            <ellipse cx="73" cy="52" rx="9" ry="8" fill="#451a03" stroke="#fef08a" strokeWidth="2" />
            <polygon points="60,58 55,70 65,70" fill="#451a03" />
            <path d="M44 82H76M44 90H76M50 76V96M57 76V96M63 76V96M70 76V96" stroke="#e0f2fe" strokeWidth="2" />
          </g>
        )}

        {/* 15. BOCCALE F1 CARBON */}
        {id === 'boccale_f1' && (
          <g>
            <path d="M80 34H96C101 34 103 42 103 62C103 82 101 90 96 90H80" fill="none" stroke="#ef4444" strokeWidth="6" />
            <path d="M28 24C28 16 84 16 84 24Z" fill="#ffffff" />
            <rect x="28" y="24" width="54" height="78" rx="6" fill="url(#carbonPattern)" stroke="#ef4444" strokeWidth="2.5" />
            <rect x="38" y="24" width="7" height="78" fill="#ef4444" />
            <circle cx="63" cy="70" r="12" fill="#f8fafc" stroke="url(#steelGrad)" strokeWidth="3" />
            <path d="M63 70L70 63" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="63" cy="70" r="2.2" fill="#0f172a" />
          </g>
        )}

        {/* 16. CALICE IMPERIALE */}
        {id === 'calice_imperiale' && (
          <g>
            <path d="M28 22C28 13 44 12 52 16C60 11 72 12 78 16C86 14 92 17 92 22Z" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
            <path d="M28 22C28 60 44 68 60 68C76 68 92 60 92 22Z" fill="url(#goldGrad)" stroke="#854d0e" strokeWidth="2.5" />
            <rect x="55" y="68" width="10" height="24" rx="2" fill="url(#goldGrad)" stroke="#854d0e" strokeWidth="2" />
            <path d="M36 102C42 90 78 90 84 102Z" fill="url(#goldGrad)" stroke="#854d0e" strokeWidth="2.5" />
            <ellipse cx="42" cy="40" rx="4.5" ry="6" fill="#dc2626" stroke="#fef08a" strokeWidth="1.5" />
            <ellipse cx="60" cy="42" rx="5.5" ry="7" fill="#dc2626" stroke="#fef08a" strokeWidth="1.5" />
            <ellipse cx="78" cy="40" rx="4.5" ry="6" fill="#dc2626" stroke="#fef08a" strokeWidth="1.5" />
            <circle cx="50" cy="98" r="3" fill="#dc2626" /><circle cx="70" cy="98" r="3" fill="#dc2626" />
          </g>
        )}

        {/* ===================== 3. CIMELI BACHECA (8) ===================== */}

        {/* 17. SOTTOBICCHIERE "SEMPRE NOI AL 74" */}
        {id === 'sottobicchiere_74' && (
          <g transform="rotate(-8 60 60)">
            <circle cx="60" cy="60" r="46" fill="#fde68a" stroke="#b45309" strokeWidth="3" />
            <circle cx="60" cy="60" r="40" fill="none" stroke="#92400e" strokeWidth="1.5" strokeDasharray="4 2" />
            <rect x="18" y="48" width="84" height="24" rx="4" fill="#1e293b" stroke="#b45309" strokeWidth="2" />
            <text x="60" y="59" textAnchor="middle" fill="#facc15" fontSize="9.5" fontWeight="900">SEMPRE NOI</text>
            <text x="60" y="69" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="900">AL 74 • PUB</text>
            <circle cx="72" cy="44" r="18" fill="none" stroke="#b45309" strokeWidth="2.5" opacity="0.45" />
          </g>
        )}

        {/* 18. CASCO DA BOMBARDIERE */}
        {id === 'casco_bombardiere' && (
          <g>
            <rect x="12" y="34" width="18" height="32" rx="3" fill="#facc15" stroke="#b45309" strokeWidth="2" />
            <rect x="90" y="34" width="18" height="32" rx="3" fill="#facc15" stroke="#b45309" strokeWidth="2" />
            <path d="M28 60C28 30 92 30 92 60Z" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2.5" />
            <path d="M22 60H98L90 68H30Z" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="2" />
            <path d="M21 34C21 16 48 18 54 44M99 34C99 16 72 18 66 44" fill="none" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
            <path d="M60 44V96C60 102 44 102 42 94" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        )}

        {/* 19. FUSTO EMERGENZA 30L */}
        {id === 'fusto_30l' && (
          <g>
            <rect x="55" y="10" width="10" height="14" fill="url(#steelGrad)" stroke="#334155" strokeWidth="1.5" />
            <path d="M46 14H74" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
            <rect x="28" y="24" width="64" height="82" rx="8" fill="url(#steelGrad)" stroke="#334155" strokeWidth="2.5" />
            <rect x="26" y="42" width="68" height="7" rx="3" fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
            <rect x="26" y="80" width="68" height="7" rx="3" fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
            <rect x="40" y="54" width="40" height="20" rx="4" fill="#dc2626" stroke="#fef08a" strokeWidth="1.5" />
            <text x="60" y="68" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900">30L</text>
          </g>
        )}

        {/* 20. ALCOLTEST ESPLOSO */}
        {id === 'alcoltest_esploso' && (
          <g transform="rotate(-14 60 60)">
            <path d="M24 44C14 30 30 14 44 26C54 10 78 12 82 28C98 22 104 44 90 56Z" fill="#f97316" />
            <path d="M32 46C24 34 38 22 48 30C56 18 74 20 76 32Z" fill="#facc15" />
            <rect x="34" y="20" width="8" height="18" rx="2" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
            <rect x="32" y="36" width="52" height="70" rx="7" fill="#1e293b" stroke="#94a3b8" strokeWidth="2.5" />
            <rect x="39" y="44" width="38" height="28" rx="3" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
            <text x="58" y="57" textAnchor="middle" fill="#facc15" fontSize="9.5" fontWeight="900">ERR</text>
            <text x="58" y="69" textAnchor="middle" fill="#ef4444" fontSize="10.5" fontWeight="900">999</text>
            <circle cx="58" cy="88" r="7" fill="#ef4444" stroke="#fef08a" strokeWidth="2" />
          </g>
        )}

        {/* 21. CHIAVI DEL PUB */}
        {id === 'chiavi_pub' && (
          <g>
            <circle cx="68" cy="30" r="15" fill="none" stroke="url(#goldGrad)" strokeWidth="4.5" />
            <g transform="rotate(28 60 40)">
              <circle cx="52" cy="42" r="10" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" />
              <rect x="49" y="52" width="6" height="44" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.5" />
              <rect x="41" y="82" width="8" height="5" fill="url(#goldGrad)" />
              <rect x="41" y="90" width="8" height="5" fill="url(#goldGrad)" />
            </g>
            <g transform="rotate(-10 68 42)">
              <circle cx="68" cy="44" r="12" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" />
              <circle cx="68" cy="44" r="4" fill="#16a34a" />
              <rect x="65" y="56" width="6" height="48" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.5" />
              <rect x="71" y="88" width="9" height="5" fill="url(#goldGrad)" />
              <rect x="71" y="96" width="9" height="5" fill="url(#goldGrad)" />
            </g>
          </g>
        )}

        {/* 22. CINTURA PESI MASSIMI */}
        {id === 'cintura_pesi_massimi' && (
          <g>
            <path d="M6 48L114 48L108 76L12 76Z" fill="#18181b" stroke="#facc15" strokeWidth="2" />
            <rect x="14" y="51" width="14" height="22" rx="3" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.5" />
            <rect x="92" y="51" width="14" height="22" rx="3" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.5" />
            <polygon points="60,28 88,40 88,84 60,96 32,84 32,40" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2.5" />
            <circle cx="60" cy="62" r="18" fill="#fef08a" stroke="#b45309" strokeWidth="2" />
            <rect x="49" y="54" width="9" height="14" rx="2" fill="#f59e0b" stroke="#78350f" strokeWidth="1.2" />
            <rect x="62" y="54" width="9" height="14" rx="2" fill="#f59e0b" stroke="#78350f" strokeWidth="1.2" />
            <circle cx="60" cy="35" r="3" fill="#dc2626" /><circle cx="44" cy="42" r="2.5" fill="#dc2626" /><circle cx="76" cy="42" r="2.5" fill="#dc2626" />
          </g>
        )}

        {/* 23. CITTADINO ONORARIO DEL 74 */}
        {id === 'cittadino_74' && (
          <g>
            <rect x="18" y="16" width="84" height="86" rx="6" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
            <rect x="23" y="21" width="74" height="76" rx="3" fill="none" stroke="#d97706" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="60" y="35" textAnchor="middle" fill="#451a03" fontSize="6.8" fontWeight="900">CITTADINO ONORARIO</text>
            <text x="60" y="45" textAnchor="middle" fill="#b45309" fontSize="8.5" fontWeight="900">DEL CIVICO 74</text>
            <path d="M30 54H90M30 61H86M30 68H78" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="78" cy="82" r="11" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.8" />
            <text x="78" y="86" textAnchor="middle" fill="#451a03" fontSize="10" fontWeight="900">74</text>
            <path d="M38 86L33 108L40 103L45 108L42 86" fill="#991b1b" />
            <circle cx="39" cy="84" r="9" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2" />
          </g>
        )}

        {/* 24. BUSTO D'ORO DI MARIO */}
        {id === 'busto_mario' && (
          <g>
            <circle cx="60" cy="48" r="44" fill="#eab308" fillOpacity="0.18" stroke="url(#goldGrad)" strokeWidth="1.8" strokeDasharray="4 2" />
            <rect x="30" y="96" width="60" height="14" rx="3" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" />
            <text x="60" y="106" textAnchor="middle" fill="#451a03" fontSize="7.2" fontWeight="900" letterSpacing="0.6">MARIVS • 74</text>

            <path d="M22 96C24 75 40 69 60 69C80 69 96 75 98 96Z" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2.2" />
            <path d="M34 74C46 84 74 84 86 74" fill="none" stroke="#854d0e" strokeWidth="2" />
            <text x="73" y="88" textAnchor="middle" fill="#78350f" fontSize="6.5" fontWeight="900">THE BOYS</text>

            <path d="M36 36C36 16 84 16 84 36C85 55 76 69 60 69C44 69 35 55 36 36Z" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" />
            <ellipse cx="54" cy="23" rx="10" ry="4" fill="#fef9c3" opacity="0.65" />

            <path d="M34 40C31 30 35 22 42 18M86 40C89 30 85 22 78 18" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <circle cx="35" cy="32" r="2.5" fill="#22c55e" /><circle cx="38" cy="24" r="2.5" fill="#22c55e" />
            <circle cx="85" cy="32" r="2.5" fill="#22c55e" /><circle cx="82" cy="24" r="2.5" fill="#22c55e" />

            <path d="M43 35C47 32.5 53 33 56 35M64 35C67 33 73 32.5 77 35" stroke="#78350f" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <ellipse cx="49.5" cy="40" rx="4.2" ry="2.8" fill="#fef9c3" stroke="#78350f" strokeWidth="1.2" />
            <circle cx="51" cy="40" r="1.8" fill="#78350f" />
            <ellipse cx="70.5" cy="40" rx="4.2" ry="2.8" fill="#fef9c3" stroke="#78350f" strokeWidth="1.2" />
            <circle cx="72" cy="40" r="1.8" fill="#78350f" />

            <path d="M36 45C36 61 45 70 60 70C75 70 84 61 84 45C80 51 76 53 70 52C66 48 54 48 50 52C44 53 40 51 36 45Z" fill="#ca8a04" stroke="#78350f" strokeWidth="1.8" />
            <path d="M53 54C57 53 63 53 67 54C65 57 55 57 53 54Z" fill="#78350f" />
          </g>
        )}
      </svg>
    </div>
  );
}

// ============================================================================
// 🏪 COMPONENTE PRINCIPALE DEL CHIOSCO (CON ISPEZIONE CARTA E DESCRIZIONI)
// ============================================================================
export default function Chiosco() {
  const [activeCategory, setActiveCategory] = useState('cavatappi');
  const [inspectedItem, setInspectedItem] = useState(null);

  const categories = [
    { id: 'cavatappi', label: 'Cavatappi', icon: Wrench, count: 8 },
    { id: 'calici', label: 'Calici Speciali', icon: Sparkles, count: 8 },
    { id: 'cimeli', label: 'Cimeli', icon: Award, count: 8 }
  ];

  const currentItems = CHIOSCO_ITEMS[activeCategory] || [];
  const currentCategoryMeta = CATEGORY_META[activeCategory] || CATEGORY_META.cavatappi;

  return (
    <div className="space-y-4 pb-6">
      {/* INTESTAZIONE DEL CHIOSCO */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-3.5 shadow-xl space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Il Chiosco Ufficiale • 24 Collezionabili
          </span>
          <span className="text-[9px] font-black uppercase bg-slate-950 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full">
            Presto con Tappi d'Oro
          </span>
        </div>
        <p className="text-[11px] text-slate-300 leading-snug">
          Tocca qualsiasi oggetto per aprirlo a <strong>tutto schermo</strong> e leggere la sua <strong>descrizione e funzione</strong>!
        </p>
      </div>

      {/* SELETTORE DELLE 3 CATEGORIE */}
      <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
        {categories.map(cat => {
          const IconComp = cat.icon;
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`py-2.5 px-2 rounded-xl text-[11px] font-black uppercase flex flex-col items-center justify-center gap-1 transition ${
                isSelected
                  ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span className="truncate max-w-full">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* GRIGLIA 2x4 DEGLI 8 OGGETTI DELLA CATEGORIA */}
      <div className="grid grid-cols-2 gap-3">
        {currentItems.map(item => {
          const style = RARITY_STYLES[item.rarity] || RARITY_STYLES.COMUNE;

          return (
            <div
              key={item.id}
              onClick={() => setInspectedItem({ ...item, categoryId: activeCategory })}
              className={`bg-gradient-to-b ${style.cardBg} border-2 ${style.cardBorder} rounded-2xl p-3 flex flex-col items-center justify-between text-center cursor-pointer transition transform active:scale-95 shadow-lg ${style.glow} relative overflow-hidden group`}
            >
              {/* Targhetta Rarità */}
              <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow ${style.badgeBg}`}>
                {style.label}
              </span>

              {/* Illustrazione Vettoriale */}
              <div className="my-2 group-hover:scale-105 transition-transform">
                <ChioscoItemArtwork id={item.id} size="md" />
              </div>

              {/* Nome, Anteprima Descrizione e Stato Bloccato */}
              <div className="w-full space-y-1.5">
                <h3 className="text-xs font-black text-white leading-tight line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-[10px] text-slate-300 line-clamp-2 leading-tight min-h-[26px]">
                  {item.desc}
                </p>
                <div className="w-full py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-amber-300 text-[10px] font-black uppercase flex items-center justify-center gap-1">
                  <Info className="w-3 h-3 text-amber-400" />
                  <span>Tocca per Dettagli</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================================
          MODALE ISPEZIONE CARTA A TUTTO SCHERMO (CON DESCRIZIONE E DISTINZIONE)
      ===================================================================== */}
      {inspectedItem && (() => {
        const style = RARITY_STYLES[inspectedItem.rarity] || RARITY_STYLES.COMUNE;
        const catMeta = CATEGORY_META[inspectedItem.categoryId || activeCategory] || currentCategoryMeta;

        return (
          <div
            onClick={() => setInspectedItem(null)}
            className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`bg-gradient-to-b ${style.cardBg} border-2 ${style.modalGlow} rounded-3xl max-w-sm w-full max-h-[90vh] overflow-y-auto p-5 text-center space-y-3.5 relative`}
            >
              {/* Pulsante Chiudi */}
              <button
                type="button"
                onClick={() => setInspectedItem(null)}
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-950/90 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-xs font-black z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Bollino Rarità + Tipo di Oggetto */}
              <div className="flex flex-col items-center gap-1">
                <span className={`text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg inline-block ${style.badgeBg}`}>
                  ★ {style.label} ★
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 bg-slate-950/80 border border-slate-800 px-3 py-0.5 rounded-full">
                  {catMeta.badge}
                </span>
              </div>

              {/* Area Grafica Gigante con Bagliore Radiale */}
              <div
                className="py-2 flex items-center justify-center rounded-2xl mx-auto"
                style={{ background: style.radialBg }}
              >
                <ChioscoItemArtwork id={inspectedItem.id} size="xl" />
              </div>

              {/* Titolo + Bonus/Caratteristica Distintiva */}
              <div className="space-y-1">
                <h2 className="text-xl font-black uppercase text-white tracking-wide leading-tight">
                  {inspectedItem.name}
                </h2>
                <div className={`text-[11px] font-black uppercase ${style.textAccent}`}>
                  ⚡ {inspectedItem.perk}
                </div>
              </div>

              {/* Box Descrizione Goliardica Completa */}
              <div className="bg-slate-950/85 border border-slate-800 rounded-2xl p-3.5 text-left space-y-2 shadow-inner">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 block mb-0.5">
                    📜 Descrizione Ufficiale
                  </span>
                  <p className="text-xs text-slate-100 leading-relaxed font-semibold italic">
                    "{inspectedItem.desc}"
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/90">
                  <span className="text-[9px] font-black uppercase tracking-wider text-sky-400 block mb-0.5">
                    🎯 Funzione in Gioco ({catMeta.statLabel})
                  </span>
                  <p className="text-[11px] text-slate-300 leading-snug font-medium">
                    {catMeta.usage}
                  </p>
                </div>
              </div>

              {/* Pulsante Bloccato + Torna al Chiosco */}
              <div className="pt-1 space-y-2">
                <div className="w-full py-3 rounded-2xl bg-slate-950 border border-amber-500/40 text-amber-300 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-inner">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Bloccato • Sbloccabile coi Tappi d'Oro</span>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectedItem(null)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-black uppercase transition"
                >
                  Chiudi Scheda
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}