function fetchNews(labelName, targetId, postCount) {
  var scriptURL = '/feeds/posts/default/-/' + encodeURIComponent(labelName) + '?alt=json-in-script&callback=callback_' + targetId.replace(/-/g, '_') + '&max-results=' + postCount;
  var scriptTag = document.createElement('script');
  scriptTag.src = scriptURL;
  document.body.appendChild(scriptTag);
  
  window['callback_' + targetId.replace(/-/g, '_')] = function(data) {
    var targetDiv = document.getElementById(targetId);
    var contentHtml = '';
    
    if (data.feed && data.feed.entry) {
      for (var i = 0; i < data.feed.entry.length; i++) {
        var entry = data.feed.entry[i];
        var title = entry.title.$t;
        var postUrl = "";
        
        // सुरक्षित तरिकाले लिंक खोज्ने
        for (var k = 0; k < entry.link.length; k++) {
          if (entry.link[k].rel == 'alternate') {
            postUrl = entry.link[k].href;
            break;
          }
        }
        
        var thumbUrl = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', 'w400-h280-c') : 'https://via.placeholder.com/140x90';
        
        contentHtml += '<div class="custom-post-item">' +
                          '<img src="' + thumbUrl + '" alt="' + title + '">' +
                          '<a href="' + postUrl + '">' + title + '</a>' +
                       '</div>';
      }
    } else {
      contentHtml = '<p>No posts found in this category.</p>';
    }
    targetDiv.innerHTML = contentHtml;
  };
}
