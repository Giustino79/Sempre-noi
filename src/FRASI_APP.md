Ho letto tutto il tuo **`src/App.jsx`** riga per riga: hai fatto benissimo a mandarmelo! Ora ho la fotografia **esatta al 100%** del tuo codice reale (che adesso salvo come nostro riferimento assoluto).

Ecco il **Catalogo Ufficiale e Reale** di tutte le frasi, i pop-up, i punteggi, i titoli della Gazzetta e le 32 carte del Chiosco che ci sono davvero nella tua app in questo momento. Puoi copiare questo messaggio e tenerlo come mappa per dirmi cosa vuoi cambiare!

---

## 1. Pop-up a Tutto Schermo delle Birre (`PERSONAL_DISCLAIMERS`)

Compaiono in automatico quando stappi la 1ª, la 2ª e la 3ª birra della stessa giornata:

* **P1 • 1ª Birra del Giorno (`🍻`)**
* **Targhetta in alto:** `1ª Birra del Giorno`
* **Titolo:** `Alla salute!`
* **Frase sotto:** *"Prima birra della giornata messa a referto! Il motore è ufficialmente entrato in temperatura."*
* **Testo Bottone:** `Daje tutta! 🍺`


* **P2 • 2ª Birra del Giorno (`⚽🔥`)**
* **Targhetta in alto:** `2ª Birra del Giorno`
* **Titolo:** `Doppietta, bravo bomber!`
* **Frase sotto:** *"Seconda stappata di giornata: passo gara deciso e freddezza sotto porta da vero attaccante di razza!"*
* **Testo Bottone:** `Puntiamo alla tripletta! 🚀`


* **P3 • 3ª Birra del Giorno (`🧐🚨`)**
* **Targhetta in alto:** `3ª Birra del Giorno`
* **Titolo:** `Ehi calmo, vuoi diventare Mario?`
* **Frase sotto:** *"Siamo già alla terza birra di oggi... dalla panchina il mister inizia a guardarti con una certa preoccupazione!"*
* **Testo Bottone:** `Tranquilli, reggo il passo! 😎`



---

## 2. Notizie della "Gazzetta del Sempre Noi" (Ultim'Ora + Giornale 24h)

Compaiono nel banner a comparsa temporanea in alto (per 7 secondi o finché premi `✕`) e restano per 24 ore dentro l'icona del giornale:

* **G1 • Sorpasso in classifica con birra normale (`🏎️ SORPASSO IN CURVA`)**
* **Testo:** `[Nuovo Leader] si prende la Pole Position ([Punti] pt)! [Ex Leader] scivola dietro!`


* **G2 • Sorpasso in classifica dopo Capitano 12h (`🏎️ SORPASSO IN CURVA`)**
* **Testo:** `[Nuovo Leader] si prende la Pole Position della lega ([Punti] pt)! [Ex Leader] scivola dietro e mastica amaro!`


* **G3 • Ritorno dopo 5+ giorni senza bere (`🚨 IL PENTITO`)**
* **Testo:** `Il rincoglionito ([Nome]) è tornato a bere dopo [X] giorni di astinenza!`


* **G4 • Quando qualcuno beve un Passaporto Rumeno (`🥫 ALLARME DEGRADO`)**
* **Testo:** `[Nome] ha stappato un Passaporto Rumeno ([Nome Birra]). Chiudete le finestre!`


* **G5 • Quando qualcuno beve al mattino 07:00-12:30 (`☀️ COLAZIONE DEI CAMPIONI`)**
* **Testo:** `Non è neanche mezzogiorno e mezza e [Nome] ha già stappato. Inchinatevi!`



---

## 3. Regole Punti, Formati e Bonus nella sezione "Stappa!"

### 🍺 S1. I 3 Passaggi di Calcolo della Birra

1. **Formato:**
* `33cl` ➔ **`+3 pt`** *(0.33 L)*
* `Media 50cl` ➔ **`+5 pt`** *(0.50 L)*
* `1 litro` ➔ **`+8 pt`** *(1.00 L)*


2. **Grado Alcolico:**
* `Leggera` (`fino a 5,6°`) ➔ **`x1.0`**
* `Media` (`5,6° - 7,5°`) ➔ **`x1.3`**
* `Forte` (`oltre 7,5°`) ➔ **`x1.7`**


3. **Qualità della Birra:**
* `Industriale` (`Commerciale standard`) ➔ **`+0 pt`**
* `Artigianale` (`Bottiglia / Lattina craft`) ➔ **`+2 pt`**
* `Alla spina` (`Spillata al pub`) ➔ **`+3 pt`**
* `Passaporto Rumeno` (`Ceres, Tennent's, Faxe...`) ➔ **`-5 pt • 🥫 24h`** *(Trasforma il tuo bicchiere nella Lattina Ammaccata con scritto `9%` per 24 ore)*



### ⚡ S2. I 3 Bonus Speciali

* **Bonus "Sempre noi" (`x1,3`):**
* Sottotitolo: `Bevuta in compagnia con gli amici della lega`


* **Trofeo "Goccia d'Oro" (`+3 pt`):**
* Sottotitolo quando aperto (07:00 - 12:30): `Fascia attiva (07:00 - 12:30): prima birra del mattino!`
* Avviso se clicchi prima delle 07:00: `⏰ Troppo presto! Il Trofeo Goccia d'Oro apre alle 07:00 del mattino.`
* Avviso se clicchi dopo le 12:30: `❌ Sei arrivato tardi! Il Trofeo Goccia d'Oro è valido solo dalle 07:00 alle 12:30.`


* **Il "Capitano" della Serata (`Timer 12 Ore • Max 4 Birre x2`):**
* Descrizione nel box: *"Scade in automatico dopo 12 ore. Le tue prime 4 birre valgono Punti Doppi (x2) e vengono accreditate solo allo scadere delle 12h se tutte e 4 sono confermate dal VAR. Se fallisci: 0 punti per le birre e Malus di -20 pt!"*
* Frase blocco giorno: `Oggi è [Giorno]: attivabile solo Venerdì e Sabato entro le 20:00`
* Frase blocco orario: `Sono passate le 20:00! Tempo scaduto per dichiarare il Capitano stasera`
* Notifica fine 12h Vinto: `👑 12 Ore Concluse! [Nome] ha completato le 4/4 birre da Capitano: +[Punti] pt accreditati!`
* Notifica fine 12h Fallito: `🚨 12 Ore Scadute! [Nome] si è fermato a [X]/4 birre da Capitano: 0 punti per le birre e MALUS di -20 pt!`



---

## 4. Sala VAR, Albo d'Oro e Bollettino Medico

### 🖥️ V1-V3. Le 3 Sentenze della Sala VAR

* **V1 (Giallo):** `🟨 Cartellino giallo: birra avanzata -2pt`
* Sottotitolo: `Toglie esattamente -2 pt in classifica e assegna 1 Cartellino Giallo.`


* **V2 (Simulazione):** `🚨 Simulazione in area: foto riciclata/vuota -5pt`
* Sottotitolo: `Toglie esattamente -5 pt in classifica e annulla la bevuta dalla Sala VAR.`


* **V3 (Rosso):** `🟥 Cartellino rosso: birra analcolica/radler -10pt`
* Sottotitolo: `Toglie esattamente -10 pt in classifica e assegna 1 Cartellino Rosso.`



### 🏆 AL1-AL4. I 4 Titoli dell'Albo d'Oro

* **AL1:** `MVP Mensile` • Sottotitolo: `Il GOAT della lega` *(Icona `🐐 GOAT`)*
* **AL2:** `24 Ore di Le Mans` • Sottotitolo: `Record birre in 24h` *(Icona `⏱️ 24H`)*
* **AL3:** `L'Idrovora` • Sottotitolo: `Massimo litri scolati` *(Icona `⛽ MAX L`)*
* **AL4:** `Re Goyim` • Sottotitolo: `Cucchiaio di legno` *(Icona `🍼 GOYIM`)*

### 🏥 BM. Bollettino Medico (Scheda Bevitore)

* **Titolo in alto:** `🏥 Bollettino Medico • Scheda Bevitore`
* **Sezione oggetti:** `🎒 I Miei Averi` *(oppure `🎒 Gli Averi di [Nome]`)*
* **Frase nessun oggetto (1):** `Nessun oggetto ancora riscattato al Chiosco!`
* **Frase nessun oggetto (2):** *"Fegato da professionista, ma inventario ancora vuoto: accumula Tappi d'Oro per fare spesa al Chiosco!"*

---

## 5. Le 32 Carte del Chiosco (`src/Chiosco.jsx`)

### 🔧 Categoria 1: CAVATAPPI (8 Carte)

* **C1 • Accendino Ignorante (COMUNE)** — *Utensile di Sopravvivenza da Marciapiede*
> "Il classico Bic giallo consumato fino all’osso: leva fisica applicata sulla nocca del dito, colpo secco e tappo spedito direttamente sulla Luna."


* **C2 • Cucchiaio Ignorante (COMUNE)** — *Posata da Scasso Notturno*
> "Rubato dal cassetto della cucina a mezzanotte quando nessuno trova il cavatappi. Piegato a 45 gradi ma non ha mai fallito una stappata."


* **C3 • Bar Blade Pro (RARO)** — *Lama Ufficiale da Bancone*
> "Piastra piatta in acciaio inox con impugnatura rossa gommata: lo fai girare sul dito come nei film, ma dopo la terza birra ti cade sempre."


* **C4 • Oste in Legno (RARO)** — *Reliquia della Vecchia Locanda*
> "Tornito dal legno massello di una vecchia botte di rovere: profuma ancora di cantina umida, malto tostato e osti che non fanno credito."


* **C5 • Pit-Stop F1 Carbon (MITICO)** — *Telemetria da Box Scuderia*
> "Forgiato in vera fibra di carbonio intrecciata con bordi Rosso Corsa. Tempo medio di stappata certificato dalla FIA: 1.8 secondi netti."


* **C6 • Zanna del Drago (MITICO)** — *Artefatto Draconico Livello 20*
> "Artiglio ricurvo in avorio antico incastonato nel bronzo fuso: garantisce un +10 ai tiri salvezza contro il mal di testa della domenica mattina."


* **C7 • Cavatappi Mario (LEGGENDARIO)** — *L’Entità Suprema di "THE BOYS"*
> "Maglietta d’ordinanza "THE BOYS", sguardo laterale che giudica in silenzio chi beve radler e anello d’acciaio sotto il mento: le bottiglie si stappano da sole per timore reverenziale."


* **C8 • Reale 24 Carati (LEGGENDARIO)** — *Gioiello della Corona Luppolata*
> "Fuso in oro massiccio 24 carati con diamante azzurro nel perno centrale. Talmente lussuoso che se ci stappi una birra del discount prende fuoco."



### 🍺 Categoria 2: CALICI (8 Carte)

* **B1 • Krug Ceramica (COMUNE)** — *Corazza Bavarese Anti-Sguardo*
> "Boccale in gres grigio con coperchio in peltro: il bello è che essendo opaco nessuno al tavolo può vedere se stai barando sul livello della birra."


* **B2 • Boccale Vichingo (COMUNE)** — *Quercia e Ferro Battuto*
> "Pesa tre chili già da vuoto: perfetto per fare contemporaneamente mezz’ora di bicipiti e un pieno di doppio malto."


* **B3 • Pinta Sub-Zero (RARO)** — *Temperatura Critica -18°C*
> "Estratta direttamente dal ghiacciaio: mantiene la birra gelida anche a Ferragosto, ma se non stai attento ti si incolla la lingua al vetro."


* **B4 • Das Boot 1L (RARO)** — *Lo Stivale Tedesco da Un Litro*
> "Tutto facile fino a metà stivale, poi arriva la maledetta bolla d’aria nella punta che ti lancia mezzo litro di Weiss direttamente in faccia."


* **B5 • Corno del Nord (MITICO)** — *Reliquia del Valhalla*
> "Non ha la base piatta, quindi per legge fisica non puoi mai appoggiarlo sul tavolo: o lo finisci tutto d’un fiato o ti lavi i pantaloni."


* **B6 • Teschio Cristallo (MITICO)** — *Calice Anatomico di Boemia*
> "Scolpito a forma di cranio umano: rappresenta fedelmente la radiografia della tua testa il sabato mattina dopo aver attivato il Capitano."


* **B7 • Boccale F1 Carbon (LEGGENDARIO)** — *Aerodinamica da Pole Position*
> "Rivestito in carbonio con manometro di pressione sul fianco: riduce l’attrito dell’aria durante il gomito alzato e ti dà il DRS al bancone."


* **B8 • Calice Imperiale (LEGGENDARIO)** — *Il Sacro Graal del Sempre Noi*
> "Coppa in oro zecchino tempestata di rubini: chi beve da questo calice ha il diritto divino di far pagare il giro agli altri."



### 🏆 Categoria 3: CIMELI (8 Carte)

* **M1 • Sottobicchiere "Sempre Noi al 74" (COMUNE)** — *Reperto Archeologico da Tavolata*
> "Il glorioso cartoncino del "Sempre Noi al 74", intriso di birre storiche, conti fatti a penna sul retro e promesse di non bere più."


* **M2 • Casco da Bombardiere (COMUNE)** — *Sistema Idratazione Mani Libere*
> "Doppia lattina laterale con cannucce dirette in bocca: lascia entrambe le mani libere per esultare o chiamare il VAR sugli amici."


* **M3 • Fusto Emergenza 30L (RARO)** — *Unità Mobile di Rianimazione*
> "Trenta litri d’acciaio inox pressurizzato: nella nostra lega è considerato la dose minima sindacale per un aperitivo tranquillo."


* **M4 • Alcoltest Esploso (RARO)** — *Dispositivo Elettronico Martire*
> "Ha provato a misurare il tasso alcolico del gruppo un venerdì sera alle 2:00: ha segnato "ERR 999" ed è andato in autocombustione."


* **M5 • Chiavi del Pub (MITICO)** — *Onorificenza di Chiusura Locale*
> "Consegnate direttamente dal proprietario del pub: ormai chiudi tu la saracinesca, spegni le luci e dai pure da mangiare al cane."


* **M6 • Cintura Pesi Massimi (MITICO)** — *Titolo Mondiale Fegato d’Acciaio*
> "Cuoio nero e placca centrale d’oro massiccio: serve sia a festeggiare il titolo sia a tenere su i pantaloni dopo quattro medie alla spina."


* **M7 • Cittadino Onorario del 74 (LEGGENDARIO)** — *Immunità Diplomatica Perpetua*
> "Pergamena con sigillo in ceralacca e timbro d’oro "74": ti garantisce posto fisso, immunità diplomatica e rispetto eterno nel quartiere."


* **M8 • Busto d’Oro di Mario (LEGGENDARIO)** — *Monumento Imperiale "MARIVS • 74"*
> "Fuso in oro 24k con corona d’alloro imperiale e scritta "THE BOYS" scolpita nel metallo: basta strofinargli la testa lucida prima di bere per raddoppiare la fortuna."



### 👑 Categoria 4: TRONI (8 Carte)

* **T1 • Cordolo del Marciapiede (COMUNE)** — *Tribuna Popolare Vista Asfalto*
> "Il classico gradino di cemento fuori dal pub: gelido d’inverno e rovente d’estate, ma quando i tavoli sono pieni diventa un palco VIP."


* **T2 • Sedia Monoblocco Bianca (COMUNE)** — *Regina Indiscussa della Periferia*
> "Plastica bianca vissuta con una gamba che dondola sempre: resiste agli uragani ma cede improvvisamente alla quarta media alla spina."


* **T3 • Cassa di Birra Rovesciata (RARO)** — *Pouf Ergonomico da Magazzino*
> "Cassa rigida da 24 bottiglie girata sottosopra: ti lascia la griglia stampata sui pantaloni per tre giorni, ma fa subito veterano del mestiere."


* **T4 • Lo Sgabello Nero di Mario (RARO)** — *Presidio Ufficiale davanti alla Serranda*
> "Il mitico sgabello quadrato nero in metallo immortalato a fianco di Mario: punto d’appoggio sacro per birre, chiavi e sentenze notturne."


* **T5 • Sgabello Girevole da Pub (MITICO)** — *Perno Oliato ad Alta Velocità*
> "Cuscino tondo in pelle bordeaux e rotazione rapida a 360 gradi per intercettare lo spillatore prima ancora che l’oste alzi lo sguardo."


* **T6 • Sedia da Pescatore del 74 (MITICO)** — *Assetto Pieghevole con Doppio Portabirre*
> "Tela verde da campeggio, tubi incrociati e poggia-bicchieri a rete integrati nei due braccioli: si apre in tre secondi sul marciapiede e non ti alzi più fino all’alba."


* **T7 • Divano Imperiale del 74 (LEGGENDARIO)** — *Salotto Reale con Spine Integrate*
> "Pelle nera capitonné con braccioli refrigerati e doppio spillatore d’oro incorporato: una volta seduto qui, alzarsi è considerato alto tradimento."


* **T8 • Il Trono di Fusti (LEGGENDARIO)** — *Game of Beers • Dominio Assoluto*
> "Forgiato fondendo insieme 50 fusti d’acciaio e cuscino reale cremisi: chi siede su questo trono governa la classifica della lega col pugno di ferro."

