const regex = /\s*[\s:;]*([a-z0-9\s]*)\s*\n/;
const text = " \n: dlslsljljldpsdks;d;\n \n23 SEPTEMBER 1980\n\nBefore:";
const matches = text.match(regex);
let result = matches[1];

console.log(result);
