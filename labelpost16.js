function labelpost16(json) {
    // यो स्क्रिप्ट जहाँ कल गरिएको छ, त्यहाँको data-id र सम्बन्धित div खोज्ने
    var scripts = document.getElementsByTagName('script');
    var currentScript = scripts[scripts.length - 1];
    var containerId = currentScript.getAttribute('data-id');
    var container = document.getElementById(containerId);

    if (!container || !json.feed.entry) return;

    var entries = json.feed.entry;
    var labelName = json.feed.category ? json.feed.category[0].term : "";
    var html = '<div class="lp16-container">';

    // Clock Icon SVG
    var clockIcon = '<svg viewBox="0 0 24 24"><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10,10-4.48,10-10S17.52,2,12,2zm0,18c-4.41,0-8-3.59-8-8s3.59-8,8-8,8,3.59,8,8-3.59,8-8,8zm.5-13H11v6l5.2,3.2.8-1.3-4.5-2.7V7z"/></svg>';

    // १. पहिलो ठुलो समाचार (Main Story)
    var first = entries[0];
    var fTitle = first.title.$t;
    var fLink = first.link.find(l => l.rel === 'alternate').href;
    var fImg = first.media$thumbnail ? first.media$thumbnail.url.replace('s72-c', 's1600') : 'https://via.placeholder.com/640x420';

    html += `
    <div class="lp16-main">
        <a href="${fLink}">
            <img src="${fImg}" alt="${fTitle}">
            <div class="lp16-overlay">
                <h2>${fTitle}</h2>
                <div class="lp16-meta" style="color:#eee">${clockIcon} भर्खरै</div>
            </div>
        </a>
    </div>
    <div class="lp16-side">`;

    // २. बाँकी ४ वटा समाचार (Sidebar Stories)
    for (var i = 1; i < entries.length; i++) {
        var entry = entries[i];
        var title = entry.title.$t;
        var link = entry.link.find(l => l.rel === 'alternate').href;
        var img = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', 's200') : 'https://via.placeholder.com/120x80';

        html += `
        <a href="${link}" class="lp16-item">
            <img src="${img}" alt="${title}">
            <div class="lp16-content">
                <h4>${title}</h4>
                <div class="lp16-meta">${clockIcon} भर्खरै</div>
            </div>
        </a>`;
    }

    // ३. थप समाचार (View All) बटन
    html += `<a href="/search/label/${labelName}" class="lp16-more-btn">🔄 थप समाचारहरू</a></div></div>`;
    
    container.innerHTML = html;
}
