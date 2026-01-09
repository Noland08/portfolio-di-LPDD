/* =========================
   LOADING SCREEN
========================= */
const words = [
  "Loading.",
  "Loading..",
  "Loading...",
  "Chuyên",
  "Tin",
  "Nhớ",
  "Một",
  "Chữ",
  "Đồng"
];

let wordIndex = 0;
const wordEl = document.getElementById("word");
const loading = document.getElementById("loading");

window.scrollTo(0, 0);
document.documentElement.style.overflow = "hidden";
document.body.style.overflow = "hidden";

const loadingInterval = setInterval(() => {
  wordEl.style.opacity = 0;

  setTimeout(() => {
    wordEl.textContent = words[wordIndex];
    wordEl.style.opacity = 0.7;
    wordIndex++;

    if (wordIndex === words.length) {
      clearInterval(loadingInterval);

      setTimeout(() => {
        loading.style.opacity = 0;

        setTimeout(() => {
          loading.remove();
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
          window.scrollTo(0, 0);
        }, 800);
      }, 800);
    }
  }, 250);
}, 500);

/* =========================
   EQUATIONS BACKGROUND (STABLE & PERFORMANT)
========================= */
const equationsBg = document.getElementById('equationsBg');
const equations = [
  'F = ma',
  'τ = r × F',
  'E = mc²',
  'V = IR',
  'ω = θ / t',
  'KE = ½mv²',
  's = ut + ½at²',
  'a = v² / r',
  'η = Pout / Pin',
  'λ = v / f',
  'PV = nRT'
];
function spawnEquation() {
  const el = document.createElement('div');
  el.className = 'equation';
  el.textContent = equations[Math.floor(Math.random() * equations.length)];
  el.style.left = Math.random() * 90 + 'vw';
  el.style.animationDuration = 18 + Math.random() * 10 + 's';
  el.style.animationDelay = Math.random() * 6 + 's';
  equationsBg.appendChild(el);
  setTimeout(() => el.remove(), 30000);
}
/* Initial population */
for (let i = 0; i < 12; i++) {
  setTimeout(spawnEquation, i * 800);
}
/* Continuous generation */
setInterval(spawnEquation, 2200);

/* =========================
   AUTO-HIDE NAVBAR (No auto-show on stop)
========================= */
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // Hide navbar when scrolling down, show when scrolling up
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    navbar.classList.add('hidden');
  } else if (currentScrollY < lastScrollY) {
    navbar.classList.remove('hidden');
  }
  
  lastScrollY = currentScrollY;
});

/* =========================
   S-SHAPED SCROLL LINE
========================= */
const progressPath = document.getElementById('progress-path');
const pathLength = progressPath.getTotalLength();
progressPath.style.strokeDasharray = pathLength;
progressPath.style.strokeDashoffset = pathLength;

window.addEventListener('scroll', () => {
  const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  const drawLength = pathLength * scrollPercent;
  progressPath.style.strokeDashoffset = pathLength - drawLength;
});

/* =========================
   IMAGE PREVIEW - STAYS IN SCREEN
========================= */
const imagePreview = document.getElementById('imagePreview');
const previewImage = document.getElementById('previewImage');
const previewLabel = document.getElementById('previewLabel');
let mouseX = 0;
let mouseY = 0;
let previewX = 0;
let previewY = 0;

const hoverElements = document.querySelectorAll('[data-preview-image]');

// Track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth follow animation with boundary constraints
function animatePreview() {
  if (imagePreview.classList.contains('active')) {
    const previewWidth = imagePreview.offsetWidth;
    const previewHeight = imagePreview.offsetHeight;
    const padding = 20;
    
    // Calculate target position
    let targetX = mouseX + padding;
    let targetY = mouseY + padding;
    
    // Keep within screen bounds
    if (targetX + previewWidth > window.innerWidth - padding) {
      targetX = mouseX - previewWidth - padding;
    }
    if (targetY + previewHeight > window.innerHeight - padding) {
      targetY = window.innerHeight - previewHeight - padding;
    }
    if (targetX < padding) {
      targetX = padding;
    }
    if (targetY < padding) {
      targetY = padding;
    }
    
    // Smooth easing
    const dx = targetX - previewX;
    const dy = targetY - previewY;
    
    previewX += dx * 0.15;
    previewY += dy * 0.15;
    
    imagePreview.style.left = previewX + 'px';
    imagePreview.style.top = previewY + 'px';
  }
  
  requestAnimationFrame(animatePreview);
}

animatePreview();

hoverElements.forEach(element => {
  element.addEventListener('mouseenter', function() {
    const imageSrc = this.getAttribute('data-preview-image');
    const label = this.getAttribute('data-preview-label');
    
    if (imageSrc) {
      previewImage.src = imageSrc;
      previewLabel.textContent = label || '';
      
      // Initialize position near mouse
      const previewWidth = 380; // approximate width
      const previewHeight = 500; // approximate height
      const padding = 20;
      
      previewX = mouseX + padding;
      previewY = mouseY + padding;
      
      // Adjust if would go off screen
      if (previewX + previewWidth > window.innerWidth - padding) {
        previewX = mouseX - previewWidth - padding;
      }
      if (previewY + previewHeight > window.innerHeight - padding) {
        previewY = window.innerHeight - previewHeight - padding;
      }
      
      imagePreview.style.left = previewX + 'px';
      imagePreview.style.top = previewY + 'px';
      imagePreview.classList.add('active');
    }
  });
  
  element.addEventListener('mouseleave', function() {
    imagePreview.classList.remove('active');
  });
});

/* =========================
   INTERSECTION OBSERVER
========================= */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

/* =========================
   PARALLAX HERO
========================= */
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      if (hero && scrolled < window.innerHeight) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
          heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.7;
        }
      }
      ticking = false;
    });
    ticking = true;
  }
});

/* =========================
   DECORATIVE CIRCLES
========================= */
document.addEventListener('mousemove', (e) => {
  const circles = document.querySelectorAll('.deco-circle');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  circles.forEach((circle, i) => {
    const speed = (i + 1) * 20;
    circle.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

/* =========================
   SMOOTH SCROLL FOR NAV LINKS
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* =========================
   ACHIEVEMENTS FAST MORPHING EFFECT (FIXED)
========================= */

// Define alternative words/phrases for each achievement
const achievementVariations = {
  0: {
    normal: "FTC Robotics & AI & Robotics Challenge 2025",
    hover: "3rd Runner up and Outstanding Engineering document"
  },
  1: {
    normal: "Imagine Cup Junior experience",
    hover: "Top 20 in VietNam"
  },
  2: {
    normal: "HCGEC participation",
    hover: "Top 20 in ASIAD region"
  },
  3: {
    normal: "SARC 2025 proposal — The Power of Vulnerability",
    hover: "Student Research Conference Presenter"
  },
  4: {
    normal: "Luong Van Chanh's Student",
    hover: "I'm studying in this lovely school"
  }
};

// Split text into word spans
function createWordSpans(text) {
  return text.split(' ').map((word, index) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word;
    span.style.transitionDelay = `${index * 0.02}s`;
    return span;
  });
}

// Morph animation (guarded to prevent overlap)
function morphWords(item, toText) {
  if (item._isMorphing) return;
  item._isMorphing = true;

  const currentWords = item.querySelectorAll('.word');

  // Fade out
  currentWords.forEach(word => {
    word.style.transition = 'all 0.15s cubic-bezier(0.4, 0, 1, 1)';
    word.style.opacity = '0';
    word.style.transform = 'translateY(-8px) scale(0.9)';
  });

  setTimeout(() => {
    const dataNumber = item.getAttribute('data-number');
    item.textContent = '';
    item.setAttribute('data-number', dataNumber);

    const spans = createWordSpans(toText);
    spans.forEach((span, i) => {
      span.style.opacity = '0';
      span.style.transform = 'translateY(8px) scale(0.9)';
      span.style.transition = 'all 0.2s cubic-bezier(0, 0, 0.2, 1)';
      span.style.transitionDelay = `${i * 0.015}s`;

      item.appendChild(span);
      if (i < spans.length - 1) {
        item.appendChild(document.createTextNode(' '));
      }
    });

    requestAnimationFrame(() => {
      item.querySelectorAll('.word').forEach(span => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0) scale(1)';
      });
    });

    setTimeout(() => {
      item._isMorphing = false;
    }, 300);
  }, 150);
}

// Word movement (NO morphing here)
function setupWordMotion(item) {
  const mouseMoveHandler = (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    item.querySelectorAll('.word').forEach(word => {
      const wordRect = word.getBoundingClientRect();
      const cx = wordRect.left + wordRect.width / 2 - rect.left;
      const cy = wordRect.top + wordRect.height / 2 - rect.top;

      const dx = x - cx;
      const dy = y - cy;
      const distance = Math.hypot(dx, dy);
      const maxDistance = 200;

      if (distance < maxDistance && word.style.opacity !== '0') {
        const force = (maxDistance - distance) / maxDistance;
        const angle = Math.atan2(dy, dx);
        word.style.transform = `translate(${-Math.cos(angle) * force * 15}px, ${-Math.sin(angle) * force * 15}px)`;
      }
    });
  };

  const resetTransforms = () => {
    item.querySelectorAll('.word').forEach(word => {
      if (word.style.opacity !== '0') {
        word.style.transform = 'translate(0, 0)';
      }
    });
  };

  item.addEventListener('mousemove', mouseMoveHandler);
  item._resetTransforms = resetTransforms;
}

// Initialize achievements
function initializeAchievements() {
  const items = document.querySelectorAll('.achievement-list li');

  items.forEach((item, index) => {
    item.setAttribute('data-number', `0${index + 1}`);
    item.dataset.normalText = achievementVariations[index]?.normal || item.textContent.trim();
    item.dataset.hoverText = achievementVariations[index]?.hover || item.dataset.normalText;

    item.textContent = '';
    createWordSpans(item.dataset.normalText).forEach((span, i, arr) => {
      item.appendChild(span);
      if (i < arr.length - 1) item.appendChild(document.createTextNode(' '));
    });

    setupWordMotion(item);

    item.addEventListener('mouseenter', () => {
      morphWords(item, item.dataset.hoverText);
    });

    item.addEventListener('mouseleave', () => {
      item._resetTransforms?.();
      morphWords(item, item.dataset.normalText);
    });
  });
}

// Init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAchievements);
} else {
  initializeAchievements();
}
