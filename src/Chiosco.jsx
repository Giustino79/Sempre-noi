import React, { useState } from 'react';
import { Lock, Sparkles, X, Award, Wrench, Eye, Crown, Flame } from 'lucide-react';

// ============================================================================
// 🎨 CONFIGURAZIONE RARITÀ (COMUNE, RARO, MITICO, LEGGENDARIO + INFINITO/ULTRA)
// ============================================================================
export const RARITY_STYLES = {
  COMUNE: {
    label: 'COMUNE',
    badgeBg: 'bg-emerald-500 text-slate-950',
    cardBorder: 'border-emerald-500/50 hover:border-emerald-400',
    cardBg: 'from-emerald-950/50 via-slate-900 to-slate-950',
    modalBorder: 'border-emerald-400 shadow-2xl shadow-emerald-500/30',
    radialBg: 'radial-gradient(circle, rgba(16,185,129,0.28) 0%, rgba(15,23,42,0) 70%)'
  },
  RARO: {
    label: 'RARO',
    badgeBg: 'bg-sky-400 text-slate-950',
    cardBorder: 'border-sky-400/60 hover:border-sky-300',
    cardBg: 'from-sky-950/60 via-slate-900 to-slate-950',
    modalBorder: 'border-sky-400 shadow-2xl shadow-sky-500/35',
    radialBg: 'radial-gradient(circle, rgba(56,189,248,0.32) 0%, rgba(15,23,42,0) 70%)'
  },
  MITICO: {
    label: 'MITICO',
    badgeBg: 'bg-purple-500 text-white',
    cardBorder: 'border-purple-500/70 hover:border-purple-400',
    cardBg: 'from-purple-950/65 via-slate-900 to-slate-950',
    modalBorder: 'border-purple-400 shadow-2xl shadow-purple-500/45',
    radialBg: 'radial-gradient(circle, rgba(168,85,247,0.36) 0%, rgba(15,23,42,0) 70%)'
  },
  LEGGENDARIO: {
    label: 'LEGGENDARIO',
    badgeBg: 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950',
    cardBorder: 'border-amber-400/90 hover:border-yellow-300',
    cardBg: 'from-amber-500/30 via-slate-900 to-slate-950',
    modalBorder: 'border-amber-400 shadow-2xl shadow-amber-500/50',
    radialBg: 'radial-gradient(circle, rgba(251,191,36,0.42) 0%, rgba(15,23,42,0) 70%)'
  },
  INFINITO: {
    label: '♾️ INFINITO',
    badgeBg: 'bg-gradient-to-r from-rose-500 via-fuchsia-400 to-cyan-300 text-slate-950',
    cardBorder: 'border-rose-400 hover:border-cyan-300 shadow-[0_0_20px_rgba(244,63,94,0.35)]',
    cardBg: 'from-rose-950/70 via-fuchsia-950/40 to-slate-950',
    modalBorder: 'border-cyan-300 shadow-[0_0_35px_rgba(244,63,94,0.6)]',
    radialBg: 'radial-gradient(circle, rgba(244,63,94,0.42) 0%, rgba(56,189,248,0.22) 45%, rgba(15,23,42,0) 72%)'
  }
};

// ============================================================================
// 📦 CATALOGO UFFICIALE DEL CHIOSCO (5 CATEGORIE: CAVATAPPI, CALICI, CIMELI, TRONI, SANTINI)
// ============================================================================
export const CHIOSCO_ITEMS = {
  cavatappi: [
    {
      id: 'accendino',
      name: 'Accendino Ignorante',
      rarity: 'COMUNE',
      subtitle: 'Utensile di Sopravvivenza da Marciapiede',
      desc: 'Il classico Bic giallo consumato fino all’osso: leva fisica applicata sulla nocca del dito, colpo secco e tappo spedito direttamente sulla Luna.'
    },
    {
      id: 'cucchiaio',
      name: 'Cucchiaio Ignorante',
      rarity: 'COMUNE',
      subtitle: 'Posata da Scasso Notturno',
      desc: 'Rubato dal cassetto della cucina a mezzanotte quando nessuno trova il cavatappi. Piegato a 45 gradi ma non ha mai fallito una stappata.'
    },
    {
      id: 'bar_blade',
      name: 'Bar Blade Pro',
      rarity: 'RARO',
      subtitle: 'Lama Ufficiale da Bancone',
      desc: 'Piastra piatta in acciaio inox con impugnatura rossa gommata: lo fai girare sul dito come nei film, ma dopo la terza birra ti cade sempre.'
    },
    {
      id: 'oste_legno',
      name: 'Oste in Legno',
      rarity: 'RARO',
      subtitle: 'Reliquia della Vecchia Locanda',
      desc: 'Tornito dal legno massello di una vecchia botte di rovere: profuma ancora di cantina umida, malto tostato e osti che non fanno credito.'
    },
    {
      id: 'pitstop_f1',
      name: 'Pit-Stop F1 Carbon',
      rarity: 'MITICO',
      subtitle: 'Telemetria da Box Scuderia',
      desc: 'Forgiato in vera fibra di carbonio intrecciata con bordi Rosso Corsa. Tempo medio di stappata certificato dalla FIA: 1.8 secondi netti.'
    },
    {
      id: 'zanna_drago',
      name: 'Zanna del Drago',
      rarity: 'MITICO',
      subtitle: 'Artefatto Draconico Livello 20',
      desc: 'Artiglio ricurvo in avorio antico incastonato nel bronzo fuso: garantisce un +10 ai tiri salvezza contro il mal di testa della domenica mattina.'
    },
    {
      id: 'cavatappi_mario',
      name: 'Cavatappi Mario',
      rarity: 'LEGGENDARIO',
      subtitle: 'L’Entità Suprema di "THE BOYS"',
      desc: 'Maglietta d’ordinanza "THE BOYS", sguardo laterale che giudica in silenzio chi beve radler e anello d’acciaio sotto il mento: le bottiglie si stappano da sole per timore reverenziale.'
    },
    {
      id: 'reale_24k',
      name: 'Reale 24 Carati',
      rarity: 'LEGGENDARIO',
      subtitle: 'Gioiello della Corona Luppolata',
      desc: 'Fuso in oro massiccio 24 carati con diamante azzurro nel perno centrale. Talmente lussuoso che se ci stappi una birra del discount prende fuoco.'
    }
  ],
  calici: [
    {
      id: 'krug_ceramica',
      name: 'Krug Ceramica',
      rarity: 'COMUNE',
      subtitle: 'Corazza Bavarese Anti-Sguardo',
      desc: 'Boccale in gres grigio con coperchio in peltro: il bello è che essendo opaco nessuno al tavolo può vedere se stai barando sul livello della birra.'
    },
    {
      id: 'boccale_vichingo',
      name: 'Boccale Vichingo',
      rarity: 'COMUNE',
      subtitle: 'Quercia e Ferro Battuto',
      desc: 'Pesa tre chili già da vuoto: perfetto per fare contemporaneamente mezz’ora di bicipiti e un pieno di doppio malto.'
    },
    {
      id: 'pinta_subzero',
      name: 'Pinta Sub-Zero',
      rarity: 'RARO',
      subtitle: 'Temperatura Critica -18°C',
      desc: 'Estratta direttamente dal ghiacciaio: mantiene la birra gelida anche a Ferragosto, ma se non stai attento ti si incolla la lingua al vetro.'
    },
    {
      id: 'das_boot',
      name: 'Das Boot 1L',
      rarity: 'RARO',
      subtitle: 'Lo Stivale Tedesco da Un Litro',
      desc: 'Tutto facile fino a metà stivale, poi arriva la maledetta bolla d’aria nella punta che ti lancia mezzo litro di Weiss direttamente in faccia.'
    },
    {
      id: 'corno_nord',
      name: 'Corno del Nord',
      rarity: 'MITICO',
      subtitle: 'Reliquia del Valhalla',
      desc: 'Non ha la base piatta, quindi per legge fisica non puoi mai appoggiarlo sul tavolo: o lo finisci tutto d’un fiato o ti lavi i pantaloni.'
    },
    {
      id: 'teschio_cristallo',
      name: 'Teschio Cristallo',
      rarity: 'MITICO',
      subtitle: 'Calice Anatomico di Boemia',
      desc: 'Scolpito a forma di cranio umano: rappresenta fedelmente la radiografia della tua testa il sabato mattina dopo aver attivato il Capitano.'
    },
    {
      id: 'bicchiere_50_74',
      name: 'Bicchiere da 50cl del 74',
      rarity: 'LEGGENDARIO',
      subtitle: 'Plastica Trasparente da Battaglia',
      desc: 'Il leggendario bicchiere in plastica trasparente da mezzo litro del 74: flessibile, indistruttibile e con le righe antiscivolo per non mollarlo mai fino all’ultima goccia.'
    },
    {
      id: 'calice_imperiale',
      name: 'Calice Imperiale',
      rarity: 'LEGGENDARIO',
      subtitle: 'Il Sacro Graal del Sempre Noi',
      desc: 'Coppa in oro zecchino tempestata di rubini: chi beve da questo calice ha il diritto divino di far pagare il giro agli altri.'
    }
  ],
  cimeli: [
    {
      id: 'sottobicchiere_74',
      name: 'Sottobicchiere "Sempre Noi al 74"',
      rarity: 'COMUNE',
      subtitle: 'Reperto Archeologico da Tavolata',
      desc: 'Il glorioso cartoncino del "Sempre Noi al 74", intriso di birre storiche, conti fatti a penna sul retro e promesse di non bere più.'
    },
    {
      id: 'casco_bombardiere',
      name: 'Casco da Bombardiere',
      rarity: 'COMUNE',
      subtitle: 'Sistema Idratazione Mani Libere',
      desc: 'Doppia lattina laterale con cannucce dirette in bocca: lascia entrambe le mani libere per esultare o chiamare il VAR sugli amici.'
    },
    {
      id: 'fusto_30l',
      name: 'Fusto Emergenza 30L',
      rarity: 'RARO',
      subtitle: 'Unità Mobile di Rianimazione',
      desc: 'Trenta litri d’acciaio inox pressurizzato: nella nostra lega è considerato la dose minima sindacale per un aperitivo tranquillo.'
    },
    {
      id: 'alcoltest_esploso',
      name: 'Alcoltest Esploso',
      rarity: 'RARO',
      subtitle: 'Dispositivo Elettronico Martire',
      desc: 'Ha provato a misurare il tasso alcolico del gruppo un venerdì sera alle 2:00: ha segnato "ERR 999" ed è andato in autocombustione.'
    },
    {
      id: 'chiavi_pub',
      name: 'Chiavi del Pub',
      rarity: 'MITICO',
      subtitle: 'Onorificenza di Chiusura Locale',
      desc: 'Consegnate direttamente dal proprietario del pub: ormai chiudi tu la saracinesca, spegni le luci e dai pure da mangiare al cane.'
    },
    {
      id: 'cintura_pesi_massimi',
      name: 'Cintura Pesi Massimi',
      rarity: 'MITICO',
      subtitle: 'Titolo Mondiale Fegato d’Acciaio',
      desc: 'Cuoio nero e placca centrale d’oro massiccio: serve sia a festeggiare il titolo sia a tenere su i pantaloni dopo quattro medie alla spina.'
    },
    {
      id: 'cittadino_74',
      name: 'Cittadino Onorario del 74',
      rarity: 'LEGGENDARIO',
      subtitle: 'Immunità Diplomatica Perpetua',
      desc: 'Pergamena con sigillo in ceralacca e timbro d’oro "74": ti garantisce posto fisso, immunità diplomatica e rispetto eterno nel quartiere.'
    },
    {
      id: 'busto_mario',
      name: 'Busto d’Oro di Mario',
      rarity: 'LEGGENDARIO',
      subtitle: 'Monumento Imperiale "MARIVS • 74"',
      desc: 'Fuso in oro 24k con corona d’alloro imperiale e scritta "THE BOYS" scolpita nel metallo: basta strofinargli la testa lucida prima di bere per raddoppiare la fortuna.'
    }
  ],
  postazioni: [
    {
      id: 'cordolo_marciapiede',
      name: 'Cordolo del Marciapiede',
      rarity: 'COMUNE',
      subtitle: 'Tribuna Popolare Vista Asfalto',
      desc: 'Il classico gradino di cemento fuori dal pub: gelido d’inverno e rovente d’estate, ma quando i tavoli sono pieni diventa un palco VIP.'
    },
    {
      id: 'sedia_monoblocco',
      name: 'Sedia Monoblocco Bianca',
      rarity: 'COMUNE',
      subtitle: 'Regina Indiscussa della Periferia',
      desc: 'Plastica bianca vissuta con una gamba che dondola sempre: resiste agli uragani ma cede improvvisamente alla quarta media alla spina.'
    },
    {
      id: 'cassa_rovesciata',
      name: 'Cassa di Birra Rovesciata',
      rarity: 'RARO',
      subtitle: 'Pouf Ergonomico da Magazzino',
      desc: 'Cassa rigida da 24 bottiglie girata sottosopra: ti lascia la griglia stampata sui pantaloni per tre giorni, ma fa subito veterano del mestiere.'
    },
    {
      id: 'sgabello_mario',
      name: 'Lo Sgabello Nero di Mario',
      rarity: 'RARO',
      subtitle: 'Presidio Ufficiale davanti alla Serranda',
      desc: 'Il mitico sgabello quadrato nero in metallo immortalato a fianco di Mario: punto d’appoggio sacro per birre, chiavi e sentenze notturne.'
    },
    {
      id: 'sgabello_bancone',
      name: 'Sgabello Girevole da Pub',
      rarity: 'MITICO',
      subtitle: 'Perno Oliato ad Alta Velocità',
      desc: 'Cuscino tondo in pelle bordeaux e rotazione rapida a 360 gradi per intercettare lo spillatore prima ancora che l’oste alzi lo sguardo.'
    },
    {
      id: 'divano_dima',
      name: 'Divano di casa di Dima',
      rarity: 'MITICO',
      subtitle: 'Il Salotto Damascato con Tappeto Reale',
      desc: 'Tre cuscini morbidi, tre cuscinetti d’ordinanza, braccioli avvolgenti e tappeto persiano sotto i piedi: se ti siedi qui dopo la terza media entri direttamente in letargo profondo.'
    },
    {
      id: 'sedia_pescatore_74',
      name: 'Sedia da Pescatore del 74',
      rarity: 'LEGGENDARIO',
      subtitle: 'Reliquia Pieghevole con Doppio Portabirre',
      desc: 'Tela verde da campeggio, tubi incrociati e poggia-bicchieri a rete integrati nei due braccioli: si apre in tre secondi sul marciapiede e governa la serata fino all’alba.'
    },
    {
      id: 'trono_fusti',
      name: 'Il Trono di Fusti',
      rarity: 'LEGGENDARIO',
      subtitle: 'Game of Beers • Dominio Assoluto',
      desc: 'Forgiato fondendo insieme 50 fusti d’acciaio e cuscino reale cremisi: chi siede su questo trono governa la classifica della lega col pugno di ferro.'
    }
  ],
 santini: [
    {
      id: 'tendina_capelli',
      name: 'La Tendina (Ver. Teca)',
      rarity: 'INFINITO',
      subtitle: 'Reliquia Capillare Custodita Sottovetro',
      desc: 'Conservata in una teca blindata da museo su cuscino reale: riga in mezzo tracciata col calibro e doppia onda simmetrica che si apre come il sipario del Teatro Ariston.'
    },
    {
      id: 'tendina_sole',
      name: 'La Tendina (Opz. A • Tenda Bar)',
      rarity: 'INFINITO',
      subtitle: 'Tenda da Esterno con Manovella Umana',
      desc: 'Doppia copertura omologata da dehors: sopra la tenda da sole con manovella, sotto la chioma a tendina di Tendina che ripara il tavolo dal sole e dalle sentenze del VAR.'
    },
    {
      id: 'tendina_sipario',
      name: 'La Tendina (Opz. B • Sipario)',
      rarity: 'INFINITO',
      subtitle: 'Bastone in Ottone e Cordoni Reali',
      desc: 'Sorrisone d’ordinanza sormontato da un vero bastone per tende in ottone: i due ciuffi sono tenuti aperti sulle tempie da due cordoni dorati col fiocco da prima teatrale.'
    },
    {
      id: 'biliardino_manolo',
      name: 'Il Biliardino di Manolo',
      rarity: 'INFINITO',
      subtitle: 'Omino da Calciobalilla a Gambe Saldate',
      desc: 'Infilzato direttamente nella stecca d’acciaio del biliardino: maglietta bianca d’ordinanza, braccia tatuate e blocco unico di gambe rigide prive di articolazione alle ginocchia.'
    },
    {
      id: 'smerdino_action',
      name: 'Smerdino Tascabile',
      rarity: 'INFINITO',
      subtitle: 'Action Figure 1:10 con Drum Incluso',
      desc: 'Sigillato nel suo blister originale da collezione: miniatura ultra-secca a torso nudo da 28 grammi netti, venduta con busta di tabacco Drum e cartine di serie.'
    },
    {
      id: 'shifu_peluche',
      name: 'Peluche Maestro Shifu',
      rarity: 'INFINITO',
      subtitle: 'La Guida Spirituale Suprema del Gruppo',
      desc: 'Braccia conserte, sguardo severo che scruta l’anima dei bevitori ed etichetta nera che spunta sotto la tunica: chi cerca la pace interiore al quarto giro deve prima chiedere udienza a Shifu.'
    }
  ]
  
};

export const ALL_CHIOSCO_ITEMS = [
  ...CHIOSCO_ITEMS.cavatappi,
  ...CHIOSCO_ITEMS.calici,
  ...CHIOSCO_ITEMS.cimeli,
  ...CHIOSCO_ITEMS.postazioni,
  ...CHIOSCO_ITEMS.santini
];

const normalizeChioscoId = (rawId) => {
  if (rawId === 'boccale_f1') return 'bicchiere_50_74';
  if (rawId === 'divano_74') return 'divano_dima';
  return rawId;
};

// ============================================================================
// ✨ MOTORE GRAFICO UFFICIALE V.2 PRO 3D (TUTTI GLI OGGETTI + SANTINI)
// ============================================================================
export function ChioscoItemArtwork({ id, size = 'md' }) {
  const sizeClass = size === 'xl' ? 'w-36 h-36' : size === 'sm' ? 'w-14 h-14' : 'w-24 h-24';
  const normId = normalizeChioscoId(id);

  return (
    <div className={`${sizeClass} flex items-center justify-center relative select-none pointer-events-none`}>
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.75)]">
        <defs>
          <radialGradient id="proFloorShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="proGold3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="25%" stopColor="#fde047" />
            <stop offset="55%" stopColor="#eab308" />
            <stop offset="85%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#422006" />
          </linearGradient>
          <linearGradient id="proChrome3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#e2e8f0" />
            <stop offset="60%" stopColor="#64748b" />
            <stop offset="85%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="proWood3D" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="35%" stopColor="#92400e" />
            <stop offset="65%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#290f02" />
          </linearGradient>
          <linearGradient id="proBeer3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="80%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="proRuby3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="40%" stopColor="#ef4444" />
            <stop offset="80%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#450a0a" />
          </linearGradient>
          <linearGradient id="proIce3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#bae6fd" />
            <stop offset="75%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>
          <linearGradient id="proMarioSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffedd5" />
            <stop offset="50%" stopColor="#fdba74" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          <linearGradient id="dimaFabricMain" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbf7f0" />
            <stop offset="55%" stopColor="#ebe2d0" />
            <stop offset="100%" stopColor="#cbbba0" />
          </linearGradient>
          <linearGradient id="dimaFabricSide" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5efe4" />
            <stop offset="60%" stopColor="#dfd3be" />
            <stop offset="100%" stopColor="#b8a689" />
          </linearGradient>
          <linearGradient id="tendinaHairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="35%" stopColor="#451a03" />
            <stop offset="75%" stopColor="#290f02" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
          <pattern id="proCarbon" width="5" height="5" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="#09090b" />
            <path d="M0 0L5 5M5 0L0 5" stroke="#3f3f46" strokeWidth="1.1" />
          </pattern>
        </defs>

        {/* Ombra 3D di appoggio sul pavimento */}
        <ellipse cx="60" cy="109" rx="38" ry="6" fill="url(#proFloorShadow)" />

        {/* ==================== 1. CAVATAPPI PRO 3D (8) ==================== */}
        {normId === 'accendino' && (
          <g transform="rotate(12 60 64)">
            <path d="M56 5 C43 18, 45 31, 56 36 C67 31, 69 18, 56 5 Z" fill="#ea580c" opacity="0.85" />
            <path d="M56 10 C48 20, 49 30, 56 35 C63 30, 64 20, 56 10 Z" fill="#facc15" />
            <path d="M56 19 C52 25, 53 31, 56 34 C59 31, 60 25, 56 19 Z" fill="#ffffff" />
            <rect x="43" y="33" width="24" height="15" rx="2.5" fill="url(#proChrome3D)" stroke="#1e293b" strokeWidth="1.5" />
            <ellipse cx="52" cy="39" rx="2.5" ry="3.5" fill="#0f172a" />
            <circle cx="69" cy="39" r="5.5" fill="url(#proChrome3D)" stroke="#334155" strokeWidth="1.5" strokeDasharray="2 1" />
            <rect x="65" y="43.5" width="13" height="5.5" rx="2" fill="url(#proRuby3D)" stroke="#7f1d1d" strokeWidth="1" />
            <rect x="41" y="48" width="35" height="57" rx="6" fill="url(#proGold3D)" stroke="#854d0e" strokeWidth="1.8" />
            <rect x="45" y="51" width="5.5" height="50" rx="2.5" fill="#ffffff" opacity="0.55" />
            <path d="M43 96 L53 93 M44 100 L56 97 M66 99 L74 95" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
            <g transform="translate(14, 18) rotate(-28)">
              <ellipse cx="14" cy="10" rx="10" ry="4.5" fill="url(#proGold3D)" stroke="#78350f" strokeWidth="1.5" />
              <path d="M24 14 L34 22" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
            </g>
          </g>
        )}

        {normId === 'cucchiaio' && (
          <g>
            <g transform="rotate(-26 60 62)">
              <path d="M55 52 L50 103 C49 109, 71 109, 70 103 L65 52 Z" fill="url(#proChrome3D)" stroke="#334155" strokeWidth="1.8" />
              <path d="M57 58 V99" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <ellipse cx="60" cy="52" rx="6" ry="3" fill="#475569" />
              <ellipse cx="60" cy="31" rx="18" ry="24" fill="url(#proChrome3D)" stroke="#334155" strokeWidth="2" />
              <ellipse cx="58" cy="31" rx="12.5" ry="17.5" fill="#475569" opacity="0.45" />
              <path d="M50 18 C47 26, 48 37, 54 44" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            </g>
            <g transform="translate(74, 14) rotate(22)">
              <ellipse cx="14" cy="10" rx="11" ry="5" fill="url(#proGold3D)" stroke="#78350f" strokeWidth="1.5" />
              <path d="M4 10 C8 14, 20 14, 24 10" stroke="#78350f" strokeWidth="1.5" strokeDasharray="2 1.5" fill="none" />
            </g>
            <circle cx="80" cy="36" r="2" fill="#fde047" />
            <circle cx="34" cy="24" r="1.8" fill="#ffffff" />
          </g>
        )}

        {normId === 'bar_blade' && (
          <g transform="rotate(-34 60 60)">
            <rect x="42" y="8" width="36" height="104" rx="18" fill="url(#proChrome3D)" stroke="#1e293b" strokeWidth="2.2" />
            <rect x="49" y="16" width="22" height="19" rx="5" fill="#09090b" stroke="#475569" strokeWidth="1.8" />
            <path d="M53 35 H67" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <path d="M42 52 H78 V94 C78 104, 70 112, 60 112 C50 112, 42 104, 42 94 Z" fill="url(#proRuby3D)" stroke="#450a0a" strokeWidth="2" />
            <circle cx="60" cy="92" r="9.5" fill="#09090b" stroke="url(#proChrome3D)" strokeWidth="3.5" />
            <path d="M46 40 L74 47" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
            <text x="60" y="72" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="900" letterSpacing="1">PRO•74</text>
          </g>
        )}

        {normId === 'oste_legno' && (
          <g transform="rotate(-28 60 60)">
            <path d="M45 43 V21 C45 10, 75 10, 75 21 V43 Z" fill="url(#proGold3D)" stroke="#451a03" strokeWidth="2.2" />
            <ellipse cx="60" cy="24" rx="9" ry="7.5" fill="#09090b" stroke="#78350f" strokeWidth="1.5" />
            <rect x="54" y="28.5" width="12" height="4.5" rx="1" fill="url(#proGold3D)" />
            <rect x="42" y="42" width="36" height="8" rx="2.5" fill="url(#proChrome3D)" stroke="#1e293b" strokeWidth="1.5" />
            <path d="M44 50 C37 68, 37 89, 46 107 H74 C83 89, 83 68, 76 50 Z" fill="url(#proWood3D)" stroke="#290f02" strokeWidth="2.2" />
            <path d="M53 51 C50 68, 50 88, 53 106 M60 51 V106 M67 51 C70 68, 70 88, 67 106" stroke="#290f02" strokeWidth="1.5" fill="none" opacity="0.75" />
            <rect x="40" y="64" width="40" height="4.5" rx="1.5" fill="url(#proGold3D)" stroke="#451a03" strokeWidth="1" />
            <rect x="40" y="91" width="40" height="4.5" rx="1.5" fill="url(#proGold3D)" stroke="#451a03" strokeWidth="1" />
            <path d="M46 54 C42 70, 42 86, 47 102" stroke="#fde68a" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.4" />
          </g>
        )}

        {normId === 'pitstop_f1' && (
          <g transform="rotate(-34 60 60)">
            <path d="M41 22 C41 9, 79 9, 79 22 C79 33, 71 42, 71 60 C71 78, 79 87, 79 98 C79 111, 41 111, 41 98 C41 87, 49 78, 49 60 C49 42, 41 33, 41 22 Z" fill="url(#proCarbon)" stroke="#ef4444" strokeWidth="3" />
            <path d="M51 44 H69 L67 76 H53 Z" fill="url(#proRuby3D)" stroke="#fef08a" strokeWidth="1" />
            <text x="60" y="61" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="900">F1</text>
            <text x="60" y="70" textAnchor="middle" fill="#fde047" fontSize="5.5" fontWeight="900">DRS</text>
            <circle cx="60" cy="23" r="10" fill="#09090b" stroke="url(#proChrome3D)" strokeWidth="3" />
            <rect x="54" y="29" width="12" height="4.5" rx="1" fill="url(#proChrome3D)" />
            <circle cx="60" cy="96" r="8.5" fill="#09090b" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 2" />
          </g>
        )}

        {normId === 'zanna_drago' && (
          <g>
            <circle cx="60" cy="58" r="44" fill="#a855f7" fillOpacity="0.15" />
            <path d="M65 12 C84 12, 95 25, 90 40 C87 50, 75 54, 66 49 L61 38 C68 41, 76 38, 78 32 C80 25, 74 20, 66 20 Z" fill="url(#proGold3D)" stroke="#451a03" strokeWidth="2" />
            <path d="M46 34 L68 23 L79 42 L61 58 L43 49 Z" fill="url(#proGold3D)" stroke="#451a03" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M48 33 L33 22 L43 40 M56 28 L44 15 L52 32" fill="url(#proGold3D)" stroke="#451a03" strokeWidth="1.6" />
            <circle cx="63" cy="36" r="3.2" fill="#ef4444" stroke="#fef08a" strokeWidth="1" />
            <path d="M46 48 C34 68, 30 90, 19 106 C44 100, 64 83, 64 54 Z" fill="#fffbeb" stroke="#78350f" strokeWidth="2.2" />
            <path d="M48 55 C40 72, 35 86, 26 99" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="44" cy="68" r="1.8" fill="#a855f7" />
            <circle cx="39" cy="80" r="1.8" fill="#a855f7" />
          </g>
        )}

        {normId === 'cavatappi_mario' && (
          <g>
            <circle cx="60" cy="52" r="47" fill="url(#proRuby3D)" fillOpacity="0.35" stroke="url(#proGold3D)" strokeWidth="2.5" />
            <path d="M20 96 C22 74, 38 68, 60 68 C82 68, 98 74, 100 96 Z" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <path d="M44 68 C50 76, 70 76, 76 68" fill="none" stroke="#475569" strokeWidth="3" />
            <text x="74" y="82" textAnchor="middle" fill="#fde047" fontSize="5.5" fontWeight="900" letterSpacing="0.5">THE</text>
            <text x="75" y="90" textAnchor="middle" fill="#ffffff" fontSize="8.8" fontWeight="900">BOYS</text>
            <ellipse cx="33" cy="45" rx="5" ry="7.5" fill="url(#proMarioSkin)" stroke="#7c2d12" strokeWidth="1.3" />
            <ellipse cx="87" cy="45" rx="5" ry="7.5" fill="url(#proMarioSkin)" stroke="#7c2d12" strokeWidth="1.3" />
            <path d="M35 37 C35 15, 85 15, 85 37 C86 57, 76 71, 60 71 C44 71, 34 57, 35 37 Z" fill="url(#proMarioSkin)" stroke="#7c2d12" strokeWidth="1.6" />
            <ellipse cx="52" cy="23" rx="12" ry="5" fill="#ffffff" opacity="0.6" transform="rotate(-10 52 23)" />
            <circle cx="68" cy="25" r="2.5" fill="#ffffff" opacity="0.45" />
            <path d="M35 42 C34 32, 37 25, 42 23 C39 30, 39 37, 39 44 Z M85 42 C86 32, 83 25, 78 23 C81 30, 81 37, 81 44 Z" fill="#18181b" />
            <path d="M42 35 C47 32, 53 33, 56 35 M64 35 C67 33, 73 32, 78 35" stroke="#09090b" strokeWidth="3" strokeLinecap="round" fill="none" />
            <ellipse cx="49" cy="41" rx="5" ry="3.6" fill="#ffffff" stroke="#451a03" strokeWidth="1.1" />
            <circle cx="51.5" cy="41" r="2.4" fill="#09090b" />
            <circle cx="52.2" cy="40.2" r="0.9" fill="#ffffff" />
            <ellipse cx="71" cy="41" rx="5" ry="3.6" fill="#ffffff" stroke="#451a03" strokeWidth="1.1" />
            <circle cx="73.5" cy="41" r="2.4" fill="#09090b" />
            <circle cx="74.2" cy="40.2" r="0.9" fill="#ffffff" />
            <path d="M58 40 V49 C56 51.5, 64 51.5, 62 49" fill="none" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />
            <path d="M35 45 C35 62, 45 72, 60 72 C75 72, 85 62, 85 45 C82 52, 77 55, 71 54 C68 49, 52 49, 49 54 C43 55, 38 52, 35 45 Z" fill="#18181b" stroke="#09090b" strokeWidth="1.3" />
            <path d="M53 56 C57 54.5, 63 54.5, 67 56 C65 60, 55 60, 53 56 Z" fill="#7f1d1d" stroke="#fca5a5" strokeWidth="0.9" />
            <rect x="40" y="89" width="40" height="23" rx="11" fill="url(#proChrome3D)" stroke="#0f172a" strokeWidth="2.2" />
            <ellipse cx="60" cy="100.5" rx="11" ry="6" fill="#020617" />
            <rect x="54" y="93" width="12" height="4.5" rx="1" fill="#ffffff" />
          </g>
        )}

        {normId === 'reale_24k' && (
          <g>
            <circle cx="60" cy="20" r="11" fill="none" stroke="url(#proGold3D)" strokeWidth="5.5" />
            <circle cx="60" cy="8" r="3" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
            <rect x="52" y="30" width="16" height="28" rx="4" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.8" />
            <path d="M52 36 L22 76 L30 83 L52 50 Z" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M68 36 L98 76 L90 83 L68 50 Z" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.8" strokeLinejoin="round" />
            <polygon points="60,35 68,44 60,53 52,44" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="30" cy="75" r="3" fill="#ef4444" stroke="#fef08a" strokeWidth="1" />
            <circle cx="90" cy="75" r="3" fill="#ef4444" stroke="#fef08a" strokeWidth="1" />
            <path d="M60 58 C53 64, 67 70, 60 76 C53 82, 67 88, 60 94 C55 99, 63 104, 60 109" stroke="url(#proGold3D)" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M24 24 H32 M28 20 V28 M88 26 H96 M92 22 V30" stroke="#fef08a" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )}

        {/* ==================== 2. CALICI SPECIALI PRO 3D (8) ==================== */}
        {normId === 'krug_ceramica' && (
          <g>
            <path d="M78 44 H93 C98 44, 100 49, 100 64 C100 79, 98 84, 93 84 H78" fill="none" stroke="url(#proChrome3D)" strokeWidth="6.5" strokeLinecap="round" />
            <path d="M83 35 L96 25" stroke="url(#proChrome3D)" strokeWidth="4" strokeLinecap="round" />
            <path d="M32 36 C35 17, 85 17, 88 36 Z" fill="url(#proChrome3D)" stroke="#1e293b" strokeWidth="2" />
            <circle cx="60" cy="15" r="4.5" fill="url(#proChrome3D)" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="30" y="36" width="56" height="68" rx="6" fill="#cbd5e1" stroke="#334155" strokeWidth="2.5" />
            <rect x="35" y="38" width="10" height="64" fill="#ffffff" opacity="0.45" />
            <rect x="32" y="43" width="52" height="7" fill="#1d4ed8" stroke="#facc15" strokeWidth="1" />
            <rect x="32" y="88" width="52" height="7" fill="#1d4ed8" stroke="#facc15" strokeWidth="1" />
            <polygon points="60,52 74,66 60,80 46,66" fill="url(#proGold3D)" stroke="#1e3a8a" strokeWidth="2" />
            <polygon points="60,56 70,66 60,76 50,66" fill="#38bdf8" />
          </g>
        )}

        {normId === 'boccale_vichingo' && (
          <g>
            <path d="M82 38 H96 C102 38, 104 46, 104 64 C104 82, 102 90, 96 90 H82" fill="none" stroke="url(#proWood3D)" strokeWidth="7.5" strokeLinejoin="round" />
            <path d="M28 30 C27 20, 39 17, 48 21 C54 15, 66 15, 72 21 C81 17, 91 21, 88 30 Z" fill="#ffffff" stroke="#fde68a" strokeWidth="1.5" />
            <path d="M29 28 L24 102 H92 L87 28 Z" fill="url(#proWood3D)" stroke="#1c0a00" strokeWidth="2.5" />
            <path d="M42 28 L39 102 M58 28 V102 M74 28 L77 102" stroke="#1c0a00" strokeWidth="2.2" />
            <rect x="26" y="39" width="64" height="8" rx="2" fill="url(#proChrome3D)" stroke="#0f172a" strokeWidth="1.8" />
            <rect x="24" y="82" width="68" height="9" rx="2" fill="url(#proChrome3D)" stroke="#0f172a" strokeWidth="1.8" />
            <circle cx="35" cy="43" r="2.2" fill="#0f172a" /><circle cx="58" cy="43" r="2.2" fill="#0f172a" /><circle cx="81" cy="43" r="2.2" fill="#0f172a" />
            <circle cx="35" cy="86.5" r="2.2" fill="#0f172a" /><circle cx="58" cy="86.5" r="2.2" fill="#0f172a" /><circle cx="81" cy="86.5" r="2.2" fill="#0f172a" />
            <circle cx="58" cy="63" r="10" fill="url(#proGold3D)" stroke="#451a03" strokeWidth="2" />
            <circle cx="58" cy="63" r="4" fill="#78350f" />
          </g>
        )}

        {normId === 'pinta_subzero' && (
          <g>
            <path d="M31 24 L37 103 H83 L89 24 Z" fill="url(#proIce3D)" stroke="#e0f2fe" strokeWidth="2.5" />
            <path d="M36 28 L41 98" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.65" />
            <path d="M29 25 C29 16, 42 13, 50 17 C56 11, 66 11, 72 17 C80 13, 91 16, 91 25 Z" fill="#ffffff" stroke="#bae6fd" strokeWidth="1.5" />
            <polygon points="31,25 35,50 40,25" fill="#ffffff" opacity="0.9" />
            <polygon points="43,25 48,62 54,25" fill="#e0f2fe" opacity="0.9" />
            <polygon points="65,25 70,54 76,25" fill="#e0f2fe" opacity="0.9" />
            <polygon points="78,25 83,46 88,25" fill="#ffffff" opacity="0.9" />
            <path d="M50 68 H70 M60 58 V78 M53 61 L67 75 M67 61 L53 75" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="60" cy="68" r="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
          </g>
        )}

        {normId === 'das_boot' && (
          <g>
            <path d="M34 18 C34 10, 45 8, 54 11 C63 8, 74 10, 74 18 Z" fill="#ffffff" stroke="#fde68a" strokeWidth="1.5" />
            <path d="M36 18 V74 C36 82, 34 96, 34 102 H95 C104 102, 106 88, 97 84 L71 74 V18 Z" fill="url(#proBeer3D)" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" />
            <ellipse cx="90" cy="93" rx="7" ry="4.5" fill="#ffffff" opacity="0.65" />
            <circle cx="50" cy="46" r="2.2" fill="#ffffff" opacity="0.8" />
            <circle cx="56" cy="62" r="1.8" fill="#ffffff" opacity="0.8" />
            <circle cx="48" cy="80" r="2.5" fill="#ffffff" opacity="0.8" />
            <path d="M41 24 V95 H74" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M33 105 H98" stroke="url(#proChrome3D)" strokeWidth="4.5" strokeLinecap="round" />
          </g>
        )}

        {normId === 'corno_nord' && (
          <g>
            <path d="M52 50 L68 58 L62 74 L46 66 Z" fill="#451a03" stroke="url(#proGold3D)" strokeWidth="1.5" />
            <path d="M68 18 C66 58, 46 82, 14 92 C44 106, 86 86, 100 24 Z" fill="#fffbeb" stroke="#78350f" strokeWidth="2.5" />
            <path d="M74 28 C68 62, 50 82, 22 91" stroke="#f59e0b" strokeWidth="3" fill="none" opacity="0.5" />
            <path d="M66 15 L102 22 L99 35 L64 28 Z" fill="url(#proGold3D)" stroke="#451a03" strokeWidth="2" />
            <circle cx="14" cy="92" r="5.5" fill="url(#proGold3D)" stroke="#451a03" strokeWidth="1.8" />
            <path d="M66 15 C70 7, 100 10, 102 22 Z" fill="#ffffff" stroke="#fde68a" strokeWidth="1.2" />
          </g>
        )}

        {normId === 'teschio_cristallo' && (
          <g>
            <path d="M33 22 C35 12, 85 12, 87 22 Z" fill="#ffffff" stroke="#fde68a" strokeWidth="1.5" />
            <path d="M31 22 C21 38, 24 63, 37 73 L41 100 H79 L83 73 C96 63, 99 38, 89 22 Z" fill="url(#proBeer3D)" stroke="#e0f2fe" strokeWidth="2.8" />
            <ellipse cx="46" cy="51" rx="9.5" ry="8.5" fill="#290f02" stroke="#ffffff" strokeWidth="2" />
            <ellipse cx="74" cy="51" rx="9.5" ry="8.5" fill="#290f02" stroke="#ffffff" strokeWidth="2" />
            <circle cx="48" cy="49" r="2.2" fill="#fde047" opacity="0.8" />
            <circle cx="76" cy="49" r="2.2" fill="#fde047" opacity="0.8" />
            <polygon points="60,57 54,70 66,70" fill="#290f02" stroke="#ffffff" strokeWidth="1.2" />
            <path d="M43 82 H77 M43 91 H77 M49 75 V98 M56 75 V98 M64 75 V98 M71 75 V98" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M33 28 C27 40, 29 56, 36 65" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" />
          </g>
        )}

        {normId === 'bicchiere_50_74' && (
          <g>
            <path d="M33.5 34 L39.5 101 H80.5 L86.5 34 Z" fill="url(#proBeer3D)" opacity="0.86" />
            <circle cx="48" cy="86" r="1.5" fill="#ffffff" opacity="0.75" />
            <circle cx="52" cy="70" r="1.8" fill="#ffffff" opacity="0.75" />
            <circle cx="68" cy="78" r="1.5" fill="#ffffff" opacity="0.75" />
            <circle cx="64" cy="58" r="2" fill="#ffffff" opacity="0.8" />
            <circle cx="55" cy="46" r="1.6" fill="#ffffff" opacity="0.8" />
            <path d="M32.2 25 C34 21, 46 20, 60 20 C74 20, 86 21, 87.8 25 L86.6 35 H33.4 Z" fill="#ffffff" opacity="0.95" />
            <ellipse cx="60" cy="25" rx="27.5" ry="3.2" fill="#f8fafc" />
            <path
              d="M30 18 L39 103 H81 L90 18 Z"
              fill="#e0f2fe"
              fillOpacity="0.16"
              stroke="#e2e8f0"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <ellipse cx="60" cy="103" rx="21" ry="3.2" fill="#bae6fd" fillOpacity="0.35" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M33 46 Q60 49 87 46" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.55" />
            <path d="M34.5 58 Q60 61 85.5 58" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.55" />
            <path d="M36 70 Q60 73 84 70" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.55" />
            <path d="M37.5 84 Q60 87 82.5 84" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.5" />
            <ellipse cx="60" cy="18" rx="31.5" ry="4" fill="#ffffff" fillOpacity="0.35" stroke="#ffffff" strokeWidth="2.2" />
            <line x1="72" y1="34" x2="84" y2="34" stroke="#ffffff" strokeWidth="1.6" opacity="0.85" />
            <text x="77" y="31.5" textAnchor="middle" fill="#ffffff" fontSize="6.2" fontWeight="900" opacity="0.9">0,5L</text>
            <circle cx="60" cy="64" r="11" fill="#0f172a" fillOpacity="0.35" stroke="#ffffff" strokeWidth="1.4" opacity="0.9" />
            <text x="60" y="68" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900" opacity="0.95">74</text>
            <path d="M34.5 23 L42 98" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" opacity="0.65" />
            <path d="M85.5 23 L78.5 96" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            <circle cx="74" cy="52" r="1.4" fill="#e0f2fe" opacity="0.9" />
            <circle cx="71" cy="76" r="1.6" fill="#e0f2fe" opacity="0.9" />
          </g>
        )}

        {normId === 'calice_imperiale' && (
          <g>
            <path d="M26 22 C26 12, 43 10, 52 15 C60 9, 72 10, 78 15 C87 12, 94 16, 94 22 Z" fill="#ffffff" stroke="#fde68a" strokeWidth="1.5" />
            <path d="M26 22 C26 62, 43 70, 60 70 C77 70, 94 62, 94 22 Z" fill="url(#proGold3D)" stroke="#422006" strokeWidth="2.5" />
            <path d="M33 26 C34 52, 45 62, 56 65" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
            <rect x="54" y="70" width="12" height="24" rx="3" fill="url(#proGold3D)" stroke="#422006" strokeWidth="2" />
            <ellipse cx="60" cy="81" rx="9" ry="4" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.5" />
            <path d="M34 104 C40 90, 80 90, 86 104 Z" fill="url(#proGold3D)" stroke="#422006" strokeWidth="2.5" />
            <ellipse cx="41" cy="40" rx="5" ry="6.5" fill="url(#proRuby3D)" stroke="#fef08a" strokeWidth="1.5" />
            <ellipse cx="60" cy="42" rx="6.5" ry="8" fill="url(#proRuby3D)" stroke="#fef08a" strokeWidth="1.8" />
            <ellipse cx="79" cy="40" rx="5" ry="6.5" fill="url(#proRuby3D)" stroke="#fef08a" strokeWidth="1.5" />
            <circle cx="48" cy="99" r="3.2" fill="#10b981" stroke="#fef08a" strokeWidth="1" />
            <circle cx="72" cy="99" r="3.2" fill="#10b981" stroke="#fef08a" strokeWidth="1" />
          </g>
        )}

        {/* ==================== 3. CIMELI BACHECA PRO 3D (8) ==================== */}
        {normId === 'sottobicchiere_74' && (
          <g transform="rotate(-7 60 58)">
            <circle cx="60" cy="62" r="46" fill="#78350f" />
            <circle cx="60" cy="58" r="46" fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
            <circle cx="60" cy="58" r="40" fill="none" stroke="#92400e" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx="73" cy="42" r="19" fill="none" stroke="#d97706" strokeWidth="3.2" opacity="0.5" />
            <circle cx="71" cy="44" r="18" fill="none" stroke="#b45309" strokeWidth="1.2" opacity="0.4" />
            <rect x="16" y="45" width="88" height="26" rx="5" fill="#0f172a" stroke="url(#proGold3D)" strokeWidth="2.2" />
            <text x="60" y="57" textAnchor="middle" fill="#facc15" fontSize="10" fontWeight="900" letterSpacing="0.5">SEMPRE NOI</text>
            <text x="60" y="67" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="900">AL 74 • STORICO</text>
            <path d="M44 82 L44 90 M49 82 L49 90 M54 82 L54 90 M59 82 L59 90 M41 88 L62 83" stroke="#1e3a8a" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}

        {normId === 'casco_bombardiere' && (
          <g>
            <rect x="10" y="30" width="19" height="36" rx="4" fill="url(#proGold3D)" stroke="#78350f" strokeWidth="2" />
            <text x="19.5" y="51" textAnchor="middle" fill="#451a03" fontSize="6.5" fontWeight="900">74</text>
            <rect x="91" y="30" width="19" height="36" rx="4" fill="url(#proGold3D)" stroke="#78350f" strokeWidth="2" />
            <text x="100.5" y="51" textAnchor="middle" fill="#451a03" fontSize="6.5" fontWeight="900">74</text>
            <path d="M27 62 C27 26, 93 26, 93 62 Z" fill="url(#proRuby3D)" stroke="#450a0a" strokeWidth="2.5" />
            <path d="M38 35 C46 28, 62 28, 72 34" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
            <path d="M20 60 H100 L91 70 H29 Z" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
            <rect x="46" y="42" width="28" height="13" rx="3" fill="#0f172a" stroke="#facc15" strokeWidth="1.5" />
            <text x="60" y="51" textAnchor="middle" fill="#facc15" fontSize="7.5" fontWeight="900">BOMBER</text>
            <path d="M19 30 C19 12, 48 14, 54 42 M101 30 C101 12, 72 14, 66 42" fill="none" stroke="#fde047" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M60 55 V96 C60 103, 43 103, 40 94" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {normId === 'fusto_30l' && (
          <g>
            <rect x="54" y="8" width="12" height="16" rx="2" fill="url(#proChrome3D)" stroke="#1e293b" strokeWidth="1.8" />
            <path d="M44 12 H76" stroke="url(#proRuby3D)" strokeWidth="5.5" strokeLinecap="round" />
            <rect x="26" y="24" width="68" height="82" rx="9" fill="url(#proChrome3D)" stroke="#1e293b" strokeWidth="2.5" />
            <rect x="33" y="27" width="10" height="76" rx="4" fill="#ffffff" opacity="0.6" />
            <rect x="24" y="42" width="72" height="8" rx="4" fill="url(#proChrome3D)" stroke="#334155" strokeWidth="1.8" />
            <rect x="24" y="80" width="72" height="8" rx="4" fill="url(#proChrome3D)" stroke="#334155" strokeWidth="1.8" />
            <rect x="37" y="53" width="46" height="23" rx="5" fill="url(#proRuby3D)" stroke="url(#proGold3D)" strokeWidth="2" />
            <text x="60" y="69" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="900">30L</text>
          </g>
        )}

        {normId === 'alcoltest_esploso' && (
          <g transform="rotate(-12 60 60)">
            <path d="M20 46 C8 28, 28 10, 44 24 C54 6, 80 8, 84 26 C102 18, 108 44, 92 58 Z" fill="#ef4444" />
            <path d="M28 46 C20 32, 36 18, 48 28 C56 14, 76 16, 78 30 C90 26, 94 42, 84 52 Z" fill="#facc15" />
            <rect x="30" y="14" width="9" height="19" rx="2.5" fill="url(#proChrome3D)" stroke="#1e293b" strokeWidth="1.5" transform="rotate(-22 34 22)" />
            <rect x="31" y="36" width="54" height="70" rx="8" fill="#0f172a" stroke="url(#proChrome3D)" strokeWidth="2.5" />
            <rect x="38" y="43" width="40" height="30" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="2.2" />
            <text x="58" y="57" textAnchor="middle" fill="#fde047" fontSize="10" fontWeight="900">ERR</text>
            <text x="58" y="70" textAnchor="middle" fill="#ef4444" fontSize="11.5" fontWeight="900">999</text>
            <path d="M39 45 L52 56 L47 68" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.7" />
            <circle cx="58" cy="89" r="8" fill="url(#proRuby3D)" stroke="url(#proGold3D)" strokeWidth="2" />
          </g>
        )}

        {normId === 'chiavi_pub' && (
          <g>
            <circle cx="64" cy="28" r="15" fill="none" stroke="url(#proGold3D)" strokeWidth="5" />
            <g transform="rotate(32 52 44)">
              <rect x="28" y="42" width="18" height="28" rx="4" fill="url(#proRuby3D)" stroke="url(#proGold3D)" strokeWidth="1.8" />
              <text x="37" y="60" textAnchor="middle" fill="#fef08a" fontSize="9.5" fontWeight="900">74</text>
            </g>
            <g transform="rotate(18 58 40)">
              <circle cx="52" cy="42" r="10" fill="url(#proGold3D)" stroke="#422006" strokeWidth="2" />
              <circle cx="52" cy="42" r="4" fill="#0f172a" />
              <rect x="49" y="52" width="6" height="45" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.5" />
              <rect x="40" y="83" width="9" height="5" fill="url(#proGold3D)" />
              <rect x="40" y="91" width="9" height="5" fill="url(#proGold3D)" />
            </g>
            <g transform="rotate(-12 68 42)">
              <circle cx="69" cy="44" r="13" fill="url(#proGold3D)" stroke="#422006" strokeWidth="2.2" />
              <polygon points="69,38 74,44 69,50 64,44" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
              <rect x="66" y="57" width="6.5" height="49" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.6" />
              <rect x="72.5" y="88" width="10" height="5.5" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1" />
              <rect x="72.5" y="96" width="10" height="5.5" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1" />
            </g>
          </g>
        )}

        {normId === 'cintura_pesi_massimi' && (
          <g>
            <path d="M4 46 L116 46 L110 78 L10 78 Z" fill="#09090b" stroke="url(#proGold3D)" strokeWidth="2.5" />
            <rect x="12" y="50" width="15" height="24" rx="3" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.6" />
            <rect x="93" y="50" width="15" height="24" rx="3" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.6" />
            <polygon points="60,24 90,38 90,86 60,100 30,86 30,38" fill="url(#proGold3D)" stroke="#422006" strokeWidth="2.8" />
            <polygon points="60,30 84,41 84,83 60,94 36,83 36,41" fill="none" stroke="#fef9c3" strokeWidth="1.2" />
            <circle cx="60" cy="62" r="19" fill="#0f172a" stroke="url(#proGold3D)" strokeWidth="2.5" />
            <rect x="48" y="53" width="10" height="16" rx="2" fill="url(#proBeer3D)" stroke="#ffffff" strokeWidth="1.2" />
            <rect x="62" y="53" width="10" height="16" rx="2" fill="url(#proBeer3D)" stroke="#ffffff" strokeWidth="1.2" />
            <circle cx="60" cy="34" r="3.2" fill="#ef4444" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="43" cy="41" r="2.6" fill="#ef4444" />
            <circle cx="77" cy="41" r="2.6" fill="#ef4444" />
          </g>
        )}

        {normId === 'cittadino_74' && (
          <g>
            <rect x="12" y="12" width="96" height="7" rx="3.5" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.5" />
            <rect x="12" y="97" width="96" height="7" rx="3.5" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.5" />
            <rect x="18" y="18" width="84" height="80" fill="#fef3c7" stroke="#b45309" strokeWidth="2.2" />
            <rect x="23" y="23" width="74" height="70" fill="none" stroke="#d97706" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="60" y="36" textAnchor="middle" fill="#451a03" fontSize="6.8" fontWeight="900">CITTADINO ONORARIO</text>
            <text x="60" y="46" textAnchor="middle" fill="#b45309" fontSize="9" fontWeight="900">DEL CIVICO 74</text>
            <path d="M29 55 H91 M29 62 H85 M29 69 H75" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="79" cy="80" r="11.5" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.8" />
            <text x="79" y="84" textAnchor="middle" fill="#451a03" fontSize="10.5" fontWeight="900">74</text>
            <path d="M36 84 L30 110 L38 104 L44 110 L41 84" fill="#991b1b" />
            <circle cx="38" cy="82" r="9.5" fill="url(#proRuby3D)" stroke="#fef08a" strokeWidth="1.5" />
          </g>
        )}

        {normId === 'busto_mario' && (
          <g>
            <circle cx="60" cy="48" r="45" fill="#facc15" fillOpacity="0.16" stroke="url(#proGold3D)" strokeWidth="2" strokeDasharray="5 3" />
            <rect x="28" y="95" width="64" height="15" rx="3.5" fill="url(#proGold3D)" stroke="#422006" strokeWidth="2.2" />
            <text x="60" y="105.5" textAnchor="middle" fill="#422006" fontSize="7.8" fontWeight="900" letterSpacing="0.8">MARIVS • 74</text>
            <path d="M20 95 C23 73, 39 68, 60 68 C81 68, 97 73, 100 95 Z" fill="url(#proGold3D)" stroke="#422006" strokeWidth="2.2" />
            <path d="M32 73 C46 84, 74 84, 88 73" fill="none" stroke="#854d0e" strokeWidth="2.2" />
            <text x="73" y="88" textAnchor="middle" fill="#422006" fontSize="6.8" fontWeight="900">THE BOYS</text>
            <ellipse cx="34" cy="44" rx="4.5" ry="7" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.5" />
            <ellipse cx="86" cy="44" rx="4.5" ry="7" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.5" />
            <path d="M36 35 C36 14, 84 14, 84 35 C85 55, 76 69, 60 69 C44 69, 35 55, 36 35 Z" fill="url(#proGold3D)" stroke="#422006" strokeWidth="2.2" />
            <ellipse cx="53" cy="22" rx="11" ry="4.5" fill="#ffffff" opacity="0.75" />
            <path d="M33 40 C29 29, 34 20, 43 16 M87 40 C91 29, 86 20, 77 16" stroke="#15803d" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="34" cy="31" r="2.8" fill="#22c55e" /><circle cx="38" cy="22" r="2.8" fill="#22c55e" />
            <circle cx="86" cy="31" r="2.8" fill="#22c55e" /><circle cx="82" cy="22" r="2.8" fill="#22c55e" />
            <path d="M43 34 C47 31.5, 53 32, 56 34 M64 34 C67 32, 73 31.5, 77 34" stroke="#422006" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <ellipse cx="49.5" cy="39.5" rx="4.5" ry="3.1" fill="#fef9c3" stroke="#422006" strokeWidth="1.2" />
            <circle cx="51.2" cy="39.5" r="2" fill="#422006" />
            <ellipse cx="70.5" cy="39.5" rx="4.5" ry="3.1" fill="#fef9c3" stroke="#422006" strokeWidth="1.2" />
            <circle cx="72.2" cy="39.5" r="2" fill="#422006" />
            <path d="M58 39 V47.5 C55.5 50, 64.5 50, 62 47.5" fill="none" stroke="#422006" strokeWidth="2" strokeLinecap="round" />
            <path d="M36 44 C36 61, 45 70, 60 70 C75 70, 84 61, 84 44 C80 50, 76 53, 70 52 C66 47, 54 47, 50 52 C44 53, 40 50, 36 44 Z" fill="#ca8a04" stroke="#422006" strokeWidth="1.8" />
            <path d="M51 54.5 C55 52.5, 65 52.5, 69 54.5 C67 60, 53 60, 51 54.5 Z" fill="#422006" stroke="#fde047" strokeWidth="1.3" />
            <path d="M53.5 55.5 H66.5" stroke="#fef9c3" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M55 60.5 C58 62, 62 62, 65 60.5" stroke="#fde047" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* ==================== 4. TRONI & POSTAZIONI PRO 3D (8) ==================== */}
        {normId === 'cordolo_marciapiede' && (
          <g>
            <polygon points="8,82 112,82 118,105 2,105" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <path d="M20,94 H46 M74,94 H100" stroke="#facc15" strokeWidth="3.5" strokeLinecap="round" />
            <polygon points="15,40 105,40 112,57 8,57" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
            <rect x="8" y="57" width="104" height="25" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
            <path d="M60 40 V82 M33 57 L29 70 L35 77" stroke="#334155" strokeWidth="2" fill="none" />
            <circle cx="43" cy="49" r="5" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.2" />
            <path d="M76 11 H82 L83 19 C85 22, 87 25, 87 29 V47 H71 V29 C71 25, 73 22, 75 19 Z" fill="#15803d" stroke="#052e16" strokeWidth="1.8" />
            <rect x="72.5" y="28" width="13" height="10" rx="1" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
            <text x="79" y="35" textAnchor="middle" fill="#dc2626" fontSize="6" fontWeight="900">66</text>
          </g>
        )}

        {normId === 'sedia_monoblocco' && (
          <g>
            <path d="M36 68 L27 106 M84 68 L93 106 M42 74 L38 108 M78 74 L82 108" stroke="url(#proChrome3D)" strokeWidth="4.8" strokeLinecap="round" />
            <rect x="33" y="88" width="10" height="7" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1" transform="rotate(-12 38 91)" />
            <path d="M33 17 C33 10, 87 10, 87 17 L83 61 H37 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="2.5" />
            <rect x="42" y="23" width="36" height="5.5" rx="2.5" fill="#0f172a" />
            <rect x="42" y="33" width="36" height="5.5" rx="2.5" fill="#0f172a" />
            <rect x="42" y="43" width="36" height="5.5" rx="2.5" fill="#0f172a" />
            <path d="M35 43 C19 43, 19 66, 33 66 M85 43 C101 43, 101 66, 87 66" fill="none" stroke="#f8fafc" strokeWidth="5.5" strokeLinecap="round" />
            <polygon points="33,59 87,59 93,74 27,74" fill="#e2e8f0" stroke="#64748b" strokeWidth="2.2" />
          </g>
        )}

        {normId === 'cassa_rovesciata' && (
          <g>
            <polygon points="22,26 98,26 108,46 12,46" fill="url(#proRuby3D)" stroke="#450a0a" strokeWidth="2.2" />
            <path d="M35 26 L27 46 M60 26 V46 M85 26 L93 46 M18 36 H102" stroke="#450a0a" strokeWidth="2.2" />
            <rect x="12" y="46" width="96" height="55" rx="4" fill="#b91c1c" stroke="#450a0a" strokeWidth="2.5" />
            <rect x="18" y="46" width="9" height="55" fill="#7f1d1d" />
            <rect x="93" y="46" width="9" height="55" fill="#7f1d1d" />
            <rect x="43" y="54" width="34" height="11" rx="5.5" fill="#09090b" stroke="#450a0a" strokeWidth="1.8" />
            <rect x="31" y="71" width="58" height="20" rx="4" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.8" />
            <text x="60" y="84.5" textAnchor="middle" fill="#09090b" fontSize="10.5" fontWeight="900">SEMPRE 74</text>
          </g>
        )}

        {normId === 'sgabello_mario' && (
          <g>
            <rect x="20" y="10" width="80" height="44" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" opacity="0.65" />
            <path d="M20 20 H100 M20 30 H100 M20 40 H100" stroke="#0f172a" strokeWidth="2.2" />
            <path d="M33 48 L29 98 M87 48 L91 98" stroke="#09090b" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M23 84 H97 M25 76 L31 90 M95 76 L89 90" stroke="#27272a" strokeWidth="4" strokeLinecap="round" />
            <polygon points="25,33 95,33 105,52 15,52" fill="#27272a" stroke="#71717a" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="15,52 105,52 105,58 15,58" fill="#09090b" stroke="#3f3f46" strokeWidth="1.8" />
            <path d="M21 58 L17 108 M99 58 L103 108" stroke="#18181b" strokeWidth="6.5" strokeLinecap="round" />
            <path d="M21 58 L17 108 M99 58 L103 108" stroke="#52525b" strokeWidth="1.6" strokeLinecap="round" />
            <rect x="40" y="38.5" width="40" height="10" rx="2.5" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.2" />
            <text x="60" y="45.8" textAnchor="middle" fill="#09090b" fontSize="6.5" fontWeight="900">THE BOYS</text>
          </g>
        )}

        {normId === 'sgabello_bancone' && (
          <g>
            <rect x="54" y="44" width="12" height="54" fill="url(#proChrome3D)" stroke="#1e293b" strokeWidth="1.8" />
            <path d="M26 105 C35 93, 85 93, 94 105 Z" fill="url(#proChrome3D)" stroke="#1e293b" strokeWidth="2.2" />
            <ellipse cx="60" cy="74" rx="28" ry="7.5" fill="none" stroke="url(#proChrome3D)" strokeWidth="4.5" />
            <ellipse cx="60" cy="36" rx="35" ry="12.5" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2.2" />
            <ellipse cx="60" cy="29.5" rx="35" ry="11.5" fill="url(#proRuby3D)" stroke="#fca5a5" strokeWidth="1.5" />
            <ellipse cx="50" cy="26" rx="15" ry="4.5" fill="#ffffff" opacity="0.35" />
            <path d="M18 32 C11 41, 18 49, 29 49 M102 32 C109 41, 102 49, 91 49" stroke="#fde047" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        )}

        {normId === 'divano_dima' && (
          <g>
            <polygon points="3,89 117,89 119,109 1,109" fill="#7f1d1d" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="8,92 112,92 114,106 6,106" fill="#1e3a8a" stroke="#facc15" strokeWidth="1" strokeDasharray="3 1.5" />
            <polygon points="14,95 106,95 107,103 13,103" fill="#991b1b" />
            <circle cx="30" cy="99" r="2" fill="#fde047" /><circle cx="60" cy="99" r="2.5" fill="#fde047" /><circle cx="90" cy="99" r="2" fill="#fde047" />
            <rect x="17" y="23" width="28" height="34" rx="4" fill="url(#dimaFabricMain)" stroke="#b8a689" strokeWidth="1.8" />
            <rect x="46" y="22" width="28" height="35" rx="4" fill="url(#dimaFabricMain)" stroke="#b8a689" strokeWidth="1.8" />
            <rect x="75" y="23" width="28" height="34" rx="4" fill="url(#dimaFabricMain)" stroke="#b8a689" strokeWidth="1.8" />
            <path d="M27 30 C30 27, 34 27, 35 30 M56 29 C59 26, 63 26, 64 29 M85 30 C88 27, 92 27, 93 30" stroke="#cbbba0" strokeWidth="1.2" fill="none" />
            <rect x="23" y="34" width="17" height="18" rx="2.5" fill="url(#dimaFabricSide)" stroke="#a89678" strokeWidth="1.6" transform="rotate(-4 31 43)" />
            <rect x="51.5" y="33.5" width="17" height="18" rx="2.5" fill="url(#dimaFabricSide)" stroke="#a89678" strokeWidth="1.6" />
            <rect x="80" y="34" width="17" height="18" rx="2.5" fill="url(#dimaFabricSide)" stroke="#a89678" strokeWidth="1.6" transform="rotate(4 88 43)" />
            <rect x="19" y="53" width="27" height="16" rx="3.5" fill="url(#dimaFabricMain)" stroke="#a89678" strokeWidth="1.8" />
            <rect x="46.5" y="53" width="27" height="16" rx="3.5" fill="url(#dimaFabricMain)" stroke="#a89678" strokeWidth="1.8" />
            <rect x="74" y="53" width="27" height="16" rx="3.5" fill="url(#dimaFabricMain)" stroke="#a89678" strokeWidth="1.8" />
            <line x1="21" y1="64" x2="44" y2="64" stroke="#b8a689" strokeWidth="1.2" />
            <line x1="48.5" y1="64" x2="71.5" y2="64" stroke="#b8a689" strokeWidth="1.2" />
            <line x1="76" y1="64" x2="99" y2="64" stroke="#b8a689" strokeWidth="1.2" />
            <path d="M6 52 C4 42, 13 38, 19 44 V72 H9 C6 66, 6 58, 6 52 Z" fill="url(#dimaFabricSide)" stroke="#a89678" strokeWidth="1.8" />
            <circle cx="13" cy="51" r="6" fill="url(#dimaFabricMain)" stroke="#a89678" strokeWidth="1.4" />
            <path d="M114 52 C116 42, 107 38, 101 44 V72 H111 C114 66, 114 58, 114 52 Z" fill="url(#dimaFabricSide)" stroke="#a89678" strokeWidth="1.8" />
            <circle cx="107" cy="51" r="6" fill="url(#dimaFabricMain)" stroke="#a89678" strokeWidth="1.4" />
            <rect x="9" y="69" width="102" height="12" fill="url(#dimaFabricSide)" stroke="#a89678" strokeWidth="1.6" />
            <polygon points="9,81 111,81 113,94 7,94" fill="url(#dimaFabricMain)" stroke="#a89678" strokeWidth="1.6" />
            <path d="M14 81 L12 94 M44 81 L43 94 M46 81 L47 94 M74 81 L73 94 M76 81 L77 94 M106 81 L108 94" stroke="#8c7a5b" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        )}

        {normId === 'sedia_pescatore_74' && (
          <g>
            <circle cx="58" cy="56" r="45" fill="#facc15" fillOpacity="0.14" />
            <path d="M28 70 L88 105 M88 70 L28 105 M22 48 L30 105 M94 48 L86 105" stroke="url(#proChrome3D)" strokeWidth="3.6" strokeLinecap="round" />
            <circle cx="58" cy="87.5" r="3.5" fill="url(#proGold3D)" stroke="#1e293b" strokeWidth="1.2" />
            <rect x="23" y="102" width="10" height="5.5" rx="2" fill="#09090b" stroke="#facc15" strokeWidth="0.8" />
            <rect x="83" y="102" width="10" height="5.5" rx="2" fill="#09090b" stroke="#facc15" strokeWidth="0.8" />
            <path d="M29 15 C45 20, 71 20, 87 15 L85 62 H31 Z" fill="#15803d" stroke="url(#proGold3D)" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M36 18 V60 M80 18 V60" stroke="#fde047" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
            <rect x="42" y="25" width="32" height="19" rx="4" fill="#052e16" stroke="url(#proGold3D)" strokeWidth="2" />
            <text x="58" y="38.5" textAnchor="middle" fill="#fde047" fontSize="11.5" fontWeight="900">74</text>
            <polygon points="30,60 86,60 95,72 21,72" fill="#166534" stroke="url(#proGold3D)" strokeWidth="2.2" strokeLinejoin="round" />
            <polygon points="31,42 10,50 29,55 34,46" fill="#15803d" stroke="url(#proGold3D)" strokeWidth="1.8" strokeLinejoin="round" />
            <polygon points="85,42 106,50 87,55 82,46" fill="#15803d" stroke="url(#proGold3D)" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M13 51 L15 67 H26 L28 51" fill="#09090b" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 1" />
            <rect x="16.5" y="34" width="9" height="17" rx="1.5" fill="url(#proBeer3D)" stroke="#ffffff" strokeWidth="1.2" />
            <path d="M16 35 C16 31, 26 31, 26 35 Z" fill="#ffffff" />
            <ellipse cx="20.5" cy="51" rx="8" ry="3" fill="none" stroke="url(#proGold3D)" strokeWidth="2" />
            <path d="M88 51 L90 67 H101 L103 51" fill="#09090b" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 1" />
            <ellipse cx="95.5" cy="51" rx="8" ry="3" fill="#020617" stroke="url(#proGold3D)" strokeWidth="2" />
          </g>
        )}

        {normId === 'trono_fusti' && (
          <g>
            <path d="M60 6 V48 M41 10 L54 48 M79 10 L66 48 M24 20 L48 52 M96 20 L72 52" stroke="url(#proGold3D)" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="60" cy="6" r="4" fill="url(#proRuby3D)" stroke="#fef08a" strokeWidth="1" />
            <circle cx="41" cy="10" r="3.5" fill="url(#proRuby3D)" stroke="#fef08a" strokeWidth="1" />
            <circle cx="79" cy="10" r="3.5" fill="url(#proRuby3D)" stroke="#fef08a" strokeWidth="1" />
            <rect x="45" y="19" width="30" height="53" rx="5" fill="url(#proChrome3D)" stroke="#1e293b" strokeWidth="2.2" />
            <rect x="28" y="29" width="19" height="45" rx="4" fill="url(#proChrome3D)" stroke="#1e293b" strokeWidth="2" />
            <rect x="73" y="29" width="19" height="45" rx="4" fill="url(#proChrome3D)" stroke="#1e293b" strokeWidth="2" />
            <rect x="12" y="55" width="25" height="37" rx="5" fill="url(#proGold3D)" stroke="#422006" strokeWidth="2.2" />
            <rect x="83" y="55" width="25" height="37" rx="5" fill="url(#proGold3D)" stroke="#422006" strokeWidth="2.2" />
            <rect x="33" y="67" width="54" height="17" rx="4" fill="url(#proRuby3D)" stroke="url(#proGold3D)" strokeWidth="2.5" />
            <polygon points="14,92 106,92 114,108 6,108" fill="url(#proGold3D)" stroke="#422006" strokeWidth="2.5" />
            <polygon points="47,46 53,34 60,42 67,34 73,46" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.6" />
          </g>
        )}

        {/* ==================== 5. SANTINI / RELIQUIE INFINITE ==================== */}
        {/* 💇‍♂️ LA TENDINA DI TENDINA (TECA DI CRISTALLO DA MUSEO CON SOLO LA CAPIGLIATURA A TENDINA!) */}
        {normId === 'tendina_capelli' && (
          <g>
            {/* 1. Sfondo interno della teca (velluto scuro da museo) */}
            <rect x="22" y="16" width="76" height="72" rx="8" fill="#09090b" fillOpacity="0.55" />

            {/* 2. Cuscino Reale in velluto cremisi e oro dentro la teca */}
            <path d="M26 84 C32 73, 88 73, 94 84 Z" fill="url(#proRuby3D)" stroke="url(#proGold3D)" strokeWidth="1.8" />
            {/* Asta dorata reggi-capigliatura al centro del cuscino */}
            <rect x="57" y="56" width="6" height="22" rx="2" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.2" />
            <ellipse cx="60" cy="78" rx="11" ry="3.5" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.2" />
            {/* Calotta neutra interna porta-parrucca (appena visibile sotto la riga) */}
            <ellipse cx="60" cy="48" rx="15" ry="12" fill="#334155" opacity="0.45" />

            {/* 3. SOLO LA CAPIGLIATURA A TENDINA (Fedele alla foto: riga centrale netta e due onde simmetriche) */}
            {/* Tenda di Capelli Sinistra */}
            <path
              d="M59.2 26 C44 25, 31 35, 30 53 C29 63, 33 70, 39 73 C38 64, 41 55, 46 49 C51 43, 56 38, 59.2 31 Z"
              fill="url(#tendinaHairGrad)"
              stroke="#1c0a00"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Tenda di Capelli Destra */}
            <path
              d="M60.8 26 C76 25, 89 35, 90 53 C91 63, 87 70, 81 73 C82 64, 79 55, 74 49 C69 43, 64 38, 60.8 31 Z"
              fill="url(#tendinaHairGrad)"
              stroke="#1c0a00"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />

            {/* Ciocche interne a tendina che scendono verso il centro (come nella foto!) */}
            <path
              d="M58.5 30 C52 38, 46 47, 45 59"
              stroke="#78350f"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M61.5 30 C68 38, 74 47, 75 59"
              stroke="#78350f"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Riflessi lucidi 3D sulle due onde di capelli castani */}
            <path
              d="M54 28 C42 31, 35 41, 34 55"
              stroke="#b45309"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M66 28 C78 31, 85 41, 86 55"
              stroke="#b45309"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M48 31 C39 36, 36 45, 36 53 M72 31 C81 36, 84 45, 84 53"
              stroke="#fde68a"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              opacity="0.45"
            />

            {/* Riga centrale millimetrica */}
            <line x1="60" y1="25" x2="60" y2="33" stroke="#fde68a" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />

            {/* 4. TECA DI CRISTALLO TRASPARENTE SOPRA LA CAPIGLIATURA (Effetto Vetro Museo) */}
            <rect
              x="20"
              y="14"
              width="80"
              height="74"
              rx="8"
              fill="#e0f2fe"
              fillOpacity="0.13"
              stroke="#bae6fd"
              strokeWidth="2.2"
            />
            {/* Spigoli interni della teca in prospettiva 3D */}
            <line x1="25" y1="18" x2="25" y2="84" stroke="#ffffff" strokeWidth="1.2" opacity="0.35" />
            <line x1="95" y1="18" x2="95" y2="84" stroke="#ffffff" strokeWidth="1.2" opacity="0.25" />
            {/* Fasci di luce diagonali sul vetro della teca */}
            <path d="M26 32 L42 18 M26 48 L56 18" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
            <path d="M82 80 L94 68" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

{/* 5. Piedistallo da Museo in Legno Massello e Oro con Targa "TENDINA" */}
            <polygon points="15,86 105,86 110,93 10,93" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.8" />
            <rect x="12" y="93" width="96" height="15" rx="3" fill="url(#proWood3D)" stroke="#1c0a00" strokeWidth="2.2" />
            <rect x="31" y="95.5" width="58" height="10" rx="2" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.4" />
            <text x="60" y="103" textAnchor="middle" fill="#1c0a00" fontSize="7.5" fontWeight="900" letterSpacing="1">TENDINA</text>
          </g>
        )}

        {/* ⚽ IL BILIARDINO DI MANOLO (OMINO CALCIOBALILLA CON VISO DI MANOLO, STECCHE E GAMBE SALDATE) */}
        {normId === 'biliardino_manolo' && (
          <g>
            {/* 1. Campo verde del Biliardino alla base con righe bianche e pallina */}
            <polygon points="14,96 106,96 114,109 6,109" fill="#15803d" stroke="url(#proGold3D)" strokeWidth="1.8" strokeLinejoin="round" />
            <line x1="16" y1="102.5" x2="104" y2="102.5" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
            <circle cx="84" cy="102" r="5.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />

            {/* 2. Stecche d'acciaio cromato del Biliardino (senza molle) */}
            <line x1="4" y1="42" x2="116" y2="42" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" opacity="0.45" />
            <rect x="2" y="55" width="116" height="6.5" rx="3" fill="url(#proChrome3D)" stroke="#0f172a" strokeWidth="1.5" />
            <line x1="6" y1="57" x2="114" y2="57" stroke="#ffffff" strokeWidth="1.4" opacity="0.85" />
            {/* Boccole nere ferma-omino sulla stecca */}
            <rect x="31" y="53.5" width="5" height="9.5" rx="1.2" fill="#09090b" stroke="#475569" strokeWidth="1" />
            <rect x="84" y="53.5" width="5" height="9.5" rx="1.2" fill="#09090b" stroke="#475569" strokeWidth="1" />

            {/* 3. BLOCCO UNICO GAMBE DRITTE SALDATE DA BILIARDINO (Zero ginocchia!) */}
            {/* Pantaloncini neri rigidi */}
            <path d="M46 73 H74 L72 83 H48 Z" fill="#09090b" stroke="#334155" strokeWidth="1.4" />
            {/* Gambe fuse in un pezzo unico con scanalatura centrale */}
            <path d="M48.5 83 H71.5 L69.5 100 H50.5 Z" fill="url(#proMarioSkin)" stroke="#7c2d12" strokeWidth="1.4" />
            <rect x="49.5" y="91" width="21" height="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="49.5" y1="93.5" x2="70.5" y2="93.5" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="60" y1="75" x2="60" y2="100" stroke="#451a03" strokeWidth="1.6" opacity="0.7" />
            {/* Piedino unico squadrato da calcetto */}
            <polygon points="48,100 72,100 74,106 46,106" fill="#0f172a" stroke="url(#proGold3D)" strokeWidth="1.4" />

            {/* 4. Busto rigido da Biliardino con la Maglietta Bianca di Manolo e Braccia Tatuate */}
            {/* Braccia tatuate agganciate alla stecca */}
            <rect x="36" y="52" width="8.5" height="15" rx="3.5" fill="url(#proMarioSkin)" stroke="#451a03" strokeWidth="1.2" />
            <path d="M37 56 L43 59 M37 60 L43 63 M37 64 L43 61" stroke="#1e293b" strokeWidth="1.4" opacity="0.75" />
            <rect x="75.5" y="52" width="8.5" height="15" rx="3.5" fill="url(#proMarioSkin)" stroke="#451a03" strokeWidth="1.2" />
            <path d="M77 55 L83 58 M77 59 L83 62 M77 63 L83 60" stroke="#0f172a" strokeWidth="1.6" opacity="0.8" />
            {/* Maglietta Bianca "CRISTIANO RONALDO" */}
            <path d="M38 45 C38 42, 46 40, 60 40 C74 40, 82 42, 82 45 L77 56 H74 V73 H46 V56 H43 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.6" strokeLinejoin="round" />
            <text x="60" y="51.5" textAnchor="middle" fill="#475569" fontSize="4.6" fontWeight="900">♥ MONEY &</text>
            <text x="60" y="57.5" textAnchor="middle" fill="#334155" fontSize="5" fontWeight="900">CRISTIANO</text>
            <text x="60" y="63.5" textAnchor="middle" fill="#334155" fontSize="5.2" fontWeight="900">RONALDO</text>

            {/* 5. TESTA DI MANOLO (Frangetta mossa, Occhiali senza montatura, Baffetto e Sorrisone) */}
            <rect x="55.5" y="36" width="9" height="6" rx="2" fill="url(#proMarioSkin)" />
            {/* Orecchie + Orecchini a cerchietto */}
            <ellipse cx="42" cy="26" rx="3.2" ry="5" fill="url(#proMarioSkin)" stroke="#7c2d12" strokeWidth="1" />
            <circle cx="41.5" cy="31" r="1.5" fill="none" stroke="#facc15" strokeWidth="1.1" />
            <ellipse cx="78" cy="26" rx="3.2" ry="5" fill="url(#proMarioSkin)" stroke="#7c2d12" strokeWidth="1" />
            <circle cx="78.5" cy="31" r="1.5" fill="none" stroke="#facc15" strokeWidth="1.1" />
            {/* Viso */}
            <path d="M43 20 C43 9, 77 9, 77 20 C78 32, 71 39, 60 39 C49 39, 42 32, 43 20 Z" fill="url(#proMarioSkin)" stroke="#7c2d12" strokeWidth="1.4" />
            {/* Capelli scuri con frangetta a ciocche sulla fronte */}
            <path d="M42 22 C41 11, 49 6, 60 6 C71 6, 79 11, 78 22 C76 16, 73 15, 70 19 C68 14, 65 15, 62 19 C59 14, 56 15, 53 19 C50 14, 46 15, 42 22 Z" fill="#18181b" stroke="#09090b" strokeWidth="1" />
            {/* Occhi sorridenti */}
            <path d="M48 23.5 Q52 21.5 55.5 23.5 M64.5 23.5 Q68 21.5 72 23.5" stroke="#18181b" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            {/* Occhiali rettangolari senza montatura (Rimless) con ponte dorato e riflesso lente */}
            <rect x="46" y="20" width="11.5" height="6.8" rx="1.5" fill="#e0f2fe" fillOpacity="0.28" stroke="#fde047" strokeWidth="0.9" />
            <rect x="62.5" y="20" width="11.5" height="6.8" rx="1.5" fill="#e0f2fe" fillOpacity="0.28" stroke="#fde047" strokeWidth="0.9" />
            <line x1="57.5" y1="22.5" x2="62.5" y2="22.5" stroke="#facc15" strokeWidth="1.3" />
            <line x1="43" y1="22.5" x2="46" y2="22.5" stroke="#facc15" strokeWidth="1.2" />
            <line x1="74" y1="22.5" x2="77" y2="22.5" stroke="#facc15" strokeWidth="1.2" />
            <line x1="48" y1="21.5" x2="51" y2="25" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
            <line x1="64.5" y1="21.5" x2="67.5" y2="25" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
            {/* Naso, Baffetti sottili e Sorrisone a 32 denti */}
            <path d="M58.8 23.5 V27.5 C58 28.5, 62 28.5, 61.2 27.5" fill="none" stroke="#7c2d12" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M51 30.2 Q60 28.2 69 30.2" stroke="#27272a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M51.5 31.5 H68.5 C67.5 36.5, 52.5 36.5, 51.5 31.5 Z" fill="#ffffff" stroke="#7f1d1d" strokeWidth="1.1" />
            <line x1="54" y1="33.5" x2="66" y2="33.5" stroke="#cbd5e1" strokeWidth="0.8" />
          </g>
        )}

        {/* 📦 SMERDINO TASCABILE (ACTION FIGURE DI MATTEINO IN BLISTER TRASPARENTE + PACCHETTO DI DRUM) */}
        {normId === 'smerdino_action' && (
          <g>
            {/* 1. Cartoncino esterno da Collezione (Blister Card) */}
            <rect x="13" y="7" width="94" height="101" rx="8" fill="#0f172a" stroke="url(#proGold3D)" strokeWidth="2.4" />
            <rect x="16" y="10" width="88" height="95" rx="6" fill="#1e1b4b" stroke="#ec4899" strokeWidth="1" opacity="0.9" />
            {/* Foro da appendere sullo scaffale */}
            <path d="M51 13 H69 C71 13, 71 17, 69 17 H63 L60 14.5 L57 17 H51 C49 17, 49 13, 51 13 Z" fill="#020617" stroke="#475569" strokeWidth="1" />
            {/* Titolo Scatola Action Figure */}
            <text x="60" y="25.5" textAnchor="middle" fill="#fde047" fontSize="8.2" fontWeight="900" letterSpacing="0.6">SMERDINO • 1:10</text>

            {/* 2. Scomparto Sinistro: Miniatura Ultra-Secca di Matteino a Torso Nudo */}
            <rect x="20" y="29" width="46" height="69" rx="5" fill="#09090b" stroke="#475569" strokeWidth="1.2" />

            {/* Gambe secchissime e Pantaloncini Mimetici con striscia arancione (come in foto!) */}
            <line x1="38" y1="78" x2="37" y2="94" stroke="url(#proMarioSkin)" strokeWidth="3.2" strokeLinecap="round" />
            <line x1="48" y1="78" x2="49" y2="94" stroke="url(#proMarioSkin)" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M34 66 H52 L53 79 H45 L43 73 L41 79 H33 Z" fill="#365314" stroke="#1a2e05" strokeWidth="1.2" />
            <circle cx="38" cy="71" r="2.2" fill="#78350f" />
            <circle cx="47" cy="74" r="2.5" fill="#14532d" />
            {/* Striscia arancione laterale sui pantaloncini */}
            <line x1="34" y1="67" x2="33.3" y2="78" stroke="#f97316" strokeWidth="1.8" />
            <line x1="52" y1="67" x2="52.7" y2="78" stroke="#f97316" strokeWidth="1.8" />

            {/* Torso nudo ultra-minuto e secco con costole in vista */}
            <path d="M35 49 H51 L49 66 H37 Z" fill="url(#proMarioSkin)" stroke="#9a3412" strokeWidth="1.1" />
            <path d="M38 54 Q43 55.5 48 54 M38.5 58 Q43 59.5 47.5 58" stroke="#c2410c" strokeWidth="0.9" fill="none" opacity="0.65" />
            <circle cx="39.5" cy="53" r="0.8" fill="#9a3412" />
            <circle cx="46.5" cy="53" r="0.8" fill="#9a3412" />
            <circle cx="43" cy="63" r="0.9" fill="#9a3412" />
            {/* Braccia sottili lungo il corpo */}
            <path d="M35 50 L31 66 M51 50 L55 64" stroke="url(#proMarioSkin)" strokeWidth="3" strokeLinecap="round" />

            {/* Testa di Matteino (Capelli scuri aperti, sopracciglia folte, sorriso e sigaretta rollata) */}
            <rect x="41" y="45" width="4" height="5" fill="url(#proMarioSkin)" />
            <path d="M34 36 C34 28, 52 28, 52 36 C52.5 43, 48 47, 43 47 C38 47, 33.5 43, 34 36 Z" fill="url(#proMarioSkin)" stroke="#9a3412" strokeWidth="1.1" />
            {/* Capelli neri/castano scuro divisi */}
            <path d="M33.5 37 C32.5 30, 37 26.5, 43 26.5 C49 26.5, 53.5 30, 52.5 37 C51 32, 47 30.5, 43 31.5 C39 30.5, 35 32, 33.5 37 Z" fill="#18181b" />
            {/* Sopracciglia folte scure + Occhi + Sorriso */}
            <path d="M36.5 35.5 Q39 34 41.5 35.5 M44.5 35.5 Q47 34 49.5 35.5" stroke="#09090b" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            <circle cx="39" cy="37.5" r="1.1" fill="#09090b" />
            <circle cx="47" cy="37.5" r="1.1" fill="#09090b" />
            <path d="M39.5 42 Q43 44.8 46.5 42 Z" fill="#ffffff" stroke="#7c2d12" strokeWidth="0.9" />
            {/* Sigaretta rollata in bocca con brace accesa */}
            <line x1="46" y1="43" x2="54" y2="41.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="54.5" cy="41.4" r="1.1" fill="#ef4444" />

            {/* 3. Scomparto Destro: Busta di Tabacco DRUM Ufficiale + Cartine */}
            <rect x="70" y="36" width="30" height="54" rx="4" fill="#09090b" stroke="#475569" strokeWidth="1.1" />
            <text x="85" y="33.5" textAnchor="middle" fill="#38bdf8" fontSize="5" fontWeight="900">ACCESSORIO</text>
            {/* Fili di tabacco biondo/scuro che spuntano dalla busta */}
            <path d="M75 44 Q80 39 85 43 Q90 38 95 44" stroke="#b45309" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            {/* Busta Blu Classica DRUM */}
            <rect x="73" y="44" width="24" height="32" rx="2.5" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.3" />
            <path d="M73 44 H97 L95 53 H75 Z" fill="#2563eb" stroke="#93c5fd" strokeWidth="0.9" />
            {/* Mezzaluna/Tamburo dorato e scritta DRUM */}
            <circle cx="85" cy="56" r="4.5" fill="#facc15" opacity="0.9" />
            <rect x="75" y="54" width="20" height="6.5" rx="1" fill="#1e3a8a" />
            <text x="85" y="59" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="900" letterSpacing="0.5">DRUM</text>
            {/* Targhetta bianca avvertenza sul fondo della busta */}
            <rect x="74.5" y="66" width="21" height="8" rx="1" fill="#ffffff" stroke="#09090b" strokeWidth="0.8" />
            <text x="85" y="71.5" textAnchor="middle" fill="#09090b" fontSize="4.2" fontWeight="900">100% SECCO</text>
            {/* Libretti di cartine sotto la busta */}
            <rect x="75" y="79" width="20" height="7" rx="1.2" fill="#f97316" stroke="#ffffff" strokeWidth="0.9" />
            <text x="85" y="84" textAnchor="middle" fill="#ffffff" fontSize="4.2" fontWeight="900">CARTINE</text>

 {/* 4. Cupola del Blister in Plastica Trasparente Lucida sopra i 2 vani */}
            <rect x="19" y="28" width="48" height="71" rx="5.5" fill="#e0f2fe" fillOpacity="0.12" stroke="#bae6fd" strokeWidth="1.6" />
            <path d="M23 42 L35 31 M23 54 L45 31" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
            <rect x="69" y="35" width="32" height="56" rx="4.5" fill="#e0f2fe" fillOpacity="0.12" stroke="#bae6fd" strokeWidth="1.5" />
            <path d="M73 46 L82 37" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
          </g>
        )}

        {/* ⛺ TENDINA OPZIONE A: TENDA DA ESTERNO CON MANOVELLA + FACCIA DI TENDINA SOTTO */}
        {normId === 'tendina_sole' && (
          <g>
            {/* 1. Struttura pergola in legno scuro e Asta Manovella laterale */}
            <rect x="12" y="8" width="96" height="6" rx="2" fill="url(#proWood3D)" stroke="#1c0a00" strokeWidth="1.5" />
            <path d="M98 28 V68 L104 72 V80" fill="none" stroke="url(#proGold3D)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="104" cy="81" r="2.5" fill="#dc2626" />

            {/* 2. Tenda da Sole da Bar a spicchi Crema/Verde + Mantovana Ondulata (come nella foto!) */}
            <polygon points="14,14 106,14 112,30 8,30" fill="#fef3c7" stroke="#78350f" strokeWidth="1.6" strokeLinejoin="round" />
            <polygon points="28,14 44,14 41,30 23,30" fill="#15803d" />
            <polygon points="60,14 76,14 77,30 59,30" fill="#15803d" />
            <polygon points="90,14 106,14 112,30 95,30" fill="#15803d" />
            {/* Mantovana bianca ondulata sotto la tenda da esterno */}
            <path
              d="M8 30 H112 V36 C106 41, 100 41, 95 36 C90 41, 84 41, 79 36 C74 41, 68 41, 63 36 C58 41, 52 41, 47 36 C42 41, 36 41, 31 36 C26 41, 20 41, 15 36 C11 40, 8 39, 8 36 Z"
              fill="#f8fafc"
              stroke="#94a3b8"
              strokeWidth="1.4"
            />

            {/* 3. Busto di Tendina (Maglietta nera con logo verde BALI) */}
            <path d="M26 105 C28 85, 42 79, 60 79 C78 79, 92 85, 94 105 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1.8" />
            <circle cx="73" cy="92" r="4.5" fill="#86efac" opacity="0.85" />
            <text x="73" y="99" textAnchor="middle" fill="#ffffff" fontSize="4.2" fontWeight="900">BALI</text>

            {/* 4. Viso di Tendina (Barbetta corta, Sopracciglia folte e Sorrisone a 32 denti) */}
            <rect x="54" y="73" width="12" height="9" fill="url(#proMarioSkin)" />
            <ellipse cx="36" cy="59" rx="3.8" ry="6" fill="url(#proMarioSkin)" stroke="#7c2d12" strokeWidth="1.1" />
            <ellipse cx="84" cy="59" rx="3.8" ry="6" fill="url(#proMarioSkin)" stroke="#7c2d12" strokeWidth="1.1" />
            <path d="M38 51 C38 35, 82 35, 82 51 C83 68, 74 78, 60 78 C46 78, 37 68, 38 51 Z" fill="url(#proMarioSkin)" stroke="#7c2d12" strokeWidth="1.5" />
            {/* Barbetta corta sfumata e baffi */}
            <path d="M39 59 C40 72, 48 78, 60 78 C72 78, 80 72, 81 59 C78 65, 74 67, 69 65 C65 61, 55 61, 51 65 C46 67, 42 65, 39 59 Z" fill="#27272a" opacity="0.82" />
            {/* Sopracciglia scure marcate + Occhi sorridenti + Naso */}
            <path d="M44 51 Q49 48.5 55 51 M65 51 Q71 48.5 76 51" stroke="#18181b" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <ellipse cx="49.5" cy="55" rx="3.8" ry="2.5" fill="#ffffff" stroke="#451a03" strokeWidth="1" />
            <circle cx="49.5" cy="55" r="1.8" fill="#1c1917" />
            <ellipse cx="70.5" cy="55" rx="3.8" ry="2.5" fill="#ffffff" stroke="#451a03" strokeWidth="1" />
            <circle cx="70.5" cy="55" r="1.8" fill="#1c1917" />
            <path d="M58.5 54 V61.5 C57 63, 63 63, 61.5 61.5" fill="none" stroke="#7c2d12" strokeWidth="1.6" strokeLinecap="round" />
            {/* Sorrisone bianco a 32 denti */}
            <path d="M49 65.5 H71 C69.5 72.5, 50.5 72.5, 49 65.5 Z" fill="#ffffff" stroke="#451a03" strokeWidth="1.2" />
            <line x1="52" y1="68.5" x2="68" y2="68.5" stroke="#cbd5e1" strokeWidth="0.9" />

            {/* 5. I CAPELLI A TENDINA DI TENDINA (che fanno da seconda tenda sotto la mantovana!) */}
            <path
              d="M59.5 36 C45 36, 34 43, 34 57 C34 63, 36 67, 40 69 C39 61, 41 53, 46 48 C51 44, 56 41, 59.5 38 Z"
              fill="url(#tendinaHairGrad)"
              stroke="#1c0a00"
              strokeWidth="1.4"
            />
            <path
              d="M60.5 36 C75 36, 86 43, 86 57 C86 63, 84 67, 80 69 C81 61, 79 53, 74 48 C69 44, 64 41, 60.5 38 Z"
              fill="url(#tendinaHairGrad)"
              stroke="#1c0a00"
              strokeWidth="1.4"
            />
            {/* Ciocche interne a tendina sulla fronte */}
            <path d="M58.5 38 C53 44, 48 49, 47 56 M61.5 38 C67 44, 72 49, 73 56" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* 🪟 TENDINA OPZIONE B: FACCIA DI TENDINA CON BASTONE PER TENDE SULLA FRONTE E CORDONI D'ORO */}
        {normId === 'tendina_sipario' && (
          <g>
            {/* 1. Busto di Tendina (Maglietta nera con logo BALI) */}
            <path d="M22 104 C25 82, 40 76, 60 76 C80 76, 95 82, 98 104 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
            <circle cx="75" cy="91" r="5" fill="#86efac" opacity="0.85" />
            <text x="75" y="99" textAnchor="middle" fill="#ffffff" fontSize="4.5" fontWeight="900">BALI</text>

            {/* 2. Viso di Tendina in primo piano */}
            <rect x="53" y="69" width="14" height="10" fill="url(#proMarioSkin)" />
            <ellipse cx="32" cy="52" rx="4.2" ry="6.8" fill="url(#proMarioSkin)" stroke="#7c2d12" strokeWidth="1.2" />
            <ellipse cx="88" cy="52" rx="4.2" ry="6.8" fill="url(#proMarioSkin)" stroke="#7c2d12" strokeWidth="1.2" />
            <path d="M34 42 C34 22, 86 22, 86 42 C87 62, 76 74, 60 74 C44 74, 33 62, 34 42 Z" fill="url(#proMarioSkin)" stroke="#7c2d12" strokeWidth="1.6" />
            {/* Barba corta curata e baffi */}
            <path d="M35 51 C36 66, 46 74, 60 74 C74 74, 84 66, 85 51 C81 58, 76 61, 70 59 C66 54, 54 54, 50 59 C44 61, 39 58, 35 51 Z" fill="#27272a" opacity="0.85" />
            {/* Sopracciglia scure + Occhi + Naso + Sorrisone */}
            <path d="M41 43 Q47 40 54 43 M66 43 Q73 40 79 43" stroke="#18181b" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <ellipse cx="48" cy="48" rx="4.2" ry="2.8" fill="#ffffff" stroke="#451a03" strokeWidth="1.1" />
            <circle cx="48" cy="48" r="2" fill="#1c1917" />
            <circle cx="48.8" cy="47.3" r="0.7" fill="#ffffff" />
            <ellipse cx="72" cy="48" rx="4.2" ry="2.8" fill="#ffffff" stroke="#451a03" strokeWidth="1.1" />
            <circle cx="72" cy="48" r="2" fill="#1c1917" />
            <circle cx="72.8" cy="47.3" r="0.7" fill="#ffffff" />
            <path d="M58.5 47 V55.5 C56.5 57.5, 63.5 57.5, 61.5 55.5" fill="none" stroke="#7c2d12" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M47 60 H73 C71 68.5, 49 68.5, 47 60 Z" fill="#ffffff" stroke="#451a03" strokeWidth="1.3" />
            <line x1="50" y1="63.5" x2="70" y2="63.5" stroke="#cbd5e1" strokeWidth="1" />

            {/* 3. CAPELLI A TENDINA APPESI AL BASTONE E LEGATI AI LATI COI CORDONI D'ORO! */}
            <path
              d="M59 19 C41 19, 26 28, 25 48 C25 57, 29 63, 35 65 C34 55, 37 44, 44 37 C50 31, 56 26, 59 21 Z"
              fill="url(#tendinaHairGrad)"
              stroke="#1c0a00"
              strokeWidth="1.6"
            />
            <path
              d="M61 19 C79 19, 94 28, 95 48 C95 57, 91 63, 85 65 C86 55, 83 44, 76 37 C70 31, 64 26, 61 21 Z"
              fill="url(#tendinaHairGrad)"
              stroke="#1c0a00"
              strokeWidth="1.6"
            />
            <path d="M57 22 C49 30, 43 38, 42 47 M63 22 C71 30, 77 38, 78 47" stroke="#92400e" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* 4. I 2 Cordoni Dorati col Fiocco (Fermatenda Teatrali sulle tempie!) */}
            <path d="M24 41 Q32 44 39 40" stroke="url(#proGold3D)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <polygon points="25,42 21,52 28,52" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1" />
            <path d="M96 41 Q88 44 81 40" stroke="url(#proGold3D)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <polygon points="95,42 99,52 92,52" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1" />

            {/* 5. Bastone per Tende in Ottone Massiccio con Pomelli Reali e Anelli sopra la testa */}
            <rect x="14" y="16" width="92" height="4.5" rx="2" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.4" />
            <circle cx="12" cy="18.2" r="5" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.5" />
            <circle cx="108" cy="18.2" r="5" fill="url(#proGold3D)" stroke="#422006" strokeWidth="1.5" />
            {/* Anelli della tenda a cui sono agganciati i capelli */}
            {[28, 38, 48, 57, 63, 72, 82, 92].map((rx, idx) => (
              <rect key={idx} x={rx} y="14.5" width="3" height="7.5" rx="1.2" fill="url(#proGold3D)" stroke="#422006" strokeWidth="0.9" />
            ))}
          </g>
        )}

        {/* 🐼 PELUCHE MAESTRO SHIFU (FEDELE AL 100% ALLA FOTO: ORECCHIE BICOLORI, BRACCIA CONSERTE, TUNICA ED ETICHETTA NERA!) */}
        {normId === 'shifu_peluche' && (
          <g>
            {/* 1. Coda a anelli bianchi e marroni che scende in basso a destra (come nella foto!) */}
            <path
              d="M60 78 C60 92, 65 106, 75 109 C83 110, 86 100, 81 88 C78 81, 71 78, 60 78 Z"
              fill="#f8fafc"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            <path d="M61 84 L79 83 L81 88 L62 89 Z" fill="#b45309" />
            <path d="M63 93 L83 92 L84 98 L65 99 Z" fill="#b45309" />

            {/* 2. L'iconica ETICHETTA NERA DEL PELUCHE che spunta tra le gambe (dettaglio reale della foto!) */}
            <g transform="rotate(8 59 83)">
              <rect x="54" y="77" width="11" height="13" rx="1" fill="#09090b" stroke="#475569" strokeWidth="0.8" />
              <circle cx="59.5" cy="81.5" r="2" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
              <line x1="56.5" y1="86" x2="62.5" y2="86" stroke="#e2e8f0" strokeWidth="0.8" />
            </g>

            {/* 3. Gambe corte marroni scure, fasce verdi/grigie alle caviglie e piedini imbottiti */}
            <rect x="40" y="74" width="13" height="15" rx="3" fill="#271206" />
            <rect x="67" y="74" width="13" height="15" rx="3" fill="#271206" />
            {/* Fasce caviglie */}
            <rect x="40" y="84" width="13" height="4.5" rx="1" fill="#57534e" stroke="#292524" strokeWidth="0.9" />
            <rect x="67" y="84" width="13" height="4.5" rx="1" fill="#57534e" stroke="#292524" strokeWidth="0.9" />
            {/* Piedini peluche arancio-marrone con suola scura */}
            <ellipse cx="46.5" cy="93" rx="7.5" ry="5.5" fill="#b45309" stroke="#78350f" strokeWidth="1.2" />
            <ellipse cx="46.5" cy="96" rx="6" ry="2.5" fill="#271206" />
            <ellipse cx="73.5" cy="93" rx="7.5" ry="5.5" fill="#b45309" stroke="#78350f" strokeWidth="1.2" />
            <ellipse cx="73.5" cy="96" rx="6" ry="2.5" fill="#271206" />

            {/* 4. Tunica Kung Fu Arancio/Caramello con Cintura Marrone Scuro e Bordo Arrotondato */}
            <path
              d="M39 48 H81 L85 75 C72 80, 48 80, 35 75 Z"
              fill="#c26a27"
              stroke="#78350f"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Risvolto a V sul petto + Cintura marrone scuro in vita */}
            <path d="M50 48 L58 60 L68 48" fill="none" stroke="#271206" strokeWidth="3" />
            <rect x="38" y="59" width="44" height="7.5" rx="1.5" fill="#271206" />
            {/* Cucitura in rilievo dell'orlo inferiore della tunica */}
            <path d="M35 74 C48 79, 72 79, 85 74" fill="none" stroke="#e09145" strokeWidth="2.5" strokeLinecap="round" />

            {/* 5. BRACCIA CONSERTE SUL PETTO CON POLSINI GRIGI E MANI SCURE (Come nella foto!) */}
            {/* Spalle arancioni morbide */}
            <ellipse cx="36" cy="52" rx="9" ry="7.5" fill="#c26a27" stroke="#78350f" strokeWidth="1.5" />
            <ellipse cx="84" cy="52" rx="9" ry="7.5" fill="#c26a27" stroke="#78350f" strokeWidth="1.5" />
            {/* Maniche interne marroni scure incrociate al centro */}
            <rect x="44" y="47" width="32" height="11" rx="4" fill="#271206" stroke="#09090b" strokeWidth="1.2" />
            <line x1="46" y1="52.5" x2="74" y2="52.5" stroke="#451a03" strokeWidth="1.4" />
            {/* Polsini larghi grigio chiaro ai due lati delle braccia incrociate */}
            <rect x="40" y="46" width="8.5" height="13" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1.2" />
            <rect x="71.5" y="46" width="8.5" height="13" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1.2" />

            {/* 6. GRANDI ORECCHIE A PUNTA BICOLORI (Punta marrone, fascia bianca, interno marrone) */}
            {/* Orecchio Sinistro */}
            <path d="M34 30 L26 8 C34 5, 45 12, 48 24 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M29.5 17 L26 8 C31 6.5, 37 9, 41 14 Z" fill="#9a4a17" />
            <path d="M34 26 L31 19 C36 18, 41 20, 44 24 Z" fill="#7c2d12" />
            {/* Orecchio Destro */}
            <path d="M86 30 L94 8 C86 5, 75 12, 72 24 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M90.5 17 L94 8 C89 6.5, 83 9, 79 14 Z" fill="#9a4a17" />
            <path d="M86 26 L89 19 C84 18, 79 20, 76 24 Z" fill="#7c2d12" />

            {/* 7. TESTA PELOSA DEL MAESTRO SHIFU (Ciuffi bianchi laterali, mascherina marrone, occhi azzurri e bocca severa) */}
            {/* Ciuffi di pelo bianco spettinato sulle guance e sopracciglia */}
            <path
              d="M28 31 L22 28 L27 35 L21 36 L28 40 C31 46, 42 50, 60 50 C78 50, 89 46, 92 40 L99 36 L93 35 L98 28 L92 31 C86 22, 75 19, 60 19 C45 19, 34 22, 28 31 Z"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Macchiolina marrone sulla fronte */}
            <ellipse cx="60" cy="24" rx="4.5" ry="2.2" fill="#854d0e" opacity="0.75" />

            {/* Toppe marroni intorno agli occhi */}
            <ellipse cx="46" cy="36" rx="10.5" ry="7.5" fill="#9a4a17" transform="rotate(-8 46 36)" />
            <ellipse cx="74" cy="36" rx="10.5" ry="7.5" fill="#9a4a17" transform="rotate(8 74 36)" />

            {/* Sopracciglia bianche folte da peluche */}
            <path d="M34 30 Q45 26 55 32 M86 30 Q75 26 65 32" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" />

            {/* Occhi Azzurri Spalancati con pupilla nera (identici alla foto!) */}
            <circle cx="47.5" cy="35.5" r="4.2" fill="#ffffff" stroke="#1e293b" strokeWidth="0.9" />
            <circle cx="48" cy="35.5" r="2.8" fill="#0284c7" />
            <circle cx="48" cy="35.5" r="1.4" fill="#09090b" />
            <circle cx="48.8" cy="34.7" r="0.7" fill="#ffffff" />

            <circle cx="72.5" cy="35.5" r="4.2" fill="#ffffff" stroke="#1e293b" strokeWidth="0.9" />
            <circle cx="72" cy="35.5" r="2.8" fill="#0284c7" />
            <circle cx="72" cy="35.5" r="1.4" fill="#09090b" />
            <circle cx="72.8" cy="34.7" r="0.7" fill="#ffffff" />

            {/* Musetto bianco in rilievo 3D, nasino marrone e bocca imbronciata/severa */}
            <ellipse cx="60" cy="41.5" rx="10.5" ry="7.5" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" />
            <ellipse cx="60" cy="37.5" rx="3.5" ry="2.3" fill="#451a03" />
            <path d="M53.5 43.5 Q60 41.5 66.5 43.5" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Pizzetto di pelo bianco soffice sotto il mento sopra le braccia conserte */}
            <path d="M55 48 L58 55 L60 52 L63 56 L65 48 Z" fill="#ffffff" opacity="0.9" />
          </g>
        )}
      </svg>
    </div>
  );
}                     

// ============================================================================
// 🎒 VETRINA "I MIEI AVERI" NEL BOLLETTINO MEDICO
// ============================================================================
export function OwnedItemsShowcase({ ownedItems = [], isMe, playerName, onGoToChiosco }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
          🎒 {isMe ? 'I Miei Averi' : `Gli Averi di ${playerName}`}
        </span>
        <span className="text-[10px] font-bold text-slate-400">
          {ownedItems.length} Oggetti
        </span>
      </div>

      {ownedItems.length === 0 ? (
        <div className="py-5 px-3 rounded-xl border border-dashed border-slate-800 text-center space-y-2">
          <p className="text-xs font-bold text-slate-300">
            Nessun oggetto ancora riscattato al Chiosco!
          </p>
          <p className="text-[10px] text-slate-400 italic">
            "Fegato da professionista, ma inventario ancora vuoto: accumula Tappi d'Oro per fare spesa al Chiosco!"
          </p>
          {isMe && (
            <button
              type="button"
              onClick={onGoToChiosco}
              className="mt-1 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-black uppercase"
            >
              Vai al Chiosco 🏪
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {ownedItems.map((rawObj, i) => {
            const rawId = typeof rawObj === 'string' ? rawObj : rawObj?.id;
            const itemId = normalizeChioscoId(rawId);
            const catalogMatch = ALL_CHIOSCO_ITEMS.find(x => x.id === itemId || x.name === rawObj?.name);
            const itemData = catalogMatch || {
              id: itemId || 'accendino',
              name: rawObj?.name || String(rawObj),
              rarity: rawObj?.rarity || 'COMUNE'
            };
            const st = RARITY_STYLES[itemData.rarity] || RARITY_STYLES.COMUNE;

            return (
              <div
                key={i}
                className={`p-2 rounded-xl bg-gradient-to-b ${st.cardBg} border ${st.cardBorder} flex flex-col items-center text-center gap-1`}
              >
                <span className={`text-[8px] font-black uppercase px-2 py-0.2 rounded-full ${st.badgeBg}`}>
                  {st.label}
                </span>
                <ChioscoItemArtwork id={itemData.id} size="sm" />
                <span className="text-[10px] font-black text-white leading-tight line-clamp-1">
                  {itemData.name}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// ⚡ CONSOLE SEGRETA FONDATORE (DENTRO IL BOLLETTINO MEDICO DI OGNI GIOCATORE)
// ============================================================================
export function GodBollettinoConsole({ member, onGodEdit }) {
  if (!member) return null;
  const hasCan = Boolean(member.rumenoUntil && Number(member.rumenoUntil) > Date.now());

  return (
    <div className="bg-gradient-to-b from-amber-500/20 via-slate-950 to-slate-950 border-2 border-amber-400 rounded-2xl p-3.5 space-y-3 shadow-xl">
      <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
        <span className="text-[11px] font-black uppercase text-amber-300 flex items-center gap-1.5">
          ⚡ Console God Mode • {member.name}
        </span>
        <span className="text-[9px] font-black uppercase bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
          Silenziosa
        </span>
      </div>

      {/* Punti F1 */}
      <div className="space-y-1">
        <span className="text-[9px] font-black uppercase text-slate-400 block">
          Modifica Punti F1 (Senza Notifica Gazzetta)
        </span>
        <div className="grid grid-cols-6 gap-1">
          {[-10, -5, -1, +1, +5, +10].map(delta => (
            <button
              key={delta}
              type="button"
              onClick={() => onGodEdit(member.id, { pointsDelta: delta })}
              className={`py-1.5 rounded-lg text-[10px] font-black border transition ${
                delta < 0
                  ? 'bg-red-500/15 border-red-500/40 text-red-300 hover:bg-red-500/30'
                  : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
              }`}
            >
              {delta > 0 ? `+${delta}` : delta}
            </button>
          ))}
        </div>
      </div>

      {/* Tappi d'Oro */}
      <div className="space-y-1">
        <span className="text-[9px] font-black uppercase text-slate-400 block">
          Modifica Tappi d'Oro 🪙
        </span>
        <div className="grid grid-cols-5 gap-1">
          {[-10, -1, +1, +10, +50].map(delta => (
            <button
              key={delta}
              type="button"
              onClick={() => onGodEdit(member.id, { goldCapsDelta: delta })}
              className="py-1.5 rounded-lg text-[10px] font-black bg-amber-500/15 border border-amber-400/40 text-amber-300 hover:bg-amber-500/30 transition"
            >
              {delta > 0 ? `+${delta}🪙` : `${delta}🪙`}
            </button>
          ))}
        </div>
      </div>

      {/* Birre, Litri e Penitenze */}
      <div className="grid grid-cols-2 gap-1.5 pt-1">
        <button
          type="button"
          onClick={() => onGodEdit(member.id, { beersDelta: 1, litersDelta: 0.5 })}
          className="py-1.5 px-2 rounded-xl bg-sky-500/15 border border-sky-400/40 text-sky-300 text-[10px] font-black uppercase"
        >
          +1 Birra (+0.5L)
        </button>
        <button
          type="button"
          onClick={() => onGodEdit(member.id, { beersDelta: -1, litersDelta: -0.5 })}
          className="py-1.5 px-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-black uppercase"
        >
          -1 Birra (-0.5L)
        </button>
        <button
          type="button"
          onClick={() => onGodEdit(member.id, { toggleCan: true })}
          className="py-1.5 px-2 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-[10px] font-black uppercase"
        >
          {hasCan ? '🥫 Togli Lattina' : '🥫 Metti Lattina 24h'}
        </button>
        <button
          type="button"
          onClick={() => onGodEdit(member.id, { resetCards: true })}
          className="py-1.5 px-2 rounded-xl bg-purple-500/15 border border-purple-400/40 text-purple-300 text-[10px] font-black uppercase"
        >
          🧹 Azzera VAR
        </button>
      </div>

      {/* Effetti Grafici Serata (Fiamme & Cometa) */}
      <div className="space-y-1 pt-1 border-t border-amber-500/20">
        <span className="text-[9px] font-black uppercase text-slate-400 block">
          Effetto Serata Live (Durata 3h da ultima birra)
        </span>
        <div className="grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={() => onGodEdit(member.id, { setStreak: 0 })}
            className="py-1.5 rounded-lg text-[9px] font-black uppercase bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            🧊 Spento
          </button>
          <button
            type="button"
            onClick={() => onGodEdit(member.id, { setStreak: 3 })}
            className="py-1.5 rounded-lg text-[9px] font-black uppercase bg-orange-500/20 border border-orange-400 text-orange-300 hover:bg-orange-500/30"
          >
            🔥 On Fire (3)
          </button>
          <button
            type="button"
            onClick={() => onGodEdit(member.id, { setStreak: 5 })}
            className="py-1.5 rounded-lg text-[9px] font-black uppercase bg-cyan-500/20 border border-cyan-400 text-cyan-200 hover:bg-cyan-500/30"
          >
            ☄️ Cometa (5)
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 🔐 MODALE PIN SEGRETO FONDATORE (5 TOCCHI SUL LOGO -> PIN 7474)
// ============================================================================
export function GodPinModal({ isOpen, onClose, onUnlock }) {
  const [pinValue, setPinValue] = useState('');
  const [pinError, setPinError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pinValue.trim() === '7474') {
      setPinValue('');
      setPinError(false);
      onUnlock();
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[250] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border-2 border-amber-400 rounded-3xl max-w-xs w-full p-5 text-center space-y-4 shadow-2xl"
      >
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto text-2xl">
          ⚡
        </div>
        <div>
          <h3 className="text-sm font-black uppercase text-amber-400">
            Accesso Segreto Fondatore
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Inserisci il PIN del Civico 74 per attivare la God Mode
          </p>
        </div>

        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={pinValue}
          onChange={(e) => {
            setPinValue(e.target.value);
            setPinError(false);
          }}
          placeholder="••••"
          className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 text-center text-lg font-black tracking-[0.4em] text-amber-300 focus:outline-none focus:border-amber-400"
        />

        {pinError && (
          <span className="text-[10px] font-black text-red-400 block">
            ❌ PIN errato! Accesso negato.
          </span>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setPinValue('');
              setPinError(false);
              onClose();
            }}
            className="py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
          >
            Annulla
          </button>
          <button
            type="submit"
            className="py-2.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-black uppercase shadow-lg"
          >
            Attiva ⚡
          </button>
        </div>
      </form>
    </div>
  );
}

// ============================================================================
// 🏪 COMPONENTE PRINCIPALE DEL CHIOSCO (ORA A 5 CATEGORIE CON I SANTINI!)
// ============================================================================
export default function Chiosco({ isGodMode = false, ownedItems = [], onToggleOwnItem }) {
  const [activeCategory, setActiveCategory] = useState('cavatappi');
  const [inspectedItem, setInspectedItem] = useState(null);

  const categories = [
    { id: 'cavatappi', label: 'Cavatappi', icon: Wrench },
    { id: 'calici', label: 'Calici', icon: Sparkles },
    { id: 'cimeli', label: 'Cimeli', icon: Award },
    { id: 'postazioni', label: 'Troni', icon: Crown },
    { id: 'santini', label: 'Santini', icon: Flame }
  ];

  const isItemOwned = (item) => {
    if (!item) return false;
    return (ownedItems || []).some(x => {
      const savedId = normalizeChioscoId(typeof x === 'string' ? x : x?.id);
      return savedId === item.id;
    });
  };

  const currentItems = CHIOSCO_ITEMS[activeCategory] || [];
  const activeModalStyle = inspectedItem
    ? (RARITY_STYLES[inspectedItem.rarity] || RARITY_STYLES.COMUNE)
    : null;
  const inspectedOwned = isItemOwned(inspectedItem);

  return (
    <div className="space-y-4 pb-6">
      {/* INTESTAZIONE DEL CHIOSCO */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl px-3.5 py-2.5 shadow-xl flex items-center justify-between">
        <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Il Chiosco Ufficiale • {ALL_CHIOSCO_ITEMS.length} Carte
        </span>
        <span className="text-[9px] font-black uppercase bg-slate-950 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full">
          {isGodMode ? '⚡ Tutto Gratis' : 'Tocca una carta'}
        </span>
      </div>

      {/* SELETTORE DELLE 5 CATEGORIE */}
      <div className="grid grid-cols-5 gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
        {categories.map(cat => {
          const IconComp = cat.icon;
          const isSelected = activeCategory === cat.id;
          const isSantiniTab = cat.id === 'santini';
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`py-2 px-1 rounded-xl text-[9px] font-black uppercase flex flex-col items-center justify-center gap-1 transition ${
                isSelected
                  ? isSantiniTab
                    ? 'bg-gradient-to-br from-rose-500 via-fuchsia-400 to-cyan-300 text-slate-950 shadow-lg shadow-rose-500/30'
                    : 'bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : isSantiniTab
                  ? 'text-rose-300 hover:text-white bg-rose-950/30 border border-rose-500/30'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span className="truncate max-w-full">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* GRIGLIA DEGLI OGGETTI DELLA CATEGORIA ATTIVA */}
      <div className="grid grid-cols-2 gap-3">
        {currentItems.map(item => {
          const style = RARITY_STYLES[item.rarity] || RARITY_STYLES.COMUNE;
          const owned = isItemOwned(item);

          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => setInspectedItem(item)}
              className={`w-full bg-gradient-to-b ${style.cardBg} border-2 ${style.cardBorder} rounded-2xl p-3 flex flex-col items-center justify-between text-center cursor-pointer transition active:scale-95 shadow-lg relative overflow-hidden group`}
            >
              {/* Header Carta: Solo Rarità */}
              <div className="w-full flex items-center justify-center pointer-events-none">
                <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow ${style.badgeBg}`}>
                  {style.label}
                </span>
              </div>

              {/* Illustrazione Vettoriale PRO 3D */}
              <div className="my-1.5 group-hover:scale-105 transition-transform pointer-events-none">
                <ChioscoItemArtwork id={item.id} size="md" />
              </div>

              {/* Nome, Anteprima Frase e Tasto Apri */}
              <div className="w-full space-y-1.5 pointer-events-none">
                <h3 className="text-xs font-black text-white leading-tight line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-[10px] text-amber-200/90 line-clamp-2 leading-tight italic px-0.5">
                  "{item.desc}"
                </p>
                <div className={`w-full py-1.5 rounded-xl border text-[10px] font-black uppercase flex items-center justify-center gap-1 ${
                  owned
                    ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300'
                    : 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                }`}>
                  <Eye className="w-3 h-3" />
                  <span>{owned ? 'Nei tuoi averi ✅' : isGodMode ? 'Apri • ⚡ Gratis' : 'Apri Carta • 🔒'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================================
          MODALE ISPEZIONE CARTA A TUTTO SCHERMO (STILE CLASH ROYALE / FIFA)
      ===================================================================== */}
      {inspectedItem && activeModalStyle && (
        <div
          onClick={() => setInspectedItem(null)}
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-gradient-to-b ${activeModalStyle.cardBg} border-2 ${activeModalStyle.modalBorder} rounded-3xl max-w-sm w-full max-h-[90vh] overflow-y-auto p-5 text-center space-y-3 relative`}
          >
            {/* Pulsante X in alto a destra */}
            <button
              type="button"
              onClick={() => setInspectedItem(null)}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-950 border border-slate-700 text-slate-200 hover:text-white flex items-center justify-center z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top Badge Solo Rarità */}
            <div className="flex items-center justify-center">
              <span className={`text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg ${activeModalStyle.badgeBg}`}>
                ★ {activeModalStyle.label} ★
              </span>
            </div>

            {/* Area Grafica Gigante con Bagliore Radiale */}
            <div
              className="py-3 flex items-center justify-center rounded-2xl mx-auto"
              style={{ background: activeModalStyle.radialBg }}
            >
              <ChioscoItemArtwork id={inspectedItem.id} size="xl" />
            </div>

            {/* Titolo, Sottotitolo e BOX DESCRIZIONE SPIRITOSA */}
            <div className="space-y-2.5">
              <div>
                <h2 className="text-xl font-black uppercase text-white tracking-wide leading-tight">
                  {inspectedItem.name}
                </h2>
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block mt-0.5">
                  {inspectedItem.subtitle}
                </span>
              </div>

              <div className="bg-slate-950/95 border-2 border-amber-400/50 rounded-2xl p-4 text-center shadow-lg">
                <span className="text-[9px] font-black uppercase tracking-widest text-amber-400 block mb-1.5">
                  📜 Descrizione Ufficiale del Chiosco
                </span>
                <p className="text-xs text-white leading-relaxed font-bold italic">
                  "{inspectedItem.desc}"
                </p>
              </div>
            </div>

            {/* Pulsante Azione */}
            <div className="pt-1 space-y-2">
              {isGodMode && onToggleOwnItem ? (
                <button
                  type="button"
                  onClick={() => onToggleOwnItem(inspectedItem)}
                  className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition ${
                    inspectedOwned
                      ? 'bg-red-600/25 hover:bg-red-600/40 border-2 border-red-400 text-red-200'
                      : 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950'
                  }`}
                >
                  <span>
                    {inspectedOwned
                      ? '🗑️ Togli dai Miei Averi (God Mode)'
                      : '⚡ Prendi Gratis (0 Tappi • God Mode)'}
                  </span>
                </button>
              ) : inspectedOwned ? (
                <div className="w-full py-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-400/60 text-emerald-300 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                  <span>✅ Già presente nei tuoi averi!</span>
                </div>
              ) : (
                <div className="w-full py-2.5 rounded-2xl bg-slate-950 border border-amber-500/40 text-amber-300 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Bloccato • Presto coi Tappi d'Oro</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => setInspectedItem(null)}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase transition shadow-lg"
              >
                Chiudi Carta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}