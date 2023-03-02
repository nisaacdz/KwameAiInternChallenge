function getDate(s) {
    let str = s.substring(0, 200).toLowerCase();
    let begin = str.indexOf('date');

    if (begin == -1) return "";

    begin += 4;

    str = str.substring(begin);

    const regex = /\s*[\s:;]*([a-z0-9\s]*)\s*\n/;

    const matches = str.match(regex);
    let result = matches[1];

    return result.trim()
}

function trim(str) {
    return str.replace(/\n/g, " ");
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
            // the vlue of val will already be in lowercase
            switch (val) {
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
    let keyword = 'CASES REFERRED TO';
    const index = s.indexOf(keyword) + keyword.length + 1;

    if (index == -1) return [];

    // const regex = /\s+\(\d{1,2}\)\s+(.+)\n/g;

    // Searches the next 3000 chars after encountering the keyword header
    let str = s.substring(index, index + 3000);

    let fin = /\n\s*[A-Z][A-Z. ]*\n/;
    let pos = str.search(fin);

    if (pos == -1) {
        pos = str.length;
    }

    let sep = /\s+\(\d{1,2}\)\s+/;

    str = str.substring(0, pos);

    let vals = str.split(sep);

    return vals;
}

function getParties(s) {
    let str = s.substring(0, 200);
    // Matches Group of text + (either v, or vs, or v., or vs. ) + Another group of text
    const regex = /\s*.*\s+(v(?:s\.?|\.?)?)\s+.*\s*\n/g;

    let matches = regex.exec(str)[0];

    if (!matches) {
        return [];
    }

    matches = matches.trim();

    matches = matches.split(/(v(?:s\.?|\.?)?)/);

    let plaintiff = matches[0];
    let defendant = matches[2];
    return [plaintiff, defendant];
}


function getCourt(s) {
    let str = s.substring(0, 300);
    let begin = str.indexOf('Division');

    if (begin == -1) {
        return "";
    }

    begin += 8;

    let cur = begin;
    let end = begin + 300;

    let cm = /[:;,\s]/;
    let cap = /[A-Z]/;

    while (cur < end) {
        while (cur < end && str[cur].match(cm)) {
            cur += 1;
        }
        let curWord = cur;
        while (cur < end && str[cur].match(cap)) {
            cur += 1;
        }

        if (cur < end && !str[cur].match(cm)) {
            end = curWord;
        }
    }

    let sep = /[,:;]/;

    let res = str.substring(begin, end).trim();

    let vals = res.split(sep);

    if (vals.length < 2) {
        return {
            "name": trim(vals[vals.length - 1]).trim(),
            "location": {
                "city": null,
                "country": "GHANA"
            }
        };
    }

    return {
        "name": trim(vals[1]).trim(),
        "location": {
            "city": vals[vals.length - 1].trim(),
            "country": "GHANA"
        }
    };
}


function getJudges(s) {
    const cm = /[\s,;:.()]+/;
    const cap = /[A-Z]/;

    let begin = indexOf(s, 'Before', 'CORAM', 0, 800);

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

    const items = res.split(/\s*[,:;]|AND\s*/);

    const judges = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i].trim();
        if (item.length > 0) {
            judges.push(item);
        }
    }
    return judges;
}


function getHeadNotes(s) {
    let begin = indexOf(s, "HEADNOTES");

    if (begin == -1) {
        begin = indexOf(s, "Before", "Coram", 0, 300);

        if (begin == -1) return [];

        begin += 200;
    }

    end = Math.min(s.length, begin + 17000);


    let str = s.substring(begin, end);

    const regex = /\n\s*[A-Z][A-Z. ]*\n/;

    let pos = str.search(regex);

    if (pos == -1) {
        pos = str.length;
    }

    str = str.substring(0, pos).trim();
    let results = str.split(/\n\s*\(\d{1,2}\)\s+/);

    return results;
}

function getNatureOfProceedings(s) {
    const keyphrase = 'NATURE OF PROCEEDINGS';
    let begin = s.indexOf(keyphrase);
    begin += keyphrase.length;

    if (begin == -1) return "";

    let str = s.substring(begin, begin + 1000);

    begin = 0;
    let end = str.length;

    const cm = /[\s:]+/;

    while (begin < end && str[begin].match(cm)) {
        begin += 1;
    }

    if (begin == end) return "";

    const regex = /\n\s*[A-Z][A-Z. ]*\n/;
    const pos = str.search(regex);
    if (pos == -1)  {
        pos = str.length;   
    }

    return str.substring(0, pos).trim();
}


function getCounsel(s) {
    let begin = s.indexOf('COUNSEL');

    if (begin == -1) return {
        "Plaintiff/Appellant": [],
        "Defendant/Respondent": []
    };

    let str = s.substring(begin + 7, begin + 500);
    const regex = /\n\s*[A-Z][A-Z. ]*\n/;

    let pos = str.search(regex);

    if (pos == -1) {
        return pos = str.length;
    }

    let content = str.substring(0, pos);

    console.log(content);
}


module.exports = { getCounsel, getNatureOfProceedings, getHeadNotes, getDate, getCourt, getJudgement, getJudges, getCasesReferredTo, getSource, getParties };