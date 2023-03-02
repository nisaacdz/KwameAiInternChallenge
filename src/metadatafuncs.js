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

function getJudgement(date) {
    let dmy = date.split(/\s/);
    let d, month, y;
    let m;

    for (var val of dmy) {
        if (val.length == 1) {
            d = '0' + val;
        } else if (val.length == 2) {
            d = val;
        } else if (val.length == 4) {
            y = val;
        } else {
            m = val;
            switch (val.toLowerCase()) {
                case "january":
                    month = "01";
                    break;
                case "february":
                    month = "02";
                    break;
                case "march":
                    month = "03";
                    break;
                case "april":
                    month = "04";
                    break;
                case "may":
                    month = "05";
                    break;
                case "june":
                    month = "06";
                    break;
                case "july":
                    month = "07";
                    break;
                case "august":
                    month = "08";
                    break;
                case "september":
                    month = "09";
                    break;
                case "october":
                    month = "10";
                    break;
                case "november":
                    month = "11";
                    break;
                case "december":
                    month = "12";
                    break;
                default:
                    month = "unknown";
                    break;
            }
        }
    }

    let fulldate = y + "-" + month + "-" + d + "T00:00:00.000Z";
    let year = parseInt(y);
    let day = parseInt(d);
    return {
        "date": fulldate,
        "year": year,
        "month": m,
        "day": day
    };
}



function getSource(s) {
    return "Ghana Law Reports";
}


function getCasesReferredTo(s) {
    let begin = indexOf(s, 'CASES REFERRED TO');

    if (s[begin] == ':') {
        begin = begin + 1;
    }

    s = s.substring(begin)

    //const regex = /(?<=^\(\d+\)\s).*?(?=\s*\(\d+\)\s|\s*$)/gm; captures (2013)
    // const regex = /(?<=^\(\d{2}\)\s).*?(?=\s*\(\d{2}\)\s|\s*$)/gm; doesn't capture (1)
    const regex = /(?<=^\(\d{1,2}\)\s).*?(?=\s*\(\d{1,2}\)\s|\s*$)/gm;

    return s.match(regex);
}

function getParties(s) {
    const regex = /([a-zA-Z\s.]+)\s(v|vs|v.)\s([a-zA-Z\s.]+)/;
    const matches = regex.exec(s)[0].trim().split(regex);

    let plaintiff = matches[1];
    let defendant = matches[3];
    return [plaintiff, defendant];
}


function getCourt(s) {
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

    return {
        "name": vals[0],
        "location": {
            "city": vals[vals.length - 1],
            "country": "GHANA"
        }
    };
}


function getJudges(s) {
    const cm = /[\s,.()]+/;
    const cap = /[A-Z]/;

    let begin = indexOf(s, 'Before', 'CORAM', 0, 800);
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


module.exports = { getDate, getCourt, getJudgement, getJudges, getCasesReferredTo, getSource, getParties };