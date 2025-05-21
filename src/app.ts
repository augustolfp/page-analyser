import express, { Request, Response } from "express";
import { engine } from "express-handlebars";
import { getPageReport } from "./services/pageReportService/index.js";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/analysis/:restaurant", async (req: Request, res: Response) => {
    const restaurant: string = req.params.restaurant;
    const fullUrl = `https://prefirodelivery.com/${restaurant}`;

    const pageAnalysis = {
        titulo: "Análise e Relatório do Cardápio On-line Cardapin",
        introducao:
            "Recebemos para análise o cardápio digital da Cardapin, um restaurante de delivery especializado em refeições saudáveis, práticas e com opções para diversos públicos (adultos, crianças, fitness, dietas restritivas, etc). O cardápio é variado, com pratos individuais, combos, lanches, sucos naturais, itens avulsos e sobremesas saudáveis. O ticket médio sugerido está entre médio e alto, refletindo a qualidade dos ingredientes anunciados, a apresentação, e o foco em alimentação saudável com conveniência.\n\nO cardápio busca atender diferentes necessidades alimentares (low carb, sem glúten/lactose, lanches fit, refeições para crianças, combos personalizados, entre outros), utilizando uma linguagem descontraída e informativa. O uso de imagens é frequente, tanto para humanizar a marca quanto para ilustrar pratos prontos, embalagens, e demonstrar praticidade.",
        pontosPositivos: {
            textoInicial:
                "O cardápio apresenta organização clara por categorias, linguagem próxima do público-alvo e detalhamento nutricional de muitos itens, o que transmite credibilidade. As imagens são de boa qualidade, reforçando a proposta de uma alimentação prática e saudável, e as porções são visualmente bem apresentadas. Destacam-se os combos (que estimulam maior consumo com desconto), além de alternativas para diferentes perfis (desde introdução alimentar infantil até dieta para quem busca hipertrofia).",
            listaPontosPositivos: [
                "Grande variedade de opções saudáveis para diferentes públicos (infantil, adultos, dietas específicas).",
                "Organização clara em categorias que facilitam a escolha (combos, combos fechados, lanches, sucos, doces, etc.).",
                "Informação nutricional detalhada em vários itens, com listas de ingredientes e macros.",
                "Imagens bem produzidas, mostrando tanto pratos prontos quanto consumidores em situações reais de consumo.",
                "Textos fluídos, acessíveis e que transmitem praticidade, saúde e identidade leve.",
                "Opção de personalização de combos e entrega express agregam valor percebido.",
                "Ofertas atrativas de desconto progressivo em combos (a partir de 5, 10, 20, 40 unidades).",
                "Detalhamento de restrições alimentares (glúten, lactose), o que é essencial para o público-alvo.",
            ],
        },
        pontosNegativos: {
            textoInicial:
                "Apesar do cardápio ser completo, há pontos que podem confundir ou dificultar a experiência do consumidor. Algumas categorias estão extensas demais (exemplo: Combo Fit - À partir de 5 unidades), tornando a navegação mais difícil. Diversos itens utilizam descrições longas ou com muitos termos técnicos, e há produtos com descrições vagas ou genéricas (especialmente em lanches e combos personalizados). Além disso, alguns nomes de categorias ou produtos podem ser simplificados, e seria útil criar subcategorias para refeições com muitos preparos diferentes. Algumas imagens não retratam o prato final, mas apenas a embalagem, o que pode decepcionar o cliente sobre a aparência real da comida.",
            listaPontosNegativos: [
                "Categoria 'Combo Fit - À partir de 5 unidades' ficou excessivamente longa, dificultando a visualização e escolha rápida.",
                "Algumas descrições são extensas, com excesso de dados técnicos, o que pode cansar o leitor e atrapalhar o apelo comercial.",
                "Produtos nos lanches como 'carne de panela desfiada para lanches' e 'frango desfiado para lanches' estão sem nenhuma descrição, tornando a escolha pouco atrativa.",
                "Imagens de algumas categorias e combos iniciais mostram pessoas ou embalagens, mas não detalham visualmente o prato real (ex: imagens 1, 2 e 3; embalagem/consumidor em vez do alimento).",
                "Mesma descrição genérica de como montar o combo aparece em mais de um combo, cansando o usuário.",
                "Existem títulos de categoria e produto longos, com excesso de códigos e informações redundantes (ex: COD01 - Risotto de filé mignon aos queijos premium | 330g).",
                "Categoria 'Combo Fit' mistura opções low carb/pratos normais/sobremesas/proteínas, sugerindo divisão em 'Pratos Low Carb', 'Pratos Tradicionais' e 'Sobremesas'.",
                "Alguns nomes de pratos são pouco comerciais e poderiam ser otimizados para destacar os diferenciais (exemplo: 'Sobrecoxa assada com arroz branco, creme de milho e tomate cereja').",
                "Descrições de sucos, doces e lanches poderiam ser mais criativas e comerciais.",
            ],
        },
        sugestoesMelhorias: {
            textoInicial:
                "Para aprimorar a experiência do cliente e o apelo comercial do cardápio, sugerimos simplificações, ajustes e uma nova organização para facilitar a navegação. Também recomendamos revisar descrições vagas, padronizar informações nutricionais e destacar mais o benefício de cada produto.",
            listaSugestoesMelhorias: [
                "Dividir a categoria 'Combo Fit - À partir de 5 unidades' em subgrupos: 'Pratos Low Carb', 'Pratos Tradicionais', 'Pratos com Peixe', 'Pratos Vegetarianos', 'Strogonoffs e Panquecas', para facilitar a busca.",
                "Tornar nomes de produtos mais curtos e atrativos, retirando o código do início e incluindo apenas no final ou em campo separado (exemplo: 'Risoto de Filé Mignon com Queijos Premium' em vez de 'COD01 - Risotto de filé mignon aos queijos premium | 330g').",
                "Reescrever descrições longas em textos mais objetivos, pontuando os diferenciais em tópicos ou frases de impacto.",
                "Adicionar descrições atrativas e completas aos produtos de lanche que estão sem detalhamento ('carne de panela desfiada para lanches', etc).",
                "Padronizar a exibição das informações nutricionais (considerar um quadro ou pop-up separado, em vez de poluir a descrição principal).",
                "Adicionar mais fotos dos pratos prontos em vez de priorizar fotos de pessoas ou só da embalagem, especialmente nos combos e primeiros produtos.",
                "Usar pequenos ícones/sinais para destacar rapidamente atributos importantes: sem glúten, sem lactose, low carb, high protein.",
                "Nas descrições de sucos e doces, destacar o sabor e a proposta além do benefício nutricional, usando frases sugestivas (ex: 'Experimente o sabor marcante do nosso Mousse de Chocolate zero açúcar que derrete na boca').",
                "Agrupar refeições infantis, personalizadas e combos de degustação em um menu chamado 'Especialidades' ou 'Planos Nutricionais'.",
                "Reduzir repetições e padronizar a chamada para ação (CTA) nos textos dos combos.",
            ],
        },
        descricaoImagens: [
            "Imagem 1: Um homem segurando uma bandeja do produto Cardapin, sorrindo, sentado à mesa com várias embalagens do produto ao redor. A imagem transmite empatia e confiança, mas não mostra o prato em si – serve mais como imagem publicitária.",
            "Imagem 2: Uma mulher sorrindo, segurando uma bandeja Cardapin na frente do freezer aberto, onde várias embalagens estão arrumadas. Transmite organização e praticidade, mas não revela o alimento. Boa para associar à estocagem do produto.",
            "Imagem 3: Caixa de entrega Cardapin com embalagens empilhadas em cima, ao ar livre. Destaca a entrega e embalagem, mas não o conteúdo. Útil como imagem de branding.",
            "Imagem 4: Prato de risoto de filé mignon aos queijos premium, pronto para consumo. A aparência é atraente e bem apresentada, sendo ideal para convencer o consumidor.",
            "Imagem 5: Prato de filé de tilápia sobre purê de abóbora. A imagem mostra o prato real, com cor viva e apetitosa – muito representativa para o produto.",
            "Imagem 6: Prato com strogonoff de carne, arroz branco e batata souté. Visual caseiro, bem servido, destaca os ingredientes claramente.",
            "Imagem 7: Prato de carne de panela com macarrão caseiro e tomates confitados. Colorido e apetitoso, mostra bem a proposta do prato.",
            "Imagem 8: Prato de escondidinho de batata doce com carne de panela, com a camada de batata doce ao fundo, deixando ver a carne. Atrativo e realista.",
            "Imagem 9: Panqueca de espinafre com molho branco e mix de sementes, prato bem montado com aparência saudável.",
            "Imagem 10: Escondidinho de carne de panela com aipim, com porção bem visível da carne sob a camada de aipim; boa apresentação.",
            "Imagem 11: Carne de panela com mix de legumes, visual colorido, com destaque para brócolis e tomate cereja.",
            "Imagem 12: Sobrecoxa assada coberta por creme amarelo, arroz e tomate cereja. Boa demonstração da montagem do prato.",
            "Imagem 13: Prato de iscas de frango com macarrão penne ao creme branco com brócolis. Visual apetitoso, porção generosa.",
            "Imagem 14: Carne de panela com purê de abóbora, cores vivas e visual remete a comida caseira, saudável.",
            "Imagem 15: Strogonoff de frango fit com arroz branco e batata souté. Prato dividido, ingredientes apresentados separadamente, atrativo.",
            "Imagem 16: Panqueca de cenoura com frango ao molho branco fit e mix de sementes, visual colorido e saudável.",
            "Imagem 17: Carne moída com arroz branco, feijão vermelho e farofa fake de legumes; bastante colorida, relembra prato brasileiro.",
            "Imagem 18: Fricassé de creme de milho com frango desfiado e queijo mussarela, gratinado, aparência cremosa muito apetitosa.",
            "Imagem 19: Prato de filézinho de frango com arroz, feijão vermelho e farofa fake – composição clássica e caseira.",
            "Imagem 20: Tilápia à parmegiana com arroz e brócolis: porção visivelmente bem servida, cor e textura atrativas.",
            "Imagem 21: Frango à parmegiana com queijo, arroz branco e vagem. Prato parece apetitoso e saudável.",
            "Imagem 22: Salmão ao forno com purê de abóbora e arroz branco, visual sofisticado e saudável, atrativo.",
            "Imagem 23: Salmão com abóbora em pedaços, cenoura e brócolis, aparência leve e sofisticada, ideal para prato premium.",
            "Imagem 24: Almôndegas com purê de mandioquinha e molho, porção generosa.",
            "Imagem 25: Strogonoff de frango com arroz integral e brócolis, apresentação que destaca comida leve e balanceada.",
            "Imagem 26: Salmão ao forno com arroz branco e purê de abóbora cabotiá em prato branco, textura e cores ressaltam saúde/frescura.",
            "Imagem 27: Mulher sentado na praia, comendo o prato Cardapin, transmitindo praticidade e um estilo de vida leve.",
            "Imagem 28: Homem musculoso mostrando embalagem Cardapin e flexionando o braço na academia, reforçando o apelo fitness.",
            "Imagem 29: Mulher segurando várias embalagens Cardapin sobre o balcão, sorrindo, imagem de branding que sugere variedade.",
            "Imagem 30: Homem com camiseta Ironberg sorrindo com isopor e várias embalagens Cardapin, associando o produto ao universo fitness.",
            "Imagem 31: Mulher ao ar livre segurando embalagem Cardapin, sorriso simpático, passa saúde e bem-estar.",
            "Imagem 32: Nutricionista sorrindo, segurando embalagem Cardapin, com o nome destacado – transmite credibilidade profissional.",
            "Imagem 33: Comida saudável Cardapin com legumes e carne de panela, mão segurando com logo da nutricionista Ana Koerich, foco em nutrição.",
            "Imagem 34: Bebê sorridente sendo alimentado com prato Mini Cardapin (feijão, purê, brócolis) – remete ao combo Baby com posicionamento correto.",
            "Imagem 35: Cenoura e brócolis embalados a vácuo (adicional avulso). Visual correto, mostra cuidado e praticidade.",
            "Imagem 36: Várias unidades embaladas de cenoura e brócolis, pacote fechado, ilustra bem a porção extra.",
            "Imagem 37: Berinjela e vagem temperados embalados a vácuo – identificação visual clara.",
            "Imagem 38: Combo berinjela e vagem, diversos pacotes na bancada, visual reforça o congelado de legumes.",
            "Imagem 39: Mulher fitness analisando embalagem Cardapin na cozinha, conexão com o público-alvo atleta ou dieta.",
            "Imagem 40: Homem com barba, camiseta branca, segurando embalagem Cardapin e sorrindo, branding e simpatia.",
            "Imagem 41: Tapioca aberta recheada de carne de panela desfiada, tomate-cereja, visual saboroso para lanche.",
            "Imagem 42: Frango desfiado para lanche sendo preparado na frigideira, ilustração criativa e real do uso do produto.",
            "Imagem 43: Pizza fit de frango em prato branco, visual atrativo, simplicidade saudável.",
            "Imagem 44: Pizza fit de carne de panela em prato cinza com queijo ralado por cima, apelo visual forte para lanche saudável.",
            "Imagem 45: Coxinha de carne fit aberta mostrando recheio, corte perfeito para destacar quantidade e textura.",
            "Imagem 46: Coxinha de frango fit aberta mostrando recheio, visual suculento e saudável.",
            "Imagem 47: Bolinha de queijo zero lactose aberta, espremendo recheio cremoso – muito apetitoso.",
            "Imagem 48: Suco Verde Detox em garrafa Cardapin, visual fresco reforçando naturalidade.",
            "Imagem 49: Suco Power Energy na garrafa Cardapin, cor vibrante, ambiente ao ar livre, reforça energia/vitalidade.",
            "Imagem 50: Creme proteico de mandioquinha com carne de panela em potes, visual cremoso, apelo de comida confortável.",
            "Imagem 51: Mousse de chocolate zero açúcar sendo servido de pote, textura cremosa, alta atratividade.",
            "Imagem 52: Choconinho (chocolate branco e preto) em pote, visual apetitoso com camadas marcadas.",
            "Imagem 53: Freezer lotado de embalagens Cardapin, reforçando o estoque e agilidade da entrega expressa.",
        ],
        conclusao:
            "O cardápio Cardapin apresenta uma ampla variedade de opções saudáveis para diferentes públicos, com imagens de alta qualidade e linguagem próxima do consumidor interessado em refeições saudáveis e práticas. As principais melhorias sugeridas incluem a divisão de categorias extensas, simplificação de nomes/produtos, padronização e dinamização das descrições e fortalecimento do apelo comercial nas descrições de produtos. Ao implementar estas sugestões, a experiência do usuário será aprimorada drasticamente, resultando em um cardápio mais atrativo, fácil de navegar e com maior capacidade de conversão de vendas.",
    };

    const productsByCategory = [
        {
            title: "Combos - Para montar do seu jeito com desconto!",
            products: [
                {
                    title: "Combo Agora Vai - A partir de 10 unidades",
                    description:
                        "Monte o combo do seu jeito! =) 5% de desconto já aplicado no valor unitário.\n\n\nCLIQUE NA CATEGORIA PARA VER OS PRATOS, VALORES E FOTOS.\n\nIdeal para você que quer ter uma variedade de opções prontas no seu congelador e nem dar chance para acabar saindo da rotina saudável por falta de tempo.",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/combo-agora-vai---a-partir-de-10-unidades_30112024123406.webp",
                },
                {
                    title: "Combo Foco Total - A partir de 20 unidades",
                    description:
                        "Monte o combo do seu jeito! =) 10% de desconto já aplicado no valor unitário\n\nCLIQUE NA CATEGORIA PARA VER OS PRATOS, VALORES E FOTOS.\n\nPerfeito para quem almoça e janta opções prontas e precisa de mais quantidades de uma vez, ou tem uma família que também está no foco.",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/combo-foco-total---a-partir-de-20-unidades_30112024123613.webp",
                },
                {
                    title: "Combo Lifestyle fit - Á partir de 40 unidades",
                    description:
                        "15% DE DESCONTO JÁ APLICADO NO VALOR UNITÁRIO. \nMELHOR PREÇO!\n\n\nCLIQUE NA CATEGORIA PARA VER OS PRATOS, VALORES E FOTOS.\n\nEsse combo é perfeito para quem já tem ou quer ter um lifestyle saudável e quer planejar com antecedência suas refeições, ou colocar a família em #FOCO também, tendo uma maior variedade de opções á disposição.",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/combo-lifestyle-fit---a-partir-de-40-unidades_30112024123147.webp",
                },
            ],
        },
        {
            title: "Combo Fit - À partir de 5 unidades",
            products: [
                {
                    title: "COD01 - Risotto de filé mignon aos queijos premium | 330g",
                    description:
                        "Linha gourmet e sucesso número 1 do nosso cardápio. Experimente a explosão de sabores do corte magro filé mignon e queijos premium.\nIngredientes: Água, Filé Mignon iscas, Arroz Arbóreo, Passata de tomate, Queijo Gorgonzola, Cebola, Alho Poró, Alho, Sal, Colorau, Páprica defumada, Salsinha, Chimichurri.\n\nValor energético (kcal): 320 / Carboidratos (g): 17/ Açúcares totais (g): 1,6 / Proteínas (g): 26 / Gorduras totais (g): 6,7/ Gorduras saturadas (g) 3,4/ Fibras alimentares (g): 1,1... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/risotto-de-file-mignon-aos-queijos-premium---330g_30072024124352.webp",
                },
                {
                    title: "COD04 - LOWCARB | Filé de tilápia com purê de abóbora | 300g SEM GLÚTEN E SEM LACTOSE",
                    description:
                        "Ingredientes: Abobora Cabotia, Filé de tilápia, Água, Passata de tomate, Cebola, Alho Poró, Sal, Alho, Chimichurri, Colorau, Azeite de oliva, Páprica defumada. \nNossos purês não possuem adição de qualquer ingrediente a mais.\n\nValor energético (kcal): 249/ Carboidratos (g): 19/ Açúcares totais (g): 0/ Açúcares adicionados (g): 0/ Proteínas (g): 31/ Gorduras totais (g): 4/ Gorduras saturadas (g): 1/ Gorduras trans (g): 0/ Fibra alimentar (g): 4/ Sódio (mg): 805",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/lowcarb---file-de-tilapia-com-pure-de-abobora----sem-gluten-e-sem-lactose_16082024015246.webp",
                },
                {
                    title: "COD05 - Strogonoff de carne fit com arroz branco e batata souté | 300g",
                    description:
                        "A versão do nosso campeão de vendas, agora em carne vermelha! SEM GLUTÉM E LACTOSE. \nValor energético (kcal): 369/ Carboidratos (g): 40/ Açúcares totais (g): 0/ Açúcares adicionados (g): 0/ Proteínas (g): 32/ Gorduras totais (g): 8/ Gorduras saturadas (g): 2/ Gorduras trans (g): 0/ Fibra alimentar (g): 4/ Sódio (mg): 636.",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/novidade--strogonoff-de-carne-fit-com-arroz-branco-e-batata-soute_30072024112300.webp",
                },
                {
                    title: "COD06 - Carne de panela com macarrão caseiro e tomates cofitados | 300g",
                    description:
                        "A melhor carne de panela da vida! \nIngredientes: Patinho em cubos, macarrão caseiro, tomates cerejas, tomate, alho, cebola, alho poró, chumichuri, páprica, colorau, azeite de oliva, sal marinho. CONTÉM GLÚTEN, NÃO CONTÉM LACTOSE.\n\nValor energético (kcal): 432/ Carboidratos (g): 34/ Açúcares totais (g): 2,3/ Proteínas (g): 50/ Gorduras totais (g): 9,9/ Gorduras saturadas (g): 4,0/ Fibras alimentares (g): 1,1/ Sódio (mg): 116",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/carne-de-panela-com-macarrao-caseiro-e-tomates-cofitados---300g_30072024123818.webp",
                },
                {
                    title: "COD07 - Escondidinho de batata doce com carne de panela | 300g",
                    description:
                        "Ingredientes: Batata Doce, Patinho em cubos, Passata de tomate, Cebola, Água, Alho Poró, Alho, Sal, Chimichurri. \nValor energético (kcal): 270/ Carboidratos (g): 33 / Açúcares totais (g): 0/ Açúcares adicionados (g): 0/ Proteínas (g): 23/ Gorduras totais (g): 5 / Gorduras saturadas (g): 2/ Gorduras trans (g): 0/ Fibra alimentar (g): 5/ Sódio (mg): 445",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/escondidinho-de-batata-doce-com-carne-de-panela---300g_30072024123348.webp",
                },
                {
                    title: "COD08 - Panqueca de espinafre com carne moída ao molho branco fit** e carne moída | 350g",
                    description:
                        "Uma versão deliciosa para suas refeições principais ou lanches. \nIngredientes: carne bovina (patinho), leite semidesnatado zero lactose, ovos, espinafre, farinha de arroz zero glúten, maisena, temperos naturais (cebola, alho, alho poró, chimichuri), mix de sementes e azeite de oliva. NÃO CONTÉM GLÚTEN, NEM LACTOSE.\n\nValor energético (kcal): 380 / Carboidratos (g): 43.682 / Açúcares totais (g): 7,712 g / Proteínas (g): 40,780 / Gorduras totais (g): 11,509 g / Gorduras saturadas(g):... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/panqueca-de-espinafre-com-carne-moida-ao-molho-branco-fit-e-carne-moida---280g_30072024115540.webp",
                },
                {
                    title: "COD09 - Escondidinho de carne de panela com aipim | 300g",
                    description:
                        "Ingredientes: Patinho em cubos, Aipim descascado, Passata de tomate, Cebola, Água, Alho Poró, Alho, Sal, Chimichurri \nValor energético (kcal): 364 / Carboidratos (g): 54 / Açúcares totais (g): 0/ Açúcares adicionados (g): 0/ Proteínas (g): 22 / Gorduras totais (g): 5 / Gorduras saturadas (g): 2/ Gorduras trans (g): 0/ Fibra alimentar (g): 4/ Sódio (mg): 445.",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/escondidinho-de-carne-de-panela-com-aipim---300g_30072024122800.webp",
                },
                {
                    title: "COD10 - LOWCARB | Carne de panela com mix de legumes | 300g",
                    description:
                        "Ingredientes: Patinho em cubos, Brócolis, Vagem, Passata de tomate, Tomate Cereja, Água, Cebola, Alho Poró, Alho, Sal, Chimichurri, Azeite de oliva, Cúrcuma em pó. \nValor energético (kcal): 203/ Carboidratos (g): 5 / Açúcares totais (g): 0/Açúcares adicionados (g): 0 Proteínas (g): 30/ Gorduras totais (g): 6 / Gorduras saturadas (g): 2/ Gorduras trans (g): 0/ Fibra alimentar (g): 4/ Sódio (mg): 426",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/lowcarb----carne-de-panela-com-mix-de-legumes_30072024112708.webp",
                },
                {
                    title: "COD11 - Sobrecoxa assada com arroz branco, creme de milho e tomate cereja | 300g",
                    description:
                        "Nossa deliciosa sobrecoxa com creme de milho e arroz branco. SEM GLUTEN E LACTOSE. \nIngredientes: Coxa e Sobre coxa de frango (sem osso com pele), Água, Arroz branco, Tomate Cereja, Cebola, Alho Poró, Sal, Alho, Azeite de oliva, Páprica defumada, Cúrcuma em pó, Chimichurri, Leite Zero Lactose, Milho congelado, Creme de Leite Zero Lactose, Amido de milho.\n\nValor energético (kcal): 448,207 kcal/ Carboidratos (g): 17,488 g/ Açúcares totais (g): 0,274 g / Açúcares adicionados (g): 0 / P... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/lancamento--sobrecoxa-assada-com-arroz-branco--creme-de-milho-e-tomate-cereja_30072024111131.webp",
                },
                {
                    title: "COD12 - Iscas de frango com macarrão penne ao creme branco com brócolis | 300g | ZERO GLÚTEN E",
                    description:
                        "Macarrão sem glutén com uma combinação perfeita de creme branco (sem lactose) com brócolis. \n312,84 kcal | 24,33g de carboidratos | 41,33g de proteínas | 2,12g de fibras | 5,53g de açúcares | 5,96g de gorduras totais | 1,89g de gorduras saturadas | 144,95mg de sódio\nPode conter traços de glúten e leite. Não seguro para celíacos ou intolerantes à lactose.Ingredientes:\nFilé de peito de frango, penne cozido, molho branco (leite zer... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/lancamento--iscas-de-frango-com-macarrao-penne-ao-creme-branco-com-brocolis---zero-gluten-e-zero-lac_30072024111102.webp",
                },
                {
                    title: "COD13 - LOWCARB | Carne de panela com purê de abóbora | 300g",
                    description:
                        "Ingredientes: Abóbora Cabotiá, Patinho em cubos, Passata de tomate, Cebola, Água, Alho Poró, Alho, Sal, Chimichurri \nValor energético (kcal): 218/ Carboidratos (g): 19/ Açúcares totais (g): 0 / Açúcares adicionados (g): 0/ Proteínas (g): 24/ Gorduras totais (g): 5 / Gorduras saturadas (g): 2/ Gorduras trans (g): 0/ Fibra alimentar (g): 6/ Sódio (mg): 445.",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/lowcarb---carne-de-panela-com-pure-de-abobora---300g_02082024021832.webp",
                },
                {
                    title: "COD15 - O MAIS VENDIDO! Strogonoff de frango fit com arroz branco e batata souté | 330g",
                    description:
                        "Strogonoff pode na dieta? Só se for da Cardapin! \nIngredientes: peito de frango ao molho, arroz branco, batata inglesa, creme de leite zero lactose, tomate, ketchup zero açúcar, alho, cebola, alho poró, chumichuri, salsinha.\n\nValor energético (kcal): 386 / Carboidratos (g): 40/ Açúcares totais (g): 0/ Açúcares adicionados (g): 0/ Proteínas (g): 37/ Gorduras totais (g): 6/ Gorduras saturadas (g): 2/ Gorduras trans (g): 0/ Fibra alimentar (g): 4/ Sódio (mg): 7",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/o-mais-vendido--strogonoff-de-frango-fit-com-arroz-branco-e-batata-soute---330g_30072024125314.webp",
                },
                {
                    title: "COD16 - Panqueca de cenoura com frango ao molho branco fit e mix de sementes | 350g",
                    description:
                        "Uma versão deliciosa para suas refeições principais ou lanches. \nIngredientes: Peito de frango desfiado, leite semidesnatado zero lactose, ovos, cenoura, farinha de arroz zero glúten, maisena, temperos naturais (cebola, alho, alho poró, chimichuri), mix de sementes e azeite de oliva. NÃO CONTÉM GLÚTEN E NEM LACTOSE.\n\nValor energético (kcal): 390 / Carboidratos (g): 46,822 / Açúcares totais (g): /Proteínas (g): 39,796 g / Fibras alimentares: 3,754 g/ Açúcares totais: 8,076 g / Gor... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/panqueca-de-cenoura-com-frango-ao-molho-branco-fit-e-mix-de-sementes---280g_30072024112358.webp",
                },
                {
                    title: "COD18 - Carne moída com arroz branco, feijão vermelho e farofa fake com legumes | 360g",
                    description:
                        "Brasileirinho de carne. \nIngredientes: patinho moído, arroz branco, feijão vermelho, farofa fake com legumes, flocão de arroz zero glúten, mix de vegetais da estação, tomate, alho, cebola, alho poró, chumichuri.\n\nValor energético (kcal): 472/ Carboidratos (g): 65 Açúcares totais (g): 0/ Açúcares adicionados (g): 0/ Proteínas (g): 33/ Gorduras totais (g): 6/ Gorduras saturadas (g): 1/ Gorduras trans (g): 0/ Fibra alimentar (g): 12/ Sódio (mg): 832.",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/carne-moida-com-arroz-branco--feijao-vermelho-e-farofa-fake-com-legumes---360g_30072024112139.webp",
                },
                {
                    title: "COD19 - LOW CARB | Fricassé de creme de milho com frango desfiado e queijo mussarela | 300g ZERO GLÚ",
                    description:
                        "Parece uma lasanha de tão gostosa! \nIngredientes: Leite Zero Lactose, Filé peito de frango, Milho congelado, Queijo Muçarela Zero Lactose, Água, Passata de tomate, Cebola, Farinha de arroz, Alho Poró, Alho, Chimichurri, Sal, Colorau, Azeite de oliva e Páprica doce.\n\nValor energético (kcal): 418/ Carboidratos (g): 18 / Açúcares totais (g): 0 / Açúcares adicionados (g): 0/ Proteínas (g): 57 / Gorduras totais (g): 11 / Gorduras saturadas (g): 4/ Gorduras trans (g): 0/ Fibra ali... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/lowcarb---fricasse-de-creme-de-milho-com-frango-desfiado-e-queijo-mussarela---zero-gluten-e-zero-lac_30072024110902.webp",
                },
                {
                    title: "COD20 - Filézinho de frango com arroz branco feijão vermelho e farofa fake com legumes |340g SEM GLÚ",
                    description:
                        "Brasileirinho de frango. \nIngredientes: Filé peito de frango, Água, Arroz branco, Feijão Vermelho, Farinha Flocão de Arroz, Cenoura, Brócolis, Maça Fuji, Cebola, Alho Poró, Alho, Azeite de oliva, Sal, Páprica doce, Chimichurri, Cúrcuma em pó.\n\nValor energético (kcal): 517/ Carboidratos (g): 64/ Açúcares totais (g): 0/ Açúcares adicionados (g): 0/ Proteínas (g): 47/ Gorduras totais (g): 5/ Gorduras saturadas (g): 0/ Gorduras trans (g): 0/ Fibra alimentar (g): 12/ Sódio (mg): 513.... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/filezinho-de-frango-com-arroz-branco-feijao-vermelho-e-farofa-fake-com-legumes--340g-sem-gluten-e-se_30072024112110.webp",
                },
                {
                    title: "COD21 - LOWCARB | Sobrecoxa ao forno com legumes da estação gergelim | 280g",
                    description:
                        "Baixas calorias, e muito sabor. \nIngredientes: sobrecoxa sem osso e sem pele, legumes, gergilim, tomate, alho, cebola, alho poró, chumichuri, páprica, colorau, azeite de oliva, sal marinho. NÃO CONTÉM GLÚTEN, NÃO CONTÉM\n\nValor energético (kcal): 389/ Carboidratos (g): 15/ Açúcares totais (g): 2/ Açúcares adicionados (g): 0/ Proteínas (g): 40/ Gorduras totais (g): 18 / Gorduras saturadas (g): 4/ Gorduras trans (g): 0/ Fibra alimentar (g): 3/ Sódio (mg): 563",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/lowcarb---sobrecoxa-ao-forno-com-legumes-da-estacao-gergelim---280g_30072024111540.webp",
                },
                {
                    title: "COD22 - LOWCARB! Lasanha de beringela com frango desfiado e molho natural | 330g",
                    description:
                        "Leve, cremosa e surpreendente. Essa lasanha lowcarb entrega sabor de verdade, sem pesar. Uma opção saudável, rica em proteína e cheia de conforto em cada garfada.\n\n\n\n310 kcal | 12g de carboidratos | 40g de proteínas | 5g de fib... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/cod28---lowcarb--lasanha-de-beringela-com-frango-desfiado-e-molho-natural----330g_14012025064954.webp",
                },
                {
                    title: "COD24 - LOWCARB! Filézinho de frango com legumes | 280g",
                    description:
                        "Nosso delicioso filé de frango com brócolis, cenoura e tomatinhos cereja confitados. \nValor energético (kcal): 286/ Carboidratos (g): 10/ Açúcares totais (g): 0/ Açúcares adicionados (g): 0/ Proteínas (g): 40/ Gorduras totais (g): 9/ Gorduras saturadas (g): 1/ Gorduras trans (g): 0/ Fibra alimentar (g): 3/ Sódio (mg): 469",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/lowcarb--filezinho-de-frango-com-legumes---280g_30072024110925.webp",
                },
                {
                    title: "COD 26 - Tilápia ao forno à parmegiana com queijo mussarela, arroz branco e brócolis | 330g | SEM G",
                    description:
                        "Parmegiana na versão 100% FIT. \nIngredientes: filé de tilápia, arroz branco, passata de tomate, queijo mussarela zero lactose, brócolis, farinha de linhaça dourada, ovo, cebola, alho poró, alho, sal, chimichurri e páprica.\n\nValor energético (kcal): 420 / Carboidratos (g): 42/ Açúcares totais (g): 0/ Açúcares adicionados (g): 0/ Proteínas (g): 32/ Gorduras totais (g): 6/ Gorduras saturadas (g): 2/ Gorduras trans (g): 0/ Fibra alimentar (g): 4/ Sódio (mg): 701",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/cod-26---tilapia-ao-forno-a-parmegiana-com-queijo-mussarela--arroz-branco-e-brocolis---sem-gluten-e-sem-lactose_13012025024922.webp",
                },
                {
                    title: "COD 27 - NOVIDADE! Frango à parmegiana com queijo, arroz branco e vagem SEM GLÚTEM / SEM LACTOSE",
                    description:
                        "Aquele frango amado a parmegiana, porém na versão saudável. \nIngredientes: peito de frango, arroz branco, passata de tomate, queijo mussarela zero lactose, vagem, farinha de linhaça dourada, ovo, cebola, alho poró, alho, sal, chimichurri e páprica.\n\nValor energético (kcal): 408 / Carboidratos (g): 37/ Açúcares totais (g): 0/ Açúcares adicionados (g): 0/ Proteínas (g): 38/ Gorduras totais (g): 4/ Gorduras saturadas (g): 2/ Gorduras trans (g): 0/ Fibr... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/cod-27---novidade--frango-a-parmegiana-com-queijo--arroz-branco-e-vagem-sem-glutem---sem-lactose---330g_13012025034513.webp",
                },
                {
                    title: "COD30 - PREMIUM! Salmão com abóbora em pedaços e cenoura laminada, brócolis | 280g",
                    description:
                        "A pedidos: um maravilhoso salmão com legumes. Opção leve e com poucas calorias.\n\nTabela Nutricional (porção única): Calorias: 200 kcal, Carboidratos: 8 g, Proteínas: 25 g, Gorduras totais: 8 g, Gorduras saturadas: 2 g, Fibras: 3 g, Sódio: 100 mg.\n\nIngredientes: Salmão, cenoura laminada, brócolis, tomates confitados, sal, pimenta preta, chimichurri.",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/cod30---premium--salmao-com-abobora-em-pedacos-e-cenoura-laminada--brocolis---280g_14012025065101.webp",
                },
                {
                    title: "COD32 - Almôndegas com purê de mandioquinha e molho extra | 330g",
                    description:
                        "Almôndegas suculentas, feitas com carne magra e temperos naturais, combinadas com um purê de mandioquinha cremoso e levemente adocicado. Uma refeição completa, leve e reconfortante – perfeita para quem quer praticidade sem abrir mão do sabor. \n406,31 kcal | 38,84g de carboidratos | 36,25g de proteínas | 3,89g de fibras | 6,16g de açúcares | 11,06g de gorduras totais | 5,02g de gorduras saturadas | 100,4mg de sódio\n\nPode conter traços de glúten. Não seguro para celíacos.Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/cod32---almondegas-com-pure-de-mandioquinha-e-molho-extra_07042025092419.webp",
                },
                {
                    title: "COD33 - Strogonoff de frango com arroz integral e brócolis | 300g SEM GLÚTEN E SEM LACTOSE",
                    description:
                        "Um clássico repaginado para quem cuida da saúde sem abrir mão do sabor. Strogonoff de frango cremoso, feito com tempero caseiro, acompanhado de arroz integral soltinho e brócolis refogado no ponto certo. É praticidade com gostinho de comida feita com carinho. \n283,7 kcal | 27,58g de carboidratos | 34,35g de proteínas | 4,98g de fibras | 2,61g de açúcares | 4,46g de gorduras totais | 1,09g de gorduras saturadas | 87,69mg de sódio\n\nVer mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/cod33---strogonoff-de-frango-com-arroz-integral-e-brocolis_14042025125923.webp",
                },
                {
                    title: "NOVIDADE! COD 34 - Salmão ao forno com arroz branco e purê de abóbora cabuitiá",
                    description:
                        "O nosso famoso salmão grelhado com acompanhado na versão de purê da abóbora cabutiá. \nIngredientes: Salmão ao forno (sem pele), purê de abóbora cabotiá (feito apenas com a água do cozimento), arroz branco cozido, sal marinho, chimichurri.\nSEM GLÚTEN E SEM LACTOSE | Não seguro para celíacos\n\n376 kcal | 22,8g proteína | 33,5g carboidrato | 17,3g gordura | 3,3g gordura saturada | 1,7g ômega-3 | 2,2g fibra | 50mg sódio (natural dos alimentos)",
                    imageSrc:
                        "https://s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/novidade--cod-34---salmao-ao-forno-com-arroz-branco-e-pure-de-abobora-cabuitia_02052025032528.webp",
                },
            ],
        },
        {
            title: "Combos Fechados",
            products: [
                {
                    title: "LOW CARB - 12 REFEIÇÕES",
                    description:
                        'Combo fechado com opções de baixo carboidratos. Nenhuma opção desse combo possui lactose ou glúten.\n\nEste combo vem com duas unidades de cada tipo e não é possível alterar.\n\nPara finalizar o pedido, basta selecionar as opções e clicar em "adicionar"',
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/low-carb---12-refeicoes_16082024010143.webp",
                },
                {
                    title: "MAROMBA - 12 REFEIÇÕES COM BOAS FONTES DE CARBOIDRATOS",
                    description:
                        'Combo com refeições com carboidratos de qualidade, ideal para você que pratica atividade física e busca ganhar massa magra. \nEste combo possui 2 unidades de cada tipo, não sendo possível realizar alterações.\nPara finalizar o pedido, basta selecionar as opções e clicar em "adicionar"',
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/maromba---12-refeicoes-com-boas-fontes-de-carboidratos_16082024011843.webp",
                },
                {
                    title: "MENU DEGUSTAÇÃO - OS 10 CAMPEÕES DE VENDAS",
                    description:
                        'Está na dúvida do que pedir? Esse é o nosso combo com os 10 pratos mais vendidos.\n\nEste combo possui 1 unidade de cada tipo, não sendo possível realizar alterações.\nPara finalizar o pedido, basta selecionar as opções e clicar em "adicionar"',
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/menu-degustacao---os-10-campeoes-de-vendas_16082024012407.webp",
                },
                {
                    title: "DIETA MASCULINA - 12 REFEIÇÕES - FOME MONSTRA",
                    description:
                        "ATENÇÃO: Este combo é feito somente sob encomenda, por isso a data de agendamento do site não vale para ele pois não temos ele em estoque. Finalize seu pedido normalmente que a nossa equipe irá informar no WhatsApp a data de entrega. \nQuem não come, não cresce!\n\nCombo indicado para homens que buscam refeições maiores, com mais proteína e carboidratos.\n\n3x Escondidinho de aipim (200g) com carne de panela (200g)\nVer mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/dieta-masculina---20-refeicoes---fome-monstra_09112023114959.webp",
                },
                {
                    title: "COMBO EMAGRECEDOR TURBO - 7 DIAS ALMOÇO E JANTA - 14 refeições ao total",
                    description:
                        "Ideal para quem busca refeições menos calóricas. \nESSSE COMBO VEM 2 DE CADA UNIDADE.\nO que você recebe:\n\n7 dias de refeições completas (almoço e jantar) Total 14 refeições\nOpções variadas do nosso cardápio fixo.\nPraticidade: basta aquecer e consumir\nIdeal para quem busca perda de peso sem complicação",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/combo-emagrecedor-turbo---7-dias-almoco-e-janta_22102024015606.webp",
                },
                {
                    title: "Combo SECA TOTAL FEMININO - 10 dias Almoço e 10 Jantas - 20 refeições",
                    description:
                        "Combo com refeições de baixa calorias, 100% dieta limpa e com equilíbio nutriiconal, assinado pela nutricionista Ana Koerich. VERSÃO FEMININA.\n\n4x Filézinho de frango (120g) arroz integral (60g) feijão vermelho (70g) brócolis (50g) cenoura (50g)\n\n4x Carne de panela (110g) purê de aipim (50g) vagem (50g) tomatinhos cerejas (1 colher) couve-mineira refogada (1 punhado)\n\n4x Sobrecoxa sem pele e sem osso (100g) purê de batata doce (105g) cenoura (50g) vagem (50g)\nVer mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/combo-seca-total-feminino---10-dias-almoco-e-10-jantas---20-refeicoes_27012025122811.webp",
                },
                {
                    title: "Combo SECA TOTAL MASCULINO - 10 dias Almoço e 10 Jantas - 20 refeições",
                    description:
                        "Combo com refeições de baixa calorias, 100% dieta limpa e com equilíbio nutriiconal, assinado pela nutricionista Ana Koerich. \nVERSÃO MASCULINA.\n\n4x Filézinho de frango (150g) arroz integral (120g) feijão vermelho (120g) brócolis (50g) cenoura (50g)\n\n4x Carne de panela (125g) purê de aipim (135g) vagem (50g) tomatinhos cerejas (1 colher) couve-mineira refogada (1 punhado)\n\n4x Sobrecoxa sem pele e sem osso (120g) purê de batata doce (180g) cenoura (50g) vagem (... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/combo-seca-total-masculino---10-dias-almoco-e-10-jantas---20-refeicoes_27012025015713.webp",
                },
                {
                    title: "Linha Baby - Introdução alimentar - 16 refeições - À partir de 9 meses",
                    description:
                        "4x Carne moída (40g) + purê de aipim (60g) + brócolis cozido (30g em floretes picados) | Peso liq. 130g \n4x Frango desfiado (40g) + purê de mandioquinha (60g) + cenoura cozida (30g picada) | Peso liq. 130g\n\n4x Carne de panela desfiada (40g) + purê de abóbora (60g) + beterraba (30g picada) | Peso liq. 130g\n\n4x Iscas de frango (40g – bem cozidas e picadinhas) + arroz branco (30g) + feijão (caldo + grãos amassados – 30g) + vagem cozida (30g picada). | Peso liq. 130g ... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/linha-baby---introducao-alimentar---16-refeicoes---a-partir-de-9-meses_22042025115852.webp",
                },
            ],
        },
        {
            title: "Adicionais de legumes avulsos",
            products: [
                {
                    title: "Cenoura e brócolis temperados | AVULSO | 100g liq. 1 unidade",
                    description:
                        "Ideal para você que quer consumir mais legumes junto com as refeições prontas. \nLegumes congelados: Brócolis (50g), Cenoura (50g), Sal Marinho (pitada), Chimichurri (pitada) - Energia: 36 kcal, Carboidratos: 7,2g, Proteínas: 2,3g, Gorduras Totais: 0,3g, Fibras: 3,2g, Sódio: 50mg.\n\nPreparados no vapor. =)\n",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/cenoura-e-brocolis-temperados---avulso---100g-liq--1-unidade_24042025014157.webp",
                },
                {
                    title: "COMBO 5 UNIDADES - Cenoura e brócolis temperado | 500g liq",
                    description:
                        "Ideal para você que quer consumir mais legumes junto com as refeições prontas. \n5 unidades contendo 100g de legumes cada uma = total 500g\n\nLegumes congelados: Brócolis (50g), Cenoura (50g), Sal Marinho (pitada), Chimichurri (pitada) - Energia: 36 kcal, Carboidratos: 7,2g, Proteínas: 2,3g, Gorduras Totais: 0,3g, Fibras: 3,2g, Sódio: 50mg.\n\nPreparados no vapor. =... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/combo-5-unidades---cenoura-e-brocolis-temperado----500g-liq_24042025014504.webp",
                },
                {
                    title: "Berinjela e vagem temperados | AVULSO 100g liq. | 1 unidade",
                    description:
                        "Outra variação para você completar as suas refeições com mais variedade em legumes. \n\nLegumes congelados: Vagem (50g), Berinjela (50g), Sal Marinho (... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/berinjela-e-vagem-temperados---avulso-100g-liq----1-unidade_24042025014620.webp",
                },
                {
                    title: "COMBO 5 UNIDADES - Berinjela e vagem - 5 unidades | 500g liq. total",
                    description:
                        "utra variação para você completar as suas refeições com mais variedade em legumes. \n5 unidades contendo 100g de legumes cada uma = total 500g\n\nL... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/combo-5-unidades---berinjela-e-vagem---5-unidades---500g-liq--total_24042025014831.webp",
                },
            ],
        },
        {
            title: "Combo Personalizado",
            products: [
                {
                    title: "Combo Personalizado | Á partir de 10 unid.",
                    description:
                        "Possui uma dieta prescrita pela nutricionista ou gostaria de montar sua própria combinação? Manda sua dieta para gente. \nEntre em contato conosco através do nosso WhatsApp e encaminhe as informações para montagem do combo!\n\nPrazo de entregas para dieta personalizada:\nNossa produção de personalizados acontece terça, quarta, e quinta.\n\nDevido a nossa grande variedade de ingredientes e alta demanda, não conseguimos preparar um combo completo num único dia, ele costuma ser div... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/combo-personalizado---a-partir-de-10-unid-_30112023041906.webp",
                },
                {
                    title: "Combo personalizado | Trimestral - Á partir de 60 refeições",
                    description:
                        "DESCONTO DE 10% (em cima do orçamento passado) Parcelamento no cartão em até 3x\n\n\n3 entregas grátis: Sugestão de 20 em 20 (pode ser diferente)\n\n\nPRAZO DE 72H úteis de pedido para produção após cardápio aprovado\n\nAtualizações de plano alimentar com alteração de até 5%de no peso da proteína para mais ou para menos não alteram o valor do último orçamento.",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/combo-personalizado---trimestral---a-partir-de-60-refeicoes_09112023101721.webp",
                },
            ],
        },
        {
            title: "Lanches",
            products: [
                {
                    title: "Carne de panela desfiada para lanches | 200g",
                    description: "",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/carne-de-panela-desfiada-para-lanches---200g_24042025011812.webp",
                },
                {
                    title: "Frango desfiado para lanche | 200g",
                    description: "",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/frango-desfiado-para-lanche---200g_24042025011925.webp",
                },
                {
                    title: "NOVO SABOR! Pizza fit de frango com alho poró e queijo zero lactose | 190g",
                    description:
                        "Ingredientes: Massa: aipim cozido, ovo, azeite de oliva, farinha de arroz (zero glúten, zero lactose), fermento químico, sal marinho, chimichurri, alho, cebola, alho-poró.\nRecheio: peito de frango, molh... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/novo-sabor--pizza-fit-de-frango-com-alho-poro-e-queijo-zero-lactose_07042025051228.webp",
                },
                {
                    title: "PROMOÇÃO DE LANÇAMENTO! Pizza Fit de Carne de Panela | Peso liquid. 190g",
                    description:
                        "Zero Glúten | Zero Lactose \nIngredientes:\nMassa: aipim cozido, ovo, azeite de oliva, farinha de arroz (zero glúten, zero lactose), fermento químico, sal marinho, chimichurri, alho, ceb... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/promocao-de-lancamento--pizza-fit-de-carne-de-panela---peso-liquid--190g_07042025051250.webp",
                },
                {
                    title: "Coxinha de carne de panela fit| 150g",
                    description:
                        "Carne desfiada e bem temperada, envolta em massa leve e nutritiva, com casquinha crocante e ingredientes naturais. Simples, saborosa e inteligente pra sua rotina. \nSem glúten e sem lactose. Pode haver contaminação cruzada de glúten. Não seguro para celíacos.\nInformações nutricionais (por unidade de 150g):231 kcal | 32g carboidratos | 13g proteínas | 5,6g gorduras totais | 4,3g fibras | 659mg sódio\n\nIngredientes: carne bovina patinho, batata doce,... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/coxinha-de-carne-de-panela-fit--150g-_07042025013425.webp",
                },
                {
                    title: "Coxinha de frango fit | 150g",
                    description:
                        "Recheio suculento de peito de frango desfiado, envolto em massa leve de batata-doce e aipim. Empanada com flocos de milho e linhaça dourada, sem fritura e cheia de sabor. Sem glúten e sem lactose. Pode haver contaminação cruzada de glúten. Não seguro para celíacos. \nInformações nutricionais: 232 kcal | 33g carboidratos | 12g proteínas | 5,5g gorduras totais | 4g fibras | 703mg sódio\n\n\nIngredientes: Ingredientes: peito de frango, batata doce, farinha de aveia, ... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/coxinha-de-frango-fit---150g_07042025013451.webp",
                },
                {
                    title: "Bolinha de queijo zero lactose fit | 130g",
                    description:
                        "Recheio cremoso e marcante, com massa leve e crosta dourada. A escolha perfeita pra quem ama queijo sem abrir mão da qualidade dos ingredientes. Sem glúten e sem lactose. Pode haver contaminação cruzada de glúten. Não seguro para celíacos.\nInformações nutricionais (por unidade de 150g):293 kcal | 34g carboidratos | 13g proteínas | 12g gorduras totais | 3,7g f... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/bolinha-de-queijo-zero-lactose-fit---150g-_07042025013524.webp",
                },
            ],
        },
        {
            title: "Sucos 100% naturais",
            products: [
                {
                    title: "Suco Verde Detox | 300ml",
                    description:
                        "O suco detox ajuda a eliminar toxinas, melhora a digestão, combate radicais livres e reduz o inchaço. Rico em fibras, vitaminas e antioxidantes, hidrata o corpo e promove saciedade, sendo um aliado para quem busca saúde e bem-estar! \nIngredientes: Água de coco, maça... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/suco-verde-detox---300ml_24042025020013.webp",
                },
                {
                    title: "Suco Power Energy | 300ml",
                    description:
                        "Suco power energy Pré e Pós-Treino: \nPré-treino: A beterraba é rica em nitratos, que aumentam a produção de óxido nítrico no organismo, melhorando o fluxo sanguíneo, a entrega de oxigênio aos músculos e o desempenho físico. Ideal para dar mais energia e resistência ... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/suco-power-energy---300ml_24042025020128.webp",
                },
            ],
        },
        {
            title: "Creme de inverno",
            products: [
                {
                    title: "Creme de mandioquinha preoteico com carne de panela desfiada | 28g de PROTEÍNA 350ml",
                    description:
                        "Aquela delícia quentinha e proteica perfeita para o inverno. \nIngredientes: Batata salsa, patinho bovino, caldo de carne natural, cebola, alho, azeite de oliva extra virgem, sal, chimichurri. Peso líquido: 350 ml. Ver mais",
                    imageSrc:
                        "https://s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/creme-de-mandioquinha-preoteico-com-carne-de-panela-desfiada---28g-de-proteina-350ml_30042025033458.webp",
                },
            ],
        },
        {
            title: "Doces zero açúcar e zero lactose",
            products: [
                {
                    title: "Mousse de Chocolate | 180g | Zero açúcar e zero lactose",
                    description:
                        "Docinho pós almoço sem culpa! \nPeso equivalente a 2 barras de chocolate!\n\nIngredientes: Leite em pó zero lactose, chocolate 70% zero açúcar e zero lactose.\n\nValor energético:\n67,27 kcal por porção de 25g (equivale a 3 quadradinhos de chocolate como comparação) Carboidratos: 4,83, Proteínas: 3,45, açúcarares: 4,86 (natural do leite), gorduras totais: 2,09\n\nVer mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/mousse-de-chocolate---180g---zero-acucar-e-zero-lactose_29042025105023.webp",
                },
                {
                    title: "Choconinho | 180g | Zero açúcar e zero lactose",
                    description:
                        "Combinação perfeita de chocolate preto e branco. \nPeso equivalente a 2 barras de chocolate!\n\nIngredientes: Leite em pó zero lactose, chocolate 70% zero açúcar e zero lactose.\n\nInformação nutricional (Porção 30g): Calorias: 77,12kcal / Carboidratos 5,67g / Proteínas 4,02g\n\nVer mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/choconinho---180g---zero-acucar-e-zero-lactose_29042025105239.webp",
                },
            ],
        },
        {
            title: "ENTREGA EXPRESS",
            products: [
                {
                    title: "Prazo de 2h à 24h - Entrega rápida garantida para quem tem pressa!",
                    description:
                        "1- O pedido será entregue no prazo de 2h até 24h. 2- O prazo começa a contar apenas dentro do horário comercial: de segunda a sexta-feira, das 8h às 18h.\n3- Válido somente para opções à pronta entrega, conforme disponibilidade de estoque.\n4- Não válido para combos feitos sob encomenda.\n5- Caso falte algum item, oferecemos uma troca equivalente para manter o prazo Express.\n6- O prazo normal de entrega é de até 3 dias út... Ver mais",
                    imageSrc:
                        "https://pd-clientes-all.s3.us-west-2.amazonaws.com/cdn.cardapinfit/upload/thumb/prazo-de-2h-a-24h---entrega-rapida-garantida-para-quem-tem-pressa-_24042025024544.webp",
                },
            ],
        },
    ];

    // const { pageAnalysis, productsByCategory } = await getPageReport(fullUrl);

    res.render("home", { pageAnalysis, productsByCategory });
});

export default app;
