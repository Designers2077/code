/* * Name: labelpost-6 (Nepali Numbers)
 * Function: Dual Column Layout with Nepali Numbering
 */

function labelpost_6(json) {
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];
    const container = currentScript.previousElementSibling;

    if (!json.feed.entry) {
        container.innerHTML = "No posts found!";
        return;
    }

    // अंग्रेजी अंकलाई नेपालीमा बदल्ने फङ्सन
    const toNepaliNum = (n) => {
        const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        return n.toString().split('').map(digit => nepaliDigits[digit]).join('');
    };

    let entries = json.feed.entry;
    let leftListHtml = '';
    let rightGridHtml = '';

    // --- देब्रे कोलम: हेडलाइन्स लिस्ट ---
    leftListHtml += `<div class="lp6-left-col"><div class="lp6-section-title">हेडलाइन्स</div><ul class="lp6-list">`;
    for (let i = 0; i < entries.length; i++) {
        let title = entries[i].title.$t;
        let link = entries[i].link.find(l => l.rel === 'alternate').href;
        // यहाँ नम्बरलाई नेपालीमा बदलिएको छ
        leftListHtml += `<li><span class="lp6-number">${toNepaliNum(i + 1)}</span><a href="${link}">${title}</a></li>`;
    }
    leftListHtml += `</ul></div>`;

    // --- दाहिने कोलम: फिचर्ड ग्रिड ---
    if (entries.length > 0) {
        let fPost = entries[0];
        let fTitle = fPost.title.$t;
        let fLink = fPost.link.find(l => l.rel === 'alternate').href;
        let fThumb = fPost.media$thumbnail ? fPost.media$thumbnail.url.replace('s72-c', 's1600') : 'https://via.placeholder.com/600x400';

        rightGridHtml += `<div class="lp6-right-col">
            <div class="lp6-section-title main-news-title">मुख्य समाचार</div>
            <div class="lp6-main-feat">
                <a href="${fLink}"><img src="${fThumb}" alt="${fTitle}"/></a>
                <h2 class="lp6-main-title"><a href="${fLink}">${fTitle}</a></h2>
            </div>
            <div class="lp6-sub-grid">`;

        for (let j = 1; j <= 2; j++) {
            if (entries[j]) {
                let p = entries[j];
                let pTitle = p.title.$t;
                let pLink = p.link.find(l => l.rel === 'alternate').href;
                let pThumb = p.media$thumbnail ? p.media$thumbnail.url.replace('s72-c', 's400') : 'https://via.placeholder.com/300x200';
                rightGridHtml += `
                    <div class="lp6-sub-item">
                        <a href="${pLink}"><img src="${pThumb}" alt="${pTitle}"/></a>
                        <h3 class="lp6-sub-title"><a href="${pLink}">${pTitle}</a></h3>
                    </div>`;
            }
        }
        rightGridHtml += `</div></div>`;
    }

    container.innerHTML = `<div class="lp6-flex-row">${leftListHtml}${rightGridHtml}</div>`;
}
