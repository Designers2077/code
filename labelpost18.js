function labelpost18(json) {
    var scripts = document.getElementsByTagName('script');
    var currentScript = scripts[scripts.length - 1];
    var containerId = currentScript.getAttribute('data-id');
    var container = document.getElementById(containerId);

    if (!container || !json.feed.entry) return;

    var entries = json.feed.entry;
    var labelName = json.feed.category ? json.feed.category[0].term : "ताजा अपडेट";
    
    var html = `<div class="lp18-wrapper">
        <div class="lp18-header">
            <h3>${labelName}</h3>
            <a href="/search/label/${labelName}" style="color:#fff; text-decoration:none; font-size:24px;">›</a>
        </div>
        <div class="lp18-content">`;

    // पहिले २ वटा ठूला पोस्टहरू
    for (var i = 0; i < 2; i++) {
        if (entries[i]) {
            var title = entries[i].title.$t;
            var link = entries[i].link.find(l => l.rel === 'alternate').href;
            var img = entries[i].media$thumbnail ? entries[i].media$thumbnail.url.replace('s72-c', 's1600') : 'https://via.placeholder.com/500x350';
            html += `<div class="lp18-big">
                <a href="${link}"><img src="${img}" alt="${title}">
                <div class="lp18-big-info"><h2>${title}</h2></div></a>
            </div>`;
        }
    }

    // बाँकी पोस्टहरू साइडबारमा
    html += '<div class="lp18-side">';
    for (var j = 2; j < entries.length; j++) {
        var sTitle = entries[j].title.$t;
        var sLink = entries[j].link.find(l => l.rel === 'alternate').href;
        var sImg = entries[j].media$thumbnail ? entries[j].media$thumbnail.url.replace('s72-c', 's200') : 'https://via.placeholder.com/100x70';
        html += `<a href="${sLink}" class="lp18-item">
            <img src="${sImg}" alt="${sTitle}">
            <h4>${sTitle}</h4>
        </a>`;
    }
    html += '</div></div></div>';
    
    container.innerHTML = html;
}
