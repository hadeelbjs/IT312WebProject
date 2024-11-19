document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-offers');
    const hiddenOffers = document.querySelectorAll('.offer-item.hidden');

    if (toggleButton && hiddenOffers.length > 0) {
        toggleButton.addEventListener('click', () => {
            hiddenOffers.forEach(offer => offer.classList.toggle('hidden'));

            if (hiddenOffers[0].classList.contains('hidden')) {
                toggleButton.textContent = 'More Offers';
            } else {
                toggleButton.textContent = 'Less Offers';
            }
        });
    }

    const reviews = document.querySelectorAll(".review");

    reviews.forEach((review) => {
        const { product, rate } = review.dataset;

        const productSpan = document.createElement("span");
        productSpan.textContent = product;
        productSpan.style.display = "block";
        productSpan.style.fontSize = "1.5vw";
        productSpan.style.fontWeight = "bold";

        const rateSpan = document.createElement("span");
        rateSpan.textContent = rate;
        rateSpan.style.display = "block";
        rateSpan.style.fontSize = "1.5vw";
        rateSpan.style.color = "gold"; 

        review.appendChild(productSpan);
        review.appendChild(rateSpan);
    });

    const hoverInfo = document.getElementById("hover-info");
    if (reviews.length > 0 && hoverInfo) {
        reviews.forEach((review) => {
            review.addEventListener("mouseover", (event) => {
                const { customer, product, rate, feedback } = review.dataset;

                document.getElementById("customer-name").textContent = customer;
                document.getElementById("product-name").textContent = product;
                document.getElementById("product-rate").textContent = rate;
                document.getElementById("product-feedback").textContent = feedback;

                hoverInfo.style.display = "block";
                hoverInfo.style.top = `${event.pageY + 10}px`;
                hoverInfo.style.left = `${event.pageX + 10}px`;
            });

            review.addEventListener("mousemove", (event) => {
                hoverInfo.style.top = `${event.pageY + 10}px`;
                hoverInfo.style.left = `${event.pageX + 10}px`;
            });

            review.addEventListener("mouseout", () => {
                hoverInfo.style.display = "none";
            });
        });
    }
});

function toggleTheme() {
    const isDark = document.body.classList.toggle('theme-dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
