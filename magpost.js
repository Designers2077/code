function renderGridPosts(json) {
    var entries = json.feed.entry;
    var container = document.getElementById('post-grid-box');
    if (!entries) { container.innerHTML = "Post not found!"; return; }

    var leftSection = '<div class="left-column">';
    var rightSection = '<div class="right-column">';
    var subGrid = '<div class="bottom-grid">';

    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var title = entry.title.$t;
        var link = entry.link.find(l => l.rel === 'alternate').href;
        var img = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', 'w600-h400-c') : 'https://via.placeholder.com/600x400';

        if (i === 0) {
            // १. पहिलो ठूलो समाचार
            leftSection += `<div class="card main-item"><a href="${link}"><img src="${img}"><h2 class="headline">${title}</h2></a></div>`;
        } else if (i === 1 || i === 2) {
            // २. र ३. मुनिका ग्रिड समाचारहरू
            subGrid += `<div class="card grid-item"><a href="${link}"><img src="${img}"><h2 class="headline">${title}</h2></a></div>`;
        } else {
            // ४-९. दाहिने पट्टिका लिस्ट समाचारहरू
            rightSection += `
                <div class="list-item">
                    <a href="${link}"><img src="${img}"></a>
                    <a href="${link}"><h2 class="headline">${title}</h2></a>
                </div>`;
        }
    }

    subGrid += '</div>'; // close bottom-grid
    leftSection += subGrid + '</div>'; // close left-column
    rightSection += '</div>'; // close right-column

    container.innerHTML = leftSection + rightSection;
}
