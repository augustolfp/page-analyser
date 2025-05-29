import PDFDocument from "pdfkit";
import fs from "fs";
import { openAiResultExample } from "../../openAiResultExample.js";

export default async function createPdf(fileName: string, content: string) {
    const filePath = `generatedReports/${fileName}.pdf`;
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(25).text(openAiResultExample.titulo, {
        align: "center",
    });

    doc.moveDown();

    doc.fontSize(18).text("Introdução");
    doc.fontSize(14).text(openAiResultExample.introducao);

    doc.moveDown();

    doc.fontSize(18).text("Avaliação das Categorias");
    doc.fontSize(14).text(openAiResultExample.avaliacaoCategorias.textoInicial);

    doc.moveDown();

    doc.fontSize(18).text("Avaliação dos Produtos");
    doc.fontSize(14).text(openAiResultExample.avaliacaoProdutos.textoInicial);

    doc.moveDown();

    doc.fontSize(18).text("Pontos Positivos");
    doc.fontSize(14).text(openAiResultExample.pontosPositivos.textoInicial);

    doc.moveDown();

    doc.fontSize(18).text("Pontos Negativos");
    doc.fontSize(14).text(openAiResultExample.pontosNegativos.textoInicial);

    doc.moveDown();

    doc.fontSize(18).text("Sugestões de Melhorias");
    doc.fontSize(14).text(openAiResultExample.sugestoesMelhorias.textoInicial);

    doc.moveDown();

    doc.fontSize(18).text("Conclusão");
    doc.fontSize(14).text(openAiResultExample.conclusao);

    doc.end();

    return filePath;
}
