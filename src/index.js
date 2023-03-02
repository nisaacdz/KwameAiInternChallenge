let MetaData = require('./metadata');
const funcs = require('./metadatafuncs');
const Reader = require('./iofxns');
const fs = require('fs');

Reader.extractTextFromPDF('../procedure/PDF Cases/unscanned/v2').then((text) => {
    let obj = new MetaData();
    fillMetaData(obj, text);

    let jsonstr = JSON.stringify(obj, null, 4);

    fs.writeFile('../output.json', jsonstr, (err) => {
        if (err) throw err;
        console.log('File has been updated with new content.');
    });
});

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

    obj.setPartiesOfSuit(parties[0], parties[1]);
    obj.setCasesReferredTo(refcases);
    obj.setSource(src);
    obj.setJudgement(judgement);
    obj.setJudges(judges);
    obj.setTitle(parties[0] + " vs " + parties[1], parties[0] + " vs " + parties[1]);
    obj.setCourt(court);
    obj.setHeadNotes(headnotes);
    obj.setNatureOfProceedings(proceedings);
}