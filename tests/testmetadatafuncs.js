const funcs = require('../src/metadatafuncs');
const fs = require('fs');

const content = fs.readFileSync('../sample.txt', 'utf-8');

testCasesReferredTo()

function testCasesReferredTo() {
    let result = funcs.getCasesReferredTo(content);
    console.log(result)
}

function testDate() {
    let result = funcs.getDate(content);
}