import { z } from "zod";

export const OutputFormat = z.object({
    titulo: z.string(),
    introducao: z.string(),
    pontosPositivos: z.object({
        textoInicial: z.string(),
        listaPontosPositivos: z.array(z.string()),
    }),
    pontosNegativos: z.object({
        textoInicial: z.string(),
        listaPontosNegativos: z.array(z.string()),
    }),
    sugestoesMelhorias: z.object({
        textoInicial: z.string(),
        listaSugestoesMelhorias: z.array(z.string()),
    }),
    descricaoImagens: z.array(z.string()),
    conclusao: z.string(),
});
