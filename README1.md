# Min Hobby — Responsiv webbplats med JavaScript

En modern, interaktiv webbplats byggd som ett hobbyprojekt för att demonstrera kunskap inom HTML5, CSS och JavaScript ES6.

## Projektöversikt

Detta projekt är en fullständig responsiv webbplats som visar avancerade webbutvecklingstekniker genom praktiska, interaktiva funktioner. Webbplatsen fungerar som en personlig hobby-sajt med fokus på fotografi och webbutveckling.

## Sidstruktur

- **Startsida (index.html)** - Hero-sektion, interaktivt galleri, todo-lista och kontaktformulär
- **Om mig (about.html)** - Personlig information och teknisk kompetens  
- **Projekt (project1.html)** - Detaljerad projektsammanställning med expanderbara sektioner

## Teknisk stack

### HTML5
- **Semantisk struktur** med <header>, <nav>, <main>, <section>, <footer>
- **Tillgänglighet** med ARIA-attribut, alt-texter och semantiska element
- **Responsiva bilder** med optimerade storlekar
- **Formulärvalidering** med inbyggda HTML5-attribut

### CSS3
- **CSS Grid** för gallerilayout
- **Flexbox** för navigation, hero-sektion och komponenter
- **CSS Custom Properties** (variabler) för konsekvent design
- **Responsiv design** med mobile-first approach
- **Animationer** med CSS transitions och keyframes
- **Modern layout** med clamp(), min(), max() funktioner

### JavaScript ES6+
- **Modulär struktur** med ES6 modules
- **Higher Order Functions** (forEach, find, filter, map)
- **Template literals** för dynamisk DOM-generering
- **Arrow functions** och destructuring
- **Async/await** för framtida API-integrationer
- **LocalStorage** för datalagring

## Interaktiva funktioner

### Avancerat galleri-system
- **Lightbox** med tangentbordsnavigation (←/→/ESC)
- **Like-system** med bounce-animation och localStorage
- **Responsiv grid** som anpassar sig efter skärmstorlek
- **Bildoptimering** med object-fit för konsekvent visning

### Todo-lista
- **Lägg till** uppgifter/ todo's
- **Markera som klara** med checkbox-funktionalitet
- **Ta bort** uppgifter med bekräftelse
- **Persistent lagring** med localStorage
- **Responsiv design** för alla enheter

### Landssökning
- **Dropdown-meny** med fördefinierade länder
- **Dynamisk innehållsvisning** med flaggor och kartor
- **Felhantering** för ogiltiga val
- **Google-Maps integration** för kartlänkar/Navigation 

### Responsiv navigation
- **Hamburger-meny** för mobila enheter
- **Smooth animationer** med CSS transitions
- **Tillgänglig** med ARIA-attribut och tangentbordsnavigation
- **Auto-stängning** vid navigation eller ESC-tryck

### Kontaktformulär
- **Realtidsvalidering** med HTML5 och JavaScript
- **Responsiv layout** för alla skärmstorlekar
- **Användarfeedback** med visuella meddelanden
- **Förbered för backend-integration i framtiden**

## Utmaningar & lösningar

Utvecklandet av detta projekt var definitivt inte enkelt, ingenting var det. Varje steg i processen blir som nya utmaningar som krävde både tålamod och omfattande research.

**Det absolut svåraste var att hålla sidan i en bra struktur.** När projektet växte och nya funktioner lades till blev det allt svårare att behålla en ren och logisk kodorganisation. CSS-reglerna började krocka med varandra, JavaScript-funktionerna blev allt mer sammankopplade, och HTML-strukturen började kännas rörig. Att förbättra koden och hålla den underhållbar var en konstant kamp.

**Mycket tid spenderades på att söka på internet om vilken JavaScript-funktion som passar bäst** för varje specifik situation. Det fanns alltid flera sätt att lösa samma problem. Skulle jag använda forEach eller for.of? Eller querySelector, getElementById? innerHTML eller createElement? Varje val krävde research om prestanda. Sökte mycket på Stack Overflow, MDN, W3 schools även AI.

**Anpassning till olika skärmstorlekar var också jättsvårt.** Att få en design som fungerar lika bra på en 27-tums skärm som på en iPhone SE var en enorm utmaning. Media queries blev snabbt komplicerade, och det var svårt att förutse hur olika element skulle bete sig på skärmar jag inte hade tillgång till. Testning på olika enheter och webbläsare visade ständigt nya problem som behövde lösas.

Men i slutändan lyckades man hyfsat okej, förhoppningsvis. Projektet blev en värdefull lärdomsupplevelse som har gett djup förståelse för webbutvecklingens komplexitet. Varje problem som löstes ledde till ny kunskap, och varje misslyckad lösning lärde jag mig vad som inte fungerar.

Trots alla utmaningar är jag stolt över slutresultatet. Webbplatsen fungerar som avsett, är responsiv och visar upp de tekniker jag har lärt mig. Det viktigaste är inte att koden är perfekt, utan vad jag har lärt mig av det.



## Projektstruktur


Min-Hobby-Webbplats/
├── index.html              # Startsida med alla huvudfunktioner
├── about.html              # Om mig-sida
├── projects/
│   └── project1.html       # Projektsida med accordions
├── css/
│   ├── styles.css          # Huvudstilmall (gemensam)
│   ├── index.css           # Index-specifika stilar
│   ├── about.css           # About-specifika stilar
│   └── project.css         # Projekt-specifika stilar
├── js/
│   └── script.js           # Huvudfunktionalitet (ES6 modul)
├── images/
│   ├── pexels-*.jpg        # Optimerade bilder från Pexels
│   └── flaggor/            # Landsflaggor för sökning
└── README.md               # Detta dokument


## Installation och användning

### Snabbstart
1. **Klona projektet från github**
   bash
   git clone [repository-url]
   cd Min-Hobby-Webbplats
  

2. **'Öppna i webbläsare** 
  Genom att använd Live Server i VS Code.
   

3. **Testa funktioner**
   - Navigera mellan sidor
   - Testa galleriets like-system och lightbox
   - Lägg till todos och se localStorage-lagring
   - Prova landssökning med dropdown
   - Testa responsivitet på olika skärmstorlekar

## ES6+ Features demonstration

### Higher Order Functions
```javascript
// Array.forEach för iteration
galleryItems.forEach((item, idx) => {
  setupGalleryItem(item, idx);
});

// Array.find för sökning
const country = countries.find(c => 
  c.name.toLowerCase() === selected.toLowerCase()
);

// Array.filter för filtrering
todos = todos.filter((_, index) => index !== itemIndex);
```

### Modern JavaScript
```javascript
// Template literals
const html = `
  <div class="country-info">
    <h3>${country.name}</h3>
    <p>Huvudstad: ${country.capital}</p>
  </div>
`;

// Arrow functions
const formatLikes = count => 
  count >= 1000 ? `${(count/1000).toFixed(1)}K` : count;

// Destructuring (exempel)
const { name, email, message } = formData;

// Const/let användning
const lightbox = document.querySelector('#lightbox');
let currentImageIndex = 0;
```

