/**
 * Blogger Image Optimizer & Auto-Resize
 * Automatically changes s320/s640 to s1600 (Original Size)
 * and applies full-width styling.
 */
document.addEventListener("DOMContentLoaded", function() {
    var posts = document.querySelectorAll('.post-body');
    posts.forEach(function(post) {
        var images = post.querySelectorAll('img');
        images.forEach(function(img) {
            var src = img.getAttribute('src');
            
            // १. इमेजको क्वालिटी र साइज सुधार्ने
            if (src && (src.includes('googleusercontent.com') || src.includes('blogger.googleusercontent.com'))) {
                var newSrc = src.replace(/\/s[0-9]+(-c)?\//, '/s1600/');
                img.setAttribute('src', newSrc);
            }

            // २. स्टाइल थप्ने (CSS नभए पनि फुल साइज बनाउन)
            img.style.setProperty("width", "100%", "important");
            img.style.setProperty("height", "auto", "important");
            img.style.setProperty("max-width", "100%", "important");
            img.style.display = "block";
            img.style.margin = "15px auto";
            
            // ३. अनावश्यक एट्रिब्युट हटाउने
            img.removeAttribute('width');
            img.removeAttribute('height');
            
            // ४. सेपरेटर (Separator) हटाउने
            var separator = img.closest('.separator');
            if (separator) {
                separator.style.setProperty("margin-left", "0", "important");
                separator.style.setProperty("margin-right", "0", "important");
                separator.style.setProperty("text-align", "center", "important");
            }
        });
    });
});
