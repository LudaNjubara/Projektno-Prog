/* Scroll na pocetak - vidljivost */

var target = document.querySelector("#hero");
var scrollToTopBtn = document.querySelector(".scrollToTopBx");
var rootElement = document.documentElement;

function callback(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      scrollToTopBtn.classList.add("showBtn");
    } else {
      scrollToTopBtn.classList.remove("showBtn");
    }
  });
}

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
scrollToTopBtn.addEventListener("click", scrollToTop);

let observer = new IntersectionObserver(callback);
observer.observe(target);

/* Prikaz navigacije na manjim ekranima */
let menuToggler = document.querySelector(".menuToggle");
let nav = document.querySelector(".nav-list");
let navLink = document.querySelectorAll(".nav-list .nav-link");

menuToggler.addEventListener("click", function (event) {
  menuToggler.classList.toggle("clicked");
  nav.classList.toggle("opened");
});

navLink.forEach((link) => {
  link.addEventListener("click", function (event) {
    if (nav.classList.contains("opened")) {
      nav.classList.remove("opened");
      menuToggler.classList.remove("clicked");
    }
  });
});

/* Animacije */
function init() {
  /* Animiranje SVG */
  let svg = document.querySelector("#dobrodosli");
  svg.style.visibility = "visible";

  anime({
    targets: "#dobrodosli path",
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutSine",
    duration: 1000,
    delay: function (el, i) {
      return i * 15;
    },
    direction: "alternate",
    loop: false,
  });

  /* Inicijalizacija GSAP Timeline-a */
  gsap.registerPlugin(ScrollTrigger);
  let tl = gsap.timeline();

  /* Animacija navigacije */
  tl.from(".nav-link", {
    opacity: 0,
    y: "-80%",
    duration: 0.3,
    stagger: 0.12,
    ease: "Power4.out",
    autoAlpha: 0,
  });

  tl.from(".logo", {
    opacity: 0,
    duration: 0.9,
    ease: "Power4.out",
    autoAlpha: 0,
  });

  /* Animacija opisa članova */
  gsap.set(".anim-down", { y: "-30%", opacity: 0 });

  ScrollTrigger.batch(".anim-down", {
    start: "top bottom",
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: "Power4.out",
        overwrite: true,
      }),
    onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
  });

  gsap.set(".anim-down-link", { y: "-30%", opacity: 0 });

  ScrollTrigger.batch(".anim-down-link", {
    start: "top bottom",
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "Power4.out",
        overwrite: true,
      }),
    onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
  });

  /* Animacija članova u footer-u */
  gsap.from(".footer-member", {
    scrollTrigger: {
      trigger: "footer",
      start: "top bottom",
    },
    y: "-30%",
    opacity: 0,
    stagger: 0.35,
    duration: 1,
    ease: "Power4.out",
  });
}

/* Pokretanje animacija nakon učitavanja DOM-a */
window.addEventListener("load", function (event) {
  init();
});
