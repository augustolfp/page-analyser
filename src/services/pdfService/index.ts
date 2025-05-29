import PDFDocument from "pdfkit";
import fs from "fs";

export default async function createPdf(fileName: string, content: string) {
    const filePath = `generatedReports/${fileName}.pdf`;
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));
    doc.text(content);
    doc.end();

    return filePath;
}
