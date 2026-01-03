/**
 * Automatic News Ticker for Blogger
 * Fetches latest 8 posts and scrolls them
 */
function ticker_headlines(json) {
    var ticker_html = "";
    if (json.feed.entry) {
        for (var i = 0; i < json.feed.entry.length; i++) {
            var entry = json.feed.entry[i];
            var title = entry.title.$t;
            var postUrl = "";
            
            // Get post URL
            for (var j = 0; j < entry.link.length; j++) {
                if (entry.link[j].rel == 'alternate') {
                    postUrl = entry.link[j].href;
                    break;
                }
            }
            
            // Append headlines
            ticker_html += "<span> • <a href='" + postUrl + "'>" + title + "</a></span>";
        }
        document.getElementById("ticker-content").innerHTML = ticker_html;
    } else {
        document.getElementById("ticker-content").innerHTML = "ताजा समाचार लोड हुन सकेन।";
    }
}

// Fetch the Feed
(function() {
    var script = document.createElement('script');
    script.src = '/feeds/posts/default?alt=json-in-script&callback=ticker_headlines&max-results=8';
    document.body.appendChild(script);
})();
