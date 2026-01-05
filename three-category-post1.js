function renderCategory(json, targetId) {
    var html = "";
    var posts = json.feed.entry || [];
    var target = document.getElementById(targetId);

    if (!posts || posts.length === 0) {
        target.innerHTML = "पोष्ट फेला परेन।";
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

        html += '<div class="mag-item">';
        html += '<img src="' + thumb + '" alt="' + title + '">';
        html += '<a href="' + link + '">' + title + '</a>';
        html += '</div>';
    }
    target.innerHTML = html;
}

// कलव्याकहरू (Callbacks)
function cb1(json) { renderCategory(json, "box-1"); }
function cb2(json) { renderCategory(json, "box-2"); }
function cb3(json) { renderCategory(json, "box-3"); }

// नेपाली लेबल लोड गर्ने फंक्सन
function loadThreeCats(cat1, cat2, cat3, count) {
    var cats = [cat1, cat2, cat3];
    var cbs = ['cb1', 'cb2', 'cb3'];

    for (var i = 0; i < cats.length; i++) {
        if (cats[i]) {
            var script = document.createElement('script');
            // encodeURIComponent को प्रयोग अनिवार्य छ
            script.src = '/feeds/posts/default/-/' + encodeURIComponent(cats[i]) + '?alt=json-in-script&callback=' + cbs[i] + '&max-results=' + count;
            document.body.appendChild(script);
        }
    }
}
