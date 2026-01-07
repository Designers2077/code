function labelpost19(json) {
    var scripts = document.getElementsByTagName('script');
    var currentScript = scripts[scripts.length - 1];
    var containerId = currentScript.getAttribute('data-id');
    var container = document.getElementById(containerId);

    if (!container || !json.feed.entry) return;

    var entries = json.feed.entry;
    var labelName = json.feed.category ? json.feed.category[0].term : "Category";
    
    var html = `<div class="lp19-wrapper">
        <div class="lp19-header">
            <h3>${labelName}</h3>
            <a href="/search/label/${labelName}" style="color:#fff; text-decoration:none; font-size:24px;">›</a>
        </div>
        <div class="lp19-content">`;

    // २ ठूला पोर्ट्रेट पोस्टहरू
    for (var i = 0; i < 2; i++) {
        if (entries[i]) {
            var title = entries[i].title.$t;
            var link = entries[i].link.find(l => l.rel === 'alternate').href;
            var img = entries[i].media$thumbnail ? entries[i].media$thumbnail.url.replace('s72-c', 's1600') : 'https://via.placeholder.com/500x700';
            html += `<div class="lp19-featured">
                <a href="${link}"><img src="${img}" alt="${title}">
                <div class="lp19-overlay"><h2>${title}</h2></div></a>
            </div>`;
        }
    }

    // दाहिने साइडका ३ सानो पोस्टहरू
    html += '<div class="lp19-side">';
    for (var j = 2; j < 5; j++) {
        if (entries[j]) {
            var sTitle = entries[j].title.$t;
            var sLink = entries[j].link.find(l => l.rel === 'alternate').href;
            var sImg = entries[j].media$thumbnail ? entries[j].media$thumbnail.url.replace('s72-c', 's600') : 'https://via.placeholder.com/400x250';
            html += `<a href="${sLink}" class="lp19-side-item">
                <img src="${sImg}" alt="${sTitle}">
                <div class="lp19-side-overlay"><h4>${sTitle}</h4></div>
            </a>`;
        }
    }
    html += '</div></div></div>';
    
    container.innerHTML = html;
}
