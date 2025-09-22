const mobileMenuButton = document.querySelector(".mobile-menu-button");
const mobileMenu = document.querySelector(".mobile-navbar");
const menuBackdrop = document.querySelector(".menu-backdrop");
const mobileMenuIcon = document.querySelector(".mobile-menu-button svg");
const xSvgIcon = document.querySelector(".x-svg-icon");
const hamburgerSvgIcon = document.querySelector(".hamburger-svg-icon");

mobileMenuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("mobile-menu-open");
  menuBackdrop.classList.toggle("visible-backdrop");
  mobileMenuIcon.classList.toggle("menu-icon-open");
  xSvgIcon.classList.toggle("hidden");
  hamburgerSvgIcon.classList.toggle("hidden");
  mobileMenuButton.setAttribute("aria-expanded", isOpen);
});

menuBackdrop.addEventListener("click", () => {
  mobileMenu.classList.remove("mobile-menu-open");
  menuBackdrop.classList.remove("visible-backdrop");
  mobileMenuIcon.classList.remove("menu-icon-open");
  xSvgIcon.classList.add("hidden");
  hamburgerSvgIcon.classList.remove("hidden");
});
