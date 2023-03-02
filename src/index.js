let MetaData = require('./metadata');
const funcs = require('./metadatafuncs');

let fs = require('fs')
const content = fs.readFileSync('../sample.txt', 'utf8');

let obj = new MetaData();
fillMetaData(obj)

let jsonstr = JSON.stringify(obj, null, 4);

fs.writeFile('../output.json', jsonstr, (err) => {
    if (err) throw err;
    console.log('File has been updated with new content.');
});

function fillMetaData(obj) {
    let judges = funcs.getJudges(content);
    let parties = funcs.getParties(content);

    let refcases = funcs.getCasesReferredTo(content);
    let court = funcs.getCourt(content);
    let date = funcs.getDate(content);
    let src = funcs.getSource(content);
    let judgement = funcs.getJudgement(date);

    obj.setPartiesOfSuit(parties[0], parties[1]);
    obj.setCasesReferredTo(refcases);
    obj.setSource(src);
    obj.setJudgement(judgement);
    obj.setJudges(judges);
    obj.setTitle(parties[0] + " vs " + parties[1], parties[0] + " vs " + parties[1]);
    obj.setCourt(court);
}