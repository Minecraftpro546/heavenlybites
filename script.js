const flavors = [
    "Biscoff", "Chocolate", "Red Velvet", "Vanilla", "Nutella", "Blueberry",
    "Raspberry", "Strawberry", "Pineapple", "Butterscotch", "Cookies and Cream",
    "Caramel", "Coffee Cake", "Choco-Coconut", "Deluce De Leche", "Stawberry Nutella",
    "Walnut Chocolate", "Gulabjamun", "Rasmalai", "Mango", "Pistachio"
];

const sizes = [6, 8, 10, 12];

document.addEventListener("DOMContentLoaded", () => {
    const tiersSelect = document.getElementById("tiers");
    const size1 = document.getElementById("size1");
    const flavor1 = document.getElementById("flavor1");
    const tier2Block = document.getElementById("tier2Block");
    const tier3Block = document.getElementById("tier3Block");
    const size2 = document.getElementById("size2");
    const flavor2 = document.getElementById("flavor2");
    const size3 = document.getElementById("size3");
    const flavor3 = document.getElementById("flavor3");

    populateFlavorOptions(flavor1);

    tiersSelect.addEventListener("change", () => {
        const selectedTiers = parseInt(tiersSelect.value);
        tier2Block.style.display = selectedTiers >= 2 ? "block" : "none";
        tier3Block.style.display = selectedTiers === 3 ? "block" : "none";

        if (selectedTiers >= 2) {
            populateFlavorOptions(flavor2);
            updateSizeOptions(size1, size2);
        }
        if (selectedTiers === 3) {
            populateFlavorOptions(flavor3);
            updateSizeOptions(size2, size3);
        }
    });

    size1.addEventListener("change", () => {
        if (tiersSelect.value >= 2) {
            updateSizeOptions(size1, size2);
        }
    });

    size2.addEventListener("change", () => {
        if (tiersSelect.value == 3) {
            updateSizeOptions(size2, size3);
        }
    });
});

function populateFlavorOptions(selectEl) {
    selectEl.innerHTML = '<option value="">--Select Flavor--</option>';
    flavors.forEach((flavor) => {
        const option = document.createElement("option");
        option.value = flavor.toLowerCase().replace(/\s+/g, "-");
        option.textContent = flavor;
        selectEl.appendChild(option);
    });
}

function updateSizeOptions(prevSelect, currentSelect) {
    const prevSize = parseInt(prevSelect.value);
    currentSelect.innerHTML = '<option value="">--Select Size--</option>';
    sizes
        .filter((size) => size < prevSize)
        .forEach((size) => {
            const option = document.createElement("option");
            option.value = size.toString();
            option.textContent = `${size} inches`;
            currentSelect.appendChild(option);
        });
}

// Pricing logic
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

function calculatePrice() {
    const tiers = document.getElementById("tiers").value;
    const fondant = document.getElementById("fondant").checked;

    let totalPrice = 0;

    const size1 = document.getElementById("size1").value;
    const flavor1 = document.getElementById("flavor1").value;
    if (!size1 || !flavor1) {
        alert("Please select a size and flavor for Tier 1.");
        return;
    }

    totalPrice += getFlavorBasePrice(flavor1) + getSizePrice(size1);

    if (tiers === "2" || tiers === "3") {
        const size2 = document.getElementById("size2").value;
        const flavor2 = document.getElementById("flavor2").value;
        if (!size2 || !flavor2) {
            alert("Please select a size and flavor for Tier 2.");
            return;
        }
        totalPrice += getFlavorBasePrice(flavor2) + getSizePrice(size2);
        totalPrice += 20;
    }

    if (tiers === "3") {
        const size3 = document.getElementById("size3").value;
        const flavor3 = document.getElementById("flavor3").value;
        if (!size3 || !flavor3) {
            alert("Please select a size and flavor for Tier 3.");
            return;
        }
        totalPrice += getFlavorBasePrice(flavor3) + getSizePrice(size3);
        totalPrice += 20;
    }

    if (fondant) {
        totalPrice += 10;
    }

    document.getElementById("priceResult").textContent = `Estimated Price: $${totalPrice}`;
}
