# Sostiene Pauleta 🗯️

**Il fedele cronista delle massime di Pauleta.**

Una Progressive Web App (PWA) per contare in tempo reale le frasi più iconiche di Pauleta, con stile fumettoso cartoon.

## Funzionalità

- **Contatore per frase**: ogni click su "+1" incrementa il contatore della frase corrispondente
- **Frase del giorno**: la frase più cliccata oggi è evidenziata in cima
- **Reset automatico a mezzanotte**: i contatori giornalieri si azzerano ogni giorno
- **Storico**: puoi vedere quale frase ha vinto nei giorni precedenti (ultimi 30 giorni)
- **Offline-first**: funziona anche senza connessione una volta installata

## Struttura

```
sostiene-pauleta/
├── index.html          ← App principale
├── manifest.json       ← Configurazione PWA
├── sw.js               ← Service Worker (cache offline)
├── icons/              ← Icone app
├── styles/main.css     ← Stile fumettoso
└── scripts/app.js      ← Logica applicazione
```

## Sviluppo locale

Basta aprire `index.html` nel browser. Nessun build step, nessuna dipendenza.

Per testare la PWA correttamente (Service Worker + manifest) serve un server locale:

```bash
# Python 3
python3 -m http.server 8080

# Poi apri: http://localhost:8080
```

## Deploy su GitHub Pages

1. Crea una repo GitHub chiamata `sostiene-pauleta`
2. Push di tutti i file nella root della repo
3. Vai su **Settings → Pages → Source**: "Deploy from branch" → branch `main`, cartella `/root`
4. L'app sarà disponibile su `https://[tuousername].github.io/sostiene-pauleta/`

### Installazione su iPhone
1. Apri Safari e vai all'URL dell'app
2. Tocca il pulsante **Condividi** (quadrato con freccia su)
3. Seleziona **"Aggiungi a schermata Home"**
4. L'app appare come un'app nativa!

### Installazione su Android
Chrome mostra automaticamente il banner **"Installa app"** quando visiti l'URL.

## Aggiungere o modificare le frasi

Edita l'array `FRASI` in `scripts/app.js`:

```js
const FRASI = [
  "Ma dai, non ci posso credere!",
  // aggiungi qui...
];
```

I contatori storici fanno riferimento all'indice della frase nell'array, quindi aggiungi sempre nuove frasi **in fondo** per non perdere la corrispondenza con lo storico.

---

*Fatto con affetto e cronaca fedele.*
