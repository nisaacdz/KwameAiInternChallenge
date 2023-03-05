const input = `Joe Reindorf, Attorney-General (with him Djabatey, Deputy Attorney-General, C.H.A. Tetteh, Solicitor-General, I. Odoi and Mrs. Campbell, Principal State Attorneys) for the defendant.`;

const regex = /\s*(?:(,)|\b(and)\b|\(|\)|\b(for)\b|\b(the)\b|\b(with)\b|\b(him)\b|\b(plaintiff)\b|\b(respondent)\b|\b(defendant)\b|\b(appellant)\b)\s*/;
let result = [];
let split = input.split(regex);

for (var i = 0; i < split.length; i++) {
  if (split[i] && split[i].length > 3 && !regex.test(split[i])) {
    result.push(split[i]);
  }
}
console.log(result)