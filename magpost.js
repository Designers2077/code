function renderGridPosts(json) {
    var entries = json.feed.entry;
    var container = document.getElementById('post-grid-box');
    if (!entries) { container.innerHTML = "No posts found!"; return; }

    var leftHtml = '<div class="left-section">';
    var rightHtml = '<div class="right-section">';
    var bottomGridHtml = '<div class="bottom-two-grid">';

    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var title = entry.title.$t;
        var link = entry.link.find(l => l.rel === 'alternate').href;
        var img = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', 'w600-h400-c') : 'https://via.placeholder.com/600x400';

        if (i === 0) {
            // Main Post
            leftHtml += `<div class="grid-card main-post"><a href="${link}"><img src="${img}"><h2 class="headline">${title}</h2></a></div>`;
        } else if (i === 1 || i === 2) {
            // Sub 2 Grid
            bottomGridHtml += `<div class="grid-card sub-post"><a href="${link}"><img src="${img}"><h2 class="headline">${title}</h2></a></div>`;
        } else {
            // Right Side List
            rightHtml += `<div class="list-item"><a href="${link}"><img src="${img}"></a><a href="${link}"><h2 class="headline">${title}</h2></a></div>`;
        }
    }

    bottomGridHtml += '</div>'; // close bottom-two-grid
    leftHtml += bottomGridHtml + '</div>'; // close left-section
    rightHtml += '</div>'; // close right-section

    container.innerHTML = leftHtml + rightHtml;
}
