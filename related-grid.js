/**
 * Blogger Related Posts Grid Script
 * Logic: Fetch posts from same label, skip current post, 4-column desktop/2-column mobile
 */

function renderRelatedGrid(json) {
    var entries = json.feed.entry;
    var currentPostUrl = window.location.href.split('?')[0].split('#')[0]; 
    var html = '<div class="post-grid-container">';

    if (!entries || entries.length === 0) {
        document.getElementById('related-grid-box').style.display = 'none';
        return;
    }

    var count = 0;
    for (var i = 0; i < entries.length; i++) {
        var post = entries[i];
        var link = post.link.find(l => l.rel === 'alternate').href.split('?')[0].split('#')[0];

        // Skip the post if it's the one currently being read
        if (link === currentPostUrl) continue;

        var title = post.title.$t;
        var img = post.media$thumbnail 
            ? post.media$thumbnail.url.replace('s72-c', 's400-c') 
            : 'https://via.placeholder.com/400x400?text=No+Image';

        html += '<article class="grid-post">';
        html += '<div class="grid-image"><a href="' + link + '"><img src="' + img + '" alt="' + title + '"/></a></div>';
        html += '<h2 class="grid-title"><a href="' + link + '">' + title + '</a></h2>';
        html += '</article>';

        count++;
        if (count === 4) break; // Limit to 4 posts
    }

    html += '</div>';
    document.getElementById('related-grid-box').innerHTML = html;
}
