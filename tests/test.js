const input = "This is some text.\nMORE TEXT\nAnd even more text.\n";

const regex = /(.+)\n[A-Z ]+\n/;
const match = regex.exec(input)

if (match) {
  console.log(match[0]); // Logs "This is some text."
}
