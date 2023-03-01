let fs = require('fs')
const content = fs.readFileSync("sample.txt", 'utf8');

console.log(getParties(content));

function getDate(s) {
    let begin = indexOf(s, 'Date', 'Date', 0, 200);

    if (s[begin] == ':') {
        begin = begin + 1;
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

function indexOf(s, target, other = target, begin = 0, end = s.length) {
    end = Math.min(end, s.length);
    let l1 = target.length;
    let l2 = other.length;

    for (let i = begin; i <= end - target.length; i++) {
        if (i - l1 >= begin && s.substring(i - l1, i) == target) {
            return i;
        }

        if (i - l2 >= begin && s.substring(i - l2, i) == other) {
            return i;
        }
    }

    return -1;
}


function getCasesReferredTo(s) {
    let begin = indexOf(s, 'CASES REFERRED TO');

    if (s[begin] == ':') {
        begin = begin + 1;
    }

    let max_limit = s.length;
    let cur = begin;

    const regex = /(?<=^\(\d+\)\s).*?(?=\s*\(\d+\)\s|\s*$)/gm;

    return s.match(regex);
}

function getParties(s) {
    const regex = /([a-zA-Z\s.]+)\s(v|vs|v.)\s([a-zA-Z\s.]+)/;
    const matches = regex.exec(s)[0].trim().split(regex);

    let plaintiff = matches[1];
    let defendant = matches[3];
    return [plaintiff, defendant];
}


function getDivision(s) {
    let begin = indexOf(s, 'Division');

    if (s[begin] == ':') {
        begin = begin + 1;
    }

    let max_limit = begin + 150;
    let cur = begin;
    while (cur < max_limit) {
        if (s.substring(cur, cur + 4) == 'Date') {
            max_limit = cur - 1;
        }
        cur = cur + 1;
    }
    let regex = /[,;]/;

    let res = s.substring(begin, max_limit).trim()

    let vals = res.split(regex);

    return [vals[0], vals[vals.length - 1], "GHANA"];
}


function getJudges(s) {
    const cm = /[\s,.()]+/;
    const cap = /[A-Z]/;

    let begin = indexOf(s, 'Before', 'CORAM', 0);
    if (s[begin] == ':') {
        begin = begin + 1;
    }

    let end = Math.min(s.length, begin + 400);
    let cur = begin;

    while (cur < end) {
        while (cur < end && s[cur].match(cm)) {
            cur += 1;
        }
        let curWord = cur;
        while (cur < end && s[cur].match(cap)) {
            cur += 1;
        }

        if (cur < end && !s[cur].match(cm)) {
            end = curWord;
        }
    }

    let res = s.substring(begin, end);

    const items = res.split(/[\s,]+AND[\s,]+|[,]/);

    const judges = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i].trim();
        if (item.length > 0) {
            judges.push(item);
        }
    }
    return judges;
}