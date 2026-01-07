var lp10_data1 = null; // पहिलो लेबलको लागि

function renderLabelPost10(json2, targetId) {
    var container = document.getElementById(targetId);
    var html = "";

    function getData(entry) {
        if(!entry) return null;
        var title = entry.title.$t;
        var link = entry.link.find(l => l.rel == 'alternate').href;
        var img = entry.media$thumbnail ? entry.media$thumbnail.url.replace("s72-c", "w640-h480-c") : "https://via.placeholder.com/640x480";
        return { title, link, img };
    }

    // यदि पहिलो लेबलको डाटा अझै आएको छैन भने पर्खने
    if (!lp10_data1) {
        console.log("Waiting for Label 1...");
        return;
    }

    html += '<div class="lp10-flex">';
    
    // १. बायाँ भाग (Label 1 बाट हेडलाइन्स)
    html += '<div class="lp10-list-side"><div class="lp10-head">हेडलाइन्स</div>';
    var entries1 = lp10_data1.feed.entry;
    if (entries1) {
        for (var i = 0; i < Math.min(10, entries1.length); i++) {
            var p = getData(entries1[i]);
            html += `<div class="lp10-list-item"><span class="lp10-num">${i + 1}</span><a href="${p.link}">${p.title}</a></div>`;
        }
    }
    html += '</div>';

    // २. दायाँ भाग (Label 2 बाट मुख्य समाचार)
    html += '<div class="lp10-main-side"><div class="lp10-head">मुख्य समाचार</div>';
    var entries2 = json2.feed.entry;
    if (entries2) {
        var main = getData(entries2[0]);
        html += `<div class="lp10-big"><a href="${main.link}"><img src="${main.img}"/></a><h2 class="lp10-big-title"><a href="${main.link}">${main.title}</a></h2></div>`;
        html += '<div class="lp10-bottom-row">';
        for (var j = 1; j < Math.min(3, entries2.length); j++) {
            var sub = getData(entries2[j]);
            html += `<div class="lp10-sub"><a href="${sub.link}"><img src="${sub.img}"/></a><h3 class="lp10-sub-title"><a href="${sub.link}">${sub.title}</a></h3></div>`;
        }
        html += '</div>';
    }
    html += '</div></div>';
    container.innerHTML = html;
}

// पहिलो लेबलको डाटा तान्नका लागि छुट्टै फङ्सन
function collectLp10Data(json) {
    lp10_data1 = json;
}
