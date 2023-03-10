const lawfileUrls = [];
performChallenge(lawfileUrls);
const solver = require('./perform');

function performChallenge(urls) {
    urls.forEach(url => solver.kwamilize(url));
}
