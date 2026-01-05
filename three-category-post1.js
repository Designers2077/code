function renderCategory(json, targetId) {
    var html = "";
    var posts = json.feed.entry || [];
    var target = document.getElementById(targetId);

    if (posts.length === 0) {
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

function loadThreeCats(cat1, cat2, cat3, count) {
    var s1 = document.createElement('script');
    s1.src = '/feeds/posts/default/-/' + encodeURIComponent(cat1) + '?alt=json-in-script&callback=cb1&max-results=' + count;
    document.body.appendChild(s1);

    var s2 = document.createElement('script');
    s2.src = '/feeds/posts/default/-/' + encodeURIComponent(cat2) + '?alt=json-in-script&callback=cb2&max-results=' + count;
    document.body.appendChild(s2);

    var s3 = document.createElement('script');
    s3.src = '/feeds/posts/default/-/' + encodeURIComponent(cat3) + '?alt=json-in-script&callback=cb3&max-results=' + count;
    document.body.appendChild(s3);
}
