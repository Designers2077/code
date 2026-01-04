function showLabelPosts(json) {
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
            // ठूलो फोटो तान्नको लागि
            var thumb = entry.media$thumbnail ? entry.media$thumbnail.url.replace("s72-c", "w300-h200-c") : "https://via.placeholder.com/300x200?text=No+Image";
            
            html += '<div class="custom-post-item">';
            html += '<div class="custom-post-thumb"><a href="' + link + '"><img src="' + thumb + '" alt="' + title + '"/></a></div>';
            html += '<div class="custom-post-title"><a href="' + link + '">' + title + '</a></div>';
            html += '</div>';
        }
    }
    document.getElementById("label-post-output").innerHTML = html;
}
