import PDFDocument from "pdfkit";
import fs from "fs";

export default async function createPdf() {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream("generatedReports/teste.pdf"));
    doc.text("Teste");
    doc.end();
}
