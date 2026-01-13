/* news-script.js मा यो खण्ड खोज्नुहोस् र बदल्नुहोस् */

// जुन ब्लगको समाचार देखाउने हो, त्यसको URL यहाँ राख्नुहोस्
const targetBlog = "https://thedesigners7.blogspot.com/"; 

// JSONP मार्फत डेटा लोड गर्ने फङ्क्सन
const script = document.createElement('script');

// यहाँ 'targetBlog' थपिएको छ जसले गर्दा अन्य ब्लगको फिड तानिन्छ
script.src = targetBlog + "/feeds/posts/default?alt=json-in-script&max-results=20&callback=setupNews";

document.body.appendChild(script);
