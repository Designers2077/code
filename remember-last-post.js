/**
 * Function Name: rememberLastPost
 * Logic: Triggers at 50% scroll depth
 */

(function() {
    function initRememberLastPost() {
        const widget = document.getElementById('remember-last-post-container');
        if (!widget) return;

        // १. ब्लगर फिडबाट पछिल्लो पोष्ट तान्ने
        fetch('/feeds/posts/default?alt=json&max-results=1')
        .then(response => response.json())
        .then(data => {
            if(data.feed.entry && data.feed.entry.length > 0) {
                const post = data.feed.entry[0];
                const title = post.title.$t;
                const url = post.link.find(l => l.rel === 'alternate').href;
                const img = post.media$thumbnail ? post.media$thumbnail.url.replace('s72-c', 'w200') : 'https://via.placeholder.com/85x65?text=No+Image';
                
                document.getElementById('rem-last-link').innerText = title;
                document.getElementById('rem-last-link').href = url;
                document.getElementById('rem-last-img').src = img;
            }
        }).catch(err => console.error("Error loading post:", err));

        // २. ५०% स्क्रोल कन्डिसन (५०% पुग्दा देखिने, माथि जाँदा लुक्ने)
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let windowHeight = window.innerHeight;
            let fullHeight = document.documentElement.scrollHeight;
            
            // ५०% गणना
            if (scrollTop > (fullHeight - windowHeight) * 0.5) {
                widget.classList.add('show');
            } else {
                widget.classList.remove('show');
            }
        }, {passive: true});
    }

    // DOM लोड भएपछि रन गर्ने
    if (document.readyState === "complete" || document.readyState === "interactive") {
        initRememberLastPost();
    } else {
        document.addEventListener("DOMContentLoaded", initRememberLastPost);
    }
})();

// बन्द गर्ने फङ्सन
function closeLastPost() {
    const el = document.getElementById('remember-last-post-container');
    el.style.transform = 'scale(0.8)';
    el.style.opacity = '0';
    setTimeout(() => {
        el.style.display = 'none';
    }, 400);
}
