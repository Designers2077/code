/* ब्लगर फिड तान्ने स्क्रिप्ट */
function getCategoryPosts(label, targetId) {
  var blogUrl = window.location.origin;
  var encodedLabel = encodeURIComponent(label);
  var script = document.createElement('script');
  
  script.src = blogUrl + '/feeds/posts/default/-/' + encodedLabel + '?alt=json-in-script&callback=res_' + targetId + '&max-results=5';
  document.body.appendChild(script);

  window['res_' + targetId] = function(json) {
    var html = '';
    var container = document.getElementById('content-' + targetId);
    
    if (json.feed && json.feed.entry) {
      for (var i = 0; i < json.feed.entry.length; i++) {
        var entry = json.feed.entry[i];
        var title = entry.title.$t;
        var link = "";
        for (var k = 0; k < entry.link.length; k++) {
          if (entry.link[k].rel == 'alternate') { link = entry.link[k].href; break; }
        }
        var thumb = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', 'w300-h200-c') : 'https://via.placeholder.com/120x80';
        
        html += '<div class="news-item">' +
                  '<img src="' + thumb + '" alt="' + title + '">' +
                  '<a href="' + link + '">' + title + '</a>' +
                '</div>';
      }
      container.innerHTML = html;
    } else {
      container.innerHTML = "<p>No posts found in " + label + ".</p>";
    }
  };
}
