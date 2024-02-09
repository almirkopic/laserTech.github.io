"use strict";
// Slider top carousel
// Slider
const slider = function () {
  const slides = document.querySelectorAll(".home-slide");
  const btnLeft = document.querySelector(".prev");
  const btnRight = document.querySelector(".next");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;
  let autoSlideInterval;
  let autoplayEnabled = true;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const startAutoSlide = function () {
    autoSlideInterval = setInterval(nextSlide, 3000);
  };

  const stopAutoSlide = function () {
    clearInterval(autoSlideInterval);
  };

  const toggleAutoplay = function () {
    autoplayEnabled = !autoplayEnabled;
    if (autoplayEnabled) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
  };

  // Event handlers
  btnRight.addEventListener("click", function () {
    nextSlide();
    toggleAutoplay();
  });

  btnLeft.addEventListener("click", function () {
    prevSlide();
    toggleAutoplay();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevSlide();
      toggleAutoplay();
    }
    if (e.key === "ArrowRight") {
      nextSlide();
      toggleAutoplay();
    }
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
      toggleAutoplay();
    }
  });

  // Initialize slider
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
    startAutoSlide();
  };
  init();
};

slider();

//carousel home slider end

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

//babber slider end
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

//toggle naav end

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
//end smooth scrl

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
//end fade

// Sticky nav
const carousel = document.querySelector(".home-slider");
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

//end sticky NAV

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
//end smooth scrolling

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

//end slider

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
//end side-bar

// Close modal

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-content");
  const closeBtn = document.getElementById("close-btn");

  // ...open the modal
  function openModal() {
    modal.style.display = "flex";
  }

  // ...close the modal
  function closeModal() {
    modal.style.display = "none";
  }

  // click to open
  document
    .getElementById("footer_modal")
    .addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });

  // X btn
  closeBtn.addEventListener("click", function () {
    closeModal();
  });

  // esc e close
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // anywhere to close
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });
});
//end modal
