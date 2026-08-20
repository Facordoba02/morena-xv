const CONFIG = {
  address: "Calle 137 N 2524, Berazategui, Buenos Aires, Argentina"
};

const body = document.body;
const intro = document.getElementById("intro");
const envelopeButton = document.getElementById("envelopeButton");
const startButton = document.getElementById("start");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let introOpened = false;

function finishIntro() {
  body.classList.remove("locked");
  body.classList.add("ready");
}

function openEnvelope() {
  if (introOpened) return;
  introOpened = true;
  intro.classList.add("opened");
  window.playMusic?.();

  if (reducedMotion) {
    finishIntro();
  } else {
    window.setTimeout(finishIntro, 1750);
  }

  envelopeButton.setAttribute("aria-disabled", "true");
}

document.addEventListener("DOMContentLoaded", () => {
  if (reducedMotion) {
    // Mantener la interacción aunque sin animaciones largas
  }
});

envelopeButton.addEventListener("click", openEnvelope);
envelopeButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openEnvelope();
  }
});

startButton.addEventListener("click", () => {
  document.getElementById("fecha").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("maps").href =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(CONFIG.address);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, {
  rootMargin:"0px 0px -10% 0px",
  threshold:.18
});

document.querySelectorAll("main .section").forEach((section) => observer.observe(section));

function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);
