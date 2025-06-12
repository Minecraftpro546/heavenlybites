const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle("is-active"); // Fixed missing closing quote
  menuLinks.classList.toggle("active"); // Fixed missing closing quote
};

menu.addEventListener("click", mobileMenu);

function updateFirstTierSizes() {
  const tires = document.getElementById("tires").value;
  const size1Select = document.getElementById("size");
  let sizes = [
    { value: "6", label: "6 inches" },
    { value: "8", label: "8 inches" },
    { value: "10", label: "10 inches" },
    { value: "12", label: "12 inches" },
  ];
  let allowedSizes = sizes;
  if (tires === "3") {
    allowedSizes = sizes.filter((s) => s.value === "10" || s.value === "12");
  } else if (tires === "2") {
    allowedSizes = sizes.filter((s) => s.value !== "6");
  }
  const currentValue = size1Select.value;
  size1Select.innerHTML = allowedSizes
    .map((s) => `<option value="${s.value}">${s.label}</option>`)
    .join("");
  // Set default for 3 tiers to 10, otherwise preserve or set to 8
  if (tires === "3") {
    size1Select.value = "10";
  } else if (!allowedSizes.some((s) => s.value === currentValue)) {
    size1Select.value = "8";
  } else {
    size1Select.value = currentValue;
  }
}

function updateSecondTierSizes() {
  const tires = document.getElementById("tires").value;
  const size1 = document.getElementById("size").value;
  const size2Select = document.getElementById("size2");
  let sizes = [
    { value: "6", label: "6 inches" },
    { value: "8", label: "8 inches" },
    { value: "10", label: "10 inches" },
    { value: "12", label: "12 inches" },
  ];
  let allowedSizes;
  if (tires === "3") {
    // Only 8, 10, 12 inch, but must be smaller than first tier
    allowedSizes = sizes.filter(
      (s) =>
        (s.value === "8" || s.value === "10" || s.value === "12") &&
        parseInt(s.value) < parseInt(size1)
    );
  } else {
    // Only allow sizes smaller than the first tier
    allowedSizes = sizes.filter((s) => parseInt(s.value) < parseInt(size1));
  }
  const currentValue = size2Select.value;
  size2Select.innerHTML = allowedSizes
    .map((s) => `<option value="${s.value}">${s.label}</option>`)
    .join("");
  // Set default for 3 tiers to 8, otherwise set to largest allowed
  if (tires === "3") {
    size2Select.value = "8";
  } else if (!allowedSizes.some((s) => s.value === currentValue)) {
    if (allowedSizes.length > 0)
      size2Select.value = allowedSizes[allowedSizes.length - 1].value;
  } else {
    size2Select.value = currentValue;
  }
}

function updateThirdTierSizes() {
  const size2 = document.getElementById("size2").value;
  const size3Select = document.getElementById("size3");
  const sizes = [
    { value: "6", label: "6 inches" },
    { value: "8", label: "8 inches" },
    { value: "10", label: "10 inches" },
    { value: "12", label: "12 inches" },
  ];
  // Only allow sizes smaller than the second tier
  const allowedSizes = sizes.filter((s) => parseInt(s.value) < parseInt(size2));
  const currentValue = size3Select.value;
  size3Select.innerHTML = allowedSizes
    .map((s) => `<option value="${s.value}">${s.label}</option>`)
    .join("");
  // If current value is not allowed, set to largest allowed
  if (!allowedSizes.some((s) => s.value === currentValue)) {
    if (allowedSizes.length > 0)
      size3Select.value = allowedSizes[allowedSizes.length - 1].value;
  } else {
    size3Select.value = currentValue;
  }
}

function handleTiersChange() {
  const tires = document.getElementById("tires").value;
  const secondTier = document.getElementById("second-tier-options");
  const thirdTier = document.getElementById("third-tier-options");
  updateFirstTierSizes();
  if (tires === "2" || tires === "3") {
    secondTier.style.display = "block";
    updateSecondTierSizes();
  } else {
    secondTier.style.display = "none";
  }
  if (tires === "3") {
    thirdTier.style.display = "block";
    updateThirdTierSizes();
  } else {
    thirdTier.style.display = "none";
  }
}

document.getElementById("size").addEventListener("change", function () {
  updateSecondTierSizes();
  if (document.getElementById("tires").value === "3") {
    updateThirdTierSizes();
  }
});
document.getElementById("size2").addEventListener("change", function () {
  if (document.getElementById("tires").value === "3") {
    updateThirdTierSizes();
  }
});

// On page load, set up the first, second, and third tier size options if needed
document.addEventListener("DOMContentLoaded", function () {
  updateFirstTierSizes();
  updateSecondTierSizes();
  if (document.getElementById("tires").value === "3") {
    updateThirdTierSizes();
  }
});

function getFlavorBasePrice(flavor) {
  switch (flavor) {
    case "walnut-chocolate":
    case "gulabjamun":
    case "rasmalai":
    case "mango":
    case "pistachio":
      return 50;
    default:
      return 40;
  }
}

function getSizePrice(size) {
  switch (size) {
    case "6":
      return 0;
    case "8":
      return 20;
    case "10":
      return 40;
    case "12":
      return 60;
    default:
      return 0;
  }
}

function calculateEstimate() {
  const tires = document.getElementById("tires").value;
  const decorations = document.getElementById("decorations").checked;

  let totalPrice = 0;

  if (tires === "3") {
    const size1 = document.getElementById("size").value;
    const flavor1 = document.getElementById("flavor").value;
    const size2 = document.getElementById("size2").value;
    const flavor2 = document.getElementById("flavor2").value;
    const size3 = document.getElementById("size3").value;
    const flavor3 = document.getElementById("flavor3").value;

    totalPrice += getFlavorBasePrice(flavor1) + getSizePrice(size1);
    totalPrice += getFlavorBasePrice(flavor2) + getSizePrice(size2);
    totalPrice += getFlavorBasePrice(flavor3) + getSizePrice(size3);
    totalPrice += 40; // extra for 3 tiers
  } else if (tires === "2") {
    const size1 = document.getElementById("size").value;
    const flavor1 = document.getElementById("flavor").value;
    const size2 = document.getElementById("size2").value;
    const flavor2 = document.getElementById("flavor2").value;

    totalPrice += getFlavorBasePrice(flavor1) + getSizePrice(size1);
    totalPrice += getFlavorBasePrice(flavor2) + getSizePrice(size2);
    totalPrice += 20; // extra for 2 tiers
  } else {
    const size = document.getElementById("size").value;
    const flavor = document.getElementById("flavor").value;
    totalPrice += getFlavorBasePrice(flavor) + getSizePrice(size);
  }

  if (decorations) {
    totalPrice += 10;
  }

  document.getElementById(
    "estimate"
  ).innerText = `Estimated Price: $${totalPrice}`;
}
