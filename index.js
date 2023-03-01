let fs = require('fs')
const content = fs.readFileSync("sample.txt", 'utf8');

console.log(getJudges(content));

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

function getParties(s) {
    const regex = /([a-zA-Z\s.]+)\s(v|vs|v.)\s([a-zA-Z\s.]+)/;
    const matches = regex.exec(s)[0].trim().split(regex);

    let plaintiff = matches[1];
    let defendant = matches[3];
    return [plaintiff, defendant];
}


function get_division(s) {
    let begin = indexOf(s, 'Division', 0, 300);

    if (s[begin + 8] == ':') {
        begin = begin + 9;
    } else {
        begin = begin + 8;
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

    console.log(res);

    let vals = res.split(regex);

    return [vals[0], vals[vals.length - 1], "GHANA"];
}


function getJudges(s) {
    const cm = /[\s,.]+/;
    const cap = /[A-Z]/;
  
    let begin = s.indexOf('Before', 0);
    if (s[begin + 6] == ':') {
      begin = begin + 7;
    } else {
      begin = begin + 6;
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
  