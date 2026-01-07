function labelpost20(json) {
    var scripts = document.getElementsByTagName('script');
    var currentScript = scripts[scripts.length - 1];
    var containerId = currentScript.getAttribute('data-id');
    var container = document.getElementById(containerId);

    if (!container || !json.feed.entry) return;

    var entries = json.feed.entry;
    var labelName = json.feed.category ? json.feed.category[0].term : "News";
    
    var html = `<div class="lp20-wrapper">
        <div class="lp20-header">
            <h3>${labelName}</h3>
            <div class="lp20-nav"><span>गसिप</span><span>बलिउड</span><span>संगीत</span></div>
        </div>
        <div class="lp20-grid">`;

    // १. मुख्य ठूलो समाचार
    var f = entries[0];
    html += `<div class="lp20-main-post">
        <a href="${f.link.find(l => l.rel === 'alternate').href}">
            <img src="${f.media$thumbnail.url.replace('s72-c', 's1600')}">
            <div class="lp20-overlay"><h2>${f.title.$t}</h2></div>
        </a>
    </div><div class="lp20-side">`;

    // २. साइडका २ वटा समाचार
    for (var i = 1; i < 3; i++) {
        if (entries[i]) {
            html += `<div class="lp20-side-post">
                <a href="${entries[i].link.find(l => l.rel === 'alternate').href}">
                    <img src="${entries[i].media$thumbnail.url.replace('s72-c', 's600')}">
                    <div class="lp20-overlay"><h4>${entries[i].title.$t}</h4></div>
                </a>
            </div>`;
        }
    }
    html += `</div></div><div class="lp20-bottom">`;

    // ३. तलका ३ वटा साना समाचार
    for (var j = 3; j < 6; j++) {
        if (entries[j]) {
            html += `<a href="${entries[j].link.find(l => l.rel === 'alternate').href}" class="lp20-bottom-post">
                <div class="thumb"><img src="${entries[j].media$thumbnail.url.replace('s72-c', 's200')}"></div>
                <h4>${entries[j].title.$t}</h4>
            </a>`;
        }
    }
    
    html += '</div></div>';
    container.innerHTML = html;
}
