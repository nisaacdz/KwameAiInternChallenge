const input = `
Barnard v. Gorman [1941] A.C. 378; [1941] 3 All E.R. 45; 110 L.J.K.B. 557; 165 L.T. 308; 105
J.P. 379; 57 T.L.R. 681; 39 L.G.R. 273, H.L.
(12)
 
St. Aubyn v. Attorney-General [19521 A.C. 15; [1951] 2 All E.R. 473, H.L.
[p.643] of [1980] GLR 637

N.ATURE OF PROCEEDINGS

ACTION before the Court of Appeal, sitting as the Supreme Court under section 3 of the First Schedule
of the Constitution, 1979, for an interpretation of the status of the holder of the office of Chief Justice on
the coming into force of the Constitution, 1979. The facts are fully stated in the judgment delivered on 23
October 1980 wherein the court gave its reasons for the declaratory judgment pronounced on 23
September 1980.`;

const regex = /\n\s*[A-Z][A-Z. ]*\n/;
const match = input.search(regex);

if (match == -1) {
  console.log('Too bad');
} else {
  console.log(input.substring(0, match))
}
