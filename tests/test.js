const regex = /\s+\(\d{1,2}\)\s+(.+)\n(?![ \t]*[A-Z]+\s*\n)/g;
const text = "(11)\n \nBarnard v. Gorman [1941] A.C. 378; [1941] 3 All E.R. 45; 110 L.J.K.B. 557; 165 L.T. 308; 105\nJ.P. 379; 57 T.L.R. 681; 39 L.G.R. 273, H.L.\n(12)\n \n\t. Aubyn v. Attorney-General [19521 A.C. 15; [1951] 2 All E.R. 473, H.L.\n[p.643] of [1980] GLR 637\n\nNATURE OF PROCEEDINGS\n\nACTION\n (11)\n \nBarnard v. Gorman [1941] A.C. 378; [1941] 3 All ";
const matches = text.match(regex);
const bodies = [];

for (let i = 0; i < matches.length; i++) {
  const match = matches[i];
  const body = match.replace(regex, "$1");
  bodies.push(body);
}

console.log(bodies);
