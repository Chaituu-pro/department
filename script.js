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

// Universal scroll reveal (with fade-away on scroll back)
const revealElements = document.querySelectorAll("[data-reveal]");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();

    if (rect.top < triggerBottom && rect.bottom > 50) {
      // Element is visible → show it
      el.classList.add("show");
    } else {
      // Element went out of view → hide it again
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


// Smooth drag scrolling for activities section
// ===== Auto Scroll Activities Carousel (Infinite Loop) =====
const activitiesContainer = document.querySelector(".activities-container");
const activityCards = document.querySelectorAll(".activity-card");

let currentIndex = 0;
const totalCards = activityCards.length;

// Clone first card & append to the end
const firstClone = activityCards[0].cloneNode(true);
activitiesContainer.appendChild(firstClone);

function showNextActivity() {
  currentIndex++;
  activitiesContainer.style.transition = "transform 0.6s ease-in-out";
  activitiesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

  if (currentIndex === totalCards) {
    // Reset to first slide smoothly
    setTimeout(() => {
      activitiesContainer.style.transition = "none";
      activitiesContainer.style.transform = "translateX(0)";
      currentIndex = 0;
    }, 600); // match transition time
  }
}

// Auto slide every 3 seconds
setInterval(showNextActivity, 3000);

let startX = 0;
let isDragging = false;

// Touch start (mobile)
activitiesContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

// Touch end
activitiesContainer.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  handleSwipe(endX - startX);
});

// Mouse drag (desktop)
activitiesContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
});

activitiesContainer.addEventListener("mouseup", (e) => {
  if (isDragging) {
    isDragging = false;
    handleSwipe(e.clientX - startX);
  }
});

function handleSwipe(distance) {
  if (distance > 50) {
    // Swipe right → previous slide
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateSlide();
  } else if (distance < -50) {
    // Swipe left → next slide
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlide();
  }
}
