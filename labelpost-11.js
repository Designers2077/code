/**
 * LabelPost-11: Custom Functions for Blogger
 */

// १. बायाँ पट्टिको लिस्ट (Headlines) का लागि
function labelpost11List(json, targetId) {
    var container = document.getElementById(targetId);
    var entries = json.feed.entry;
    var html = '<div class="lp11-head">ताजा हेडलाइन्स</div>';
    
    if (entries) {
        for (var i = 0; i < entries.length; i++) {
            var title = entries[i].title.$t;
            var link = entries[i].link.find(function(l) { return l.rel == 'alternate'; }).href;
            
            html += '<div class="lp11-list-item">' +
                        '<span class="lp11-num">' + (i + 1) + '</span>' +
                        '<div class="lp11-list-text"><a href="' + link + '">' + title + '</a></div>' +
                     '</div>';
        }
        container.innerHTML = html;
    }
}

// २. दायाँ पट्टिको ग्रिड (Featured/Main) का लागि
function labelpost11Grid(json, targetId) {
    var container = document.getElementById(targetId);
    var entries = json.feed.entry;
    var html = '<div class="lp11-head">विशेष समाचार</div>';
    
    if (entries) {
        // मुख्य ठूलो कार्ड
        var mTitle = entries[0].title.$t;
        var mLink = entries[0].link.find(function(l) { return l.rel == 'alternate'; }).href;
        var mImg = entries[0].media$thumbnail ? entries[0].media$thumbnail.url.replace("s72-c", "w800-h500-c") : "https://via.placeholder.com/800x500";
        
        html += '<div class="lp11-main-card">' +
                    '<a href="' + mLink + '"><img src="' + mImg + '" alt="' + mTitle + '"/></a>' +
                    '<div class="lp11-overlay">' +
                        '<h2 class="lp11-main-title"><a href="' + mLink + '">' + mTitle + '</a></h2>' +
                    '</div>' +
                 '</div>';
        
        // साना २ वटा पोस्टहरूको ग्रिड
        html += '<div class="lp11-grid-row">';
        for (var j = 1; j < Math.min(3, entries.length); j++) {
            var sTitle = entries[j].title.$t;
            var sLink = entries[j].link.find(function(l) { return l.rel == 'alternate'; }).href;
            var sImg = entries[j].media$thumbnail ? entries[j].media$thumbnail.url.replace("s72-c", "w400-h250-c") : "https://via.placeholder.com/400x250";
            
            html += '<div class="lp11-sub-card">' +
                        '<div class="lp11-sub-thumb"><a href="' + sLink + '"><img src="' + sImg + '"/></a></div>' +
                        '<h3 class="lp11-sub-title"><a href="' + sLink + '">' + sTitle + '</a></h3>' +
                     '</div>';
        }
        html += '</div>';
        container.innerHTML = html;
    }
}
