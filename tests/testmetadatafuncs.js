const { count } = require('console');
const funcs = require('../src/metadatafuncs');
const fs = require('fs');

const content = fs.readFileSync('../sample.txt', 'utf-8');

testJudges()

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