// अङ्ग्रेजी अंकलाई नेपालीमा बदल्ने फंक्सन
function getNepaliNumber(n) {
    var nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return n.toString().split('').map(digit => nepaliDigits[digit]).join('');
}

function renderHeadlinesWithPost(jsonH, jsonF) {
    // १० वटा हेडलाइन लोड गर्ने
    var hPosts = jsonH.feed.entry || [];
    var hHtml = "";
    hPosts.forEach((e, index) => {
        var link = e.link.find(l => l.rel === 'alternate').href;
        
        // यहाँ नेपाली अंक प्रयोग गरिएको छ
        var nepaliIndex = getNepaliNumber(index + 1);

        hHtml += `
            <div class="mn-list-item">
                <div class="mn-number">${nepaliIndex}</div>
                <a href="${link}">${e.title.$t}</a>
            </div>`;
    });
    document.getElementById("mn-headline-list").innerHTML = hHtml;

    // मुख्य समाचार लोड गर्ने (यसमा कुनै परिवर्तन छैन)
    var fPosts = jsonF.feed.entry || [];
    if (!fPosts.length) return;

    var main = fPosts[0];
    var mImg = main.media$thumbnail ? main.media$thumbnail.url.replace('s72-c', 's800') : 'https://via.placeholder.com/800x400';
    var mLink = main.link.find(l => l.rel === 'alternate').href;

    var fHtml = `
        <div class="mn-main-card">
            <a href="${mLink}"><img src="${mImg}"></a>
            <h2><a href="${mLink}">${main.title.$t}</a></h2>
        </div>
        <div class="mn-sub-grid">`;

    for (var i = 1; i < Math.min(fPosts.length, 3); i++) {
        var sub = fPosts[i];
        var sImg = sub.media$thumbnail ? sub.media$thumbnail.url.replace('s72-c', 's400') : 'https://via.placeholder.com/400x250';
        var sLink = sub.link.find(l => l.rel === 'alternate').href;
        fHtml += `
            <div class="mn-sub-card">
                <a href="${sLink}"><img src="${sImg}"></a>
                <h3><a href="${sLink}">${sub.title.$t}</a></h3>
            </div>`;
    }
    fHtml += `</div>`;
    document.getElementById("mn-feature-box").innerHTML = fHtml;
}

function initHeadlinesWithPost(catH, catF) {
    var s1 = document.createElement('script');
    s1.src = `/feeds/posts/default/-/${encodeURIComponent(catH)}?alt=json-in-script&callback=mnCBH&max-results=10`;
    
    var s2 = document.createElement('script');
    s2.src = `/feeds/posts/default/-/${encodeURIComponent(catF)}?alt=json-in-script&callback=mnCBF&max-results=3`;
    
    window.mnCBH = j => { window.hData = j; if(window.fData) renderHeadlinesWithPost(window.hData, window.fData); };
    window.mnCBF = j => { window.fData = j; if(window.hData) renderHeadlinesWithPost(window.hData, window.fData); };

    document.head.appendChild(s1);
    document.head.appendChild(s2);
}
