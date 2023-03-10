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
        let result = fillMetaData(obj, text);
        let namepref = formulateName(result);

        fillErrLog(obj, inputFileName, namepref + "metadata.json");
        fillInfoLog(obj, inputFileName, namepref + "metadata.json");

        let jsonstr = JSON.stringify(obj, null, 4);

        constructMetaData(jsonstr, namepref + "metadata.json");
        constructTechnicalTextFile(text, namepref + "technical.txt");
        constructPreviewMdFile(text, namepref + "preview.md");
        construct
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


function fillErrLog(obj, inputFileName, outputfilename) {

}

function fillInfoLog(obj, inputFileName, outputfilename) {

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