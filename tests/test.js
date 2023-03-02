const regex = /\s*.*\s+(v(?:s\.?|\.?)?)\s+.*\s*\n/g;

const text = `\nSome text1 vs. Some other text\nMore text vs More other text\nEven more text v Even more other text\n`;
const matches = regex.exec(text)
console.log(matches[0]);
