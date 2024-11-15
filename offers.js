// Array to store offers
let offers = [];

// Function to display offers on the page
function displayOffers() {
    const offerSection = document.querySelector("section > .delete-container").previousElementSibling;
    offerSection.innerHTML = ""; // Clear current offers display

    offers.forEach((offer, index) => {
        const offerBox = document.createElement("div");
        offerBox.classList.add("offer-box");

        const offerImage = document.createElement("img");
        offerImage.src = offer.image;
        offerImage.alt = "Offer Image";

        const offerInfo = document.createElement("div");
        offerInfo.classList.add("offer-info");
        offerInfo.innerHTML = `<h2>Offer name: ${offer.name}</h2><p>Discount: ${offer.discount}%</p>`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("delete-checkbox");
        checkbox.dataset.index = index; // Associate checkbox with offer index

        offerBox.appendChild(offerImage);
        offerBox.appendChild(offerInfo);
        offerBox.appendChild(checkbox);

        offerSection.appendChild(offerBox);
    });
}

// Function to add an offer
function addOffer(event) {
    event.preventDefault(); // Prevent form submission

    const offerName = document.getElementById("name").value.trim();
    const discount = document.getElementById("discount").value.trim();
    const imageFile = document.getElementById("offerImage").files[0];

    // Validate input fields
    if (!offerName || !discount || !imageFile) {
        alert("Please fill out all inputs.");
        return;
    }
    if ( !/^[a-zA-Z\s]+$/.test(offerName)) {
        alert("Please enter a valid offer name (letters only).");
        return;
    }
    if (isNaN(discount) || discount <1 || discount > 100) {
        alert("Please enter a valid discount percentage (1-100).");
        return;
    }

    const newOffer = {
        id: Date.now(), // date as an id
        name: offerName,
        discount: parseFloat(discount),
        image: URL.createObjectURL(imageFile)
    };

    offers.push(newOffer); // Add offer to array
    displayOffers(); // Refresh display

    // Clear form fields
    document.getElementById("offer-form").reset();
}

// Function to delete selected offers
function deleteSelectedOffers() {
    const selectedCheckboxes = document.querySelectorAll(".delete-checkbox:checked");

    if (selectedCheckboxes.length === 0) {
        alert("Please select at least one offer to delete.");
        return;
    }

    if (confirm("Are you sure you want to delete the selected offers?")) {
        // Filter out selected offers based on index
        const indexesToDelete = Array.from(selectedCheckboxes).map((checkbox) => parseInt(checkbox.dataset.index));
        offers = offers.filter((_, index) => !indexesToDelete.includes(index));

        displayOffers(); // Refresh display
    }
}

// Event listeners for form submission and delete button
document.getElementById("add").addEventListener("click", addOffer);
document.getElementById("delete").addEventListener("click", deleteSelectedOffers);

// Initial display of offers (if any are preloaded)
displayOffers();
