import shortid from "shortid";
import createPdf from "../pdfService/index.js";

export async function getPageReport(url: string) {
    const reportFilePath = await createPdf(`${shortid.generate()}.pdf`, "");
}
