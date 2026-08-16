const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");

const nav = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");

const navItems = document.querySelectorAll(".nav-item");

openMenu.addEventListener("click", () => {
  nav.classList.add("active");

  overlay.classList.add("active");

  openMenu.style.display = "none";
});

closeMenu.addEventListener("click", () => {
  nav.classList.remove("active");
  overlay.classList.remove("active");
  openMenu.style.display = "block";
  closeAllDropdowns();
});

overlay.addEventListener("click", () => {
  nav.classList.remove("active");
  overlay.classList.remove("active");
  openMenu.style.display = "block";
  closeAllDropdowns();
});

navItems.forEach((item) => {
  const button = item.querySelector(".nav-link");

  const dropdown = item.querySelector(".dropdown-list");

  if (!dropdown || !button) {
    return;
  }

  button.addEventListener("click", (event) => {
    event.preventDefault();

    event.stopPropagation();

    const isActive = item.classList.contains("active");

    navItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    if (isActive) {
      item.classList.remove("active");
      button.classList.remove("link-open");
    } else {
      item.classList.add("active");
      button.classList.add("link-open");
    }
  });
});

function closeAllDropdowns() {
  navItems.forEach((item) => {
    item.classList.remove("active");

    const button = item.querySelector(".nav-link");

    if (button) {
      button.classList.remove("link-open");
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    nav.classList.remove("active");

    overlay.classList.remove("active");

    openMenu.style.display = "block";

    closeAllDropdowns();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 450) {
    nav.classList.remove("active");

    overlay.classList.remove("active");

    openMenu.style.display = "none";

    closeAllDropdowns();
  } else {
    openMenu.style.display = "block";
  }
});

if (window.innerWidth > 450) {
  openMenu.style.display = "none";
}
