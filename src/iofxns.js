const pdfjsLib = require('pdfjs-dist');
let fs = require('fs')
const Tesseract = require('tesseract.js');
const { execSync } = require('child_process');
const pdf2img = require('pdf-img-convert');

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

async function isPDFScanned(filePath) {
    const thresholdSize = 600000; // Set threshold size to 600KB
    const stats = fs.statSync(filePath);
    if (stats.size > thresholdSize) {
        return true; // PDF is scanned
    } else {
        return false; // PDF is digital
    }
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

async function extractScannedPDFText(filePath) {
    // Convert the PDF to PNG images using pdf-img-convert
    const imagesDir = './temp/';
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir);
    }
    let pages = await pdf2img.convert(filePath);

    // Extract text from each PNG image using Tesseract.js
    const textArray = await Promise.all(pages.map(async page => {
        const { data: { text } } = await Tesseract.recognize(page);
        return text.trim();
    }));

    // Join the text from each page into a single string
    const text = textArray.join('');

    return text;
}


module.exports = { extractPDFText, readFileToText, appendToFile };

