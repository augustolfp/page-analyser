import PDFDocument from "pdfkit";
import fs from "fs";
import { openAiResultExample } from "../../openAiResultExample.js";

export default async function createPdf(fileName: string, content: string) {
    const filePath = `generatedReports/${fileName}.pdf`;
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));
    doc.text(JSON.stringify(openAiResultExample));
    doc.end();

    return filePath;
}
