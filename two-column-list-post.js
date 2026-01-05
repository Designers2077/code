/* news-fetcher.js */
function fetchNews(labelName, targetId, postCount) {
  var scriptURL = '/feeds/posts/default/-/' + encodeURIComponent(labelName) + '?alt=json-in-script&callback=callback_' + targetId.replace(/-/g, '_') + '&max-results=' + postCount;
  var scriptTag = document.createElement('script');
  scriptTag.src = scriptURL;
  document.body.appendChild(scriptTag);
  
  window['callback_' + targetId.replace(/-/g, '_')] = function(data) {
    var targetDiv = document.getElementById(targetId);
    var contentHtml = '';
    
    if (data.feed.entry) {
      for (var i = 0; i < data.feed.entry.length; i++) {
        var entry = data.feed.entry[i];
        var title = entry.title.$t;
        var postUrl = entry.link.find(l => l.rel === 'alternate').href;
        var thumbUrl = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', 'w400-h280-c') : 'https://via.placeholder.com/140x90';
        
        contentHtml += `<div class="custom-post-item">
                          <img src="${thumbUrl}" alt="${title}">
                          <a href="${postUrl}">${title}</a>
                        </div>`;
      }
    }
    targetDiv.innerHTML = contentHtml;
  };
}
