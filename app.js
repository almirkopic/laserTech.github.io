// Slider
let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");

let carouselDom = document.querySelector(".carousel");
let SliderDom = carouselDom.querySelector(".carousel .list");
let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
let timeDom = document.querySelector(".carousel .time");

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

toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle("open");
};

// Event listener for window resize
window.addEventListener("resize", function () {
  // Remove the "open" class when the window is resized
  dropDownMenu.classList.remove("open");
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
const header = document.querySelector(".carousel");
const navElement = document.querySelector(".nav");
const navHeight = navElement.getBoundingClientRect().height;

// Store scroll position before page refresh
window.addEventListener("beforeunload", function () {
  sessionStorage.setItem("scrollPosition", window.scrollY);
});

// Restore scroll position after page refresh
document.addEventListener("DOMContentLoaded", function () {
  const storedScrollPosition = sessionStorage.getItem("scrollPosition");

  if (storedScrollPosition) {
    window.scrollTo(0, parseInt(storedScrollPosition));
  }
});

let prevScrollPos = parseInt(sessionStorage.getItem("scrollPosition")) || 0;
let isNavHidden = false;

const stickyNav = function (entries) {
  const [entry] = entries;
  const currentScrollPos = window.pageYOffset;

  if (prevScrollPos < currentScrollPos) {
    // Scrolling down
    if (currentScrollPos > window.innerHeight && !isNavHidden) {
      navElement.style.transform = "translateY(-100%)";
      isNavHidden = true;
    }
  } else {
    // Scrolling up
    navElement.style.transform = "none";
    isNavHidden = false;
  }

  if (currentScrollPos > (100 * window.innerHeight) / 100) {
    navElement.style.transform = "translateY(-100%)";
    isNavHidden = true;
  }

  prevScrollPos = currentScrollPos;

  if (!entry.isIntersecting) {
    navElement.classList.add("sticky");
  } else {
    navElement.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/////////refresh

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

//smooth scrol lto section one

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
