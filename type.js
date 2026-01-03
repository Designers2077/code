const newsText = document.getElementById('news-text');
const messages = [
    "नेपालमा आइटी क्षेत्रको भविष्य उज्ज्वल छ।",
    "नयाँ प्रविधिले सञ्चार माध्यममा क्रान्ति ल्याउँदैछ।",
    "GitHub मा आफ्नो कोड होस्ट गर्न सिक्नुहोस्।"
];

let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentMessage = messages[messageIndex];
    
    if (isDeleting) {
        newsText.textContent = currentMessage.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // मेट्दा अलि छिटो हुने
    } else {
        newsText.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150; // टाइप गर्दाको गति
    }

    if (!isDeleting && charIndex === currentMessage.length) {
        isDeleting = true;
        typeSpeed = 2000; // पूरा टाइप भएपछि २ सेकेन्ड रोकिने
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// सुरु गर्ने
document.addEventListener('DOMContentLoaded', typeEffect);
