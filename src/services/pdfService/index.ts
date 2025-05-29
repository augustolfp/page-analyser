import PDFDocument from "pdfkit";
import fs from "fs";
import { z } from "zod";
import { OutputFormat } from "../openAiService/outputSchema.js";

type Content = z.infer<typeof OutputFormat>;

export default async function createPdf(fileName: string, content: Content) {
    const {
        titulo,
        introducao,
        avaliacaoCategorias,
        avaliacaoProdutos,
        pontosPositivos,
        pontosNegativos,
        sugestoesMelhorias,
        conclusao,
    } = content;

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

    doc.fontSize(heading1.size).text(titulo, {
        align: "center",
    });

    doc.moveDown();

    doc.fontSize(heading2.size).text("Introdução");
    doc.fontSize(normalText.size).text(introducao);

    doc.moveDown();

    doc.fontSize(heading2.size).text("Avaliação das Categorias");
    doc.fontSize(normalText.size).text(avaliacaoCategorias.textoInicial);

    const avaliacaoCategoriasTable = avaliacaoCategorias.categorias.map(
        ({ nome, avaliacao }) => {
            return [nome, avaliacao];
        },
    );

    // @ts-ignore
    doc.table({
        data: avaliacaoCategoriasTable,
    });

    doc.moveDown();

    doc.fontSize(heading2.size).text("Avaliação dos Produtos");
    doc.fontSize(normalText.size).text(avaliacaoProdutos.textoInicial);

    const avaliacaoProdutosTable = avaliacaoProdutos.produtos.map(
        ({ nome, avaliacao }) => {
            return [nome, avaliacao];
        },
    );

    // @ts-ignore
    doc.table({
        data: avaliacaoProdutosTable,
    });

    doc.moveDown();

    doc.fontSize(heading2.size).text("Pontos Positivos");
    doc.fontSize(normalText.size).text(pontosPositivos.textoInicial);
    doc.list(pontosPositivos.listaPontosPositivos);

    doc.moveDown();

    doc.fontSize(heading2.size).text("Pontos Negativos");
    doc.fontSize(normalText.size).text(pontosNegativos.textoInicial);
    doc.list(pontosNegativos.listaPontosNegativos);

    doc.moveDown();

    doc.fontSize(heading2.size).text("Sugestões de Melhorias");
    doc.fontSize(normalText.size).text(sugestoesMelhorias.textoInicial);
    doc.list(sugestoesMelhorias.listaSugestoesMelhorias);

    doc.moveDown();

    doc.fontSize(heading2.size).text("Conclusão");
    doc.fontSize(normalText.size).text(conclusao);

    doc.end();

    return filePath;
}
