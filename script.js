// =======================
// NAVBAR + HAMBURGER
// =======================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("active"));
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// =======================
// SCROLL REVEAL (fade in/out)
// =======================
const revealElements = document.querySelectorAll("[data-reveal]");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom && rect.bottom > 50) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Smooth scrolling for navbar links
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - document.querySelector("header").offsetHeight,
        behavior: "smooth"
      });
    }
    navLinks.classList.remove("active");
  });
});

// =======================
// ACTIVITIES CAROUSEL
// =======================
const activitiesContainer = document.querySelector(".activities-container");
const cards = document.querySelectorAll(".activity-card");
const dotsWrapper = document.querySelector(".dots");

let currentIndex = 0;
let autoScrollInterval;
let startX = 0;
let isDragging = false;

// Create dots dynamically
cards.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    currentIndex = i;
    updateSlide();
    resetAutoScroll();
  });
  dotsWrapper.appendChild(dot);
});
const dots = document.querySelectorAll(".dot");

// Update slide position + dots
function updateSlide() {
  cards.forEach((card, index) => {
    card.style.transform = `translateX(${100 * (index - currentIndex)}%)`;
  });
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

// Auto scroll
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlide();
  }, 3000);
}
function resetAutoScroll() {
  clearInterval(autoScrollInterval);
  startAutoScroll();
}

// Swipe / Drag
function handleSwipe(distance) {
  if (distance > 50) {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  } else if (distance < -50) {
    currentIndex = (currentIndex + 1) % cards.length;
  }
  updateSlide();
}

// Touch
activitiesContainer.addEventListener("touchstart", (e) => {
  clearInterval(autoScrollInterval);
  startX = e.touches[0].clientX;
});
activitiesContainer.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  handleSwipe(endX - startX);
  resetAutoScroll();
});

// Mouse drag
activitiesContainer.addEventListener("mousedown", (e) => {
  clearInterval(autoScrollInterval);
  isDragging = true;
  startX = e.clientX;
});
activitiesContainer.addEventListener("mouseup", (e) => {
  if (isDragging) {
    isDragging = false;
    handleSwipe(e.clientX - startX);
    resetAutoScroll();
  }
});

// Init
updateSlide();
startAutoScroll();
