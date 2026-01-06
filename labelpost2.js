function getFeaturedPosts(json) {
    const container = document.getElementById('featured-content');
    let posts = json.feed.entry;
    let html = '';

    // Main Featured Post (1st)
    let firstPost = posts[0];
    let firstTitle = firstPost.title.$t;
    let firstImg = firstPost.media$thumbnail.url.replace('s72-c', 's1600');
    let firstLink = firstPost.link.find(l => l.rel === 'alternate').href;

    html += `<div class="main-post">
                <a href="${firstLink}"><img src="${firstImg}" alt="${firstTitle}"></a>
                <h2>${firstTitle}</h2>
            </div><div class="side-posts">`;

    // 2nd Post
    let secPost = posts[1];
    let secImg = secPost.media$thumbnail.url.replace('s72-c', 's400');
    html += `<div class="side-post-item second-post">
                <a href="${secPost.link[4].href}"><img src="${secImg}"></a>
                <h3>${secPost.title.$t}</h3>
             </div>`;

    // 3rd and 4th Post
    for (let i = 2; i < 4; i++) {
        if(posts[i]){
            html += `<div class="side-post-item small-post">
                <img src="${posts[i].media$thumbnail.url}">
                <h3>${posts[i].title.$t}</h3>
            </div>`;
        }
    }

    html += `</div>`;
    container.innerHTML = html;
}

// Blogger API Call
let labelName = "समाचार"; // यहाँ आफ्नो क्याटगरी (Label) राख्नुहोस्
let script = document.createElement('script');
script.src = `/feeds/posts/default/-/${labelName}?alt=json-in-script&max-results=4&callback=getFeaturedPosts`;
document.body.appendChild(script);
