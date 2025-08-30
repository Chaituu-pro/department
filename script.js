// Hamburger toggle
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

// Universal scroll reveal
const revealElements = document.querySelectorAll("[data-reveal]");
function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add("show");
    else el.classList.remove("show"); // fade away on scroll back
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Smooth scrolling for navbar links
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - document.querySelector("header").offsetHeight,
        behavior: "smooth",
      });
    }
    navLinks.classList.remove("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".activities-container");
    const cards = document.querySelectorAll(".activity-card");
    const totalCards = cards.length;
    let index = 0;

    function showNextCard() {
      index++;
      if (index >= totalCards) {
        index = 0; // loop back to first card
      }
      container.style.transform = `translateX(-${index * 100}%)`;
    }

    // Auto slide every 3 seconds
    setInterval(showNextCard, 3000);
  });
