/* * Name: labelpost-5
 * Function: Layout (1 Large Top + 3 Small Bottom)
 */

function labelpost_5(json) {
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];
    const container = currentScript.previousElementSibling;

    if (!json.feed.entry) {
        container.innerHTML = "No posts found!";
        return;
    }

    let entries = json.feed.entry;
    let htmlContent = '';

    // --- १. मुख्य ठूलो पोस्ट (माथिल्लो भाग) ---
    let fPost = entries[0];
    let fTitle = fPost.title.$t;
    let fLink = fPost.link.find(l => l.rel === 'alternate').href;
    let fThumb = fPost.media$thumbnail ? fPost.media$thumbnail.url.replace('s72-c', 's1600') : 'https://via.placeholder.com/800x450';

    htmlContent += `
        <div class="lp5-top-featured">
            <div class="lp5-main-item">
                <a href="${fLink}"><img src="${fThumb}" alt="${fTitle}"/></a>
                <h2 class="lp5-main-title"><a href="${fLink}">${fTitle}</a></h2>
            </div>
        </div>
        <div class="lp5-bottom-grid">`;

    // --- २. मुनिका ३ वटा साना पोस्टहरू ---
    for (let i = 1; i <= 3; i++) {
        if (entries[i]) {
            let p = entries[i];
            let pTitle = p.title.$t;
            let pLink = p.link.find(l => l.rel === 'alternate').href;
            let pThumb = p.media$thumbnail ? p.media$thumbnail.url.replace('s72-c', 's400') : 'https://via.placeholder.com/400x250';

            htmlContent += `
                <div class="lp5-small-item">
                    <a href="${pLink}"><img src="${pThumb}" alt="${pTitle}"/></a>
                    <h3 class="lp5-small-title"><a href="${pLink}">${pTitle}</a></h3>
                </div>`;
        }
    }

    htmlContent += `</div>`;
    container.innerHTML = htmlContent;
}
