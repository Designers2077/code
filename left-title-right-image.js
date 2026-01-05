function ltrRender(json, targetId) {
    var html = "";
    var posts = json.feed.entry || [];
    var target = document.getElementById(targetId);

    if (!posts || posts.length === 0) {
        target.innerHTML = "<div style='padding:10px;color:#999;'>समाचार भेटिएन।</div>";
        return;
    }

    for (var i = 0; i < posts.length; i++) {
        var entry = posts[i];
        var title = entry.title.$t;
        var link = "";
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'alternate') { link = entry.link[k].href; break; }
        }
        var thumb = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', 's300-c') : 'https://via.placeholder.com/110x75';

        html += '<div class="ltr-post-item">';
        html += '<img src="' + thumb + '" alt="' + title + '">';
        html += '<a href="' + link + '">' + title + '</a>';
        html += '</div>';
    }
    target.innerHTML = html;
}

// अलग-अलग कलव्याक फंक्सनहरू
window.ltrCB1 = function(json) { ltrRender(json, "ltr-box-1"); };
window.ltrCB2 = function(json) { ltrRender(json, "ltr-box-2"); };
window.ltrCB3 = function(json) { ltrRender(json, "ltr-box-3"); };

function ltrInit(cat1, cat2, cat3, count) {
    var cats = [cat1, cat2, cat3];
    var cbs = ['ltrCB1', 'ltrCB2', 'ltrCB3'];
    
    for (var i = 0; i < cats.length; i++) {
        if (cats[i]) {
            var script = document.createElement('script');
            // नेपाली युनिकोड लेबललाई चल्ने बनाउने मुख्य लाइन:
            script.src = '/feeds/posts/default/-/' + encodeURIComponent(cats[i]) + '?alt=json-in-script&callback=' + cbs[i] + '&max-results=' + count;
            document.head.appendChild(script);
        }
    }
}
