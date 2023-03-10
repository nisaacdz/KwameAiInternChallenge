let MetaData = require('./metadata');
const funcs = require('./metadatafuncs');
const Reader = require('./iofxns');
const fs = require('fs');

const errorlogpath = "../output/ERRORLOG.txt";
const infologpath = "../output/INFOLOG.txt"


function kwamilize(path) {
    Reader.extractTextFromPDF(path).then((text) => {
        let obj = new MetaData();
        let inputFileName = extractFileName(path);
        try {
            let result = fillMetaData(obj, text);
            let namepref = formulateName(result);

            let jsonstr = JSON.stringify(obj, null, 4);

            fillInfoLog(obj, inputFileName, namepref + "metadata.json");

            constructMetaData(jsonstr, namepref + "metadata.json");
            constructTechnicalTextFile(text, namepref + "technical.txt");
            constructPreviewMdFile(text, namepref + "preview.md");
        } catch (error) {
            fillErrLog(inputFileName, error);
        }
    });
}


function fillMetaData(obj, content) {
    let judges = funcs.getJudges(content);
    let parties = funcs.getParties(content);

    let refcases = funcs.getCasesReferredTo(content);
    let court = funcs.getCourt(content);
    let date = funcs.getDate(content);
    let src = funcs.getSource(content);
    let judgement = funcs.getJudgement(date);
    let headnotes = funcs.getHeadNotes(content);
    let proceedings = funcs.getNatureOfProceedings(content);
    let counsel = funcs.getCounsel(content);
    let long_title = funcs.getLongTitle(counsel);
    let short_title = parties[0] + " vs " + parties[1];
    let case_no = funcs.getCaseNo(content);
    let timestamp = judgement["date"];

    obj.setPartiesOfSuit(parties[0], parties[1]);
    obj.setCasesReferredTo(refcases);
    obj.setSource(src);
    obj.setJudgement(judgement);
    obj.setJudges(judges);
    obj.setTitle(short_title, long_title);
    obj.setCourt(court);
    obj.setHeadNotes(headnotes);
    obj.setNatureOfProceedings(proceedings);
    obj.setCounsel(counsel);

    return [short_title, case_no, timestamp];
}

function formulateName(list) {
    return list.join('_');
}

function extractFileName(url) {
    const lastPathComponent = url.split('/').pop();
    const fileName = lastPathComponent.includes('.')
        ? lastPathComponent
        : null;
    return fileName;
}


function fillErrLog(filename, error) {
    let content = [];
    content.push(filename.toUpperCase + '\n');
    content.push(JSON.stringify(error));
    content.push('\n');

    let strcontent = content.join('\n');
    fs.appendFile(errorlogpath, strcontent, (err) => {
        if (err) throw err;
        console.log('The string was appended to the file!');
    });
}

function fillInfoLog(obj, inputFileName, outputfilename) {
    let content = [];

    content.push("INPUT FILE: " + inputFileName.toUpperCase());
    content.push("OUTPUT FILE: " + outputfilename.toUpperCase());

    let i = 1;

    if (!obj.source) {
        content.push(`${i++}. source: MISSING`);
    }

    if (obj.booksReferredTo.length === 0) {
        content.push(`${i++}. booksReferredTo: NOT FOUND`);
    }

    if (obj.casesReferredTo.length === 0) {
        content.push(`${i++}. casesReferredTo: NOT FOUND`);
    }

    if (!obj.caseId.number || !obj.caseId.type) {
        if (!obj.caseId.number) {
            content.push(`${i++}. caseId.number: NOT FOUND`);
        }
        if (!obj.caseId.type) {
            content.push(`${i++}. caseId.type: NOT FOUND`);
        }
    }

    if (!obj.court.name || !obj.court.location.city || !obj.court.location.country) {
        if (!obj.court.name) {
            content.push(`${i++}. court.name: NOT FOUND`);
        }
        if (!obj.court.location.city) {
            content.push(`${i++}. court.location.city: NOT FOUND`);
        }
        if (!obj.court.location.country) {
            content.push(`${i++}. court.location.country: NOT FOUND`);
        }
    }

    if (!obj.counsel["Plaintiff/Appellant"].length || !obj.counsel["Defendant/Respondent"].length) {
        if (!obj.counsel["Plaintiff/Appellant"].length) {
            content.push(`${i++}. counsel.Plaintiff/Appellant: NOT FOUND`);
        }
        if (!obj.counsel["Defendant/Respondent"].length) {
            content.push(`${i++}. counsel.Defendant/Respondent: NOT FOUND`);
        }
    }

    if (!obj.editorialNote) {
        content.push(`${i++}. editorialNote: MISSING`);
    }

    if (obj.headNotes.length === 0) {
        content.push(`${i++}. headNotes: NOT FOUND`);
    }

    if (obj.indices.length === 0) {
        content.push(`${i++}. indices: NOT FOUND`);
    }

    if (!obj.judgement.data || !obj.judgement.year || !obj.judgement.month || !obj.judgement.day) {
        if (!obj.judgement.data) {
            content.push(`${i++}. judgement.data: NOT FOUND`);
        }
        if (!obj.judgement.year) {
            content.push(`${i++}. judgement.year: NOT FOUND`);
        }
        if (!obj.judgement.month) {
            content.push(`${i++}. judgement.month: NOT FOUND`);
        }
        if (!obj.judgement.day) {
            content.push(`${i++}. judgement.day: NOT FOUND`);
        }
    }

    if (obj.judges.length === 0) {
        content.push(`${i++}. judges: NOT FOUND`);
    }

    if (obj.lawReportsCitations.length === 0) {
        content.push(`${i++}. lawReportsCitations: NOT FOUND`);
    }

    if (!obj.natureOfProceedings) {
        content.push(`${i++}. natureOfProceedings: MISSING`);
    }

    if (obj.mediaNeutralCitation === "") {
        content.push(`${i++}. mediaNeutralCitation: MISSING`);
    }

    if (obj.presidingJudge === "") {
        content.push(`${i++}. presidingJudge: NOT FOUND`);
    }

    if (obj.partiesOfSuit["Plaintiff/Appellant"].length === 0 || obj.partiesOfSuit["Defendant/Respondent"].length === 0) {
        if (obj.partiesOfSuit["Plaintiff/Appellant"].length === 0) {
            content.push(`${i++}. partiesOfSuit.Plaintiff/Appellant: NONE FOUND`);
        }

        if (obj.partiesOfSuit["Defendant/Respondent"].length === 0) {
            content.push(`${i++}. partiesOfSuit.Defendant/Respondent: NONE FOUND`);
        }
    }

    if (obj.statutesReferredTo.length === 0) {
        content.push(`${i++}. statutesReferredTo: NOT FOUND`);
    }

    if (obj.title.long === "" || obj.title.short === "") {
        if (obj.title.long === "") {
            content.push(`${i++}. title.long: UNKNOWN ERROR`);
        }
        if (obj.title.short === "") {
            content.push(`${i++}. title.short: NOT FOUND`);
        }
    }

    content.push('\n');

    let strcontent = content.join('\n');

    fs.appendFile(infologpath, strcontent, (err) => {
        if (err) throw err;
        console.log('The string was appended to the file!');
    });
}


function constructMetaData(content, filename) {
    fs.writeFile('../output/' + filename, content, (err) => {
        if (err) throw err;
        console.log('File has been updated with new content.');
    });
}

function constructTechnicalTextFile(content, filename) {

}

function constructPreviewMdFile(content, filename) {

}

module.exports = { kwamilize };