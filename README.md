<h1 align='center'>Analisador de Cardápios com IA</h1>

# Introdução

Este projeto permite que o usuário gere uma análise detalhada do cardápio de qualquer restaurante que utiliza os serviços da **Prefiro Delivery**.

# Requisitos

- **Node.JS V22**

# Como configurar a API

## 1. Clonar o Repositório

Se você utiliza SSH, execute:

```bash
git clone git@github.com:augustolfp/page-analyser.git
```

<br />

Se você utiliza HTTPS, execute:

```bash
git clone https://github.com/augustolfp/page-analyser.git
```

<br />

## 2. Variáveis de Ambiente

Crie um documento **.env** na pasta raiz do projeto. Utilize o **.env.example** como base:

```
PORT = 3000
OPENAI_API_KEY = <your_open_ai_key>
```

<br />

## 3. Instalação das Dependências

Para instalar as dependências do projeto, execute na raiz do projeto:

```bash
npm install
```

<br />

## 4. Execução da API

Para executar a API, execute na raiz do projeto:

```bash
npm run dev
```

A API já está pronta para o uso. Mantenha o console aberto para acompanhar as etapas da geração do relatório.

<br />

# Utilização da API

Para utilizar a API, acesse pelo navegador a seguinte URL, substituindo o nome do restaurante:

```
http://localhost:3000/analysis/<nome_do_restaurante>
```

## Exemplo

Para o restaurante **cardapinfit**, a URL a ser acessada seria:

```
http://localhost:3000/analysis/cardapinfit
```

Após acessar a URL pelo navegador, basta aguardar a geração do relatório. É possível acompanhar o progresso através do _console_ do Node.JS.

# Tecnologias Utilizadas

- Node.JS + Express + Typescript
- Puppeteer (WebScraping)
- Zod (Schemas)
- OpenAI API (Inteligência Artificial)
