const lawfileUrls = ["../input/v1.pdf"];
const solver = require('./perform');

performChallenge(lawfileUrls);

function performChallenge(urls) {
    for (var i = 0; i < urls.length; i++) {
        try{
            solver.kwamilize(urls[i])
        } catch(error) {
            console.log(error)
        }
    }
}
