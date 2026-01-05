/**
 * Two Column List Post Function
 * Fetches posts by label from Blogger API
 */
function twoColumnListPostLoader(label, containerId) {
    const feedUrl = `/feeds/posts/default/-/${label}?alt=json-in-script&max-results=3&callback=renderTwoColumnListPost${containerId}`;
    const script = document.createElement('script');
    script.src = feedUrl;
    document.body.appendChild(script);

    window['renderTwoColumnListPost' + containerId] = function(data) {
        const container = document.getElementById(containerId);
        if (!data.feed.entry) {
            container.innerHTML = "No posts found.";
            return;
        }

        let html = '';
        data.feed.entry.forEach(entry => {
            const title = entry.title.$t;
            const link = entry.link.find(l => l.rel === 'alternate').href;
            
            // Image handling
            let thumb = 'https://placehold.jp/120x80.png';
            if (entry.media$thumbnail) {
                thumb = entry.media$thumbnail.url.replace('s72-c', 'w400-h250-p');
            }

            html += `
                <div class="two-column-list-post-item">
                    <img src="${thumb}" alt="${title}">
                    <a href="${link}">${title}</a>
                </div>`;
        });
        container.innerHTML = html;
    };
}

// Initialize the lists
document.addEventListener("DOMContentLoaded", function() {
    // Label 'News' for first column
    twoColumnListPostLoader('news', 'two-col-news-container');
    // Label 'Economic' for second column
    twoColumnListPostLoader('economic', 'two-col-economic-container');
});
