function labelpost21(json) {
    var scripts = document.getElementsByTagName('script');
    var currentScript = scripts[scripts.length - 1];
    var containerId = currentScript.getAttribute('data-id');
    var container = document.getElementById(containerId);

    if (!container || !json.feed.entry) return;

    var entries = json.feed.entry;
    var labelName = json.feed.category ? json.feed.category[0].term : "अर्थ-विचार";
    
    var html = `<div class="lp21-wrapper">
        <div class="lp21-header">
            <div class="lp21-nav">
                <span>अर्थ-विचार</span><span>बैंक-वित्त</span><span>सेयर बजार</span>
            </div>
            <a href="/search/label/${labelName}" style="color:#fff; text-decoration:none;">थप समाचार ↗</a>
        </div>
        <div class="lp21-top-grid">`;

    // १. मुख्य ठूलो तस्बिर समाचार
    var f = entries[0];
    html += `<div class="lp21-main">
        <a href="${f.link.find(l=>l.rel==='alternate').href}">
            <img src="${f.media$thumbnail.url.replace('s72-c','s1600')}">
            <div class="lp21-overlay"><h2>${f.title.$t}</h2></div>
        </a>
    </div>`;

    // २. बीचको विवरण समाचार
    var m = entries[1] || f;
    var summary = m.summary ? m.summary.$t.substring(0, 180) + "..." : "";
    html += `<div class="lp21-mid-box">
        <a href="${m.link.find(l=>l.rel==='alternate').href}" style="color:inherit;text-decoration:none;">
            <h2>${m.title.$t}</h2>
            <p>${summary}</p>
        </a>
    </div>`;

    // ३. दायाँका २ वटा कार्डहरू
    html += `<div class="lp21-side">`;
    for(var i=2; i<4; i++) {
        if(entries[i]) {
            html += `<div class="lp21-side-card">
                <a href="${entries[i].link.find(l=>l.rel==='alternate').href}" style="text-decoration:none;">
                    <img src="${entries[i].media$thumbnail.url.replace('s72-c','s600')}">
                    <h4>${entries[i].title.$t}</h4>
                </a>
            </div>`;
        }
    }
    html += `</div></div><div class="lp21-bottom-list">`;

    // ४. तलका साना समाचारहरू
    for(var j=4; j<entries.length; j++) {
        html += `<a href="${entries[j].link.find(l=>l.rel==='alternate').href}" class="lp21-list-item">
            <img src="${entries[j].media$thumbnail.url.replace('s72-c','s200')}">
            <h4>${entries[j].title.$t}</h4>
        </a>`;
    }

    html += `</div></div>`;
    container.innerHTML = html;
}
