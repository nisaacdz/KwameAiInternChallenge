let fs = require('fs')
const content = fs.readFileSync("sample.txt", 'utf8');

console.log(getCasesReferredTo(content));

function get_date(s) {
    let begin = indexOf(s, 'Date', 0, 200);

    if (s[begin + 4] == ':') {
        begin = begin + 5;
    } else {
        begin = begin + 4;
    }

    let max_limit = begin + 50;
    let cur = begin;
    while (cur < max_limit) {
        if (s[cur] == '\n' || (s[cur] == '\s' && s[cur - 1] == '\s')) {
            max_limit = cur;
        }
        cur = cur + 1;
    }

    return s.substring(begin, max_limit).trim()
}

function indexOf(s, target, begin = 0, end = s.length) {
    end = Math.min(end, s.length);

    for (let i = begin; i <= end - target.length; i++) {
        if (s.substring(i, i + target.length) == target) {
            return i;
        }
    }

    return -1;
}


function getCasesReferredTo(s) {
    let begin = indexOf(s, 'CASES REFERRED TO');
    
    if (s[begin + 4] == ':') {
        begin = begin + 5;
    } else {
        begin = begin + 4;
    }

    let max_limit = s.length;
    let cur = begin;

    const regex = /(?<=^\(\d+\)\s).*?(?=\s*\(\d+\)\s|\s*$)/gm;

    return s.match(regex);
}

