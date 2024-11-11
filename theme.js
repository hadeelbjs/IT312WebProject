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

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('theme-dark');
    }

    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }

    const toggleButton = document.getElementById('toggle-offers');
    const hiddenOffers = document.querySelectorAll('.offer-item.hidden');
    if (toggleButton && hiddenOffers.length > 0) {
        toggleButton.addEventListener('click', function() {
            hiddenOffers.forEach(function(offer) {
                offer.classList.toggle('hidden');
            });

            if (hiddenOffers[0].classList.contains('hidden')) {
                toggleButton.textContent = 'More Offers'; // Show more
            } else {
                toggleButton.textContent = 'Less Offers'; // Show less
            }
        });
    }
});

function toggleTheme() {
    if (document.body.classList.contains('theme-dark')) {
        document.body.classList.remove('theme-dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.add('theme-dark');
        localStorage.setItem('theme', 'dark'); 
    }
}
