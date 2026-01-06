function renderLabelPost9(json, targetId) {
    var container = document.getElementById(targetId);
    var entries = json.feed.entry;
    var html = "";

    function getPostData(entry) {
        var title = entry.title.$t;
        var link = entry.link.find(l => l.rel == 'alternate').href;
        // गुणस्तरीय फोटोको लागि
        var img = entry.media$thumbnail ? entry.media$thumbnail.url.replace("s72-c", "w640-h480-c") : "https://via.placeholder.com/640x480";
        return { title, link, img };
    }

    if (entries && entries.length >= 4) {
        // १. मुख्य ठूलो पोस्ट (बायाँ पट्टि)
        var p1 = getPostData(entries[0]);
        html += `<div class="lp9-main"><a href="${p1.link}"><img src="${p1.img}"/></a><div class="lp9-title-main"><a href="${p1.link}">${p1.title}</a></div></div>`;

        // दायाँ पट्टिको कोलम सुरु
        html += `<div class="lp9-side-col">`;
        
        // २. दोस्रो पोस्ट (दायाँ माथि - अलि ठूलो)
        var p2 = getPostData(entries[1]);
        html += `<div class="lp9-side-med"><a href="${p2.link}"><img src="${p2.img}"/></a><div class="lp9-title-med"><a href="${p2.link}">${p2.title}</a></div></div>`;

        // ३. र ४. साना पोस्टहरू (दायाँ तल)
        for (var i = 2; i < 4; i++) {
            var p = getPostData(entries[i]);
            html += `<div class="lp9-side-small"><div class="lp9-thumb-s"><a href="${p.link}"><img src="${p.img}"/></a></div><div class="lp9-title-s"><a href="${p.link}">${p.title}</a></div></div>`;
        }
        
        html += `</div>`; // कोलम बन्द
        container.innerHTML = html;
    }
}
