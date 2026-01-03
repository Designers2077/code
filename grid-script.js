/**
 * Blogger Recent Posts Grid Script
 * Fetches data and renders a 4-column/2-column grid
 */

function renderGridPosts(json) {
    var entries = json.feed.entry;
    var html = '<div class="post-grid-container">';

    if (!entries) {
        document.getElementById('post-grid-box').innerHTML = "No posts found.";
        return;
    }

    // Number of posts to show (e.g., 4)
    var postsLimit = 4; 

    for (var i = 0; i < postsLimit; i++) {
        if (entries[i]) {
            var post = entries[i];
            var title = post.title.$t;
            var link = "";
            
            // Find the correct post link
            for (var j = 0; j < post.link.length; j++) {
                if (post.link[j].rel === 'alternate') {
                    link = post.link[j].href;
                    break;
                }
            }
            
            // Image Processing: Converting small thumb to high-quality square
            var img = post.media$thumbnail 
                ? post.media$thumbnail.url.replace('s72-c', 's400-c') 
                : 'https://via.placeholder.com/400x400?text=No+Image';

            // Generate HTML structure
            html += '<article class="grid-post">';
            html += '<div class="grid-image"><a href="' + link + '"><img src="' + img + '" alt="' + title + '"/></a></div>';
            html += '<h2 class="grid-title"><a href="' + link + '">' + title + '</a></h2>';
            html += '</article>';
        }
    }

    html += '</div>';
    
    // Injecting into the Blogger Widget
    var displayDiv = document.getElementById('post-grid-box');
    if (displayDiv) {
        displayDiv.innerHTML = html;
    }
}
