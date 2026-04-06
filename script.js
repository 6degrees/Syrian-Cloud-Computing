/* ===============================
   ACCESSIBILITY: REDUCED MOTION
================================ */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

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
        i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      }
    });

    const isOpen = item.classList.contains("active");

    item.classList.toggle("active");
    q.setAttribute("aria-expanded", !isOpen);

    answer.style.maxHeight = isOpen
      ? null
      : answer.scrollHeight + "px";
  });
});


/* ===============================
   NAVBAR SCROLL EFFECT + SPLINE GUARD
   (single scroll listener with rAF)
================================ */

const navbar = document.querySelector(".navbar");
const splineIframe = document.querySelector(".spline-bg iframe");
let scrollTimeout;
let scrollTicking = false;

function onScroll() {
  /* Navbar blur/opacity */
  const scroll = Math.min(window.scrollY, 120);
  const t = scroll / 120;
  const eased = t * t;

  navbar.style.setProperty("--bg-opacity", (0.15 * eased).toFixed(3));
  navbar.style.setProperty("--blur-amount", `${24 * eased}px`);
  navbar.style.setProperty("--shadow-opacity", (0.25 * eased).toFixed(3));

  scrollTicking = false;
}

window.addEventListener("scroll", () => {
  /* Spline iframe: disable pointer-events during scroll */
  if (splineIframe) {
    splineIframe.style.pointerEvents = "none";
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      splineIframe.style.pointerEvents = "auto";
    }, 200);
  }

  /* Throttle navbar updates to one per frame */
  if (!scrollTicking) {
    requestAnimationFrame(onScroll);
    scrollTicking = true;
  }
}, { passive: true });

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
   FEATURE TAG IMAGE SWITCH
================================ */

const tagMap = {
  Technology: "./Assets/tech.jpg",
  Security: "./Assets/security.jpg",
  Innovation: "./Assets/innovation.jpg",
};

const featureTags = document.querySelectorAll(".feature-tags li");
const featureVideo = document.getElementById("featureVideo");
const featureImage = document.getElementById("featureImage");

featureTags.forEach(tag => {
  tag.addEventListener("click", () => {
    featureTags.forEach(t => t.classList.remove("active"));
    tag.classList.add("active");

    const label = tag.textContent.trim();

    if (featureVideo) {
      featureVideo.pause();
      featureVideo.style.display = "none";
    }

    if (featureImage && tagMap[label]) {
      featureImage.src = tagMap[label];
      featureImage.style.display = "block";
    }
  });
});

/* Default load = Technology image */
if (featureImage) {
  featureImage.src = tagMap["Technology"];
  featureImage.style.display = "block";
}
if (featureVideo) {
  featureVideo.style.display = "none";
}
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
