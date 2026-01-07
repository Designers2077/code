function labelPostWidget(json) {
    let container = document.getElementById('label-post-14');
    let html = '<div class="news-container">';
    
    // पहिलो पोष्ट (Main Story)
    let firstPost = json.feed.entry[0];
    let firstTitle = firstPost.title.$t;
    let firstLink = firstPost.link.find(l => l.rel === 'alternate').href;
    let firstImg = firstPost.media$thumbnail ? firstPost.media$thumbnail.url.replace('s72-c', 's1600') : 'https://via.placeholder.com/600x400';
    
    html += `
    <div class="main-story">
        <a href="${firstLink}">
            <img src="${firstImg}" alt="${firstTitle}">
            <div class="main-overlay">
                <h2>${firstTitle}</h2>
                <span class="time-text" style="color:#ddd">🕒 भर्खरै</span>
            </div>
        </a>
    </div>
    <div class="side-stories">`;

    // बाँकी पोष्टहरू (Sidebar)
    for (let i = 1; i < json.feed.entry.length; i++) {
        let entry = json.feed.entry[i];
        let title = entry.title.$t;
        let link = entry.link.find(l => l.rel === 'alternate').href;
        let img = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', 's200') : 'https://via.placeholder.com/100x70';

        html += `
        <a href="${link}" class="side-item">
            <img src="${img}" alt="${title}">
            <div class="side-content">
                <h4>${title}</h4>
                <span class="time-text">🕒 अपडेट गरिएको</span>
            </div>
        </a>`;
    }

    html += `
        <a href="/search/label/${json.feed.category[0].term}" class="update-btn">🔄 थप समाचारहरू</a>
    </div></div>`;
    
    container.innerHTML = html;
}
