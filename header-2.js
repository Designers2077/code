/* Ratopati Style Header v2 - header-2.js */
document.addEventListener("DOMContentLoaded", function() {
    // नेपाली मिति देखाउने फंक्सन
    const updateNepaliDate = () => {
        const dateElements = document.querySelectorAll("#h1-nepali-date, #h2-nepali-date");
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date().toLocaleDateString('ne-NP', options);
        
        dateElements.forEach(el => {
            el.innerHTML = today;
        });
    };

    updateNepaliDate();

    // Sticky Header Scroll Effect
    const nav = document.querySelector(".h2-nav-bar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        } else {
            nav.style.boxShadow = "none";
        }
    });

    // Hamburger Menu Click (Console log for testing)
    const menuBtn = document.querySelector(".h2-menu-icon");
    if(menuBtn) {
        menuBtn.addEventListener("click", () => {
            alert("Side Menu Opening..."); // यहाँ तपाईंले Sidebar Drawer खोल्ने कोड राख्न सक्नुहुन्छ
        });
    }
});
