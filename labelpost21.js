function labelpost21(json) {
    var scripts = document.getElementsByTagName('script');
    var currentScript = scripts[scripts.length - 1];
    var containerId = currentScript.getAttribute('data-id');
    var container = document.getElementById(containerId);

    if (!container || !json.feed.entry) return;

    var entries = json.feed.entry;
    var labelName = json.feed.category ? json.feed.category[0].term : "Category";
    
    var html = `<div class="lp21-wrapper">
        <div class="lp21-header">
            <div class="lp21-nav">
                <span>अर्थ-विचार</span><span>बैंक-वित्त</span><span>सेयर बजार</span>
            </div>
            <a href="/search/label/${labelName}" style="color:#fff; text-decoration:none;">थप समाचार ↗</a>
        </div>
        <div class="lp21-top-grid">`;

    // १. पहिलो पोस्ट (बायाँ पट्टि)
    var f = entries[0];
    var fImg = f.media$thumbnail ? f.media$thumbnail.url.replace('s72-c','s1600') : 'https://via.placeholder.com/600x450';
    html += `<div class="lp21-main">
        <a href="${f.link.find(l=>l.rel==='alternate').href}">
            <img src="${fImg}">
            <div class="lp21-overlay"><h2>${f.title.$t}</h2></div>
        </a>
    </div>`;

    // २. दोस्रो पोस्ट (बीचमा) - अब यसमा पनि तस्बिर थपिएको छ
    var m = entries[1] || f;
    var mImg = m.media$thumbnail ? m.media$thumbnail.url.replace('s72-c','s600') : 'https://via.placeholder.com/400x250';
    var summary = m.summary ? m.summary.$t.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..." : "";
    
    html += `<div class="lp21-mid-box">
        <a href="${m.link.find(l=>l.rel==='alternate').href}" style="color:inherit;text-decoration:none;">
            <img src="${mImg}" style="width:100%; height:200px; object-fit:cover; border-radius:4px; margin-bottom:15px;">
            <h2 style="font-size:22px;">${m.title.$t}</h2>
            <p>${summary}</p>
        </a>
    </div>`;

    // ३. दायाँका २ वटा पोस्टहरू
    html += `<div class="lp21-side">`;
    for(var i=2; i<4; i++) {
        if(entries[i]) {
            var sImg = entries[i].media$thumbnail ? entries[i].media$thumbnail.url.replace('s72-c','s600') : 'https://via.placeholder.com/300x200';
            html += `<div class="lp21-side-card">
                <a href="${entries[i].link.find(l=>l.rel==='alternate').href}" style="text-decoration:none;">
                    <img src="${sImg}">
                    <h4>${entries[i].title.$t}</h4>
                </a>
            </div>`;
        }
    }
    html += `</div></div><div class="lp21-bottom-list">`;

    // ४. तलका साना पोस्टहरूको सूची
    for(var j=4; j<entries.length; j++) {
        var lImg = entries[j].media$thumbnail ? entries[j].media$thumbnail.url.replace('s72-c','s200') : 'https://via.placeholder.com/100x70';
        html += `<a href="${entries[j].link.find(l=>l.rel==='alternate').href}" class="lp21-list-item">
            <img src="${lImg}">
            <h4>${entries[j].title.$t}</h4>
        </a>`;
    }

    html += `</div></div>`;
    container.innerHTML = html;
}
