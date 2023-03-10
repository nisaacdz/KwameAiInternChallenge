const pdfjsLib = require('pdfjs-dist');
let fs = require('fs')

function appendToFile(filePath, contents) {
    fs.appendFile(filePath, contents, err => {
        if (err) throw err;
        console.log('Contents appended to file.');
    });
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

async function extractTextFromScannedPDF(pdfUrl) {
    const pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
    const pdfPage = await pdfDoc.getPage(pageNum);
    const textContent = await pdfPage.getTextContent();
    const text = textContent.items.map(item => item.str).join('');
    return text;
}


async function isScannedPDF(pdfUrl) {
    const pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
    const pdfPage = await pdfDoc.getPage(1);
    const textContent = await pdfPage.getTextContent();
    const text = textContent.items.map(item => item.str).join('');
    return text.length === 0;
}


module.exports = { extractTextFromPDF, readFileToText, isScannedPDF, extractTextFromScannedPDF, appendToFile };

