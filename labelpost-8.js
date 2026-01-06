function renderLabelPost8(json, targetId) {
    var container = document.getElementById(targetId);
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

            // फोटोलाई ४००x२५० को साइजमा तान्ने
            var thumb = entry.media$thumbnail ? entry.media$thumbnail.url.replace("s72-c", "w400-h250-c") : "https://via.placeholder.com/130x85?text=No+Image";

            html += '<div class="lp8-item">';
            html += '<div class="lp8-thumb"><a href="' + link + '"><img src="' + thumb + '" alt="' + title + '"/></a></div>';
            html += '<div class="lp8-info">';
            html += '<h2 class="lp8-title"><a href="' + link + '">' + title + '</a></h2>';
            html += '</div>';
            html += '</div>';
        }
        container.innerHTML = html;
    } else {
        container.innerHTML = "कुनै पोस्ट भेटिएन।";
    }
}
