function getCurrentWeekStartDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const sundayOffset = dayOfWeek;
    const sundayDate = new Date(today);
    sundayDate.setDate(today.getDate() - sundayOffset);

    const options = { day: 'numeric', month: 'long' };
    return sundayDate.toLocaleDateString('en-US', options);
}

document.addEventListener('DOMContentLoaded', () => {
    const weekStartElement = document.getElementById('current-week-date');
    if (weekStartElement) {
        weekStartElement.textContent = `Week starts on: ${getCurrentWeekStartDate()}`;
    }

    // Apply saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('theme-dark');
    }

    // Theme toggle functionality
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }

    // Toggle hidden offers
    const toggleButton = document.getElementById('toggle-offers');
    const hiddenOffers = document.querySelectorAll('.offer-item.hidden');
    if (toggleButton && hiddenOffers.length > 0) {
        toggleButton.addEventListener('click', function () {
            hiddenOffers.forEach(offer => offer.classList.toggle('hidden'));
            toggleButton.textContent = hiddenOffers[0].classList.contains('hidden') ? 'More Offers' : 'Less Offers';
        });
    }

    // Review hover interactions
    const reviews = document.querySelectorAll(".review");
    const hoverInfo = document.getElementById("hover-info");

    if (reviews.length > 0 && hoverInfo) {
        reviews.forEach(review => {
            review.addEventListener("mouseover", event => {
                const { customer, product, rate, feedback } = review.dataset;

                document.getElementById("customer-name").textContent = customer;
                document.getElementById("product-name").textContent = product;
                document.getElementById("product-rate").textContent = rate;
                document.getElementById("product-feedback").textContent = feedback;

                hoverInfo.style.display = "block";
                hoverInfo.style.top = `${event.pageY + 10}px`;
                hoverInfo.style.left = `${event.pageX + 10}px`;
            });

            review.addEventListener("mousemove", event => {
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
