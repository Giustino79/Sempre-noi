import React, { useState } from 'react';
import { Lock, Sparkles, X, ShieldCheck, Flame, Award, Wrench } from 'lucide-react';

// ============================================================================
// 🎨 CONFIGURAZIONE RARITÀ (COMUNE, RARO, MITICO, LEGGENDARIO)
// ============================================================================
const RARITY_STYLES = {
  COMUNE: {
    label: 'COMUNE',
    badgeBg: 'bg-emerald-500 text-slate-950',
    cardBorder: 'border-emerald-500/40 hover:border-emerald-400',
    cardBg: 'from-emerald-950/40 via-slate-900 to-slate-950',
    glow: 'shadow-emerald-500/10',
    modalGlow: 'shadow-[0_0_50px_rgba(16,185,129,0.35)] border-emerald-400',
    radialBg: 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(15,23,42,0) 70%)'
  },
  RARO: {
    label: 'RARO',
    badgeBg: 'bg-sky-400 text-slate-950',
    cardBorder: 'border-sky-400/50 hover:border-sky-300',
    cardBg: 'from-sky-950/50 via-slate-900 to-slate-950',
    glow: 'shadow-sky-500/15',
    modalGlow: 'shadow-[0_0_55px_rgba(56,189,248,0.4)] border-sky-400',
    radialBg: 'radial-gradient(circle, rgba(56,189,248,0.25) 0%, rgba(15,23,42,0) 70%)'
  },
  MITICO: {
    label: 'MITICO',
    badgeBg: 'bg-purple-500 text-white',
    cardBorder: 'border-purple-500/60 hover:border-purple-400',
    cardBg: 'from-purple-950/55 via-slate-900 to-slate-950',
    glow: 'shadow-purple-500/20',
    modalGlow: 'shadow-[0_0_65px_rgba(168,85,247,0.45)] border-purple-400',
    radialBg: 'radial-gradient(circle, rgba(168,85,247,0.28) 0%, rgba(15,23,42,0) 70%)'
  },
  LEGGENDARIO: {
    label: 'LEGGENDARIO',
    badgeBg: 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950',
    cardBorder: 'border-amber-400/80 hover:border-yellow-300',
    cardBg: 'from-amber-500/25 via-slate-900 to-slate-950',
    glow: 'shadow-amber-500/30',
    modalGlow: 'shadow-[0_0_80px_rgba(251,191,36,0.55)] border-amber-400',
    radialBg: 'radial-gradient(circle, rgba(251,191,36,0.35) 0%, rgba(15,23,42,0) 70%)'
  }
};

// ============================================================================
// 📦 CATALOGO UFFICIALE DEI 24 OGGETTI DEL CHIOSCO (8 + 8 + 8)
// ============================================================================
const CHIOSCO_ITEMS = {
  cavatappi: [
    {
      id: 'accendino',
      name: 'Accendino Ignorante',
      rarity: 'COMUNE',
      desc: 'Il classico Bic giallo consumato: leva fisica pura, pollice d’acciaio e tappo spedito direttamente in orbita.'
    },
    {
      id: 'cucchiaio',
      name: 'Cucchiaio Ignorante',
      rarity: 'COMUNE',
      desc: 'Sottratto dal cassetto della cucina a mezzanotte. Quando non c’è il cavatappi, l’ingegneria da bancone trionfa sempre.'
    },
    {
      id: 'bar_blade',
      name: 'Bar Blade Pro',
      rarity: 'RARO',
      desc: 'Piastra piatta in acciaio inox temprato con impugnatura rossa antiscivolo. Stappata rapida da vero bartender di pub.'
    },
    {
      id: 'oste_legno',
      name: 'Oste in Legno',
      rarity: 'RARO',
      desc: 'Tornito dal legno massello di una vecchia botte di rovere con anello superiore in ottone invecchiato.'
    },
    {
      id: 'pitstop_f1',
      name: 'Pit-Stop F1 Carbon',
      rarity: 'MITICO',
      desc: 'Telaio in vera fibra di carbonio intrecciata e bordi Rosso Corsa. Tempo medio di stappata ai box: 1.8 secondi.'
    },
    {
      id: 'zanna_drago',
      name: 'Zanna del Drago',
      rarity: 'MITICO',
      desc: 'Artiglio ricurvo in avorio antico incastonato in un’elsa di bronzo draconico. Nessuna corona metallica gli resiste.'
    },
    {
      id: 'cavatappi_mario',
      name: 'Cavatappi Mario',
      rarity: 'LEGGENDARIO',
      desc: 'L’icona assoluta con maglia "THE BOYS", sguardo laterale vigile e anello stappatore d’acciaio forgiato nel mito.'
    },
    {
      id: 'reale_24k',
      name: 'Reale 24 Carati',
      rarity: 'LEGGENDARIO',
      desc: 'Cavatappi a doppia leva da sommelier reale, fuso in oro massiccio 24k con diamante blu incastonato nel perno.'
    }
  ],
  calici: [
    {
      id: 'krug_ceramica',
      name: 'Krug Ceramica',
      rarity: 'COMUNE',
      desc: 'Storico boccale bavarese in gres porcellanato grigio con coperchio ribaltabile in peltro cesellato.'
    },
    {
      id: 'boccale_vichingo',
      name: 'Boccale Vichingo',
      rarity: 'COMUNE',
      desc: 'Doghe di quercia scura tenute insieme da doppi cerchi in ferro battuto e rivetti forgiati a mano.'
    },
    {
      id: 'pinta_subzero',
      name: 'Pinta Sub-Zero',
      rarity: 'RARO',
      desc: 'Estratta da una cella frigorifera a -18°C: pareti incrostate di cristalli di ghiaccio vivo e stalattiti polari.'
    },
    {
      id: 'das_boot',
      name: 'Das Boot 1L',
      rarity: 'RARO',
      desc: 'Il leggendario stivale di vetro tedesco da 1 Litro: attenzione alla bolla d’aria quando arrivi alla punta!'
    },
    {
      id: 'corno_nord',
      name: 'Corno del Nord',
      rarity: 'MITICO',
      desc: 'Corno cerimoniale del Valhalla levigato a specchio con ghiera runica in oro antico. Vietato appoggiarlo finché non è vuoto.'
    },
    {
      id: 'teschio_cristallo',
      name: 'Teschio Cristallo',
      rarity: 'MITICO',
      desc: 'Scolpito in un unico blocco di cristallo di Boemia: quando si riempie di ambrata, gli occhi prendono vita.'
    },
    {
      id: 'boccale_f1',
      name: 'Boccale F1 Carbon',
      rarity: 'LEGGENDARIO',
      desc: 'Rivestimento aerodinamico in carbonio, strisce Rosso Scuderia e manometro analogico di pressione sul fianco.'
    },
    {
      id: 'calice_imperiale',
      name: 'Calice Imperiale',
      rarity: 'LEGGENDARIO',
      desc: 'Coppa reale in oro zecchino 24 carati tempestata di rubini imperiali e smeraldi. Solo per veri dominatori della classifica.'
    }
  ],
  cimeli: [
    {
      id: 'sottobicchiere_74',
      name: 'Sottobicchiere "Sempre Noi al 74"',
      rarity: 'COMUNE',
      desc: 'Il glorioso cartoncino ufficiale del pub "Sempre Noi al 74", con timbro storico e autentica macchia di luppolo.'
    },
    {
      id: 'casco_bombardiere',
      name: 'Casco da Bombardiere',
      rarity: 'COMUNE',
      desc: 'Elmetto rosso da assalto serale con doppio supporto laterale per lattine e tubicini di rifornimento diretto.'
    },
    {
      id: 'fusto_30l',
      name: 'Fusto Emergenza 30L',
      rarity: 'RARO',
      desc: 'Fusto corazzato in acciaio inox satinato da 30 Litri con attacco rapido. Da aprire solo in caso di sete estrema.'
    },
    {
      id: 'alcoltest_esploso',
      name: 'Alcoltest Esploso',
      rarity: 'RARO',
      desc: 'Etilometro digitale andato in cortocircuito ("ERR 999") tra scintille, fumo nero e fiamme dopo una sola alitata.'
    },
    {
      id: 'chiavi_pub',
      name: 'Chiavi del Pub',
      rarity: 'MITICO',
      desc: 'Mazzo di tre chiavi antiche in oro massiccio con fregio del luppolo: appartengono solo a chi chiude la saracinesca.'
    },
    {
      id: 'cintura_pesi_massimi',
      name: 'Cintura Pesi Massimi',
      rarity: 'MITICO',
      desc: 'Cintura mondiale in cuoio nero borchiato e placca centrale d’oro con i due boccali brindanti di Sempre Noi.'
    },
    {
      id: 'cittadino_74',
      name: 'Cittadino Onorario del 74',
      rarity: 'LEGGENDARIO',
      desc: 'Pergamena solenne firmata e controfirmata, completa di nastro cremisi, ceralacca reale e timbro d’oro "74".'
    },
    {
      id: 'busto_mario',
      name: 'Busto d’Oro di Mario',
      rarity: 'LEGGENDARIO',
      desc: 'Monumento immortale in oro 24 carati con corona d’alloro imperiale, sguardo leggendario e incisione "MARIVS LXXIV".'
    }
  ]
};

// ============================================================================
// 🖌️ MOTORE GRAFICO SVG AD ALTA DEFINIZIONE PER I 24 OGGETTI
// ============================================================================
function ChioscoItemArtwork({ id, size = 'md' }) {
  const sizeClass = size === 'xl' ? 'w-48 h-48' : 'w-24 h-24';

  return (
    <div className={`${sizeClass} flex items-center justify-center relative select-none`}>
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.65)]">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#facc15" />
            <stop offset="70%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>
          <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="45%" stopColor="#cbd5e1" />
            <stop offset="80%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <linearGradient id="carbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="iceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="beerAmber" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="55%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="marioSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="60%" stopColor="#fdba74" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.55" />
          </linearGradient>
          <pattern id="carbonPattern" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#0f172a" />
            <path d="M0 0L6 6M6 0L0 6" stroke="#334155" strokeWidth="1" />
          </pattern>
        </defs>

        {/* ===================== 1. CAVATAPPI (8) ===================== */}

        {/* 1. ACCENDINO IGNORANTE */}
        {id === 'accendino' && (
          <g transform="rotate(14 60 65)">
            {/* Fiamma viva a 3 livelli */}
            <path d="M60 8C50 20 51 31 60 35C69 31 70 20 60 8Z" fill="#f97316" />
            <path d="M60 13C54 22 55 30 60 34C65 30 66 22 60 13Z" fill="#facc15" />
            <path d="M60 21C57 26 58 31 60 33C62 31 63 26 60 21Z" fill="#e0f2fe" />
            {/* Cappuccio metallico e rotella */}
            <rect x="44" y="34" width="22" height="14" rx="2" fill="url(#steelGrad)" stroke="#475569" strokeWidth="1.5" />
            <circle cx="67" cy="40" r="5" fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
            <rect x="64" y="44" width="12" height="5" rx="1.5" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1" />
            {/* Corpo giallo con segni di stappate */}
            <rect x="42" y="48" width="34" height="56" rx="5" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            <rect x="46" y="52" width="6" height="48" rx="2" fill="#fef08a" opacity="0.65" />
            {/* Segni di battaglia sul fondo */}
            <path d="M44 96L52 93M45 100L55 98" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}

        {/* 2. CUCCHIAIO IGNORANTE */}
        {id === 'cucchiaio' && (
          <g transform="rotate(-28 60 60)">
            {/* Manico anatomico in acciaio */}
            <path d="M56 54L52 104C52 109 68 109 68 104L64 54Z" fill="url(#steelGrad)" stroke="#475569" strokeWidth="2" />
            <path d="M57 62V98" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            {/* Coppa del cucchiaio bombata */}
            <ellipse cx="60" cy="34" rx="17" ry="23" fill="url(#steelGrad)" stroke="#475569" strokeWidth="2" />
            <ellipse cx="58" cy="33" rx="11" ry="16" fill="#94a3b8" opacity="0.55" />
            <path d="M52 22C50 28 51 38 55 44" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            {/* Tappo a corona che salta via */}
            <g transform="translate(24, -6) rotate(25)">
              <circle cx="15" cy="15" r="9" fill="url(#goldGrad)" stroke="#b45309" strokeWidth="1.5" strokeDasharray="2 1" />
              <path d="M2 22L10 18" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        )}

        {/* 3. BAR BLADE PRO */}
        {id === 'bar_blade' && (
          <g transform="rotate(-35 60 60)">
            {/* Piastra superiore in acciaio */}
            <rect x="44" y="10" width="32" height="100" rx="16" fill="url(#steelGrad)" stroke="#334155" strokeWidth="2.2" />
            {/* Foro stappatore superiore */}
            <rect x="50" y="18" width="20" height="18" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
            <path d="M53 36H67" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
            {/* Impugnatura rossa gommata */}
            <path d="M44 54H76V94C76 103 69 110 60 110C51 110 44 103 44 94V54Z" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2" />
            {/* Foro rotazione dito */}
            <circle cx="60" cy="92" r="8" fill="#0f172a" stroke="url(#steelGrad)" strokeWidth="3" />
            {/* Riflesso metallico */}
            <path d="M49 40L71 48" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </g>
        )}

        {/* 4. OSTE IN LEGNO */}
        {id === 'oste_legno' && (
          <g transform="rotate(-30 60 60)">
            {/* Testa in ottone antico */}
            <path d="M46 42V22C46 12 74 12 74 22V42Z" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2.2" />
            <ellipse cx="60" cy="25" rx="8" ry="7" fill="#0f172a" />
            <rect x="55" y="29" width="10" height="4" rx="1" fill="url(#goldGrad)" />
            {/* Ghiera metallica */}
            <rect x="44" y="42" width="32" height="7" rx="2" fill="url(#steelGrad)" stroke="#334155" strokeWidth="1.5" />
            {/* Manico a botte in rovere */}
            <path d="M45 49C39 68 39 88 47 106H73C81 88 81 68 75 49H45Z" fill="url(#woodGrad)" stroke="#451a03" strokeWidth="2.2" />
            {/* Venature e cerchi della botte */}
            <path d="M54 50C51 68 51 88 54 105M66 50C69 68 69 88 66 105" stroke="#451a03" strokeWidth="1.4" fill="none" opacity="0.7" />
            <path d="M43 64H77M43 92H77" stroke="url(#goldGrad)" strokeWidth="3" />
          </g>
        )}

        {/* 5. PIT-STOP F1 CARBON */}
        {id === 'pitstop_f1' && (
          <g transform="rotate(-35 60 60)">
            <path d="M43 22C43 11 77 11 77 22C77 32 70 40 70 60C70 80 77 88 77 98C77 109 43 109 43 98C43 88 50 80 50 60C50 40 43 32 43 22Z" fill="url(#carbonPattern)" stroke="#ef4444" strokeWidth="3" />
            {/* Doppio anello di stappata */}
            <circle cx="60" cy="24" r="9" fill="#020617" stroke="url(#steelGrad)" strokeWidth="2.5" />
            <rect x="55" y="29" width="10" height="4" fill="#cbd5e1" />
            <circle cx="60" cy="96" r="8" fill="#020617" stroke="#ef4444" strokeWidth="2" />
            {/* Fregio F1 al centro */}
            <path d="M54 52H66L63 68H51Z" fill="#ef4444" />
            <text x="59" y="63" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="900">F1</text>
          </g>
        )}

        {/* 6. ZANNA DEL DRAGO */}
        {id === 'zanna_drago' && (
          <g>
            {/* Anello stappatore in bronzo dorato */}
            <path d="M66 14C82 14 92 25 88 39C85 48 75 52 67 48L62 38C68 40 75 38 77 32C79 26 74 22 67 22Z" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" />
            {/* Testa di drago scolpita */}
            <path d="M50 34L68 26L76 42L60 56L46 48Z" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="62" cy="37" r="2.5" fill="#ef4444" />
            {/* Corna e squame */}
            <path d="M50 34L38 26L46 40M56 30L46 20L52 34" fill="#ca8a04" stroke="#78350f" strokeWidth="1.5" />
            {/* Zanna d'avorio ricurva */}
            <path d="M48 48C36 66 32 88 22 104C44 98 62 82 64 54Z" fill="#fef3c7" stroke="#78350f" strokeWidth="2.2" />
            <path d="M49 54C42 70 37 84 29 97" stroke="#d97706" strokeWidth="1.5" fill="none" opacity="0.6" />
          </g>
        )}

        {/* 7. CAVATAPPI MARIO (ISPIRATO ALLA FOTO CON MAGLIA "THE BOYS" E SGUARDO LATERALE) */}
        {id === 'cavatappi_mario' && (
          <g>
            {/* Cornice Aura Leggendaria */}
            <circle cx="60" cy="54" r="46" fill="#581c87" fillOpacity="0.35" stroke="url(#goldGrad)" strokeWidth="2" />
            {/* Maglietta grigio antracite scuro "THE BOYS" */}
            <path d="M22 96C24 76 38 70 60 70C82 70 96 76 98 96Z" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
            {/* Colletto girocollo */}
            <path d="M45 70C50 77 70 77 75 70" fill="none" stroke="#334155" strokeWidth="3" />
            {/* Scritta bianca "THE BOYS" sul lato sinistro del petto (destra per chi guarda) */}
            <text x="74" y="83" textAnchor="middle" fill="#f8fafc" fontSize="5.2" fontWeight="900" letterSpacing="0.3">THE</text>
            <text x="75" y="90" textAnchor="middle" fill="#ffffff" fontSize="8.2" fontWeight="900" letterSpacing="-0.4">BOYS</text>

            {/* Orecchie */}
            <ellipse cx="34" cy="46" rx="4.5" ry="7" fill="url(#marioSkin)" stroke="#9a3412" strokeWidth="1.2" />
            <ellipse cx="86" cy="46" rx="4.5" ry="7" fill="url(#marioSkin)" stroke="#9a3412" strokeWidth="1.2" />

            {/* Testa e Viso rotondo di Mario */}
            <path d="M36 38C36 17 84 17 84 38C85 57 76 71 60 71C44 71 35 57 36 38Z" fill="url(#marioSkin)" stroke="#9a3412" strokeWidth="1.5" />
            {/* Riflesso lucido sulla cupola rasata */}
            <ellipse cx="53" cy="24" rx="11" ry="4.5" fill="#ffffff" opacity="0.45" transform="rotate(-10 53 24)" />

            {/* Capelli scuri corti solo sui lati/tempie (come in foto) */}
            <path d="M36 42C35 33 38 26 42 24C39 30 39 37 39 44Z" fill="#27272a" />
            <path d="M84 42C85 33 82 26 78 24C81 30 81 37 81 44Z" fill="#27272a" />

            {/* Sopracciglia scure espressive */}
            <path d="M43 36C47 33.5 53 34 56 36" stroke="#18181b" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <path d="M64 36C67 34 73 33.5 77 36" stroke="#18181b" strokeWidth="2.6" strokeLinecap="round" fill="none" />

            {/* Occhi con sguardo laterale a destra (come nella foto!) */}
            <ellipse cx="49.5" cy="41.5" rx="4.8" ry="3.4" fill="#ffffff" stroke="#451a03" strokeWidth="1" />
            <circle cx="51.3" cy="41.5" r="2.3" fill="#1c1917" />
            <circle cx="52" cy="40.7" r="0.8" fill="#ffffff" />

            <ellipse cx="70.5" cy="41.5" rx="4.8" ry="3.4" fill="#ffffff" stroke="#451a03" strokeWidth="1" />
            <circle cx="72.3" cy="41.5" r="2.3" fill="#1c1917" />
            <circle cx="73" cy="40.7" r="0.8" fill="#ffffff" />

            {/* Naso */}
            <path d="M58 41V49C56 51 64 51 62 49" fill="none" stroke="#9a3412" strokeWidth="1.8" strokeLinecap="round" />

            {/* Barba folta scura e baffi con bocca leggermente socchiusa */}
            <path d="M36 46C36 62 45 72 60 72C75 72 84 62 84 46C81 52 77 55 71 54C68 50 52 50 49 54C43 55 39 52 36 46Z" fill="#27272a" stroke="#09090b" strokeWidth="1.2" />
            {/* Bocca semiaperta dentro la barba */}
            <path d="M53 56C57 54.5 63 54.5 67 56C65 60 55 60 53 56Z" fill="#450a0a" stroke="#fca5a5" strokeWidth="0.8" />

            {/* Anello Cavatappi d'Acciaio Pesante integrato in basso */}
            <rect x="42" y="90" width="36" height="22" rx="10" fill="url(#steelGrad)" stroke="#1e293b" strokeWidth="2.2" />
            <ellipse cx="60" cy="101" rx="10" ry="5.5" fill="#020617" />
            <rect x="55" y="94" width="10" height="4" rx="1" fill="#e2e8f0" />
          </g>
        )}

        {/* 8. REALE 24 CARATI */}
        {id === 'reale_24k' && (
          <g>
            {/* Testa ad anello reale */}
            <circle cx="60" cy="22" r="11" fill="none" stroke="url(#goldGrad)" strokeWidth="5" />
            <rect x="54" y="32" width="12" height="26" rx="3" fill="url(#goldGrad)" stroke="#854d0e" strokeWidth="1.5" />
            {/* Bracci laterali a leva */}
            <path d="M54 38L26 78L33 83L54 50Z" fill="url(#goldGrad)" stroke="#854d0e" strokeWidth="1.5" />
            <path d="M66 38L94 78L87 83L66 50Z" fill="url(#goldGrad)" stroke="#854d0e" strokeWidth="1.5" />
            {/* Diamante azzurro incastonato */}
            <polygon points="60,38 66,44 60,50 54,44" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="1.2" />
            {/* Spirale d'oro */}
            <path d="M60 58C55 64 65 70 60 76C55 82 65 88 60 94C56 99 62 104 60 109" stroke="url(#goldGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
            {/* Scintille */}
            <path d="M26 24L30 24M28 22L28 26M90 30L96 30M93 27L93 33" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* ===================== 2. CALICI SPECIALI (8) ===================== */}

        {/* 9. KRUG CERAMICA */}
        {id === 'krug_ceramica' && (
          <g>
            {/* Manico */}
            <path d="M78 44H92C96 44 98 48 98 64C98 80 96 84 92 84H78" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            {/* Leva in peltro */}
            <path d="M84 36L95 28" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
            {/* Coperchio conico in peltro */}
            <path d="M34 36C36 20 84 20 86 36Z" fill="url(#steelGrad)" stroke="#334155" strokeWidth="2" />
            <circle cx="60" cy="17" r="4" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
            {/* Corpo in gres grigio-blu */}
            <rect x="32" y="36" width="52" height="66" rx="5" fill="#64748b" stroke="#1e293b" strokeWidth="2.5" />
            <rect x="35" y="42" width="46" height="6" fill="#1e3a8a" />
            <rect x="35" y="88" width="46" height="6" fill="#1e3a8a" />
            {/* Stemma bavarese centrale */}
            <polygon points="60,54 70,66 60,78 50,66" fill="#38bdf8" stroke="#f8fafc" strokeWidth="1.5" />
          </g>
        )}

        {/* 10. BOCCALE VICHINGO */}
        {id === 'boccale_vichingo' && (
          <g>
            {/* Manico in legno scolpito */}
            <path d="M80 38H95C100 38 102 45 102 64C102 83 100 90 95 90H80" fill="none" stroke="#78350f" strokeWidth="7" strokeLinejoin="round" />
            {/* Schiuma traboccante */}
            <path d="M30 30C30 22 40 20 48 23C54 18 66 18 72 23C80 20 86 24 86 30Z" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
            {/* Fusto in rovere */}
            <path d="M30 28L26 100H90L86 28Z" fill="url(#woodGrad)" stroke="#290f02" strokeWidth="2.5" />
            {/* Doghe verticali */}
            <path d="M42 28L40 100M58 28V100M74 28L76 100" stroke="#290f02" strokeWidth="1.8" />
            {/* Fasce in ferro battuto con rivetti */}
            <rect x="28" y="40" width="60" height="7" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="26" y="82" width="64" height="8" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="36" cy="43.5" r="1.8" fill="#94a3b8" /><circle cx="58" cy="43.5" r="1.8" fill="#94a3b8" /><circle cx="80" cy="43.5" r="1.8" fill="#94a3b8" />
            <circle cx="36" cy="86" r="1.8" fill="#94a3b8" /><circle cx="58" cy="86" r="1.8" fill="#94a3b8" /><circle cx="80" cy="86" r="1.8" fill="#94a3b8" />
          </g>
        )}

        {/* 11. PINTA SUB-ZERO */}
        {id === 'pinta_subzero' && (
          <g>
            {/* Corpo pinta ghiacciata */}
            <path d="M32 24L38 102H82L88 24Z" fill="url(#iceGrad)" stroke="#bae6fd" strokeWidth="2.5" />
            {/* Schiuma innevata */}
            <path d="M30 25C30 17 42 15 50 18C56 13 66 13 72 18C80 15 90 17 90 25Z" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.5" />
            {/* Stalattiti di ghiaccio che scendono dal bordo */}
            <polygon points="32,25 36,48 41,25" fill="#e0f2fe" />
            <polygon points="44,25 49,58 55,25" fill="#e0f2fe" />
            <polygon points="65,25 70,52 76,25" fill="#e0f2fe" />
            <polygon points="78,25 83,44 88,25" fill="#e0f2fe" />
            {/* Cristalli di brina */}
            <path d="M52 70L68 70M60 62L60 78M54 64L66 76M66 64L54 76" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* 12. DAS BOOT 1L */}
        {id === 'das_boot' && (
          <g>
            {/* Schiuma in cima allo stivale */}
            <path d="M36 18C36 11 46 10 54 12C62 10 72 11 72 18Z" fill="#ffffff" stroke="#fde68a" strokeWidth="1.5" />
            {/* Corpo dello stivale pieno di birra dorata */}
            <path d="M38 18V74C38 82 36 96 36 102H94C102 102 104 90 96 86L70 76V18Z" fill="url(#beerAmber)" stroke="#fef08a" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Bollicine di carbonazione */}
            <circle cx="52" cy="50" r="2" fill="#fef9c3" /><circle cx="58" cy="64" r="1.5" fill="#fef9c3" /><circle cx="48" cy="80" r="2.2" fill="#fef9c3" /><circle cx="76" cy="92" r="2" fill="#fef9c3" />
            {/* Suola in vetro spesso */}
            <path d="M35 105H96" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {/* 13. CORNO DEL NORD */}
        {id === 'corno_nord' && (
          <g>
            {/* Corpo del corno ricurvo */}
            <path d="M70 18C68 58 48 82 16 92C44 104 84 86 98 24Z" fill="#fef3c7" stroke="#78350f" strokeWidth="2.5" />
            <path d="M74 28C70 60 52 82 24 91" stroke="#d97706" strokeWidth="2" fill="none" opacity="0.55" />
            {/* Ghiera superiore in oro runico */}
            <path d="M68 16L100 22L97 34L66 28Z" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" />
            {/* Punta finale in oro */}
            <circle cx="16" cy="92" r="4.5" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.5" />
            {/* Schiuma */}
            <path d="M68 16C72 9 98 12 100 22Z" fill="#ffffff" />
          </g>
        )}

        {/* 14. TESCHIO CRISTALLO */}
        {id === 'teschio_cristallo' && (
          <g>
            {/* Schiuma */}
            <path d="M34 22C36 14 84 14 86 22Z" fill="#fffbeb" />
            {/* Cranio di cristallo ripieno di birra ambrata */}
            <path d="M32 22C24 38 26 62 38 72L42 98H78L82 72C94 62 96 38 88 22Z" fill="url(#beerAmber)" stroke="#e0f2fe" strokeWidth="2.8" />
            {/* Cavità oculari luminose */}
            <ellipse cx="47" cy="52" rx="9" ry="8" fill="#451a03" stroke="#fef08a" strokeWidth="2" />
            <ellipse cx="73" cy="52" rx="9" ry="8" fill="#451a03" stroke="#fef08a" strokeWidth="2" />
            {/* Setto nasale */}
            <polygon points="60,58 55,70 65,70" fill="#451a03" />
            {/* Denti scolpiti nel vetro */}
            <path d="M44 82H76M44 90H76M50 76V96M57 76V96M63 76V96M70 76V96" stroke="#e0f2fe" strokeWidth="2" />
          </g>
        )}

        {/* 15. BOCCALE F1 CARBON */}
        {id === 'boccale_f1' && (
          <g>
            {/* Manico ergonomico racing */}
            <path d="M80 34H96C101 34 103 42 103 62C103 82 101 90 96 90H80" fill="none" stroke="#ef4444" strokeWidth="6" />
            {/* Schiuma */}
            <path d="M28 24C28 16 84 16 84 24Z" fill="#ffffff" />
            {/* Cilindro in fibra di carbonio */}
            <rect x="28" y="24" width="54" height="78" rx="6" fill="url(#carbonPattern)" stroke="#ef4444" strokeWidth="2.5" />
            {/* Striscia Rosso Corsa verticale */}
            <rect x="38" y="24" width="7" height="78" fill="#ef4444" />
            {/* Manometro analogico della pressione */}
            <circle cx="63" cy="70" r="12" fill="#f8fafc" stroke="url(#steelGrad)" strokeWidth="3" />
            <path d="M63 70L70 63" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="63" cy="70" r="2.2" fill="#0f172a" />
          </g>
        )}

        {/* 16. CALICE IMPERIALE */}
        {id === 'calice_imperiale' && (
          <g>
            {/* Schiuma reale */}
            <path d="M28 22C28 13 44 12 52 16C60 11 72 12 78 16C86 14 92 17 92 22Z" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
            {/* Coppa in oro massiccio */}
            <path d="M28 22C28 60 44 68 60 68C76 68 92 60 92 22Z" fill="url(#goldGrad)" stroke="#854d0e" strokeWidth="2.5" />
            {/* Stelo e base imperiale */}
            <rect x="55" y="68" width="10" height="24" rx="2" fill="url(#goldGrad)" stroke="#854d0e" strokeWidth="2" />
            <path d="M36 102C42 90 78 90 84 102Z" fill="url(#goldGrad)" stroke="#854d0e" strokeWidth="2.5" />
            {/* Rubini incastonati */}
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
            {/* Banda centrale pub */}
            <rect x="18" y="48" width="84" height="24" rx="4" fill="#1e293b" stroke="#b45309" strokeWidth="2" />
            <text x="60" y="59" textAnchor="middle" fill="#facc15" fontSize="9.5" fontWeight="900">SEMPRE NOI</text>
            <text x="60" y="69" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="900">AL 74 • PUB</text>
            {/* Macchia circolare di boccale bagnato */}
            <circle cx="72" cy="44" r="18" fill="none" stroke="#b45309" strokeWidth="2.5" opacity="0.45" />
          </g>
        )}

        {/* 18. CASCO DA BOMBARDIERE */}
        {id === 'casco_bombardiere' && (
          <g>
            {/* Lattina Sinistra e Destra */}
            <rect x="12" y="34" width="18" height="32" rx="3" fill="#facc15" stroke="#b45309" strokeWidth="2" />
            <rect x="90" y="34" width="18" height="32" rx="3" fill="#facc15" stroke="#b45309" strokeWidth="2" />
            {/* Calotta del casco rosso */}
            <path d="M28 60C28 30 92 30 92 60Z" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2.5" />
            <path d="M22 60H98L90 68H30Z" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="2" />
            {/* Cannucce trasparenti */}
            <path d="M21 34C21 16 48 18 54 44M99 34C99 16 72 18 66 44" fill="none" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
            <path d="M60 44V96C60 102 44 102 42 94" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        )}

        {/* 19. FUSTO EMERGENZA 30L */}
        {id === 'fusto_30l' && (
          <g>
            {/* Spillatore superiore */}
            <rect x="55" y="10" width="10" height="14" fill="url(#steelGrad)" stroke="#334155" strokeWidth="1.5" />
            <path d="M46 14H74" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
            {/* Corpo fusto in acciaio inox */}
            <rect x="28" y="24" width="64" height="82" rx="8" fill="url(#steelGrad)" stroke="#334155" strokeWidth="2.5" />
            {/* Costolature di rinforzo */}
            <rect x="26" y="42" width="68" height="7" rx="3" fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
            <rect x="26" y="80" width="68" height="7" rx="3" fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
            {/* Targhetta 30L */}
            <rect x="40" y="54" width="40" height="20" rx="4" fill="#dc2626" stroke="#fef08a" strokeWidth="1.5" />
            <text x="60" y="68" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900">30L</text>
          </g>
        )}

        {/* 20. ALCOLTEST ESPLOSO */}
        {id === 'alcoltest_esploso' && (
          <g transform="rotate(-14 60 60)">
            {/* Fiamme e fumo di cortocircuito */}
            <path d="M24 44C14 30 30 14 44 26C54 10 78 12 82 28C98 22 104 44 90 56Z" fill="#f97316" />
            <path d="M32 46C24 34 38 22 48 30C56 18 74 20 76 32Z" fill="#facc15" />
            {/* Beccuccio */}
            <rect x="34" y="20" width="8" height="18" rx="2" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
            {/* Corpo digitale spaccato */}
            <rect x="32" y="36" width="52" height="70" rx="7" fill="#1e293b" stroke="#94a3b8" strokeWidth="2.5" />
            {/* Schermo in tilt */}
            <rect x="39" y="44" width="38" height="28" rx="3" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
            <text x="58" y="57" textAnchor="middle" fill="#facc15" fontSize="9.5" fontWeight="900">ERR</text>
            <text x="58" y="69" textAnchor="middle" fill="#ef4444" fontSize="10.5" fontWeight="900">999</text>
            {/* Pulsante rosso fuso */}
            <circle cx="58" cy="88" r="7" fill="#ef4444" stroke="#fef08a" strokeWidth="2" />
          </g>
        )}

        {/* 21. CHIAVI DEL PUB */}
        {id === 'chiavi_pub' && (
          <g>
            {/* Anello portachiavi d'oro */}
            <circle cx="68" cy="30" r="15" fill="none" stroke="url(#goldGrad)" strokeWidth="4.5" />
            {/* Chiave 1 (Sinistra) */}
            <g transform="rotate(28 60 40)">
              <circle cx="52" cy="42" r="10" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" />
              <rect x="49" y="52" width="6" height="44" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.5" />
              <rect x="41" y="82" width="8" height="5" fill="url(#goldGrad)" />
              <rect x="41" y="90" width="8" height="5" fill="url(#goldGrad)" />
            </g>
            {/* Chiave 2 (Centrale Principale) */}
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
            {/* Cinturone in cuoio nero */}
            <path d="M6 48L114 48L108 76L12 76Z" fill="#18181b" stroke="#facc15" strokeWidth="2" />
            {/* Placche laterali */}
            <rect x="14" y="51" width="14" height="22" rx="3" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.5" />
            <rect x="92" y="51" width="14" height="22" rx="3" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.5" />
            {/* Placca centrale da Campione del Mondo */}
            <polygon points="60,28 88,40 88,84 60,96 32,84 32,40" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2.5" />
            <circle cx="60" cy="62" r="18" fill="#fef08a" stroke="#b45309" strokeWidth="2" />
            {/* Doppio boccale brindante al centro */}
            <rect x="49" y="54" width="9" height="14" rx="2" fill="#f59e0b" stroke="#78350f" strokeWidth="1.2" />
            <rect x="62" y="54" width="9" height="14" rx="2" fill="#f59e0b" stroke="#78350f" strokeWidth="1.2" />
            {/* Rubini sulla corona */}
            <circle cx="60" cy="35" r="3" fill="#dc2626" /><circle cx="44" cy="42" r="2.5" fill="#dc2626" /><circle cx="76" cy="42" r="2.5" fill="#dc2626" />
          </g>
        )}

        {/* 23. CITTADINO ONORARIO DEL 74 */}
        {id === 'cittadino_74' && (
          <g>
            {/* Pergamena solenne */}
            <rect x="18" y="16" width="84" height="86" rx="6" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
            <rect x="23" y="21" width="74" height="76" rx="3" fill="none" stroke="#d97706" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="60" y="35" textAnchor="middle" fill="#451a03" fontSize="6.8" fontWeight="900">CITTADINO ONORARIO</text>
            <text x="60" y="45" textAnchor="middle" fill="#b45309" fontSize="8.5" fontWeight="900">DEL CIVICO 74</text>
            {/* Righe calligrafiche */}
            <path d="M30 54H90M30 61H86M30 68H78" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" />
            {/* Timbro d'oro 74 */}
            <circle cx="78" cy="82" r="11" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.8" />
            <text x="78" y="86" textAnchor="middle" fill="#451a03" fontSize="10" fontWeight="900">74</text>
            {/* Ceralacca rossa con nastri */}
            <path d="M38 86L33 108L40 103L45 108L42 86" fill="#991b1b" />
            <circle cx="39" cy="84" r="9" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2" />
          </g>
        )}

        {/* 24. BUSTO D'ORO DI MARIO (SCULTURA IMPERIALE CON LA FISIONOMIA DELLA FOTO) */}
        {id === 'busto_mario' && (
          <g>
            {/* Aureola Imperiale */}
            <circle cx="60" cy="48" r="44" fill="#eab308" fillOpacity="0.18" stroke="url(#goldGrad)" strokeWidth="1.8" strokeDasharray="4 2" />

            {/* Piedistallo Imperiale con scritta MARIVS LXXIV */}
            <rect x="30" y="96" width="60" height="14" rx="3" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" />
            <text x="60" y="106" textAnchor="middle" fill="#451a03" fontSize="7.2" fontWeight="900" letterSpacing="0.6">MARIVS • 74</text>

            {/* Spalle e Toga / Maglia scolpita in oro */}
            <path d="M22 96C24 75 40 69 60 69C80 69 96 75 98 96Z" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2.2" />
            <path d="M34 74C46 84 74 84 86 74" fill="none" stroke="#854d0e" strokeWidth="2" />
            <text x="73" y="88" textAnchor="middle" fill="#78350f" fontSize="6.5" fontWeight="900">THE BOYS</text>

            {/* Testa scolpita in oro con cupola lucida e capelli sui lati */}
            <path d="M36 36C36 16 84 16 84 36C85 55 76 69 60 69C44 69 35 55 36 36Z" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" />
            <ellipse cx="54" cy="23" rx="10" ry="4" fill="#fef9c3" opacity="0.65" />

            {/* Corona d'Alloro Imperiale sui lati della testa */}
            <path d="M34 40C31 30 35 22 42 18M86 40C89 30 85 22 78 18" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <circle cx="35" cy="32" r="2.5" fill="#22c55e" /><circle cx="38" cy="24" r="2.5" fill="#22c55e" />
            <circle cx="85" cy="32" r="2.5" fill="#22c55e" /><circle cx="82" cy="24" r="2.5" fill="#22c55e" />

            {/* Sopracciglia e sguardo laterale scolpiti nell'oro */}
            <path d="M43 35C47 32.5 53 33 56 35M64 35C67 33 73 32.5 77 35" stroke="#78350f" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <ellipse cx="49.5" cy="40" rx="4.2" ry="2.8" fill="#fef9c3" stroke="#78350f" strokeWidth="1.2" />
            <circle cx="51" cy="40" r="1.8" fill="#78350f" />
            <ellipse cx="70.5" cy="40" rx="4.2" ry="2.8" fill="#fef9c3" stroke="#78350f" strokeWidth="1.2" />
            <circle cx="72" cy="40" r="1.8" fill="#78350f" />

            {/* Barba piena imperiale in oro */}
            <path d="M36 45C36 61 45 70 60 70C75 70 84 61 84 45C80 51 76 53 70 52C66 48 54 48 50 52C44 53 40 51 36 45Z" fill="#ca8a04" stroke="#78350f" strokeWidth="1.8" />
            <path d="M53 54C57 53 63 53 67 54C65 57 55 57 53 54Z" fill="#78350f" />
          </g>
        )}
      </svg>
    </div>
  );
}

// ============================================================================
// 🏪 COMPONENTE PRINCIPALE DEL CHIOSCO (CON ISPEZIONE CARTA STILE CLASH ROYALE)
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
          Tocca qualsiasi oggetto per aprirlo a <strong>tutto schermo</strong>! Ogni categoria conta <strong>2 Comuni, 2 Rari, 2 Mitici e 2 Leggendari</strong>.
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
              onClick={() => setInspectedItem(item)}
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

              {/* Nome e Stato Bloccato */}
              <div className="w-full space-y-1.5">
                <h3 className="text-xs font-black text-white leading-tight line-clamp-1">
                  {item.name}
                </h3>
                <div className="w-full py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-400 text-[10px] font-black uppercase flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Bloccato</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================================
          MODALE ISPEZIONE CARTA A TUTTO SCHERMO (STILE CLASH ROYALE / FIFA)
      ===================================================================== */}
      {inspectedItem && (() => {
        const style = RARITY_STYLES[inspectedItem.rarity] || RARITY_STYLES.COMUNE;
        return (
          <div
            onClick={() => setInspectedItem(null)}
            className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`bg-gradient-to-b ${style.cardBg} border-2 ${style.modalGlow} rounded-3xl max-w-sm w-full p-6 text-center space-y-4 relative overflow-hidden`}
            >
              {/* Chiudi */}
              <button
                type="button"
                onClick={() => setInspectedItem(null)}
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-xs font-black z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Bollino Rarità */}
              <div>
                <span className={`text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg inline-block ${style.badgeBg}`}>
                  ★ {style.label} ★
                </span>
              </div>

              {/* Area Grafica Gigante con Bagliore Radiale */}
              <div
                className="py-4 flex items-center justify-center rounded-2xl mx-auto"
                style={{ background: style.radialBg }}
              >
                <ChioscoItemArtwork id={inspectedItem.id} size="xl" />
              </div>

              {/* Titolo & Descrizione Goliardica */}
              <div className="space-y-2">
                <h2 className="text-xl font-black uppercase text-white tracking-wide">
                  {inspectedItem.name}
                </h2>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold bg-slate-950/70 border border-slate-800/90 rounded-2xl p-3.5">
                  "{inspectedItem.desc}"
                </p>
              </div>

              {/* Pulsante Bloccato */}
              <div className="pt-1 space-y-2">
                <div className="w-full py-3.5 rounded-2xl bg-slate-950 border border-amber-500/40 text-amber-300 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-inner">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Bloccato • Sbloccabile coi Tappi d'Oro</span>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectedItem(null)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase transition"
                >
                  Torna al Chiosco
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}