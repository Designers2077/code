/* news-script.js */
document.addEventListener("DOMContentLoaded", function() {
    const newsContainer = document.getElementById('typing-news-container');
    let posts = [];
    let msgIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    // ब्लगर फिडबाट डेटा प्राप्त गर्ने
    window.setupNews = function(data) {
        if (data.feed.entry) {
            posts = data.feed.entry.map(entry => ({
                title: entry.title.$t,
                link: entry.link.find(l => l.rel === 'alternate').href
            }));
            typeAnimation();
        }
    };

    function typeAnimation() {
        if (posts.length === 0) return;

        const currentPost = posts[msgIdx];
        const displayText = currentPost.title;
        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIdx < displayText.length) {
            newsContainer.textContent = displayText.substring(0, charIdx + 1);
            newsContainer.href = currentPost.link;
            charIdx++;
        } else if (isDeleting && charIdx > 0) {
            newsContainer.textContent = displayText.substring(0, charIdx - 1);
            charIdx--;
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                msgIdx = (msgIdx + 1) % posts.length;
            }
            speed = isDeleting ? 3000 : 500; // पूरा भएपछि ३ सेकेन्ड रोकिने
        }

        setTimeout(typeAnimation, speed);
    }

    // JSONP मार्फत डेटा लोड गर्ने
    const script = document.createElement('script');
    script.src = "https://nepalimahabani.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=20&callback=setupNews";
    document.body.appendChild(script);
});
