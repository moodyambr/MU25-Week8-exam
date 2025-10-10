// Help functions for selecting elements
const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

// Styling for like-knappen
const style = document.createElement('style');
style.textContent = `
  .like-btn.liked {
    color: #e74c3c !important;
    background: #ffebee !important;
  }
  
  .like-btn.liked:hover {
    color: #c62828 !important;
    background: #ffcdd2 !important;
  }
  
  /* Bounce effect när man klickar */
  .like-btn.bounce {
    animation: bounceClick 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  @keyframes bounceClick {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);

// ================================
// Navigation toggles
// ================================
const navToggles = $$('[id^="nav-toggle"]');
navToggles.forEach(btn => {
  const navId = btn.getAttribute('aria-controls') || btn.id.replace('nav-toggle','main-nav');
  const nav = btn.nextElementSibling || document.getElementById(navId);
  
  btn?.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    
    if(nav) {
      nav.classList.toggle('show');
      document.body.classList.toggle('menu-open');
    }
  });
  
  nav?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav?.classList.contains('show')) {
      nav.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && nav?.classList.contains('show')) {
      nav.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });
});

// ================================
// Gallery functionality
// ================================
const galleryItems = $$('.gallery-item');
const lightbox = $('#lightbox');
const lightboxImg = $('#lightbox-img');
const closeLightbox = $('#close-lightbox');
const nextBtn = $('#next');
const prevBtn = $('#prev');
let currentIndex = 0;

// Like and view counts lagrade i localStorage
const likes = JSON.parse(localStorage.getItem('likes')) || {};
const likedImages = JSON.parse(localStorage.getItem('likedImages')) || {};

// Formating of like counts
function formatLikes(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace('.0', '') + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1).replace('.0', '') + 'K';
  }
  return count.toString();
}

// Event listeners for like and view knappar
galleryItems.forEach((item, idx) => {
  const likeBtn = item.querySelector('.like-btn');
  const viewBtn = item.querySelector('.view-btn');

  // Initilaizing like and view counts
  if (!likes[idx]) likes[idx] = 0;
  likeBtn.textContent = `♡ ${likes[idx]}`;
  
  // controling exact like count in tooltip and data attribute
  if (likedImages[idx]) {
    likeBtn.classList.add('liked');
    likeBtn.textContent = `♥ ${likes[idx]}`; // Fyllt hjärta
  }

  // Like-function with animation
  likeBtn?.addEventListener('click', () => {
    // Lägg till bounce effect
    likeBtn.classList.add('bounce');
    
  
    setTimeout(() => {
      likeBtn.classList.remove('bounce');
    }, 600);
    
    likes[idx]++;
    likedImages[idx] = true; // Markera som gillad
    
    likeBtn.textContent = `♥ ${formatLikes(likes[idx])}`;
    likeBtn.setAttribute('data-exact', `${likes[idx].toLocaleString()}`);
    likeBtn.setAttribute('title', `${likes[idx].toLocaleString()} gillningar`);
    likeBtn.classList.add('liked');
    likeBtn.setAttribute('aria-pressed', 'true');
    
    localStorage.setItem('likes', JSON.stringify(likes));
    localStorage.setItem('likedImages', JSON.stringify(likedImages)); 
  });
    
  viewBtn?.addEventListener('click', () => openLightbox(idx));
});

function openLightbox(idx) {
  if (!galleryItems[idx] || !lightbox || !lightboxImg) return;
  
  const img = galleryItems[idx].querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.remove('hidden');
  currentIndex = idx;
}

function closeLB() {
  if (lightbox) {
    lightbox.classList.add('hidden');
  }
}

// Lightbox navigation
closeLightbox?.addEventListener('click', closeLB);
nextBtn?.addEventListener('click', () => {
  if (galleryItems.length > 0) {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
  }
});
prevBtn?.addEventListener('click', () => {
  if (galleryItems.length > 0) {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  }
});

// Stäng lightbox med Escape-tangent
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) {
    closeLB();
  }
});

// ================================
// Todo-lista funktionalitet
// ================================
const todoForm = $('#todo-form');
const todoInput = $('#todo-input');
const todoList = $('#todo-list');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');

const renderTodos = () => {
  if (!todoList) return;
  //cleaning the list before re-rendering
  todoList.innerHTML = '';
  todos.forEach(({ text, done }, i) => {
    const li = document.createElement('li');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = done;
    checkbox.addEventListener('change', () => {
      todos[i].done = checkbox.checked;
      saveAndRender();
    });

    const textSpan = document.createElement('span');
    textSpan.textContent = text;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Ta bort';
    removeBtn.classList.add('todo-remove');
    removeBtn.addEventListener('click', () => {
      todos = todos.filter((_, idx) => idx !== i);
      saveAndRender();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(removeBtn);

    if (done) {
      li.classList.add('completed');
      textSpan.classList.add('done');
    }

    todoList.appendChild(li);
  });
};

const saveAndRender = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
};

todoForm?.addEventListener('submit', e => {
  e.preventDefault();
  if (!todoInput) return;
  
  const text = todoInput.value.trim();
  if (!text) return;
  
  todos.push({ text, done: false });
  todoInput.value = '';
  saveAndRender();
});

if (todoForm) {
  saveAndRender();
}

// ================================
// Contact formular
// ================================
const contactForm = $('#contact-form');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  
  if (!name || !email) {
    alert('Vänligen fyll i namn och e-post.');
    return;
  }
  
  alert('Tack! Ditt meddelande har skickats (simulerat).');
  contactForm.reset();
});

// ================================
// Page animations
// ================================
const pageSections = $$('.page-section');
pageSections.forEach((section, index) => {
  section.style.animationDelay = `${index * 0.2}s`;
  section.classList.add('fade-in');
});

// ================================
// Country search 
// ================================
const countries = [
  {
    name: "Grekland",
    capital: "Aten",
    population: "10,5 miljoner",
    bestCities: ["Santorini", "Thessaloniki", "Mykonos"],
    mapUrl: "https://www.google.com/maps/place/Greece",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg"
  },
  {
    name: "Spanien",
    capital: "Madrid",
    population: "47 miljoner",
    bestCities: ["Barcelona", "Sevilla", "Valencia"],
    mapUrl: "https://www.google.com/maps/place/Spain",
    flagUrl: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg"
  },
  {
    name: "Turkiet",
    capital: "Ankara",
    population: "85 miljoner",
    bestCities: ["Istanbul", "Antalya", "Izmir"],
    mapUrl: "https://www.google.com/maps/place/Turkey",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg"
  }
];

const searchBtn = $('#searchBtn');
searchBtn?.addEventListener('click', () => {
  const selectedCountry = $('#countrySelect')?.value;
  const resultDiv = $('#result');

  if (!selectedCountry) {
    if(resultDiv) resultDiv.textContent = "Vänligen välj ett land först.";
    return;
  }

  const result = countries.find(country =>
    country.name.toLowerCase() === selectedCountry.toLowerCase()
  );

  if (result && resultDiv) {
    resultDiv.innerHTML = `
      <div style="display:flex; align-items:center; gap:15px;">
        <img src="${result.flagUrl}" alt="Flagga ${result.name}" style="width:80px; height:auto; border:1px solid #ccc; border-radius:5px;">
        <div>
          <p><strong>Land:</strong> ${result.name}</p>
          <p><strong>Huvudstad:</strong> ${result.capital}</p>
          <p><strong>Antal invånare:</strong> ${result.population}</p>
          <p><strong>Bästa städer:</strong> ${result.bestCities.join(", ")}</p>
          <p><a href="${result.mapUrl}" target="_blank">📍 Visa på Google Maps</a></p>
        </div>
      </div>
    `;
  } else if(resultDiv) {
    resultDiv.textContent = "Inget land hittades.";
  }
});