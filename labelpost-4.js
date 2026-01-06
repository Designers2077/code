/* * Name: labelpost-4
 * Function: Grid Layout (1 Main + 2 Small Horizontal)
 */

function labelpost_4(json) {
    // सिधै स्क्रिप्ट ट्याग भन्दा माथिको डिभमा डाटा भर्ने
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];
    const container = currentScript.previousElementSibling;

    if (!json.feed.entry) {
        container.innerHTML = "No posts found!";
        return;
    }

    let entries = json.feed.entry;
    let htmlContent = '';

    // --- पहिलो ठूलो पोस्ट ---
    let fPost = entries[0];
    let fTitle = fPost.title.$t;
    let fLink = fPost.link.find(l => l.rel === 'alternate').href;
    let fThumb = fPost.media$thumbnail ? fPost.media$thumbnail.url.replace('s72-c', 's600') : 'https://via.placeholder.com/600x400';

    htmlContent += `
        <div class="lp4-main">
            <a href="${fLink}"><img src="${fThumb}" alt="${fTitle}"/></a>
            <h3 class="lp4-main-title"><a href="${fLink}">${fTitle}</a></h3>
        </div>
        <div class="lp4-bottom-row">`;

    // --- तलका २ वटा साना पोस्टहरू ---
    for (let i = 1; i <= 2; i++) {
        if (entries[i]) {
            let p = entries[i];
            let pTitle = p.title.$t;
            let pLink = p.link.find(l => l.rel === 'alternate').href;
            let pThumb = p.media$thumbnail ? p.media$thumbnail.url.replace('s72-c', 's200') : 'https://via.placeholder.com/150';

            htmlContent += `
                <div class="lp4-small-item">
                    <a href="${pLink}"><img src="${pThumb}" alt="${pTitle}"/></a>
                    <h4 class="lp4-small-title"><a href="${pLink}">${pTitle}</a></h4>
                </div>`;
        }
    }

    htmlContent += `</div>`;
    container.innerHTML = htmlContent;
}
