const input = "This is some text.\nMORE TEXT\nAnd even more text.\n";

const regex = /\s*\(\d{1,2}\)\s*[A-Za-z.,();: ]+\n/
const match = input.match(regex);

for (var i = 0; i < match.length; i++) {
  console.log(match[i])
}
