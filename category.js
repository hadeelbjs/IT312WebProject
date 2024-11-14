// Initialize cart object and load any saved data from localStorage
var cart = JSON.parse(localStorage.getItem("cart")) || {};

// Load cart state from localStorage and restore checked items and quantities
window.onload = function() {
  const productContainer = document.querySelector(".product-container");
  if (productContainer) {
    const items = Array.from(productContainer.children);
    for (let i = 0; i < items.length; i++) {
      items[i].setAttribute("data-index", i);
    }
    for (const productId in cart) {
      const quantityControl = document.getElementById("quantity-control-" + productId);
      const quantityElement = document.getElementById("quantity-" + productId);
      const addButton = document.getElementById("add-" + productId);
      if (quantityControl && quantityElement) {
        addButton.classList.add("hidden");
        quantityControl.classList.remove("hidden");
        quantityElement.innerText = cart[productId].quantity;
      }
    }
  }
};

// Save cart state to localStorage whenever items are modified
function toggleCartItem(productId) {
  const addButton = document.getElementById("add-" + productId);
  const quantityControl = document.getElementById("quantity-control-" + productId);
  const quantityElement = document.getElementById("quantity-" + productId);
  const productName = document.getElementById("name-" + productId).innerText;
  const productPrice = parseFloat(document.getElementById("price-" + productId).innerText.replace("SAR ", "").replace(",", ""));
  const imgPath = document.getElementById("img-" +productId).src;

  if (quantityControl && quantityElement) {
    quantityControl.classList.remove("hidden");
    addButton.classList.add("hidden");
    cart[productId] = { name: productName, price: productPrice, quantity: parseInt(quantityElement.innerText), imagePath: imgPath  }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function increaseQuantity(productId) {
  const quantityElement = document.getElementById("quantity-" + productId);
  quantityElement.innerText = parseInt(quantityElement.innerText) + 1;
  if (cart[productId]) {
    cart[productId].quantity = parseInt(quantityElement.innerText);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function decreaseQuantity(productId) {
  const addButton = document.getElementById("add-" + productId);
  const quantityElement = document.getElementById("quantity-" + productId);
  const currentQuantity = parseInt(quantityElement.innerText);
  const quantityControl = document.getElementById("quantity-control-" + productId);

  if (currentQuantity > 1) {
    quantityElement.innerText = currentQuantity - 1;
    if (cart[productId]) {
      cart[productId].quantity = currentQuantity - 1;
    }
  }
  else if (currentQuantity==1){
    quantityControl.classList.add("hidden");
    addButton.classList.remove("hidden");
    delete cart[productId];
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function sortProducts() {
  const sortOption = document.getElementById("sort-options").value;
  const productContainer = document.querySelector(".product-container");
  const items = Array.from(productContainer.children);
  items.sort((a, b) => {
    if (sortOption === "recommended") {
      return parseInt(a.getAttribute("data-index")) - parseInt(b.getAttribute("data-index"));
    }
    const nameA = a.querySelector(".top-left").innerText.toUpperCase();
    const nameB = b.querySelector(".top-left").innerText.toUpperCase();
    const priceA = parseFloat(a.querySelector(".bottom-left").innerText.replace("SAR ", "").replace(",", ""));
    const priceB = parseFloat(b.querySelector(".bottom-left").innerText.replace("SAR ", "").replace(",", ""));
    if (sortOption === "A-Z") return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    if (sortOption === "Z-A") return nameB < nameA ? -1 : nameB > nameA ? 1 : 0;
    if (sortOption === "low-high") return priceA - priceB;
    if (sortOption === "high-low") return priceB - priceA;
  });
  items.forEach(item => productContainer.appendChild(item));
}

function saveCartAndRedirect() {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "cart.html";
}
