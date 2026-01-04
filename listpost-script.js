function renderListPosts(json) {
    var container = document.getElementById("listpost-grid-box");
    var html = "";
    var entries = json.feed.entry;

    if (entries) {
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            var title = entry.title.$t;
            var link = "";
            
            for (var j = 0; j < entry.link.length; j++) {
                if (entry.link[j].rel == 'alternate') {
                    link = entry.link[j].href;
                    break;
                }
            }

            var thumb = entry.media$thumbnail ? entry.media$thumbnail.url.replace("s72-c", "w300-h200-c") : "https://via.placeholder.com/130x85?text=No+Image";

            html += '<div class="listpost-item">';
            html += '<div class="listpost-thumb"><a href="' + link + '"><img src="' + thumb + '" alt="' + title + '"/></a></div>';
            html += '<div class="listpost-info">';
            html += '<h2 class="listpost-title"><a href="' + link + '">' + title + '</a></h2>';
            html += '</div>';
            html += '</div>';
        }
        container.innerHTML = html;
    } else {
        container.innerHTML = "कुनै पोस्ट भेटिएन।";
    }
}
