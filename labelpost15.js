function labelpost15(json) {
    // अन्तिममा थपिएको स्क्रिप्ट ट्याग खोज्ने जसले गर्दा सही कन्टिनर पत्ता लाग्छ
    var scripts = document.getElementsByTagName('script');
    var currentScript = scripts[scripts.length - 1];
    var containerId = currentScript.getAttribute('data-id');
    var container = document.getElementById(containerId);

    if (!container || !json.feed.entry) return;

    var entries = json.feed.entry;
    var html = '<div class="lp15-container">';

    // पहिलो पोष्ट (Main)
    var first = entries[0];
    var fTitle = first.title.$t;
    var fLink = first.link.find(l => l.rel === 'alternate').href;
    var fImg = first.media$thumbnail ? first.media$thumbnail.url.replace('s72-c', 's1600') : 'https://via.placeholder.com/600x400';

    html += `<div class="lp15-main">
        <a href="${fLink}">
            <img src="${fImg}" alt="${fTitle}">
            <div class="lp15-overlay"><h2>${fTitle}</h2></div>
        </a>
    </div><div class="lp15-side">`;

    // बाँकी पोष्टहरू (Side)
    for (var i = 1; i < entries.length; i++) {
        var entry = entries[i];
        var title = entry.title.$t;
        var link = entry.link.find(l => l.rel === 'alternate').href;
        var img = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', 's200') : 'https://via.placeholder.com/100x70';

        html += `<a href="${link}" class="lp15-item">
            <img src="${img}" alt="${title}">
            <h4>${title}</h4>
        </a>`;
    }

    html += '</div></div>';
    container.innerHTML = html;
}
