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

Para gerar o relatório de um cardápio on-line, basta acessar pelo seu navegador a seguinte URL:

```
http://localhost:3000/analysis/<URL_do_cardápio_Base_64_URL_Encoded>
```

Para obter a URL do cardápio em **Base64Url**, é possível utilizar qualquer ferramenta on-line, como o <a href="https://base64.guru/standards/base64url/encode">Base64Guru</a>.

## Exemplo

Para o restaurante **Contém Frango**, obtém-se a sua URL Base64Url encoded:

> https://www.contemfrango.com.br/ => **aHR0cHM6Ly93d3cuY29udGVtZnJhbmdvLmNvbS5ici8**

Agora, basta acessar com o navegador a seguinte URL:

```
http://localhost:3000/analysis/aHR0cHM6Ly93d3cuY29udGVtZnJhbmdvLmNvbS5ici8
```

Após acessar a URL pelo navegador, basta aguardar a geração do relatório. É possível acompanhar o progresso através do _console_ do Node.JS.

# Vídeo Explicativo

Acompanhe o passo-a-passo de utilização da API por <a href="https://drive.google.com/file/d/1Q4YaHvCQYh3A9I2CMoOuCgojaLbf6QPJ/view?usp=sharing">vídeo</a>.

> ### _Timestamps:_
>
> - 00:00 até 11:00 => Utilizando a API no modo _Headless_ (modo padrão)
> - 11:00 até 14:30 => Utilizando a API no modo _Headful_ (modo debug)
> - 14:30 até o final => Explicando os detalhes da API

# Tecnologias Utilizadas

- Node.JS + Express + Typescript
- Puppeteer (WebScraping)
- Zod (Schemas)
- OpenAI API (Inteligência Artificial)
- Sharp (Processamento de Imagens)
