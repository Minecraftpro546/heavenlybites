const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle("is-active"); // Fixed missing closing quote
  menuLinks.classList.toggle("active"); // Fixed missing closing quote
};

menu.addEventListener("click", mobileMenu);
