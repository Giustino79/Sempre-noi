import React, { useState } from 'react';
import { Lock, Sparkles, X, Award, Wrench, Eye, Crown } from 'lucide-react';

// ============================================================================
// 🎨 CONFIGURAZIONE RARITÀ (COMUNE, RARO, MITICO, LEGGENDARIO)
// ============================================================================
const RARITY_STYLES = {
  COMUNE: {
    label: 'COMUNE',
    badgeBg: 'bg-emerald-500 text-slate-950',
    cardBorder: 'border-emerald-500/50 hover:border-emerald-400',
    cardBg: 'from-emerald-950/50 via-slate-900 to-slate-950',
    modalBorder: 'border-emerald-400 shadow-2xl shadow-emerald-500/30',
    statBar: 'bg-emerald-400',
    radialBg: 'radial-gradient(circle, rgba(16,185,129,0.28) 0%, rgba(15,23,42,0) 70%)'
  },
  RARO: {
    label: 'RARO',
    badgeBg: 'bg-sky-400 text-slate-950',
    cardBorder: 'border-sky-400/60 hover:border-sky-300',
    cardBg: 'from-sky-950/60 via-slate-900 to-slate-950',
    modalBorder: 'border-sky-400 shadow-2xl shadow-sky-500/35',
    statBar: 'bg-sky-400',
    radialBg: 'radial-gradient(circle, rgba(56,189,248,0.32) 0%, rgba(15,23,42,0) 70%)'
  },
  MITICO: {
    label: 'MITICO',
    badgeBg: 'bg-purple-500 text-white',
    cardBorder: 'border-purple-500/70 hover:border-purple-400',
    cardBg: 'from-purple-950/65 via-slate-900 to-slate-950',
    modalBorder: 'border-purple-400 shadow-2xl shadow-purple-500/45',
    statBar: 'bg-purple-400',
    radialBg: 'radial-gradient(circle, rgba(168,85,247,0.36) 0%, rgba(15,23,42,0) 70%)'
  },
  LEGGENDARIO: {
    label: 'LEGGENDARIO',
    badgeBg: 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950',
    cardBorder: 'border-amber-400/90 hover:border-yellow-300',
    cardBg: 'from-amber-500/30 via-slate-900 to-slate-950',
    modalBorder: 'border-amber-400 shadow-2xl shadow-amber-500/50',
    statBar: 'bg-amber-400',
    radialBg: 'radial-gradient(circle, rgba(251,191,36,0.42) 0%, rgba(15,23,42,0) 70%)'
  }
};

// ============================================================================
// 📦 CATALOGO UFFICIALE DEI 32 OGGETTI (4 CATEGORIE x 8 OGGETTI)
// ============================================================================
const CHIOSCO_ITEMS = {
  cavatappi: [
    {
      id: 'accendino',
      name: 'Accendino Ignorante',
      rarity: 'COMUNE',
      subtitle: 'Utensile di Sopravvivenza da Marciapiede',
      desc: 'Il classico Bic giallo consumato fino all’osso: leva fisica applicata sulla nocca del dito, colpo secco e tappo spedito direttamente sulla Luna.',
      stats: { stile: 65, ignoranza: 98, prestigio: 72 }
    },
    {
      id: 'cucchiaio',
      name: 'Cucchiaio Ignorante',
      rarity: 'COMUNE',
      subtitle: 'Posata da Scasso Notturno',
      desc: 'Rubato dal cassetto della cucina a mezzanotte quando nessuno trova il cavatappi. Piegato a 45 gradi ma non ha mai fallito una stappata.',
      stats: { stile: 60, ignoranza: 99, prestigio: 75 }
    },
    {
      id: 'bar_blade',
      name: 'Bar Blade Pro',
      rarity: 'RARO',
      subtitle: 'Lama Ufficiale da Bancone',
      desc: 'Piastra piatta in acciaio inox con impugnatura rossa gommata: lo fai girare sul dito come nei film, ma dopo la terza birra ti cade sempre.',
      stats: { stile: 86, ignoranza: 74, prestigio: 82 }
    },
    {
      id: 'oste_legno',
      name: 'Oste in Legno',
      rarity: 'RARO',
      subtitle: 'Reliquia della Vecchia Locanda',
      desc: 'Tornito dal legno massello di una vecchia botte di rovere: profuma ancora di cantina umida, malto tostato e osti che non fanno credito.',
      stats: { stile: 84, ignoranza: 78, prestigio: 85 }
    },
    {
      id: 'pitstop_f1',
      name: 'Pit-Stop F1 Carbon',
      rarity: 'MITICO',
      subtitle: 'Telemetria da Box Scuderia',
      desc: 'Forgiato in vera fibra di carbonio intrecciata con bordi Rosso Corsa. Tempo medio di stappata certificato dalla FIA: 1.8 secondi netti.',
      stats: { stile: 95, ignoranza: 82, prestigio: 92 }
    },
    {
      id: 'zanna_drago',
      name: 'Zanna del Drago',
      rarity: 'MITICO',
      subtitle: 'Artefatto Draconico Livello 20',
      desc: 'Artiglio ricurvo in avorio antico incastonato nel bronzo fuso: garantisce un +10 ai tiri salvezza contro il mal di testa della domenica mattina.',
      stats: { stile: 93, ignoranza: 88, prestigio: 94 }
    },
    {
      id: 'cavatappi_mario',
      name: 'Cavatappi Mario',
      rarity: 'LEGGENDARIO',
      subtitle: 'L’Entità Suprema di "THE BOYS"',
      desc: 'Maglietta d’ordinanza "THE BOYS", sguardo laterale che giudica in silenzio chi beve radler e anello d’acciaio sotto il mento: le bottiglie si stappano da sole per timore reverenziale.',
      stats: { stile: 99, ignoranza: 99, prestigio: 100 }
    },
    {
      id: 'reale_24k',
      name: 'Reale 24 Carati',
      rarity: 'LEGGENDARIO',
      subtitle: 'Gioiello della Corona Luppolata',
      desc: 'Fuso in oro massiccio 24 carati con diamante azzurro nel perno centrale. Talmente lussuoso che se ci stappi una birra del discount prende fuoco.',
      stats: { stile: 100, ignoranza: 75, prestigio: 99 }
    }
  ],
  calici: [
    {
      id: 'krug_ceramica',
      name: 'Krug Ceramica',
      rarity: 'COMUNE',
      subtitle: 'Corazza Bavarese Anti-Sguardo',
      desc: 'Boccale in gres grigio con coperchio in peltro: il bello è che essendo opaco nessuno al tavolo può vedere se stai barando sul livello della birra.',
      stats: { stile: 76, ignoranza: 80, prestigio: 74 }
    },
    {
      id: 'boccale_vichingo',
      name: 'Boccale Vichingo',
      rarity: 'COMUNE',
      subtitle: 'Quercia e Ferro Battuto',
      desc: 'Pesa tre chili già da vuoto: perfetto per fare contemporaneamente mezz’ora di bicipiti e un pieno di doppio malto.',
      stats: { stile: 78, ignoranza: 92, prestigio: 76 }
    },
    {
      id: 'pinta_subzero',
      name: 'Pinta Sub-Zero',
      rarity: 'RARO',
      subtitle: 'Temperatura Critica -18°C',
      desc: 'Estratta direttamente dal ghiacciaio: mantiene la birra gelida anche a Ferragosto, ma se non stai attento ti si incolla la lingua al vetro.',
      stats: { stile: 85, ignoranza: 79, prestigio: 84 }
    },
    {
      id: 'das_boot',
      name: 'Das Boot 1L',
      rarity: 'RARO',
      subtitle: 'Lo Stivale Tedesco da Un Litro',
      desc: 'Tutto facile fino a metà stivale, poi arriva la maledetta bolla d’aria nella punta che ti lancia mezzo litro di Weiss direttamente in faccia.',
      stats: { stile: 82, ignoranza: 95, prestigio: 86 }
    },
    {
      id: 'corno_nord',
      name: 'Corno del Nord',
      rarity: 'MITICO',
      subtitle: 'Reliquia del Valhalla',
      desc: 'Non ha la base piatta, quindi per legge fisica non puoi mai appoggiarlo sul tavolo: o lo finisci tutto d’un fiato o ti lavi i pantaloni.',
      stats: { stile: 91, ignoranza: 96, prestigio: 92 }
    },
    {
      id: 'teschio_cristallo',
      name: 'Teschio Cristallo',
      rarity: 'MITICO',
      subtitle: 'Calice Anatomico di Boemia',
      desc: 'Scolpito a forma di cranio umano: rappresenta fedelmente la radiografia della tua testa il sabato mattina dopo aver attivato il Capitano.',
      stats: { stile: 94, ignoranza: 89, prestigio: 91 }
    },
    {
      id: 'boccale_f1',
      name: 'Boccale F1 Carbon',
      rarity: 'LEGGENDARIO',
      subtitle: 'Aerodinamica da Pole Position',
      desc: 'Rivestito in carbonio con manometro di pressione sul fianco: riduce l’attrito dell’aria durante il gomito alzato e ti dà il DRS al bancone.',
      stats: { stile: 99, ignoranza: 88, prestigio: 98 }
    },
    {
      id: 'calice_imperiale',
      name: 'Calice Imperiale',
      rarity: 'LEGGENDARIO',
      subtitle: 'Il Sacro Graal del Sempre Noi',
      desc: 'Coppa in oro zecchino tempestata di rubini: chi beve da questo calice ha il diritto divino di far pagare il giro agli altri.',
      stats: { stile: 100, ignoranza: 82, prestigio: 100 }
    }
  ],
  cimeli: [
    {
      id: 'sottobicchiere_74',
      name: 'Sottobicchiere "Sempre Noi al 74"',
      rarity: 'COMUNE',
      subtitle: 'Reperto Archeologico da Tavolata',
      desc: 'Il glorioso cartoncino del "Sempre Noi al 74", intriso di birre storiche, conti fatti a penna sul retro e promesse di non bere più.',
      stats: { stile: 75, ignoranza: 85, prestigio: 80 }
    },
    {
      id: 'casco_bombardiere',
      name: 'Casco da Bombardiere',
      rarity: 'COMUNE',
      subtitle: 'Sistema Idratazione Mani Libere',
      desc: 'Doppia lattina laterale con cannucce dirette in bocca: lascia entrambe le mani libere per esultare o chiamare il VAR sugli amici.',
      stats: { stile: 70, ignoranza: 100, prestigio: 78 }
    },
    {
      id: 'fusto_30l',
      name: 'Fusto Emergenza 30L',
      rarity: 'RARO',
      subtitle: 'Unità Mobile di Rianimazione',
      desc: 'Trenta litri d’acciaio inox pressurizzato: nella nostra lega è considerato la dose minima sindacale per un aperitivo tranquillo.',
      stats: { stile: 83, ignoranza: 94, prestigio: 88 }
    },
    {
      id: 'alcoltest_esploso',
      name: 'Alcoltest Esploso',
      rarity: 'RARO',
      subtitle: 'Dispositivo Elettronico Martire',
      desc: 'Ha provato a misurare il tasso alcolico del gruppo un venerdì sera alle 2:00: ha segnato "ERR 999" ed è andato in autocombustione.',
      stats: { stile: 86, ignoranza: 97, prestigio: 87 }
    },
    {
      id: 'chiavi_pub',
      name: 'Chiavi del Pub',
      rarity: 'MITICO',
      subtitle: 'Onorificenza di Chiusura Locale',
      desc: 'Consegnate direttamente dal proprietario del pub: ormai chiudi tu la saracinesca, spegni le luci e dai pure da mangiare al cane.',
      stats: { stile: 94, ignoranza: 86, prestigio: 95 }
    },
    {
      id: 'cintura_pesi_massimi',
      name: 'Cintura Pesi Massimi',
      rarity: 'MITICO',
      subtitle: 'Titolo Mondiale Fegato d’Acciaio',
      desc: 'Cuoio nero e placca centrale d’oro massiccio: serve sia a festeggiare il titolo sia a tenere su i pantaloni dopo quattro medie alla spina.',
      stats: { stile: 93, ignoranza: 92, prestigio: 96 }
    },
    {
      id: 'cittadino_74',
      name: 'Cittadino Onorario del 74',
      rarity: 'LEGGENDARIO',
      subtitle: 'Immunità Diplomatica Perpetua',
      desc: 'Pergamena con sigillo in ceralacca e timbro d’oro "74": ti garantisce posto fisso, immunità diplomatica e rispetto eterno nel quartiere.',
      stats: { stile: 98, ignoranza: 90, prestigio: 100 }
    },
    {
      id: 'busto_mario',
      name: 'Busto d’Oro di Mario',
      rarity: 'LEGGENDARIO',
      subtitle: 'Monumento Imperiale "MARIVS • 74"',
      desc: 'Fuso in oro 24k con corona d’alloro imperiale e scritta "THE BOYS" scolpita nel metallo: basta strofinargli la testa lucida prima di bere per raddoppiare la fortuna.',
      stats: { stile: 100, ignoranza: 100, prestigio: 100 }
    }
  ],
  postazioni: [
    {
      id: 'cordolo_marciapiede',
      name: 'Cordolo del Marciapiede',
      rarity: 'COMUNE',
      subtitle: 'Tribuna Popolare Vista Asfalto',
      desc: 'Il classico gradino di cemento fuori dal pub: gelido d’inverno e rovente d’estate, ma quando i tavoli sono pieni diventa un palco VIP.',
      stats: { stile: 62, ignoranza: 98, prestigio: 74 }
    },
    {
      id: 'sedia_monoblocco',
      name: 'Sedia Monoblocco Bianca',
      rarity: 'COMUNE',
      subtitle: 'Regina Indiscussa della Periferia',
      desc: 'Plastica bianca vissuta con una gamba che dondola sempre: resiste agli uragani ma cede improvvisamente alla quarta media alla spina.',
      stats: { stile: 68, ignoranza: 96, prestigio: 76 }
    },
    {
      id: 'cassa_rovesciata',
      name: 'Cassa di Birra Rovesciata',
      rarity: 'RARO',
      subtitle: 'Pouf Ergonomico da Magazzino',
      desc: 'Cassa rigida da 24 bottiglie girata sottosopra: ti lascia la griglia stampata sui pantaloni per tre giorni, ma fa subito veterano del mestiere.',
      stats: { stile: 80, ignoranza: 94, prestigio: 84 }
    },
    {
      id: 'sgabello_mario',
      name: 'Lo Sgabello Nero di Mario',
      rarity: 'RARO',
      subtitle: 'Presidio Ufficiale davanti alla Serranda',
      desc: 'Il mitico sgabello quadrato nero in metallo immortalato a fianco di Mario: punto d’appoggio sacro per birre, chiavi e sentenze notturne.',
      stats: { stile: 88, ignoranza: 92, prestigio: 90 }
    },
    {
      id: 'sgabello_bancone',
      name: 'Sgabello Girevole da Pub',
      rarity: 'MITICO',
      subtitle: 'Perno Oliato ad Alta Velocità',
      desc: 'Cuscino tondo in pelle bordeaux e rotazione rapida a 360 gradi per intercettare lo spillatore prima ancora che l’oste alzi lo sguardo.',
      stats: { stile: 92, ignoranza: 85, prestigio: 93 }
    },
    {
      id: 'sedia_pescatore_74',
      name: 'Sedia da Pescatore del 74',
      rarity: 'MITICO',
      subtitle: 'Assetto Pieghevole con Doppio Portabirre',
      desc: 'Tela verde da campeggio, tubi incrociati e poggia-bicchieri a rete integrati nei due braccioli: si apre in tre secondi sul marciapiede e non ti alzi più fino all’alba.',
      stats: { stile: 94, ignoranza: 97, prestigio: 95 }
    },
    {
      id: 'divano_74',
      name: 'Divano Imperiale del 74',
      rarity: 'LEGGENDARIO',
      subtitle: 'Salotto Reale con Spine Integrate',
      desc: 'Pelle nera capitonné con braccioli refrigerati e doppio spillatore d’oro incorporato: una volta seduto qui, alzarsi è considerato alto tradimento.',
      stats: { stile: 99, ignoranza: 92, prestigio: 100 }
    },
    {
      id: 'trono_fusti',
      name: 'Il Trono di Fusti',
      rarity: 'LEGGENDARIO',
      subtitle: 'Game of Beers • Dominio Assoluto',
      desc: 'Forgiato fondendo insieme 50 fusti d’acciaio e cuscino reale cremisi: chi siede su questo trono governa la classifica della lega col pugno di ferro.',
      stats: { stile: 100, ignoranza: 100, prestigio: 100 }
    }
  ]
};

// ============================================================================
// 🖌️ MOTORE GRAFICO SVG AD ALTA DEFINIZIONE PER TUTTI I 32 OGGETTI
// ============================================================================
function ChioscoItemArtwork({ id, size = 'md' }) {
  const sizeClass = size === 'xl' ? 'w-36 h-36' : 'w-24 h-24';

  return (
    <div className={`${sizeClass} flex items-center justify-center relative select-none pointer-events-none`}>
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

        {id === 'oste_legno' && (
          <g transform="rotate(-30 60 60)">
            <path d="M46 42V22C46 12 74 12 74 22V42Z" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2.2" />
            <ellipse cx="60" cy="25" rx="8" ry="7" fill="#0f172a" />
            <rect x="55" y="29" width="10" height="4" rx="1" fill="url(#goldGrad)" />
            <rect x="44" y="42" width="32" height="7" rx="2" fill="url(#steelGrad)" stroke="#334155" strokeWidth="1.5" />
            <path d="M45 49C39 68 39 88 47 106H73C81 88 81 68 75 49H45Z" fill="url(#woodGrad)" stroke="#451a03" strokeWidth="2.2" />
            <path d="M54 50C51 68 51 88 54 105M66 50C69 68 69 88 66 105" stroke="#451a03" strokeWidth="1.4" fill="none" opacity="0.7" />
            <path d="M43 64H77M43 92H77" stroke="url(#goldGrad)" strokeWidth="3" />
          </g>
        )}

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

        {id === 'zanna_drago' && (
          <g>
            <path d="M66 14C82 14 92 25 88 39C85 48 75 52 67 48L62 38C68 40 75 38 77 32C79 26 74 22 67 22Z" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" />
            <path d="M50 34L68 26L76 42L60 56L46 48Z" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="62" cy="37" r="2.5" fill="#ef4444" />
            <path d="M50 34L38 26L46 40M56 30L46 20L52 34" fill="#ca8a04" stroke="#78350f" strokeWidth="1.5" />
            <path d="M48 48C36 66 32 88 22 104C44 98 62 82 64 54Z" fill="#fef3c7" stroke="#78350f" strokeWidth="2.2" />
            <path d="M49 54C42 70 37 84 29 97" stroke="#d97706" strokeWidth="1.5" fill="none" opacity="0.6" />
          </g>
        )}

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

        {id === 'reale_24k' && (
          <g>
            <circle cx="60" cy="22" r="11" fill="none" stroke="url(#goldGrad)" strokeWidth="5" />
            <rect x="54" y="32" width="12" height="26" rx="3" fill="url(#goldGrad)" stroke="#854d0e" strokeWidth="1.5" />
            <path d="M54 38L26 78L33 83L54 50Z" fill="url(#goldGrad)" stroke="#854d0e" strokeWidth="1.5" />
            <path d="M66 38L94 78L87 83L66 50Z" fill="url(#goldGrad)" stroke="#854d0e" strokeWidth="1.5" />
            <polygon points="60,38 66,44 60,50 54,44" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="1.2" />
            <path d="M60 58C55 64 65 70 60 76C55 82 65 88 60 94C56 99 62 104 60 109" stroke="url(#goldGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
            <path d="M26 24L30 24M28 22L28 26M90 30L96 30M93 27L93 33" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* ===================== 2. CALICI SPECIALI (8) ===================== */}
        {id === 'krug_ceramica' && (
          <g>
            <path d="M78 44H92C96 44 98 48 98 64C98 80 96 84 92 84H78" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            <path d="M84 36L95 28" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M34 36C36 20 84 20 86 36Z" fill="url(#steelGrad)" stroke="#334155" strokeWidth="2" />
            <circle cx="60" cy="17" r="4" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
            <rect x="32" y="36" width="52" height="66" rx="5" fill="#64748b" stroke="#1e293b" strokeWidth="2.5" />
            <rect x="35" y="42" width="46" height="6" fill="#1e3a8a" />
            <rect x="35" y="88" width="46" height="6" fill="#1e3a8a" />
            <polygon points="60,54 70,66 60,78 50,66" fill="#38bdf8" stroke="#f8fafc" strokeWidth="1.5" />
          </g>
        )}

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

        {id === 'das_boot' && (
          <g>
            <path d="M36 18C36 11 46 10 54 12C62 10 72 11 72 18Z" fill="#ffffff" stroke="#fde68a" strokeWidth="1.5" />
            <path d="M38 18V74C38 82 36 96 36 102H94C102 102 104 90 96 86L70 76V18Z" fill="url(#beerAmber)" stroke="#fef08a" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="52" cy="50" r="2" fill="#fef9c3" /><circle cx="58" cy="64" r="1.5" fill="#fef9c3" /><circle cx="48" cy="80" r="2.2" fill="#fef9c3" /><circle cx="76" cy="92" r="2" fill="#fef9c3" />
            <path d="M35 105H96" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {id === 'corno_nord' && (
          <g>
            <path d="M70 18C68 58 48 82 16 92C44 104 84 86 98 24Z" fill="#fef3c7" stroke="#78350f" strokeWidth="2.5" />
            <path d="M74 28C70 60 52 82 24 91" stroke="#d97706" strokeWidth="2" fill="none" opacity="0.55" />
            <path d="M68 16L100 22L97 34L66 28Z" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" />
            <circle cx="16" cy="92" r="4.5" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.5" />
            <path d="M68 16C72 9 98 12 100 22Z" fill="#ffffff" />
          </g>
        )}

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

        {/* ===================== 4. TRONI & POSTAZIONI (8) ===================== */}
        {id === 'cordolo_marciapiede' && (
          <g>
            <polygon points="10,82 110,82 116,104 4,104" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
            <path d="M22,94H46M74,94H98" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
            <polygon points="16,42 104,42 110,58 10,58" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
            <rect x="10" y="58" width="100" height="24" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
            <path d="M60 42L60 82M34 58L30 70L36 76" stroke="#475569" strokeWidth="1.8" fill="none" />
            <circle cx="44" cy="50" r="5" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.2" />
            <rect x="74" y="20" width="12" height="28" rx="3" fill="#15803d" stroke="#052e16" strokeWidth="1.8" />
            <rect x="77" y="12" width="6" height="9" fill="#15803d" />
            <rect x="75" y="27" width="10" height="8" fill="#fef08a" />
          </g>
        )}

        {id === 'sedia_monoblocco' && (
          <g>
            <path d="M36 68L28 106M84 68L92 106M42 74L38 108M78 74L82 108" stroke="#cbd5e1" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M34 18C34 12 86 12 86 18L82 62H38Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />
            <rect x="43" y="24" width="34" height="5" rx="2" fill="#1e293b" />
            <rect x="43" y="34" width="34" height="5" rx="2" fill="#1e293b" />
            <rect x="43" y="44" width="34" height="5" rx="2" fill="#1e293b" />
            <path d="M36 44C22 44 22 66 34 66M84 44C98 44 98 66 86 66" fill="none" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />
            <polygon points="34,60 86,60 92,74 28,74" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2.2" />
            <rect x="34" y="88" width="9" height="6" fill="#ef4444" transform="rotate(-12 38 90)" />
          </g>
        )}

        {id === 'cassa_rovesciata' && (
          <g>
            <polygon points="24,28 96,28 106,46 14,46" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2.2" />
            <path d="M36 28L28 46M60 28V46M84 28L92 46M20 37H100" stroke="#7f1d1d" strokeWidth="2" />
            <rect x="14" y="46" width="92" height="54" rx="3" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="2.5" />
            <rect x="20" y="46" width="8" height="54" fill="#991b1b" />
            <rect x="92" y="46" width="8" height="54" fill="#991b1b" />
            <rect x="44" y="54" width="32" height="10" rx="5" fill="#0f172a" stroke="#7f1d1d" strokeWidth="1.5" />
            <rect x="34" y="72" width="52" height="18" rx="3" fill="#facc15" stroke="#78350f" strokeWidth="1.5" />
            <text x="60" y="84" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="900">SEMPRE 74</text>
          </g>
        )}

        {id === 'sgabello_mario' && (
          <g>
            <rect x="22" y="12" width="76" height="44" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5" opacity="0.6" />
            <path d="M22 22H98M22 32H98M22 42H98" stroke="#0f172a" strokeWidth="2" />
            <path d="M34 48L30 98M86 48L90 98" stroke="#09090b" strokeWidth="5" strokeLinecap="round" />
            <path d="M24 84L96 84M26 76L32 90M94 76L88 90" stroke="#18181b" strokeWidth="4" strokeLinecap="round" />
            <polygon points="26,34 94,34 104,52 16,52" fill="#27272a" stroke="#52525b" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="16,52 104,52 104,58 16,58" fill="#09090b" stroke="#3f3f46" strokeWidth="1.8" />
            <path d="M22 58L18 108M98 58L102 108" stroke="#18181b" strokeWidth="6" strokeLinecap="round" />
            <path d="M22 58L18 108M98 58L102 108" stroke="#3f3f46" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="42" y="40" width="36" height="9" rx="2" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1" />
            <text x="60" y="46.8" textAnchor="middle" fill="#09090b" fontSize="6" fontWeight="900">THE BOYS</text>
          </g>
        )}

        {id === 'sgabello_bancone' && (
          <g>
            <rect x="55" y="44" width="10" height="54" fill="url(#steelGrad)" stroke="#334155" strokeWidth="1.5" />
            <path d="M28 104C36 94 84 94 92 104Z" fill="url(#steelGrad)" stroke="#334155" strokeWidth="2" />
            <ellipse cx="60" cy="74" rx="26" ry="7" fill="none" stroke="url(#steelGrad)" strokeWidth="4" />
            <ellipse cx="60" cy="36" rx="34" ry="12" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
            <ellipse cx="60" cy="30" rx="34" ry="11" fill="#dc2626" stroke="#f87171" strokeWidth="1.5" />
            <ellipse cx="52" cy="27" rx="14" ry="4" fill="#fca5a5" opacity="0.35" />
            <path d="M20 32C14 40 20 48 30 48M100 32C106 40 100 48 90 48" stroke="#facc15" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        )}

        {id === 'sedia_pescatore_74' && (
          <g>
            <path d="M28 70L88 105M88 70L28 105M22 48L30 105M94 48L86 105" stroke="url(#steelGrad)" strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="58" cy="87.5" r="3" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="23" y="103" width="9" height="5" rx="2" fill="#0f172a" />
            <rect x="84" y="103" width="9" height="5" rx="2" fill="#0f172a" />
            <path d="M30 16C45 20 71 20 86 16L84 62H32Z" fill="#15803d" stroke="#052e16" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M36 18V60M80 18V60" stroke="#166534" strokeWidth="2" strokeDasharray="3 2" />
            <rect x="43" y="26" width="30" height="17" rx="3" fill="#052e16" stroke="#facc15" strokeWidth="1.5" />
            <text x="58" y="38" textAnchor="middle" fill="#facc15" fontSize="10.5" fontWeight="900">74</text>
            <polygon points="30,60 86,60 94,72 22,72" fill="#166534" stroke="#052e16" strokeWidth="2.2" strokeLinejoin="round" />
            <polygon points="32,42 12,50 30,54 34,46" fill="#15803d" stroke="#052e16" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="84,42 104,50 86,54 82,46" fill="#15803d" stroke="#052e16" strokeWidth="2" strokeLinejoin="round" />
            <path d="M14 51L16 66H26L28 51" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" strokeDasharray="2 1" />
            <rect x="17" y="36" width="8.5" height="15" rx="1.5" fill="url(#beerAmber)" stroke="#fef08a" strokeWidth="1.2" />
            <path d="M16.5 37C16.5 33.5 26 33.5 26 37Z" fill="#ffffff" />
            <ellipse cx="21" cy="51" rx="7.5" ry="2.8" fill="none" stroke="#facc15" strokeWidth="1.8" />
            <path d="M88 51L90 66H100L102 51" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" strokeDasharray="2 1" />
            <ellipse cx="95" cy="51" rx="7.5" ry="2.8" fill="#020617" stroke="#facc15" strokeWidth="1.8" />
          </g>
        )}

        {id === 'divano_74' && (
          <g>
            <rect x="16" y="96" width="8" height="10" rx="2" fill="url(#goldGrad)" />
            <rect x="96" y="96" width="8" height="10" rx="2" fill="url(#goldGrad)" />
            <path d="M18 36C18 22 102 22 102 36V76H18Z" fill="#18181b" stroke="url(#goldGrad)" strokeWidth="3" />
            <circle cx="38" cy="44" r="2.5" fill="#facc15" /><circle cx="60" cy="44" r="2.5" fill="#facc15" /><circle cx="82" cy="44" r="2.5" fill="#facc15" />
            <circle cx="49" cy="56" r="2.5" fill="#facc15" /><circle cx="71" cy="56" r="2.5" fill="#facc15" />
            <path d="M16 54V30H24M104 54V30H96" fill="none" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" />
            <path d="M16 30L12 20M104 30L108 20" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
            <rect x="8" y="54" width="18" height="42" rx="8" fill="#27272a" stroke="url(#goldGrad)" strokeWidth="2.2" />
            <rect x="94" y="54" width="18" height="42" rx="8" fill="#27272a" stroke="url(#goldGrad)" strokeWidth="2.2" />
            <rect x="24" y="68" width="72" height="28" rx="5" fill="#09090b" stroke="url(#goldGrad)" strokeWidth="2.2" />
            <text x="60" y="85" textAnchor="middle" fill="#facc15" fontSize="9" fontWeight="900">VIP • 74</text>
          </g>
        )}

        {id === 'trono_fusti' && (
          <g>
            <path d="M60 8V48M42 12L54 48M78 12L66 48M26 22L48 52M94 22L72 52" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" />
            <circle cx="60" cy="8" r="3.5" fill="#dc2626" /><circle cx="42" cy="12" r="3" fill="#dc2626" /><circle cx="78" cy="12" r="3" fill="#dc2626" />
            <rect x="46" y="20" width="28" height="52" rx="4" fill="url(#steelGrad)" stroke="#334155" strokeWidth="2" />
            <rect x="30" y="30" width="18" height="44" rx="3" fill="url(#steelGrad)" stroke="#334155" strokeWidth="2" />
            <rect x="72" y="30" width="18" height="44" rx="3" fill="url(#steelGrad)" stroke="#334155" strokeWidth="2" />
            <rect x="14" y="56" width="24" height="36" rx="4" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" />
            <rect x="82" y="56" width="24" height="36" rx="4" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" />
            <rect x="34" y="68" width="52" height="16" rx="3" fill="#dc2626" stroke="url(#goldGrad)" strokeWidth="2.2" />
            <polygon points="16,92 104,92 112,108 8,108" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2.2" />
            <polygon points="48,46 54,36 60,43 66,36 72,46" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1.5" />
          </g>
        )}
      </svg>
    </div>
  );
}

// ============================================================================
// 🏪 COMPONENTE PRINCIPALE DEL CHIOSCO (CON MODALE CLASH ROYALE / FIFA)
// ============================================================================
export default function Chiosco() {
  const [activeCategory, setActiveCategory] = useState('cavatappi');
  const [inspectedItem, setInspectedItem] = useState(null);

  const categories = [
    { id: 'cavatappi', label: 'Cavatappi', icon: Wrench },
    { id: 'calici', label: 'Calici', icon: Sparkles },
    { id: 'cimeli', label: 'Cimeli', icon: Award },
    { id: 'postazioni', label: 'Troni', icon: Crown }
  ];

  const currentItems = CHIOSCO_ITEMS[activeCategory] || [];
  const activeModalStyle = inspectedItem
    ? (RARITY_STYLES[inspectedItem.rarity] || RARITY_STYLES.COMUNE)
    : null;

  return (
    <div className="space-y-4 pb-6">
      {/* INTESTAZIONE DEL CHIOSCO */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-3.5 shadow-xl space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Il Chiosco Ufficiale • 32 Carte
          </span>
          <span className="text-[9px] font-black uppercase bg-slate-950 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full">
            Tocca una carta
          </span>
        </div>
        <p className="text-[11px] text-slate-300 leading-snug">
          Tocca qualsiasi oggetto qui sotto per aprire la <strong>Carta a Tutto Schermo stile Clash Royale / FIFA</strong> con la descrizione spiritosa!
        </p>
      </div>

      {/* SELETTORE DELLE 4 CATEGORIE */}
      <div className="grid grid-cols-4 gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
        {categories.map(cat => {
          const IconComp = cat.icon;
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`py-2.5 px-1.5 rounded-xl text-[10px] font-black uppercase flex flex-col items-center justify-center gap-1 transition ${
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

      {/* GRIGLIA 2x4 DEGLI 8 OGGETTI */}
      <div className="grid grid-cols-2 gap-3">
        {currentItems.map(item => {
          const style = RARITY_STYLES[item.rarity] || RARITY_STYLES.COMUNE;

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

              {/* Illustrazione Vettoriale */}
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
                <div className="w-full py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 text-[10px] font-black uppercase flex items-center justify-center gap-1">
                  <Eye className="w-3 h-3 text-amber-400" />
                  <span>Apri Carta • 🔒</span>
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

         {/* Titolo, Sottotitolo e BOX DESCRIZIONE SPIRITOSA IN EVIDENZA */}
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


            {/* Pulsante Bloccato + Chiudi */}
            <div className="pt-1 space-y-2">
              <div className="w-full py-2.5 rounded-2xl bg-slate-950 border border-amber-500/40 text-amber-300 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Bloccato • Presto coi Tappi d'Oro</span>
              </div>
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