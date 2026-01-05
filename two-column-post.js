/* Updated: two-column-post.js */
function getCategoryPosts(label, targetId) {
  var blogUrl = window.location.origin;
  
  // नेपाली अक्षरहरूलाई सुरक्षित रूपमा Encode गर्ने (उदा: 'समाचार' -> '%E0%A4%B8%E0%A4%AE%E0%A4%BE%E0%A4%9A%E0%A4%BE%E0%A4%B0')
  var encodedLabel = encodeURIComponent(label.trim());
  
  var scriptURL = blogUrl + '/feeds/posts/default/-/' + encodedLabel + '?alt=json-in-script&callback=res_' + targetId + '&max-results=5';
  
  var script = document.createElement('script');
  script.src = scriptURL;
  script.type = 'text/javascript';
  
  // यदि फिड लोड भएन भने एरर देखाउने
  script.onerror = function() {
    document.getElementById('content-' + targetId).innerHTML = "<p>फिड लोड हुन सकेन।</p>";
  };
  
  document.body.appendChild(script);

  window['res_' + targetId] = function(json) {
    var html = '';
    var container = document.getElementById('content-' + targetId);
    
    if (json.feed && json.feed.entry && json.feed.entry.length > 0) {
      for (var i = 0; i < json.feed.entry.length; i++) {
        var entry = json.feed.entry[i];
        var title = entry.title.$t;
        var link = "";
        
        // सुरक्षित लिङ्क खोजी
        for (var k = 0; k < entry.link.length; k++) {
          if (entry.link[k].rel == 'alternate') { 
            link = entry.link[k].href; 
            break; 
          }
        }
        
        // थम्बनेल साइज सुधारिएको (w400-h280-c)
        var thumb = entry.media$thumbnail 
          ? entry.media$thumbnail.url.replace('s72-c', 'w400-h280-c') 
          : 'https://via.placeholder.com/140x90?text=No+Image';
        
        html += '<div class="news-item">' +
                  '<img src="' + thumb + '" alt="' + title + '">' +
                  '<a href="' + link + '">' + title + '</a>' +
                '</div>';
      }
      container.innerHTML = html;
    } else {
      container.innerHTML = "<p style='font-size:13px;color:#666;'>'" + label + "' क्याटगरीमा पोस्ट भेटिएन।</p>";
    }
  };
}
