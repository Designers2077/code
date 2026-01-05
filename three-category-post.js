function renderCategoryPosts(json, divId) {
    var html = "";
    var posts = json.feed.entry || [];
    
    for (var i = 0; i < posts.length; i++) {
        var entry = posts[i];
        var title = entry.title.$t;
        var link = "";
        
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'alternate') { link = entry.link[k].href; break; }
        }
        
        // Quality थम्बनेल - s600 प्रयोग गर्दा सफा देखिन्छ
        var thumb = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', 's600') : 'https://via.placeholder.com/600x338';
        
        html += '<div class="post-item">';
        html += '<img src="' + thumb + '" alt="' + title + '">';
        html += '<a href="' + link + '">' + title + '</a>';
        html += '</div>';
    }
    document.getElementById(divId).innerHTML = html;
}

// कलव्याकहरू
function callbackOne(json) { renderCategoryPosts(json, "cat-one-content"); }
function callbackTwo(json) { renderCategoryPosts(json, "cat-two-content"); }
function callbackThree(json) { renderCategoryPosts(json, "cat-three-content"); }

function initCategoryWidget(catOne, catTwo, catThree) {
    var s1 = document.createElement('script');
    s1.src = '/feeds/posts/default/-/' + encodeURIComponent(catOne) + '?alt=json-in-script&callback=callbackOne&max-results=4';
    document.body.appendChild(s1);

    var s2 = document.createElement('script');
    s2.src = '/feeds/posts/default/-/' + encodeURIComponent(catTwo) + '?alt=json-in-script&callback=callbackTwo&max-results=4';
    document.body.appendChild(s2);

    if (catThree) {
        var s3 = document.createElement('script');
        s3.src = '/feeds/posts/default/-/' + encodeURIComponent(catThree) + '?alt=json-in-script&callback=callbackThree&max-results=4';
        document.body.appendChild(s3);
    }
}
