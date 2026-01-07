function labelpost17(json) {
    var scripts = document.getElementsByTagName('script');
    var currentScript = scripts[scripts.length - 1];
    var containerId = currentScript.getAttribute('data-id');
    var container = document.getElementById(containerId);

    if (!container || !json.feed.entry) return;

    var entries = json.feed.entry;
    var labelName = json.feed.category ? json.feed.category[0].term : "";
    var html = '<div class="lp17-container">';

    // १. मुख्य समाचार
    var first = entries[0];
    var fTitle = first.title.$t;
    var fLink = first.link.find(l => l.rel === 'alternate').href;
    var fImg = first.media$thumbnail ? first.media$thumbnail.url.replace('s72-c', 's1600') : 'https://via.placeholder.com/600x400';
    var fSummary = first.summary ? first.summary.$t.substring(0, 160) + "..." : (first.content ? first.content.$t.replace(/<[^>]*>?/gm, '').substring(0, 160) + "..." : "");

    html += `
    <div class="lp17-main-card">
        <div class="lp17-main-img">
            <a href="${fLink}"><img src="${fImg}" alt="${fTitle}"></a>
        </div>
        <div class="lp17-main-content">
            <a href="${fLink}" style="text-decoration:none;color:inherit;"><h2>${fTitle}</h2></a>
            <p>${fSummary}</p>
        </div>
    </div>
    <div class="lp17-side">`;

    // २. साइडबार सूची
    for (var i = 1; i < entries.length; i++) {
        var entry = entries[i];
        var title = entry.title.$t;
        var link = entry.link.find(l => l.rel === 'alternate').href;
        var img = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', 's200') : 'https://via.placeholder.com/120x80';

        html += `
        <a href="${link}" class="lp17-item">
            <img src="${img}" alt="${title}">
            <div class="lp17-info">
                <h4>${title}</h4>
            </div>
        </a>`;
    }

    html += `<a href="/search/label/${labelName}" class="lp17-more-btn">🔄 २४ घण्टाका ताजा अपडेट</a></div></div>`;
    container.innerHTML = html;
}
