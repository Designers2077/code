/* * Name: labelpost-1
 * Function: Blogger Category-wise Featured Post Loader
 * Description: Fetches posts by label and displays in 1+3 grid layout
 */

function labelpost_1(json) {
    const container = document.getElementById('labelpost-1-container');
    if (!container) return;

    let entries = json.feed.entry || [];
    let htmlContent = '';

    if (entries.length > 0) {
        // --- First Post (Main Large) ---
        let firstPost = entries[0];
        let fTitle = firstPost.title.$t;
        let fLink = firstPost.link.find(l => l.rel === 'alternate').href;
        let fThumb = firstPost.media$thumbnail ? firstPost.media$thumbnail.url.replace('s72-c', 's1600') : 'https://via.placeholder.com/600x400';

        htmlContent += `
            <div class="lp1-main-wrapper">
                <div class="lp1-main-item">
                    <a href="${fLink}"><img src="${fThumb}" alt="${fTitle}"/></a>
                    <h2 class="lp1-main-title"><a href="${fLink}">${fTitle}</a></h2>
                </div>
            </div>`;

        // --- Side Posts Wrapper ---
        htmlContent += `<div class="lp1-side-wrapper">`;

        for (let i = 1; i < entries.length; i++) {
            let p = entries[i];
            let pTitle = p.title.$t;
            let pLink = p.link.find(l => l.rel === 'alternate').href;
            let pThumb = p.media$thumbnail ? p.media$thumbnail.url.replace('s72-c', 's400') : 'https://via.placeholder.com/150';

            if (i === 1) {
                // 2nd Post (Medium size below main image in sketch)
                htmlContent += `
                    <div class="lp1-side-item lp1-second-post">
                        <a href="${pLink}"><img src="${pThumb}" alt="${pTitle}"/></a>
                        <h3 class="lp1-second-title"><a href="${pLink}">${pTitle}</a></h3>
                    </div>`;
            } else {
                // 3rd & 4th Post (Small side-by-side style)
                htmlContent += `
                    <div class="lp1-side-item lp1-small-post">
                        <div class="lp1-small-thumb">
                            <a href="${pLink}"><img src="${pThumb}" alt="${pTitle}"/></a>
                        </div>
                        <h3 class="lp1-small-title"><a href="${pLink}">${pTitle}</a></h3>
                    </div>`;
            }
        }
        htmlContent += `</div>`; // Close side-wrapper
    }

    container.innerHTML = htmlContent;
}

// Function to initialize the widget
function initLabelPost(labelName) {
    const script = document.createElement('script');
    script.src = `/feeds/posts/default/-/${labelName}?alt=json-in-script&max-results=4&callback=labelpost_1`;
    document.body.appendChild(script);
}
