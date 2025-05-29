import PDFDocument from "pdfkit";
import fs from "fs";
import { openAiResultExample } from "../../openAiResultExample.js";

export default async function createPdf(fileName: string, content: string) {
    const heading1 = {
        size: 20,
    };

    const heading2 = {
        size: 16,
    };

    const normalText = {
        size: 10,
    };

    const filePath = `generatedReports/${fileName}.pdf`;

    const doc = new PDFDocument({ size: "A4" });

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(heading1.size).text(openAiResultExample.titulo, {
        align: "center",
    });

    doc.moveDown();

    doc.fontSize(heading2.size).text("Introdução");
    doc.fontSize(normalText.size).text(openAiResultExample.introducao);

    doc.moveDown();

    doc.fontSize(heading2.size).text("Avaliação das Categorias");
    doc.fontSize(normalText.size).text(
        openAiResultExample.avaliacaoCategorias.textoInicial,
    );

    doc.moveDown();

    doc.fontSize(heading2.size).text("Avaliação dos Produtos");
    doc.fontSize(normalText.size).text(
        openAiResultExample.avaliacaoProdutos.textoInicial,
    );

    doc.moveDown();

    doc.fontSize(heading2.size).text("Pontos Positivos");
    doc.fontSize(normalText.size).text(
        openAiResultExample.pontosPositivos.textoInicial,
    );

    doc.moveDown();

    doc.fontSize(heading2.size).text("Pontos Negativos");
    doc.fontSize(normalText.size).text(
        openAiResultExample.pontosNegativos.textoInicial,
    );

    doc.moveDown();

    doc.fontSize(heading2.size).text("Sugestões de Melhorias");
    doc.fontSize(normalText.size).text(
        openAiResultExample.sugestoesMelhorias.textoInicial,
    );

    doc.moveDown();

    doc.fontSize(heading2.size).text("Conclusão");
    doc.fontSize(normalText.size).text(openAiResultExample.conclusao);

    doc.end();

    return filePath;
}
