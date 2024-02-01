"use strict";

// Slider top carousel
let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");

let carouselDom = document.querySelector(".carousel");
let SliderDom = carouselDom.querySelector(".carousel .list");
let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 1500;
let timeAutoNext = 7000;

nextDom.onclick = function () {
  showSlider("next");
};

prevDom.onclick = function () {
  showSlider("prev");
};

let runTimeOut;
let runNextAuto = setTimeout(() => {
  next.click();
}, timeAutoNext);

function showSlider(type) {
  let SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
  let thumbnailItemsDom = document.querySelectorAll(
    ".carousel .thumbnail .item"
  );

  if (type === "next") {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    carouselDom.classList.add("next");
  } else {
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    carouselDom.classList.add("prev");
  }
  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove("next");
    carouselDom.classList.remove("prev");
  }, timeRunning);

  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    next.click();
  }, timeAutoNext);
}

// Sections title animations
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Banner slider
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  let currentIndex = 0;

  function nextSlide() {
    currentIndex = (currentIndex + 1) % 4;
    updateSlider();
  }

  function updateSlider() {
    const translateValue = -currentIndex * 25 + "%";
    slider.style.transform = "translateX(" + translateValue + ")";
  }

  setInterval(nextSlide, 2000); // need bug fix
});

// Toggle nav
const toggleBtn = document.querySelector(".toggle_btn");
const dropDownMenu = document.querySelector(".dropdown_menu");

toggleBtn.onclick = function (event) {
  event.stopPropagation();
  dropDownMenu.classList.toggle("open");
};

window.addEventListener("resize", function () {
  dropDownMenu.classList.remove("open");
});

document.addEventListener("click", function (event) {
  if (
    !dropDownMenu.contains(event.target) &&
    !toggleBtn.contains(event.target)
  ) {
    dropDownMenu.classList.remove("open");
  }
});

// Smooth scrolling NAV
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    const targetSection = document.querySelector(id);

    if (targetSection) {
      const navHeight = document.querySelector(".nav").offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight + 1;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }
});

// Menu fade animation
const navbar = document.querySelector(".navbar");

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

navbar.addEventListener("mouseover", handleHover.bind(0.5));
navbar.addEventListener("mouseout", handleHover.bind(1));

// Sticky nav
const carousel = document.querySelector(".carousel");
const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(carousel);

//Smooth scroll to section one
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    // Calculate the target scroll position, considering the title height
    const titleHeight = document.querySelector(".section__header").offsetHeight;
    const targetPosition = section.offsetTop - titleHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

// Slider function
function Slider1() {
  let carouselSlides = document.querySelectorAll(".slide-wrap");
  let btnBack = document.querySelector(".backward");
  let btnForward = document.querySelector(".forward");
  let dotsContainer = document.querySelector(".dots-container");
  let currentSlide = 0;

  const activeDot = function (slide) {
    document
      .querySelectorAll(".dot")
      .forEach((dot) => dot.classList.remove("active"));
    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add("active");
  };
  activeDot(currentSlide);

  const changeSlide = function (slide) {
    carouselSlides.forEach(
      (slide, index) =>
        (slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`)
    );
  };
  changeSlide(currentSlide);

  btnForward.addEventListener("click", function () {
    currentSlide++;
    if (currentSlide > carouselSlides.length - 1) {
      currentSlide = 0;
    }
    changeSlide(currentSlide);
    activeDot(currentSlide);
  });

  btnBack.addEventListener("click", function () {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = carouselSlides.length - 1;
    }
    changeSlide(currentSlide);
    activeDot(currentSlide);
  });

  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dot")) {
      const slide = e.target.dataset.slide;
      currentSlide = parseInt(slide); // Convert to integer
      changeSlide(currentSlide);
      activeDot(currentSlide);
    }
  });
}

Slider1();

/////side bar phone button//////

document.addEventListener("DOMContentLoaded", function () {
  var phoneItem = document.getElementById("phoneListItem");

  phoneItem.addEventListener("click", function () {
    // Toggle the 'active' class on phoneItem
    phoneItem.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    // Close the popup if clicked outside the phonePopup or phoneItem
    if (!phoneItem.contains(event.target)) {
      phoneItem.classList.remove("active");
    }
  });
});

/* social links */

function redirectToFacebook() {
  window.location.href = "https://www.facebook.com/Lasertechba";
}
function openOLXProfile() {
  window.open("https://olx.ba/profil/LaserTech/aktivni", "_blank");
}
function openMsg() {
  window.open("https://www.facebook.com/messages/t/102163625011627", "_blank");
}
