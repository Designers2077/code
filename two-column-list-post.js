const fetchNews = (label, targetId, maxResults) => {
    const url = `/feeds/posts/default/-/${encodeURIComponent(label)}?alt=json-in-script&callback=cb_${targetId}&max-results=${maxResults}`;
    const script = document.createElement('script');
    script.src = url;

    window[`cb_${targetId}`] = (data) => {
        const container = document.getElementById(targetId);
        if (!container || !data.feed.entry) {
            container.innerHTML = "No posts found.";
            return;
        }

        let html = '';
        data.feed.entry.forEach(entry => {
            const title = entry.title.$t;
            const link = entry.link.find(l => l.rel === 'alternate').href;
            const img = entry.media$thumbnail 
                ? entry.media$thumbnail.url.replace('s72-c', 'w400-h280-c') 
                : 'https://via.placeholder.com/140x90';

            html += `
                <div class="custom-post-item">
                    <img src="${img}" alt="${title}">
                    <a href="${link}">${title}</a>
                </div>`;
        });
        container.innerHTML = html;
    };
    document.body.appendChild(script);
};
