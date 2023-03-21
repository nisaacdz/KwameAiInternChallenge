let MetaData = require('./metadata');
const funcs = require('./metadatafuncs');
const Reader = require('./iofxns');
const fs = require('fs');
const { finished } = require('stream');

const errorlogpath = "../output/ERRORLOG.txt";
const infologpath = "../output/INFOLOG.txt"


function kwamilize(path) {
    Reader.extractPDFText(path).then((text) => {
        let obj = new MetaData();
        let inputFileName = extractFileName(path);
        try {
            let result = fillMetaData(obj, text);

            let jsonstr = JSON.stringify(obj, null, 4);
            let namepref = formulateName(result);
            constructMetaData(jsonstr, namepref + "metadata.json");

            fillInfoLog(obj, inputFileName, namepref + "metadata.json");


            constructTechnicalTextFile(text, namepref + "technical.txt");
            constructPreviewMdFile(text, namepref + "preview.md");
        } catch (error) {
            fillErrLog(inputFileName, error);
        }
    });
}


function fillMetaData(obj, content) {
    console.log('break1')
    let judges = funcs.getJudges(content);
    console.log('break2')
    let parties = funcs.getParties(content);
    console.log('break3')
    let refcases = funcs.getCasesReferredTo(content);
    console.log('break4')
    let court = funcs.getCourt(content);
    console.log('break5')
    let date = funcs.getDate(content);
    console.log('break6')
    let src = funcs.getSource(content);
    console.log('break7')
    let judgement = funcs.getJudgement(date);
    console.log('break8')
    let headnotes = funcs.getHeadNotes(content);
    console.log('break9')
    let proceedings = funcs.getNatureOfProceedings(content);
    console.log('break10')
    let counsel = funcs.getCounsel(content);
    console.log('break10')
    let long_title = funcs.getLongTitle(counsel);
    console.log('break11')
    let short_title = "";
    if (parties.length > 1) {
        short_title = parties[0] + " vs " + parties[1];
    }
    console.log('break12')
    let case_no = funcs.getCaseNo(content);

    if (parties.length > 1) {
        obj.setPartiesOfSuit(parties[0], parties[1]);
    }
    obj.setCasesReferredTo(refcases);
    obj.setSource(src);
    obj.setJudgement(judgement);
    obj.setJudges(judges);
    obj.setTitle(short_title, long_title);
    obj.setCourt(court);
    obj.setHeadNotes(headnotes);
    obj.setNatureOfProceedings(proceedings);
    obj.setCounsel(counsel);

    console.log('Finished executing fillMetaData of perform.js');

    return [short_title, case_no, date];
}

function formulateName(list) {
    if (!list) {
        return "";
    }
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
    content.push(filename.toUpperCase() + '\n');
    content.push(error.message);
    content.push('\n');

    let strcontent = content.join('');
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

    if (!obj.booksReferredTo || obj.booksReferredTo.length === 0) {
        content.push(`${i++}. booksReferredTo: NOT FOUND`);
    }

    if (!obj.casesReferredTo || obj.casesReferredTo.length === 0) {
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

    if (!obj.court.name || !obj.court.location || !obj.court.location.city || !obj.court.location.country) {
        if (!obj.court.name) {
            content.push(`${i++}. court.name: NOT FOUND`);
        }

        if (!obj.court.location) {
            content.push(`${i++}. court.location: UNDEFINED`);
        } else if (!obj.court.location.city) {
            content.push(`${i++}. court.location.city: NOT FOUND`);
        }
        else if (!obj.court.location.country) {
            content.push(`${i++}. court.location.country: NOT FOUND`);
        }
    }

    if (!obj.counsel["Plaintiff/Appellant"] || !obj.counsel["Defendant/Respondent"]) {
        if (!obj.counsel["Plaintiff/Appellant"]) {
            content.push(`${i++}. counsel.Plaintiff/Appellant: NOT FOUND`);
        }
        if (!obj.counsel["Defendant/Respondent"]) {
            content.push(`${i++}. counsel.Defendant/Respondent: NOT FOUND`);
        }
    }

    if (!obj.editorialNote) {
        content.push(`${i++}. editorialNote: MISSING`);
    }

    if (!obj.headNotes || obj.headNotes.length === 0) {
        content.push(`${i++}. headNotes: NOT FOUND`);
    }

    if (!obj.indices.length || obj.indices.length === 0) {
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

    if (!obj.judges || obj.judges.length === 0) {
        content.push(`${i++}. judges: NOT FOUND`);
    }

    if (!obj.lawReportsCitations || obj.lawReportsCitations.length === 0) {
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

    if (!obj.partiesOfSuit["Plaintiff/Appellant"] || !obj.partiesOfSuit["Defendant/Respondent"]) {
        if (!obj.partiesOfSuit["Plaintiff/Appellant"]) {
            content.push(`${i++}. partiesOfSuit.Plaintiff/Appellant: NONE FOUND`);
        }

        if (!obj.partiesOfSuit["Defendant/Respondent"]) {
            content.push(`${i++}. partiesOfSuit.Defendant/Respondent: NONE FOUND`);
        }
    }

    if (!obj.statutesReferredTo || obj.statutesReferredTo.length === 0) {
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
    let outputDir = "../output/";
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    fs.writeFile(outputDir + filename, content, (err) => {
        if (err) {
            console.log("error here");
            throw err;
        }
        console.log('File has been updated with new content.');
    });
}

function constructTechnicalTextFile(content, filename) {

}

function constructPreviewMdFile(content, filename) {

}

module.exports = { kwamilize };