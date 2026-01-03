/**
 * Blogger Related Posts Logic
 * File: related-grid.js
 */

function renderRelatedGrid(json) {
    var entries = json.feed.entry;
    var currentPostUrl = window.location.href.split('?')[0].split('#')[0]; 
    var html = '<div class="post-grid-container">';

    if (!entries || entries.length === 0) {
        document.getElementById('related-posts-section').style.display = 'none';
        return;
    }

    var count = 0;
    for (var i = 0; i < entries.length; i++) {
        var post = entries[i];
        var link = post.link.find(l => l.rel === 'alternate').href.split('?')[0].split('#')[0];

        // Do not show the post the user is currently reading
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
        if (count === 4) break; // Display only 4 posts
    }

    html += '</div>';
    document.getElementById('related-grid-box').innerHTML = html;
}
