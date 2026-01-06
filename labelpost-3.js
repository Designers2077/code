/* * Name: labelpost-3
 * Function: Callback function to render posts in 1+3 layout
 */

function labelpost_3(json) {
    const container = document.getElementById('labelpost-3-container');
    if (!container || !json.feed.entry) return;

    let entries = json.feed.entry;
    let htmlContent = '';

    // पहिलो पोस्ट (ठूलो इमेज र टाइटल)
    let fPost = entries[0];
    let fTitle = fPost.title.$t;
    let fLink = fPost.link.find(l => l.rel === 'alternate').href;
    let fThumb = fPost.media$thumbnail ? fPost.media$thumbnail.url.replace('s72-c', 's1600') : 'https://via.placeholder.com/600x400';

    htmlContent += `
        <div class="lp3-main-wrapper">
            <div class="lp3-main-item">
                <a href="${fLink}"><img src="${fThumb}" alt="${fTitle}"/></a>
                <h2 class="lp3-main-title"><a href="${fLink}">${fTitle}</a></h2>
            </div>
        </div>
        <div class="lp3-side-wrapper">`;

    // अन्य ३ वटा साना पोस्टहरू
    for (let i = 1; i < entries.length; i++) {
        let p = entries[i];
        let pTitle = p.title.$t;
        let pLink = p.link.find(l => l.rel === 'alternate').href;
        let pThumb = p.media$thumbnail ? p.media$thumbnail.url.replace('s72-c', 's400') : 'https://via.placeholder.com/150';

        if (i === 1) {
            // दोस्रो पोस्ट (अलि ठूलो फन्ट र फुल विड्थ इमेज)
            htmlContent += `
                <div class="lp3-side-item lp3-second-post">
                    <a href="${pLink}"><img src="${pThumb}" alt="${pTitle}"/></a>
                    <h3 class="lp3-second-title"><a href="${pLink}">${pTitle}</a></h3>
                </div>`;
        } else {
            // तेस्रो र चौथो पोस्ट (इमेज साइडमा भएको स्टाइल)
            htmlContent += `
                <div class="lp3-side-item lp3-small-post">
                    <div class="lp3-small-thumb">
                        <a href="${pLink}"><img src="${pThumb}" alt="${pTitle}"/></a>
                    </div>
                    <h3 class="lp3-small-title"><a href="${pLink}">${pTitle}</a></h3>
                </div>`;
        }
    }

    htmlContent += `</div>`;
    container.innerHTML = htmlContent;
}
