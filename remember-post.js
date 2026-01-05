/**
 * Function Name: rememberPost
 * Description: Slides in a related post from the right when reaching footer.
 */

function rememberPost() {
    const container = document.getElementById('remember-post-container');
    
    window.addEventListener('scroll', function() {
        var docHeight = document.documentElement.scrollHeight;
        var winHeight = window.innerHeight;
        var scrollPos = window.pageYOffset || document.documentElement.scrollTop;

        // जब प्रयोगकर्ता ७५% पेज तल पुग्छ तब देखाउने
        if (scrollPos > (docHeight * 0.75)) {
            container.classList.add('show');
        } else {
            container.classList.remove('show');
        }
    });

    // डेटा तान्ने (Blogger Feed)
    fetch('/feeds/posts/default?alt=json&max-results=1')
    .then(response => response.json())
    .then(data => {
        if(data.feed.entry && data.feed.entry.length > 0) {
            var entry = data.feed.entry[0];
            var title = entry.title.$t;
            var link = entry.link.find(l => l.rel === 'alternate').href;
            var thumb = entry.media$thumbnail ? entry.media$thumbnail.url.replace('s72-c', 'w200') : 'https://via.placeholder.com/90x65';
            
            document.getElementById('remember-link-tag').innerText = title;
            document.getElementById('remember-link-tag').href = link;
            document.getElementById('remember-img-tag').src = thumb;
        }
    }).catch(err => console.error("Error loading remember post:", err));
}

// क्लोज बटनको लागि
function closeRememberPost() {
    document.getElementById('remember-post-container').style.display = 'none';
}

// पेज लोड भएपछि फङ्सन सुरु गर्ने
window.onload = rememberPost;
