const pdfjsLib = require('pdfjs-dist');
let fs = require('fs')

function writeToTextFile(path, content) {
    fs.writeFile();
}

function readFileToText(path) {
    return fs.readFileSync(path, 'utf8');
}

// Define a function to extract text from a PDF file
async function extractTextFromPDF(pdfPath) {
    // Load the PDF file
    const loadingTask = pdfjsLib.getDocument(pdfPath);

    // Extract the text from the PDF with original formatting
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    let fullText = '';

    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        let pageText = '';
        textContent.items.forEach((item) => {
            pageText += item.str + '\n';
        });

        pageText += '\n';

        fullText += pageText;
    }

    return fullText;
}


module.exports = { extractTextFromPDF, readFileToText };