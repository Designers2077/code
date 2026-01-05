function renderCategory(json, targetId) {
    var html = "";
    var posts = json.feed.entry || [];
    var target = document.getElementById(targetId);

    if (!posts || posts.length === 0) {
        target.innerHTML = "<div style='padding:10px;font-size:14px;'>यो लेबलमा कुनै समाचार भेटिएन।</div>";
        return;
    }

    for (var i = 0; i < posts.length; i++) {
        var entry = posts[i];
        var title = entry.title.$t;
        var link = "";
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'alternate') { link = entry.link[k].href; break; }
        }
        var thumb = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', 's200-c') : 'https://via.placeholder.com/100x70';

        html += '<div class="mag-item">';
        html += '<img src="' + thumb + '" alt="' + title + '">';
        html += '<a href="' + link + '">' + title + '</a>';
        html += '</div>';
    }
    target.innerHTML = html;
}

// कलव्याक फंक्सनहरू
function cb1(json) { renderCategory(json, "box-1"); }
function cb2(json) { renderCategory(json, "box-2"); }
function cb3(json) { renderCategory(json, "box-3"); }

// नेपाली लेबल लोड गर्ने मुख्य फंक्सन
function loadThreeCats(cat1, cat2, cat3, count) {
    var cats = [cat1, cat2, cat3];
    var callbacks = [cb1, cb2, cb3];

    for (var i = 0; i < cats.length; i++) {
        if (cats[i]) {
            var script = document.createElement('script');
            // encodeURIComponent ले नेपाली शब्दलाई URL मा बुझ्ने बनाउँछ
            script.src = '/feeds/posts/default/-/' + encodeURIComponent(cats[i]) + '?alt=json-in-script&callback=' + 'cb' + (i+1) + '&max-results=' + count;
            document.body.appendChild(script);
        }
    }
}
