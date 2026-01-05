/* Updated: two-column-list-post.js */
function fetchNews(labelName, targetId, postCount) {
  // ब्लगको URL पत्ता लगाउने (https सुनिश्चित गर्न)
  var blogURL = window.location.protocol + "//" + window.location.hostname;
  var scriptURL = blogURL + '/feeds/posts/default/-/' + encodeURIComponent(labelName) + '?alt=json-in-script&callback=callback_' + targetId.replace(/-/g, '_') + '&max-results=' + postCount;
  
  var scriptTag = document.createElement('script');
  scriptTag.src = scriptURL;
  scriptTag.type = 'text/javascript';
  document.body.appendChild(scriptTag);
  
  window['callback_' + targetId.replace(/-/g, '_')] = function(data) {
    var targetDiv = document.getElementById(targetId);
    if (!targetDiv) return;
    
    var contentHtml = '';
    
    if (data.feed && data.feed.entry && data.feed.entry.length > 0) {
      for (var i = 0; i < data.feed.entry.length; i++) {
        var entry = data.feed.entry[i];
        var title = entry.title.$t;
        var postUrl = "";
        
        // सुरक्षित लिङ्क खोजी
        for (var k = 0; k < entry.link.length; k++) {
          if (entry.link[k].rel === 'alternate') {
            postUrl = entry.link[k].href;
            break;
          }
        }
        
        // फोटो साइज मिलाउने (१४०x९०)
        var thumbUrl = entry.media$thumbnail 
          ? entry.media$thumbnail.url.replace('s72-c', 'w400-h280-p-k-no-nu') 
          : 'https://via.placeholder.com/140x90?text=No+Image';
        
        contentHtml += '<div class="custom-post-item">' +
                          '<div class="post-img-box"><img src="' + thumbUrl + '" alt="' + title + '"></div>' +
                          '<div class="post-title-box"><a href="' + postUrl + '">' + title + '</a></div>' +
                       '</div>';
      }
      targetDiv.innerHTML = contentHtml;
    } else {
      targetDiv.innerHTML = '<p style="padding:10px;">यो क्याटगरीमा पोस्टहरू फेला परेनन्।</p>';
    }
  };
}
