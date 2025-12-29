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
    const answer = q.nextElementSibling;

    document.querySelectorAll(".faq-answer").forEach((a) => {
      if (a !== answer) a.style.maxHeight = null;
    });

    answer.style.maxHeight =
      answer.style.maxHeight ? null : answer.scrollHeight + "px";
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
  