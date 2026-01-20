/* ===============================
   HERO PARALLAX BACKGROUND
================================ */

const layers = document.querySelectorAll(".layer");

/* Respect accessibility settings */
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

let targetX = 50;
let targetY = 50;
let currentX = 50;
let currentY = 50;

let active = false;
let timeout = null;
let rafId = null;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function animate() {
  if (!active) {
    rafId = null;
    return;
  }

  currentX = lerp(currentX, targetX, 0.04);
  currentY = lerp(currentY, targetY, 0.04);

  layers.forEach((layer, i) => {
    const depth = (i + 1) * 0.18;

    layer.style.setProperty("--gx", `${currentX}%`);
    layer.style.setProperty("--gy", `${currentY}%`);

    layer.style.transform = `
      translate(
        ${(currentX - 50) * depth}px,
        ${(currentY - 50) * depth}px
      )
    `;
  });

  rafId = requestAnimationFrame(animate);
}

if (!prefersReducedMotion) {
  window.addEventListener("mousemove", (e) => {
    targetX = (e.clientX / window.innerWidth) * 100;
    targetY = (e.clientY / window.innerHeight) * 100;
    active = true;

    if (!rafId) animate();

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      active = false;
    }, 150);
  });
}

/* ===============================
   FAQ ACCORDION
================================ */

document.querySelectorAll(".faq-question").forEach((q) => {
  q.addEventListener("click", () => {
    const item = q.parentElement;
    const answer = q.nextElementSibling;

    document.querySelectorAll(".faq-item").forEach((i) => {
      if (i !== item) {
        i.classList.remove("active");
        i.querySelector(".faq-answer").style.maxHeight = null;
      }
    });

    const isOpen = item.classList.contains("active");

    item.classList.toggle("active");

    answer.style.maxHeight = isOpen
      ? null
      : answer.scrollHeight + "px";
  });
});


/* ===============================
   NAVBAR SCROLL EFFECT
================================ */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const scroll = Math.min(window.scrollY, 120);
  const t = scroll / 120;
  const eased = t * t;

  navbar.style.setProperty("--bg-opacity", (0.15 * eased).toFixed(3));
  navbar.style.setProperty("--blur-amount", `${24 * eased}px`);
  navbar.style.setProperty("--shadow-opacity", (0.25 * eased).toFixed(3));
});
/* ===============================
   SCROLL REVEAL OBSERVER
================================ */

const revealElements = document.querySelectorAll(
    "section, footer"
  );
  
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px",
    }
  );
  
  revealElements.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
  /* ===============================
   FEATURE TAGS TOGGLE
================================ */

const featureTags = document.querySelectorAll(".feature-tags li");

featureTags.forEach(tag => {
  tag.addEventListener("click", () => {
    featureTags.forEach(t => t.classList.remove("active"));
    tag.classList.add("active");
  });
});
const splineIframe = document.querySelector(".spline-bg iframe");

let scrollTimeout;

window.addEventListener("scroll", () => {
  splineIframe.style.pointerEvents = "none";

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    splineIframe.style.pointerEvents = "auto";
  }, 150);
});
/* ===============================
   FEATURE TAG IMAGE SWITCH
================================ */

const tagMap = {
  Technology: "./Assets/tech.jpg",
  Security: "./Assets/security.jpg",
  Innovation: "./Assets/innovation.jpg",
};

const tags = document.querySelectorAll(".feature-tags li");
const featureVideo = document.getElementById("featureVideo");
const featureImage = document.getElementById("featureImage");

tags.forEach(tag => {
  tag.addEventListener("click", () => {
    // Active state
    tags.forEach(t => t.classList.remove("active"));
    tag.classList.add("active");

    const label = tag.textContent.trim();

    // ALWAYS show image (no video at all)
    if (featureVideo) {
      featureVideo.pause();
      featureVideo.style.display = "none";
    }

    featureImage.src = tagMap[label];
    featureImage.style.display = "block";
  });
});

/* Default load = Technology image */
featureImage.src = tagMap["Technology"];
featureImage.style.display = "block";
if (featureVideo) {
  featureVideo.style.display = "none";
}
/* ===============================
   INDUSTRIES TOGGLE (FEATURE)
================================ */

const industryData = {
  technology: {
    image: "assets/tech.jpg",
    title: "Technology Infrastructure",
    desc: "High-performance cloud platforms built for modern applications, scalability, and speed.",
    stats: ["2.5× Faster", "Cloud Native"]
  },
  security: {
    image: "assets/security.jpg",
    title: "Cloud Security",
    desc: "End-to-end encrypted systems designed for compliance, resilience, and data protection.",
    stats: ["Zero Trust", "99.99% Secure"]
  },
  innovation: {
    image: "assets/innovation.jpg",
    title: "Innovation & AI",
    desc: "AI-powered cloud solutions enabling automation, predictive analytics, and intelligent growth.",
    stats: ["AI Driven", "Future Ready"]
  }
};

const tag = document.querySelectorAll(".feature-tags li");
const image = document.getElementById("industryImage");
const title = document.getElementById("industryTitle");
const desc = document.getElementById("industryDesc");
const stats = document.getElementById("industryStats");

tags.forEach(tag => {
  tag.addEventListener("click", () => {
    tags.forEach(t => t.classList.remove("active"));
    tag.classList.add("active");

    const key = tag.dataset.industry;
    const data = industryData[key];

    image.src = data.image;
    title.textContent = data.title;
    desc.textContent = data.desc;

    stats.innerHTML = data.stats.map(s => `<span>${s}</span>`).join("");
  });
});
/* ===============================
   FIXED EDGE GLOWS (LEFT + RIGHT)
================================ */

const glowContainer = document.querySelector(".edge-glows");

const glows = [
  { side: "left", top: "25%" },
  { side: "right", top: "55%" }
];

glows.forEach(({ side, top }) => {
  const glow = document.createElement("div");
  glow.className = `edge-glow edge-glow--${side}`;

  glow.style.top = top;

  glowContainer.appendChild(glow);
});
