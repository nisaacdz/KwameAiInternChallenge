const pdfjsLib = require('pdfjs-dist');
let fs = require('fs')
const Tesseract = require('tesseract.js');

function appendToFile(filePath, contents) {
    fs.appendFile(filePath, contents, err => {
        if (err) throw err;
        console.log('Contents appended to file.');
    });
}

function readFileToText(path) {
    return fs.readFileSync(path, 'utf8');
}


async function extractPDFText(pdfPath) {
    const isScanned = await isPDFScanned(pdfPath);

    if (isScanned) {
        return extractScannedPDFText(pdfPath);
    } else {
        return extractUnScannedPDFText(pdfPath);
    }
}

async function isPDFScanned(pdfPath) {
    const pdfDoc = await pdfjsLib.getDocument(pdfPath).promise;
    const pdfPage = await pdfDoc.getPage(1);
    const textContent = await pdfPage.getTextContent();
    const text = textContent.items.map(item => item.str).join('');
    return text.length === 0;
}

async function extractUnScannedPDFText(pdfPath) {
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

async function extractScannedPDFText(pdfUrl) {
    // Load PDF document
  const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

  // Initialize variables
  let pageNum = 1;
  let numPages = pdf.numPages;
  let text = '';

  // Loop through each page of PDF
  while (pageNum <= numPages) {
    // Get page
    const page = await pdf.getPage(pageNum);

    // Render page to canvas
    const viewport = page.getViewport({scale: 1.5});
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({canvasContext: ctx, viewport}).promise;

    // Extract text from canvas using OCR
    const {data: {text: pageText}} = await Tesseract.recognize(canvas.toDataURL());

    // Concatenate page text to overall text
    text += pageText + ' ';

    // Increment page number
    pageNum++;
  }

  // Return extracted text
  return text;
}

module.exports = { extractPDFText, readFileToText, appendToFile };

