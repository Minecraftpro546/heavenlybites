const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle("is-active"); // Fixed missing closing quote
  menuLinks.classList.toggle("active"); // Fixed missing closing quote
};

menu.addEventListener("click", mobileMenu);

function calculateEstimate() {
  const size = document.getElementById("size").value;
  const tires = document.getElementById("tires").value;
  const flavor = document.getElementById("flavor").value;
  const decorations = document.getElementById("decorations").checked;

  let basePrice = 0;

  switch (size) {
    case "6":
      basePrice = 20;
      break;
    case "8":
      basePrice = 30;
      break;
    case "10":
      basePrice = 40;
      break;
    case "12":
      basePrice = 50;
      break;
  }

  switch (tires) {
    case "1":
      basePrice += 50;
      break;
    case "2":
      basePrice += 100;
      break;
  }

  if (decorations) {
    basePrice += 10;
  }

  document.getElementById(
    "estimate"
  ).innerText = `Estimated Price: $${basePrice}`;
}
