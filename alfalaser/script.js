//wrapper slider
const imgs = document.querySelectorAll(".img-select a");
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
  imgItem.addEventListener("click", (event) => {
    event.preventDefault();
    imgId = imgItem.dataset.id;
    slideImage();
  });
});

function slideImage() {
  const displayWidth = document.querySelector(
    ".img-showcase img:first-child"
  ).clientWidth;

  document.querySelector(".img-showcase").style.transform = `translateX(${
    -(imgId - 1) * displayWidth
  }px)`;
}

window.addEventListener("resize", slideImage);

//wrapper slider end

// TOGGLE NAV
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

//scorial
function openOLXProfile() {
  window.open("https://olx.ba/profil/LaserTech/aktivni", "_blank");
}
