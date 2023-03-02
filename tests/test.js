const str = "\n COURT OF APPEAL, SITTING AS THE SUPREME\n COURT; ACCRA\n\n Date:\n";
const match = str.match(regex);
if (match) {
  console.log(match[1]);
}