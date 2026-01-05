function mainNewsRender(json, targetId) {
    var html = '<div class="main-news-grid">';
    var posts = json.feed.entry || [];
    var target = document.getElementById(targetId);

    if (!posts || posts.length === 0) {
        target.innerHTML = "समाचार भेटिएन।";
        return;
    }

    for (var i = 0; i < Math.min(posts.length, 3); i++) {
        var entry = posts[i];
        var title = entry.title.$t;
        var link = entry.link.find(l => l.rel === 'alternate').href;
        
        // मुख्य तस्विरको लागि उच्च गुणस्तर (s640)
        var thumbSize = (i === 0) ? 's640' : 's400';
        var thumb = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', thumbSize) : 'https://via.placeholder.com/400x250';

        html += '<div class="main-news-item">';
        html += '<img src="' + thumb + '" alt="' + title + '">';
        html += '<a href="' + link + '">' + title + '</a>';
        html += '</div>';
    }
    html += '</div>';
    target.innerHTML = html;
}

// JSON Callbacks
window.mainNewsCB1 = j => mainNewsRender(j, "main-box-1");
window.mainNewsCB2 = j => mainNewsRender(j, "main-box-2");
window.mainNewsCB3 = j => mainNewsRender(j, "main-box-3");

// फिड कनेक्ट गर्ने फंक्सन
function mainNewsInit(c1, c2, c3, n) {
    var cats = [c1, c2, c3];
    var cbs = ['mainNewsCB1', 'mainNewsCB2', 'mainNewsCB3'];
    
    cats.forEach((cat, i) => {
        if (cat) {
            let s = document.createElement('script');
            // encodeURIComponent ले नेपाली क्यारेक्टरलाई URL मा सुरक्षित बनाउँछ
            s.src = '/feeds/posts/default/-/' + encodeURIComponent(cat) + '?alt=json-in-script&callback=' + cbs[i] + '&max-results=' + n;
            document.head.appendChild(s);
        }
    });
}
