const funcs = require('../src/metadatafuncs');
const fs = require('fs');

const content = fs.readFileSync('../sample.txt', 'utf-8');

testCaseNo();

function testCasesReferredTo() {
    let result = funcs.getCasesReferredTo(content);
    console.log(result)
}

function testDate() {
    let result = funcs.getDate(content);
    console.log(result)
}

function testJudgement() {
    let date = funcs.getDate(content);
    let result = funcs.getJudgement(date);
    console.log(result)
}

function testParties() {
    let result = funcs.getParties(content);
    console.log(result);
}

function testCourt() {
    let result = funcs.getCourt(content);
    console.log(result);
}

function testJudges() {
    let result = funcs.getJudges(content);
    console.log(result);
}

function testNatureOfProceedings() {
    let result = funcs.getNatureOfProceedings(content);
    console.log(result);
}

function testHeadNotes() {
    let result = funcs.getHeadNotes(content);
    console.log(result);
}

function testCounsel() {
    let result = funcs.getCounsel(content);
    console.log(result)
}

function testCaseNo() {
    let result = funcs.getCaseNo(content);
    const lastBracketIndex = result.lastIndexOf(']');
    const trimmedStr = result.substring(0, lastBracketIndex + 1).trim();
    
   return trimmedStr;
}


function testLongTitle() {
    let counsel = funcs.getCounsel(content);
    let result = funcs.getLongTitle(counsel);
    console.log(result);
}