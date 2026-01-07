/* Ratopati Style Header - header-1.js */
document.addEventListener("DOMContentLoaded", function() {
    // नेपाली मिति देखाउन
    const dateBox = document.getElementById("h1-nepali-date");
    if (dateBox) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date().toLocaleDateString('ne-NP', options);
        dateBox.innerHTML = today;
    }

    // Scroll हुँदा Navigation मा थप इफेक्ट दिन (Optional)
    const navBar = document.querySelector(".h1-nav-bar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 150) {
            navBar.style.padding = "2px 0";
        } else {
            navBar.style.padding = "0";
        }
    });
});
