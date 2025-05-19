import fs from "fs/promises";
import { PageData } from "../types/index.js";
import { scrapePageData } from "./scrapingService/index.js";
import client from "../config/openAI.js";

export async function getPageReport(url: string) {
    const pageData = await scrapePageData(url);

    const pageInput = [
        {
            categoria: "Combos - Para montar do seu jeito com desconto!",
            produtos: [
                {
                    nome: "Combo Agora Vai - A partir de 10 unidades",
                    descricao:
                        "Monte o combo do seu jeito! =) 5% de desconto já aplicado no valor unitário.   CLIQUE NA CATEGORIA PARA VER OS PRATOS, VALORES E FOTOS.  Ideal para você que quer ter uma variedade de opções prontas no seu congelador e nem dar chance para acabar saindo da rotina saudável por falta de tempo.",
                },
                {
                    nome: "Combo Foco Total - A partir de 20 unidades",
                    descricao:
                        "Monte o combo do seu jeito! =) 10% de desconto já aplicado no valor unitário  CLIQUE NA CATEGORIA PARA VER OS PRATOS, VALORES E FOTOS.  Perfeito para quem almoça e janta opções prontas e precisa de mais quantidades de uma vez, ou tem uma família que também está no foco.",
                },
            ],
        },
        {
            categoria: "Combo Fit - À partir de 5 unidades",
            produtos: [
                {
                    nome: "COD01 - Risotto de filé mignon aos queijos premium | 330g",
                    descricao:
                        "Linha gourmet e sucesso número 1 do nosso cardápio. Experimente a explosão de sabores do corte magro filé mignon e queijos premium. Ingredientes: Água, Filé Mignon iscas, Arroz Arbóreo, Passata de tomate, Queijo Gorgonzola, Cebola, Alho Poró, Alho, Sal, Colorau, Páprica defumada, Salsinha, Chimichurri.  Valor energético (kcal): 320 / Carboidratos (g): 17/ Açúcares totais (g): 1,6 / Proteínas (g): 26 / Gorduras totais (g): 6,7/ Gorduras saturadas (g) 3,4/ Fibras alimentares (g): 1,1... Ver mais",
                },
                {
                    nome: "COD04 - LOWCARB | Filé de tilápia com purê de abóbora | 300g SEM GLÚTEN E SEM LACTOSE",
                    descricao:
                        "Ingredientes: Abobora Cabotia, Filé de tilápia, Água, Passata de tomate, Cebola, Alho Poró, Sal, Alho, Chimichurri, Colorau, Azeite de oliva, Páprica defumada.  Nossos purês não possuem adição de qualquer ingrediente a mais.  Valor energético (kcal): 249/ Carboidratos (g): 19/ Açúcares totais (g): 0/ Açúcares adicionados (g): 0/ Proteínas (g): 31/ Gorduras totais (g): 4/ Gorduras saturadas (g): 1/ Gorduras trans (g): 0/ Fibra alimentar (g): 4/ Sódio (mg): 805",
                },
            ],
        },
    ];

    const prompt = await fs.readFile(
        "./src/services/pageReportPrompt.txt",
        "utf-8",
    );

    const response = await client.responses.create({
        model: "gpt-4.1",
        instructions: prompt,
        input: JSON.stringify(pageInput),
    });

    console.log(response);

    return;
}
