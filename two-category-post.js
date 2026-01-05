function renderCategoryPosts(json, divId) {
    var html = "";
    var posts = json.feed.entry || [];
    
    for (var i = 0; i < posts.length; i++) {
        var entry = posts[i];
        var title = entry.title.$t;
        var link = "";
        
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'alternate') {
                link = entry.link[k].href;
                break;
            }
        }
        
        var thumb = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', 's300-c') : 'https://via.placeholder.com/120x80';
        
        html += '<div class="post-item">';
        html += '<img src="' + thumb + '" alt="' + title + '">';
        html += '<a href="' + link + '" title="' + title + '">' + title + '</a>';
        html += '</div>';
    }
    document.getElementById(divId).innerHTML = html;
}

function callbackNews(json) { renderCategoryPosts(json, "cat-news-content"); }
function callbackArticle(json) { renderCategoryPosts(json, "cat-article-content"); }

function initCategoryWidget(catOne, catTwo) {
    var s1 = document.createElement('script');
    s1.src = '/feeds/posts/default/-/' + encodeURIComponent(catOne) + '?alt=json-in-script&callback=callbackNews&max-results=4';
    document.body.appendChild(s1);

    var s2 = document.createElement('script');
    s2.src = '/feeds/posts/default/-/' + encodeURIComponent(catTwo) + '?alt=json-in-script&callback=callbackArticle&max-results=4';
    document.body.appendChild(s2);
}
