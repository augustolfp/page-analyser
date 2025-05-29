import { z } from "zod";

export const RequestBodyFormat = z.object({
    urlRestaurante: z.string().url(),
    nomeRestaurante: z.string(),
    emailCliente: z.string().email(),
    nomeCliente: z.string(),
});
