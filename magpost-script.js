function renderMagPosts(json) {
    var entries = json.feed.entry;
    var container = document.getElementById('magpost-grid-box');
    if (!entries) { container.innerHTML = "Post not found!"; return; }

    var leftSection = '<div class="magpost-left">';
    var rightSection = '<div class="magpost-right">';
    var subGrid = '<div class="magpost-bottom-grid">';

    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var title = entry.title.$t;
        var link = entry.link.find(l => l.rel === 'alternate').href;
        var img = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', 'w600-h400-c') : 'https://via.placeholder.com/600x400';

        if (i === 0) {
            // First Main Post
            leftSection += `<div class="mag-card mag-main-item"><a href="${link}"><img src="${img}"><h2 class="mag-headline">${title}</h2></a></div>`;
        } else if (i === 1 || i === 2) {
            // Sub 2 Grid Posts
            subGrid += `<div class="mag-card mag-grid-item"><a href="${link}"><img src="${img}"><h2 class="mag-headline">${title}</h2></a></div>`;
        } else {
            // Right Side List
            rightSection += `
                <div class="mag-list-item">
                    <a href="${link}"><img src="${img}"></a>
                    <a href="${link}"><h2 class="mag-headline">${title}</h2></a>
                </div>`;
        }
    }

    subGrid += '</div>'; 
    leftSection += subGrid + '</div>'; 
    rightSection += '</div>'; 

    container.innerHTML = leftSection + rightSection;
}
