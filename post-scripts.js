/* Post Page Enhancements */
document.addEventListener("DOMContentLoaded", function() {
    // सबै पोस्ट भित्रका तस्बिरहरूलाई सेन्टर गर्ने र रेस्पोन्सिभ बनाउने
    var postImages = document.querySelectorAll('.post-body img');
    postImages.forEach(function(img) {
        img.removeAttribute('height');
        img.removeAttribute('width');
        img.style.display = "block";
        img.style.marginLeft = "auto";
        img.style.marginRight = "auto";
    });
});
